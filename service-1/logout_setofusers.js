import http from 'k6/http';
import { check, sleep , VU} from 'k6';
import users from './users.js';

// Test configuration
export let options = {
    stages: [
        { duration: '1m', target: 5 }, // Start with 1 user for 1 minute
        // { duration: '1m', target: 1 }, // Start with 1 user for 1 minute
        // { duration: '9m', target: 100 }, // Ramp up to 100 users over 9 minutes
    ],
};

let refreshToken = ''; // Declare refreshToken as a global variable

// User login function
export function userLogin() {
  for (const user of users) {
  const payload = JSON.stringify({
    username: user.username,
    password: user.password,
  });
  

 const headers = {
   'Content-Type': 'application/json',
   'Authorization': `${refreshToken}`,
  };
//   console.log(user.password)

  const response = http.post('http://13.52.104.81:8085/api/v1/login',payload, {
    headers: headers,
  });
//   console.log(response.body);

  check(response, {
    'Login status is 200': (r) => r.status === 200,
  });

  // Extract the access token and refresh token from the response
  const responseBody = JSON.parse(response.body);
  refreshToken = responseBody.xrefreshToken; // Update the global refreshToken variable
  console.log(user.username);
  console.log(refreshToken);
}
}

// User logout function
export function userLogout() {
  
  const headers = {
    'Authorization': `${refreshToken}`, // Use the refresh token as the "Authorization" header
  };


  const response = http.post('http://13.52.104.81:8085/api/v1/logout', null, {
    headers: headers,
  });
  // console.log(response.headers);

  check(response, {
    'Logout status is 200': (r) => r.status === 200,
  });

}


export default function () {
  userLogin(); // Login and capture access and refresh tokens
  userLogout(); // Logout with the refresh token as the Authorization header
  sleep(1); 
}


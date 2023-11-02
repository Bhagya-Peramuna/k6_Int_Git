import http from 'k6/http';
import { check, sleep } from 'k6';
import users from './users.js';

// Test configuration
export let options = {
    stages: [
        { duration: '1s', target: 1 }, // Start with 5 users for 1 minute
    ],
};

let refreshTokens = []; // Declare an array to store refresh tokens

// User login function
export function userLogin() {
    for (const user of users) {
        const payload = JSON.stringify({
            username: user.username,
            password: user.password,
        });

        const headers = {
            'Content-Type': 'application/json',
        };

        const response = http.post('http://13.52.104.81:8085/api/v1/login', payload, {
            headers: headers,
        });


        

        // Extract the access token and refresh token from the response
        const responseBody = JSON.parse(response.body);
        const refreshToken = responseBody.xrefreshToken;
        refreshTokens.push(refreshToken); // Store the refresh token in the array
        // console.log(user.username);
        // console.log("login",refreshToken);
        console.log(response.body);

        check(response, {
            'Login status is 200': (r) => r.status === 200,
            'Response body contains "Successfully Authenticated"': (r) => response.body.includes("Successfully Authenticated")
        });
    }
}

// User logout function
export function userLogout() {
    if (refreshTokens.length > 0) {
        const headers = {
            'Authorization': refreshTokens[0], // Use the first token in the array
        };

        const response = http.post('http://13.52.104.81:8085/api/v1/logout', null, {
            headers: headers,
        });

        check(response, {
            'Logout status is 200': (r) => r.status === 200,
        });
        console.log("logout",refreshTokens);

        refreshTokens.shift(); // Remove the used token from the array
    }
}

export default function () {
    userLogin(); // Login and capture access and refresh tokens
    sleep(5);
    userLogout(); // Logout with the specific token
    sleep(6);
}

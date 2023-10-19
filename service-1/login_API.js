import http from 'k6/http';
import { check } from 'k6';
import users from './users.js';

export let options = {
  stages: [
    { duration: '5s', target: 2 },
  ],
};

const BASE_URL = 'http://13.52.104.81:8085/api/v1';

export default function () {
  for (const user of users) {
    const payload = JSON.stringify({
      username: user.username,
      password: user.password,
    });

    console.log('Username:', user.username);
    console.log('Password:', user.password);

    const headers = {
      'Content-Type': 'application/json',
    };

    const response = http.post(`${BASE_URL}/login`, payload, { headers });

    // Check the response
    check(response, {
      'Login is successful': (res) => res.status === 200,
    });
  }
}

import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  // vus :5,
  // duration: '5s',
  stages: [
    { duration: '10s', target: 5 },   // Ramp up to 5 users in 5 minutes
    // { duration: '5m', target: 20 }, // Ramp up to 20 users in 10 minutes
    // { duration: '15m', target: 50 }, // Ramp up to 50 users in 15 minutes
    // { duration: '30m', target: 120 } // Ramp up to 120 users in 30 minutes
  ],
  // vus: 100,
  // duration:'2s',
  thresholds: {
    http_req_duration: ['p(95)<500'],  // 95% of requests should be below 500ms
    http_req_failed: ['rate<0.1'],     // 99% of requests should succeed
  },
};

const users = [
  { user: 'test', passwd: '1234' },
  { user: 'test', passwd: '1234' },

];

export default function () {
  for (const user of users) {
    console.log('Username:', user.user);
    console.log('Password:', user.passwd);
    // Simulate login
   
//this has to give an error , status = 404
    let success = ('https://k6-http.grafana.fun/hidden-basic-auth/test/1234')
    check(success, { 'Login successful': (resp) => resp.status === 200});

  
    sleep(1);
  }
}

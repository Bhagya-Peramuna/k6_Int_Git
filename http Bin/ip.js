import http from "k6/http";
import { check, sleep } from "k6";

let responseValue;


export const options = {
  // vus: 2,
  // duration: '5s',
  stages: [
    { duration: '10s', target: 5 },   // Ramp up to 5 users in 5 minutes
    { duration: '5m', target: 20 }, // Ramp up to 20 users in 10 minutes
    { duration: '15m', target: 50 }, // Ramp up to 50 users in 15 minutes
    { duration: '30m', target: 120 } // Ramp up to 120 users in 30 minutes
  ],
};

export default function(){
let res = http.get(`https://k6-http.grafana.fun/ip`,  {
    headers: {
      'Content-Type': 'application/json',
    //   'X-User-ID': 335167,
    },
  });

  responseValue = res.json().origin;

  check(res, { 
    //check the status
    "status is 200": (res) => res.status === 200,
    //check the response
    "Response origin matches": () => res.json().origin === responseValue,

});
//   console.log(`IP: ${res.json().origin} }\n`);


  sleep(1);
}
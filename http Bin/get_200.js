import http from 'k6/http';
import {sleep,check} from 'k6';

export const options={
    // vus: 2,
    // duration: '10s',
    stages: [
        { duration: '10m', target: 15 },   // Ramp up to 5 users in 5 minutes
        { duration: '30m', target: 120 }, // Ramp up to 120 users in 30 minutes
        { duration: '15m', target: 50 }, // Ramp up to 50 users in 15 minutes
        { duration: '5m', target: 5 } 
      ],
}


export default function(){
   let res_200 =  http.get('https://k6-http.grafana.fun/status/200');

   //no response is passed therefore check the etatus code
    check(res_200, {  
        'status 200': (resp) => resp.status === 200 });
    sleep(1);
}
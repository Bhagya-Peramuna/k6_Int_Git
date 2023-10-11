import http from 'k6/http'
import { check, sleep } from 'k6';

export const options ={
    scenarios: {
        login_test: {
            // executor: 'shared-iterations',
            exec: 'login',
            // vus: 5,
            // iterations: 5,
            // duration: '4s',
            executor: 'ramping-vus',
            startVUs: 1,
            stages: [
              { duration: '5s', target: 4 },
              { duration: '10s', target: 10 },
            //   { duration: '5m', target: 14 },  // 5 minutes at 14 VUs
            //   { duration: '10m', target: 65 }, // 10 minutes at 65 VUs
            //   { duration: '20m', target: 150 } 
            ],
            gracefulRampDown: '3s',

        },
        get_200: {
            // executor: 'shared-iterations',
            executor: 'constant-vus',
            exec: 'API_get200',
            vus: 6,
            // iterations: 17,
            duration: '10s',
        },
        get_500: {
            // executor: 'shared-iterations',
            executor: 'constant-vus',
            exec: 'API_get500',
            vus: 9,
            // iterations: 5,
            duration: '15s',
        },
        post_API: {
            // executor: 'shared-iterations',
            executor: 'constant-vus',
            exec: 'API_post',
            vus: 8,
            // iterations: 5,
            duration: '7s',
        }
    }
}


export function login(){
    const users = [
        { user: 'test', passwd: '1234' },
        { user: 'test', passwd: '1234' },
      
      ];
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


export function API_get200(){
    let res_200 =  http.get('https://k6-http.grafana.fun/status/200');

    check(res_200, { 
        'status 200': (resp) => resp.status === 200 });
        sleep(2);
}

export function API_get500(){
    let res_500 = http.get('https://k6-http.grafana.fun/status/500');
    check(res_500, { 'get status 200': (resp) => resp.status === 200 });
    sleep(1);
}

export function API_post(){
    let res_200 =  http.post('https://k6-http.grafana.fun/status/200');
    check(res_200, { 
    'post status 200': (resp) => resp.status === 200 });
    sleep(1);
}




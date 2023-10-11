import http from 'k6/http'
import { check, sleep } from 'k6';
import pizza from './pizza/pizza.js';
export const options ={
    scenarios: {
        get_200: {
            // executor: 'shared-iterations',
            // executor: 'constant-vus',
            exec: 'API_get200',
            // vus: 6,
            // iterations: 17,
            // duration: '10s',
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
              { duration: '5s', target: 5 },  // 5 minutes at 14 VUs
              // { duration: '10m', target: 65 }, // 10 minutes at 65 VUs
              // { duration: '20m', target: 150 } 
            ],
            // gracefulRampDown: '3s',
        },

        pizza: {
            // executor: 'shared-iterations',
            // executor: 'constant-vus',
            exec: 'pizza_post',
            // vus: 6,
            // iterations: 17,
            // duration: '10s',
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
              // { duration: '20m', target: 100 }, 
              // { duration: '15m', target: 65 }, // 10 minutes at 65 VUs
              { duration: '3', target: 1 } 
            ],
            // gracefulRampDown: '3s',
        },
    }
}


export function API_get200(){
    let res_200 =  http.get('https://k6-http.grafana.fun/status/200');

    check(res_200, { 
        'status 200 http bin': (resp) => resp.status === 200 });
        sleep(2);
}
//........................................................................
let restrictions = {
    maxCaloriesPerSlice: 500,
    mustBeVegetarian: true,
    excludedIngredients: ["pepperoni"],
    excludedTools: ["knife"],
    maxNumberOfToppings: 6,
    minNumberOfToppings: 2
  }
export function pizza_post(){
    let res = http.post(`https://pizza.grafana.fun/api/pizza`, JSON.stringify(restrictions),{
    headers: {
        'Content-Type': 'application/json',
        'X-User-ID': 335167,
      },
    }
      )

    check(res, { 
        'status 200 pizza': (res) => res.status === 200 });
        sleep(2);
}
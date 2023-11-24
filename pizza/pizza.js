import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 2,
  duration: '10m',
  // stages: [
  //   { duration: '10s', target: 5 },   // Ramp up to 5 users in 5 minutes
  //   { duration: '5m', target: 20 }, // Ramp up to 20 users in 10 minutes
  //   { duration: '15m', target: 50 }, // Ramp up to 50 users in 15 minutes
  //   { duration: '30m', target: 120 } // Ramp up to 120 users in 30 minutes
  // ],
};

export default function () {
  let restrictions = {
    maxCaloriesPerSlice: 500,
    mustBeVegetarian: true,
    excludedIngredients: ["pepperoni"],
    excludedTools: ["knife"],
    maxNumberOfToppings: 6,
    minNumberOfToppings: 2
  }
  let res = http.post(`https://pizza.grafana.fun/api/pizza`, JSON.stringify(restrictions), {
    headers: {
      'Content-Type': 'application/json',
      'X-User-ID': 335167,
    },
  });
  check(res, { "status is 200": (res) => res.status === 200 });
  // console.log(`${res.json().pizza.name} (${res.json().pizza.ingredients.length} ingredients)`);
  // console.log(`Name: ${res.json().pizza.name} Crust:${res.json().pizza.dough.name} Ingredients: ${res.json().pizza.ingredients.map(ingredient => ingredient.name).join(', ')}\n`);

  sleep(1);
}

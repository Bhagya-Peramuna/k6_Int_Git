import http from 'k6/http';
import {sleep,check} from 'k6';

export const options={
    vus: 2,
    duration: '10s',
}


export default function(){


    let res_500 = http.get('https://k6-http.grafana.fun/status/500');
    check(res_500, { 'server error': (resp) => resp.status === 200 });

    sleep(1);
}
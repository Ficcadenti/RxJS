
const apiurl = 'https://jsonplaceholder.typicode.com/albums';

import { from, of } from './node_modules/rxjs/';
import { switchMap, tap, map, filter } from './node_modules/rxjs/operators';
import fetch from 'node-fetch';



const promise = fetch(apiurl)
    .then(body => body.json());
//.then(res=> console.log(res));
//----[{...},{...}]//
//--{...},{....},{...}
// from ([1,3,3,4])
// of (1,3,3,4)
// of(...[1,3,3,4])
from(promise).subscribe(res => console.log(res))       
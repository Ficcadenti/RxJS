import { from } from './node_modules/rxjs/';
import { tap, map, filter } from './node_modules/rxjs/operators';

console.log("RxJS - From !!!!!");

from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).pipe(
    filter(n => n % 2 === 0),
    tap(e => console.log('tap =' + e)),
    map(n => n * 2)
).subscribe(e => console.log(e));
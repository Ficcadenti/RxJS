import { range } from './node_modules/rxjs/';
import { map, filter } from './node_modules/rxjs/operators';

//-1-2-3-4-5-6-
range(1, 200).pipe(
    filter(x => x % 2 === 0),
    map(x => x * x)
).subscribe(x => console.log("+++++" + x));
import { Observable } from './node_modules/rxjs/';

const objs = new Observable(subscriber => {

    // next, error, 
    // 1---2---3---4---5
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    subscriber.next(4);
    subscriber.complete();
    subscriber.next(5);// non viene emesso
});
objs.subscribe(x => { console.log(x) }
    , error => {
        console.log(error)
    }, () => {
        console.log('Valori terminati !!!!');
    });
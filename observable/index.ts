import { Observable } from './node_modules/rxjs/';

const objs = new Observable(subscriber => {

    // next, error, 
    // 1---2---3---4---5
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    setTimeout(() => { subscriber.next(4); }, 4000); //async
    //subscriber.complete(); //sync
    subscriber.next(5);// non viene emesso
});
objs.subscribe(x => {
    console.log('subscribe1 = ' + x)
}, error => {
    console.log(error)
}, () => {
    console.log('Valori terminati !!!!');
});

objs.subscribe({
    next: v => { console.log('subscribe2 = ' + v) },
    complete: () => { console.log('Second subscribe finished') },
    error: error => console.log(error)
});
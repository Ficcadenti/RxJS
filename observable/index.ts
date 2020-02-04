import { Observable } from './node_modules/rxjs/';

const objs = new Observable(subscriber => {

    // next, error, 
    // 1---2---3
    subscriber.next(1);
    subscriber.next(2);
    setTimeout(() => { subscriber.next(4); }, 4000);
    //subscriber.complete();
    subscriber.next(3);// it won't be delivered

});
objs.subscribe(
    v => {
        console.log(v);
    }
    , error => {
        console.log(error)
    }, () => {
        console.log('values completed');
    }
);
console.log('subscribe 1 end');
objs.subscribe({
    next: v => {
        console.log('subscribe2 =' + v)
    },
    complete: () => { console.log('Second subscribe finished') },
    error: error => console.log(error)
});
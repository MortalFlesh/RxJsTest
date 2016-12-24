import Rx from "rx";

const clickableObservable = Rx.Observable
    .fromEvent(document, 'click');

const clockObservable = clickableObservable
    .map(click => Rx.Observable.interval(1000));

clockObservable
    .subscribe((clock) => clock.subscribe((x) => console.log(`tick ${x}`)));

import { ReplaySubject, Subject } from 'rxjs';
import type { LifecycleEvent } from '@owservable/core';
declare class MongoObservableDatabase extends Subject<any> {
    private _stream;
    private static _instance;
    readonly lifecycle: ReplaySubject<LifecycleEvent>;
    static init(): MongoObservableDatabase;
    constructor();
    private _initializeStream;
    private _reconnect;
}
export default MongoObservableDatabase;

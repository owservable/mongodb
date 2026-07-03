import { ReplaySubject, Subject } from 'rxjs';
import type { LifecycleEvent } from '@owservable/core';
declare class ObservableDatabase extends Subject<any> {
    private _stream;
    private static _instance;
    readonly lifecycle: ReplaySubject<LifecycleEvent>;
    static init(): ObservableDatabase;
    constructor();
    private _initializeStream;
    private _reconnect;
}
export default ObservableDatabase;

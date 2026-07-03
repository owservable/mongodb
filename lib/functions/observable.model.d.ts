import { ReplaySubject, Subject } from 'rxjs';
import type { LifecycleEvent } from '@owservable/core';
declare class ObservableModel extends Subject<any> {
    private readonly _collection;
    private _stream;
    readonly lifecycle: ReplaySubject<LifecycleEvent>;
    constructor(collection: string);
    private _initializeStream;
    private _reconnect;
}
export default ObservableModel;

'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const rxjs_1 = require("rxjs");
class ObservableModel extends rxjs_1.Subject {
    constructor(collection) {
        super();
        this._collection = collection;
        this.lifecycle = new rxjs_1.ReplaySubject(1);
        this._initializeStream();
    }
    _initializeStream() {
        const db = mongoose_1.default.connection.db;
        const collectionObj = db.collection(this._collection);
        this._stream = collectionObj.watch([], { fullDocument: 'updateLookup' });
        this._stream.on('change', (change) => {
            try {
                const { ns, documentKey, operationType, updateDescription, fullDocument } = change;
                this.next({ ns, documentKey, operationType, updateDescription, fullDocument });
            }
            catch (error) {
                console.error(`[@owservable] -> ObservableModel[${this._collection}] Error in change event:`, error);
                this.lifecycle.next({
                    type: 'error',
                    collection: this._collection,
                    timestamp: new Date(),
                    error
                });
            }
        });
        this._stream.on('error', (error) => {
            console.error(`[@owservable] -> ObservableModel[${this._collection}] ChangeStream error event:`, error, ', attempting reconnection...');
            this.lifecycle.next({
                type: 'error',
                collection: this._collection,
                timestamp: new Date(),
                error
            });
            this._reconnect();
        });
        this._stream.on('close', () => {
            console.warn(`[@owservable] -> ObservableModel[${this._collection}] ChangeStream close event: stream has closed, attempting reconnection...`);
            this.lifecycle.next({
                type: 'close',
                collection: this._collection,
                timestamp: new Date()
            });
            this._reconnect();
        });
        this._stream.on('end', () => {
            console.warn(`[@owservable] -> ObservableModel[${this._collection}] ChangeStream end event: stream has ended, attempting reconnection...`);
            this.lifecycle.next({
                type: 'end',
                collection: this._collection,
                timestamp: new Date()
            });
            this._reconnect();
        });
        this.lifecycle.next({
            type: 'live',
            collection: this._collection,
            timestamp: new Date()
        });
    }
    _reconnect() {
        console.info(`[@owservable] -> ObservableModel[${this._collection}] Reconnecting ChangeStream...`);
        try {
            if (this._stream) {
                this._stream.removeAllListeners();
            }
        }
        catch (error) {
            console.error(`[@owservable] -> ObservableModel[${this._collection}] Error cleaning up old stream:`, error);
        }
        this._initializeStream();
    }
}
exports.default = ObservableModel;
//# sourceMappingURL=observable.model.js.map
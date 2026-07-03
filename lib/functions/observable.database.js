'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const mongoose_1 = __importDefault(require("mongoose"));
class MongoObservableDatabase extends rxjs_1.Subject {
    static init() {
        if (!MongoObservableDatabase._instance)
            MongoObservableDatabase._instance = new MongoObservableDatabase();
        return MongoObservableDatabase._instance;
    }
    constructor() {
        super();
        this.lifecycle = new rxjs_1.ReplaySubject(1);
        this._initializeStream();
    }
    _initializeStream() {
        const db = mongoose_1.default.connection.db;
        this._stream = db.watch([], { fullDocument: 'updateLookup' });
        this._stream.on('change', (change) => {
            try {
                const { ns, documentKey, operationType, updateDescription, fullDocument } = change;
                this.next({ ns, documentKey, operationType, updateDescription, fullDocument });
            }
            catch (error) {
                console.error('[@owservable] -> MongoObservableDatabase Error in change event:', error);
                this.lifecycle.next({
                    type: 'error',
                    collection: '*',
                    timestamp: new Date(),
                    error
                });
            }
        });
        this._stream.on('error', (error) => {
            console.error('[@owservable] -> MongoObservableDatabase ChangeStream error event:', error, ', attempting reconnection...');
            this.lifecycle.next({
                type: 'error',
                collection: '*',
                timestamp: new Date(),
                error
            });
            this._reconnect();
        });
        this._stream.on('close', () => {
            console.warn('[@owservable] -> MongoObservableDatabase ChangeStream close event: stream has closed, attempting reconnection...');
            this.lifecycle.next({
                type: 'close',
                collection: '*',
                timestamp: new Date()
            });
            this._reconnect();
        });
        this._stream.on('end', () => {
            console.warn('[@owservable] -> MongoObservableDatabase ChangeStream end event: stream has ended, attempting reconnection...');
            this.lifecycle.next({
                type: 'end',
                collection: '*',
                timestamp: new Date()
            });
            this._reconnect();
        });
        this.lifecycle.next({
            type: 'live',
            collection: '*',
            timestamp: new Date()
        });
    }
    _reconnect() {
        console.info('[@owservable] -> MongoObservableDatabase Reconnecting ChangeStream...');
        try {
            if (this._stream) {
                this._stream.removeAllListeners();
            }
        }
        catch (error) {
            console.error('[@owservable] -> MongoObservableDatabase Error cleaning up old stream:', error);
        }
        this._initializeStream();
    }
}
exports.default = MongoObservableDatabase;
//# sourceMappingURL=observable.database.js.map
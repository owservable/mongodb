import { Model } from 'mongoose';
import MongoObservableModel from './observable.model';
declare class MongoObservableModelsMap {
    private static _instance;
    static init(): MongoObservableModelsMap;
    static get(model: Model<any>): MongoObservableModel;
    private readonly _map;
    private constructor();
}
export default MongoObservableModelsMap;

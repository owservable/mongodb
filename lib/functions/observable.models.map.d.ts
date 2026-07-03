import { Model } from 'mongoose';
import ObservableModel from './observable.model';
declare class ObservableModelsMap {
    private static _instance;
    static init(): ObservableModelsMap;
    static get(model: Model<any>): ObservableModel;
    private readonly _map;
    private constructor();
}
export default ObservableModelsMap;

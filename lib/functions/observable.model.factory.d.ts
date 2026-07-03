import { Model } from 'mongoose';
import MongoObservableModel from './observable.model';
declare const observableMongoModel: (model: Model<any>) => MongoObservableModel;
export default observableMongoModel;

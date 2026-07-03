import { Model } from 'mongoose';
import ObservableModel from './observable.model';
declare const observableModel: (model: Model<any>) => ObservableModel;
export default observableModel;

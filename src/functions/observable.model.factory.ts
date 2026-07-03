'use strict';

import {Model} from 'mongoose';

import MongoObservableModel from './observable.model';
import MongoObservableModelsMap from './observable.models.map';

const observableMongoModel = (model: Model<any>): MongoObservableModel => MongoObservableModelsMap.get(model);
export default observableMongoModel;

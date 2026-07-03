'use strict';

import MongoObservableDatabase from './observable.database';

const observableMongoDatabase = (): MongoObservableDatabase => MongoObservableDatabase.init();
export default observableMongoDatabase;

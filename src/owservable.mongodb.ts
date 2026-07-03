'use strict';

import MongoBackend from './mongo.backend';
import MongoDBConnector from './mongodb.connector';
import MongoCollectionsModelsMap from './collections.models.map';

import processMongoModels from './functions/process.models';
import observableMongoModel from './functions/observable.model.factory';
import observableMongoDatabase from './functions/observable.database.factory';
import addMongoIndexToAttributes from './functions/index/add.index.to.attributes';
import addMongoUpIndicesToAttributes from './functions/index/add.up.indices.to.attributes';
import addMongoDownIndicesToAttributes from './functions/index/add.down.indices.to.attributes';
import addMongoUpAndDownIndicesToAttributes from './functions/index/add.up.and.down.indices.to.attributes';

export {
	MongoBackend,
	MongoDBConnector,
	MongoCollectionsModelsMap,
	processMongoModels,
	observableMongoModel,
	observableMongoDatabase,
	addMongoIndexToAttributes,
	addMongoUpIndicesToAttributes,
	addMongoDownIndicesToAttributes,
	addMongoUpAndDownIndicesToAttributes
};
const OwservableMongoDB = {};
export default OwservableMongoDB;

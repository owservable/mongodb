'use strict';

jest.mock('@owservable/core', () => ({
	BackendRegistry: jest.requireActual('@owservable/core/lib/backend/backend.registry').default
}));

import OwservableMongoDB, {
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
} from '../src/owservable.mongodb';

import MongoBackendDirect from '../src/mongo.backend';
import MongoDBConnectorDirect from '../src/mongodb.connector';
import CollectionsModelsMapDirect from '../src/collections.models.map';
import processModelsDirect from '../src/functions/process.models';
import observableModelDirect from '../src/functions/observable.model.factory';
import observableDatabaseDirect from '../src/functions/observable.database.factory';
import addIndexToAttributesDirect from '../src/functions/index/add.index.to.attributes';
import addUpIndicesToAttributesDirect from '../src/functions/index/add.up.indices.to.attributes';
import addDownIndicesToAttributesDirect from '../src/functions/index/add.down.indices.to.attributes';
import addUpAndDownIndicesToAttributesDirect from '../src/functions/index/add.up.and.down.indices.to.attributes';

describe('owservable.mongodb tests', () => {
	it('exports MongoBackend', () => {
		expect(MongoBackend).toBeDefined();
		expect(MongoBackend).toBe(MongoBackendDirect);
	});

	it('exports MongoDBConnector', () => {
		expect(MongoDBConnector).toBeDefined();
		expect(MongoDBConnector).toBe(MongoDBConnectorDirect);
	});

	it('exports MongoCollectionsModelsMap', () => {
		expect(MongoCollectionsModelsMap).toBeDefined();
		expect(MongoCollectionsModelsMap).toBe(CollectionsModelsMapDirect);
	});

	it('exports processMongoModels', () => {
		expect(processMongoModels).toBeDefined();
		expect(processMongoModels).toBe(processModelsDirect);
	});

	it('exports observableMongoModel', () => {
		expect(observableMongoModel).toBeDefined();
		expect(observableMongoModel).toBe(observableModelDirect);
	});

	it('exports observableMongoDatabase', () => {
		expect(observableMongoDatabase).toBeDefined();
		expect(observableMongoDatabase).toBe(observableDatabaseDirect);
	});

	it('exports addMongoIndexToAttributes', () => {
		expect(addMongoIndexToAttributes).toBeDefined();
		expect(addMongoIndexToAttributes).toBe(addIndexToAttributesDirect);
	});

	it('exports addMongoUpIndicesToAttributes', () => {
		expect(addMongoUpIndicesToAttributes).toBeDefined();
		expect(addMongoUpIndicesToAttributes).toBe(addUpIndicesToAttributesDirect);
	});

	it('exports addMongoDownIndicesToAttributes', () => {
		expect(addMongoDownIndicesToAttributes).toBeDefined();
		expect(addMongoDownIndicesToAttributes).toBe(addDownIndicesToAttributesDirect);
	});

	it('exports addMongoUpAndDownIndicesToAttributes', () => {
		expect(addMongoUpAndDownIndicesToAttributes).toBeDefined();
		expect(addMongoUpAndDownIndicesToAttributes).toBe(addUpAndDownIndicesToAttributesDirect);
	});

	it('exports an empty default object', () => {
		expect(OwservableMongoDB).toBeDefined();
		expect(typeof OwservableMongoDB).toBe('object');
		expect(OwservableMongoDB).toEqual({});
	});
});

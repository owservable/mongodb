'use strict';

jest.mock('@owservable/core', () => ({
	BackendRegistry: jest.requireActual('@owservable/core/lib/backend/backend.registry').default
}));

import OwservableMongoDB, {
	MongoBackend,
	MongoDBConnector,
	CollectionsModelsMap,
	processModels,
	observableModel,
	observableDatabase,
	addIndexToAttributes,
	addUpIndicesToAttributes,
	addDownIndicesToAttributes,
	addUpAndDownIndicesToAttributes
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

	it('exports CollectionsModelsMap', () => {
		expect(CollectionsModelsMap).toBeDefined();
		expect(CollectionsModelsMap).toBe(CollectionsModelsMapDirect);
	});

	it('exports processModels', () => {
		expect(processModels).toBeDefined();
		expect(processModels).toBe(processModelsDirect);
	});

	it('exports observableModel', () => {
		expect(observableModel).toBeDefined();
		expect(observableModel).toBe(observableModelDirect);
	});

	it('exports observableDatabase', () => {
		expect(observableDatabase).toBeDefined();
		expect(observableDatabase).toBe(observableDatabaseDirect);
	});

	it('exports addIndexToAttributes', () => {
		expect(addIndexToAttributes).toBeDefined();
		expect(addIndexToAttributes).toBe(addIndexToAttributesDirect);
	});

	it('exports addUpIndicesToAttributes', () => {
		expect(addUpIndicesToAttributes).toBeDefined();
		expect(addUpIndicesToAttributes).toBe(addUpIndicesToAttributesDirect);
	});

	it('exports addDownIndicesToAttributes', () => {
		expect(addDownIndicesToAttributes).toBeDefined();
		expect(addDownIndicesToAttributes).toBe(addDownIndicesToAttributesDirect);
	});

	it('exports addUpAndDownIndicesToAttributes', () => {
		expect(addUpAndDownIndicesToAttributes).toBeDefined();
		expect(addUpAndDownIndicesToAttributes).toBe(addUpAndDownIndicesToAttributesDirect);
	});

	it('exports an empty default object', () => {
		expect(OwservableMongoDB).toBeDefined();
		expect(typeof OwservableMongoDB).toBe('object');
		expect(OwservableMongoDB).toEqual({});
	});
});

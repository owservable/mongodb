'use strict';

import {Model} from 'mongoose';
import observableMongoModel from '../../src/functions/observable.model.factory';
import MongoObservableModel from '../../src/functions/observable.model';
import MongoObservableModelsMap from '../../src/functions/observable.models.map';

jest.mock('../../src/functions/observable.models.map');

describe('observable.model.factory tests', () => {
	let mockModel1: jest.Mocked<Model<any>>;
	let mockModel2: jest.Mocked<Model<any>>;
	let mockObservableModel1: any;
	let mockObservableModel2: any;
	let mockGetSpy: jest.SpyInstance;

	beforeEach(() => {
		jest.clearAllMocks();

		mockModel1 = {
			collection: {
				collectionName: 'testCollection1'
			}
		} as any;

		mockModel2 = {
			collection: {
				collectionName: 'testCollection2'
			}
		} as any;

		mockObservableModel1 = {subscribe: jest.fn(), lifecycle: {subscribe: jest.fn()}} as any;
		mockObservableModel2 = {subscribe: jest.fn(), lifecycle: {subscribe: jest.fn()}} as any;

		mockGetSpy = jest.spyOn(MongoObservableModelsMap, 'get');
		mockGetSpy.mockImplementation((model: Model<any>) => {
			if (model.collection.collectionName === 'testCollection1') {
				return mockObservableModel1;
			}
			return mockObservableModel2;
		});
	});

	afterEach(() => {
		mockGetSpy.mockRestore();
	});

	it('should be a function', () => {
		expect(typeof observableMongoModel).toBe('function');
	});

	it('should return an MongoObservableModel', () => {
		const result: MongoObservableModel = observableMongoModel(mockModel1);
		expect(result).toBeDefined();
		expect(result.subscribe).toBeDefined();
		expect(result.lifecycle).toBeDefined();
	});

	it('should delegate to MongoObservableModelsMap.get with the correct model', () => {
		observableMongoModel(mockModel1);
		expect(MongoObservableModelsMap.get).toHaveBeenCalledWith(mockModel1);
		expect(MongoObservableModelsMap.get).toHaveBeenCalledTimes(1);
	});

	it('should return the result from MongoObservableModelsMap.get', () => {
		const result: MongoObservableModel = observableMongoModel(mockModel1);
		expect(result).toBe(mockObservableModel1);
	});

	it('should return different results for different models', () => {
		const result1: MongoObservableModel = observableMongoModel(mockModel1);
		const result2: MongoObservableModel = observableMongoModel(mockModel2);

		expect(result1).toBe(mockObservableModel1);
		expect(result2).toBe(mockObservableModel2);
		expect(result1).not.toBe(result2);
	});

	it('should call MongoObservableModelsMap.get each time it is invoked', () => {
		observableMongoModel(mockModel1);
		observableMongoModel(mockModel1);
		observableMongoModel(mockModel2);

		expect(MongoObservableModelsMap.get).toHaveBeenCalledTimes(3);
		expect(MongoObservableModelsMap.get).toHaveBeenNthCalledWith(1, mockModel1);
		expect(MongoObservableModelsMap.get).toHaveBeenNthCalledWith(2, mockModel1);
		expect(MongoObservableModelsMap.get).toHaveBeenNthCalledWith(3, mockModel2);
	});
});

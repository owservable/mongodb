'use strict';

import {Model} from 'mongoose';
import MongoObservableModelsMap from '../../src/functions/observable.models.map';
import MongoObservableModel from '../../src/functions/observable.model';

jest.mock('../../src/functions/observable.model');

describe('observable.models.map tests', () => {
	let mockModel1: jest.Mocked<Model<any>>;
	let mockModel2: jest.Mocked<Model<any>>;
	let mockModel3: jest.Mocked<Model<any>>;

	beforeEach(() => {
		jest.clearAllMocks();

		(MongoObservableModelsMap as any)._instance = undefined;

		mockModel1 = {
			collection: {
				collectionName: 'collection1'
			}
		} as any;

		mockModel2 = {
			collection: {
				collectionName: 'collection2'
			}
		} as any;

		mockModel3 = {
			collection: {
				collectionName: 'collection1'
			}
		} as any;

		(MongoObservableModel as jest.MockedClass<typeof MongoObservableModel>).mockImplementation((collectionName: string) => {
			return {
				collectionName,
				_collection: collectionName
			} as any;
		});
	});

	describe('init', () => {
		it('should return an instance of MongoObservableModelsMap', () => {
			const instance: MongoObservableModelsMap = MongoObservableModelsMap.init();
			expect(instance).toBeInstanceOf(MongoObservableModelsMap);
		});

		it('should return the same instance on multiple calls (singleton)', () => {
			const instance1: MongoObservableModelsMap = MongoObservableModelsMap.init();
			const instance2: MongoObservableModelsMap = MongoObservableModelsMap.init();
			expect(instance1).toBe(instance2);
		});
	});

	describe('get', () => {
		it('should return an MongoObservableModel instance', () => {
			const result: MongoObservableModel = MongoObservableModelsMap.get(mockModel1);
			expect(result).toBeDefined();
			expect(MongoObservableModel).toHaveBeenCalledWith('collection1');
		});

		it('should return the same MongoObservableModel instance for the same collection name', () => {
			const result1: MongoObservableModel = MongoObservableModelsMap.get(mockModel1);
			const result2: MongoObservableModel = MongoObservableModelsMap.get(mockModel3);

			expect(result1).toBe(result2);
			expect(MongoObservableModel).toHaveBeenCalledTimes(1);
		});

		it('should return different MongoObservableModel instances for different collection names', () => {
			const result1: MongoObservableModel = MongoObservableModelsMap.get(mockModel1);
			const result2: MongoObservableModel = MongoObservableModelsMap.get(mockModel2);

			expect(result1).not.toBe(result2);
			expect(MongoObservableModel).toHaveBeenCalledTimes(2);
			expect(MongoObservableModel).toHaveBeenCalledWith('collection1');
			expect(MongoObservableModel).toHaveBeenCalledWith('collection2');
		});

		it('should cache MongoObservableModel instances in the internal map', () => {
			MongoObservableModelsMap.get(mockModel1);
			expect(MongoObservableModel).toHaveBeenCalledTimes(1);

			MongoObservableModelsMap.get(mockModel1);
			expect(MongoObservableModel).toHaveBeenCalledTimes(1);

			MongoObservableModelsMap.get(mockModel2);
			expect(MongoObservableModel).toHaveBeenCalledTimes(2);
		});
	});
});

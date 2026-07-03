'use strict';

import observableMongoDatabase from '../../src/functions/observable.database.factory';
import MongoObservableDatabase from '../../src/functions/observable.database';

jest.mock('../../src/functions/observable.database');

describe('observable.database.factory tests', () => {
	let mockObservableDatabaseInstance: any;
	let mockInitSpy: jest.SpyInstance;

	beforeEach(() => {
		jest.clearAllMocks();

		mockObservableDatabaseInstance = {
			subscribe: jest.fn(),
			lifecycle: {subscribe: jest.fn()}
		};

		mockInitSpy = jest.spyOn(MongoObservableDatabase, 'init');
		mockInitSpy.mockReturnValue(mockObservableDatabaseInstance);
	});

	afterEach(() => {
		mockInitSpy.mockRestore();
	});

	it('should be a function', () => {
		expect(typeof observableMongoDatabase).toBe('function');
	});

	it('should return an MongoObservableDatabase instance', () => {
		const result: MongoObservableDatabase = observableMongoDatabase();
		expect(result).toBeDefined();
		expect(result.subscribe).toBeDefined();
		expect(result.lifecycle).toBeDefined();
	});

	it('should delegate to MongoObservableDatabase.init', () => {
		observableMongoDatabase();
		expect(MongoObservableDatabase.init).toHaveBeenCalledTimes(1);
		expect(MongoObservableDatabase.init).toHaveBeenCalledWith();
	});

	it('should return the result from MongoObservableDatabase.init', () => {
		const result: MongoObservableDatabase = observableMongoDatabase();
		expect(result).toBe(mockObservableDatabaseInstance);
	});

	it('should return the same instance on multiple calls (singleton)', () => {
		const result1: MongoObservableDatabase = observableMongoDatabase();
		const result2: MongoObservableDatabase = observableMongoDatabase();

		expect(result1).toBe(result2);
		expect(result1).toBe(mockObservableDatabaseInstance);
		expect(result2).toBe(mockObservableDatabaseInstance);
	});

	it('should call MongoObservableDatabase.init each time it is invoked', () => {
		observableMongoDatabase();
		observableMongoDatabase();
		observableMongoDatabase();

		expect(MongoObservableDatabase.init).toHaveBeenCalledTimes(3);
	});
});

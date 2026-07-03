'use strict';

import MongoBackend from '../src/mongo.backend';
import observableMongoModel from '../src/functions/observable.model.factory';

jest.mock('../src/functions/observable.model.factory');

const mockObservableModel = observableMongoModel as jest.MockedFunction<typeof observableMongoModel>;

describe('mongo.backend tests', () => {
	let mockModel: any;
	let backend: MongoBackend;

	beforeEach(() => {
		jest.clearAllMocks();

		mockModel = {
			collection: {collectionName: 'things'},
			find: jest.fn(),
			findOne: jest.fn(),
			findById: jest.fn(),
			countDocuments: jest.fn(),
			populate: jest.fn()
		};
		backend = new MongoBackend(mockModel);
	});

	it('should be defined', () => {
		expect(MongoBackend).toBeDefined();
		expect(typeof MongoBackend).toBe('function');
	});

	describe('target', () => {
		it('should return the collection name', () => {
			expect(backend.target()).toBe('things');
		});
	});

	describe('changes', () => {
		it('should delegate to the observableMongoModel factory', () => {
			const subject: any = {subscribe: jest.fn()};
			mockObservableModel.mockReturnValue(subject);

			const result = backend.changes();

			expect(mockObservableModel).toHaveBeenCalledTimes(1);
			expect(mockObservableModel).toHaveBeenCalledWith(mockModel);
			expect(result).toBe(subject);
		});
	});

	describe('find', () => {
		it('should query with sort and allowDiskUse and populate each entry via the model', async () => {
			const documents: any[] = [{_id: '1'}, {_id: '2'}];
			const setOptions: jest.Mock = jest.fn().mockResolvedValue(documents);
			const sort: jest.Mock = jest.fn().mockReturnValue({setOptions});
			mockModel.find.mockReturnValue({sort});
			mockModel.populate.mockResolvedValue(documents);

			const result = await backend.find({active: true}, {name: 1}, {skip: 0, limit: 10}, {name: -1}, ['author', 'tags']);

			expect(mockModel.find).toHaveBeenCalledWith({active: true}, {name: 1}, {skip: 0, limit: 10});
			expect(sort).toHaveBeenCalledWith({name: -1});
			expect(setOptions).toHaveBeenCalledWith({allowDiskUse: true});
			expect(mockModel.populate).toHaveBeenCalledTimes(2);
			expect(mockModel.populate).toHaveBeenNthCalledWith(1, documents, 'author');
			expect(mockModel.populate).toHaveBeenNthCalledWith(2, documents, 'tags');
			expect(result).toBe(documents);
		});

		it('should skip populating when populates is empty', async () => {
			const documents: any[] = [];
			const setOptions: jest.Mock = jest.fn().mockResolvedValue(documents);
			const sort: jest.Mock = jest.fn().mockReturnValue({setOptions});
			mockModel.find.mockReturnValue({sort});

			const result = await backend.find({}, null, {}, {}, []);

			expect(mockModel.populate).not.toHaveBeenCalled();
			expect(result).toBe(documents);
		});
	});

	describe('findOne', () => {
		it('should find a document and populate it', async () => {
			const document: any = {populate: jest.fn().mockResolvedValue('populated')};
			mockModel.findOne.mockResolvedValue(document);

			const result = await backend.findOne({name: 'x'}, {name: 1}, ['author']);

			expect(mockModel.findOne).toHaveBeenCalledWith({name: 'x'}, {name: 1});
			expect(document.populate).toHaveBeenCalledWith('author');
			expect(result).toBe(document);
		});

		it('should return a null document untouched', async () => {
			mockModel.findOne.mockResolvedValue(null);

			const result = await backend.findOne({name: 'x'}, null, ['author']);

			expect(result).toBeNull();
			expect(mockModel.populate).not.toHaveBeenCalled();
		});

		it('should skip populating when populates is empty', async () => {
			const document: any = {name: 'x'};
			mockModel.findOne.mockResolvedValue(document);

			const result = await backend.findOne({name: 'x'}, null, []);

			expect(result).toBe(document);
			expect(mockModel.populate).not.toHaveBeenCalled();
		});
	});

	describe('findById', () => {
		it('should find a document by id and populate it', async () => {
			const document: any = {populate: jest.fn().mockResolvedValue('populated')};
			mockModel.findById.mockResolvedValue(document);

			const result = await backend.findById('id1', {name: 1}, ['author', 'tags']);

			expect(mockModel.findById).toHaveBeenCalledWith('id1', {name: 1});
			expect(document.populate).toHaveBeenCalledTimes(2);
			expect(document.populate).toHaveBeenNthCalledWith(1, 'author');
			expect(document.populate).toHaveBeenNthCalledWith(2, 'tags');
			expect(result).toBe(document);
		});

		it('should return a null document untouched', async () => {
			mockModel.findById.mockResolvedValue(null);

			const result = await backend.findById('missing', null, ['author']);

			expect(result).toBeNull();
			expect(mockModel.populate).not.toHaveBeenCalled();
		});

		it('should skip populating when populates is empty', async () => {
			const document: any = {name: 'x'};
			mockModel.findById.mockResolvedValue(document);

			const result = await backend.findById('id1', null, []);

			expect(result).toBe(document);
			expect(mockModel.populate).not.toHaveBeenCalled();
		});
	});

	describe('count', () => {
		it('should delegate to countDocuments', async () => {
			mockModel.countDocuments.mockResolvedValue(42);

			const result = await backend.count({active: true});

			expect(mockModel.countDocuments).toHaveBeenCalledWith({active: true});
			expect(result).toBe(42);
		});
	});

	describe('populate', () => {
		it('should return null as-is', async () => {
			const result = await backend.populate(null, 'author');

			expect(result).toBeNull();
			expect(mockModel.populate).not.toHaveBeenCalled();
		});

		it('should return undefined as-is', async () => {
			const result = await backend.populate(undefined, 'author');

			expect(result).toBeUndefined();
			expect(mockModel.populate).not.toHaveBeenCalled();
		});

		it('should populate arrays via the model', async () => {
			const documents: any[] = [{_id: '1'}];
			mockModel.populate.mockResolvedValue('populatedArray');

			const result = await backend.populate(documents, 'author');

			expect(mockModel.populate).toHaveBeenCalledWith(documents, 'author');
			expect(result).toBe('populatedArray');
		});

		it('should populate documents exposing a populate method via the instance', async () => {
			const document: any = {populate: jest.fn().mockResolvedValue('populatedDoc')};

			const result = await backend.populate(document, 'author');

			expect(document.populate).toHaveBeenCalledWith('author');
			expect(mockModel.populate).not.toHaveBeenCalled();
			expect(result).toBe('populatedDoc');
		});

		it('should populate plain objects via the model', async () => {
			const document: any = {_id: '1'};
			mockModel.populate.mockResolvedValue('populatedPojo');

			const result = await backend.populate(document, 'author');

			expect(mockModel.populate).toHaveBeenCalledWith(document, 'author');
			expect(result).toBe('populatedPojo');
		});
	});

	describe('toJSON', () => {
		it('should call toJSON when available', () => {
			const json: any = {a: 1};
			const document: any = {toJSON: jest.fn().mockReturnValue(json)};

			const result = backend.toJSON(document);

			expect(document.toJSON).toHaveBeenCalledTimes(1);
			expect(result).toBe(json);
		});

		it('should return plain objects as-is', () => {
			const document: any = {a: 1};
			expect(backend.toJSON(document)).toBe(document);
		});

		it('should return null as-is', () => {
			expect(backend.toJSON(null)).toBeNull();
		});

		it('should return undefined as-is', () => {
			expect(backend.toJSON(undefined)).toBeUndefined();
		});
	});

	describe('resolveVirtuals', () => {
		it('should replace virtuals with awaited values', async () => {
			const document: any = {
				toJSON: (): any => ({name: 'n', v1: 'stale', v2: 'stale'}),
				v1: Promise.resolve('fresh1'),
				v2: 'fresh2'
			};

			const result = await backend.resolveVirtuals(document, ['v1', 'v2']);

			expect(result).toEqual({name: 'n', v1: 'fresh1', v2: 'fresh2'});
		});

		it('should clone plain documents when there are no virtuals', async () => {
			const document: any = {name: 'n', nested: {a: 1}};

			const result = await backend.resolveVirtuals(document, []);

			expect(result).toEqual({name: 'n', nested: {a: 1}});
			expect(result).not.toBe(document);
			expect(result.nested).not.toBe(document.nested);
		});
	});

	describe('model', () => {
		it('should expose the wrapped model', () => {
			expect(backend.model).toBe(mockModel);
		});
	});
});

'use strict';

import Dummy from './functions/_dummy';
import MongoCollectionsModelsMap from '../src/collections.models.map';

describe('collections.models.map.ts tests', () => {
	it('MongoCollectionsModelsMap exists', () => {
		expect(MongoCollectionsModelsMap).toBeDefined();
		expect(typeof MongoCollectionsModelsMap).toBe('function');
	});

	it('MongoCollectionsModelsMap empty functionality', () => {
		let keys = MongoCollectionsModelsMap.keys();
		expect(keys).toHaveLength(0);
		let values = MongoCollectionsModelsMap.values();
		expect(values).toHaveLength(0);
		expect(MongoCollectionsModelsMap.getModelByCollection(null)).toBeNull();

		MongoCollectionsModelsMap.addCollectionToModelMapping(Dummy);
		keys = MongoCollectionsModelsMap.keys();
		values = MongoCollectionsModelsMap.values();
		expect(keys).toHaveLength(1);
		expect(values).toHaveLength(1);
		expect(MongoCollectionsModelsMap.getModelByCollection('dummy')).toBe(Dummy);
	});

	describe('addCollectionToModelMapping', () => {
		it('should add a model to the mapping', () => {
			MongoCollectionsModelsMap.addCollectionToModelMapping(Dummy);

			expect(MongoCollectionsModelsMap.keys()).toContain('dummy');
			expect(MongoCollectionsModelsMap.values()).toContain('Dummy');
		});
	});

	describe('getModelByCollection', () => {
		it('should return null for non-existent collection', () => {
			const result = MongoCollectionsModelsMap.getModelByCollection('nonexistent');
			expect(result).toBeNull();
		});

		it('should return the correct model for existing collection', () => {
			MongoCollectionsModelsMap.addCollectionToModelMapping(Dummy);
			const result = MongoCollectionsModelsMap.getModelByCollection('dummy');
			expect(result).toBe(Dummy);
		});

		it('should handle null input gracefully', () => {
			const result = MongoCollectionsModelsMap.getModelByCollection(null as any);
			expect(result).toBeNull();
		});

		it('should handle undefined input gracefully', () => {
			const result = MongoCollectionsModelsMap.getModelByCollection(undefined as any);
			expect(result).toBeNull();
		});
	});

	describe('keys', () => {
		it('should return an array', () => {
			const keys = MongoCollectionsModelsMap.keys();
			expect(Array.isArray(keys)).toBe(true);
		});

		it('should return array of collection names after adding models', () => {
			MongoCollectionsModelsMap.addCollectionToModelMapping(Dummy);

			const keys = MongoCollectionsModelsMap.keys();
			expect(Array.isArray(keys)).toBe(true);
			expect(keys).toContain('dummy');
		});
	});

	describe('values', () => {
		it('should return an array', () => {
			const values = MongoCollectionsModelsMap.values();
			expect(Array.isArray(values)).toBe(true);
		});

		it('should return array of model names after adding models', () => {
			MongoCollectionsModelsMap.addCollectionToModelMapping(Dummy);

			const values = MongoCollectionsModelsMap.values();
			expect(Array.isArray(values)).toBe(true);
			expect(values).toContain('Dummy');
		});
	});
});

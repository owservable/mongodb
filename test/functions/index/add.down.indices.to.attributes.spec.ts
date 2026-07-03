'use strict';

import {Schema} from 'mongoose';
import addMongoDownIndicesToAttributes from '../../../src/functions/index/add.down.indices.to.attributes';
import addMongoIndexToAttributes from '../../../src/functions/index/add.index.to.attributes';

jest.mock('../../../src/functions/index/add.index.to.attributes');

const mockAddIndexToAttributes = addMongoIndexToAttributes as jest.MockedFunction<typeof addMongoIndexToAttributes>;

describe('add.down.indices.to.attributes tests', () => {
	let mockSchema: Schema;

	beforeEach(() => {
		mockSchema = {} as Schema;
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(addMongoDownIndicesToAttributes).toBeDefined();
		expect(typeof addMongoDownIndicesToAttributes).toBe('function');
	});

	it('should call addMongoIndexToAttributes with descending index (-1)', () => {
		const attributes = ['name', 'email'];

		addMongoDownIndicesToAttributes(mockSchema, attributes);

		expect(mockAddIndexToAttributes).toHaveBeenCalledTimes(1);
		expect(mockAddIndexToAttributes).toHaveBeenCalledWith(mockSchema, attributes, -1);
	});

	it('should handle single attribute', () => {
		const attributes = ['createdAt'];

		addMongoDownIndicesToAttributes(mockSchema, attributes);

		expect(mockAddIndexToAttributes).toHaveBeenCalledWith(mockSchema, attributes, -1);
	});

	it('should handle multiple attributes', () => {
		const attributes = ['name', 'email', 'createdAt', 'status'];

		addMongoDownIndicesToAttributes(mockSchema, attributes);

		expect(mockAddIndexToAttributes).toHaveBeenCalledWith(mockSchema, attributes, -1);
	});

	it('should handle empty attributes array', () => {
		const attributes: string[] = [];

		addMongoDownIndicesToAttributes(mockSchema, attributes);

		expect(mockAddIndexToAttributes).toHaveBeenCalledWith(mockSchema, attributes, -1);
	});

	it('should handle nested attributes', () => {
		const attributes = ['user.profile.name', 'settings.theme'];

		addMongoDownIndicesToAttributes(mockSchema, attributes);

		expect(mockAddIndexToAttributes).toHaveBeenCalledWith(mockSchema, attributes, -1);
	});

	it('should pass different schemas correctly', () => {
		const schema1 = {} as Schema;
		const schema2 = {} as Schema;
		const attributes = ['test'];

		addMongoDownIndicesToAttributes(schema1, attributes);
		addMongoDownIndicesToAttributes(schema2, attributes);

		expect(mockAddIndexToAttributes).toHaveBeenCalledTimes(2);
		expect(mockAddIndexToAttributes).toHaveBeenNthCalledWith(1, schema1, attributes, -1);
		expect(mockAddIndexToAttributes).toHaveBeenNthCalledWith(2, schema2, attributes, -1);
	});
});

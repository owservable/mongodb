'use strict';

import {Schema} from 'mongoose';
import addMongoUpIndicesToAttributes from '../../../src/functions/index/add.up.indices.to.attributes';
import addMongoIndexToAttributes from '../../../src/functions/index/add.index.to.attributes';

jest.mock('../../../src/functions/index/add.index.to.attributes');

const mockAddIndexToAttributes = addMongoIndexToAttributes as jest.MockedFunction<typeof addMongoIndexToAttributes>;

describe('add.up.indices.to.attributes tests', () => {
	let mockSchema: Schema;

	beforeEach(() => {
		mockSchema = {} as Schema;
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(addMongoUpIndicesToAttributes).toBeDefined();
		expect(typeof addMongoUpIndicesToAttributes).toBe('function');
	});

	it('should call addMongoIndexToAttributes with ascending index (1)', () => {
		const attributes = ['name', 'email'];

		addMongoUpIndicesToAttributes(mockSchema, attributes);

		expect(mockAddIndexToAttributes).toHaveBeenCalledTimes(1);
		expect(mockAddIndexToAttributes).toHaveBeenCalledWith(mockSchema, attributes, 1);
	});

	it('should handle single attribute', () => {
		const attributes = ['status'];

		addMongoUpIndicesToAttributes(mockSchema, attributes);

		expect(mockAddIndexToAttributes).toHaveBeenCalledWith(mockSchema, attributes, 1);
	});

	it('should handle multiple attributes', () => {
		const attributes = ['name', 'email', 'createdAt', 'status'];

		addMongoUpIndicesToAttributes(mockSchema, attributes);

		expect(mockAddIndexToAttributes).toHaveBeenCalledWith(mockSchema, attributes, 1);
	});

	it('should handle empty attributes array', () => {
		const attributes: string[] = [];

		addMongoUpIndicesToAttributes(mockSchema, attributes);

		expect(mockAddIndexToAttributes).toHaveBeenCalledWith(mockSchema, attributes, 1);
	});

	it('should handle nested attributes', () => {
		const attributes = ['user.profile.name', 'settings.theme'];

		addMongoUpIndicesToAttributes(mockSchema, attributes);

		expect(mockAddIndexToAttributes).toHaveBeenCalledWith(mockSchema, attributes, 1);
	});

	it('should pass different schemas correctly', () => {
		const schema1 = {} as Schema;
		const schema2 = {} as Schema;
		const attributes = ['test'];

		addMongoUpIndicesToAttributes(schema1, attributes);
		addMongoUpIndicesToAttributes(schema2, attributes);

		expect(mockAddIndexToAttributes).toHaveBeenCalledTimes(2);
		expect(mockAddIndexToAttributes).toHaveBeenNthCalledWith(1, schema1, attributes, 1);
		expect(mockAddIndexToAttributes).toHaveBeenNthCalledWith(2, schema2, attributes, 1);
	});
});

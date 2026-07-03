'use strict';

import {Schema} from 'mongoose';

import addMongoUpIndicesToAttributes from './add.up.indices.to.attributes';
import addMongoDownIndicesToAttributes from './add.down.indices.to.attributes';

const addMongoUpAndDownIndicesToAttributes = (schema: Schema, attributes: string[]): void => {
	addMongoUpIndicesToAttributes(schema, attributes);
	addMongoDownIndicesToAttributes(schema, attributes);
};
export default addMongoUpAndDownIndicesToAttributes;

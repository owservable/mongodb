'use strict';

import {Schema} from 'mongoose';

import addMongoIndexToAttributes from './add.index.to.attributes';

const addMongoUpIndicesToAttributes = (schema: Schema, attributes: string[]): void => addMongoIndexToAttributes(schema, attributes, 1);
export default addMongoUpIndicesToAttributes;

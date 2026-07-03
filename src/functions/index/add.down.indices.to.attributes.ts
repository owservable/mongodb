'use strict';

import {Schema} from 'mongoose';

import addMongoIndexToAttributes from './add.index.to.attributes';

const addMongoDownIndicesToAttributes = (schema: Schema, attributes: string[]): void => addMongoIndexToAttributes(schema, attributes, -1);
export default addMongoDownIndicesToAttributes;

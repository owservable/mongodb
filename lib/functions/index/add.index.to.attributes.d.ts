import { Schema } from 'mongoose';
declare const addMongoIndexToAttributes: (schema: Schema, attributes: string[], index: 1 | -1) => void;
export default addMongoIndexToAttributes;

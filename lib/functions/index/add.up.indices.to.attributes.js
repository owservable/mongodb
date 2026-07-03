'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const add_index_to_attributes_1 = __importDefault(require("./add.index.to.attributes"));
const addUpIndicesToAttributes = (schema, attributes) => (0, add_index_to_attributes_1.default)(schema, attributes, 1);
exports.default = addUpIndicesToAttributes;
//# sourceMappingURL=add.up.indices.to.attributes.js.map
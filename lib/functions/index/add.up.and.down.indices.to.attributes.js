'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const add_up_indices_to_attributes_1 = __importDefault(require("./add.up.indices.to.attributes"));
const add_down_indices_to_attributes_1 = __importDefault(require("./add.down.indices.to.attributes"));
const addUpAndDownIndicesToAttributes = (schema, attributes) => {
    (0, add_up_indices_to_attributes_1.default)(schema, attributes);
    (0, add_down_indices_to_attributes_1.default)(schema, attributes);
};
exports.default = addUpAndDownIndicesToAttributes;
//# sourceMappingURL=add.up.and.down.indices.to.attributes.js.map
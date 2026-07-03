'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const addMongoIndexToAttributes = (schema, attributes, index) => {
    attributes.forEach((attribute) => {
        const ind = {};
        ind[attribute] = index;
        schema.index(ind);
    });
};
exports.default = addMongoIndexToAttributes;
//# sourceMappingURL=add.index.to.attributes.js.map
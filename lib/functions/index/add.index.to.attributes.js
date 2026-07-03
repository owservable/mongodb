'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const addIndexToAttributes = (schema, attributes, index) => {
    attributes.forEach((attribute) => {
        const ind = {};
        ind[attribute] = index;
        schema.index(ind);
    });
};
exports.default = addIndexToAttributes;
//# sourceMappingURL=add.index.to.attributes.js.map
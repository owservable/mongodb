'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class CollectionsModelsMap {
    static addCollectionToModelMapping(model) {
        CollectionsModelsMap._models.set(model.collection.collectionName, model.modelName);
    }
    static getModelByCollection(collectionName) {
        const modelName = CollectionsModelsMap._models.get(collectionName);
        if (!modelName)
            return null;
        return mongoose_1.default.model(modelName);
    }
    static keys() {
        return Array.from(CollectionsModelsMap._models.keys());
    }
    static values() {
        return Array.from(CollectionsModelsMap._models.values());
    }
}
CollectionsModelsMap._models = new Map();
exports.default = CollectionsModelsMap;
//# sourceMappingURL=collections.models.map.js.map
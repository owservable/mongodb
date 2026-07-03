'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class MongoCollectionsModelsMap {
    static addCollectionToModelMapping(model) {
        MongoCollectionsModelsMap._models.set(model.collection.collectionName, model.modelName);
    }
    static getModelByCollection(collectionName) {
        const modelName = MongoCollectionsModelsMap._models.get(collectionName);
        if (!modelName)
            return null;
        return mongoose_1.default.model(modelName);
    }
    static keys() {
        return Array.from(MongoCollectionsModelsMap._models.keys());
    }
    static values() {
        return Array.from(MongoCollectionsModelsMap._models.values());
    }
}
MongoCollectionsModelsMap._models = new Map();
exports.default = MongoCollectionsModelsMap;
//# sourceMappingURL=collections.models.map.js.map
'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const observable_model_1 = __importDefault(require("./observable.model"));
class MongoObservableModelsMap {
    static init() {
        if (!MongoObservableModelsMap._instance)
            MongoObservableModelsMap._instance = new MongoObservableModelsMap();
        return MongoObservableModelsMap._instance;
    }
    static get(model) {
        const instance = MongoObservableModelsMap.init();
        const map = instance._map;
        const collectionName = model.collection.collectionName;
        if (!map.get(collectionName))
            map.set(collectionName, new observable_model_1.default(collectionName));
        return map.get(collectionName);
    }
    constructor() {
        this._map = new Map();
    }
}
exports.default = MongoObservableModelsMap;
//# sourceMappingURL=observable.models.map.js.map
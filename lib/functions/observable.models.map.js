'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const observable_model_1 = __importDefault(require("./observable.model"));
class ObservableModelsMap {
    static init() {
        if (!ObservableModelsMap._instance)
            ObservableModelsMap._instance = new ObservableModelsMap();
        return ObservableModelsMap._instance;
    }
    static get(model) {
        const instance = ObservableModelsMap.init();
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
exports.default = ObservableModelsMap;
//# sourceMappingURL=observable.models.map.js.map
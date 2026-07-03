'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const observable_models_map_1 = __importDefault(require("./observable.models.map"));
const observableMongoModel = (model) => observable_models_map_1.default.get(model);
exports.default = observableMongoModel;
//# sourceMappingURL=observable.model.factory.js.map
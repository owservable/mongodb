'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const observable_models_map_1 = __importDefault(require("./observable.models.map"));
const observableModel = (model) => observable_models_map_1.default.get(model);
exports.default = observableModel;
//# sourceMappingURL=observable.model.factory.js.map
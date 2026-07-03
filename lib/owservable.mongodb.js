'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMongoUpAndDownIndicesToAttributes = exports.addMongoDownIndicesToAttributes = exports.addMongoUpIndicesToAttributes = exports.addMongoIndexToAttributes = exports.observableMongoDatabase = exports.observableMongoModel = exports.processMongoModels = exports.MongoCollectionsModelsMap = exports.MongoDBConnector = exports.MongoBackend = void 0;
const mongo_backend_1 = __importDefault(require("./mongo.backend"));
exports.MongoBackend = mongo_backend_1.default;
const mongodb_connector_1 = __importDefault(require("./mongodb.connector"));
exports.MongoDBConnector = mongodb_connector_1.default;
const collections_models_map_1 = __importDefault(require("./collections.models.map"));
exports.MongoCollectionsModelsMap = collections_models_map_1.default;
const process_models_1 = __importDefault(require("./functions/process.models"));
exports.processMongoModels = process_models_1.default;
const observable_model_factory_1 = __importDefault(require("./functions/observable.model.factory"));
exports.observableMongoModel = observable_model_factory_1.default;
const observable_database_factory_1 = __importDefault(require("./functions/observable.database.factory"));
exports.observableMongoDatabase = observable_database_factory_1.default;
const add_index_to_attributes_1 = __importDefault(require("./functions/index/add.index.to.attributes"));
exports.addMongoIndexToAttributes = add_index_to_attributes_1.default;
const add_up_indices_to_attributes_1 = __importDefault(require("./functions/index/add.up.indices.to.attributes"));
exports.addMongoUpIndicesToAttributes = add_up_indices_to_attributes_1.default;
const add_down_indices_to_attributes_1 = __importDefault(require("./functions/index/add.down.indices.to.attributes"));
exports.addMongoDownIndicesToAttributes = add_down_indices_to_attributes_1.default;
const add_up_and_down_indices_to_attributes_1 = __importDefault(require("./functions/index/add.up.and.down.indices.to.attributes"));
exports.addMongoUpAndDownIndicesToAttributes = add_up_and_down_indices_to_attributes_1.default;
const OwservableMongoDB = {};
exports.default = OwservableMongoDB;
//# sourceMappingURL=owservable.mongodb.js.map
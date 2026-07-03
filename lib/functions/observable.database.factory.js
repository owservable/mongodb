'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const observable_database_1 = __importDefault(require("./observable.database"));
const observableMongoDatabase = () => observable_database_1.default.init();
exports.default = observableMongoDatabase;
//# sourceMappingURL=observable.database.factory.js.map
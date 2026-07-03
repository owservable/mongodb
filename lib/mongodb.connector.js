'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class MongoDBConnector {
    static init(mongoDbUri) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._connection) {
                yield mongoose_1.default.connect(mongoDbUri, { minPoolSize: 20, maxPoolSize: 100 });
                mongoose_1.default.connection.on('connecting', () => console.log('[@owservable] -> MongoDB connecting to', mongoDbUri, '...'));
                mongoose_1.default.connection.on('connected', () => console.log('[@owservable] -> MongoDB connected to', mongoDbUri));
                mongoose_1.default.connection.on('open', () => console.log('[@owservable] -> MongoDB opened connection to', mongoDbUri));
                mongoose_1.default.connection.on('error', console.error.bind(console, '[@owservable] -> MongoDB connection error:'));
                mongoose_1.default.connection.on('disconnecting', () => console.error('[@owservable] -> MongoDB disconnecting from', mongoDbUri, '...'));
                mongoose_1.default.connection.on('disconnected', () => console.error('[@owservable] -> MongoDB disconnected from', mongoDbUri));
                mongoose_1.default.connection.on('close', () => console.error('[@owservable] -> MongoDB closed connection to', mongoDbUri));
                this._connection = mongoose_1.default.connection;
            }
            return this._connection;
        });
    }
    static get connection() {
        return this._connection;
    }
    constructor() { }
}
exports.default = MongoDBConnector;
//# sourceMappingURL=mongodb.connector.js.map
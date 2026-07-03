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
const lodash_1 = require("lodash");
const observable_model_factory_1 = __importDefault(require("./functions/observable.model.factory"));
class MongoBackend {
    constructor(model) {
        this._model = model;
    }
    target() {
        return this._model.collection.collectionName;
    }
    changes() {
        return (0, observable_model_factory_1.default)(this._model);
    }
    find(query, fields, paging, sort, populates) {
        return __awaiter(this, void 0, void 0, function* () {
            const documents = yield this._model
                .find(query, fields, paging)
                .sort(sort)
                .setOptions({ allowDiskUse: true });
            for (const populate of populates) {
                yield this._model.populate(documents, populate);
            }
            return documents;
        });
    }
    findOne(query, fields, populates) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield this._model.findOne(query, fields);
            for (const populate of populates) {
                yield this.populate(document, populate);
            }
            return document;
        });
    }
    findById(id, fields, populates) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield this._model.findById(id, fields);
            for (const populate of populates) {
                yield this.populate(document, populate);
            }
            return document;
        });
    }
    count(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._model.countDocuments(query);
        });
    }
    populate(document, populate) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!document)
                return document;
            if ((0, lodash_1.isArray)(document))
                return this._model.populate(document, populate);
            if (document.populate)
                return document.populate(populate);
            return this._model.populate(document, populate);
        });
    }
    toJSON(document) {
        return (document === null || document === void 0 ? void 0 : document.toJSON) ? document.toJSON() : document;
    }
    resolveVirtuals(document, virtuals) {
        return __awaiter(this, void 0, void 0, function* () {
            const replacement = (0, lodash_1.cloneDeep)((0, lodash_1.omit)(this.toJSON(document), virtuals));
            for (const virtual of virtuals) {
                replacement[virtual] = yield Promise.resolve(document[virtual]);
            }
            return replacement;
        });
    }
    get model() {
        return this._model;
    }
}
exports.default = MongoBackend;
//# sourceMappingURL=mongo.backend.js.map
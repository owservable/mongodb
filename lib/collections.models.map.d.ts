import { Model } from 'mongoose';
export default class CollectionsModelsMap {
    static addCollectionToModelMapping(model: Model<any>): void;
    static getModelByCollection(collectionName: string): Model<any> | null;
    static keys(): string[];
    static values(): string[];
    private static readonly _models;
}

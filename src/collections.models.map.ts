'use strict';

import mongoose, {Model} from 'mongoose';

export default class MongoCollectionsModelsMap {
	public static addCollectionToModelMapping(model: Model<any>): void {
		MongoCollectionsModelsMap._models.set(model.collection.collectionName, model.modelName);
	}

	public static getModelByCollection(collectionName: string): Model<any> | null {
		const modelName = MongoCollectionsModelsMap._models.get(collectionName);
		if (!modelName) return null;
		return mongoose.model(modelName);
	}

	public static keys() {
		return Array.from(MongoCollectionsModelsMap._models.keys());
	}

	public static values() {
		return Array.from(MongoCollectionsModelsMap._models.values());
	}

	private static readonly _models: Map<string, string> = new Map<string, string>();
}

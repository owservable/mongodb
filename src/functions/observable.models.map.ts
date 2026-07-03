'use strict';

import {Model} from 'mongoose';

import MongoObservableModel from './observable.model';

class MongoObservableModelsMap {
	private static _instance: MongoObservableModelsMap;

	public static init(): MongoObservableModelsMap {
		if (!MongoObservableModelsMap._instance) MongoObservableModelsMap._instance = new MongoObservableModelsMap();
		return MongoObservableModelsMap._instance;
	}

	public static get(model: Model<any>): MongoObservableModel {
		const instance: MongoObservableModelsMap = MongoObservableModelsMap.init();
		const map: Map<string, MongoObservableModel> = instance._map;

		const collectionName: string = model.collection.collectionName;
		if (!map.get(collectionName)) map.set(collectionName, new MongoObservableModel(collectionName));

		return map.get(collectionName);
	}

	private readonly _map: Map<string, MongoObservableModel>;

	private constructor() {
		this._map = new Map<string, MongoObservableModel>();
	}
}
export default MongoObservableModelsMap;

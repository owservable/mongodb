'use strict';

import {cloneDeep, omit} from 'lodash';
import {Model} from 'mongoose';
import {Observable} from 'rxjs';

import type {IObservableBackend} from '@owservable/core';

import observableMongoModel from './functions/observable.model.factory';

export default class MongoBackend implements IObservableBackend {
	private readonly _model: Model<any>;

	constructor(model: Model<any>) {
		this._model = model;
	}

	public target(): string {
		return this._model.collection.collectionName;
	}

	public changes(): Observable<any> {
		return observableMongoModel(this._model);
	}

	public async find(query: any, fields: any, paging: any, sort: any, populates: any[]): Promise<any[]> {
		const documents: any[] = await this._model //
			.find(query, fields, paging)
			.sort(sort)
			.setOptions({allowDiskUse: true});

		for (const populate of populates) {
			await this._model.populate(documents, populate);
		}
		return documents;
	}

	public async findOne(query: any, fields: any, populates: any[]): Promise<any> {
		const document: any = await this._model.findOne(query, fields);
		for (const populate of populates) {
			await this.populate(document, populate);
		}
		return document;
	}

	public async findById(id: string, fields: any, populates: any[]): Promise<any> {
		const document: any = await this._model.findById(id, fields);
		for (const populate of populates) {
			await this.populate(document, populate);
		}
		return document;
	}

	public async count(query: any): Promise<number> {
		return this._model.countDocuments(query);
	}

	public async populate(document: any, populate: any): Promise<any> {
		if (!document) return document;
		if (Array.isArray(document)) return this._model.populate(document, populate);
		if (document.populate) return document.populate(populate);
		return this._model.populate(document, populate);
	}

	public toJSON(document: any): any {
		return document?.toJSON ? document.toJSON() : document;
	}

	public async resolveVirtuals(document: any, virtuals: string[]): Promise<any> {
		const replacement: any = cloneDeep(omit(this.toJSON(document), virtuals));
		for (const virtual of virtuals) {
			replacement[virtual] = await Promise.resolve(document[virtual]);
		}
		return replacement;
	}

	public get model(): Model<any> {
		return this._model;
	}
}

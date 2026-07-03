import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import type { IObservableBackend } from '@owservable/core';
export default class MongoBackend implements IObservableBackend {
    private readonly _model;
    constructor(model: Model<any>);
    target(): string;
    changes(): Observable<any>;
    find(query: any, fields: any, paging: any, sort: any, populates: any[]): Promise<any[]>;
    findOne(query: any, fields: any, populates: any[]): Promise<any>;
    findById(id: string, fields: any, populates: any[]): Promise<any>;
    count(query: any): Promise<number>;
    populate(document: any, populate: any): Promise<any>;
    toJSON(document: any): any;
    resolveVirtuals(document: any, virtuals: string[]): Promise<any>;
    get model(): Model<any>;
}

import { Connection } from 'mongoose';
export default class MongoDBConnector {
    static init(mongoDbUri: string): Promise<Connection>;
    static get connection(): Connection;
    private static _connection;
    private constructor();
}

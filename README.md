![owservable](https://avatars0.githubusercontent.com/u/87773159?s=75)

# @owservable/mongodb

[📖 API Docs](https://owservable.github.io/mongodb/docs/) · [✅ Coverage](https://owservable.github.io/mongodb/coverage/)

MongoDB backend adapter for [@owservable/core](https://github.com/owservable/core): live data via MongoDB change streams over mongoose models.

## 🚀 Features

- **MongoBackend**: implements `IObservableBackend` over a mongoose model — change feed, queries, populates, virtuals
- **MongoObservableModel / MongoObservableDatabase**: resilient change-stream wrappers with automatic reconnection
- **processMongoModels**: scans per-module `models/` folders, registers every model with the `BackendRegistry` and `MongoCollectionsModelsMap`
- **MongoDBConnector**: mongoose connection lifecycle with pooling and logging
- **Index helpers**: `addMongoUpIndicesToAttributes`, `addMongoDownIndicesToAttributes`, `addMongoUpAndDownIndicesToAttributes`

## 📦 Installation

```bash
npm install @owservable/core @owservable/mongodb mongoose
```

or

```bash
pnpm add @owservable/core @owservable/mongodb mongoose
```

`@owservable/core`, `mongoose` and `rxjs` are peer dependencies.

## 🔁 Migrating from `owservable` 2.x

The public API is database-prefixed in v3. The websocket wire protocol is unchanged — client applications need no changes.

| owservable 2.x | @owservable/mongodb 3.x |
|---|---|
| `MongoDBConnector` | `MongoDBConnector` (unchanged) |
| `CollectionsModelsMap` | `MongoCollectionsModelsMap` |
| `processModels` | `processMongoModels` |
| `observableModel` | `observableMongoModel` |
| `observableDatabase` | `observableMongoDatabase` |
| `addIndexToAttributes` | `addMongoIndexToAttributes` |
| `addUpIndicesToAttributes` | `addMongoUpIndicesToAttributes` |
| `addDownIndicesToAttributes` | `addMongoDownIndicesToAttributes` |
| `addUpAndDownIndicesToAttributes` | `addMongoUpAndDownIndicesToAttributes` |

Protocol-level pieces (`OwservableClient`, stores, `DataMiddlewareMap`, cronjobs/workers/watchers) moved to [@owservable/core](https://github.com/owservable/core) with their names unchanged.

## 📄 License

Unlicense — see [LICENSE](LICENSE).

![owservable](https://avatars0.githubusercontent.com/u/87773159?s=75)

# @owservable/mongodb

MongoDB backend adapter for [@owservable/core](https://github.com/owservable/core): live data via MongoDB change streams over mongoose models.

## 🚀 Features

- **MongoBackend**: implements `IObservableBackend` over a mongoose model — change feed, queries, populates, virtuals
- **ObservableModel / ObservableDatabase**: resilient change-stream wrappers with automatic reconnection
- **processModels**: scans per-module `models/` folders, registers every model with the `BackendRegistry` and `CollectionsModelsMap`
- **MongoDBConnector**: mongoose connection lifecycle with pooling and logging
- **Index helpers**: `addUpIndicesToAttributes`, `addDownIndicesToAttributes`, `addUpAndDownIndicesToAttributes`

## 📦 Installation

```bash
npm install @owservable/core @owservable/mongodb mongoose
```

or

```bash
pnpm add @owservable/core @owservable/mongodb mongoose
```

`@owservable/core`, `mongoose` and `rxjs` are peer dependencies.

## 📄 License

Unlicense — see [LICENSE](LICENSE).

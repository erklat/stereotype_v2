"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeStore = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const reducer_1 = __importDefault(require("@/state-management/reducer"));
const redux_logger_1 = __importDefault(require("redux-logger"));
const redux_saga_1 = __importDefault(require("redux-saga"));
const saga_1 = __importDefault(require("@/state-management/saga"));
const makeStore = () => {
    const sagaMiddleware = (0, redux_saga_1.default)();
    const store = (0, toolkit_1.configureStore)({
        reducer: reducer_1.default,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware()
            // prepend and concat calls can be chained
            .prepend(sagaMiddleware)
            .concat(redux_logger_1.default),
    });
    // Added line
    sagaMiddleware.run(saga_1.default);
    return store;
};
exports.makeStore = makeStore;

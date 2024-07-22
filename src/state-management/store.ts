import { configureStore } from "@reduxjs/toolkit";
import reducer from "@/state-management/reducer";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootSaga from "@/state-management/saga";

export const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      })
        // prepend and concat calls can be chained
        .prepend(sagaMiddleware)
        .concat(logger),
  });

  // Added line
  sagaMiddleware.run(rootSaga);

  return store;
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

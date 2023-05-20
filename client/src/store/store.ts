import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import productReducer from "../features/slice/productSlice";
import reviewReducer from "../features/slice/reviewSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
// ...
const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

export const store = configureStore({
  reducer: {
    product: productReducer,
    review: reviewReducer,
  },
  middleware,
});

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

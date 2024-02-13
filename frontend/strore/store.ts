import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import budgetReducer from './features/budgetSlice'
import categoryReducer from "./features/categorySlice"
import transReducer from "./features/transactionSlice"
import authReducer from "./features/authSlice"
export const store = configureStore({
  reducer: {
    [budgetReducer.reducerPath]:budgetReducer.reducer,
    [categoryReducer.reducerPath]:categoryReducer.reducer,
    [transReducer.reducerPath]:transReducer.reducer,
    [authReducer.reducerPath]:authReducer.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(budgetReducer.middleware)
    .concat(transReducer.middleware)
    .concat(authReducer.middleware)
    .concat(categoryReducer.middleware),
})

setupListeners(store.dispatch)

import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import budgetReducer from './features/budgetSlice'
import categoryReducer from "./features/categorySlice"
export const store = configureStore({
  reducer: {
    [budgetReducer.reducerPath]:budgetReducer.reducer,
    [categoryReducer.reducerPath]:categoryReducer.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(budgetReducer.middleware)
    .concat(categoryReducer.middleware),
})

setupListeners(store.dispatch)

import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import budgetReducer from './features/budgetSlice'
export const store = configureStore({
  reducer: {
    [budgetReducer.reducerPath]:budgetReducer.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(budgetReducer.middleware),
})

setupListeners(store.dispatch)

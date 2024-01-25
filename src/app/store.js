import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './dataSlice'

export const store = configureStore({
  reducer: {
    data: counterReducer,
  },
})
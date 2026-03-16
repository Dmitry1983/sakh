import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { baseApi } from './baseApi';

export const store = configureStore({
  reducer: {
    // Один редьюсер для ВСЕХ API (products, orders, auth...)
    [baseApi.reducerPath]: baseApi.reducer,
    // Сюда можно добавить обычные слайсы если нужно
    // ui: uiReducer,
    // cart: cartReducer,
  },
  devTools: __DEV__,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware), // Middleware для кеширования, поллинга, инвалидации
});

// Включает refetchOnFocus и refetchOnReconnect
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

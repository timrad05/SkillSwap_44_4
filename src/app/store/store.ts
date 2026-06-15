import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
	reducer: {
		__app__: (state = {}) => state,
	},
});

// Типы для TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

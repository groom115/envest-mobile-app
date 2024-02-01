import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import profileReducer from './slices/profile';
import walletReducer from './slices/wallet';

const store = configureStore({
	reducer: {
		auth: authReducer,
		profile: profileReducer,
		wallet: walletReducer
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

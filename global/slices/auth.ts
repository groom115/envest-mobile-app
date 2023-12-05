import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
	accessToken: string;
	refreshToken: string;
	idToken: string;
	isValid: boolean;
}

const loadAuthState = (): AuthState => {
	return {
		accessToken: '',
		refreshToken: '',
		idToken: '',
		isValid: false,
	};
};

const initialState = loadAuthState();

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		// Gets called once everytime the application starts
		setAuth(state, action: PayloadAction<AuthState>) {
			state.accessToken = action.payload.accessToken;
			state.refreshToken = action.payload.refreshToken;
			state.idToken = action.payload.idToken;
			state.isValid = action.payload.isValid;
		},
		// Gets called when user logs out
		removeAuth(state) {
			state.accessToken = '';
			state.refreshToken = '';
			state.idToken = '';
			state.isValid = false;
		},
	},
});

export const { setAuth, removeAuth } = authSlice.actions;

export default authSlice.reducer;

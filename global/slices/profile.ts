import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
	userId: string;
	email: string;
	emailVerified?: boolean;
	name?: string;
	//? Assuming that we will be capturing phone numbers in future
	phone?: string;
	phoneVerified?: boolean;
}

const loadProfileState = (): ProfileState => {
	return {
		userId: '',
		email: '',
		emailVerified: false,
		name: '',
		phone: '',
		phoneVerified: false,
	};
};

const initialState = loadProfileState();

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		// Gets called once as soon as user enters dashboard
		setProfile(state, action: PayloadAction<ProfileState>) {
			state.userId = action.payload.userId;
			state.email = action.payload.email;
			state.emailVerified = action.payload.emailVerified;
			state.name = action.payload.name;
			state.phone = action.payload.phone;
			state.phoneVerified = action.payload.phoneVerified;
		},
		// Gets called when user logs out
		removeProfile(state) {
			state.userId = '';
			state.email = '';
			state.emailVerified = false;
			state.name = '';
			state.phone = '';
			state.phoneVerified = false;
		},
	},
});

export const { setProfile, removeProfile } = profileSlice.actions;

export default profileSlice.reducer;

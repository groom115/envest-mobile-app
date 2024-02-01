import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WalletState {
	inrBalance: number;
}

const initialState = {
    inrBalance: 0
} as WalletState;

const walletSlice = createSlice({
	name: 'wallet',
	initialState,
	reducers: {
		// Gets called once as soon as user enters dashboard
		setWallet(state, action: PayloadAction<WalletState>) {
			state.inrBalance = action.payload.inrBalance;
		},
		// Gets called when user logs out
		removeWallet(state) {
			state.inrBalance = 0;
		},
	},
});

export const { setWallet, removeWallet } = walletSlice.actions;

export default walletSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthStage, AuthState } from '@types';

const initialState: AuthState = {
	stage: AuthStage.loading
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthStage: (state, action: PayloadAction<AuthStage>) => {
			state.stage = action.payload;
		}
	}
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;

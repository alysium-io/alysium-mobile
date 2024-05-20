import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { KeyboardState } from '@types';

const initialState: KeyboardState = {
	height: 0
};

const keyboardSlice = createSlice({
	name: 'keyboard',
	initialState,
	reducers: {
		setKeyboardHeight(state, action: PayloadAction<number>) {
			state.height = action.payload;
		}
	}
});

export const keyboardActions = keyboardSlice.actions;
export const keyboardReducer = keyboardSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';

// A simple reducer with an initial state and one action to update the state.
const counterReducer = (state = { count: 0 }, action: any) => {
	switch (action.type) {
		case 'increment':
			return { ...state, count: state.count + 1 };
		case 'decrement':
			return { ...state, count: state.count - 1 };
		default:
			return state;
	}
};

// Configure the Redux store with the counterReducer
const store = configureStore({
	reducer: {
		counter: counterReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const App = () => (
	<Provider store={store}>
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'white'
			}}
		>
			<Text style={{ color: '#000' }}>App</Text>
		</View>
	</Provider>
);

export default App;

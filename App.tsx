import React from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/redux';

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

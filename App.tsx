import { ActivityIndicator, DisplayEnvironment } from '@atomic';
import { persistor, store } from '@flux';
import { ThemeProvider } from '@restyle';
import React from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ValidateEnvProvider } from 'src/utils/contexts';

// Dependencies: Standard dependencies, app setup, and global state
// Authentication: Authentication flow
// Application:  Application navigation/routing (user, artist, host, etc.)
const App = () => {
	// const sandboxMode = false;

	// if (sandboxMode) {
	// 	return (
	// 		<Dependencies>
	// 			<BottomSheetModalProvider>
	// 				<Scratch />
	// 			</BottomSheetModalProvider>
	// 		</Dependencies>
	// 	);
	// }

	// return (
	// 	<Dependencies>
	// 		<Authentication>
	// 			<Application />
	// 		</Authentication>
	// 	</Dependencies>
	// );

	return (
		<Provider store={store}>
			<PersistGate loading={<ActivityIndicator />} persistor={persistor}>
				<ThemeProvider>
					<ValidateEnvProvider>
						<View
							style={{
								flex: 1,
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: '#000'
							}}
						>
							<Text style={{ color: '#fff' }}>Hello World</Text>
							<DisplayEnvironment />
						</View>
					</ValidateEnvProvider>
				</ThemeProvider>
			</PersistGate>
		</Provider>
	);
};

export default App;

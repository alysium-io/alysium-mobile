import { persistor, store } from '@flux';
import { PortalProvider } from '@gorhom/portal';
import { ThemeProvider } from '@restyle';
import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { RootProvider } from 'src/utils/contexts';

interface DependenciesProps {
	children?: React.ReactNode;
}

const Dependencies: React.FC<DependenciesProps> = ({ children }) => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ThemeProvider>
					<RootProvider>
						<GestureHandlerRootView style={styles.gesture}>
							<SafeAreaProvider>
								<PortalProvider>{children}</PortalProvider>
							</SafeAreaProvider>
						</GestureHandlerRootView>
					</RootProvider>
				</ThemeProvider>
			</PersistGate>
		</Provider>
	);
};

const styles = StyleSheet.create({
	gesture: {
		flex: 1
	}
});

export default Dependencies;

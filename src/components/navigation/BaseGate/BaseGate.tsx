import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { PortalProvider } from '@gorhom/portal';
import { persistor, store } from '@redux';
import { ThemeProvider } from '@restyle';
import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { RootProvider } from 'src/utils/contexts';

interface BaseGateProps {
	children?: React.ReactNode;
}

const BaseGate: React.FC<BaseGateProps> = ({ children }) => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ThemeProvider>
					<RootProvider>
						<GestureHandlerRootView style={styles.gesture}>
							<SafeAreaProvider>
								<PortalProvider>
									<BottomSheetModalProvider>
										{children}
									</BottomSheetModalProvider>
								</PortalProvider>
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

export default BaseGate;

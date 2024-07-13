import { GestureHandlerRootView } from '@atomic';
import { persistor, store } from '@flux';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { PortalProvider } from '@gorhom/portal';
import { ThemeProvider } from '@restyle';
import { ChildrenProps } from '@types';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const Dependencies: React.FC<ChildrenProps> = ({ children }) => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ThemeProvider>
					<GestureHandlerRootView>
						<SafeAreaProvider>
							<PortalProvider>
								<BottomSheetModalProvider>{children}</BottomSheetModalProvider>
							</PortalProvider>
						</SafeAreaProvider>
					</GestureHandlerRootView>
				</ThemeProvider>
			</PersistGate>
		</Provider>
	);
};

export default Dependencies;

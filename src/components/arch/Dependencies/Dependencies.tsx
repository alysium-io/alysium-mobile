import { GestureHandlerRootView } from '@atomic';
import { persistor, store } from '@flux';
import { PortalProvider } from '@gorhom/portal';
import { ThemeProvider } from '@restyle';
import { ChildrenProps } from '@types';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { RootProvider } from 'src/utils/contexts';

const Dependencies: React.FC<ChildrenProps> = ({ children }) => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ThemeProvider>
					<RootProvider>
						<GestureHandlerRootView>
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

export default Dependencies;

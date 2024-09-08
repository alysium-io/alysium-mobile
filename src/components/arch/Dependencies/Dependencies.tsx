import { GestureHandlerRootView, Toast } from '@atomic';
import { persistor, store } from '@flux';
import { PortalProvider } from '@gorhom/portal';
import { ThemeProvider } from '@restyle';
import { BehaviorProvider } from '@src/utils/contexts/Behavior';
import { ChildrenProps } from '@types';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ValidateEnvProvider } from 'src/utils/contexts';

const Dependencies: React.FC<ChildrenProps> = ({ children }) => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ThemeProvider>
					<ValidateEnvProvider>
						<BehaviorProvider>
							<GestureHandlerRootView>
								<SafeAreaProvider>
									<PortalProvider>{children}</PortalProvider>
									<Toast />
								</SafeAreaProvider>
							</GestureHandlerRootView>
						</BehaviorProvider>
					</ValidateEnvProvider>
				</ThemeProvider>
			</PersistGate>
		</Provider>
	);
};

export default Dependencies;

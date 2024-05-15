import { store } from '@flux';
import React from 'react';
import { Provider } from 'react-redux';

interface DependenciesProps {
	children?: React.ReactNode;
}

// const Dependencies: React.FC<DependenciesProps> = ({ children }) => {
// 	return (
// 		<Provider store={store}>
// 			<PersistGate loading={null} persistor={persistor}>
// 				<ThemeProvider>
// 					<RootProvider>
// 						<GestureHandlerRootView>
// 							<SafeAreaProvider>
// 								<PortalProvider>{children}</PortalProvider>
// 							</SafeAreaProvider>
// 						</GestureHandlerRootView>
// 					</RootProvider>
// 				</ThemeProvider>
// 			</PersistGate>
// 		</Provider>
// 	);
// };
const Dependencies: React.FC<DependenciesProps> = ({ children }) => {
	return <Provider store={store}>{children}</Provider>;
};

export default Dependencies;

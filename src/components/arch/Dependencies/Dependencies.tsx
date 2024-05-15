import React from 'react';
import { View } from 'react-native';

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
	return <View>{children}</View>;
};

export default Dependencies;

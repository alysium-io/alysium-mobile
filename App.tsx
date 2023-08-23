import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { PersistGate } from 'redux-persist/integration/react'
import { StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { store, persistor } from './src/redux'
import { ThemeProvider } from './src/restyle'
import { RootProvider } from './src/utils/contexts'
import { Auth } from './src/components/screens/Auth'


const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ThemeProvider>
					<RootProvider>
						<GestureHandlerRootView style={styles.gesture}>
							<BottomSheetModalProvider>
								<SafeAreaProvider>
									<Auth />
								</SafeAreaProvider>
							</BottomSheetModalProvider>
						</GestureHandlerRootView>
					</RootProvider>
				</ThemeProvider>
			</PersistGate>
		</Provider>
	)
}

const styles = StyleSheet.create({
	gesture: {
		flex: 1
	}
})

export default App
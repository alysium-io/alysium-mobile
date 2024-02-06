import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { PortalHost, PortalProvider } from '@gorhom/portal'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { PersistGate } from 'redux-persist/integration/react'
import { StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { store, persistor } from '@redux'
import { ThemeProvider } from '@restyle'
import { RootProvider } from 'src/utils/contexts'
import { AppBetaConfigBottomSheetProvider } from '@templates'


interface BaseGateProps {
    children?: React.ReactNode
}

const BaseGate : React.FC<BaseGateProps> = ({
    children
}) => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ThemeProvider>
					<RootProvider>
						<GestureHandlerRootView style={styles.gesture}>
							<SafeAreaProvider>
								<PortalProvider>
									<BottomSheetModalProvider>
										<AppBetaConfigBottomSheetProvider>
											{children}
										</AppBetaConfigBottomSheetProvider>
									</BottomSheetModalProvider>
								</PortalProvider>
							</SafeAreaProvider>
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

export default BaseGate
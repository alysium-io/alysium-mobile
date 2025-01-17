import { Application, Authentication, Dependencies } from '@arch';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Animated from 'react-native-reanimated';
import { Scratch } from 'src/components/scratch';
import './ignore-warnings';

// This is a workaround to allow the TextInput `text` prop to be animated
// in react-native-reanimated
// This redash component shows the original workaround: https://github.com/wcandillon/react-native-redash/blob/fd0b0ddb3b4c10ae88cf1f8a95890c7c5eb3c475/src/ReText.tsx
// Here's the original issue: https://github.com/software-mansion/react-native-reanimated/issues/5432#issuecomment-1832668815
Animated.addWhitelistedNativeProps({ text: true });

// Dependencies: Standard dependencies, app setup, and global state
// Authentication: Authentication flow
// Application:  Application navigation/routing (user, artist, host, etc.)
const App = () => {
	const sandboxMode = false;

	if (sandboxMode) {
		return (
			<Dependencies>
				<NavigationContainer>
					<BottomSheetModalProvider>
						<Scratch />
					</BottomSheetModalProvider>
				</NavigationContainer>
			</Dependencies>
		);
	}

	return (
		<Dependencies>
			<Authentication>
				<Application />
			</Authentication>
		</Dependencies>
	);
};

export default App;

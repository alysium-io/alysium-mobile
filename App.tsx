import { Dependencies } from '@arch';
import { env } from '@etc';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React from 'react';
import { Text, View } from 'react-native';
import { Scratch } from 'src/components/helpers';

// Dependencies: Standard dependencies, app setup, and global state
// Authentication: Authentication flow
// Application:  Application navigation/routing (user, artist, host, etc.)
const App = () => {
	const sandboxMode = false;

	if (sandboxMode) {
		return (
			<Dependencies>
				<BottomSheetModalProvider>
					<Scratch />
				</BottomSheetModalProvider>
			</Dependencies>
		);
	}

	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<Text>Hello World</Text>
			<Text>{env.apiUrl}</Text>
			<Text>{env.env}</Text>
			<Text>{env.apiUrl}</Text>
		</View>
	);

	// return (
	// 	<Dependencies>
	// 		<Authentication>
	// 			<Application />
	// 		</Authentication>
	// 	</Dependencies>
	// );
};

export default App;

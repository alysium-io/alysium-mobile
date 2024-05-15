import { Dependencies } from '@arch';
import React from 'react';
import { Text, View } from 'react-native';

// Dependencies: Standard dependencies, app setup, and global state
// Authentication: Authentication flow
// Application:  Application navigation/routing (user, artist, host, etc.)
// const App = () => (
// 	<Dependencies>
// 		<Authentication>
// 			<Application />
// 		</Authentication>
// 	</Dependencies>
// );
const App = () => (
	<Dependencies>
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'white'
			}}
		>
			<Text style={{ color: '#000' }}>App</Text>
		</View>
	</Dependencies>
);

export default App;

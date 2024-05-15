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
const App = () => {
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: 'white',
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<Text style={{ color: '#000' }}>App</Text>
		</View>
	);
};

export default App;

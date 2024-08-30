import { Application, Authentication, Dependencies } from '@arch';
import React from 'react';

// Dependencies: Standard dependencies, app setup, and global state
// Authentication: Authentication flow
// Application:  Application navigation/routing (user, artist, host, etc.)
const App = () => {
	// const sandboxMode = false;

	// if (sandboxMode) {
	// 	return (
	// 		<Dependencies>
	// 			<BottomSheetModalProvider>
	// 				<Scratch />
	// 			</BottomSheetModalProvider>
	// 		</Dependencies>
	// 	);
	// }

	return (
		<Dependencies>
			<Authentication>
				<Application />
			</Authentication>
		</Dependencies>
	);
};

export default App;

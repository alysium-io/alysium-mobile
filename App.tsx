import { Application, Authentication, Dependencies } from '@arch';
import React from 'react';

if (__DEV__) {
	require('./ReactotronConfig');
}

// Dependencies: Standard dependencies, app setup, and global state
// Authentication: Authentication flow
// Application:  Application navigation/routing (user, artist, host, etc.)
const App = () => (
	<Dependencies>
		<Authentication>
			<Application />
		</Authentication>
	</Dependencies>
);

export default App;

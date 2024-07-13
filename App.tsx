import { Dependencies } from '@arch';
import React from 'react';
import { Scratch } from 'src/components/helpers';

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
		<Dependencies>
			<Scratch />
		</Dependencies>
	);
};

export default App;

import React from 'react'
import { BaseGate, AuthGate, AppGate } from '@navigation'

// BaseGate: Standard dependencies, app setup, and global state
// AuthGate: Authentication flow
// AppGate:  Application navigation/routing (user, artist, host, etc.)
const App = () => (
	<BaseGate>
		<AuthGate>
			<AppGate />
		</AuthGate>
	</BaseGate>
)

export default App
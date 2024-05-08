import { ConditionalRenderer } from '@atomic';
import { AuthStage } from '@types';
import React from 'react';
import {
	AuthenticationAppProvider,
	useAuthenticationAppContext
} from './Authentication.context';
import LoggedOut from './components/LoggedOut';

interface AuthenticationProps {
	children?: React.ReactNode;
}

const Authentication: React.FC<AuthenticationProps> = ({ children }) => {
	const { authStage } = useAuthenticationAppContext();

	return (
		<ConditionalRenderer
			componentKey={authStage}
			componentMap={{
				[AuthStage.loggedOut]: LoggedOut,
				[AuthStage.loggedIn]: () => <>{children}</>
			}}
		/>
	);
};

const AuthenticationWrapper: React.FC<AuthenticationProps> = ({ children }) => (
	<AuthenticationAppProvider>
		<Authentication>{children}</Authentication>
	</AuthenticationAppProvider>
);

export default AuthenticationWrapper;

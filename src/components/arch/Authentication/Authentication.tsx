import { AuthStage } from '@types';
import React from 'react';
import {
	AuthenticationAppProvider,
	useAuthenticationAppContext
} from './Authentication.context';
import AuthScreens from './screens';

interface AuthenticationProps {
	children?: React.ReactNode;
}

const Authentication: React.FC<AuthenticationProps> = ({ children }) => {
	const { authStage } = useAuthenticationAppContext();

	if (authStage === AuthStage.loggedIn) {
		return children;
	}

	return <AuthScreens />;
};

const AuthenticationWrapper: React.FC<AuthenticationProps> = ({ children }) => (
	<AuthenticationAppProvider>
		<Authentication>{children}</Authentication>
	</AuthenticationAppProvider>
);

export default AuthenticationWrapper;

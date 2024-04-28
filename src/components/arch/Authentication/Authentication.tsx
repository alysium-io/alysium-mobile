import { AuthStage } from '@types';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import {
	AuthenticationAppProvider,
	useAuthenticationAppContext
} from './Authentication.context';
import AuthScreens from './screens';

interface AuthenticationProps {
	children?: React.ReactNode;
}

const Authentication: React.FC<AuthenticationProps> = ({ children }) => {
	const { me, token, authStage } = useAuthenticationAppContext();

	useEffect(() => {
		me()
			.then(() => SplashScreen.hide())
			.catch(() => SplashScreen.hide());
	}, [token]);

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

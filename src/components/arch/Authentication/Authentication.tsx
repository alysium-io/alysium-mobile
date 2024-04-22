import { useAuth, useUser } from '@hooks';
import { AuthStage } from '@types';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import usePersistedAppState from 'src/utils/hooks/usePersistedAppState';
import AuthScreens from './screens';

interface AuthenticationProps {
	children?: React.ReactNode;
}

const Authentication: React.FC<AuthenticationProps> = ({ children }) => {
	const { token } = usePersistedAppState();
	const { auth } = useAuth();
	const { me } = useUser();

	useEffect(() => {
		me()
			.then(() => SplashScreen.hide())
			.catch(() => SplashScreen.hide());
	}, [token]);

	if (auth.stage === AuthStage.loggedIn) {
		return children;
	}

	return <AuthScreens />;
};

export default Authentication;

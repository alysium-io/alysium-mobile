import { AuthStage } from '@types';
import React from 'react';
import { useAuthenticationAppContext } from '../Authentication.context';
import { AuthPage } from './AuthPage';
import { ErrorPage } from './ErrorPage';
import { LoadingPage } from './LoadingPage';

const AuthScreens = () => {
	const { authStage } = useAuthenticationAppContext();

	switch (authStage) {
		case AuthStage.loading:
			return <LoadingPage />;
		case AuthStage.error:
			return <ErrorPage />;
		default:
			return <AuthPage />;
	}
};

export default AuthScreens;

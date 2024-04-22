import { useAuth } from '@hooks';
import { AuthStage } from '@types';
import React from 'react';
import { AuthPage } from './AuthPage';
import { ErrorPage } from './ErrorPage';
import { LoadingPage } from './LoadingPage';

const AuthScreens = () => {
	const { auth } = useAuth();

	switch (auth.stage) {
		case AuthStage.loading:
			return <LoadingPage />;
		case AuthStage.error:
			return <ErrorPage />;
		default:
			return <AuthPage />;
	}
};

export default AuthScreens;

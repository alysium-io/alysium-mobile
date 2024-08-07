import { BasePage } from '@organisms';
import React, { useState } from 'react';
import { CreateAccount, LogIn } from './components';

const AuthPage = () => {
	const [isLoggingIn, setIsLoggingIn] = useState<boolean>(true);

	return (
		<BasePage>
			{isLoggingIn ? (
				<LogIn toggleAuthScreen={() => setIsLoggingIn(false)} />
			) : (
				<CreateAccount toggleAuthScreen={() => setIsLoggingIn(true)} />
			)}
		</BasePage>
	);
};

export default AuthPage;

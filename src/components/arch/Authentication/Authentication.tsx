import { ConditionalRenderer } from '@atomic';
import { AuthStage, ChildrenProps } from '@types';
import React from 'react';
import {
	AuthenticationAppProvider,
	useAuthenticationAppContext
} from './Authentication.context';
import LoggedOut from './components/LoggedOut';

const Authentication: React.FC<ChildrenProps> = ({ children }) => {
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

const AuthenticationWrapper: React.FC<ChildrenProps> = ({ children }) => (
	<AuthenticationAppProvider>
		<Authentication>{children}</Authentication>
	</AuthenticationAppProvider>
);

export default AuthenticationWrapper;

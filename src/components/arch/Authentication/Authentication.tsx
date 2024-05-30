import { AuthStage, ChildrenProps } from '@types';
import React from 'react';
import { Case, Default, Switch } from 'react-if';
import {
	AuthenticationAppProvider,
	useAuthenticationAppContext
} from './Authentication.context';
import LoggedOut from './components/LoggedOut';

const Authentication: React.FC<ChildrenProps> = ({ children }) => {
	const { authStage } = useAuthenticationAppContext();

	return (
		<Switch>
			<Case condition={authStage === AuthStage.loggedOut}>
				<LoggedOut />
			</Case>
			<Default>{children}</Default>
		</Switch>
	);
};

const AuthenticationWrapper: React.FC<ChildrenProps> = ({ children }) => (
	<AuthenticationAppProvider>
		<Authentication>{children}</Authentication>
	</AuthenticationAppProvider>
);

export default AuthenticationWrapper;

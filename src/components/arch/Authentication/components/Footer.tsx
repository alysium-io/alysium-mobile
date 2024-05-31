import React from 'react';
import { Case, Switch } from 'react-if';
import { useAuthenticationAppContext } from '../Authentication.context';
import ContinueWithPhoneFooter from './ContinueWithPhoneFooter';
import EnterCodeFooter from './EnterCodeFooter';

const Footer: React.FC = () => {
	const { state } = useAuthenticationAppContext();

	return (
		<Switch>
			<Case condition={state.screen === 'continue-phone'}>
				<ContinueWithPhoneFooter />
			</Case>
			<Case condition={state.screen === 'login-phone'}>
				<EnterCodeFooter />
			</Case>
		</Switch>
	);
};

export default Footer;

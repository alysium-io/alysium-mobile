import { ConditionalRenderer } from '@atomic';
import React from 'react';
import { useAuthenticationAppContext } from '../Authentication.context';
import ContinueWithPhoneFooter from './ContinueWithPhoneFooter';
import EnterCodeFooter from './EnterCodeFooter';

const Footer: React.FC = () => {
	const { state } = useAuthenticationAppContext();
	return (
		<ConditionalRenderer
			componentKey={state.screen}
			componentMap={{
				'continue-phone': ContinueWithPhoneFooter,
				'login-phone': EnterCodeFooter
			}}
		/>
	);
};

export default Footer;

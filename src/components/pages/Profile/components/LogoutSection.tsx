import { useAuthenticationAppContext } from '@arch/Authentication/Authentication.context';
import { View } from '@atomic';
import { Button } from '@molecules';
import {
	BehaviorAction,
	useBehaviorContext
} from '@src/utils/contexts/Behavior';
import React from 'react';

const LogoutSection = () => {
	const { logout } = useAuthenticationAppContext();
	const { behavior } = useBehaviorContext();

	const onPressLogout = async () => {
		behavior(BehaviorAction.PRESSED_LOGOUT).then(logout);
	};

	return (
		<View margin='m' marginTop='xl'>
			<Button
				variant='outlined'
				color='t'
				text='Logout'
				onPress={onPressLogout}
			/>
		</View>
	);
};

export default LogoutSection;

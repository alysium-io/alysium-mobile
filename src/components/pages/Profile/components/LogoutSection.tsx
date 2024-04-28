import { useAuthenticationAppContext } from '@arch/Authentication/Authentication.context';
import { View } from '@atomic';
import { Button } from '@molecules';
import React from 'react';

const LogoutSection = () => {
	const { logout } = useAuthenticationAppContext();

	return (
		<View margin='m'>
			<Button
				variant='outlined'
				colorVariant='negative'
				text='Logout'
				onPress={logout}
			/>
		</View>
	);
};

export default LogoutSection;

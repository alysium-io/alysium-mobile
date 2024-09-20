import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { View } from '@atomic';
import { Button } from '@molecules';
import React from 'react';

const SignUpActionFooter: React.FC = () => {
	const { createAccountBottomSheetApi } = useUserAppContext();
	return (
		<View margin='m'>
			<Button
				text='Create Account'
				onPress={createAccountBottomSheetApi?.open}
			/>
		</View>
	);
};

export default SignUpActionFooter;

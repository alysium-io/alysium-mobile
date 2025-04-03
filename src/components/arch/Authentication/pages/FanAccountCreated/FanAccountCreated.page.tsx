import { Text, View } from '@atomic';
import { usePersistedAppState } from '@hooks';
import { Button } from '@molecules';
import { BasePage } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { AuthStage } from '@types';
import React from 'react';
import { FanAccountCreatedPageRouteProp } from '../../types';

const FanAccountCreatedPage = () => {
	const { params } = useRoute<FanAccountCreatedPageRouteProp>();
	const { setPersistedAppState } = usePersistedAppState();
	const onContinue = () => {
		setPersistedAppState({ authStage: AuthStage.loggedIn });
	};

	return (
		<BasePage>
			<View
				margin='m'
				gap='m'
				flex={1}
				justifyContent='center'
				alignItems='center'
			>
				<Text variant='page-header'>Fan Account</Text>
				<Text variant='paragraph-large'>@{params.user.handle}</Text>
				<Text variant='paragraph-large' textAlign='center'>
					has been created successfully.
				</Text>
				<Button text='Continue' onPress={onContinue} />
			</View>
		</BasePage>
	);
};

export default FanAccountCreatedPage;

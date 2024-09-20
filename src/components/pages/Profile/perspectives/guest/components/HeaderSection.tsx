import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { Icon, Section, Text, View } from '@atomic';
import { EditableProfileImage } from '@molecules';
import React from 'react';

const HeaderSection = () => {
	const { checkUserWantsToRegisterBottomSheet } = useUserAppContext();

	return (
		<Section margin='m' marginTop='xl' marginBottom='xxxl' alignItems='center'>
			<EditableProfileImage
				onPress={checkUserWantsToRegisterBottomSheet.open}
			/>
			<View margin='m' alignItems='center'>
				<View flexDirection='row' alignItems='center'>
					<Icon name='at' size='s' color='text.p' />
					<Text variant='paragraph-medium' marginLeft='xs'>
						guest
					</Text>
				</View>
			</View>
			<Text variant='paragraph-small' color='text.t' textAlign='center'>
				As a guest, you only have limited functionality on your profile. Sign up
				to unlock all features.
			</Text>
		</Section>
	);
};

export default HeaderSection;

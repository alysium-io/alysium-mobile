import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { Icon, Text, View } from '@atomic';
import { useNavigation } from '@hooks';
import { EditableProfileImage } from '@molecules';
import React from 'react';
import { Pressable } from 'react-native';

const HeaderSection = () => {
	const { userData, setUserProfileImage } = useUserAppContext();
	const { editFanAccountPage } = useNavigation();

	return (
		<View margin='m' gap='s' alignItems='center'>
			<EditableProfileImage
				image={userData.profile_image?.small.key}
				onChooseImage={setUserProfileImage}
			/>
			<View flexDirection='row' alignItems='center' gap='xs' marginTop='m'>
				<Icon name='at' size='s' />
				<Text variant='paragraph-small'>{userData.handle}</Text>
			</View>
			<Pressable onPress={editFanAccountPage}>
				<Text
					variant='paragraph-small'
					color='text.q'
					textDecorationLine='underline'
				>
					Edit Fan Account
				</Text>
			</Pressable>
		</View>
	);
};

export default HeaderSection;

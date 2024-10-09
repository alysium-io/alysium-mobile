import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { Icon, Section, Text, View } from '@atomic';
import { useSheet } from '@hooks';
import { EditableProfileImage } from '@molecules';
import { EditUserProfileBottomSheet } from '@popups';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';

const HeaderSection = () => {
	const { userData, setUserProfileImage } = useUserAppContext();
	const editUserProfileSheetApi = useSheet();

	return (
		<Section margin='m' marginTop='xl' alignItems='center'>
			<EditableProfileImage
				image={userData.profile_image?.small.key}
				onChooseImage={setUserProfileImage}
			/>
			<View margin='m' alignItems='center'>
				<View flexDirection='row' alignItems='center' marginBottom='m'>
					<Icon name='at' size='s' color='text.p' />
					<Text variant='paragraph-medium' marginLeft='xs'>
						{userData.handle}
					</Text>
				</View>
				<TouchableWithoutFeedback onPress={editUserProfileSheetApi.open}>
					<View>
						<Text
							variant='paragraph-medium'
							textDecorationLine='underline'
							color='hyperlink.text.p'
						>
							Edit Profile
						</Text>
					</View>
				</TouchableWithoutFeedback>
			</View>
			<EditUserProfileBottomSheet sheetApi={editUserProfileSheetApi} />
		</Section>
	);
};

export default HeaderSection;

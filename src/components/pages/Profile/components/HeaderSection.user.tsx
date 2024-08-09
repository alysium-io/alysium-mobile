import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { Section, Text, View } from '@atomic';
import { useSheet } from '@hooks';
import { EditableProfileImage } from '@molecules';
import { EditUserProfileBottomSheet } from '@popups';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import UsernameDisplay from './UsernameDisplay';

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
				<UsernameDisplay />
				<TouchableWithoutFeedback onPress={editUserProfileSheetApi.open}>
					<View>
						<Text
							variant='paragraph-medium'
							textDecorationLine='underline'
							color='hyperlink.text'
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

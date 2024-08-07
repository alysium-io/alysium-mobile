import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { Section, View } from '@atomic';
import { useSheet } from '@hooks';
import { DeclarativeText, EditableProfileImage } from '@molecules';
import { EditUserProfileBottomSheet } from '@popups';
import React from 'react';
import UsernameDisplay from './UsernameDisplay';

const HeaderSection = () => {
	const { userData, setUserProfileImage } = useUserAppContext();
	const editUserProfileSheetApi = useSheet();

	return (
		<Section margin='m' alignItems='center'>
			<EditableProfileImage
				image={userData.profile_image?.small.key}
				onChooseImage={setUserProfileImage}
			/>
			<View margin='m' alignItems='center'>
				<UsernameDisplay />
				<View marginTop='m'>
					<DeclarativeText
						textItems={[
							{
								variant: 'paragraph-medium',
								underline: true,
								text: 'Edit Profile',
								color: 'text.color.p.medium',
								onPress: editUserProfileSheetApi.open
							}
						]}
					/>
				</View>
			</View>
			<EditUserProfileBottomSheet sheetApi={editUserProfileSheetApi} />
		</Section>
	);
};

export default HeaderSection;

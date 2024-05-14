import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { Section, View } from '@atomic';
import { DeclarativeText, EditableProfileImage } from '@molecules';
import React from 'react';
import UsernameDisplay from './UsernameDisplay';

const HeaderSection = () => {
	const { userData, setUserProfileImage } = useUserAppContext();

	return (
		<Section margin='m' alignItems='center'>
			<EditableProfileImage
				image={userData.profile_image?.url}
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
								color: 'matt',
								onPress: () => console.log('Edit Profile')
							}
						]}
					/>
				</View>
			</View>
		</Section>
	);
};

export default HeaderSection;

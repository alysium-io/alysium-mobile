import { useHostAppContext } from '@arch/Application/contexts/Host.context';
import { Section, View } from '@atomic';
import { DeclarativeText, EditableProfileImage } from '@molecules';
import { Stats } from '@organisms';
import React from 'react';
import UsernameDisplay from './UsernameDisplay';

const HeaderSection = () => {
	const { hostData, setHostProfileImage } = useHostAppContext();

	return (
		<Section margin='m' alignItems='center'>
			<EditableProfileImage
				image={
					hostData.profile_image?.url ||
					'https://www.w3schools.com/howto/img_avatar.png'
				}
				onChooseImage={setHostProfileImage}
			/>
			<View margin='m' alignItems='center'>
				<UsernameDisplay />
				<View marginTop='s'>
					<DeclarativeText
						textItems={[
							{
								variant: 'paragraph',
								text: 'Host',
								color: 't3'
							}
						]}
					/>
				</View>
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
				<View marginTop='m'>
					<Stats
						items={[
							{
								title: '0',
								subtitle: 'shows',
								onPress: () => console.log('shows')
							},
							{
								title: '0',
								subtitle: 'followers',
								onPress: () => console.log('shows')
							}
						]}
					/>
				</View>
			</View>
		</Section>
	);
};

export default HeaderSection;

import { Section, View } from '@atomic';
import { usePersona } from '@hooks';
import { DeclarativeText, EditableProfileImage } from '@molecules';
import { Stats } from '@organisms';
import React from 'react';
import useUserAppContext from 'src/components/navigation/AppGate/hooks/useUserAppContext';
import { useProfilePageContext } from '../hooks';
import UsernameDisplay from './UsernameDisplay';

const HeaderSection = () => {
	const { user } = useUserAppContext();
	const { changeProfileImage } = useProfilePageContext();
	const { personaType } = usePersona();

	return (
		<Section margin='m' alignItems='center'>
			<EditableProfileImage
				image={user?.profile_image?.url || ''}
				onChooseImage={changeProfileImage}
			/>
			<View margin='m' alignItems='center'>
				<UsernameDisplay />
				<View marginTop='s'>
					<DeclarativeText
						textItems={[
							{
								variant: 'paragraph',
								text: personaType,
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
								title: '42',
								subtitle: 'shows',
								onPress: () => console.log('shows')
							},
							{
								title: '1.5k',
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

import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { Avatar, Section, View } from '@atomic';
import { Stats } from '@organisms';
import React from 'react';

const HeaderSection = () => {
	const { userData, numberOfAccounts } = useUserAppContext();
	return (
		<Section margin='m' marginTop='xl'>
			<View
				flexDirection='row'
				alignItems='center'
				justifyContent='space-between'
				marginBottom='m'
			>
				<View height={75} width={75}>
					<Avatar
						image={userData.profile_image?.small.key}
						defaultImageProps={{ icon: 'user' }}
					/>
				</View>
				<Stats
					items={[
						{
							title: numberOfAccounts.toString(),
							subtitle: 'account' + (numberOfAccounts === 1 ? '' : 's')
						}
					]}
				/>
			</View>
		</Section>
	);
};

export default HeaderSection;

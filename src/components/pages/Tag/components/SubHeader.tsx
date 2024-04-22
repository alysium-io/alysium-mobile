import { Text, View } from '@atomic';
import { Stats } from '@organisms';
import React from 'react';
import { useTagPageContext } from '../Tag.context';

const SubHeader = () => {
	const { tagData } = useTagPageContext();

	return (
		<View
			margin='m'
			flexDirection='row'
			alignItems='center'
			justifyContent='space-between'
		>
			<View>
				<Text variant='page-header' marginBottom='xs'>
					{tagData.name}
				</Text>
				<Text variant='paragraph-medium' color='t2'>
					#12 most followed
				</Text>
			</View>
			<Stats
				items={[
					{
						subtitle: 'Followers',
						title: '1.2k',
						onPress: () => console.log('pressed')
					},
					{
						subtitle: 'Artists',
						title: '103',
						onPress: () => console.log('pressed')
					}
				]}
			/>
		</View>
	);
};

export default SubHeader;

import { Section, Text, View } from '@atomic';
import { Stats } from '@organisms';
import React from 'react';

interface SubHeaderProps {}

const SubHeader: React.FC<SubHeaderProps> = () => {
	return (
		<Section
			margin='m'
			flexDirection='row'
			alignItems='center'
			justifyContent='space-between'
		>
			<View>
				<Text variant='paragraph-medium' color='t1' style={{ marginBottom: 6 }}>
					Amsterdam, NE
				</Text>
			</View>
			<Stats
				items={[
					{
						title: '102k',
						subtitle: 'followers',
						onPress: () => {}
					},
					{
						title: '42',
						subtitle: 'shows',
						onPress: () => {}
					}
				]}
			/>
		</Section>
	);
};

export default SubHeader;

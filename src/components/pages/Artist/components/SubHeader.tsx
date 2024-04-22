import { Section, Text, View } from '@atomic';
import { OpenLinksButton } from '@molecules';
import { Stats } from '@organisms';
import React from 'react';
import { useArtistPageContext } from '../Artist.context';

const SubHeader = () => {
	const { linksSheetApi } = useArtistPageContext();

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
				<OpenLinksButton onPress={linksSheetApi.open} />
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

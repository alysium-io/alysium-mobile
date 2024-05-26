import { HeaderSafeArea, ScrollView, Text, View } from '@atomic';
import { BasePage } from '@organisms';
import React from 'react';

const ArtistViewContractPage = () => {
	return (
		<BasePage>
			<HeaderSafeArea>
				<ScrollView alwaysBounceVertical>
					<View margin='m'>
						<Text variant='page-header'>View Contract</Text>
					</View>
				</ScrollView>
			</HeaderSafeArea>
		</BasePage>
	);
};

export default ArtistViewContractPage;

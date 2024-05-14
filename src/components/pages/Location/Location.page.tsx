import { HeaderSafeArea, ScrollView, Text } from '@atomic';
import { withProvider } from '@hooks';
import { BasePage } from '@organisms';
import React from 'react';
import { LocationPageContextProvider } from './Location.context';

const LocationPage = () => {
	return (
		<BasePage>
			<HeaderSafeArea>
				<ScrollView>
					<Text margin='m' variant='page-header'>
						Location Page
					</Text>
				</ScrollView>
			</HeaderSafeArea>
		</BasePage>
	);
};

export default withProvider(LocationPage, LocationPageContextProvider);

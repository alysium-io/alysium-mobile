import { HeaderSafeArea, ScrollView } from '@atomic';
import { BasePage } from '@organisms';
import React from 'react';
import { TagPageContextProvider } from './Tag.context';
import { ActionButtons, Artists, SubHeader } from './components';

const TagPage = () => {
	return (
		<BasePage>
			<HeaderSafeArea>
				<ScrollView>
					<SubHeader />
					<ActionButtons />
					<Artists />
				</ScrollView>
			</HeaderSafeArea>
		</BasePage>
	);
};

export default () => (
	<TagPageContextProvider>
		<TagPage />
	</TagPageContextProvider>
);

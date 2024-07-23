import { HeaderSafeArea, ScrollView } from '@atomic';
import { BasePage } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { TagPageRouteProp } from '@types';
import React from 'react';
import Artists from './components/Artists';
import Header from './components/Header';
import useTagPage from './useTagPage';

const TagPage = () => {
	const route = useRoute<TagPageRouteProp>();
	const { tagData } = useTagPage(route.params.tag_uid);

	if (!tagData) {
		return null;
	}

	return (
		<BasePage>
			<HeaderSafeArea>
				<ScrollView>
					<Header tagData={tagData} />
					<Artists tagData={tagData} />
				</ScrollView>
			</HeaderSafeArea>
		</BasePage>
	);
};

export default TagPage;

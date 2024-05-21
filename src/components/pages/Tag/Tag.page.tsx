import { HeaderSafeArea, ScrollView } from '@atomic';
import { BasePage } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { TagPageRouteProp } from '@types';
import React from 'react';
import ActionButtons from './components/ActionButtons';
import Artists from './components/Artists';
import SubHeader from './components/SubHeader';
import useTagPage from './useTagPage';

const TagPage = () => {
	const route = useRoute<TagPageRouteProp>();
	const {
		tagData,
		isTagDataLoading,
		isTagDataError,
		moreSheetApi,
		onPressFollowers
	} = useTagPage(route.params.tagId);

	if (!tagData) {
		return null;
	}

	return (
		<BasePage>
			<HeaderSafeArea>
				<ScrollView>
					<SubHeader tagData={tagData} />
					<ActionButtons />
					<Artists tagData={tagData} />
				</ScrollView>
			</HeaderSafeArea>
		</BasePage>
	);
};

export default TagPage;

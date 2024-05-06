import { MenuListItem } from '@organisms';
import React from 'react';
import { useEditEventPageContext } from '../EditEvent.context';

const CandidatesItem = () => {
	const { goToEventCandidatesPage, eventData } = useEditEventPageContext();

	return (
		<MenuListItem
			title='Candidates'
			subtitle={`${eventData.num_candidates} candidates`}
			onPress={goToEventCandidatesPage}
			color='ion'
			border={false}
		/>
	);
};

export default CandidatesItem;

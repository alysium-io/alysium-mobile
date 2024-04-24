import { MenuListItem } from '@organisms';
import React from 'react';
import { useEditEventPageContext } from '../EditEvent.context';

const CandidatesItem = () => {
	const { goToEventCandidatesPage } = useEditEventPageContext();

	return (
		<MenuListItem
			title='Candidates'
			subtitle='14 artists'
			onPress={goToEventCandidatesPage}
			color='ion'
			border={false}
		/>
	);
};

export default CandidatesItem;

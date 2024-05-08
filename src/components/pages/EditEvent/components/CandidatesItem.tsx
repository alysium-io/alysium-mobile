import { View } from '@atomic';
import { MenuListItem } from '@organisms';
import React from 'react';
import { useEditEventPageContext } from '../EditEvent.context';

const CandidatesItem = () => {
	const { goToEventCandidatesPage, eventData } = useEditEventPageContext();

	return (
		<View>
			<MenuListItem
				title={`${eventData.num_contracts} Contracts`}
				subtitle={`${eventData.num_candidates} candidates`}
				onPress={goToEventCandidatesPage}
				color='ion'
				border
			/>
		</View>
	);
};

export default CandidatesItem;

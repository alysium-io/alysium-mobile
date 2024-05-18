import { View } from '@atomic';
import { FindOneEventResponseDto } from '@flux/api/event/dto/event-find-one.dto';
import { MenuListItem } from '@organisms';
import React from 'react';

interface CandidatesItemProps {
	goToEventCandidatesPage: () => void;
	eventData?: FindOneEventResponseDto;
}

const CandidatesItem: React.FC<CandidatesItemProps> = ({
	goToEventCandidatesPage,
	eventData
}) => {
	if (!eventData) return null;
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

import { HeaderSafeArea, ScrollView, View } from '@atomic';
import { BasePage } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { EventCandidatesPageRouteProp } from '@types';
import React from 'react';
import TogglerBodySection from './components/TogglerBodySection';
import TogglerSection from './components/TogglerSection';
import useEventCandidates from './useEventCandidates';

const EventCandidatesPage = () => {
	const route = useRoute<EventCandidatesPageRouteProp>();
	const {
		toggleFilterId,
		setToggleFilterId,
		candidatesData,
		contractsData,
		createContractSheetApi
	} = useEventCandidates(route.params.eventId);

	if (!candidatesData || !contractsData) {
		return null;
	}

	return (
		<BasePage>
			<HeaderSafeArea>
				<ScrollView alwaysBounceVertical>
					<View marginTop='l'>
						<TogglerSection setToggleFilterId={setToggleFilterId} />
						<TogglerBodySection
							toggleFilterId={toggleFilterId}
							candidatesData={candidatesData}
							createContractSheetApi={createContractSheetApi}
							eventId={route.params.eventId}
							contractsData={contractsData}
						/>
					</View>
				</ScrollView>
			</HeaderSafeArea>
		</BasePage>
	);
};

export default EventCandidatesPage;

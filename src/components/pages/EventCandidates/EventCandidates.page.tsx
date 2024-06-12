import { HeaderSafeArea, ScrollView, View } from '@atomic';
import { BasePage } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { EventCandidatesPageRouteProp } from '@types';
import React from 'react';
import { Case, Switch } from 'react-if';
import CandidatesSection from './components/CandidatesSection';
import ContractsSection from './components/ContractsSections';
import TogglerSection from './components/TogglerSection';
import useEventCandidates from './useEventCandidates';

const EventCandidatesPage = () => {
	const route = useRoute<EventCandidatesPageRouteProp>();
	const { toggleFilterId, setToggleFilterId, candidatesData, contractsData } =
		useEventCandidates(route.params.event_uid);

	if (!candidatesData || !contractsData) {
		return null;
	}

	return (
		<BasePage>
			<HeaderSafeArea>
				<ScrollView alwaysBounceVertical>
					<View marginTop='l'>
						<TogglerSection setToggleFilterId={setToggleFilterId} />
						<Switch>
							<Case condition={toggleFilterId === 0}>
								<CandidatesSection
									candidatesData={candidatesData}
									event_uid={route.params.event_uid}
								/>
							</Case>
							<Case condition={toggleFilterId === 1}>
								<ContractsSection contractsData={contractsData} />
							</Case>
						</Switch>
					</View>
				</ScrollView>
			</HeaderSafeArea>
		</BasePage>
	);
};

export default EventCandidatesPage;

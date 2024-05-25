import { ConditionalRenderer, HeaderSafeArea, ScrollView, View } from '@atomic';
import { BasePage } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { EventCandidatesPageRouteProp } from '@types';
import React, { useCallback } from 'react';
import CandidatesSection from './components/CandidatesSection';
import ContractsSection from './components/ContractsSections';
import TogglerSection from './components/TogglerSection';
import useEventCandidates from './useEventCandidates';

const EventCandidatesPage = () => {
	const route = useRoute<EventCandidatesPageRouteProp>();
	const { toggleFilterId, setToggleFilterId, candidatesData, contractsData } =
		useEventCandidates(route.params.eventId);

	const Candidates = useCallback(
		() =>
			candidatesData && (
				<CandidatesSection
					candidatesData={candidatesData}
					eventId={route.params.eventId}
				/>
			),
		[candidatesData, route.params.eventId]
	);

	const Contracts = useCallback(
		() => contractsData && <ContractsSection contractsData={contractsData} />,
		[contractsData]
	);

	if (!candidatesData || !contractsData) {
		return null;
	}

	return (
		<BasePage>
			<HeaderSafeArea>
				<ScrollView alwaysBounceVertical>
					<View marginTop='l'>
						<TogglerSection setToggleFilterId={setToggleFilterId} />
						<ConditionalRenderer
							componentKey={toggleFilterId}
							componentMap={{
								[0]: Candidates,
								[1]: Contracts
							}}
						/>
					</View>
				</ScrollView>
			</HeaderSafeArea>
		</BasePage>
	);
};

export default EventCandidatesPage;

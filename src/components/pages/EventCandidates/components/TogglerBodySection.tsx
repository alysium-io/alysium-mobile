import React from 'react';
import { LayoutAnimationConfig } from 'react-native-reanimated';
import { useEventCandidatesPageContext } from '../EventCandidates.context';
import CandidatesSection from './CandidatesSection';
import ContractsSection from './ContractsSections';

const TogglerBodySection = () => {
	const { toggleFilterId } = useEventCandidatesPageContext();
	return (
		<LayoutAnimationConfig skipEntering>
			{toggleFilterId === 0 ? <CandidatesSection /> : <ContractsSection />}
		</LayoutAnimationConfig>
	);
};

export default TogglerBodySection;

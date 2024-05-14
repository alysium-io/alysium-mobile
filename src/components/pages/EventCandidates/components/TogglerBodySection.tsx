import { ConditionalRenderer } from '@atomic';
import React from 'react';
import { LayoutAnimationConfig } from 'react-native-reanimated';
import { useEventCandidatesPageContext } from '../EventCandidates.context';
import CandidatesSection from './CandidatesSection';
import ContractsSection from './ContractsSections';

const TogglerBodySection = () => {
	const { toggleFilterId } = useEventCandidatesPageContext();
	return (
		<LayoutAnimationConfig skipEntering>
			<ConditionalRenderer
				componentKey={toggleFilterId}
				componentMap={{
					[0]: CandidatesSection,
					[1]: ContractsSection
				}}
			/>
		</LayoutAnimationConfig>
	);
};

export default TogglerBodySection;

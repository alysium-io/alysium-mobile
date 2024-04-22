import { Section } from '@atomic';
import { TabToggler } from '@molecules';
import React from 'react';
import { useEventCandidatesPageContext } from '../EventCandidates.context';

const TogglerSection = () => {
	const { setToggleFilterId } = useEventCandidatesPageContext();

	return (
		<Section margin='m' marginTop='none'>
			<TabToggler
				data={[
					{ id: 0, text: 'all' },
					{ id: 1, text: 'active' }
				]}
				defaultActiveTab={0}
				onChange={(id: number) => setToggleFilterId(id)}
			/>
		</Section>
	);
};

export default TogglerSection;

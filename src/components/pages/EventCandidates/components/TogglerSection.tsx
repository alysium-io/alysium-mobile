import { Section } from '@atomic';
import { TabToggler } from '@molecules';
import React from 'react';

interface TogglerSectionProps {
	setToggleFilterId: (id: number) => void;
}

const TogglerSection: React.FC<TogglerSectionProps> = ({
	setToggleFilterId
}) => {
	return (
		<Section margin='m' marginTop='none'>
			<TabToggler
				data={[
					{ id: 0, text: 'candidates' },
					{ id: 1, text: 'contracts' }
				]}
				defaultActiveTab={0}
				onChange={(id: number) => setToggleFilterId(id)}
			/>
		</Section>
	);
};

export default TogglerSection;

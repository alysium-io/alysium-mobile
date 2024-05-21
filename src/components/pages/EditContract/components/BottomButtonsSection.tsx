import { Section } from '@atomic';
import { Button } from '@molecules';
import React from 'react';

interface BottomButtonsSectionProps {
	confirmDelete: () => void;
}

const BottomButtonsSection: React.FC<BottomButtonsSectionProps> = ({
	confirmDelete
}) => {
	return (
		<Section margin='m'>
			<Button
				text='Delete'
				onPress={confirmDelete}
				variant='outlined'
				colorVariant='negative'
			/>
		</Section>
	);
};

export default BottomButtonsSection;

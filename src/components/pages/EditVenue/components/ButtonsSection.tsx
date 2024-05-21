import { Section } from '@atomic';
import { Button } from '@molecules';
import React from 'react';

interface ButtonsSectionProps {
	confirmDelete: () => void;
}

const ButtonsSection: React.FC<ButtonsSectionProps> = ({ confirmDelete }) => {
	return (
		<Section margin='m'>
			<Button
				text='Delete'
				onPress={confirmDelete}
				colorVariant='negative'
				variant='outlined'
			/>
		</Section>
	);
};

export default ButtonsSection;

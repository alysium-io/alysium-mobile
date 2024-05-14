import { Section } from '@atomic';
import { Button } from '@molecules';
import React from 'react';
import { useEditVenuePageContext } from '../EditVenue.context';

const ButtonsSection = () => {
	const { confirmDelete } = useEditVenuePageContext();

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

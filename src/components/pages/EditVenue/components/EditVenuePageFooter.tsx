import { View } from '@atomic';
import { Button } from '@molecules';
import React from 'react';
import { useEditVenuePageContext } from '../EditVenue.context';

const EditVenuePageFooter = () => {
	const { onSubmit } = useEditVenuePageContext();

	return (
		<View margin='m' flex={1}>
			<Button
				text='Save'
				onPress={onSubmit}
				colorVariant='positive'
				variant='filled'
			/>
		</View>
	);
};

export default EditVenuePageFooter;

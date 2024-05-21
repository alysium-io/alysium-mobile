import { View } from '@atomic';
import { Button } from '@molecules';
import { OnSubmitHandler } from '@types';
import React from 'react';

interface EditVenuePageFooterProps {
	onSubmit: OnSubmitHandler;
}

const EditVenuePageFooter: React.FC<EditVenuePageFooterProps> = ({
	onSubmit
}) => {
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

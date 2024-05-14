import { View } from '@atomic';
import { Button } from '@molecules';
import React from 'react';
import { useEditEventPageContext } from '../EditEvent.context';

const EditEventPageFooter = () => {
	const { onSubmit } = useEditEventPageContext();

	return (
		<View margin='m' flex={1}>
			<Button
				text='Save Draft'
				onPress={onSubmit}
				colorVariant='positive'
				variant='filled'
			/>
		</View>
	);
};

export default EditEventPageFooter;

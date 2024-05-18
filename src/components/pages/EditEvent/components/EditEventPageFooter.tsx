import { View } from '@atomic';
import { Button } from '@molecules';
import React from 'react';

interface EditEventPageFooterProps {
	onSubmit: () => void;
}

const EditEventPageFooter: React.FC<EditEventPageFooterProps> = ({
	onSubmit
}) => {
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

import { View } from '@atomic';
import { Button } from '@molecules';
import { OnSubmitHandler } from '@types';
import React from 'react';

interface EditContractPageFooterProps {
	onSubmit: OnSubmitHandler;
}

const EditContractPageFooter: React.FC<EditContractPageFooterProps> = ({
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

export default EditContractPageFooter;

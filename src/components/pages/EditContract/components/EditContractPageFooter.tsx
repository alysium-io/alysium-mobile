import { View } from '@atomic';
import { Button } from '@molecules';
import React from 'react';
import { useEditContractPageContext } from '../EditContract.context';

const EditContractPageFooter = () => {
	const { onSubmit } = useEditContractPageContext();

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

import { Section } from '@atomic';
import { Button } from '@molecules';
import React from 'react';
import { useEditContractPageContext } from '../EditContract.context';

const BottomButtonsSection = () => {
	const { confirmDelete } = useEditContractPageContext();
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

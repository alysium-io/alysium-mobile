import React from 'react';
import { useCreateContractBottomSheetContext } from '../CreateContractBottomSheet.context';
import FooterButtons from './FooterButtons';

const AdditionalNotesFooter = () => {
	const { sequenceApi, onSubmit } = useCreateContractBottomSheetContext();

	return (
		<FooterButtons
			buttons={[
				{
					onPress: sequenceApi.back,
					text: 'back',
					variant: 'outlined',
					colorVariant: 'default'
				},
				{
					onPress: onSubmit,
					text: 'Done',
					variant: 'filled',
					colorVariant: 'default',
					icon: 'arrow-right'
				}
			]}
		/>
	);
};

export default AdditionalNotesFooter;

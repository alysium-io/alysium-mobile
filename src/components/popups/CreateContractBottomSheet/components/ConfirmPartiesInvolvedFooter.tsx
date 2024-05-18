import React from 'react';
import { useCreateContractBottomSheetContext } from '../CreateContractBottomSheet.context';
import FooterButtons from './FooterButtons';

const ConfirmPartiesInvolvedFooter = () => {
	const { sheetApi, sequenceApi } = useCreateContractBottomSheetContext();
	return (
		<FooterButtons
			buttons={[
				{
					onPress: sheetApi.close,
					text: 'cancel',
					variant: 'outlined',
					colorVariant: 'default'
				},
				{
					onPress: sequenceApi.next,
					text: 'Start',
					variant: 'filled',
					colorVariant: 'default',
					icon: 'arrow-right'
				}
			]}
		/>
	);
};

export default ConfirmPartiesInvolvedFooter;

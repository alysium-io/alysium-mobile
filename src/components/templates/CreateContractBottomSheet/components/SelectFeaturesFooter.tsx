import React from 'react';
import { useCreateContractBottomSheetContext } from '../CreateContractBottomSheet.context';
import FooterButtons from './FooterButtons';

const SelectFeaturesFooter = () => {
	const { sequenceApi } = useCreateContractBottomSheetContext();

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
					onPress: sequenceApi.next,
					text: 'next',
					variant: 'filled',
					colorVariant: 'default',
					icon: 'arrow-right'
				}
			]}
		/>
	);
};

export default SelectFeaturesFooter;

import { SequenceApi } from '@hooks';
import React from 'react';
import FooterButtons from './FooterButtons';

interface SelectSlotTimeFooterProps {
	sequenceApi: SequenceApi;
}

const SelectSlotTimeFooter: React.FC<SelectSlotTimeFooterProps> = ({
	sequenceApi
}) => {
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

export default SelectSlotTimeFooter;

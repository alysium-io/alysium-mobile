import { SequenceApi } from '@hooks';
import { OnSubmitHandler } from '@types';
import React from 'react';
import FooterButtons from './FooterButtons';

interface AdditionalNotesFooterProps {
	sequenceApi: SequenceApi;
	onSubmit: OnSubmitHandler;
}

const AdditionalNotesFooter: React.FC<AdditionalNotesFooterProps> = ({
	sequenceApi,
	onSubmit
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

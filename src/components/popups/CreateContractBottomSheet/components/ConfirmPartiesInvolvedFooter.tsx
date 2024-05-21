import { SequenceApi, SheetApi } from '@hooks';
import React from 'react';
import FooterButtons from './FooterButtons';

interface ConfirmPartiesInvolvedFooterProps {
	sheetApi: SheetApi;
	sequenceApi: SequenceApi;
}

const ConfirmPartiesInvolvedFooter: React.FC<
	ConfirmPartiesInvolvedFooterProps
> = ({ sheetApi, sequenceApi }) => {
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

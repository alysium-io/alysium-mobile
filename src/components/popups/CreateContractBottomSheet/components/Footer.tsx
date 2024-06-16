import {
	BottomSheetFooter,
	SequenceApi,
	SequenceFooterButtons
} from '@organisms';
import React from 'react';
import { Case, Default, Switch } from 'react-if';

interface FooterProps {
	cancel: () => void;
	done: () => void;
	sequenceApi: SequenceApi;
}

const Footer: React.FC<FooterProps> = ({ cancel, done, sequenceApi }) => {
	return (
		<BottomSheetFooter>
			<Switch>
				<Case condition={sequenceApi.sequenceIndex === 0}>
					<SequenceFooterButtons
						buttons={[
							{
								onPress: cancel,
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
				</Case>
				<Case
					condition={sequenceApi.sequenceIndex === sequenceApi.numItems - 1}
				>
					<SequenceFooterButtons
						buttons={[
							{
								onPress: sequenceApi.back,
								text: 'back',
								variant: 'outlined',
								colorVariant: 'default'
							},
							{
								onPress: done,
								text: 'Done',
								variant: 'filled',
								colorVariant: 'default'
							}
						]}
					/>
				</Case>
				<Default>
					<SequenceFooterButtons
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
				</Default>
			</Switch>
		</BottomSheetFooter>
	);
};

export default Footer;

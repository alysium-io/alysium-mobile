import { ConditionalRenderer, View } from '@atomic';
import { BottomSheetFooterProps } from '@gorhom/bottom-sheet';
import { BottomSheetFooter } from '@organisms';
import { IChildrenProps } from '@types';
import React, { useCallback } from 'react';
import { useCreateContractBottomSheetContext } from '../CreateContractBottomSheet.context';
import AdditionalNotesFooter from './AdditionalNotesFooter';
import ConfirmPartiesInvolvedFooter from './ConfirmPartiesInvolvedFooter';
import SelectFeaturesFooter from './SelectFeaturesFooter';
import SelectSlotTimeFooter from './SelectSlotTimeFooter';

interface SequenceFooterWrapperProps extends IChildrenProps {
	setHeight: (height: number) => void;
}

const SequenceFooterWrapper: React.FC<SequenceFooterWrapperProps> = ({
	children,
	setHeight
}) => {
	return (
		<View
			onLayout={({ nativeEvent }) => {
				setHeight(nativeEvent.layout.height);
			}}
		>
			{children}
		</View>
	);
};

const Footer: React.FC<BottomSheetFooterProps> = (
	props: BottomSheetFooterProps
) => {
	const { sequenceApi, setHeight } = useCreateContractBottomSheetContext();

	const Foot = useCallback(
		(props: BottomSheetFooterProps) => (
			<BottomSheetFooter {...props}>
				<ConditionalRenderer
					componentKey={sequenceApi.state}
					componentMap={Object.fromEntries(
						[
							ConfirmPartiesInvolvedFooter,
							SelectSlotTimeFooter,
							SelectFeaturesFooter,
							AdditionalNotesFooter
						].map((FooterComponent, index) => [
							index,
							() => (
								<SequenceFooterWrapper setHeight={setHeight} key={index}>
									<FooterComponent />
								</SequenceFooterWrapper>
							)
						])
					)}
				/>
			</BottomSheetFooter>
		),
		[sequenceApi.state]
	);

	return <Foot {...props} />;
};

export default Footer;

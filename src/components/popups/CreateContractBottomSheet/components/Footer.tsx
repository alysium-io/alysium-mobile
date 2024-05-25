import { ConditionalRenderer, SequenceApi, View } from '@atomic';
import { BottomSheetFooterProps } from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import { BottomSheetFooter } from '@organisms';
import { IChildrenProps, OnSubmitHandler } from '@types';
import React, { useCallback } from 'react';
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

interface FooterProps extends BottomSheetFooterProps {
	sheetApi: SheetApi;
	sequenceApi: SequenceApi;
	setHeight: (height: number) => void;
	onSubmit: OnSubmitHandler;
}

const Footer: React.FC<FooterProps> = ({
	sheetApi,
	sequenceApi,
	setHeight,
	onSubmit,
	...props
}) => {
	const feet = [
		useCallback(
			() => (
				<ConfirmPartiesInvolvedFooter
					sheetApi={sheetApi}
					sequenceApi={sequenceApi}
				/>
			),
			[]
		),
		useCallback(() => <SelectSlotTimeFooter sequenceApi={sequenceApi} />, []),
		useCallback(() => <SelectFeaturesFooter sequenceApi={sequenceApi} />, []),
		useCallback(
			() => (
				<AdditionalNotesFooter sequenceApi={sequenceApi} onSubmit={onSubmit} />
			),
			[sequenceApi, onSubmit]
		)
	];

	const Foot = useCallback(
		(props: BottomSheetFooterProps) => (
			<BottomSheetFooter {...props}>
				<ConditionalRenderer
					componentKey={sequenceApi.sequenceIndex}
					componentMap={Object.fromEntries(
						feet.map((FooterComponent, index) => [
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
		[sequenceApi.sequenceIndex, setHeight]
	);

	return <Foot {...props} />;
};

export default Footer;

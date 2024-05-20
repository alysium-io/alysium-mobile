import { ConditionalRenderer, SlideInOutSequenceView, View } from '@atomic';
import { BottomSheetFooterProps, BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import { BottomSheet } from '@organisms';
import { ApiIdentifier } from '@types';
import React, { useCallback } from 'react';
import { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AdditionalNotes from './components/AdditionalNotes';
import ConfirmPartiesInvolved from './components/ConfirmPartiesInvolved';
import Footer from './components/Footer';
import Loading from './components/Loading';
import SelectFeatures from './components/SelectFeatures';
import SelectSlotTime from './components/SelectSlotTime';
import useCreateContractBottomSheet from './useCreateContractBottomSheet';

interface CreateContractBottomSheetProps {
	sheetApi: SheetApi;
	artistId: ApiIdentifier | null;
	eventId: ApiIdentifier;
}

const CreateContractBottomSheet: React.FC<CreateContractBottomSheetProps> = ({
	sheetApi,
	artistId,
	eventId
}) => {
	const insets = useSafeAreaInsets();
	const {
		sequenceApi,
		height,
		additionalNotesTextInputApi,
		formMethods,
		onChangeStartTime,
		onChangeEndTime,
		onSubmit,
		setHeight
	} = useCreateContractBottomSheet(eventId, artistId, sheetApi);

	const bodies = [
		ConfirmPartiesInvolved,
		useCallback(
			() => (
				<SelectSlotTime
					formMethods={formMethods}
					onChangeStartTime={onChangeStartTime}
					onChangeEndTime={onChangeEndTime}
				/>
			),
			[]
		),
		useCallback(() => <SelectFeatures formMethods={formMethods} />, []),
		useCallback(
			() => (
				<AdditionalNotes
					additionalNotesTextInputApi={additionalNotesTextInputApi}
					formMethods={formMethods}
				/>
			),
			[]
		)
	];

	const FooterComponent = useCallback(
		(props: BottomSheetFooterProps) => (
			<Footer
				sheetApi={sheetApi}
				sequenceApi={sequenceApi}
				setHeight={setHeight}
				onSubmit={onSubmit}
				{...props}
			/>
		),
		[sheetApi, sequenceApi]
	);

	return (
		<BottomSheet
			sheetRef={sheetApi.sheetRef}
			enableDynamicSizing
			footerComponent={FooterComponent}
		>
			<BottomSheetView
				style={{
					paddingBottom: height + insets.bottom
				}}
			>
				<ConditionalRenderer
					componentKey={sequenceApi.state}
					componentMap={{
						...Object.fromEntries(
							bodies.map((BodyComponent, index) => [
								index,
								() => (
									<SlideInOutSequenceView
										sequenceState={sequenceApi.state}
										prevSequenceState={sequenceApi.prevState}
										sequenceIndex={index}
										key={index}
									>
										<BodyComponent />
									</SlideInOutSequenceView>
								)
							])
						),
						[bodies.length]: () => (
							<View animated entering={FadeIn.duration(350)}>
								<Loading />
							</View>
						)
					}}
				/>
			</BottomSheetView>
		</BottomSheet>
	);
};

export default CreateContractBottomSheet;

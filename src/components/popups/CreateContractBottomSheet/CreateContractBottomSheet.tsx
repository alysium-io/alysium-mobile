import { DismissKeyboardWrapper } from '@atomic';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import {
	BottomSheet,
	Sequence,
	SwipeUpToSubmit,
	useAnimatedFooterHeight
} from '@organisms';
import { ApiIdentifier } from '@types';
import React from 'react';
import AdditionalNotes from './components/AdditionalNotes';
import ConfirmPartiesInvolved from './components/ConfirmPartiesInvolved';
import CreateContractSTSCompleteModalContent from './components/CreateContractSTSCompleteModalContent';
import CreateContractSTSSheetContent from './components/CreateContractSTSSheetContent';
import Footer from './components/Footer';
import SelectFeatures from './components/SelectFeatures';
import SelectSlotTime from './components/SelectSlotTime';
import useCreateContractBottomSheet from './useCreateContractBottomSheet';

interface CreateContractBottomSheetProps {
	sheetApi: SheetApi;
	artist_uid: ApiIdentifier | null;
	event_uid: ApiIdentifier;
}

const CreateContractBottomSheet: React.FC<CreateContractBottomSheetProps> = ({
	sheetApi,
	artist_uid,
	event_uid
}) => {
	const {
		additionalNotesTextInputApi,
		formMethods,
		onChangeStartTime,
		onChangeEndTime,
		sequenceFormComplete,
		sequenceApi,
		cancel,
		resetAll,
		swipeToSubmitModalApi,
		onSubmit,
		onComplete
	} = useCreateContractBottomSheet(event_uid, artist_uid, sheetApi);
	const { animatedMarginBottom } = useAnimatedFooterHeight();

	return (
		<BottomSheet
			sheetRef={sheetApi.sheetRef}
			snapPoints={['90%']}
			onDismiss={resetAll}
		>
			<DismissKeyboardWrapper>
				<BottomSheetView style={[{ flex: 1 }, animatedMarginBottom]}>
					<Sequence sequenceIndex={sequenceApi.sequenceIndex}>
						<ConfirmPartiesInvolved />
						<SelectSlotTime
							formMethods={formMethods}
							onChangeStartTime={onChangeStartTime}
							onChangeEndTime={onChangeEndTime}
						/>
						<SelectFeatures formMethods={formMethods} />
						<AdditionalNotes
							additionalNotesTextInputApi={additionalNotesTextInputApi}
							formMethods={formMethods}
						/>
					</Sequence>
				</BottomSheetView>
			</DismissKeyboardWrapper>
			<Footer
				sequenceApi={sequenceApi}
				done={sequenceFormComplete}
				cancel={cancel}
			/>
			<SwipeUpToSubmit
				modalApi={swipeToSubmitModalApi}
				onSubmit={onSubmit}
				onComplete={onComplete}
				CompleteModalContent={CreateContractSTSCompleteModalContent}
				SheetContent={CreateContractSTSSheetContent}
			/>
		</BottomSheet>
	);
};

export default CreateContractBottomSheet;

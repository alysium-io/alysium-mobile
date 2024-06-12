import { Sequence } from '@atomic';
import { BottomSheetFooterProps, BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import { BottomSheet } from '@organisms';
import { ApiIdentifier } from '@types';
import React, { useCallback } from 'react';
import { useWindowDimensions } from 'react-native';
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
	artist_uid: ApiIdentifier | null;
	event_uid: ApiIdentifier;
}

const CreateContractBottomSheet: React.FC<CreateContractBottomSheetProps> = ({
	sheetApi,
	artist_uid,
	event_uid
}) => {
	const insets = useSafeAreaInsets();
	const {
		height,
		additionalNotesTextInputApi,
		formMethods,
		onChangeStartTime,
		onChangeEndTime,
		onSubmit,
		setHeight,
		sequenceApi
	} = useCreateContractBottomSheet(event_uid, artist_uid, sheetApi);

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

	const { height: screenHeight } = useWindowDimensions();

	return (
		<BottomSheet
			sheetRef={sheetApi.sheetRef}
			footerComponent={FooterComponent}
			enableDynamicSizing
		>
			<BottomSheetView
				style={{
					paddingBottom: insets.bottom + height,
					height: (screenHeight / 3) * 2,
					justifyContent: 'center'
				}}
			>
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
					<Loading />
				</Sequence>
			</BottomSheetView>
		</BottomSheet>
	);
};

export default CreateContractBottomSheet;

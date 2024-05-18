import { KeyboardViewFill } from '@atomic';
import { SheetApi } from '@hooks';
import {
	BottomSheet,
	BottomSheetHeader,
	BottomSheetViewWithMaxHeight
} from '@organisms';
import React, { useEffect } from 'react';
import BottomButtons from './components/BottomButtons';
import VenueName from './components/VenueName';
import useCreateVenueBottomSheet from './useCreateVenueBottomSheet';

interface CreateVenueStartBottomSheetProps {
	sheetApi: SheetApi;
}

const CreateVenueStartBottomSheet: React.FC<
	CreateVenueStartBottomSheetProps
> = ({ sheetApi }) => {
	const {
		formMethods,
		onDismiss,
		textInputApi,
		cancel,
		onSubmit,
		createVenueButtonState,
		setVenueName,
		onChange
	} = useCreateVenueBottomSheet(sheetApi);

	useEffect(() => {
		textInputApi.focus();
	}, []);

	return (
		<BottomSheet
			sheetRef={sheetApi.sheetRef}
			borderRadius={false}
			borderColor='ion_dark'
			onChange={onChange}
			onDismiss={onDismiss}
		>
			<BottomSheetViewWithMaxHeight>
				<BottomSheetHeader text='Create Venue' />
				<VenueName
					formMethods={formMethods}
					textInputApi={textInputApi}
					setVenueName={setVenueName}
				/>
				<BottomButtons
					cancel={cancel}
					onSubmit={onSubmit}
					createVenueButtonState={createVenueButtonState}
				/>
				<KeyboardViewFill />
			</BottomSheetViewWithMaxHeight>
		</BottomSheet>
	);
};

export default CreateVenueStartBottomSheet;

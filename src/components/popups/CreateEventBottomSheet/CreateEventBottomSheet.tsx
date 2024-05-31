import { SheetApi } from '@hooks';
import {
	BottomSheet,
	BottomSheetHeader,
	BottomSheetKeyboardAvoidingView
} from '@organisms';
import React from 'react';
import ActionButtons from './components/ActionButtons';
import EventName from './components/EventName';
import useCreateEventBottomSheet from './useCreateEventBottomSheet';

interface CreateEventBottomSheetProps {
	sheetApi: SheetApi;
}

const CreateEventBottomSheet: React.FC<CreateEventBottomSheetProps> = ({
	sheetApi
}) => {
	const {
		setEventName,
		onSubmit,
		onSheetIndexChangeFocusTextInput,
		onDismiss,
		eventNameTextInputApi,
		createEventButtonState,
		cancel
	} = useCreateEventBottomSheet(sheetApi);
	return (
		<BottomSheet
			sheetRef={sheetApi.sheetRef}
			borderRadius={false}
			borderColor='ion_dark'
			onChange={onSheetIndexChangeFocusTextInput}
			onDismiss={onDismiss}
		>
			<BottomSheetKeyboardAvoidingView>
				<BottomSheetHeader text='Create Event' />
				<EventName
					eventNameTextInputApi={eventNameTextInputApi}
					setEventName={setEventName}
				/>
				<ActionButtons
					onSubmit={onSubmit}
					cancel={cancel}
					createEventButtonState={createEventButtonState}
				/>
			</BottomSheetKeyboardAvoidingView>
		</BottomSheet>
	);
};

export default CreateEventBottomSheet;

import { KeyboardViewFill } from '@atomic';
import { SheetApi } from '@hooks';
import {
	BottomSheet,
	BottomSheetHeader,
	BottomSheetViewWithMaxHeight
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
			<BottomSheetViewWithMaxHeight>
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
				<KeyboardViewFill />
			</BottomSheetViewWithMaxHeight>
		</BottomSheet>
	);
};

export default CreateEventBottomSheet;

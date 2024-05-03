import { useHostAppContext } from '@arch/Application/contexts/Host.context';
import { KeyboardViewFill, View } from '@atomic';
import { eventApiSlice } from '@flux/api/event';
import { SheetApi, useButton, useNavigation, useTextInput } from '@hooks';
import { Button, TextInput } from '@molecules';
import {
	BottomSheet,
	BottomSheetHeader,
	BottomSheetViewWithMaxHeight
} from '@organisms';
import React, { useState } from 'react';
interface CreateEventStartBottomSheetProps {
	sheetApi: SheetApi;
}

const CreateEventStartBottomSheet: React.FC<
	CreateEventStartBottomSheetProps
> = ({ sheetApi }) => {
	const textInputApi = useTextInput();
	const { hostData } = useHostAppContext();
	const { editEventPage } = useNavigation();
	const { buttonState: createEventButtonState, setButtonState } =
		useButton('disabled');

	const [eventName, setEventName] = useState<string>('');

	const [createEvent] = eventApiSlice.useCreateMutation();

	const _setEventName = (text: string) => {
		setEventName(text);
		if (text.length > 0) {
			setButtonState('default');
		} else {
			setButtonState('disabled');
		}
	};

	const _createEvent = async () => {
		const data = await createEvent({
			body: {
				host_id: hostData.host_id,
				name: eventName
			}
		}).unwrap();

		sheetApi.close();
		editEventPage(data.event_id);
	};

	const onChange = (index: number) => {
		if (index === 0) {
			textInputApi.focus();
		}
	};

	const onDismiss = () => {
		setButtonState('disabled');
		setEventName('');
	};

	return (
		<BottomSheet
			sheetRef={sheetApi.sheetRef}
			borderRadius={false}
			borderColor='ion_dark'
			onChange={onChange}
			onDismiss={onDismiss}
		>
			<BottomSheetViewWithMaxHeight>
				<BottomSheetHeader text='Create Event' />
				<View margin='m' marginTop='l'>
					<TextInput
						textInputApi={textInputApi}
						placeholder='Event Name'
						onChangeText={_setEventName}
					/>
				</View>
				<View margin='m' flexDirection='row'>
					<View flex={1} marginRight='s'>
						<Button
							text='Cancel'
							colorVariant='default'
							variant='outlined'
							onPress={() => sheetApi.close()}
						/>
					</View>
					<View flex={1} marginLeft='s'>
						<Button
							text='Create'
							onPress={_createEvent}
							colorVariant='default'
							buttonState={createEventButtonState}
							disabled={eventName.length === 0}
						/>
					</View>
				</View>
				<KeyboardViewFill />
			</BottomSheetViewWithMaxHeight>
		</BottomSheet>
	);
};

export default CreateEventStartBottomSheet;

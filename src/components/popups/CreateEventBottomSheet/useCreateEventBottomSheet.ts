import { useHostAppContext } from '@arch/Application/contexts/Host.context';
import { eventApiSlice } from '@flux/api/event';
import { CreateEventBodyDto } from '@flux/api/event/dto/event-create.dto';
import {
	SheetApi,
	TextInputApi,
	useButton,
	useNavigation,
	useTextInput
} from '@hooks';
import { ButtonState } from '@molecules';
import { OnSubmitHandler } from '@types';
import {
	SubmitErrorHandler,
	SubmitHandler,
	UseFormReturn,
	useForm
} from 'react-hook-form';

interface IUseCreateEventBottomSheet {
	formMethods: UseFormReturn<CreateEventBodyDto>;
	onSubmit: OnSubmitHandler;
	setEventName: (text: string) => void;
	onSheetIndexChangeFocusTextInput: (index: number) => void;
	onDismiss: () => void;
	eventNameTextInputApi: TextInputApi;
	createEventButtonState: ButtonState;
	cancel: () => void;
}

const useCreateEventBottomSheet = (
	sheetApi: SheetApi
): IUseCreateEventBottomSheet => {
	const eventNameTextInputApi = useTextInput();
	const { hostData } = useHostAppContext();
	const { editEventPage } = useNavigation();
	const [createEventMutation] = eventApiSlice.useCreateMutation();
	const { buttonState: createEventButtonState, setButtonState } =
		useButton('disabled');

	const formMethods = useForm<CreateEventBodyDto>({
		defaultValues: {
			name: '',
			host_id: hostData.host_id
		}
	});

	const onValid: SubmitHandler<CreateEventBodyDto> = async (
		data: CreateEventBodyDto
	) => {
		const response = await createEventMutation({
			body: data
		}).unwrap();

		sheetApi.close();
		editEventPage(response.event_id);
	};

	const onInvalid: SubmitErrorHandler<CreateEventBodyDto> = (errors: any) => {
		console.log(errors);
	};

	const onSubmit = formMethods.handleSubmit(onValid, onInvalid);

	const setEventName = (text: string) => {
		formMethods.setValue('name', text);
		if (text.length > 0 && createEventButtonState !== 'default') {
			setButtonState('default');
		} else if (text.length === 0 && createEventButtonState !== 'disabled') {
			setButtonState('disabled');
		}
	};

	const onSheetIndexChangeFocusTextInput = (index: number) => {
		if (index === 0) {
			eventNameTextInputApi.focus();
		}
	};

	const onDismiss = () => {
		setButtonState('disabled');
		formMethods.reset();
	};

	const cancel = () => sheetApi.close();

	return {
		formMethods,
		onSubmit,
		setEventName,
		onSheetIndexChangeFocusTextInput,
		onDismiss,
		eventNameTextInputApi,
		createEventButtonState,
		cancel
	};
};

export default useCreateEventBottomSheet;

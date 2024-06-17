import { useHostAppContext } from '@arch/Application/contexts/Host.context';
import { eventApiSlice } from '@flux/api/event';
import { CreateEventBodyDto } from '@flux/api/event/dto/event-create.dto';
import { SheetApi, TextInputApi, useNavigation, useTextInput } from '@hooks';
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
	onSheetIndexChangeFocusTextInput: (index: number) => void;
	resetAll: () => void;
	eventNameTextInputApi: TextInputApi;
	cancel: () => void;
}

const useCreateEventBottomSheet = (
	sheetApi: SheetApi
): IUseCreateEventBottomSheet => {
	const eventNameTextInputApi = useTextInput();
	const { hostData } = useHostAppContext();
	const { editEventPage } = useNavigation();
	const [createEventMutation] = eventApiSlice.useCreateMutation();

	const formMethods = useForm<CreateEventBodyDto>({
		defaultValues: {
			name: '',
			host_uid: hostData.host_uid
		}
	});

	const onValid: SubmitHandler<CreateEventBodyDto> = async (
		data: CreateEventBodyDto
	) => {
		const response = await createEventMutation({
			body: data
		}).unwrap();

		sheetApi.close();
		editEventPage(response.event_uid);
	};

	const onInvalid: SubmitErrorHandler<CreateEventBodyDto> = (errors: any) => {
		console.log(errors);
	};

	const onSubmit = formMethods.handleSubmit(onValid, onInvalid);

	const onSheetIndexChangeFocusTextInput = (index: number) => {
		if (index === 0) {
			eventNameTextInputApi.focus();
		}
	};

	const resetAll = () => {
		formMethods.reset();
	};

	const cancel = () => {
		sheetApi.close();
	};

	return {
		formMethods,
		onSubmit,
		onSheetIndexChangeFocusTextInput,
		resetAll,
		eventNameTextInputApi,
		cancel
	};
};

export default useCreateEventBottomSheet;

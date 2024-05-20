import { useHostAppContext } from '@arch/Application/contexts/Host.context';
import { venueApiSlice } from '@flux/api/venue';
import { CreateVenueBodyDto } from '@flux/api/venue/dto/venue-create.dto';
import { SheetApi, TextInputApi, useButton, useTextInput } from '@hooks';
import { ButtonState } from '@molecules';
import { OnSubmitHandler } from '@types';
import {
	SubmitErrorHandler,
	SubmitHandler,
	UseFormReturn,
	useForm
} from 'react-hook-form';

interface IUseCreateVenueBottomSheet {
	formMethods: UseFormReturn<CreateVenueBodyDto>;
	onChange: () => void;
	onDismiss: () => void;
	onSubmit: OnSubmitHandler;
	cancel: () => void;
	textInputApi: TextInputApi;
	createVenueButtonState: ButtonState;
	setVenueName: (text: string) => void;
}

const useCreateVenueBottomSheet = (
	sheetApi: SheetApi
): IUseCreateVenueBottomSheet => {
	const { hostData } = useHostAppContext();
	const [createVenueMutation] = venueApiSlice.useCreateMutation();
	const textInputApi = useTextInput();
	const { buttonState: createVenueButtonState, setButtonState } =
		useButton('disabled');

	const formMethods = useForm<CreateVenueBodyDto>({
		defaultValues: {
			name: '',
			host_id: hostData.host_id
		}
	});

	const onValid: SubmitHandler<CreateVenueBodyDto> = async (
		data: CreateVenueBodyDto
	) => {
		await createVenueMutation({ body: data });
		sheetApi.close();
	};

	const onInvalid: SubmitErrorHandler<CreateVenueBodyDto> = (errors: any) => {
		console.log(errors);
	};

	const onSubmit = formMethods.handleSubmit(onValid, onInvalid);

	const setVenueName = (text: string) => {
		formMethods.setValue('name', text);
		if (text.length > 0 && createVenueButtonState !== 'default') {
			setButtonState('default');
		} else if (text.length === 0 && createVenueButtonState !== 'disabled') {
			setButtonState('disabled');
		}
	};

	const onDismiss = () => {
		setButtonState('disabled');
		setVenueName('');
	};

	const onChange = () => {
		textInputApi.focus();
	};

	const cancel = () => {
		sheetApi.close();
	};

	return {
		formMethods,
		onChange,
		onDismiss,
		onSubmit,
		cancel,
		textInputApi,
		createVenueButtonState,
		setVenueName
	};
};

export default useCreateVenueBottomSheet;

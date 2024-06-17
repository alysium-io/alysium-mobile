import { useHostAppContext } from '@arch/Application/contexts/Host.context';
import { venueApiSlice } from '@flux/api/venue';
import { CreateVenueBodyDto } from '@flux/api/venue/dto/venue-create.dto';
import { SheetApi, TextInputApi, useTextInput } from '@hooks';
import { OnSubmitHandler } from '@types';
import {
	SubmitErrorHandler,
	SubmitHandler,
	UseFormReturn,
	useForm
} from 'react-hook-form';

interface IUseCreateVenueBottomSheet {
	formMethods: UseFormReturn<CreateVenueBodyDto>;
	onSubmit: OnSubmitHandler;
	cancel: () => void;
	venueNameTextInputApi: TextInputApi;
	resetAll: () => void;
	onSheetIndexChangeFocusTextInput: (index: number) => void;
}

const useCreateVenueBottomSheet = (
	sheetApi: SheetApi
): IUseCreateVenueBottomSheet => {
	const { hostData } = useHostAppContext();
	const [createVenueMutation] = venueApiSlice.useCreateMutation();
	const venueNameTextInputApi = useTextInput();

	const formMethods = useForm<CreateVenueBodyDto>({
		defaultValues: {
			name: '',
			host_uid: hostData.host_uid
		}
	});

	const onValid: SubmitHandler<CreateVenueBodyDto> = async (
		data: CreateVenueBodyDto
	) => {
		createVenueMutation({ body: data });
		sheetApi.close();
	};

	const onInvalid: SubmitErrorHandler<CreateVenueBodyDto> = (errors: any) => {
		console.log(errors);
	};

	const onSubmit = formMethods.handleSubmit(onValid, onInvalid);

	const resetAll = () => {
		venueNameTextInputApi.reset();
		formMethods.reset();
	};

	const cancel = () => {
		sheetApi.close();
	};

	const onSheetIndexChangeFocusTextInput = (index: number) => {
		if (index === 0) {
			venueNameTextInputApi.focus();
		}
	};

	return {
		formMethods,
		resetAll,
		onSubmit,
		cancel,
		venueNameTextInputApi,
		onSheetIndexChangeFocusTextInput
	};
};

export default useCreateVenueBottomSheet;

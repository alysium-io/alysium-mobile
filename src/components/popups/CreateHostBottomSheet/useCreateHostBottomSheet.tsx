import { hostApiSlice } from '@flux/api/host';
import { CreateHostBodyDto } from '@flux/api/host/dto/host-create.dto';
import { SheetApi, TextInputApi, useTextInput } from '@hooks';
import { OnSubmitHandler } from '@types';
import {
	SubmitErrorHandler,
	SubmitHandler,
	UseFormReturn,
	useForm
} from 'react-hook-form';

interface IUseCreateHostBottomSheet {
	hostNameTextInputApi: TextInputApi;
	onSheetIndexChangeFocusTextInput: (index: number) => void;
	resetAll: () => void;
	formMethods: UseFormReturn<CreateHostBodyDto>;
	onSubmit: OnSubmitHandler;
	cancel: () => void;
}

const useCreateHostBottomSheet = (
	sheetApi: SheetApi
): IUseCreateHostBottomSheet => {
	const hostNameTextInputApi = useTextInput();
	const [createHostMutation] = hostApiSlice.useCreateMutation();

	const formMethods = useForm<CreateHostBodyDto>({
		defaultValues: {
			name: ''
		}
	});

	const onValid: SubmitHandler<CreateHostBodyDto> = async (
		data: CreateHostBodyDto
	) => {
		createHostMutation({ body: data });
		sheetApi.close();
	};

	const onInvalid: SubmitErrorHandler<CreateHostBodyDto> = (errors: any) => {
		console.log(errors);
	};

	const onSubmit = formMethods.handleSubmit(onValid, onInvalid);

	const onSheetIndexChangeFocusTextInput = (index: number) => {
		if (index === 0) {
			hostNameTextInputApi.focus();
		}
	};

	const resetAll = () => {
		hostNameTextInputApi.reset();
		formMethods.reset();
	};

	const cancel = () => {
		sheetApi.close();
	};

	return {
		hostNameTextInputApi,
		onSheetIndexChangeFocusTextInput,
		resetAll,
		formMethods,
		onSubmit,
		cancel
	};
};

export default useCreateHostBottomSheet;

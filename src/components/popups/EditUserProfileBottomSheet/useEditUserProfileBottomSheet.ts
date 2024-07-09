import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { UpdateUserBodyDto } from '@flux/api/user/dto/user-update.dto';
import { SheetApi, TextInputApi, useTextInput } from '@hooks';
import { OnSubmitHandler } from '@types';
import {
	SubmitErrorHandler,
	SubmitHandler,
	UseFormReturn,
	useForm
} from 'react-hook-form';

interface IUseEditUserProfileBottomSheet {
	formMethods: UseFormReturn<UpdateUserBodyDto>;
	onSubmit: OnSubmitHandler;
	resetAll: () => void;
	cancel: () => void;
	handleTextInputApi: TextInputApi;
}

const useEditUserProfileBottomSheet = (
	sheetApi: SheetApi
): IUseEditUserProfileBottomSheet => {
	const handleTextInputApi = useTextInput();
	const { userData } = useUserAppContext();

	const formMethods = useForm<UpdateUserBodyDto>({
		defaultValues: {
			name: undefined,
			handle: userData.handle
		}
	});

	const onValid: SubmitHandler<UpdateUserBodyDto> = async (
		data: UpdateUserBodyDto
	) => {
		// createArtistMutation({ body: data });
		console.log(data);
		sheetApi.close();
	};

	const onInvalid: SubmitErrorHandler<UpdateUserBodyDto> = (errors: any) => {
		console.log(errors);
	};

	const onSubmit = formMethods.handleSubmit(onValid, onInvalid);

	const resetAll = () => {
		handleTextInputApi.reset();
		formMethods.reset();
	};

	const cancel = () => {
		sheetApi.close();
	};

	return {
		formMethods,
		onSubmit,
		resetAll,
		cancel,
		handleTextInputApi
	};
};

export default useEditUserProfileBottomSheet;

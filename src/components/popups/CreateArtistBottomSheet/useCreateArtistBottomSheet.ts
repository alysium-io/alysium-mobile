import { artistApiSlice } from '@flux/api/artist';
import { CreateArtistBodyDto } from '@flux/api/artist/dto/artist-create.dto';
import { SheetApi, TextInputApi, useTextInput } from '@hooks';
import { OnSubmitHandler } from '@types';
import {
	SubmitErrorHandler,
	SubmitHandler,
	UseFormReturn,
	useForm
} from 'react-hook-form';

interface IUseCreateArtistBottomSheet {
	artistNameTextInputApi: TextInputApi;
	onSheetIndexChangeFocusTextInput: (index: number) => void;
	resetAll: () => void;
	formMethods: UseFormReturn<CreateArtistBodyDto>;
	onSubmit: OnSubmitHandler;
	cancel: () => void;
}

const useCreateArtistBottomSheet = (
	sheetApi: SheetApi
): IUseCreateArtistBottomSheet => {
	const artistNameTextInputApi = useTextInput();
	const [createArtistMutation] = artistApiSlice.useCreateMutation();

	const formMethods = useForm<CreateArtistBodyDto>({
		defaultValues: {
			name: ''
		}
	});

	const onValid: SubmitHandler<CreateArtistBodyDto> = async (
		data: CreateArtistBodyDto
	) => {
		createArtistMutation({ body: data });
		sheetApi.close();
	};

	const onInvalid: SubmitErrorHandler<CreateArtistBodyDto> = (errors: any) => {
		console.log(errors);
	};

	const onSubmit = formMethods.handleSubmit(onValid, onInvalid);

	const onSheetIndexChangeFocusTextInput = (index: number) => {
		if (index === 0) {
			artistNameTextInputApi.focus();
		}
	};

	const resetAll = () => {
		artistNameTextInputApi.reset();
		formMethods.reset();
	};

	const cancel = () => {
		sheetApi.close();
	};

	return {
		artistNameTextInputApi,
		onSheetIndexChangeFocusTextInput,
		resetAll,
		formMethods,
		onSubmit,
		cancel
	};
};

export default useCreateArtistBottomSheet;

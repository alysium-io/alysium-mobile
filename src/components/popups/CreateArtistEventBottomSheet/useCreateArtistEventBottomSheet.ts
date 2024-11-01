import { SheetApi, TextInputApi, useTextInput } from '@hooks';
import { ButtonStateApi, useButtonState } from '@molecules';
import useCreateArtistEventFormApi, {
	CreateArtistEventFormApi
} from '@src/utils/redux-hook-form/useCreateArtistEventFormApi';
import { useEffect } from 'react';

interface IuseCreateArtistEventBottomSheet {
	close: () => void;
	onSheetIndexChangeFocusTextInput: (index: number) => void;
	eventNameTextInputApi: TextInputApi;
	createArtistEventFormApi: CreateArtistEventFormApi;
	createArtistEventButtonStateApi: ButtonStateApi;
}

const useCreateArtistEventBottomSheet = (
	sheetApi: SheetApi
): IuseCreateArtistEventBottomSheet => {
	const eventNameTextInputApi = useTextInput();
	const createArtistEventButtonStateApi = useButtonState('disabled');
	const createArtistEventFormApi = useCreateArtistEventFormApi({
		methods: {
			onValidDidComplete: () => {
				close();
			}
		}
	});

	useEffect(() => {
		if (createArtistEventFormApi.formMethods.getValues('name').length > 0) {
			createArtistEventButtonStateApi.setButtonState('active');
		} else {
			createArtistEventButtonStateApi.setButtonState('disabled');
		}
	}, [createArtistEventFormApi.formMethods.watch('name')]);

	const onSheetIndexChangeFocusTextInput = (index: number) => {
		if (index === 0) {
			eventNameTextInputApi.focus();
		}
	};

	const close = () => {
		sheetApi.close();
	};

	return {
		close,
		onSheetIndexChangeFocusTextInput,
		eventNameTextInputApi,
		createArtistEventFormApi,
		createArtistEventButtonStateApi
	};
};

export default useCreateArtistEventBottomSheet;

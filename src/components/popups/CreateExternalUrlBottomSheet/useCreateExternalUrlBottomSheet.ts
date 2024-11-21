import { ExternalUrlRefType } from '@flux/api/external-url/types';
import { SheetApi, TextInputApi, useTextInput } from '@hooks';
import { ButtonStateApi, useButtonState } from '@molecules';
import useCreateExternalUrlFormApi, {
	CreateExternalUrlFormApi
} from '@src/utils/redux-hook-form/useCreateExternalUrlFormApi';
import { NanoId } from '@types';
import { useEffect } from 'react';

interface IUseCreateExternalUrlBottomSheet {
	createExternalUrlFormApi: CreateExternalUrlFormApi;
	resetAll: () => void;
	close: () => void;
	saveButtonStateApi: ButtonStateApi;
	nameTextInputApi: TextInputApi;
}

const useCreateExternalUrlBottomSheet = (
	sheetApi: SheetApi,
	refType: ExternalUrlRefType,
	refId: NanoId
): IUseCreateExternalUrlBottomSheet => {
	const nameTextInputApi = useTextInput();
	const saveButtonStateApi = useButtonState('disabled');

	const createExternalUrlFormApi = useCreateExternalUrlFormApi({
		initialValues: {
			refType,
			refId
		},
		methods: {
			onConfirmedValid: () => {
				saveButtonStateApi.setButtonState('loading');
			},
			onValidDidComplete: () => {
				close();
			}
		}
	});

	useEffect(() => {
		saveButtonStateApi.setButtonState(
			createExternalUrlFormApi.formMethods.formState.isValid
				? 'active'
				: 'disabled'
		);
	}, [createExternalUrlFormApi.formMethods.formState.isValid]);

	const resetAll = () => {
		createExternalUrlFormApi.formMethods.reset();
		saveButtonStateApi.reset();
	};

	const close = () => {
		resetAll();
		sheetApi.close();
	};

	return {
		nameTextInputApi,
		createExternalUrlFormApi,
		resetAll,
		close,
		saveButtonStateApi
	};
};

export default useCreateExternalUrlBottomSheet;

import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { capitalizeFirstLetter } from '@etc';
import { SheetApi, useToast } from '@hooks';
import useUpdateUserProfileFormApi, {
	UpdateUserProfileFormApi
} from '@src/utils/redux-hook-form/useUpdateUserProfileFormApi';

interface IUseEditUserProfileBottomSheet {
	updateUserProfileFormApi: UpdateUserProfileFormApi;
	resetAll: () => void;
	cancel: () => void;
}

const useEditUserProfileBottomSheet = (
	sheetApi: SheetApi
): IUseEditUserProfileBottomSheet => {
	const { toastSuccess, toastError } = useToast();
	const { userData } = useUserAppContext();

	const updateUserProfileFormApi = useUpdateUserProfileFormApi({
		initialValues: {
			handle: userData.handle
		},
		methods: {
			onValidDidComplete: () => {
				sheetApi.close();
				toastSuccess('Your profile has been updated');
			},
			onValidDidFail: (error) => {
				if (error?.data?.error === 'UNIQUE_CONSTRAINT_EXCEPTION') {
					const key = error.data.uniqueExceptionDetails.key || 'Unknown';
					toastError(`${capitalizeFirstLetter(key)} already exists 😭`);
				} else {
					toastError('Something went wrong 💔');
				}
			}
		}
	});

	const resetAll = () => {
		updateUserProfileFormApi.formMethods.reset();
	};

	const cancel = () => {
		updateUserProfileFormApi.formMethods.reset();
		sheetApi.close();
	};

	return {
		updateUserProfileFormApi,
		resetAll,
		cancel
	};
};

export default useEditUserProfileBottomSheet;

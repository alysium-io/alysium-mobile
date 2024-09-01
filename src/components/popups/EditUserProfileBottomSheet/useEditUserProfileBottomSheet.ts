import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { capitalizeFirstLetter } from '@etc';
import { userApiSlice } from '@flux/api/user';
import { UpdateUserBodyDto } from '@flux/api/user/dto/user-update.dto';
import { SheetApi } from '@hooks';
import { OnSubmitHandler } from '@types';
import {
	SubmitErrorHandler,
	SubmitHandler,
	UseFormReturn,
	useForm
} from 'react-hook-form';
import Toast from 'react-native-toast-message';

interface IUseEditUserProfileBottomSheet {
	formMethods: UseFormReturn<UpdateUserBodyDto>;
	onSubmit: OnSubmitHandler;
	resetAll: () => void;
	cancel: () => void;
}

const useEditUserProfileBottomSheet = (
	sheetApi: SheetApi
): IUseEditUserProfileBottomSheet => {
	const { userData } = useUserAppContext();
	const [updateUserMutation] = userApiSlice.useUpdateMutation();

	const formMethods = useForm<UpdateUserBodyDto>({
		defaultValues: {
			name: userData.name,
			handle: userData.handle,
			email: userData.email
		}
	});

	const onValid: SubmitHandler<UpdateUserBodyDto> = async (
		data: UpdateUserBodyDto
	) => {
		try {
			await updateUserMutation({
				body: {
					...data,
					handle: data.handle || userData.handle,
					name: data.name || userData.name,
					email: data.email || userData.email
				}
			}).unwrap();
			sheetApi.close();
			Toast.show({
				type: 'info',
				text1: 'Saved!',
				text2: 'Your profile has been updated'
			});
		} catch (error: any) {
			if (error?.data?.error === 'UNIQUE_CONSTRAINT_EXCEPTION') {
				const key = error.data.uniqueExceptionDetails.key || 'Unknown';
				Toast.show({
					type: 'error',
					text1: 'Error',
					text2: `${capitalizeFirstLetter(key)} already exists 😭`
				});
			} else {
				Toast.show({
					type: 'error',
					text1: 'Error',
					text2: 'Something went wrong 💔'
				});
			}
		}
	};

	const onInvalid: SubmitErrorHandler<UpdateUserBodyDto> = (errors: any) => {
		Toast.show({
			type: 'error',
			text1: 'Error',
			text2: errors[Object.keys(errors)[0]].message
		});
	};

	const onSubmit = formMethods.handleSubmit(onValid, onInvalid);

	const resetAll = () => {
		formMethods.reset();
	};

	const cancel = () => {
		formMethods.reset();
		sheetApi.close();
	};

	return {
		formMethods,
		onSubmit,
		resetAll,
		cancel
	};
};

export default useEditUserProfileBottomSheet;

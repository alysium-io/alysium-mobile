import { userApiSlice } from '@flux/api/user';
import {
	UpdateUserBodyDto,
	UpdateUserResponseDto
} from '@flux/api/user/dto/user-update.dto';
import { useForm, useToast } from '@hooks';
import { FormApiOptions, ReduxFormMethods } from './shared';

export interface UpdateUserProfileFormApi
	extends ReduxFormMethods<UpdateUserBodyDto> {}

const useUpdateUserProfileFormApi = (
	formApiOptions?: FormApiOptions<UpdateUserBodyDto, UpdateUserResponseDto>
): UpdateUserProfileFormApi => {
	const { toastError } = useToast();
	const [updateUserMutation] = userApiSlice.useUpdateUserMutation();

	return useForm<UpdateUserBodyDto>(
		Object.assign(
			{
				handle: ''
			},
			formApiOptions?.initialValues
		),
		{
			onValid: async (data: UpdateUserBodyDto) => {
				formApiOptions?.methods?.onConfirmedValid?.(data);
				console.log({
					...data,
					handle: data.handle || formApiOptions?.initialValues?.handle || ''
				});
				updateUserMutation({
					body: {
						...data,
						handle: data.handle || formApiOptions?.initialValues?.handle || ''
					}
				})
					.unwrap()
					.then((res) => {
						formApiOptions?.methods?.onValidDidComplete?.(res);
					})
					.catch((err) => {
						formApiOptions?.methods?.onValidDidFail?.(err) && toastError();
					});
			}
		}
	);
};

export default useUpdateUserProfileFormApi;

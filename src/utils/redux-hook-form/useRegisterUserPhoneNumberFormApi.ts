import { Formatting } from '@etc';
import { userApiSlice } from '@flux/api/user';
import { CreateUserResponseDto } from '@flux/api/user/dto/user-create.dto';
import { RegisterUserPhoneNumberBodyDto } from '@flux/api/user/dto/user-register-phone.dto';
import { useForm, useToast } from '@hooks';
import { FormApiOptions, ReduxFormMethods } from './shared';

export interface RegisterUserPhoneNumberFormApi
	extends ReduxFormMethods<RegisterUserPhoneNumberBodyDto> {}

const useRegisterUserPhoneNumberFormApi = (
	formApiOptions?: FormApiOptions<
		RegisterUserPhoneNumberBodyDto,
		CreateUserResponseDto
	>
): RegisterUserPhoneNumberFormApi => {
	const { toastError } = useToast();
	const [registerPhoneNumberQuery] =
		userApiSlice.useLazyRegisterUserPhoneNumberQuery();

	return useForm<RegisterUserPhoneNumberBodyDto>(
		Object.assign(
			{
				phone_number: ''
			},
			formApiOptions?.initialValues
		),
		{
			onValid: async (data: RegisterUserPhoneNumberBodyDto) => {
				formApiOptions?.methods?.onConfirmedValid?.(data);
				data.phone_number = Formatting.preparePhoneNumberForApi(
					data.phone_number
				);
				registerPhoneNumberQuery({ body: data })
					.unwrap()
					.then((response) => {
						formApiOptions?.methods?.onValidDidComplete?.(response);
					})
					.catch((error) => {
						formApiOptions?.methods?.onValidDidFail?.(error);
						toastError();
					});
			}
		}
	);
};

export default useRegisterUserPhoneNumberFormApi;

import { Formatting } from '@etc';
import { userApiSlice } from '@flux/api/user';
import { LoginUserPhoneNumberBodyDto } from '@flux/api/user/dto/user-login-phone.dto';
import { LoginResponseDto } from '@flux/api/user/dto/user-login.dto';
import { useForm, useToast } from '@hooks';
import { FormApiOptions, ReduxFormMethods } from './shared';

export interface LoginUserPhoneNumberFormApi
	extends ReduxFormMethods<LoginUserPhoneNumberBodyDto> {}

const useLoginUserPhoneNumberFormApi = (
	formApiOptions?: FormApiOptions<LoginUserPhoneNumberBodyDto, LoginResponseDto>
): LoginUserPhoneNumberFormApi => {
	const { toastError } = useToast();
	const [loginPhoneNumberQuery] =
		userApiSlice.useLazyLoginUserPhoneNumberQuery();

	return useForm<LoginUserPhoneNumberBodyDto>(
		Object.assign(
			{
				phone_number: '',
				passcode: ''
			},
			formApiOptions?.initialValues
		),
		{
			onValid: async (data: LoginUserPhoneNumberBodyDto) => {
				formApiOptions?.methods?.onConfirmedValid?.(data);
				data.phone_number = Formatting.preparePhoneNumberForApi(
					data.phone_number
				);
				loginPhoneNumberQuery({ body: data })
					.unwrap()
					.then((res) => {
						formApiOptions?.methods?.onValidDidComplete?.(res);
					})
					.catch((err) => {
						formApiOptions?.methods?.onValidDidFail?.(err);
						toastError();
					});
			}
		}
	);
};

export default useLoginUserPhoneNumberFormApi;

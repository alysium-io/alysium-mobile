import { externalUrlApiSlice } from '@flux/api/external-url';
import {
	CreateExternalUrlBodyDto,
	CreateExternalUrlResponseDto
} from '@flux/api/external-url/dto/external-url-create.dto';
import { useForm, useToast } from '@hooks';
import { FormApiOptions, ReduxFormMethods } from './shared';

export interface CreateExternalUrlFormApi
	extends ReduxFormMethods<CreateExternalUrlBodyDto> {}

const useCreateExternalUrlFormApi = (
	formApiOptions?: FormApiOptions<
		CreateExternalUrlBodyDto,
		CreateExternalUrlResponseDto
	>
): CreateExternalUrlFormApi => {
	const { toastError } = useToast();
	const [createExternalUrlMutation] =
		externalUrlApiSlice.useCreateExternalUrlMutation();

	return useForm<CreateExternalUrlBodyDto>(
		Object.assign(
			{
				name: '',
				url: ''
			},
			formApiOptions?.initialValues
		),
		{
			onValid: async (data: CreateExternalUrlBodyDto) => {
				formApiOptions?.methods?.onConfirmedValid?.(data);
				createExternalUrlMutation({ body: data })
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

export default useCreateExternalUrlFormApi;

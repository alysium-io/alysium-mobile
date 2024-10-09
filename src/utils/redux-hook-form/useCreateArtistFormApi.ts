import { artistApiSlice } from '@flux/api/artist';
import {
	CreateArtistBodyDto,
	CreateArtistResponseDto
} from '@flux/api/artist/dto/artist-create.dto';
import { useForm, useToast } from '@hooks';
import { FormApiOptions, ReduxFormMethods } from './shared';

export interface CreateArtistFormApi
	extends ReduxFormMethods<CreateArtistBodyDto> {
	isLoading: boolean;
	error: any;
	isSuccess: boolean;
	reset: () => void;
	data: CreateArtistResponseDto | undefined;
}

const useCreateArtistFormApi = (
	formApiOptions?: FormApiOptions<CreateArtistBodyDto, CreateArtistResponseDto>
): CreateArtistFormApi => {
	const { toastError } = useToast();
	const [createArtistMutation, { isLoading, error, isSuccess, reset, data }] =
		artistApiSlice.useCreateArtistMutation();

	const formApi = useForm<CreateArtistBodyDto>(
		Object.assign(
			{
				name: ''
			},
			formApiOptions?.initialValues
		),
		{
			onValid: async (data: CreateArtistBodyDto) => {
				formApiOptions?.methods?.onConfirmedValid?.(data);
				createArtistMutation({ body: data })
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

	return {
		...formApi,
		isLoading,
		error,
		isSuccess,
		reset,
		data
	};
};

export default useCreateArtistFormApi;

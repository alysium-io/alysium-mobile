import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { artistEventApiSlice } from '@flux/api/event';
import {
	CreateArtistEventBodyDto,
	CreateArtistEventResponseDto
} from '@flux/api/event/dto/artist-event-create.dto';
import { useForm, useToast } from '@hooks';
import { FormApiOptions, ReduxFormMethods } from './shared';

export interface CreateArtistEventFormApi
	extends ReduxFormMethods<CreateArtistEventBodyDto> {}

const useCreateArtistEventFormApi = (
	formApiOptions?: FormApiOptions<
		CreateArtistEventBodyDto,
		CreateArtistEventResponseDto
	>
): CreateArtistEventFormApi => {
	const { toastError } = useToast();
	const [createArtistEventMutation] =
		artistEventApiSlice.useCreateArtistEventMutation();
	const { artistData } = useArtistAppContext();

	return useForm<CreateArtistEventBodyDto>(
		Object.assign(
			{
				name: ''
			},
			formApiOptions?.initialValues
		),
		{
			onValid: async (data: CreateArtistEventBodyDto) => {
				formApiOptions?.methods?.onConfirmedValid?.(data);
				createArtistEventMutation({
					params: {
						artist_uid: artistData.artist_uid
					},
					body: data
				})
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

export default useCreateArtistEventFormApi;

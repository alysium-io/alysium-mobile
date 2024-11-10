import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { artistEventApiSlice } from '@flux/api/event';
import {
	UpdateArtistEventBodyDto,
	UpdateArtistEventResponseDto
} from '@flux/api/event/dto/artist-event-update.dto';
import { EventStatus } from '@flux/api/event/types';
import { useForm, useToast } from '@hooks';
import { NanoId } from '@types';
import { FormApiOptions, ReduxFormMethods } from './shared';

export interface UpdateArtistEventFormApi
	extends ReduxFormMethods<UpdateArtistEventBodyDto> {}

const useUpdateArtistEventFormApi = (
	event_uid: NanoId,
	formApiOptions?: FormApiOptions<
		UpdateArtistEventBodyDto,
		UpdateArtistEventResponseDto
	>
): UpdateArtistEventFormApi => {
	const { toastError } = useToast();
	const [updateArtistEventMutation] =
		artistEventApiSlice.useUpdateArtistEventMutation();
	const { artistData } = useArtistAppContext();

	return useForm<UpdateArtistEventBodyDto>(
		Object.assign(
			{
				name: '',
				about: null,
				start_time: null,
				end_time: null,
				status: EventStatus.draft
			},
			formApiOptions?.initialValues
		),
		{
			onValid: async (data: UpdateArtistEventBodyDto) => {
				formApiOptions?.methods?.onConfirmedValid?.(data);
				updateArtistEventMutation({
					params: {
						event_uid,
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

export default useUpdateArtistEventFormApi;

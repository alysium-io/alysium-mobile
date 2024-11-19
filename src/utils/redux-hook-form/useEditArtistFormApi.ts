import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Formatting } from '@etc';
import { artistApiSlice } from '@flux/api/artist';
import {
	UpdateArtistBodyDto,
	UpdateArtistResponseDto
} from '@flux/api/artist/dto/artist-update.dto';
import { useForm } from '@hooks';
import { FormApiOptions, ReduxFormMethods } from './shared';

export interface EditArtistFormApi
	extends ReduxFormMethods<UpdateArtistBodyDto> {}

const useEditArtistFormApi = (
	formApiOptions?: FormApiOptions<UpdateArtistBodyDto, UpdateArtistResponseDto>
): EditArtistFormApi => {
	const [updateArtistMutation] = artistApiSlice.useUpdateArtistMutation();
	const { artistData } = useArtistAppContext();

	return useForm<UpdateArtistBodyDto>(
		Object.assign(
			{
				name: '',
				phone_number: null,
				bio: null
			},
			formApiOptions?.initialValues
		),
		{
			onValid: async (data: UpdateArtistBodyDto) => {
				formApiOptions?.methods?.onConfirmedValid?.(data);
				if (data.phone_number === '') {
					data.phone_number = null;
				} else if (data.phone_number !== null) {
					data.phone_number = Formatting.preparePhoneNumberForApi(
						data.phone_number
					);
				}

				updateArtistMutation({
					body: data,
					params: { artist_uid: artistData.artist_uid }
				})
					.unwrap()
					.then((res) => {
						formApiOptions?.methods?.onValidDidComplete?.(res);
					})
					.catch((err) => {
						formApiOptions?.methods?.onValidDidFail?.(err);
					});
			},
			...formApiOptions?.methods
		}
	);
};

export default useEditArtistFormApi;

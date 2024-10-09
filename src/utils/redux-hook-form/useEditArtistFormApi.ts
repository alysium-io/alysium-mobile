import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { artistApiSlice } from '@flux/api/artist';
import { CreateArtistBodyDto } from '@flux/api/artist/dto/artist-create.dto';
import {
	UpdateArtistBodyDto,
	UpdateArtistResponseDto
} from '@flux/api/artist/dto/artist-update.dto';
import { useForm, useToast } from '@hooks';
import { FormApiOptions, ReduxFormMethods } from './shared';

export interface EditArtistFormApi
	extends ReduxFormMethods<CreateArtistBodyDto> {}

const useEditArtistFormApi = (
	formApiOptions?: FormApiOptions<UpdateArtistBodyDto, UpdateArtistResponseDto>
): EditArtistFormApi => {
	const { toastError } = useToast();
	const [updateArtistMutation] = artistApiSlice.useUpdateArtistMutation();
	const { artistData } = useArtistAppContext();

	return useForm<UpdateArtistBodyDto>(
		Object.assign(
			{
				name: ''
			},
			formApiOptions?.initialValues
		),
		{
			onValid: async (data: UpdateArtistBodyDto) => {
				formApiOptions?.methods?.onConfirmedValid?.(data);
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
						toastError();
					});
			}
		}
	);
};

export default useEditArtistFormApi;

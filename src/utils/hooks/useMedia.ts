import { mediaApiSlice } from '@flux/api/media';
import { CreateMediaBodyDto } from '@flux/api/media/dto/media-create.dto';
import { Asset } from 'react-native-image-picker';

interface IUseMedia {
	uploadMedia: (createMediaBodyDto: CreateMediaBodyDto, file: Asset) => void;
}

const useMedia = (): IUseMedia => {
	const [createMediaMutation] = mediaApiSlice.useCreateMutation();

	const uploadMedia = async (
		createMediaBodyDto: CreateMediaBodyDto,
		file: Asset
	) => {
		if (file.uri && file.type && file.fileName) {
			await createMediaMutation({
				body: createMediaBodyDto,
				file
			});
		} else {
			console.error(
				'Error in uploadMedia: file is missing required fields: ',
				file
			);
		}
	};

	return {
		uploadMedia
	};
};

export default useMedia;

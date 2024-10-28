import { Image, Multimedia } from '@flux/api/media';
import { MediaType } from '@flux/api/media/types';

interface IUseMultimedia {
	getImage: (multimedia?: Multimedia) => Image | null | undefined;
}

const useMultimedia = (): IUseMultimedia => {
	const getImage = (multimedia?: Multimedia): Image | null | undefined => {
		if (!multimedia) {
			return undefined;
		}

		if (multimedia.media_type === MediaType.image) {
			return multimedia.image;
		}

		if (multimedia.media_type === MediaType.video) {
			return multimedia.video?.thumbnail;
		}

		return null;
	};

	return {
		getImage
	};
};

export default useMultimedia;

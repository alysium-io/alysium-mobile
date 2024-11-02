import { Image } from '@flux/api/media/image.entity';
import { useEffect, useRef, useState } from 'react';
import { Image as RNImage } from 'react-native';
import { runOnJS } from 'react-native-reanimated';
import useImage from './useImage';

interface ImagePriorityApi {
	currentUrl: string | undefined;
}

const useImagePriority = (image?: Image | null): ImagePriorityApi => {
	const currentLoadedIndex = useRef<number>(-1);
	const [currentUrl, setCurrentUrl] = useState<string | undefined>(undefined);
	const { urlForKey } = useImage();

	useEffect(() => {
		if (image) {
			currentLoadedIndex.current = -1;
			const imageUris = [
				urlForKey(image.small.key),
				urlForKey(image.medium.key),
				urlForKey(image.large.key)
			];
			for (let i = 0; i < imageUris.length; i++) {
				const imageUri = imageUris[i];
				if (imageUri !== undefined && imageUri !== '') {
					prefetchImage(i, imageUri);
				}
			}
		}
	}, [image]);

	const prefetchImage = (index: number, uri: string) => {
		RNImage.prefetch(uri).then(() => {
			runOnJS(onImageLoaded)(index, uri);
		});
	};

	const onImageLoaded = (index: number, imageUri: string) => {
		if (index > currentLoadedIndex.current) {
			currentLoadedIndex.current = index;
			setCurrentUrl(imageUri);
		}
	};

	return {
		currentUrl
	};
};

export default useImagePriority;

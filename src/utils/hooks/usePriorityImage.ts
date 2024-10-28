import { useEffect, useRef, useState } from 'react';
import { Image } from 'react-native';
import { runOnJS } from 'react-native-reanimated';

interface PriorityImageApi {
	currentUrl: string | undefined;
}

const usePriorityImage = (
	imageUris: Array<string | undefined>
): PriorityImageApi => {
	const currentLoadedIndex = useRef<number>(-1);
	const [currentUrl, setCurrentUrl] = useState<string | undefined>(undefined);

	useEffect(() => {
		if (imageUris.length > 0) {
			for (let i = 0; i < imageUris.length; i++) {
				const imageUri = imageUris[i];
				if (imageUri !== undefined && imageUri !== '') {
					prefetchImage(i, imageUri);
				}
			}
		}
	}, [imageUris]);

	const prefetchImage = (index: number, uri: string) => {
		Image.prefetch(uri).then(() => {
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

export default usePriorityImage;

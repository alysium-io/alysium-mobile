import { LayoutRectangle } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

interface IUsePosterLayout {
	PROFILE_IMAGE_SIZE: number;
	PROFILE_IMAGE_CONTAINER_SIZE: number;
	BANNER_HEIGHT: number;
	insets: EdgeInsets;
}

const usePosterLayout = (dimensions: LayoutRectangle): IUsePosterLayout => {
	const insets = useSafeAreaInsets();
	const PROFILE_IMAGE_SIZE = dimensions.width * 0.15;
	const PROFILE_IMAGE_CONTAINER_SIZE = PROFILE_IMAGE_SIZE + 11;

	const BANNER_HEIGHT = dimensions.height * 0.37;
	return {
		PROFILE_IMAGE_SIZE,
		PROFILE_IMAGE_CONTAINER_SIZE,
		BANNER_HEIGHT,
		insets
	};
};

export default usePosterLayout;

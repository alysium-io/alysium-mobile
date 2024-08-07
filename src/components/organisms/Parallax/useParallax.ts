import { useWindowDimensions } from 'react-native';

interface IUseParallax {
	bannerImageHeight: number;
}

const useParallax = (): IUseParallax => {
	const { height: SCREEN_HEIGHT } = useWindowDimensions();
	const bannerImageHeight = SCREEN_HEIGHT * 0.3;

	return {
		bannerImageHeight
	};
};

export default useParallax;

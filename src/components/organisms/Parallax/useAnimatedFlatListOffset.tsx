import {
	useAnimatedScrollHandler,
	useSharedValue
} from 'react-native-reanimated';

const useAnimatedFlatListOffset = () => {
	const offset = useSharedValue(0);
	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			offset.value = event.contentOffset.y;
		}
	});
	return { offset, scrollHandler };
};

export default useAnimatedFlatListOffset;

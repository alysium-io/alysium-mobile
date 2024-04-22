import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { SharedValue, useSharedValue } from 'react-native-reanimated';

interface IUseScrollView {
	scrollY: SharedValue<number>;
	scrollEvent: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const useScrollView = (): IUseScrollView => {
	const scrollY = useSharedValue<number>(0);

	const scrollEvent = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		scrollY.value = event.nativeEvent.contentOffset.y;
	};

	return {
		scrollY,
		scrollEvent
	};
};

export default useScrollView;

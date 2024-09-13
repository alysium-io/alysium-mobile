import { useBottomTabHeight, useLayoutDimensions } from '@hooks';
import { RefObject, useRef } from 'react';
import { LayoutChangeEvent, View as RNView } from 'react-native';
import Animated, {
	interpolate,
	useAnimatedKeyboard,
	useAnimatedStyle
} from 'react-native-reanimated';

export interface SelfAwareScrollViewApi {
	scrollViewRef: RefObject<Animated.ScrollView>;
	onScrollViewLayout: (event: LayoutChangeEvent) => void;
	onPressScrollViewElement: (ref: RefObject<RNView>) => void;
	animatedBottomBlockStyle: ReturnType<typeof useAnimatedStyle>;
}

const useSelfAwareScrollView = (): SelfAwareScrollViewApi => {
	const { dimensions: scrollViewDimensions, onLayout: onScrollViewLayout } =
		useLayoutDimensions();
	const scrollViewRef = useRef<Animated.ScrollView>(null);
	const keyboard = useAnimatedKeyboard();
	const extraMargin = 25; // extra buffer space between the keyboard and the element being scrolled to
	const bottomTabHeight = useBottomTabHeight();

	const onPressScrollViewElement = (ref: RefObject<RNView>) => {
		setTimeout(() => {
			ref.current?.measure((x, y, width, height, pageX, pageY) => {
				scrollViewRef.current?.scrollTo({
					y:
						scrollViewDimensions.height -
						(scrollViewDimensions.height -
							y +
							(scrollViewDimensions.height - height)) +
						keyboard.height.value -
						bottomTabHeight +
						extraMargin,
					animated: true
				});
			});
		}, 300);
	};

	const animatedBottomBlockStyle = useAnimatedStyle(() => {
		return {
			height:
				keyboard.height.value +
				interpolate(keyboard.height.value, [0, 100], [0, extraMargin])
		};
	}, []);

	return {
		scrollViewRef,
		onScrollViewLayout,
		onPressScrollViewElement,
		animatedBottomBlockStyle
	};
};

export default useSelfAwareScrollView;

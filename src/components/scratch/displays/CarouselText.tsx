import { View } from '@atomic';
import { AnimatedText } from '@subatomic';
import React, { useEffect } from 'react';
import { LinearGradient } from 'react-native-linear-gradient';
import {
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withRepeat,
	withSequence,
	withTiming
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MaskedView from '@react-native-masked-view/masked-view';

const GradientText: React.FC<any> = (props) => {
	return (
		<MaskedView maskElement={<AnimatedText {...props} />}>
			<LinearGradient
				colors={['black', 'transparent']}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 0 }}
			>
				<AnimatedText
					{...props}
					style={[props.style, { opacity: 0 }]}
					numberOfLines={1}
				/>
			</LinearGradient>
		</MaskedView>
	);
};

const CarouselText = () => {
	const insets = useSafeAreaInsets();
	const translation = useSharedValue(0);

	// Start animation after 2 second delay
	useEffect(() => {
		translation.value = withDelay(
			2000,
			withRepeat(
				withSequence(
					// Translate left
					withTiming(-200, { duration: 8000 }),
					// Pause at end
					withTiming(-200, { duration: 1000 }),
					// Return to start
					withTiming(0, { duration: 8000 }),
					// Pause at start
					withTiming(0, { duration: 1000 })
				),
				-1
			)
		);
	}, []);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translation.value }]
	}));

	return (
		<View style={{ paddingTop: insets.top }}>
			<GradientText>
				Hello this is a really long text that should be displayed in a carousel
				and animate smoothly
			</GradientText>
		</View>
	);
};

export default CarouselText;

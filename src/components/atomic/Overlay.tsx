import { BlurView } from '@react-native-community/blur';
import React from 'react';
import { Dimensions, Modal, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	WithSpringConfig,
	withTiming,
	WithTimingConfig
} from 'react-native-reanimated';

const ANIMATION_DURATION = 200;
const SCALE_LOW_BOUND = 0.85;
const SCALE_HIGH_BOUND = 1;

const DEFAULT_SPRING_CONFIG: WithSpringConfig = {
	damping: 15,
	mass: 0.8,
	stiffness: 250,
	overshootClamping: false,
	restDisplacementThreshold: 0.01,
	restSpeedThreshold: 2
};

interface OverlayProps {
	visible: boolean;
	onClose?: () => void;
	children: React.ReactNode;
	animationConfig?: {
		timing?: WithTimingConfig;
		spring?: WithSpringConfig;
	};
	containerStyle?: ViewStyle;
	contentStyle?: ViewStyle;
	useContentBlurView?: boolean;
	blurAmount?: number;
	blurType?: 'dark' | 'light' | 'xlight';
}

const { width, height } = Dimensions.get('window');

const Overlay: React.FC<OverlayProps> = ({
	visible,
	onClose,
	children,
	animationConfig,
	containerStyle,
	contentStyle,
	useContentBlurView = false,
	blurAmount = 10,
	blurType = 'dark'
}) => {
	const [modalVisible, setModalVisible] = React.useState<boolean>(visible);
	const opacity = useSharedValue<number>(0);
	const scale = useSharedValue<number>(SCALE_LOW_BOUND);

	React.useEffect(() => {
		if (visible) {
			setModalVisible(true);
			opacity.value = withTiming(
				1,
				animationConfig?.timing ?? { duration: ANIMATION_DURATION }
			);
			scale.value = withSpring(
				SCALE_HIGH_BOUND,
				animationConfig?.spring ?? DEFAULT_SPRING_CONFIG
			);
		} else {
			opacity.value = withTiming(
				0,
				animationConfig?.timing ?? { duration: ANIMATION_DURATION },
				() => {
					runOnJS(setModalVisible)(false);
				}
			);
			scale.value = withSpring(
				SCALE_LOW_BOUND,
				animationConfig?.spring ?? DEFAULT_SPRING_CONFIG
			);
		}
	}, [visible]);

	const overlayStyle = useAnimatedStyle(() => ({
		opacity: opacity.value
	}));

	const contentAnimatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
		transform: [{ scale: scale.value }]
	}));

	const Background = useContentBlurView ? BlurView : Animated.View;
	const backgroundProps = useContentBlurView
		? {
				blurAmount,
				blurType,
				style: [styles.overlay, overlayStyle, containerStyle]
		  }
		: { style: [styles.overlay, overlayStyle, containerStyle] };

	return (
		<Modal
			transparent
			visible={modalVisible}
			onRequestClose={onClose}
			animationType='none'
		>
			<Background {...backgroundProps} onTouchEnd={onClose}>
				<Animated.View
					style={[contentAnimatedStyle, contentStyle]}
					onTouchEnd={(e) => e.stopPropagation()}
				>
					{children}
				</Animated.View>
			</Background>
		</Modal>
	);
};

const styles = StyleSheet.create({
	overlay: {
		width,
		height,
		backgroundColor: 'rgba(0,0,0,0.5)',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default Overlay;

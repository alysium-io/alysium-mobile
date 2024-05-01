import Animated, { withSpring, withTiming } from 'react-native-reanimated';

export type SpringConfig = Parameters<typeof withSpring>[1];
export type TimingConfig = Parameters<typeof withTiming>[1];

export type AnimatedViewEnteringProp = React.ComponentProps<
	typeof Animated.View
>['entering'];

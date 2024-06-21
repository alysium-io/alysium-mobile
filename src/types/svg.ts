import { AnimatedProps } from 'react-native-reanimated';
import {
	PathProps as RNPathProps,
	SvgProps as RNSvgProps
} from 'react-native-svg';

export type Inanimate = { animated?: false };
export type Animate = { animated: true };

/**
 * Extending Raw Svg
 */
export type BaseCustomSvgProps = {
	children?: React.ReactNode;
	size?: number | string;
	direction?: 'up' | 'down' | 'left' | 'right';
};
export type CustomSvgProps = RNSvgProps & Inanimate & BaseCustomSvgProps;

export type CustomAnimatedSvgProps = RNSvgProps &
	Animate &
	BaseCustomSvgProps & {
		animatedProps?: AnimatedProps<RNSvgProps>;
	};

/**
 * Extending Raw Path
 */
export type BaseCustomPathProps = {
	color?: string;
};
export type CustomPathProps = RNPathProps & Inanimate & BaseCustomPathProps;

export type CustomAnimatedPathProps = RNPathProps &
	Animate &
	BaseCustomPathProps & {
		animatedProps?: AnimatedProps<RNPathProps>;
	};

/**
 * Custom Svg Wrapper Props
 */
export type CustomSvgWrapperProps = CustomSvgProps &
	CustomPathProps &
	Inanimate;
export type CustomAnimatedSvgWrapperProps = CustomAnimatedSvgProps &
	CustomAnimatedPathProps &
	Animate & {
		animatedSvgProps?: AnimatedProps<RNSvgProps>;
		animatedPathProps?: AnimatedProps<RNPathProps>;
	};

export type IconProps = CustomSvgWrapperProps | CustomAnimatedSvgWrapperProps;

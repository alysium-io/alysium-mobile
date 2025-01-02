import {
	PathProps as RNPathProps,
	SvgProps as RNSvgProps
} from 'react-native-svg';

/**
 * Extending Raw Svg
 */
export type CustomSvgProps = {
	children?: React.ReactNode;
	size?: number | string;
};

/**
 * Extending Raw Path
 */
export type CustomPathProps = {
	color?: string;
};

export type PathProps = RNPathProps & CustomPathProps;
export type SvgProps = RNSvgProps & CustomSvgProps;

/**
 * Custom Svg Wrapper Props
 */
export type IconProps = SvgProps & PathProps;

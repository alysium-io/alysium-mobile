import { AnimateProps } from 'react-native-reanimated'
import {
    SvgProps as RNSvgProps,
    PathProps as RNPathProps
} from 'react-native-svg'


export type Inanimate = { animated?: false }
export type Animate = { animated: true }

/**
 * Extending Raw Svg
 */
export type CustomSvgProps = RNSvgProps & Inanimate & {
    size?: number | string;
    children?: React.ReactNode;
}

export type CustomAnimatedSvgProps = RNSvgProps & Animate & {
    size?: number | string;
    children?: React.ReactNode;
    animatedProps?: AnimateProps<RNSvgProps>;
}

/**
 * Extending Raw Path
 */
export type CustomPathProps = RNPathProps & Inanimate & {
    color?: string;
}

export type CustomAnimatedPathProps = RNPathProps & Animate & {
    color?: string;
    animatedProps?: AnimateProps<RNPathProps>;
}

/**
 * Custom Svg Wrapper Props
 */
export type CustomSvgWrapperProps = CustomSvgProps & CustomPathProps & Inanimate;
export type CustomAnimatedSvgWrapperProps = CustomAnimatedSvgProps & CustomAnimatedPathProps & Animate & {
    animatedSvgProps?: AnimateProps<RNSvgProps>;
    animatedPathProps?: AnimateProps<RNPathProps>;
}

export type IconProps = CustomSvgWrapperProps | CustomAnimatedSvgWrapperProps
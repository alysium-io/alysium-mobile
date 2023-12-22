import { AnimateProps } from 'react-native-reanimated'
import { IconSize } from './themes'
import {
    SvgProps as RNSvgProps,
    PathProps as RNPathProps
} from 'react-native-svg'


export type Inanimate = { animated?: false }
export type Animate = { animated: true }

/**
 * Extending Raw Svg
 */
export type BaseCustomSvgProps = {
    children?: React.ReactNode
    size?: number | string
    direction?: 'up' | 'down' | 'left' | 'right'
}
export type CustomSvgProps = RNSvgProps & Inanimate & BaseCustomSvgProps

export type CustomAnimatedSvgProps = RNSvgProps & Animate & BaseCustomSvgProps & {
    animatedProps?: AnimateProps<RNSvgProps>
}

/**
 * Extending Raw Path
 */
export type BaseCustomPathProps = {
    color?: string
}
export type CustomPathProps = RNPathProps & Inanimate & BaseCustomPathProps

export type CustomAnimatedPathProps = RNPathProps & Animate & BaseCustomPathProps & {
    animatedProps?: AnimateProps<RNPathProps>
}

/**
 * Custom Svg Wrapper Props
 */
export type CustomSvgWrapperProps = CustomSvgProps & CustomPathProps & Inanimate
export type CustomAnimatedSvgWrapperProps = CustomAnimatedSvgProps & CustomAnimatedPathProps & Animate & {
    animatedSvgProps?: AnimateProps<RNSvgProps>
    animatedPathProps?: AnimateProps<RNPathProps>
}

export type IconProps = CustomSvgWrapperProps | CustomAnimatedSvgWrapperProps
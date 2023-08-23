import React from 'react'
import Animated from 'react-native-reanimated'
import { CustomSvgProps, CustomAnimatedSvgProps } from '@types'
import { Svg as RNSvg } from 'react-native-svg'


const AnimatedSvg = Animated.createAnimatedComponent(RNSvg)

const Svg: React.FC<CustomSvgProps | CustomAnimatedSvgProps> = (props) => {

    if (props.animated) {
        return <AnimatedSvg {...props} width={props.size} height={props.size} animatedProps={props.animatedProps}>{props.children}</AnimatedSvg>
    }

    return <RNSvg {...props} width={props.size} height={props.size}>{props.children}</RNSvg>

}

export default Svg
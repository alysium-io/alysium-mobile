import React from 'react'
import Animated from 'react-native-reanimated'
import { Path as RNSvgPath } from 'react-native-svg'
import { CustomPathProps, CustomAnimatedPathProps } from '@types'


const AnimatedPath = Animated.createAnimatedComponent(RNSvgPath)

const Path : React.FC<CustomPathProps | CustomAnimatedPathProps> = (props) => {

    if (props.animated) {
        return <AnimatedPath {...props} fill={props.fill} stroke={props.stroke} animatedProps={props.animatedProps} />
    }

    return <RNSvgPath {...props} fill={props.fill} stroke={props.stroke} />

}

export default Path
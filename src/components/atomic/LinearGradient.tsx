import React from 'react'
import Animated from 'react-native-reanimated'
import RNLinearGradient from 'react-native-linear-gradient'


const AnimatedRNLinearGradient = Animated.createAnimatedComponent(RNLinearGradient)

type RNLinearGradientProps = React.ComponentProps<typeof RNLinearGradient>
type AnimatedRNLinearGradientProps = React.ComponentProps<typeof AnimatedRNLinearGradient>

type LinearGradientProps =
    (RNLinearGradientProps & { animated: false }) |
    (AnimatedRNLinearGradientProps & { animated?: true })

const LinearGradient : React.FC<LinearGradientProps> = ({
    animated = false,
    ...props
}) => {

    if (animated) {
        const animatedLinearGradientProps = props as AnimatedRNLinearGradientProps
        return <AnimatedRNLinearGradient {...animatedLinearGradientProps} />
    } else {
        const linearGradientProps = props as RNLinearGradientProps
        return <RNLinearGradient {...linearGradientProps} />
    }
}

export default LinearGradient
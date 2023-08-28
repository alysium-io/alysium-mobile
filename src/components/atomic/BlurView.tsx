import React from 'react'
import Animated from 'react-native-reanimated'
import { BlurView as RNBlurView } from '@react-native-community/blur'


const AnimatedBlurView = Animated.createAnimatedComponent(RNBlurView)

type InanimateBlurViewProps = React.ComponentProps<typeof RNBlurView>
type AnimatedBlurViewProps = InanimateBlurViewProps & React.ComponentProps<typeof AnimatedBlurView>

type BlurViewProps =
    (InanimateBlurViewProps & { animated: false }) |
    (AnimatedBlurViewProps & { animated?: true })

const BlurView : React.FC<BlurViewProps> = ({
    animated = true,
    ...props
}) => {
    if (animated) {
        const animatedBlurViewProps = props as AnimatedBlurViewProps
        return <AnimatedBlurView {...animatedBlurViewProps} />
    } else {
        const blurViewProps = props as InanimateBlurViewProps
        return <RNBlurView {...blurViewProps} />
    }
}

export default BlurView
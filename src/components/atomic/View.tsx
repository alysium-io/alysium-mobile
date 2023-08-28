import React from 'react'
import { View as RNView } from 'react-native'
import {
    InanimateView,
    AnimatedView,
    InanimateViewProps,
    AnimatedViewProps
} from '@subatomic'


type ViewProps =
    (InanimateViewProps & { animated: false }) |
    (AnimatedViewProps & { animated?: true })

const View = React.forwardRef<React.ElementRef<typeof RNView>, ViewProps>(({
    animated = false,
    ...props
}, ref) => {
    if (animated) {
        const animatedBoxProps = props as AnimatedViewProps
        return <AnimatedView ref={ref as any} {...animatedBoxProps} />
    } else {
        const boxProps = props as InanimateViewProps
        return <InanimateView ref={ref as any} {...boxProps} />
    }
})

export default View
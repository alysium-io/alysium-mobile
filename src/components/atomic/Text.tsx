import React from 'react'
import { Text as RNText } from 'react-native'
import {
    InanimateText,
    AnimatedText,
    InanimateTextProps,
    AnimatedTextProps
} from '@subatomic'


type TextProps =
    (InanimateTextProps & { animated: false }) |
    (AnimatedTextProps & { animated?: true })

const Text = React.forwardRef<React.ElementRef<typeof RNText>, TextProps>(({
    animated = false,
    ...props
}, ref) => {
    if (animated) {
        const animatedBoxProps = props as AnimatedTextProps
        return <AnimatedText ref={ref as any} {...animatedBoxProps} color={props.color || 't1'} />
    } else {
        const boxProps = props as InanimateTextProps
        return <InanimateText ref={ref as any} {...boxProps} color={props.color || 't1'} />
    }
})

export default Text
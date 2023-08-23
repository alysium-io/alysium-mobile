import React from 'react'
import { Text as RNText } from 'react-native'
import {
    InanimateText,
    InanimateTextProps,
    AnimatedText,
    AnimatedTextProps
} from '@subatomic'


type TextProps =
    (InanimateTextProps & { animated: false }) |
    (AnimatedTextProps & { animated?: true })

const Text = React.forwardRef<React.ElementRef<typeof RNText>, TextProps>(({ animated = true, ...props }, ref) => {

    if (animated) {
        const animatedTextProps = props as AnimatedTextProps
        return <AnimatedText ref={ref as any} {...animatedTextProps} />
    } else {
        const textProps = props as InanimateTextProps
        return <InanimateText ref={ref as any} {...textProps} />
    }
})

export default Text
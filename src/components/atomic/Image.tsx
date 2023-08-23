import React from 'react'
import { Image as RNImage } from 'react-native'
import {
    InanimateImage,
    AnimatedImage,
    InanimateImageProps,
    AnimatedImageProps
} from '@subatomic'


type ImageProps =
    (InanimateImageProps & { animated: false }) |
    (AnimatedImageProps & { animated?: true })

const Image = React.forwardRef<React.ElementRef<typeof RNImage>, ImageProps>(({ animated = true, ...props }, ref) => {

    if (animated) {
        const animatedBoxProps = props as AnimatedImageProps
        return <AnimatedImage ref={ref as any} {...animatedBoxProps} />
    } else {
        const boxProps = props as InanimateImageProps
        return <InanimateImage ref={ref as any} {...boxProps} />
    }
})

export default Image
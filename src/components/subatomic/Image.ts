import React from 'react'
import { Theme } from '@types'
import { Image as RNImage } from 'react-native'
import FastImage, { FastImageProps } from 'react-native-fast-image'
import Animated from 'react-native-reanimated'
import {
    VariantProps,
    createRestyleComponent,
    createBox,
    createVariant
} from '@shopify/restyle'

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage as React.FunctionComponent<FastImageProps>)

const RestyleImage = createBox<Theme, React.ComponentProps<typeof FastImage>>()
const AnimatedRestyleImage = createBox<Theme, React.ComponentProps<typeof Animated.Image>>(AnimatedFastImage)

const imageRestyleFunctions = [
    // You can add your own customization functions or theme variants here
    createVariant({ themeKey: 'imageVariants' })
]

export type InanimateImageProps = VariantProps<Theme, 'imageVariants'> & React.ComponentProps<typeof RestyleImage>
export type AnimatedImageProps = VariantProps<Theme, 'imageVariants'> & React.ComponentProps<typeof Animated.Image>

const InanimateImage = createRestyleComponent<
    InanimateImageProps,
    Theme
>([ imageRestyleFunctions ], RestyleImage)

const AnimatedImage = createRestyleComponent<
    AnimatedImageProps,
    Theme
>([ imageRestyleFunctions ], AnimatedRestyleImage)

export { InanimateImage, AnimatedImage }
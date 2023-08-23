import React from 'react'
import { Theme } from '@types'
import { Text as RNText } from 'react-native'
import Animated from 'react-native-reanimated'
import {
	TextProps as RestyleTextProps,
	createRestyleComponent,
	createText,
    createVariant,
    color
} from '@shopify/restyle'


const RestyleText = createText<Theme, React.ComponentProps<typeof RNText>>()
const AnimatedRestyleText = createText<Theme, React.ComponentProps<typeof Animated.Text>>(Animated.Text)

const textRestyleFunctions = [
    createVariant({ themeKey: 'textVariants' }),
    color
]

export type InanimateTextProps = RestyleTextProps<Theme> & React.ComponentProps<typeof RestyleText>
export type AnimatedTextProps = RestyleTextProps<Theme> & React.ComponentProps<typeof Animated.Text>

const InanimateText = createRestyleComponent<
    InanimateTextProps,
    Theme
>(textRestyleFunctions, RestyleText)

const AnimatedText = createRestyleComponent<
    AnimatedTextProps,
    Theme
>(textRestyleFunctions, AnimatedRestyleText)

export { InanimateText, AnimatedText }
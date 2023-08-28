import React from 'react'
import { Theme } from '@types'
import { View as RNView } from 'react-native'
import Animated from 'react-native-reanimated'
import {
    VariantProps,
    createBox,
	createRestyleComponent,
	createVariant
} from '@shopify/restyle'


const RestyleView = createBox<Theme, React.ComponentProps<typeof RNView>>()
const AnimatedRestyleView = createBox<Theme, React.ComponentProps<typeof Animated.View>>(Animated.View)

const viewRestyleFunctions = [
	createVariant({ themeKey: 'cardVariants' })
]

export type InanimateViewProps = VariantProps<Theme, 'cardVariants'> & React.ComponentProps<typeof RestyleView>
export type AnimatedViewProps = VariantProps<Theme, 'cardVariants'> & React.ComponentProps<typeof AnimatedRestyleView>

const InanimateView = createRestyleComponent<
	InanimateViewProps,
	Theme
>([ viewRestyleFunctions ], RestyleView)

const AnimatedView = createRestyleComponent<
	AnimatedViewProps,
	Theme
>([ viewRestyleFunctions ], AnimatedRestyleView)

export { InanimateView, AnimatedView }
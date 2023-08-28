import { Theme } from '@types'
import {
    createRestyleComponent,
    createVariant,
    VariantProps,
    spacing,
    SpacingProps
} from '@shopify/restyle'
import {
    TextInput as RNTextInput,
    TextInputProps as RNTextInputProps
} from 'react-native'


const textInputRestyleFunctions = [
    createVariant({ themeKey: 'textVariants' }),
    spacing
]

export type InanimateTextInputProps =
    SpacingProps<Theme> &
    VariantProps<Theme, 'textVariants'> &
    RNTextInputProps

const InanimateTextInput = createRestyleComponent<
    InanimateTextInputProps,
    Theme
>(textInputRestyleFunctions, RNTextInput)

export { InanimateTextInput }
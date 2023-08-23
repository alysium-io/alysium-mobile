import React from 'react'
import { Text as RNText } from 'react-native'
import {
    InanimateTextInput,
    InanimateTextInputProps
} from '@subatomic'


type TextProps = InanimateTextInputProps

const TextInput = React.forwardRef<React.ElementRef<typeof RNText>, TextProps>(({ ...props }, ref) => {
    const textInputProps = props as InanimateTextInputProps
    return <InanimateTextInput ref={ref as any} {...textInputProps} />
})

export default TextInput
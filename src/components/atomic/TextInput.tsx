import React from 'react'
import { Text as RNText } from 'react-native'
import {
    InanimateTextInput,
    InanimateTextInputProps
} from '@subatomic'


type TextProps = InanimateTextInputProps

const TextInput = React.forwardRef<React.ElementRef<typeof RNText>, TextProps>((
    {
        autoCorrect = false,
        autoComplete = 'off',
        autoCapitalize = 'none',
        ...props
    },
    ref
) => {
    return (
        <InanimateTextInput
            ref={ref as any}
            autoCorrect={autoCorrect}
            autoComplete={autoComplete}
            autoCapitalize={autoCapitalize}
            {...props}
        />
    )
})

export default TextInput
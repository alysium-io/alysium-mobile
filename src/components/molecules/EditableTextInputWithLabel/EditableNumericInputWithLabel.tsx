import React from 'react'
import { View, TextInput, Text } from '@atomic'
import { NativeSyntheticEvent, TextInputFocusEventData, TouchableWithoutFeedback } from 'react-native'
import { TextInputApi, useTheme } from '@hooks'


interface EditableNumericInputWithLabelProps extends React.ComponentProps<typeof TextInput> {
    textInputApi: TextInputApi
    defaultValue?: string
    placeholder: string
    onChangeText: (text: string) => void
    secureTextEntry?: boolean
    onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
    onBlur?: () => void
    textAlign?: 'left' | 'center'
    value?: string
    label: string
    keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad'
}

const EditableNumericInputWithLabel : React.FC<EditableNumericInputWithLabelProps> = ({
    textInputApi,
    defaultValue,
    placeholder,
    onChangeText,
    onFocus,
    onBlur,
    value,
    label,
    keyboardType,
    ...props
}) => {

    const { theme } = useTheme()

    return (
        <TouchableWithoutFeedback onPress={textInputApi.focus}>
            <View paddingVertical='l' paddingHorizontal='s' borderBottomWidth={0.5} borderBottomColor='bg2'>
                <View marginBottom='xs'>
                    <Text
                        variant='paragraph-small'
                        color='t2'
                        marginRight='m'
                        ellipsizeMode='tail'
                        numberOfLines={1}
                    >{label}</Text>
                </View>
                <View>
                    <TextInput
                        ref={textInputApi.ref}
                        defaultValue={defaultValue}
                        placeholder={placeholder}
                        onChangeText={onChangeText}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        value={value}
                        variant='paragraph'
                        color='t2'
                        placeholderTextColor={theme.colors.t3}
                        keyboardType={keyboardType}
                        {...props}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default EditableNumericInputWithLabel
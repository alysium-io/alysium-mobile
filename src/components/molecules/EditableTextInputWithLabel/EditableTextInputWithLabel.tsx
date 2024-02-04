import React from 'react'
import { View, TextInput, Text } from '@atomic'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { TextInputApi, useTheme } from '@hooks'


interface EditableTextInputWithLabelProps {
    textInputApi: TextInputApi
    defaultValue?: string
    placeholder: string
    onChangeText: (text: string) => void
    secureTextEntry?: boolean
    onFocus?: () => void
    onBlur?: () => void
    textAlign?: 'left' | 'center'
    value?: string
    label: string
    keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad'
}

const EditableTextInputWithLabel : React.FC<EditableTextInputWithLabelProps> = ({
    textInputApi,
    defaultValue,
    placeholder,
    onChangeText,
    onFocus,
    onBlur,
    value,
    label,
    keyboardType
}) => {

    const { theme } = useTheme()

    return (
        <TouchableWithoutFeedback onPress={textInputApi.focus}>
            <View paddingVertical='l' paddingHorizontal='s' borderBottomWidth={0.5} borderBottomColor='bg2'>
                <View marginBottom='xs'>
                    <Text
                        variant='paragraph-small'
                        color='t1'
                        marginRight='m'
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
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default EditableTextInputWithLabel
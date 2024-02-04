import React from 'react'
import { View, TextInput, Text } from '@atomic'
import { TouchableWithoutFeedback } from 'react-native'
import { TextInputApi, useTheme } from '@hooks'


interface EditableNumericInputWithLabelProps extends React.ComponentProps<typeof TextInput> {
    textInputApi: TextInputApi
    label: string
}

const EditableNumericInputWithLabel : React.FC<EditableNumericInputWithLabelProps> = ({
    textInputApi,
    label,
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
                        variant='paragraph'
                        color='t2'
                        placeholderTextColor={theme.colors.t3}
                        {...props}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default EditableNumericInputWithLabel
import React from 'react'
import { View, Text, TextInput } from '@atomic'
import { useTheme } from '@hooks'
import { ThemeMode } from '@types'


const colorScheme = {
    [ThemeMode.dark]: {
        border: 'ion_dark',
        placeholder: 't3',
        text: 't1'
    },
    [ThemeMode.light]: {
        border: 'ion_light',
        placeholder: 'ion',
        text: 't1'
    }
}

interface EditableTextSectionProps {
    header: string
    placeholder?: string
    onChangeText?: (text: string) => void
}

const EditableTextSection : React.FC<EditableTextSectionProps> = ({
    header,
    placeholder,
    onChangeText
}) => {

    const { mode, getRawColor } = useTheme()

    return (
        <View>
            <Text variant='paragraph-medium' marginBottom='s' color='t2'>{header}</Text>
            <View padding='s' style={{
                borderLeftWidth: 0.5,
                borderRightWidth: 0.5,
                borderColor: getRawColor(colorScheme[mode].border)
            }}>
                <TextInput
                    multiline
                    placeholder={placeholder || 'Type here...'}
                    placeholderTextColor={getRawColor(colorScheme[mode].placeholder)}
                    style={{ color: getRawColor(colorScheme[mode].text) }}
                    onChangeText={onChangeText}
                />
            </View>
        </View>
    )
}

export default EditableTextSection
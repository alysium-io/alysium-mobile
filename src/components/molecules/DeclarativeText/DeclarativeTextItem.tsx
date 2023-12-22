import React from 'react'
import { View, Text } from '@atomic'
import { DeclarativeTextItemProps } from './shared'
import { useTheme } from '@hooks'


const DeclarativeTextItem : React.FC<DeclarativeTextItemProps> = ({
    text,
    variant,
    color,
    underline,
    newline,
    onPress
}) => {

    const { getRawColor } = useTheme()

    return (
        <View
            style={{
                borderBottomWidth: underline ? 0.5 : 0,
                borderBottomColor: getRawColor(color || 't1')
            }}
        >
            <Text
                variant={variant}
                color={color}
                onPress={onPress}
                suppressHighlighting={true}
            >
                {newline && '\n'}
                {text}
            </Text>
        </View>
    )
}

export default DeclarativeTextItem
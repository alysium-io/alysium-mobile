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
        <>
            { newline && '\n'}
            <View
                style={{
                    borderBottomWidth: underline ? 0.5 : 0,
                    borderBottomColor: getRawColor(color || 't1')
                }}
            >
                <Text
                    lineHeight={15}
                    variant={variant}
                    color={color}
                    onPress={onPress}
                    suppressHighlighting={true}
                >
                    {text}
                </Text>
            </View>
        </>
    )
}

export default DeclarativeTextItem
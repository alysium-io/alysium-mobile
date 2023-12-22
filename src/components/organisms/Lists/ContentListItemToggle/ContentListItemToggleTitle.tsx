import React from 'react'
import { View, Text } from '@atomic'
import { StyleSheet } from 'react-native'


const propsScheme = new Map([
    [true, {
        title: {
            variant: 'paragraph',
            color: 't1'
        },
        subtitle: {
            variant: 'paragraph-small',
            color: 't2',
            marginBottom: 'xs'
        }
    }],
    [false, {
        title: {
            variant: 'paragraph',
            color: 't1',
            marginBottom: 'xs'
        },
        subtitle: {
            variant: 'paragraph-small',
            color: 't2'
        }
    }]
])

interface ContentListItemToggleTitleProps {
    title: string
    subtitle: string
    subtitleFirst?: boolean
}

const ContentListItemToggleTitle : React.FC<ContentListItemToggleTitleProps> = ({
    title,
    subtitle,
    subtitleFirst = false
}) => {

    return (
        <View style={styles.container} marginLeft='m'>
            { subtitleFirst && <Text {...propsScheme.get(subtitleFirst)?.subtitle}>{subtitle}</Text> }
            <Text {...propsScheme.get(subtitleFirst)?.title}>{title}</Text>
            { !subtitleFirst && <Text {...propsScheme.get(subtitleFirst)?.subtitle}>{subtitle}</Text> }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default ContentListItemToggleTitle
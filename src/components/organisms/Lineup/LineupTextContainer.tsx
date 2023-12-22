import React from 'react'
import { View, Text } from '@atomic'
import { StyleSheet } from 'react-native'
import settings from './settings'


interface LineupTextContainerProps {
    title?: string
    subtitle?: string
}

const LineupTextContainer : React.FC<LineupTextContainerProps> = ({
    title,
    subtitle
}) => {

    return (
        <View marginLeft='s' style={styles.container}>
            { title && <Text variant='paragraph-medium' color='t1' numberOfLines={1}>{title}</Text> }
            { subtitle && <Text variant='paragraph' color='t2' numberOfLines={1}>{subtitle}</Text> }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: settings.CONTAINER_ARTIST_HEIGHT,
        flex: 1,
        justifyContent: 'center'
    }
})

export default LineupTextContainer
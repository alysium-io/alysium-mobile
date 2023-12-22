import React from 'react'
import { View, Text } from '@atomic'
import { StyleSheet } from 'react-native'
import settings from './settings'


interface LineupListItemRightColumnProps {
    text: string
    underline?: boolean
}

const LineupListItemRightColumn : React.FC<LineupListItemRightColumnProps> = ({
    text,
    underline = false
}) => {

    return (
        <View style={styles.container} marginLeft='m'>
            <Text variant='paragraph-small' color='t2' style={{ textDecorationLine: underline ? 'underline' : 'none' }}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: settings.INNER_CONTAINER_RIGHT_COLUMN_WIDTH,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default LineupListItemRightColumn
import React from 'react'
import { View } from '@atomic'
import settings from '../settings'
import { StyleSheet } from 'react-native'


interface ConnectionContainerProps {
    children: React.ReactNode
}

const ConnectionContainer : React.FC<ConnectionContainerProps> = ({
    children
}) => {

    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: settings.MARKER_SIZE,
        height: '100%',
        position: 'relative'
    }
})

export default ConnectionContainer
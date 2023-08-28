import React from 'react'
import { View, BasePage } from '@atomic'
import { StyleSheet, ActivityIndicator } from 'react-native'


const Loading = () => {

    return (
        <BasePage>
            <View style={styles.container}>
                <ActivityIndicator />
            </View>
        </BasePage>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Loading
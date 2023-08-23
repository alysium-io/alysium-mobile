import React from 'react'
import { View } from '@atomic'
import { Page } from '@screens'
import { StyleSheet, ActivityIndicator } from 'react-native'


const Loading = () => {

    return (
        <Page>
            <View style={styles.container}>
                <ActivityIndicator />
            </View>
        </Page>
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
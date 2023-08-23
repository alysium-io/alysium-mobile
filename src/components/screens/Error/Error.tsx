import React from 'react'
import { View, Text } from '@atomic'
import { Page } from '@screens'
import { StyleSheet } from 'react-native'


const Error = () => {

    return (
        <Page>
            <View style={styles.container}>
                <Text>Error!</Text>
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

export default Error
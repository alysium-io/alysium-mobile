import React from 'react'
import { View, Text, BasePage } from '@atomic'
import { StyleSheet } from 'react-native'


const Error = () => {

    return (
        <BasePage>
            <View style={styles.container}>
                <Text>Error!</Text>
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

export default Error
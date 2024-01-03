import React from 'react'
import { View, Text } from '@atomic'
import { BasePage } from '@organisms'
import { StyleSheet } from 'react-native'


const AppError = () => {

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

export default AppError
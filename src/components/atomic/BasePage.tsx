import React from 'react'
import { StatusBar, View } from '@atomic'
import { StyleSheet } from 'react-native'


interface BasePageProps {
    children?: React.ReactNode;
}

const BasePage : React.FC<BasePageProps> = ({ children }) => {
    return (
        <View backgroundColor='primaryBg' style={styles.container}>
            <StatusBar />
            { children }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default BasePage
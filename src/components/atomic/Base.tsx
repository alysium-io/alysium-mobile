import React from 'react'
import { NotchBlur, StatusBar, View } from '@atomic'
import { StyleSheet } from 'react-native'


interface BaseProps {
    children?: React.ReactNode;
}

const Base : React.FC<BaseProps> = ({ children }) => {

    return (
        <View backgroundColor='primaryBg' style={styles.container}>
            <StatusBar />
            { children }
            <NotchBlur />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Base
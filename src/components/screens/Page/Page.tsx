import React from 'react'
import { StyleSheet } from 'react-native'
import {
    Base,
    SafeAreaView
} from '@atomic'


interface PageProps {
    children?: React.ReactNode;
}

const Page : React.FC<PageProps> = ({ children }) => {

    return (
        <Base>
            <SafeAreaView style={styles.container}>
                { children }
            </SafeAreaView>
        </Base>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        overflow: 'visible'
    }
})

export default Page
import React from 'react'
import { View } from '@atomic'
import { StyleSheet } from 'react-native'


interface BasicListProps {
    children?: React.ReactNode;
}

const BasicList : React.FC<BasicListProps> = ({
    children
}) => {

    return (
        <View margin='m' style={styles.container}>
            { children }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        
    }
})

export default BasicList
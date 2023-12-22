import React from 'react'
import { View } from '@atomic'
import { StyleSheet } from 'react-native'


interface HeaderCenterSectionProps {
    children?: React.ReactNode
}

const HeaderCenterSection : React.FC<HeaderCenterSectionProps> = ({
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
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2
    }
})

export default HeaderCenterSection
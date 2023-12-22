import React from 'react'
import { View } from '@atomic'
import { StyleSheet } from 'react-native'


interface HeaderRightSectionProps {
    children?: React.ReactNode
}

const HeaderRightSection : React.FC<HeaderRightSectionProps> = ({
    children
}) => {

    return (
        <View style={styles.container} paddingRight='m'>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1
    }
})

export default HeaderRightSection
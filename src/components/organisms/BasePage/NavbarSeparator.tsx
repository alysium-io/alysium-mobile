import React from 'react'
import { View } from '@atomic'
import { StyleSheet } from 'react-native'
import { useBasePage } from '@organisms'
import { useTheme } from '@hooks'
import { ThemeMode } from '@types'


const NavbarSeparator = () => {

    const { isFooterActive } = useBasePage()
    const { mode } = useTheme()

    return (
        <View
            style={[
                styles.container,
                { height: isFooterActive ? 0 : 0.5 }
            ]}
            backgroundColor={mode === ThemeMode.dark ? 'bg2' : 'ion'}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    }
})

export default NavbarSeparator
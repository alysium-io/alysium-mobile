import React from 'react'
import { View, Icon } from '@atomic'
import { ThemeMode } from '@types'
import { StyleSheet } from 'react-native'
import { useTheme } from '@hooks'


const colorScheme = {
    [ThemeMode.dark]: {
        borderColor: 'bg1',
        iconColor: 'bg1',
        backgroundColor: 'white'
    },
    [ThemeMode.light]: {
        borderColor: 'matt',
        iconColor: 'matt',
        backgroundColor: 'bg1'
    }
}

const EditIcon = () => {

    const { mode, getRawColor } = useTheme()

    return (
        <View
            backgroundColor={colorScheme[mode].backgroundColor}
            style={[
                styles.container,
                { borderColor: getRawColor(colorScheme[mode].borderColor) }
            ]}
        >
            <Icon
                name='pencil'
                size='regular'
                color={colorScheme[mode].iconColor}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 1000,
        borderWidth: 3,
        padding: 5
    }
})

export default EditIcon
import React from 'react'
import { View } from '@atomic'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { useTheme } from '@hooks'
import { ThemeMode } from '@types'


interface ContentListItemToggleIconProps {
    checked: boolean
    onPress?: () => void
}

const ContentListItemToggleIcon : React.FC<ContentListItemToggleIconProps> = ({
    checked,
    onPress
}) => {

    const { mode, getRawColor } = useTheme()

    const color = mode === ThemeMode.dark ? 'ion' : 'ion_dark'

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View padding='m'>
                <View style={[
                    styles.container,
                    { borderColor: getRawColor(color) }
                ]}>
                    { checked && <View style={styles.dot} backgroundColor={color} /> }
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 25,
        width: 25,
        borderRadius: 999,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3
    },
    dot: {
        height: '70%',
        width: '70%',
        borderRadius: 999
    }
})

export default ContentListItemToggleIcon
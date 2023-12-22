import React from 'react'
import { View } from '@atomic'
import { useTheme } from '@hooks'
import { BottomSheetHandleProps } from '@gorhom/bottom-sheet'
import { StyleSheet } from 'react-native'
import { ThemeMode } from '@types'


const CustomHandle : React.FC<BottomSheetHandleProps> = () => {

    const { getRawColor, mode } = useTheme()

    return (
        <View style={styles.container} marginVertical='m'>
            <View style={[
                styles.handle,
                { backgroundColor: mode === ThemeMode.dark ? getRawColor('bg3') : getRawColor('ion') }
            ]} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    handle: {
        height: 5,
        width: 45,
        borderRadius: 15
    }
})

export default CustomHandle
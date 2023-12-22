import React from 'react'
import { View, Text } from '@atomic'
import { useTheme } from '@hooks'
import { StyleSheet } from 'react-native'
import { ThemeMode } from '@types'


interface BottomSheetHeaderProps {
    text: string
}

const BottomSheetHeader : React.FC<BottomSheetHeaderProps> = ({
    text
}) => {

    const { getRawColor, mode } = useTheme()

    return (
        <View
            style={[
                styles.container,
                {
                    borderBottomWidth: 1,
                    borderBottomColor: mode === ThemeMode.dark ? getRawColor('bg3') : getRawColor('ion')
                }
            ]}
            paddingBottom='l'
            marginTop='s'
            paddingHorizontal='m'
        >
            <Text variant='section-header-1'>{ text }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    }
})

export default BottomSheetHeader
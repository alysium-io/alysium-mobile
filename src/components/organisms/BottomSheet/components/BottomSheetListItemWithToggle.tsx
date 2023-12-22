import React from 'react'
import { View, Text, Switch } from '@atomic'
import { useTheme } from '@hooks'
import { StyleSheet } from 'react-native'
import { ThemeMode } from '@types'


interface BottomSheetListItemWithToggleProps {
    text: string
    onToggle: (newValue: boolean) => void
    border?: boolean
    value?: boolean
}

const BottomSheetListItemWithToggle : React.FC<BottomSheetListItemWithToggleProps> = ({
    text,
    onToggle,
    border = true,
    value
}) => {

    const { mode, getRawColor } = useTheme()

    return (
        <View
            style={[
                styles.container,
                border && {
                    borderBottomWidth: 0.3,
                    borderBottomColor: mode === ThemeMode.dark ? getRawColor('bg3') : getRawColor('ion')
                }
            ]}
            padding='m'
        >
            <Text variant='paragraph'>{ text }</Text>
            <Switch
                onPress={onToggle}
                value={value}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

export default BottomSheetListItemWithToggle
import React from 'react'
import { View, Icon } from '@atomic'
import { TouchableWithoutFeedback } from 'react-native'
import { IconNames } from '@svg'
import { useTheme } from '@hooks'
import { ThemeMode } from '@types'


interface HeaderIconButtonProps {
    onPress: () => void
    icon: IconNames
    color?: string
}

const HeaderIconButton : React.FC<HeaderIconButtonProps> = ({
    onPress,
    icon,
    color = 'matt'
}) => {

    const { mode } = useTheme()

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View>
                <Icon
                    name={icon}
                    size='regular'
                    color={mode === ThemeMode.dark ? 't1' : color}
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default HeaderIconButton
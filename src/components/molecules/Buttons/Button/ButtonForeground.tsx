import React from 'react'
import { View } from '@atomic'
import { ButtonState } from './shared'
import ButtonLoading from './ButtonLoading'
import ButtonText from './ButtonText'
import ButtonIcon from './ButtonIcon'
import { IconNames } from '@svg'
import { FadeIn, FadeOut } from 'react-native-reanimated'


interface ButtonForegroundProps {
    buttonState: ButtonState
    text: string
    textColor: string
    icon?: IconNames
}

const ButtonForeground : React.FC<ButtonForegroundProps> = ({
    buttonState,
    text,
    textColor,
    icon
}) => {

    if (buttonState === 'loading') {
        return <ButtonLoading />
    }

    return (
        <View animated entering={FadeIn} exiting={FadeOut} flexDirection='row' alignItems='center'>
            <ButtonText text={text} color={textColor} />
            <ButtonIcon icon={icon} color={textColor} />
        </View>
    )
}

export default ButtonForeground
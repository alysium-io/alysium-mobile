import React, { useEffect } from 'react'
import { IconNames } from '@svg'
import { ButtonColorVariants, ButtonState, ButtonVariants } from './shared'
import ButtonContainer from './ButtonContainer'
import ButtonForeground from './ButtonForeground'
import useButton from './useButton'
import { Vibrator } from '@etc'


interface ButtonProps {
    onPress: () => void
    text: string
    variant: ButtonVariants
    colorVariant: ButtonColorVariants
    icon?: IconNames
    buttonState?: ButtonState
    disabled?: boolean
}

const Button : React.FC<Partial<ButtonProps>> = ({
    onPress = () => console.log('I am a button :)'),
    text = 'Press Me',
    variant = 'filled',
    colorVariant = 'default',
    icon,
    buttonState = 'default',
    disabled = false
}) => {

    const {
        borderColor,
        backgroundColor,
        textColor
    } = useButton(buttonState, variant, colorVariant)

    const _onPress = () => {
        onPress()
        Vibrator.clockTick()
    }

    return (
        <ButtonContainer
            onPress={_onPress}
            isDisabled={buttonState !== 'default' || disabled}
            borderColor={borderColor}
            backgroundColor={backgroundColor}
        >
            <ButtonForeground
                buttonState={buttonState}
                text={text}
                textColor={textColor}
                icon={icon}
            />
        </ButtonContainer>
    )
}

export default Button
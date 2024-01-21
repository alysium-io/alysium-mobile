import React from 'react'
import { IconNames } from '@svg'
import { ButtonColorVariants, ButtonState, ButtonVariants } from './shared'
import ButtonContainer from './ButtonContainer'
import ButtonForeground from './ButtonForeground'
import useButton from './useButton'


interface ButtonProps {
    onPress: () => void
    text: string
    variant: ButtonVariants
    colorVariant: ButtonColorVariants
    icon?: IconNames
    buttonState?: ButtonState
}

const Button : React.FC<Partial<ButtonProps>> = ({
    onPress = () => console.log('I am a button :)'),
    text = 'Press Me',
    variant = 'filled',
    colorVariant = 'default',
    icon,
    buttonState = 'default'
}) => {

    const {
        borderColor,
        backgroundColor,
        textColor
    } = useButton(buttonState, variant, colorVariant)

    return (
        <ButtonContainer
            onPress={onPress}
            isDisabled={buttonState !== 'default'}
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
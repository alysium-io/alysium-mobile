import { useTheme } from '@hooks'
import { Colors } from '@etc'
import {
    ButtonColorVariants,
    ButtonState,
    ButtonVariants,
    colorScheme,
    disabledColorScheme
} from './shared'


interface IUseButton {
    backgroundColor: string
    borderColor: string
    textColor: string
}

const useButton = (buttonState: ButtonState, variant: ButtonVariants, colorVariant: ButtonColorVariants) : IUseButton => {

    const { getRawColor } = useTheme()

    const getBackgroundColor = () => {
        if (buttonState === 'default') return getRawColor(colorScheme[variant][colorVariant].background)
        if (buttonState === 'disabled') return getRawColor(disabledColorScheme[variant].background)
        return getBackgroundColorDark()
    }

    const getBackgroundColorDark = () => {
        return Colors.darken(getRawColor(colorScheme[variant][colorVariant].background), 0.3)
    }

    const getBorderColor = () => {
        if (buttonState === 'default') return getRawColor(colorScheme[variant][colorVariant].borderColor)
        if (buttonState === 'disabled') return getRawColor(disabledColorScheme[variant].borderColor)
        return getBackgroundColorDark()
    }

    const getTextColor = () => {
        if (buttonState === 'disabled') return disabledColorScheme[variant].text
        return colorScheme[variant][colorVariant].text
    }
    
    return {
        backgroundColor: getBackgroundColor(),
        borderColor: getBorderColor(),
        textColor: getTextColor()
    }
}

export default useButton
export type ButtonVariants = 'filled' | 'outlined'
export type ButtonColorVariants = 'default' | 'negative' | 'positive' | 'warning'
export type ButtonState = 'default' | 'disabled' | 'loading'

export type ButtonColorScheme = {
    [key in ButtonVariants]: {
        [key in ButtonColorVariants]: {
            background: string,
            text: string,
            borderColor: string
        }
    }
}

export type DisabledColorScheme = {
    [key in ButtonVariants]: {
        background: string,
        text: string,
        borderColor: string
    }
}

export const disabledColorScheme : DisabledColorScheme = {
    filled: {
        background: 'bg2',
        text: 't3',
        borderColor: 'transparent'
    },
    outlined: {
        background: 'transparent',
        text: 't3',
        borderColor: 't3'
    }
}

export const colorScheme : ButtonColorScheme = {
    filled: {
        default: {
            background: 't1',
            text: 'bg1',
            borderColor: 'transparent'
        },
        positive: {
            background: 'matt',
            text: 'black',
            borderColor: 'transparent'
        },
        negative: {
            background: 'haze',
            text: 'white',
            borderColor: 'transparent'
        },
        warning: {
            background: 'meteor',
            text: 'black',
            borderColor: 'transparent'
        }
    },
    outlined: {
        default: {
            background: 'transparent',
            text: 't1',
            borderColor: 't1'
        },
        positive: {
            background: 'transparent',
            text: 'matt',
            borderColor: 'matt'
        },
        negative: {
            background: 'transparent',
            text: 'haze',
            borderColor: 'haze'
        },
        warning: {
            background: 'transparent',
            text: 'meteor',
            borderColor: 'meteor'
        }
    }
}
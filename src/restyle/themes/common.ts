import { BorderRadii, Spacing, ContentType } from 'src/types'


const spacing : Spacing = {
    none: 0,
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40
}

const borderRadii : BorderRadii = {
    none: 0,
    s: 3,
    m: 7,
    l: 15,
    xl: 25,
    round: 9999
}

const commonTheme = {
    borderRadii,
    spacing,
    textVariants: {
        defaults: {
            fontSize: 16,
            fontFamily: 'Lato',
            color: 'primaryText',
            fontWeight: '400',
            letterSpacing: 0.3,
            paddingVertical: 'none'
        },
        header: {
            fontSize: 36,
            fontFamily: 'Lato',
            color: 'primaryText',
            fontWeight: 'bold'
        },
        subheader: {
            fontSize: 22,
            fontFamily: 'Lato',
            color: 'secondaryText',
            fontWeight: '600'
        },
        text: {
            fontSize: 14,
            fontFamily: 'Lato',
            color: 'primaryText',
            fontWeight: '400',
            letterSpacing: 0.3
        },
        negativeText: {
            fontSize: 16,
            fontFamily: 'Lato-Black',
            color: 'negativePrimaryText',
            fontWeight: '500',
            letterSpacing: 0.3
        },
        subtext: {
            fontSize: 12,
            fontFamily: 'Lato',
            color: 'secondaryText',
            fontWeight: '400'
        }
    },
    cardVariants: {
        defaults: {},
        primary: {
            backgroundColor: 'primaryBg'
        },
        secondary: {
            backgroundColor: 'secondaryBg'
        }
    },
    imageVariants: {
        defaults: {},
        [ContentType.artist]: {
            borderRadius: 'round'
        },
        [ContentType.genre]: {
            borderRadius: 'none'
        },
        [ContentType.venue]: {
            borderRadius: 's'
        }
    },
    breakpoints: {
        phone: 0,
        tablet: 768
    }
}

export default commonTheme
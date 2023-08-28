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
    round: 9999,
    [ContentType.artist]: 9999,
    [ContentType.genre]: 3,
    [ContentType.venue]: 0
}

const PRIMARY_FONT = 'Lato'

const commonTheme = {
    borderRadii,
    spacing,
    textVariants: {
        defaults: {
            fontSize: 16,
            fontFamily: PRIMARY_FONT,
            color: 'primaryText',
            fontWeight: '400',
            letterSpacing: 0.3,
            paddingVertical: 'none'
        },
        header: {
            fontSize: 36,
            fontFamily: PRIMARY_FONT,
            color: 'primaryText',
            fontWeight: '700'
        },
        subheader: {
            fontSize: 16,
            fontFamily: PRIMARY_FONT,
            color: 'secondaryText',
            fontWeight: '600'
        },
        text: {
            fontSize: 14,
            fontFamily: PRIMARY_FONT,
            color: 'primaryText',
            fontWeight: '400',
            letterSpacing: 0.3
        },
        negativeText: {
            fontSize: 16,
            fontFamily: PRIMARY_FONT,
            color: 'negativePrimaryText',
            fontWeight: '500',
            letterSpacing: 0.3
        },
        subtext: {
            fontSize: 12,
            fontFamily: PRIMARY_FONT,
            color: 'secondaryText',
            fontWeight: '400'
        },
        h6: {
            fontSize: 14,
            fontFamily: PRIMARY_FONT,
            color: 'primaryText',
            fontWeight: '700',
            letterSpacing: 0.3
        },
        secondaryP6: {
            fontSize: 10,
            fontFamily: PRIMARY_FONT,
            color: 'secondaryText',
            fontWeight: '400',
            letterSpacing: 0.3
        },
        p1: {
            fontSize: 14,
            fontFamily: PRIMARY_FONT,
            color: 'primaryText',
            fontWeight: '700',
            letterSpacing: 0.3
        },
        p2: {
            fontSize: 14,
            fontFamily: PRIMARY_FONT,
            color: 'primaryText',
            fontWeight: '400',
            letterSpacing: 0.3
        },
        p3: {
            fontSize: 14,
            fontFamily: PRIMARY_FONT,
            color: 'primaryText',
            fontWeight: '300',
            letterSpacing: 0.3
        },
        p4: {
            fontSize: 14,
            fontFamily: PRIMARY_FONT,
            color: 'secondaryText',
            fontWeight: '300',
            letterSpacing: 0.3
        },
        p5: {
            fontSize: 14,
            fontFamily: PRIMARY_FONT,
            color: 'primaryText',
            fontWeight: '300',
            letterSpacing: 0.3
        },
        p6: {
            fontSize: 14,
            fontFamily: PRIMARY_FONT,
            color: 'primaryText',
            fontWeight: '300',
            letterSpacing: 0.3
        },
        secondaryP2: {
            fontSize: 12,
            fontFamily: PRIMARY_FONT,
            color: 'secondaryText',
            fontWeight: '400',
            letterSpacing: 0.3
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
            borderRadius: 's'
        },
        [ContentType.venue]: {
            borderRadius: 'none'
        }
    },
    breakpoints: {
        phone: 0,
        tablet: 768
    }
}

export default commonTheme
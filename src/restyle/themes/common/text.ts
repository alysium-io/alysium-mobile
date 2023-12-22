const PRIMARY_FONT = 'Helvetica Neue'

const textVariantDefaults = {
    fontFamily: PRIMARY_FONT,
    letterSpacing: 0.3,
    paddingVertical: 'none'
}

const fontWeights = {
    regular: '400',
    medium: '500',
    bold: '700'
}

export default {
    'page-header': {
        fontSize: 26,
        fontWeight: fontWeights.bold
    },
    'section-header-1': {
        fontSize: 16,
        fontWeight: fontWeights.bold
    },
    'section-header-2': {
        fontSize: 24,
        fontWeight: fontWeights.regular
    },
    'paragraph-large': {
        fontSize: 18,
        fontWeight: fontWeights.regular
    },
    'paragraph-large-medium': {
        fontSize: 18,
        fontWeight: fontWeights.medium
    },
    'paragraph': {
        fontSize: 14,
        fontWeight: fontWeights.regular
    },
    'paragraph-medium': {
        fontSize: 14,
        fontWeight: fontWeights.medium
    },
    'paragraph-bold': {
        fontSize: 14,
        fontWeight: fontWeights.bold
    },
    'paragraph-small': {
        fontSize: 10,
        fontWeight: fontWeights.regular
    },
    'paragraph-small-medium': {
        fontSize: 10,
        fontWeight: fontWeights.medium
    },
    'paragraph-small-bold': {
        fontSize: 10,
        fontWeight: fontWeights.bold
    },
    defaults: textVariantDefaults
}
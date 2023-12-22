import { BorderSet } from '@types'


export const makeBorderSet = (borderWidth: number, borderColor: string) : BorderSet => ({
    bottom: {
        borderBottomWidth: borderWidth,
        borderBottomColor: borderColor
    },
    left: {
        borderLeftWidth: borderWidth,
        borderLeftColor: borderColor
    },
    right: {
        borderRightWidth: borderWidth,
        borderRightColor: borderColor
    },
    top: {
        borderTopWidth: borderWidth,
        borderTopColor: borderColor
    },
    vertical: {
        borderBottomWidth: borderWidth,
        borderTopWidth: borderWidth,
        borderBottomColor: borderColor,
        borderTopColor: borderColor
    },
    horizontal: {
        borderRightWidth: borderWidth,
        borderLeftWidth: borderWidth,
        borderRightColor: borderColor,
        borderLeftColor: borderColor
    },
    all: {
        borderWidth,
        borderColor
    }
})
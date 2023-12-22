import { RestyleTextVariant, RestyleTextColor } from '@types'

export type DeclarativeTextItemProps = {
    text: string
    variant?: RestyleTextVariant
    color?: string
    underline?: boolean
    newline?: boolean
    onPress?: () => void
}

export type DeclarativeTextItems = DeclarativeTextItemProps[]
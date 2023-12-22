import { BorderRadii, ContentType } from '@types'


const borderRadii : BorderRadii = {
    none: 0,
    s: 2,
    m: 7,
    l: 15,
    xl: 25,
    round: 9999,
    [ContentType.user]: 9999,
    [ContentType.artist]: 9999,
    [ContentType.tag]: 9999,
    [ContentType.host]: 0
}

export default borderRadii
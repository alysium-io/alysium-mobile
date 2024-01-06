import React from 'react'
import { Text } from '@atomic'
import DeclarativeTextItem from './DeclarativeTextItem'
import { DeclarativeTextItems } from './shared'


type DeclarativeTextProps = React.ComponentProps<typeof Text> & {
    textItems: DeclarativeTextItems
}

const DeclarativeText : React.FC<DeclarativeTextProps> = ({
    textItems,
    ...props
}) => {

    if (!textItems || textItems.length === 0) {
        return null
    }

    return (
        <Text {...props} textAlignVertical='bottom' lineHeight={100}>
            { textItems.map((item, index) => <DeclarativeTextItem key={index} {...item} />) }
        </Text>
    )
}

export default DeclarativeText
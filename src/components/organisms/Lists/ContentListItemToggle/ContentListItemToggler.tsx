import React, { useEffect, useState } from 'react'
import { View } from '@atomic'
import { ContentType } from '@types'
import ContentListItemToggle from './ContentListItemToggle'


interface ContentListItemTogglerProps {
    subtitleFirst?: boolean
    onPress?: (id: number) => void
    onPressToggle?: (id: number) => void
    defaultId: number | null
    items: {
        id: number
        image: string | null
        title: string
        subtitle: string
    }[]
}

const ContentListItemToggler : React.FC<ContentListItemTogglerProps> = ({
    subtitleFirst = true,
    defaultId,
    onPress,
    onPressToggle,
    items
}) => {

    useEffect(() => {
        setSelected(defaultId)
    }, [defaultId])

    const [selected, setSelected] = useState<number | null>(defaultId)

    const handlePressToggle = (id: number) => {
        setSelected(id)
        onPressToggle && onPressToggle(id)
    }

    return (
        <View>
            {items.map(item => (
                <ContentListItemToggle
                    key={item.id}
                    title={item.title}
                    subtitle={item.subtitle}
                    onPressContent={() => onPress && onPress(item.id)}
                    onPressToggle={() => handlePressToggle(item.id)}
                    contentType={ContentType.event}
                    image={item.image}
                    size='medium'
                    border
                    subtitleFirst={subtitleFirst}
                    borderRadius='sharp'
                    checked={selected === item.id}
                />
            ))}
        </View>
    )
}

export default ContentListItemToggler
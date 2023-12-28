import React, { useState } from 'react'
import { View } from '@atomic'
import { ContentType } from '@types'
import ContentListItemToggle from './ContentListItemToggle'


interface ContentListItemTogglerProps {
    subtitleFirst?: boolean
    onPress?: (id: number) => void
    defaultId: number
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
    items
}) => {

    const [selected, setSelected] = useState<number>(defaultId)

    const _onPress = (id: number) => {
        setSelected(id)
        onPress && onPress(id)
    }

    return (
        <View>
            {items.map(item => (
                <ContentListItemToggle
                    key={item.id}
                    title={item.title}
                    subtitle={item.subtitle}
                    onPressContent={() => console.log('pressed')}
                    onPressToggle={() => _onPress(item.id)}
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
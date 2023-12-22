import React from 'react'
import { Icon, Text } from '@atomic'
import { useTheme } from '@hooks'
import { ContentType } from '@types'
import {
    HorizontalListItemContainer,
    ListItemProfile,
    IconContainer,
    TextContainer
} from '@molecules'


interface EventWithDateListItemProps {
    name: string
    date: string
    image: string
    onPress: () => void
}

const EventWithDateListItem : React.FC<EventWithDateListItemProps> = ({
    name,
    date,
    image,
    onPress
}) => {

    const { theme } = useTheme()

    return (
        <HorizontalListItemContainer>
            <ListItemProfile
                contentType={ContentType.event}
                onPress={onPress}
                image={image}
            />
            <TextContainer border='regular'>
                <Text marginBottom='xs' variant='p2'>{name}</Text>
                <Text variant='p4-secondary'>{date}</Text>
            </TextContainer>
            <IconContainer>
                <Icon
                    name='arrow'
                    direction='right'
                    color={theme.colors.t1}
                    size={18}
                />
            </IconContainer>
        </HorizontalListItemContainer>
    )
}

export default EventWithDateListItem
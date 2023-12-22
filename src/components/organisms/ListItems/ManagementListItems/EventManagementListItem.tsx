import React from 'react'
import { Icon, Text } from '@atomic'
import { EventStatus, ContentType } from '@types'
import { useTheme } from '@hooks'
import {
    HorizontalListItemContainer,
    ListItemProfile,
    TextContainer,
    IconContainer
} from '@molecules'

type TextColor = { [key in keyof typeof EventStatus]: string }

const textColors : TextColor = {
    [EventStatus.published]: 'lightBlue',
    [EventStatus.draft]: 'neutral',
    [EventStatus.cancelled]: 't2',
    [EventStatus.live]: 'lightGreen',
    [EventStatus.completed]: 'lightBlue'
}

interface EventManagementListItemProps {
    name: string
    status: EventStatus
    image: string
    onPress: () => void
}

const EventManagementListItem : React.FC<EventManagementListItemProps> = ({
    name,
    status,
    image,
    onPress
}) => {

    const { theme } = useTheme()

    return (
        <HorizontalListItemContainer border='regular' containerProps={{ marginBottom: 'none' }}>
            <ListItemProfile
                contentType={ContentType.event}
                onPress={onPress}
                image={image}
            />
            <TextContainer onPress={onPress}>
                <Text marginBottom='xs' variant='p2'>{name}</Text>
                <Text variant='p4-secondary' color={textColors[status]}>{status}</Text>
            </TextContainer>
            <IconContainer onPress={onPress}>
                <Icon
                    name='arrow'
                    direction='right'
                    color={theme.colors.t2}
                    size={18}
                />
            </IconContainer>
        </HorizontalListItemContainer>
    )
}

export default EventManagementListItem
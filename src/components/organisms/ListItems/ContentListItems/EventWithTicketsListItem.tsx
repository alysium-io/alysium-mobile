import React from 'react'
import { Icon, View, Text } from '@atomic'
import { useTheme } from '@hooks'
import { ContentType } from '@types'
import {
    HorizontalListItemContainer,
    ListItemProfile,
    IconContainer,
    TextContainer
} from '@molecules'


interface EventWithTicketsListItemProps {
    image: string
    name: string
    ticketsSold: number
    onPress: () => void
}

const EventWithTicketsListItem : React.FC<EventWithTicketsListItemProps> = ({
    image,
    name,
    ticketsSold,
    onPress
}) => {

    const { theme } = useTheme()

    return (
        <HorizontalListItemContainer>
            <ListItemProfile
                contentType={ContentType.event}
                image={image}
                onPress={onPress}
            />
            <TextContainer border='regular' onPress={onPress}>
                <Text marginBottom='xs' variant='p2'>{name}</Text>
                <View flexDirection='row'>
                    <Text variant='p4-secondary'>{ticketsSold.toLocaleString()}</Text>
                    <Text variant='p4-secondary'> tickets sold</Text>
                </View>
            </TextContainer>
            <IconContainer onPress={onPress}>
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

export default EventWithTicketsListItem
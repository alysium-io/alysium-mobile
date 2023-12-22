import React from 'react'
import { View } from '@atomic'
import { Connection } from '../Connections'
import LineupListItemRightColumn from '../LineupListItemRightColumn'
import ListItemContainer from '../ListItemContainer'
import settings, { ContainerType } from '../settings'


interface EventListItemProps {
    currentContainerType: ContainerType
    nextContainerType: ContainerType | null
    text: string
}

const EventListItem : React.FC<EventListItemProps> = ({
    currentContainerType,
    nextContainerType,
    text
}) => {

    return (
        <ListItemContainer containerType='event'>
            <View width={settings.INNER_CONTAINER_PROFILE_IMAGE_WIDTH} />
            <View flex={1} />
            <Connection
                currentContainerType={currentContainerType}
                nextContainerType={nextContainerType}
            />
            <LineupListItemRightColumn text={text} underline />
        </ListItemContainer>
    )
}

export default EventListItem
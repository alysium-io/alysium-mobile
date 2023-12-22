import React from 'react'
import { useHostPageContext } from '../hooks'
import { StandardSectionHeader } from '@molecules'
import {
    ListContainer,
    SeeMoreBottomButton,
    EventWithTicketsListItem
} from '@organisms'


const PinnedEvents = () => {

    const { pinnedEvents } = useHostPageContext()

    return (
        <ListContainer>
            <StandardSectionHeader text='Pinned Events' />
            {pinnedEvents.map(event => {
                return (
                    <EventWithTicketsListItem
                        key={event.id}
                        image={event.image}
                        name={event.name}
                        ticketsSold={event.ticketsSold}
                        onPress={() => console.log('event pressed')}
                    />
                )
            })}
            <SeeMoreBottomButton
                onPress={() => console.log('see more')}
                quantity={12}
            />
        </ListContainer>
    )
}

export default PinnedEvents
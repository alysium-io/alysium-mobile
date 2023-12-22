import React from 'react'
import { useArtistPageContext } from '../hooks'
import { SectionHeader } from '@molecules'
import {
    ListContainer,
    SeeMoreBottomButton,
    EventWithTicketsListItem
} from '@organisms'


const PinnedEvents = () => {

    const { pinnedEvents } = useArtistPageContext()

    return (
        <ListContainer>
            <SectionHeader text='Pinned Events' />
            {pinnedEvents.map(event => {
                return (
                    <EventWithTicketsListItem
                        key={event.id}
                        image={event.image}
                        name={event.name}
                        ticketsSold={event.ticketsSold}
                        onPress={() => console.log('event')}
                    />
                )
            })}
            <SeeMoreBottomButton
                onPress={() => console.log('see more')}
                quantity={15}
            />
        </ListContainer>
    )
}

export default PinnedEvents
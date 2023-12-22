import React from 'react'
import { useArtistPageContext } from '../hooks'
import { SectionHeader } from '@molecules'
import {
    ListContainer,
    EventWithDateListItem,
    SeeMoreBottomButton
} from '@organisms'


const UpcomingEvents = () => {

    const { upcomingEvents } = useArtistPageContext()

    return (
        <ListContainer>
            <SectionHeader text='Upcoming Events' />
            {upcomingEvents.map(event => {
                return (
                    <EventWithDateListItem
                        key={event.id}
                        name={event.name}
                        date={event.date}
                        onPress={() => console.log('event')}
                        image={event.image}
                    />
                )
            })}
            <SeeMoreBottomButton
                onPress={() => console.log('see more')}
                quantity={22}
            />
        </ListContainer>
    )
}

export default UpcomingEvents
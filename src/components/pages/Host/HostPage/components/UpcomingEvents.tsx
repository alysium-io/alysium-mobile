import React from 'react'
import { useHostPageContext } from '../hooks'
import {
    ListContainer,
    SeeMoreBottomButton,
    EventWithDateListItem
} from '@organisms'


const UpcomingEvents = () => {

    const { upcomingEvents } = useHostPageContext()

    return (
        <ListContainer>
            {upcomingEvents.map(item => {
                return (
                    <EventWithDateListItem
                        key={item.id}
                        name={item.name}
                        date={item.date}
                        image={item.image}
                        onPress={() => console.log('event')}
                    />
                )
            })}
            <SeeMoreBottomButton
                onPress={() => console.log('see more')}
                quantity={5}
            />
        </ListContainer>
    )
}

export default UpcomingEvents
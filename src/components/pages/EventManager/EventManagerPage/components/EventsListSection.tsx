import React from 'react'
import { Section } from '@atomic'
import { ContentType, EventStatus } from '@types'
import { ContentListItem } from '@organisms'
import { useNavigation } from '@hooks'
import { useEventManagerPageContext } from '../hooks'


const EventsListSection = () => {
    
    const { eventsData } = useEventManagerPageContext()
    const { editEventPage } = useNavigation()

    if (!eventsData) return <></>

    return (
        <Section>
            {
                eventsData.data.map(event => (
                    <ContentListItem
                        key={event.id}
                        title={event.attributes.name}
                        subtitle={EventStatus.draft}
                        onPress={() => editEventPage(event.id)}
                        contentType={ContentType.event}
                        image={event.attributes.image}
                        borderRadius='sharp'
                        border
                    />
                ))
            }
        </Section>
    )
}

export default EventsListSection
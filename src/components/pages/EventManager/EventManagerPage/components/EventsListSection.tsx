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
                eventsData.map(event => (
                    <ContentListItem
                        key={event.id}
                        title={event.name}
                        subtitle={EventStatus.draft}
                        onPress={() => editEventPage(event.id)}
                        contentType={ContentType.event}
                        image={event.image?.data || ''}
                        borderRadius='sharp'
                        border
                    />
                ))
            }
        </Section>
    )
}

export default EventsListSection
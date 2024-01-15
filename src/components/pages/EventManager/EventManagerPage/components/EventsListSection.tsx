import React from 'react'
import { Section } from '@atomic'
import { ContentType, EventStatus } from '@types'
import { ContentListItem } from '@organisms'
import { useHost, useNavigation } from '@hooks'


const EventsListSection = () => {
    
    const { host } = useHost()
    const { editEventPage } = useNavigation()

    if (host.events === null) return <></>

    return (
        <Section>
            {
                host.events.map(event => (
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
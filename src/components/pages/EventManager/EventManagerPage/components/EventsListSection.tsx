import React from 'react'
import { Section } from '@atomic'
import { global } from '@etc'
import { ContentType } from '@types'
import { ContentListItem } from '@organisms'


const EventsListSection = () => {

    return (
        <Section>
            {
                global.sampleData.sampleEvents.map(event => (
                    <ContentListItem
                        key={event.id}
                        title={event.name}
                        subtitle={event.status}
                        onPress={() => console.log('Event pressed')}
                        contentType={ContentType.event}
                        image={event.image}
                        borderRadius='sharp'
                        border
                    />
                ))
            }
        </Section>
    )
}

export default EventsListSection
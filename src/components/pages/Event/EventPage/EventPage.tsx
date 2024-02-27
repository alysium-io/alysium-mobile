import React from 'react'
import { Section, View } from '@atomic'
import { BasePage } from '@organisms'
import { ArtistLineup } from './components'
import { global } from '@etc'
import { ParallaxPageOutline } from '@templates'
import { SubHeader } from './components'
import { SectionHeader } from '@molecules'
import { EventPageProvider } from './contexts'
import { useEventPageContext } from './hooks'


const EventPage = () => {

    const { eventData } = useEventPageContext()

    return (
        <BasePage>
            <ParallaxPageOutline
                title={eventData?.data.attributes.name || ''}
                image={eventData?.data.attributes.image?.data?.attributes.url || ''}
                textAlignment='center'
            >
                <SubHeader />
                <Section marginTop='l'>
                    <View marginHorizontal='m'>
                        <SectionHeader text='Lineup' />
                    </View>
                    <ArtistLineup />
                </Section>
            </ParallaxPageOutline>
        </BasePage>
    )
}

export default () => (
    <EventPageProvider>
        <EventPage />
    </EventPageProvider>
)
import React from 'react'
import { Section, View } from '@atomic'
import { BasePage } from '@organisms'
import { ArtistLineup } from './components'
import { global } from '@etc'
import { ParallaxPageOutline } from '@templates'
import { SubHeader } from './components'
import { SectionHeader } from '@molecules'


const EventPage = () => {

    return (
        <BasePage>
            {
                global && (
                    <ParallaxPageOutline
                        title={global.sampleData.event.name}
                        image={global.sampleData.event.image}
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
                )
            }
        </BasePage>
    )
}

export default EventPage
import React from 'react'
import { HeaderSafeArea, ScrollView, Text } from '@atomic'
import { BasePage } from '@organisms'
import { EventCandidatesPageProvider } from './contexts'
import { TogglerSection, CandidatesSection } from './components'


const EventCandidatesPage = () => {

    return (
        <BasePage>
            <HeaderSafeArea>
                <ScrollView alwaysBounceVertical>
                    <Text variant='page-header' margin='m'>Event Candidates</Text>
                    <TogglerSection />
                    <CandidatesSection />
                </ScrollView>
            </HeaderSafeArea>
        </BasePage>
    )
}

export default () => (
    <EventCandidatesPageProvider>
        <EventCandidatesPage />
    </EventCandidatesPageProvider>
)
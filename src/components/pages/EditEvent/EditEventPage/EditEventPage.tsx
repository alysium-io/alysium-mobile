import React from 'react'
import { HeaderSafeArea, ScrollView, Separator } from '@atomic'
import { BasePage } from '@organisms'
import {
    PrimaryImage,
    EventName,
    CandidatesItem,
    EventDateSection,
    SelectVenueSection,
    FeaturesSection,
    VenueTypeSection,
    SummarySection
} from './components'


const EditEventPage = () => {

    return (
        <BasePage>
            <HeaderSafeArea>
                <ScrollView>
                    <PrimaryImage />
                    <EventName />
                    <CandidatesItem />
                    <Separator size='large' />
                    <EventDateSection />
                    <Separator size='large' />
                    <SelectVenueSection />
                    <Separator />
                    <FeaturesSection />
                    <Separator />
                    <VenueTypeSection />
                    <Separator />
                    <SummarySection />
                </ScrollView>
            </HeaderSafeArea>
        </BasePage>
    )
}

export default EditEventPage
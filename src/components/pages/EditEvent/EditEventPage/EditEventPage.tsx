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
    SummarySection,
    EditEventPageFooter
} from './components'


const EditEventPage = () => {

    return (
        <BasePage FooterComponent={EditEventPageFooter}>
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
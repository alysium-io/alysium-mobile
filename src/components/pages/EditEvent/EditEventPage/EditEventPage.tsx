import React, { useEffect } from 'react'
import { HeaderSafeArea, ScrollView, Separator } from '@atomic'
import { BasePage } from '@organisms'
import { EditEventPageProvider } from './contexts'
import { useEditEventPageContext } from './hooks'
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

    const { data, loadForm } = useEditEventPageContext()

    useEffect(() => {
        loadForm()
    }, [data])

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

export default () => (
    <EditEventPageProvider>
        <EditEventPage />
    </EditEventPageProvider>
)
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
    SummarySection,
    EditEventPageFooter,
    CreateVenueBottomSheet
} from './components'


const EditEventPage = () => {

    const { eventData, loadForm, createVenueSheetApi } = useEditEventPageContext()

    useEffect(() => {
        loadForm()
    }, [eventData])

    return (
        <BasePage FooterComponent={EditEventPageFooter}>
            <HeaderSafeArea>
                <ScrollView>
                    <PrimaryImage />
                    <EventName />
                    <CandidatesItem />
                    <Separator size='large' marginTop='none' />
                    <EventDateSection />
                    <Separator size='large' />
                    <SelectVenueSection />
                    <Separator />
                    <FeaturesSection />
                    <Separator />
                    <SummarySection />
                    <CreateVenueBottomSheet sheetApi={createVenueSheetApi} />
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
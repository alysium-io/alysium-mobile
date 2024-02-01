import React, { useEffect } from 'react'
import { HeaderSafeArea, KeyboardAvoidingView, ScrollView } from '@atomic'
import { BasePage } from '@organisms'
import { EditVenuePageProvider } from './contexts'
import { useEditVenuePageContext } from './hooks'
import {
    HeaderSection,
    BasicInfoSection,
    VenueTypeSection,
    LinksSection
} from './components'


const EditVenuePage = () => {

    const { venueData, loadForm } = useEditVenuePageContext()

    useEffect(() => {
        loadForm()
    }, [venueData])

    return (
        <BasePage>
            <HeaderSafeArea>
                <KeyboardAvoidingView>
                    <ScrollView alwaysBounceVertical>
                        <HeaderSection />
                        <BasicInfoSection />
                        <VenueTypeSection />
                        <LinksSection />
                    </ScrollView>
                </KeyboardAvoidingView>
            </HeaderSafeArea>
        </BasePage>
    )
}

export default () => (
    <EditVenuePageProvider>
        <EditVenuePage />
    </EditVenuePageProvider>
)
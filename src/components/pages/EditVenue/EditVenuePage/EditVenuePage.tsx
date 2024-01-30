import React from 'react'
import { HeaderSafeArea, ScrollView } from '@atomic'
import { BasePage } from '@organisms'
import { EditVenuePageProvider } from './contexts'
import PrimaryImage from './components/PrimaryImage'


const EditVenuePage = () => {

    return (
        <BasePage>
            <HeaderSafeArea>
                <ScrollView>
                    <PrimaryImage />
                </ScrollView>
            </HeaderSafeArea>
        </BasePage>
    )
}

export default () => (
    <EditVenuePageProvider>
        <EditVenuePage />
    </EditVenuePageProvider>
)
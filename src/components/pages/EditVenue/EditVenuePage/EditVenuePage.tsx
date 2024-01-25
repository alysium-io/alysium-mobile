import React from 'react'
import { HeaderSafeArea, ScrollView, Text } from '@atomic'
import { BasePage } from '@organisms'
import { EditVenuePageProvider } from './contexts'


const EditVenuePage = () => {

    return (
        <BasePage>
            <HeaderSafeArea>
                <ScrollView>
                    <Text>Edit Venue</Text>
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
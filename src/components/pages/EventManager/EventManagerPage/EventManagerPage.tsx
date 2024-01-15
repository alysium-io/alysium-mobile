import React, { useEffect } from 'react'
import { HeaderSafeArea, ScrollView, Text, View } from '@atomic'
import { EventsListSection, CreateEventFooter } from './components'
import { BasePage } from '@organisms'
import { useHost } from '@hooks'
import { EventManagerPageProvider } from './contexts'


const EventManagerPage = () => {

    const { getEvents } = useHost()

    useEffect(() => {
        getEvents()
    }, [])

    return (
        <BasePage FooterComponent={CreateEventFooter}>
            <HeaderSafeArea>
                <ScrollView alwaysBounceVertical>
                    <View margin='m'>
                        <Text variant='page-header'>Event Manager</Text>
                    </View>
                    <EventsListSection />
                </ScrollView>
            </HeaderSafeArea>
        </BasePage>
    )
}

export default () => (
    <EventManagerPageProvider>
        <EventManagerPage />
    </EventManagerPageProvider>
)
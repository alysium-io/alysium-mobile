import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { EventManagerStackNavigatorParamList } from '@types'
import { useTabSettings } from '../hooks'
import {
    EventManagerPage,
    EventPage,
    EditEventPage,
    EventManagerPageHeader,
    EditEventPageHeader,
    EventPageHeader
} from '@pages'


export const EventManagerStack = createStackNavigator<EventManagerStackNavigatorParamList>()

const EventManagerTab = () => {

    const { screenOptions } = useTabSettings()

    return (
        <EventManagerStack.Navigator screenOptions={screenOptions}>

            <EventManagerStack.Screen
                name='EventManagerPage'
                component={EventManagerPage}
                options={{ header: EventManagerPageHeader }}
            />
            <EventManagerStack.Screen
                name='EditEventPage'
                component={EditEventPage}
                options={{ header: EditEventPageHeader }}
            />

            <EventManagerStack.Screen
                name='EventPage'
                component={EventPage}
                options={{ header: EventPageHeader }}
            />

        </EventManagerStack.Navigator>
    )
}

export default EventManagerTab
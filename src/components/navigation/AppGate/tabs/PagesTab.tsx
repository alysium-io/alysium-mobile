import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { PagesStackNavigatorParamList } from '@types'
import { useTabSettings } from '../hooks'
import {
    PagesPage,
    PagesPageHeader,
    ArtistPage,
    ArtistPageHeader,
    HostPage,
    HostPageHeader,
    EventPage,
    EventPageHeader,
    SearchPage,
    SearchPageHeader,
    TagPage,
    TagPageHeader,
    EditEventPage,
    EditEventPageHeader,
    EditContractPage,
    EditContractPageHeader,
    EventManagerPage,
    EventManagerPageHeader,
    ContractManagerPage,
    ContractManagerPageHeader,
    ProfilePage,
    ProfilePageHeader,
    AuthPage
} from '@pages'


export const PagesStack = createStackNavigator<PagesStackNavigatorParamList>()

const PagesTab = () => {

    const { screenOptions } = useTabSettings()

    return (
        <PagesStack.Navigator screenOptions={screenOptions}>

            {/* Iniital Screen */}
            <PagesStack.Screen
                name='PagesPage'
                component={PagesPage}
                options={{ header: PagesPageHeader }}
            />

            <PagesStack.Screen
                name='ArtistPage'
                component={ArtistPage}
                options={{ header: ArtistPageHeader }}
            />

            <PagesStack.Screen
                name='HostPage'
                component={HostPage}
                options={{ header: HostPageHeader }}
            />

            <PagesStack.Screen
                name='EventPage'
                component={EventPage}
                options={{ header: EventPageHeader }}
            />

            <PagesStack.Screen
                name='SearchPage'
                component={SearchPage}
                options={{ header: SearchPageHeader }}
            />

            <PagesStack.Screen
                name='TagPage'
                component={TagPage}
                options={{ header: TagPageHeader }}
            />

            <PagesStack.Screen
                name='EditEventPage'
                component={EditEventPage}
                options={{ header: EditEventPageHeader }}
            />

            <PagesStack.Screen
                name='EditContractPage'
                component={EditContractPage}
                options={{ header: EditContractPageHeader }}
            />

            <PagesStack.Screen
                name='EventManagerPage'
                component={EventManagerPage}
                options={{ header: EventManagerPageHeader }}
            />

            <PagesStack.Screen
                name='ContractManagerPage'
                component={ContractManagerPage}
                options={{ header: ContractManagerPageHeader }}
            />

            <PagesStack.Screen
                name='ProfilePage'
                component={ProfilePage}
                options={{ header: ProfilePageHeader }}
            />

            <PagesStack.Screen
                name='AuthPage'
                component={AuthPage}
            />

        </PagesStack.Navigator>
    )
}

export default PagesTab
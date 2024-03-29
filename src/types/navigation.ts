import { CompositeNavigationProp, ParamListBase, RouteProp } from '@react-navigation/native'
import { type NativeStackNavigationProp } from '@react-navigation/native-stack'
import { type BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { ApiIdentifier } from './api'


/**
 * Individual Pages
 */
type SearchPage = undefined
type ComponentsPage = undefined

type HostPage = { hostId: ApiIdentifier }
type HostFollowersAndShowsPage = { hostId: ApiIdentifier, defaultTabIndex: number }

type ArtistPage = { artistId: ApiIdentifier }
type ArtistFollowersAndShowsPage = { artistId: ApiIdentifier, defaultTabIndex: number }

type TagPage = { tagId: ApiIdentifier }
type TagFollowersPage = { tagId: ApiIdentifier }

type LocationPage = { locationId: ApiIdentifier }

type ProfilePage = undefined

type EventManagerPage = undefined
type EditEventPage = { eventId: ApiIdentifier }

type EditVenuePage = { venueId: ApiIdentifier }

type EventPage = { eventId: ApiIdentifier }

type ExperimentPageOne = undefined
type ExperimentPageTwo = undefined

type PagesPage = undefined

type EditContractPage = { contractId: ApiIdentifier }

type ContractManagerPage = undefined

type EventCandidatesPage = { eventId: ApiIdentifier }

/**
 * Stack Navigators
 * 
 * Stack navigators are used to navigate between screens.
 * 
 * @example
 * 
 * const navigation = useNavigation<SearchScreenNavigationProp>()
 * 
 * navigation.navigate('SearchPage')
 */
export type ExperimentStackNavigatorParamList = {
    ExperimentPageOne: ExperimentPageOne
    ExperimentPageTwo: ExperimentPageTwo
}

export type ComponentsStackNavigatorParamList = {
    ComponentsPage: ComponentsPage
}

export type PagesStackNavigatorParamList = {
    PagesPage: PagesPage
    ArtistPage: ArtistPage
    HostPage: HostPage
    EventPage: EventPage
    SearchPage: SearchPage
    TagPage: TagPage
    EditEventPage: EditEventPage
    EditContractPage: EditContractPage
    EventManagerPage: EventManagerPage
    ContractManagerPage: ContractManagerPage
    ProfilePage: ProfilePage
}

export type SearchStackNavigatorParamList = {

    SearchPage: SearchPage

    HostPage: HostPage
    HostFollowersAndShowsPage: HostFollowersAndShowsPage

    ArtistPage: ArtistPage
    ArtistFollowersAndShowsPage: ArtistFollowersAndShowsPage

    TagPage: TagPage
    TagFollowersPage: TagFollowersPage

    LocationPage: LocationPage

}

export type ProfileStackNavigatorParamList = {

    ProfilePage: ProfilePage

}

export type EventManagerStackNavigatorParamList = {

    EventManagerPage: EventManagerPage
    EditEventPage: EditEventPage
    EventPage: EventPage
    EditVenuePage: EditVenuePage
    EventCandidatesPage: EventCandidatesPage
    EditContractPage: EditContractPage

}

export type ContractManagerStackNavigatorParamList = {

    ContractManagerPage: ContractManagerPage
    EditContractPage: EditContractPage
    EditVenuePage: EditVenuePage

}

/**
 * Bottom Tab Navigators
 * 
 * Bottom tab props are used to build the navigation prop for the stack navigators.
 * These props are configured to give stack navigation & tab navigation props to the stack navigators.
 * We have to compose the bottom tab navigation prop with the stack navigation prop to get the correct type.
 * 
 * @example Stack Navigation
 * 
 *  const navigation = useNavigation<SearchScreenNavigationProp>()
 *  navigation.navigate('SearchPage')
 * 
 * @example Tab Navigation
 * 
 *  const navigation = useNavigation<SearchScreenNavigationProp>()
 *  navigation.jumpTo('Profile')
 */
// Just put all possible tabs in here
export type BottomTabNavigatorParamList = {
    Experiment: undefined
    Components: undefined
    Pages: undefined
    Search: SearchStackNavigatorParamList
    Profile: ProfileStackNavigatorParamList
    EventManager: EventManagerStackNavigatorParamList
    ContractManager: ContractManagerStackNavigatorParamList
}

type ComposeTabNavigationProp<T extends ParamListBase> = CompositeNavigationProp<
    NativeStackNavigationProp<T>,
    BottomTabNavigationProp<BottomTabNavigatorParamList>
>

// Bottom Tab Navigation Props
export type SearchScreenNavigationProp = ComposeTabNavigationProp<SearchStackNavigatorParamList>
export type ProfileScreenNavigationProp = ComposeTabNavigationProp<ProfileStackNavigatorParamList>
export type EventManagerScreenNavigationProp = ComposeTabNavigationProp<EventManagerStackNavigatorParamList>
export type ExperimentScreenNavigationProp = ComposeTabNavigationProp<ExperimentStackNavigatorParamList>
export type ComponentsScreenNavigationProp = ComposeTabNavigationProp<ComponentsStackNavigatorParamList>
export type PagesScreenNavigationProp = ComposeTabNavigationProp<PagesStackNavigatorParamList>

export type CompositeScreenNavigationProp =
    SearchScreenNavigationProp &
    ProfileScreenNavigationProp &
    EventManagerScreenNavigationProp &
    ExperimentScreenNavigationProp &
    PagesScreenNavigationProp &
    ComponentsScreenNavigationProp

export type CompositeStackNavigatorParamList =
    SearchStackNavigatorParamList &
    ProfileStackNavigatorParamList &
    EventManagerStackNavigatorParamList &
    ExperimentStackNavigatorParamList &
    PagesStackNavigatorParamList &
    ComponentsStackNavigatorParamList

/**
 * Search Route Props
 */
export type HostPageRouteProp = RouteProp<CompositeStackNavigatorParamList, 'HostPage'>
export type HostFollowersAndShowsPageRouteProp = RouteProp<CompositeStackNavigatorParamList, 'HostFollowersAndShowsPage'>

export type ArtistPageRouteProp = RouteProp<CompositeStackNavigatorParamList, 'ArtistPage'>
export type ArtistFollowersAndShowsPageRouteProp = RouteProp<CompositeStackNavigatorParamList, 'ArtistFollowersAndShowsPage'>

export type TagPageRouteProp = RouteProp<CompositeStackNavigatorParamList, 'TagPage'>
export type TagFollowersPageRouteProp = RouteProp<CompositeStackNavigatorParamList, 'TagFollowersPage'>

/**
 * Profile Route Props
 */
export type ProfilePageRouteProp = RouteProp<CompositeStackNavigatorParamList, 'ProfilePage'>

/**
 * Event Manager Route Props
 */
export type EventManagerPageRouteProp = RouteProp<CompositeStackNavigatorParamList, 'EventManagerPage'>
export type EditEventPageRouteProp = RouteProp<CompositeStackNavigatorParamList, 'EditEventPage'>
export type EditVenuePageRouteProp = RouteProp<CompositeStackNavigatorParamList, 'EditVenuePage'>
export type EventPageRouteProp = RouteProp<CompositeStackNavigatorParamList, 'EventPage'>
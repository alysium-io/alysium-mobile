import { FindGalleryParamsDto } from '@flux/api/gallery/dto/gallery-find.dto';
import { type BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
	CompositeNavigationProp,
	ParamListBase,
	RouteProp
} from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NanoId } from './api';

/**
 * Individual Pages
 */
type SearchPage = undefined;

type HostPage = { host_uid: NanoId };
type HostFollowersAndShowsPage = {
	host_uid: NanoId;
	defaultTabIndex: number;
};

type ArtistPage = { artist_uid: NanoId };
type ArtistFollowersAndShowsPage = {
	artist_uid: NanoId;
	defaultTabIndex: number;
};

type TagPage = { tag_uid: NanoId };
type TagFollowersPage = { tag_uid: NanoId };

type LocationPage = { location_uid: NanoId };

type ProfilePage = undefined;

type EventManagerPage = undefined;
type EditArtistEventPage = { event_uid: NanoId };

type ChooseScenePage = undefined;

type EditVenuePage = { venue_uid: NanoId };

type EventPage = { event_uid: NanoId };

type EditContractPage = { contract_uid: NanoId };

type ChooseEventLocationPage = { event_uid: NanoId };

type ContractManagerPage = undefined;

type EventCandidatesPage = { event_uid: NanoId };

type EditEventTicketTypesPage = { event_uid: NanoId };

type EditTicketTypePage = {
	ticket_collection_uid: NanoId;
	ticket_type_uid: NanoId;
};

type ArtistViewContractPage = { contract_uid: NanoId };

type UserArtistsFollowingPage = undefined;
type UserTagsFollowingPage = undefined;

type TopTagsPage = undefined;

type EditArtistPage = undefined;

type ViewGalleryPage = {
	transitionTagId: string;
	findGalleryParamsDto: FindGalleryParamsDto;
	pressIndex: number;
};

export type RouteNames =
	| 'SearchPage'
	| 'HostPage'
	| 'HostFollowersAndShowsPage'
	| 'ArtistPage'
	| 'ArtistFollowersAndShowsPage'
	| 'TagPage'
	| 'TagFollowersPage'
	| 'LocationPage'
	| 'ProfilePage'
	| 'EventManagerPage'
	| 'EditArtistEventPage'
	| 'EditVenuePage'
	| 'EventPage'
	| 'EditContractPage'
	| 'ContractManagerPage'
	| 'EventCandidatesPage'
	| 'EditEventTicketTypesPage'
	| 'EditTicketTypePage'
	| 'ArtistViewContractPage'
	| 'UserArtistsFollowingPage'
	| 'UserTagsFollowingPage'
	| 'TopTagsPage'
	| 'EditArtistPage'
	| 'ViewGalleryPage'
	| 'ChooseScenePage'
	| 'ChooseEventLocationPage';

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
export type SearchStackNavigatorParamList = {
	SearchPage: SearchPage;

	HostPage: HostPage;
	HostFollowersAndShowsPage: HostFollowersAndShowsPage;

	ArtistPage: ArtistPage;
	ArtistFollowersAndShowsPage: ArtistFollowersAndShowsPage;

	TagPage: TagPage;
	TagFollowersPage: TagFollowersPage;

	LocationPage: LocationPage;

	UserArtistsFollowingPage: UserArtistsFollowingPage;
	UserTagsFollowingPage: UserTagsFollowingPage;

	TopTagsPage: TopTagsPage;

	ViewGalleryPage: ViewGalleryPage;
};

export type ProfileStackNavigatorParamList = {
	ProfilePage: ProfilePage;
};

export type EventManagerStackNavigatorParamList = {
	EventManagerPage: EventManagerPage;
	EventPage: EventPage;
	EditVenuePage: EditVenuePage;
	EventCandidatesPage: EventCandidatesPage;
	EditEventTicketTypesPage: EditEventTicketTypesPage;
	EditTicketTypePage: EditTicketTypePage;
	EditContractPage: EditContractPage;
	ArtistPage: ArtistPage;
};

export type ContractManagerStackNavigatorParamList = {
	ContractManagerPage: ContractManagerPage;
	EditContractPage: EditContractPage;
	EditVenuePage: EditVenuePage;
	ArtistViewContractPage: ArtistViewContractPage;
};

export type EditArtistStackNavigatorParamList = {
	EditArtistPage: EditArtistPage;
	ViewGalleryPage: ViewGalleryPage;
	EditArtistEventPage: EditArtistEventPage;
	ChooseScenePage: ChooseScenePage;
	ArtistPage: ArtistPage;
	ChooseEventLocationPage: ChooseEventLocationPage;
};

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
	Search: SearchStackNavigatorParamList;
	Profile: ProfileStackNavigatorParamList;
	EventManager: EventManagerStackNavigatorParamList;
	ContractManager: ContractManagerStackNavigatorParamList;
	EditArtist: EditArtistStackNavigatorParamList;
};

type ComposeTabNavigationProp<T extends ParamListBase> =
	CompositeNavigationProp<
		NativeStackNavigationProp<T>,
		BottomTabNavigationProp<BottomTabNavigatorParamList>
	>;

// Bottom Tab Navigation Props
export type SearchScreenNavigationProp =
	ComposeTabNavigationProp<SearchStackNavigatorParamList>;
export type ProfileScreenNavigationProp =
	ComposeTabNavigationProp<ProfileStackNavigatorParamList>;
export type EventManagerScreenNavigationProp =
	ComposeTabNavigationProp<EventManagerStackNavigatorParamList>;
export type ContractManagerScreenNavigationProp =
	ComposeTabNavigationProp<ContractManagerStackNavigatorParamList>;
export type EditArtistScreenNavigationProp =
	ComposeTabNavigationProp<EditArtistStackNavigatorParamList>;

export type CompositeScreenNavigationProp = SearchScreenNavigationProp &
	ProfileScreenNavigationProp &
	EventManagerScreenNavigationProp &
	ContractManagerScreenNavigationProp &
	EditArtistScreenNavigationProp;

export type CompositeStackNavigatorParamList = SearchStackNavigatorParamList &
	ProfileStackNavigatorParamList &
	EventManagerStackNavigatorParamList &
	ContractManagerStackNavigatorParamList &
	EditArtistStackNavigatorParamList;

/**
 * Search Route Props
 */
export type HostPageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'HostPage'
>;
export type HostFollowersAndShowsPageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'HostFollowersAndShowsPage'
>;

export type ArtistPageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'ArtistPage'
>;
export type ArtistFollowersAndShowsPageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'ArtistFollowersAndShowsPage'
>;
export type TagPageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'TagPage'
>;
export type TagFollowersPageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'TagFollowersPage'
>;

/**
 * Profile Route Props
 */
export type ProfilePageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'ProfilePage'
>;

/**
 * Event Manager Route Props
 */
export type EventManagerPageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'EventManagerPage'
>;
export type EditArtistEventPageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'EditArtistEventPage'
>;
export type EventCandidatesPageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'EventCandidatesPage'
>;
export type EditEventTicketTypesPageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'EditEventTicketTypesPage'
>;
export type EditTicketTypePageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'EditTicketTypePage'
>;
export type EditVenuePageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'EditVenuePage'
>;
export type EventPageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'EventPage'
>;
export type EditContractPageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'EditContractPage'
>;

/**
 * Contract Manager Route Props
 */
export type ArtistViewContractPageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'ArtistViewContractPage'
>;

/**
 * Edit Artist Route Props
 */
export type EditArtistPageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'EditArtistPage'
>;
export type ViewGalleryPageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'ViewGalleryPage'
>;
export type ChooseEventLocationRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'ChooseEventLocationPage'
>;

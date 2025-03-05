import { Contact } from '@flux/api/contact';
import { EventMedia } from '@flux/api/event-media/event-media.entity';
import { ExternalUrl } from '@flux/api/external-url/external-url.entity';
import { type BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
	CompositeNavigationProp,
	NavigatorScreenParams,
	ParamListBase,
	RouteProp
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NanoId } from './api';

/**
 * Individual Pages
 */
type HomePage = undefined;

type SearchPage = undefined;

type ArtistPage = { artist_uid: NanoId };
type ArtistEventsInteractiveMapPage = { artist_uid: NanoId };
type ArtistFollowersAndShowsPage = {
	artist_uid: NanoId;
	defaultTabIndex: number;
};

type ProfilePage = undefined;

type EditEventPage = { event_uid: NanoId };

type ChooseScenePage = undefined;

type EventPage = { event_uid: NanoId };
type ArtistEventsPage = { artist_uid: NanoId };

type ChooseEventLocationPage = { event_uid: NanoId };

type UserArtistsFollowingPage = undefined;
type UserScenesFollowingPage = undefined;

type EditArtistPage = undefined;

type ViewEventMediaPage = {
	eventMedia: EventMedia[];
	initialIndex: number;
};

type ScenePage = { scene_uid: NanoId };

type EventManagerPage = undefined;

type EditContactsPage = undefined;
type EditContactPage = { contact: Contact };
type CreateContactPage = undefined;

type EditExternalLinksPage = undefined;
type EditExternalLinkPage = { externalLink: ExternalUrl };
type CreateExternalLinkPage = undefined;

type EditArtistNamePage = undefined;
type EditArtistBioPage = undefined;

type EditArtistEventAboutPage = { event_uid: NanoId };
type EditArtistEventTicketsUrlPage = { event_uid: NanoId };

type ManageEventPage = { event_uid: NanoId };
type EditPublishedEventPage = { event_uid: NanoId };

type EditArtistTeamPage = undefined;
type AddArtistTeamMemberPage = undefined;

type ViewEventQRCodePage = { event_uid: NanoId };
type ViewArtistQRCodePage = { artist_uid: NanoId };

export type RouteNames =
	| 'HomePage'
	| 'LocalEventsMapPage'
	| 'SearchPage'
	| 'HostPage'
	| 'HostFollowersAndShowsPage'
	| 'ArtistPage'
	| 'ArtistFollowersAndShowsPage'
	| 'ProfilePage'
	| 'EventManagerPage'
	| 'EditEventPage'
	| 'EventPage'
	| 'EditContractPage'
	| 'UserArtistsFollowingPage'
	| 'UserScenesFollowingPage'
	| 'EditArtistEventTicketsUrlPage'
	| 'EditArtistPage'
	| 'ViewEventMediaPage'
	| 'ChooseScenePage'
	| 'ChooseEventLocationPage'
	| 'EventPage'
	| 'ArtistEventsPage'
	| 'ScenePage'
	| 'EditContactPage'
	| 'EventManagerPage'
	| 'EditContactsPage'
	| 'CreateContactPage'
	| 'EditExternalLinksPage'
	| 'EditExternalLinkPage'
	| 'CreateExternalLinkPage'
	| 'EditArtistEventAboutPage'
	| 'ManageEventPage'
	| 'EditPublishedEventPage'
	| 'EditArtistTeamPage'
	| 'AddArtistTeamMemberPage'
	| 'ViewEventQRCodePage'
	| 'ViewArtistQRCodePage';

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

	ArtistPage: ArtistPage;
	ArtistEventsInteractiveMapPage: ArtistEventsInteractiveMapPage;
	ArtistFollowersAndShowsPage: ArtistFollowersAndShowsPage;

	UserArtistsFollowingPage: UserArtistsFollowingPage;
	UserScenesFollowingPage: UserScenesFollowingPage;

	ViewEventMediaPage: ViewEventMediaPage;

	EventPage: EventPage;
	ArtistEventsPage: ArtistEventsPage;

	ScenePage: ScenePage;
};

export type ProfileStackNavigatorParamList = {
	ProfilePage: ProfilePage;
	EditArtistPage: EditArtistPage;
	EditContactsPage: EditContactsPage;
	CreateContactPage: CreateContactPage;
	EditContactPage: EditContactPage;
	EditExternalLinksPage: EditExternalLinksPage;
	EditExternalLinkPage: EditExternalLinkPage;
	CreateExternalLinkPage: CreateExternalLinkPage;
	EditArtistNamePage: EditArtistNamePage;
	EditArtistBioPage: EditArtistBioPage;
	ChooseScenePage: ChooseScenePage;
	EditArtistTeamPage: EditArtistTeamPage;
	AddArtistTeamMemberPage: AddArtistTeamMemberPage;
	ArtistPage: ArtistPage;
	ArtistEventsInteractiveMapPage: ArtistEventsInteractiveMapPage;
	ScenePage: ScenePage;
	EventPage: EventPage;
	ViewEventMediaPage: ViewEventMediaPage;
	ViewArtistQRCodePage: ViewArtistQRCodePage;
};

export type EventManagerStackNavigatorParamList = {
	EventManagerPage: EventManagerPage;
	EditEventPage: EditEventPage;
	ChooseEventLocationPage: ChooseEventLocationPage;
	EditArtistEventAboutPage: EditArtistEventAboutPage;
	EditArtistEventTicketsUrlPage: EditArtistEventTicketsUrlPage;
	ManageEventPage: ManageEventPage;
	EventPage: EventPage;
	EditPublishedEventPage: EditPublishedEventPage;
	ViewEventMediaPage: ViewEventMediaPage;
	ArtistPage: ArtistPage;
	ArtistEventsInteractiveMapPage: ArtistEventsInteractiveMapPage;
	ScenePage: ScenePage;
	ViewEventQRCodePage: ViewEventQRCodePage;
};

export type HomeStackNavigatorParamList = {
	HomePage: HomePage;
	ArtistPage: ArtistPage;
	ArtistEventsInteractiveMapPage: ArtistEventsInteractiveMapPage;
	ScenePage: ScenePage;
	EventPage: EventPage;
	ViewEventMediaPage: ViewEventMediaPage;
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

// The tab list for only the artist app
export type ArtistAppBottomTabNavigatorParamList = {
	Search: NavigatorScreenParams<SearchStackNavigatorParamList>;
	Profile: NavigatorScreenParams<ProfileStackNavigatorParamList>;
	EventManager: NavigatorScreenParams<EventManagerStackNavigatorParamList>;
};

export type UserAppBottomTabNavigatorParamList = {
	Home: NavigatorScreenParams<HomeStackNavigatorParamList>;
	Search: NavigatorScreenParams<SearchStackNavigatorParamList>;
	Profile: NavigatorScreenParams<ProfileStackNavigatorParamList>;
};

// This is all the possible tabs
export type BottomTabNavigatorParamList = {
	Home: NavigatorScreenParams<HomeStackNavigatorParamList>;
	Search: NavigatorScreenParams<SearchStackNavigatorParamList>;
	Profile: NavigatorScreenParams<ProfileStackNavigatorParamList>;
	EventManager: NavigatorScreenParams<EventManagerStackNavigatorParamList>;
};

type ComposeTabNavigationProp<T extends ParamListBase> =
	CompositeNavigationProp<
		NativeStackNavigationProp<T>,
		BottomTabNavigationProp<BottomTabNavigatorParamList>
	>;

// Bottom Tab Navigation Props
export type HomeScreenNavigationProp =
	ComposeTabNavigationProp<HomeStackNavigatorParamList>;
export type SearchScreenNavigationProp =
	ComposeTabNavigationProp<SearchStackNavigatorParamList>;
export type ProfileScreenNavigationProp =
	ComposeTabNavigationProp<ProfileStackNavigatorParamList>;
export type EventManagerScreenNavigationProp =
	ComposeTabNavigationProp<EventManagerStackNavigatorParamList>;

export type CompositeScreenNavigationProp = HomeScreenNavigationProp &
	SearchScreenNavigationProp &
	ProfileScreenNavigationProp &
	EventManagerScreenNavigationProp;

export type CompositeStackNavigatorParamList = HomeStackNavigatorParamList &
	SearchStackNavigatorParamList &
	ProfileStackNavigatorParamList &
	EventManagerStackNavigatorParamList;

/**
 * Search Route Props
 */
export type ArtistPageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'ArtistPage'
>;
export type ArtistEventsInteractiveMapPageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'ArtistEventsInteractiveMapPage'
>;
export type ArtistFollowersAndShowsPageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'ArtistFollowersAndShowsPage'
>;
export type ArtistEventsPageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'ArtistEventsPage'
>;
export type ScenePageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'ScenePage'
>;
export type EditContactPageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'EditContactPage'
>;

/**
 * Profile Route Props
 */
export type ProfilePageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'ProfilePage'
>;
export type EditExternalLinkPageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'EditExternalLinkPage'
>;
export type ViewArtistQRCodePageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'ViewArtistQRCodePage'
>;

/**
 * Event Manager Route Props
 */
export type EditEventPageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'EditEventPage'
>;
export type EventPageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'EventPage'
>;

/**
 * Edit Artist Route Props
 */
export type EditArtistPageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'EditArtistPage'
>;
export type ViewEventMediaPageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'ViewEventMediaPage'
>;
export type ChooseEventLocationRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'ChooseEventLocationPage'
>;

/**
 * Artist Event Manager
 */
export type EventManagerPageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'EventManagerPage'
>;
export type EditArtistEventAboutPageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'EditArtistEventAboutPage'
>;
export type ManageEventPageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'ManageEventPage'
>;
export type EditPublishedEventPageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'EditPublishedEventPage'
>;
export type EditArtistEventTicketsUrlPageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'EditArtistEventTicketsUrlPage'
>;
export type ViewEventQRCodePageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'ViewEventQRCodePage'
>;

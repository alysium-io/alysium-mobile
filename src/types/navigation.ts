import { Contact } from '@flux/api/contact';
import { ExternalUrl } from '@flux/api/external-url/external-url.entity';
import { GalleryItem } from '@flux/api/gallery/gallery-item.entity';
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
type LocalEventsMapPage = undefined;

type SearchPage = undefined;

type ArtistPage = { artist_uid: NanoId };
type ArtistFollowersAndShowsPage = {
	artist_uid: NanoId;
	defaultTabIndex: number;
};

type TagPage = { tag_uid: NanoId };
type TagFollowersPage = { tag_uid: NanoId };

type ProfilePage = undefined;

type EditEventPage = { event_uid: NanoId };

type ChooseScenePage = undefined;

type EventPage = { event_uid: NanoId };
type ArtistEventsPage = { artist_uid: NanoId };

type ChooseEventLocationPage = { event_uid: NanoId };

type UserArtistsFollowingPage = undefined;
type UserScenesFollowingPage = undefined;
type UserTagsFollowingPage = undefined;

type TopTagsPage = undefined;

type EditArtistPage = undefined;

type ViewGalleryPage = {
	transitionTagId: string;
	galleryItems: GalleryItem[];
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

export type RouteNames =
	| 'HomePage'
	| 'LocalEventsMapPage'
	| 'SearchPage'
	| 'HostPage'
	| 'HostFollowersAndShowsPage'
	| 'ArtistPage'
	| 'ArtistFollowersAndShowsPage'
	| 'TagPage'
	| 'TagFollowersPage'
	| 'ProfilePage'
	| 'EventManagerPage'
	| 'EditEventPage'
	| 'EventPage'
	| 'EditContractPage'
	| 'UserArtistsFollowingPage'
	| 'UserScenesFollowingPage'
	| 'UserTagsFollowingPage'
	| 'EditArtistEventTicketsUrlPage'
	| 'TopTagsPage'
	| 'EditArtistPage'
	| 'ViewGalleryPage'
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
	| 'EditPublishedEventPage';

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
	ArtistFollowersAndShowsPage: ArtistFollowersAndShowsPage;

	TagPage: TagPage;
	TagFollowersPage: TagFollowersPage;

	UserArtistsFollowingPage: UserArtistsFollowingPage;
	UserScenesFollowingPage: UserScenesFollowingPage;
	UserTagsFollowingPage: UserTagsFollowingPage;

	TopTagsPage: TopTagsPage;

	ViewGalleryPage: ViewGalleryPage;

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
	ViewGalleryPage: ViewGalleryPage;
	ArtistPage: ArtistPage;
};

export type HomeStackNavigatorParamList = {
	HomePage: HomePage;
	LocalEventsMapPage: LocalEventsMapPage;
	ArtistPage: ArtistPage;
	ScenePage: ScenePage;
	EventPage: EventPage;
	ViewGalleryPage: ViewGalleryPage;
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
export type ViewGalleryPageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'ViewGalleryPage'
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

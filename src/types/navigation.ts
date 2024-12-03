import { Contact } from '@flux/api/contact';
import { FindGalleryParamsDto } from '@flux/api/gallery/dto/gallery-find.dto';
import { GalleryRefType } from '@flux/api/gallery/types';
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
type SearchPage = undefined;

type ArtistPage = { artist_uid: NanoId };
type ArtistFollowersAndShowsPage = {
	artist_uid: NanoId;
	defaultTabIndex: number;
};

type TagPage = { tag_uid: NanoId };
type TagFollowersPage = { tag_uid: NanoId };

type ProfilePage = undefined;

type EventManagerPage = undefined;
type EditArtistEventPage = { event_uid: NanoId };

type ChooseScenePage = undefined;

type EventPage = { event_uid: NanoId };
type ArtistEventPage = { event_uid: NanoId };
type ArtistEventsPage = { artist_uid: NanoId };

type EditContractPage = { contract_uid: NanoId };

type ChooseEventLocationPage = { event_uid: NanoId };

type UserArtistsFollowingPage = undefined;
type UserTagsFollowingPage = undefined;

type TopTagsPage = undefined;

type EditArtistPage = undefined;

type ViewGalleryPage = {
	transitionTagId: string;
	findGalleryParamsDto: FindGalleryParamsDto;
	pressIndex: number;
	galleryRefType: GalleryRefType;
};

type ScenePage = { scene_uid: NanoId };

type EditContactPage = { contact: Contact };

export type RouteNames =
	| 'SearchPage'
	| 'HostPage'
	| 'HostFollowersAndShowsPage'
	| 'ArtistPage'
	| 'ArtistFollowersAndShowsPage'
	| 'TagPage'
	| 'TagFollowersPage'
	| 'ProfilePage'
	| 'EventManagerPage'
	| 'EditArtistEventPage'
	| 'EventPage'
	| 'EditContractPage'
	| 'UserArtistsFollowingPage'
	| 'UserTagsFollowingPage'
	| 'TopTagsPage'
	| 'EditArtistPage'
	| 'ViewGalleryPage'
	| 'ChooseScenePage'
	| 'ChooseEventLocationPage'
	| 'ArtistEventPage'
	| 'ArtistEventsPage'
	| 'ScenePage'
	| 'EditContactPage';

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
	UserTagsFollowingPage: UserTagsFollowingPage;

	TopTagsPage: TopTagsPage;

	ViewGalleryPage: ViewGalleryPage;

	ArtistEventPage: ArtistEventPage;
	ArtistEventsPage: ArtistEventsPage;

	ScenePage: ScenePage;
};

export type ProfileStackNavigatorParamList = {
	ProfilePage: ProfilePage;
};

export type EventManagerStackNavigatorParamList = {
	EventManagerPage: EventManagerPage;
	EventPage: EventPage;
	EditContractPage: EditContractPage;
	ArtistPage: ArtistPage;
};

export type EditArtistStackNavigatorParamList = {
	EditArtistPage: EditArtistPage;
	ViewGalleryPage: ViewGalleryPage;
	EditArtistEventPage: EditArtistEventPage;
	ChooseScenePage: ChooseScenePage;
	ArtistPage: ArtistPage;
	ChooseEventLocationPage: ChooseEventLocationPage;
	ScenePage: ScenePage;
	ArtistEventsPage: ArtistEventsPage;
	EditContactPage: EditContactPage;
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
	EditArtist: NavigatorScreenParams<EditArtistStackNavigatorParamList>;
	Profile: NavigatorScreenParams<ProfileStackNavigatorParamList>;
};

export type UserAppBottomTabNavigatorParamList = {
	Search: NavigatorScreenParams<SearchStackNavigatorParamList>;
	Profile: NavigatorScreenParams<ProfileStackNavigatorParamList>;
};

// This is all the possible tabs
export type BottomTabNavigatorParamList = {
	Search: NavigatorScreenParams<SearchStackNavigatorParamList>;
	Profile: NavigatorScreenParams<ProfileStackNavigatorParamList>;
	EventManager: NavigatorScreenParams<EventManagerStackNavigatorParamList>;
	EditArtist: NavigatorScreenParams<EditArtistStackNavigatorParamList>;
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
export type EditArtistScreenNavigationProp =
	ComposeTabNavigationProp<EditArtistStackNavigatorParamList>;

export type CompositeScreenNavigationProp = SearchScreenNavigationProp &
	ProfileScreenNavigationProp &
	EventManagerScreenNavigationProp &
	EditArtistScreenNavigationProp;

export type CompositeStackNavigatorParamList = SearchStackNavigatorParamList &
	ProfileStackNavigatorParamList &
	EventManagerStackNavigatorParamList &
	EditArtistStackNavigatorParamList;

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
export type ArtistEventPageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'ArtistEventPage'
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
export type EventPageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'EventPage'
>;
export type EditContractPageRouteProp = RouteProp<
	CompositeStackNavigatorParamList,
	'EditContractPage'
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

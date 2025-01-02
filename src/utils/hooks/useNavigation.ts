import { Contact } from '@flux/api/contact';
import { ExternalUrl } from '@flux/api/external-url/external-url.entity';
import { GalleryItem } from '@flux/api/gallery/gallery-item.entity';
import { useNavigation as useRNNavigation } from '@react-navigation/native';
import { CompositeScreenNavigationProp, NanoId } from '@types';
import {
	NavigationBehaviorMetadata,
	useBehaviorContext
} from '../contexts/Behavior';

interface IUseNavigation {
	/** Pages */
	artistPage: (
		artist_uid: NanoId,
		navigationMeta: NavigationBehaviorMetadata
	) => void;
	tagPage: (
		tag_uid: NanoId,
		navigationMeta: NavigationBehaviorMetadata
	) => void;
	profilePage: (navigationMeta: NavigationBehaviorMetadata) => void;
	eventPage: (
		event_uid: NanoId,
		navigationMeta: NavigationBehaviorMetadata
	) => void;
	editEventPage: (
		event_uid: NanoId,
		navigationMeta: NavigationBehaviorMetadata
	) => void;
	searchPage: (navigationMeta: NavigationBehaviorMetadata) => void;
	eventManagerPage: (navigationMeta: NavigationBehaviorMetadata) => void;
	userArtistsFollowingPage: (
		navigationMeta: NavigationBehaviorMetadata
	) => void;
	userTagsFollowingPage: (navigationMeta: NavigationBehaviorMetadata) => void;
	topTagsPage: (navigationMeta: NavigationBehaviorMetadata) => void;

	viewGalleryPage: (
		transitionTagId: string,
		galleryItems: GalleryItem[]
	) => void;

	chooseScenePage: () => void;

	chooseEventLocationPage: (event_uid: NanoId) => void;

	artistEventsPage: (
		artist_uid: NanoId,
		navigationMeta: NavigationBehaviorMetadata
	) => void;

	scenePage: (
		scene_uid: NanoId,
		navigationMeta: NavigationBehaviorMetadata
	) => void;

	editArtistPage: () => void;

	editContactsPage: () => void;
	createContactPage: () => void;
	editContactPage: (contact: Contact) => void;

	editExternalLinksPage: () => void;
	editExternalLinkPage: (externalLink: ExternalUrl) => void;
	createExternalLinkPage: () => void;

	editArtistNamePage: () => void;
	editArtistBioPage: () => void;

	editArtistEventAboutPage: (event_uid: NanoId) => void;

	manageEventPage: (event_uid: NanoId) => void;
	editPublishedEventPage: (event_uid: NanoId) => void;

	localEventsMapPage: () => void;

	/** General */
	back: () => void;
}

const useNavigation = (): IUseNavigation => {
	const navigation = useRNNavigation<CompositeScreenNavigationProp>();
	const { navigationBehavior } = useBehaviorContext();

	/**
	 * Pages
	 */

	const artistPage = (
		artist_uid: NanoId,
		navigationMeta: NavigationBehaviorMetadata
	) => {
		navigation.push('ArtistPage', { artist_uid });
		navigationBehavior(navigationMeta);
	};

	const tagPage = (
		tag_uid: NanoId,
		navigationMeta: NavigationBehaviorMetadata
	) => {
		navigation.push('TagPage', { tag_uid });
		navigationBehavior(navigationMeta);
	};

	const profilePage = (navigationMeta: NavigationBehaviorMetadata) => {
		navigation.push('ProfilePage');
		navigationBehavior(navigationMeta);
	};

	const eventPage = (
		event_uid: NanoId,
		navigationMeta: NavigationBehaviorMetadata
	) => {
		navigation.push('EventPage', { event_uid });
		navigationBehavior(navigationMeta);
	};

	const editEventPage = (
		event_uid: NanoId,
		navigationMeta: NavigationBehaviorMetadata
	) => {
		navigation.push('EditEventPage', { event_uid });
		navigationBehavior(navigationMeta);
	};

	const searchPage = (navigationMeta: NavigationBehaviorMetadata) => {
		navigation.push('SearchPage');
		navigationBehavior(navigationMeta);
	};

	const eventManagerPage = (navigationMeta: NavigationBehaviorMetadata) => {
		navigation.push('EventManagerPage');
		navigationBehavior(navigationMeta);
	};

	const userArtistsFollowingPage = (
		navigationMeta: NavigationBehaviorMetadata
	) => {
		navigation.push('UserArtistsFollowingPage');
		navigationBehavior(navigationMeta);
	};

	const userTagsFollowingPage = (
		navigationMeta: NavigationBehaviorMetadata
	) => {
		navigation.push('UserTagsFollowingPage');
		navigationBehavior(navigationMeta);
	};

	const topTagsPage = (navigationMeta: NavigationBehaviorMetadata) => {
		navigation.push('TopTagsPage');
		navigationBehavior(navigationMeta);
	};

	const viewGalleryPage = (
		transitionTagId: string,
		galleryItems: GalleryItem[]
	) => {
		navigation.navigate('ViewGalleryPage', {
			transitionTagId,
			galleryItems
		});
	};

	const chooseScenePage = () => {
		navigation.navigate('ChooseScenePage');
	};

	const chooseEventLocationPage = (event_uid: NanoId) => {
		navigation.navigate('ChooseEventLocationPage', { event_uid });
	};

	const artistEventsPage = (
		artist_uid: NanoId,
		navigationMeta: NavigationBehaviorMetadata
	) => {
		navigation.push('ArtistEventsPage', { artist_uid });
		navigationBehavior(navigationMeta);
	};

	const scenePage = (
		scene_uid: NanoId,
		navigationMeta: NavigationBehaviorMetadata
	) => {
		navigation.push('ScenePage', { scene_uid });
		navigationBehavior(navigationMeta);
	};

	const editContactPage = (contact: Contact) => {
		navigation.push('EditContactPage', { contact });
	};

	const editArtistPage = () => {
		navigation.push('EditArtistPage');
	};

	const editContactsPage = () => {
		navigation.push('EditContactsPage');
	};

	const createContactPage = () => {
		navigation.push('CreateContactPage');
	};

	const editExternalLinksPage = () => {
		navigation.push('EditExternalLinksPage');
	};

	const editExternalLinkPage = (externalLink: ExternalUrl) => {
		navigation.push('EditExternalLinkPage', { externalLink });
	};

	const createExternalLinkPage = () => {
		navigation.push('CreateExternalLinkPage');
	};

	const editArtistNamePage = () => {
		navigation.push('EditArtistNamePage');
	};

	const editArtistBioPage = () => {
		navigation.push('EditArtistBioPage');
	};

	const editArtistEventAboutPage = (event_uid: NanoId) => {
		navigation.push('EditArtistEventAboutPage', { event_uid });
	};

	const manageEventPage = (event_uid: NanoId) => {
		navigation.push('ManageEventPage', { event_uid });
	};

	const editPublishedEventPage = (event_uid: NanoId) => {
		navigation.push('EditPublishedEventPage', { event_uid });
	};

	const localEventsMapPage = () => {
		navigation.push('LocalEventsMapPage');
	};

	/**
	 * General
	 */
	const back = () => navigation.goBack();

	return {
		artistPage,
		tagPage,
		profilePage,
		eventPage,
		editEventPage,
		searchPage,
		eventManagerPage,
		userArtistsFollowingPage,
		userTagsFollowingPage,
		topTagsPage,
		viewGalleryPage,
		chooseScenePage,
		chooseEventLocationPage,
		artistEventsPage,
		scenePage,
		editContactPage,
		editArtistPage,
		editContactsPage,
		createContactPage,
		editExternalLinksPage,
		editExternalLinkPage,
		createExternalLinkPage,
		editArtistNamePage,
		editArtistBioPage,
		editArtistEventAboutPage,
		manageEventPage,
		editPublishedEventPage,
		localEventsMapPage,
		back
	};
};

export default useNavigation;

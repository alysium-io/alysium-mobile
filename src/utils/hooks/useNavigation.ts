import { Contact } from '@flux/api/contact';
import { EventMedia } from '@flux/api/event-media/event-media.entity';
import { ExternalUrl } from '@flux/api/external-url/external-url.entity';
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
	artistEventsInteractiveMapPage: (artist_uid: NanoId) => void;
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
	userScenesFollowingPage: (navigationMeta: NavigationBehaviorMetadata) => void;

	viewEventMediaPage: (event_uid: NanoId, initialIndex: number) => void;

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
	editArtistEventTicketsUrlPage: (event_uid: NanoId) => void;

	manageEventPage: (event_uid: NanoId) => void;
	editPublishedEventPage: (event_uid: NanoId) => void;

	editArtistTeamPage: () => void;
	addArtistTeamMemberPage: () => void;

	viewEventQRCodePage: (event_uid: NanoId) => void;
	viewArtistQRCodePage: (artist_uid: NanoId) => void;

	editEventMediaPage: (event_uid: NanoId) => void;

	previewEventMediaPage: (event_uid: NanoId, eventMedia: EventMedia) => void;

	editColorThemePage: () => void;

	editFanAccountPage: () => void;
	editFanHandlePage: () => void;

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

	const artistEventsInteractiveMapPage = (artist_uid: NanoId) => {
		navigation.push('ArtistEventsInteractiveMapPage', { artist_uid });
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

	const userScenesFollowingPage = (
		navigationMeta: NavigationBehaviorMetadata
	) => {
		navigation.push('UserScenesFollowingPage');
		navigationBehavior(navigationMeta);
	};

	const viewEventMediaPage = (event_uid: NanoId, initialIndex: number) => {
		navigation.push('ViewEventMediaPage', {
			event_uid,
			initialIndex
		});
	};

	const chooseScenePage = () => {
		navigation.push('ChooseScenePage');
	};

	const chooseEventLocationPage = (event_uid: NanoId) => {
		navigation.push('ChooseEventLocationPage', { event_uid });
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

	const editArtistEventTicketsUrlPage = (event_uid: NanoId) => {
		navigation.push('EditArtistEventTicketsUrlPage', { event_uid });
	};

	const manageEventPage = (event_uid: NanoId) => {
		navigation.push('ManageEventPage', { event_uid });
	};

	const editPublishedEventPage = (event_uid: NanoId) => {
		navigation.push('EditPublishedEventPage', { event_uid });
	};

	const editArtistTeamPage = () => {
		navigation.push('EditArtistTeamPage');
	};

	const addArtistTeamMemberPage = () => {
		navigation.push('AddArtistTeamMemberPage');
	};

	const viewEventQRCodePage = (event_uid: NanoId) => {
		navigation.push('ViewEventQRCodePage', { event_uid });
	};

	const viewArtistQRCodePage = (artist_uid: NanoId) => {
		navigation.push('ViewArtistQRCodePage', { artist_uid });
	};

	const editEventMediaPage = (event_uid: NanoId) => {
		navigation.push('EditEventMediaPage', { event_uid });
	};

	const previewEventMediaPage = (event_uid: NanoId, eventMedia: EventMedia) => {
		navigation.push('PreviewEventMediaPage', { event_uid, eventMedia });
	};

	const editColorThemePage = () => {
		navigation.push('EditColorThemePage');
	};

	const editFanAccountPage = () => {
		navigation.push('EditFanAccountPage');
	};

	const editFanHandlePage = () => {
		navigation.push('EditFanHandlePage');
	};

	/**
	 * General
	 */
	const back = () => navigation.goBack();

	return {
		artistPage,
		artistEventsInteractiveMapPage,
		profilePage,
		eventPage,
		editEventPage,
		searchPage,
		eventManagerPage,
		userArtistsFollowingPage,
		userScenesFollowingPage,
		viewEventMediaPage,
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
		editArtistEventTicketsUrlPage,
		manageEventPage,
		editPublishedEventPage,
		editArtistTeamPage,
		addArtistTeamMemberPage,
		viewEventQRCodePage,
		viewArtistQRCodePage,
		editEventMediaPage,
		previewEventMediaPage,
		editColorThemePage,
		editFanAccountPage,
		editFanHandlePage,
		back
	};
};

export default useNavigation;

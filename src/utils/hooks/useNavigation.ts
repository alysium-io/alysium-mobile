import { Contact } from '@flux/api/contact';
import { FindGalleryParamsDto } from '@flux/api/gallery/dto/gallery-find.dto';
import { GalleryRefType } from '@flux/api/gallery/types';
import { useNavigation as useRNNavigation } from '@react-navigation/native';
import { CompositeScreenNavigationProp, NanoId } from '@types';
import {
	NavigationBehaviorMetadata,
	useBehaviorContext
} from '../contexts/Behavior';

interface IUseNavigation {
	/** Pages */
	hostPage: (
		host_uid: NanoId,
		navigationMeta: NavigationBehaviorMetadata
	) => void;
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
	eventCandidatesPage: (
		event_uid: NanoId,
		navigationMeta: NavigationBehaviorMetadata
	) => void;
	editEventTicketTypesPage: (
		event_uid: NanoId,
		navigationMeta: NavigationBehaviorMetadata
	) => void;
	editTicketTypePage: (
		ticket_collection_uid: NanoId,
		ticket_type_uid: NanoId,
		navigationMeta: NavigationBehaviorMetadata
	) => void;
	editArtistEventPage: (
		event_uid: NanoId,
		navigationMeta: NavigationBehaviorMetadata
	) => void;
	editVenuePage: (
		venue_uid: NanoId,
		navigationMeta: NavigationBehaviorMetadata
	) => void;
	editContractPage: (
		contract_uid: NanoId,
		navigationMeta: NavigationBehaviorMetadata
	) => void;
	searchPage: (navigationMeta: NavigationBehaviorMetadata) => void;
	eventManagerPage: (navigationMeta: NavigationBehaviorMetadata) => void;
	contractManager: (navigationMeta: NavigationBehaviorMetadata) => void;
	artistViewContract: (
		contract_uid: NanoId,
		navigationMeta: NavigationBehaviorMetadata
	) => void;
	userArtistsFollowingPage: (
		navigationMeta: NavigationBehaviorMetadata
	) => void;
	userTagsFollowingPage: (navigationMeta: NavigationBehaviorMetadata) => void;
	topTagsPage: (navigationMeta: NavigationBehaviorMetadata) => void;

	viewGalleryPage: (
		transitionTagId: string,
		pressIndex: number,
		findGalleryParamsDto: FindGalleryParamsDto,
		galleryRefType: GalleryRefType
	) => void;

	chooseScenePage: () => void;

	chooseEventLocationPage: (event_uid: NanoId) => void;

	artistEventPage: (
		event_uid: NanoId,
		navigationMeta: NavigationBehaviorMetadata
	) => void;

	artistEventsPage: (
		artist_uid: NanoId,
		navigationMeta: NavigationBehaviorMetadata
	) => void;

	scenePage: (
		scene_uid: NanoId,
		navigationMeta: NavigationBehaviorMetadata
	) => void;

	editContactPage: (contact: Contact) => void;

	/** General */
	back: () => void;
}

const useNavigation = (): IUseNavigation => {
	const navigation = useRNNavigation<CompositeScreenNavigationProp>();
	const { navigationBehavior } = useBehaviorContext();

	/**
	 * Pages
	 */
	const hostPage = (
		host_uid: NanoId,
		navigationMeta: NavigationBehaviorMetadata
	) => {
		navigation.push('HostPage', { host_uid });
		navigationBehavior(navigationMeta);
	};

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

	const eventCandidatesPage = (
		event_uid: NanoId,
		navigationMeta: NavigationBehaviorMetadata
	) => {
		navigation.push('EventCandidatesPage', { event_uid });
		navigationBehavior(navigationMeta);
	};

	const editEventTicketTypesPage = (
		event_uid: NanoId,
		navigationMeta: NavigationBehaviorMetadata
	) => {
		navigation.push('EditEventTicketTypesPage', {
			event_uid
		});
		navigationBehavior(navigationMeta);
	};

	const editTicketTypePage = (
		ticket_collection_uid: NanoId,
		ticket_type_uid: NanoId,
		navigationMeta: NavigationBehaviorMetadata
	) => {
		navigation.push('EditTicketTypePage', {
			ticket_collection_uid,
			ticket_type_uid
		});
		navigationBehavior(navigationMeta);
	};

	const editArtistEventPage = (
		event_uid: NanoId,
		navigationMeta: NavigationBehaviorMetadata
	) => {
		navigation.push('EditArtistEventPage', { event_uid });
		navigationBehavior(navigationMeta);
	};

	const editVenuePage = (
		venue_uid: NanoId,
		navigationMeta: NavigationBehaviorMetadata
	) => {
		navigation.push('EditVenuePage', { venue_uid });
		navigationBehavior(navigationMeta);
	};

	const editContractPage = (
		contract_uid: NanoId,
		navigationMeta: NavigationBehaviorMetadata
	) => {
		navigation.push('EditContractPage', { contract_uid });
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

	const contractManager = (navigationMeta: NavigationBehaviorMetadata) => {
		navigation.push('ContractManagerPage');
		navigationBehavior(navigationMeta);
	};

	const artistViewContract = (
		contract_uid: NanoId,
		navigationMeta: NavigationBehaviorMetadata
	) => {
		navigation.push('ArtistViewContractPage', { contract_uid });
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
		pressIndex: number,
		findGalleryParamsDto: FindGalleryParamsDto,
		galleryRefType: GalleryRefType
	) => {
		navigation.navigate('ViewGalleryPage', {
			transitionTagId,
			pressIndex,
			findGalleryParamsDto,
			galleryRefType
		});
	};

	const chooseScenePage = () => {
		navigation.navigate('ChooseScenePage');
	};

	const chooseEventLocationPage = (event_uid: NanoId) => {
		navigation.navigate('ChooseEventLocationPage', { event_uid });
	};

	const artistEventPage = (
		event_uid: NanoId,
		navigationMeta: NavigationBehaviorMetadata
	) => {
		navigation.push('ArtistEventPage', { event_uid });
		navigationBehavior(navigationMeta);
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

	/**
	 * General
	 */
	const back = () => navigation.goBack();

	return {
		hostPage,
		artistPage,
		tagPage,
		profilePage,
		eventPage,
		eventCandidatesPage,
		editEventTicketTypesPage,
		editTicketTypePage,
		editArtistEventPage,
		editVenuePage,
		editContractPage,
		searchPage,
		eventManagerPage,
		contractManager,
		artistViewContract,
		userArtistsFollowingPage,
		userTagsFollowingPage,
		topTagsPage,
		viewGalleryPage,
		chooseScenePage,
		chooseEventLocationPage,
		artistEventPage,
		artistEventsPage,
		scenePage,
		editContactPage,
		back
	};
};

export default useNavigation;

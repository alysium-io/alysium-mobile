import { FindGalleryParamsDto } from '@flux/api/gallery/dto/gallery-find.dto';
import { useNavigation as useRNNavigation } from '@react-navigation/native';
import { ApiIdentifier, CompositeScreenNavigationProp } from '@types';
import {
	NavigationBehaviorMetadata,
	useBehaviorContext
} from '../contexts/Behavior';

interface IUseNavigation {
	/** Pages */
	hostPage: (
		host_uid: ApiIdentifier,
		navigationMeta: NavigationBehaviorMetadata
	) => void;
	artistPage: (
		artist_uid: ApiIdentifier,
		navigationMeta: NavigationBehaviorMetadata
	) => void;
	tagPage: (
		tag_uid: ApiIdentifier,
		navigationMeta: NavigationBehaviorMetadata
	) => void;
	locationPage: (
		location_uid: ApiIdentifier,
		navigationMeta: NavigationBehaviorMetadata
	) => void;
	profilePage: (navigationMeta: NavigationBehaviorMetadata) => void;
	eventPage: (
		event_uid: ApiIdentifier,
		navigationMeta: NavigationBehaviorMetadata
	) => void;
	eventCandidatesPage: (
		event_uid: ApiIdentifier,
		navigationMeta: NavigationBehaviorMetadata
	) => void;
	editEventTicketTypesPage: (
		event_uid: ApiIdentifier,
		navigationMeta: NavigationBehaviorMetadata
	) => void;
	editTicketTypePage: (
		ticket_collection_uid: ApiIdentifier,
		ticket_type_uid: ApiIdentifier,
		navigationMeta: NavigationBehaviorMetadata
	) => void;
	editArtistEventPage: (
		event_uid: ApiIdentifier,
		navigationMeta: NavigationBehaviorMetadata
	) => void;
	editVenuePage: (
		venue_uid: ApiIdentifier,
		navigationMeta: NavigationBehaviorMetadata
	) => void;
	editContractPage: (
		contract_uid: ApiIdentifier,
		navigationMeta: NavigationBehaviorMetadata
	) => void;
	searchPage: (navigationMeta: NavigationBehaviorMetadata) => void;
	eventManagerPage: (navigationMeta: NavigationBehaviorMetadata) => void;
	contractManager: (navigationMeta: NavigationBehaviorMetadata) => void;
	artistViewContract: (
		contract_uid: ApiIdentifier,
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
		findGalleryParamsDto: FindGalleryParamsDto
	) => void;

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
		host_uid: ApiIdentifier,
		navigationMeta: NavigationBehaviorMetadata
	) => {
		navigation.push('HostPage', { host_uid });
		navigationBehavior(navigationMeta);
	};

	const artistPage = (
		artist_uid: ApiIdentifier,
		navigationMeta: NavigationBehaviorMetadata
	) => {
		navigation.push('ArtistPage', { artist_uid });
		navigationBehavior(navigationMeta);
	};

	const tagPage = (
		tag_uid: ApiIdentifier,
		navigationMeta: NavigationBehaviorMetadata
	) => {
		navigation.push('TagPage', { tag_uid });
		navigationBehavior(navigationMeta);
	};

	const locationPage = (
		location_uid: ApiIdentifier,
		navigationMeta: NavigationBehaviorMetadata
	) => {
		navigation.push('LocationPage', { location_uid });
		navigationBehavior(navigationMeta);
	};

	const profilePage = (navigationMeta: NavigationBehaviorMetadata) => {
		navigation.push('ProfilePage');
		navigationBehavior(navigationMeta);
	};

	const eventPage = (
		event_uid: ApiIdentifier,
		navigationMeta: NavigationBehaviorMetadata
	) => {
		navigation.push('EventPage', { event_uid });
		navigationBehavior(navigationMeta);
	};

	const eventCandidatesPage = (
		event_uid: ApiIdentifier,
		navigationMeta: NavigationBehaviorMetadata
	) => {
		navigation.push('EventCandidatesPage', { event_uid });
		navigationBehavior(navigationMeta);
	};

	const editEventTicketTypesPage = (
		event_uid: ApiIdentifier,
		navigationMeta: NavigationBehaviorMetadata
	) => {
		navigation.push('EditEventTicketTypesPage', {
			event_uid
		});
		navigationBehavior(navigationMeta);
	};

	const editTicketTypePage = (
		ticket_collection_uid: ApiIdentifier,
		ticket_type_uid: ApiIdentifier,
		navigationMeta: NavigationBehaviorMetadata
	) => {
		navigation.push('EditTicketTypePage', {
			ticket_collection_uid,
			ticket_type_uid
		});
		navigationBehavior(navigationMeta);
	};

	const editArtistEventPage = (
		event_uid: ApiIdentifier,
		navigationMeta: NavigationBehaviorMetadata
	) => {
		navigation.push('EditArtistEventPage', { event_uid });
		navigationBehavior(navigationMeta);
	};

	const editVenuePage = (
		venue_uid: ApiIdentifier,
		navigationMeta: NavigationBehaviorMetadata
	) => {
		navigation.push('EditVenuePage', { venue_uid });
		navigationBehavior(navigationMeta);
	};

	const editContractPage = (
		contract_uid: ApiIdentifier,
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
		contract_uid: ApiIdentifier,
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
		findGalleryParamsDto: FindGalleryParamsDto
	) => {
		navigation.navigate('ViewGalleryPage', {
			transitionTagId,
			pressIndex,
			findGalleryParamsDto
		});
	};

	/**
	 * General
	 */
	const back = () => navigation.goBack();

	return {
		hostPage,
		artistPage,
		tagPage,
		locationPage,
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
		back
	};
};

export default useNavigation;

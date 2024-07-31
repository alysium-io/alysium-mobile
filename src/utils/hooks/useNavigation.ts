import { useNavigation as useRNNavigation } from '@react-navigation/native';
import { ApiIdentifier, CompositeScreenNavigationProp } from '@types';

interface IUseNavigation {
	/** Pages */
	hostPage: (host_uid: ApiIdentifier) => void;
	artistPage: (artist_uid: ApiIdentifier) => void;
	tagPage: (tag_uid: ApiIdentifier) => void;
	locationPage: (location_uid: ApiIdentifier) => void;
	profilePage: () => void;
	eventPage: (event_uid: ApiIdentifier) => void;
	editEventPage: (event_uid: ApiIdentifier) => void;
	eventCandidatesPage: (event_uid: ApiIdentifier) => void;
	editVenuePage: (venue_uid: ApiIdentifier) => void;
	editContractPage: (contract_uid: ApiIdentifier) => void;
	searchPage: () => void;
	eventManagerPage: () => void;
	contractManager: () => void;
	artistViewContract: (contract_uid: ApiIdentifier) => void;
	editEventTicketTypesPage: (event_uid: ApiIdentifier) => void;
	editTicketTypePage: (
		ticket_collection_uid: ApiIdentifier,
		ticket_type_uid: ApiIdentifier
	) => void;
	userArtistsFollowingPage: () => void;
	userTagsFollowingPage: () => void;

	/** General */
	back: () => void;
}

const useNavigation = (): IUseNavigation => {
	const navigation = useRNNavigation<CompositeScreenNavigationProp>();

	/**
	 * Pages
	 */
	const hostPage = (host_uid: ApiIdentifier) =>
		navigation.push('HostPage', { host_uid });

	const artistPage = (artist_uid: ApiIdentifier) =>
		navigation.push('ArtistPage', { artist_uid });

	const tagPage = (tag_uid: ApiIdentifier) =>
		navigation.push('TagPage', { tag_uid });

	const locationPage = (location_uid: ApiIdentifier) =>
		navigation.push('LocationPage', { location_uid });

	const profilePage = () => navigation.push('ProfilePage');

	const eventPage = (event_uid: ApiIdentifier) =>
		navigation.push('EventPage', { event_uid });

	const eventCandidatesPage = (event_uid: ApiIdentifier) =>
		navigation.push('EventCandidatesPage', { event_uid });

	const editEventTicketTypesPage = (event_uid: ApiIdentifier) =>
		navigation.push('EditEventTicketTypesPage', {
			event_uid
		});

	const editTicketTypePage = (
		ticket_collection_uid: ApiIdentifier,
		ticket_type_uid: ApiIdentifier
	) =>
		navigation.push('EditTicketTypePage', {
			ticket_collection_uid,
			ticket_type_uid
		});

	const editEventPage = (event_uid: ApiIdentifier) =>
		navigation.push('EditEventPage', { event_uid });

	const editVenuePage = (venue_uid: ApiIdentifier) =>
		navigation.push('EditVenuePage', { venue_uid });

	const editContractPage = (contract_uid: ApiIdentifier) =>
		navigation.push('EditContractPage', { contract_uid });

	const searchPage = () => navigation.push('SearchPage');

	const eventManagerPage = () => navigation.push('EventManagerPage');

	const contractManager = () => navigation.push('ContractManagerPage');

	const artistViewContract = (contract_uid: ApiIdentifier) =>
		navigation.push('ArtistViewContractPage', { contract_uid });

	const userArtistsFollowingPage = () =>
		navigation.push('UserArtistsFollowingPage');

	const userTagsFollowingPage = () => navigation.push('UserTagsFollowingPage');

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
		editEventPage,
		editVenuePage,
		editContractPage,
		searchPage,
		eventManagerPage,
		contractManager,
		artistViewContract,
		userArtistsFollowingPage,
		userTagsFollowingPage,
		back
	};
};

export default useNavigation;

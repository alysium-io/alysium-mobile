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

	/** General */
	back: () => void;
}

const useNavigation = (): IUseNavigation => {
	const navigation = useRNNavigation<CompositeScreenNavigationProp>();

	/**
	 * Pages
	 */
	const hostPage = (host_uid: ApiIdentifier) =>
		navigation.navigate('HostPage', { host_uid });

	const artistPage = (artist_uid: ApiIdentifier) =>
		navigation.navigate('ArtistPage', { artist_uid });

	const tagPage = (tag_uid: ApiIdentifier) =>
		navigation.navigate('TagPage', { tag_uid });

	const locationPage = (location_uid: ApiIdentifier) =>
		navigation.navigate('LocationPage', { location_uid });

	const profilePage = () => navigation.navigate('ProfilePage');

	const eventPage = (event_uid: ApiIdentifier) =>
		navigation.navigate('EventPage', { event_uid });

	const eventCandidatesPage = (event_uid: ApiIdentifier) =>
		navigation.navigate('EventCandidatesPage', { event_uid });

	const editEventTicketTypesPage = (event_uid: ApiIdentifier) =>
		navigation.navigate('EditEventTicketTypesPage', {
			event_uid
		});

	const editTicketTypePage = (
		ticket_collection_uid: ApiIdentifier,
		ticket_type_uid: ApiIdentifier
	) =>
		navigation.navigate('EditTicketTypePage', {
			ticket_collection_uid,
			ticket_type_uid
		});

	const editEventPage = (event_uid: ApiIdentifier) =>
		navigation.navigate('EditEventPage', { event_uid });

	const editVenuePage = (venue_uid: ApiIdentifier) =>
		navigation.navigate('EditVenuePage', { venue_uid });

	const editContractPage = (contract_uid: ApiIdentifier) =>
		navigation.navigate('EditContractPage', { contract_uid });

	const searchPage = () => navigation.navigate('SearchPage');

	const eventManagerPage = () => navigation.navigate('EventManagerPage');

	const contractManager = () => navigation.navigate('ContractManagerPage');

	const artistViewContract = (contract_uid: ApiIdentifier) =>
		navigation.navigate('ArtistViewContractPage', { contract_uid });

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
		back
	};
};

export default useNavigation;

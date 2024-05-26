import { useNavigation as useRNNavigation } from '@react-navigation/native';
import { ApiIdentifier, CompositeScreenNavigationProp } from '@types';

interface IUseNavigation {
	/** Pages */
	hostPage: (hostId: ApiIdentifier) => void;
	artistPage: (artistId: ApiIdentifier) => void;
	tagPage: (tagId: ApiIdentifier) => void;
	locationPage: (locationId: ApiIdentifier) => void;
	profilePage: () => void;
	eventPage: (eventId: ApiIdentifier) => void;
	editEventPage: (eventId: ApiIdentifier) => void;
	eventCandidatesPage: (eventId: ApiIdentifier) => void;
	editVenuePage: (venueId: ApiIdentifier) => void;
	editContractPage: (contractId: ApiIdentifier) => void;
	searchPage: () => void;
	eventManagerPage: () => void;
	contractManager: () => void;
	artistViewContract: (contractId: ApiIdentifier) => void;

	/** General */
	back: () => void;
}

const useNavigation = (): IUseNavigation => {
	const navigation = useRNNavigation<CompositeScreenNavigationProp>();

	/**
	 * Pages
	 */
	const hostPage = (hostId: ApiIdentifier) =>
		navigation.navigate('HostPage', { hostId });
	const artistPage = (artistId: ApiIdentifier) =>
		navigation.navigate('ArtistPage', { artistId });
	const tagPage = (tagId: ApiIdentifier) =>
		navigation.navigate('TagPage', { tagId });
	const locationPage = (locationId: ApiIdentifier) =>
		navigation.navigate('LocationPage', { locationId });
	const profilePage = () => navigation.navigate('ProfilePage');
	const eventPage = (eventId: ApiIdentifier) =>
		navigation.navigate('EventPage', { eventId });
	const eventCandidatesPage = (eventId: ApiIdentifier) =>
		navigation.navigate('EventCandidatesPage', { eventId });
	const editEventPage = (eventId: ApiIdentifier) =>
		navigation.navigate('EditEventPage', { eventId });
	const editVenuePage = (venueId: ApiIdentifier) =>
		navigation.navigate('EditVenuePage', { venueId });
	const editContractPage = (contractId: ApiIdentifier) =>
		navigation.navigate('EditContractPage', { contractId });
	const searchPage = () => navigation.navigate('SearchPage');
	const eventManagerPage = () => navigation.navigate('EventManagerPage');
	const contractManager = () => navigation.navigate('ContractManagerPage');
	const artistViewContract = (contractId: ApiIdentifier) =>
		navigation.navigate('ArtistViewContractPage', { contractId });
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

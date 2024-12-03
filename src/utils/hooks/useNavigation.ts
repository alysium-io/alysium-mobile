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
	editArtistEventPage: (
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

	const editArtistEventPage = (
		event_uid: NanoId,
		navigationMeta: NavigationBehaviorMetadata
	) => {
		navigation.push('EditArtistEventPage', { event_uid });
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
		artistPage,
		tagPage,
		profilePage,
		eventPage,
		editArtistEventPage,
		searchPage,
		eventManagerPage,
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

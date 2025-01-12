import {
	ArtistSearchItem,
	SceneSearchItem
} from '@flux/api/search/search.entity';
import { useNavigation, usePersistedSearchState } from '@hooks';

interface IUsePressSearchIteraction {
	onPressArtistSearchItem: (item: ArtistSearchItem) => void;
	onPressSceneSearchItem: (item: SceneSearchItem) => void;
}

const usePressSearchIteraction = (): IUsePressSearchIteraction => {
	const { addArtistRecentSearch, addSceneRecentSearch } =
		usePersistedSearchState();
	const { artistPage, scenePage } = useNavigation();

	const onPressArtistSearchItem = (item: ArtistSearchItem) => {
		addArtistRecentSearch(item);
		artistPage(item.uid, {
			from: 'SearchPage',
			to: 'ArtistPage',
			to_uid: item.uid,
			using: 'ARTIST_SEARCH_RESULT'
		});
	};

	const onPressSceneSearchItem = (item: SceneSearchItem) => {
		addSceneRecentSearch(item);
		scenePage(item.uid, {
			from: 'SearchPage',
			to: 'ScenePage',
			to_uid: item.uid,
			using: 'SCENE_SEARCH_RESULT'
		});
	};

	return {
		onPressArtistSearchItem,
		onPressSceneSearchItem
	};
};

export default usePressSearchIteraction;

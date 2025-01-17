import {
	ArtistSearchItem,
	SceneSearchItem
} from '@flux/api/search/search.entity';
import { usePersistedArray } from '@flux/local/arrays/usePersistedArray';
import { useNavigation } from '@hooks';

interface IUsePressSearchIteraction {
	onPressArtistSearchItem: (item: ArtistSearchItem) => void;
	onPressSceneSearchItem: (item: SceneSearchItem) => void;
}

const usePressSearchIteraction = (): IUsePressSearchIteraction => {
	const { add: addArtist } = usePersistedArray('homeRecentSearchArtists');
	const { add: addScene } = usePersistedArray('homeRecentSearchScenes');
	const { artistPage, scenePage } = useNavigation();

	const onPressArtistSearchItem = (item: ArtistSearchItem) => {
		addArtist(item);
		artistPage(item.uid, {
			from: 'SearchPage',
			to: 'ArtistPage',
			to_uid: item.uid,
			using: 'ARTIST_SEARCH_RESULT'
		});
	};

	const onPressSceneSearchItem = (item: SceneSearchItem) => {
		addScene(item);
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

import { env } from '@etc';
import { LinkingOptions, PathConfig } from '@react-navigation/native';
import {
	ArtistAppBottomTabNavigatorParamList,
	SearchStackNavigatorParamList,
	UserAppBottomTabNavigatorParamList
} from '@types';

/**
 * Configuration for Deep Linking
 */

// Prefixes for deep linking
export const UNIVERSAL_LINK_PREFIX = env.env?.webUrl as string;
const prefixes: string[] = [UNIVERSAL_LINK_PREFIX];

// Specific page configurations
const artistPageConfigMap = {
	path: 'artist/:artist_uid',
	parse: {
		artist_uid: (artist_uid: string) => artist_uid
	}
};

const eventPageConfigMap = {
	path: 'artist/event/:event_uid',
	parse: {
		event_uid: (event_uid: string) => event_uid
	}
};

// Tab configurations (all apps share the search tab, so they're prolly all gunna be the same)
const searchTabConfigMap: PathConfig<SearchStackNavigatorParamList> = {
	initialRouteName: 'SearchPage',
	screens: {
		ArtistPage: artistPageConfigMap,
		EventPage: eventPageConfigMap
	}
};

// App level configurations
export const artistAppDeepLinkingConfig: LinkingOptions<ArtistAppBottomTabNavigatorParamList> =
	{
		prefixes,
		config: {
			initialRouteName: 'Search',
			screens: {
				Search: searchTabConfigMap
			}
		}
	};

export const userAppDeepLinkingConfig: LinkingOptions<UserAppBottomTabNavigatorParamList> =
	{
		prefixes,
		config: {
			initialRouteName: 'Search',
			screens: {
				Search: searchTabConfigMap
			}
		}
	};

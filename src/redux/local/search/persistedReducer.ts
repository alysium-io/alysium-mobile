import configurePersistor from '../utils/configurePersistor';
import { searchReducer } from './slice';
import { SearchState } from './types';

const persistedSearchReducer = configurePersistor<SearchState>(
	'search',
	['recentSearches'],
	searchReducer
);

export default persistedSearchReducer;

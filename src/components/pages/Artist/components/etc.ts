import { MediaType } from '@flux/api/media/types';
import { NanoId } from '@types';
import { Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export type HistoricalListItemProps = {
	event_uid: NanoId;
	event_media: HistoricalListItemCellProps;
	date?: string | null;
	location?: string | null;
	number_of_media: number;
	index: number;
	currentViewIndex: number;
};

export type HistoricalListItemCellProps = {
	event_media_uid: string;
	uri?: string;
	type: MediaType;
};

export const HISTORICAL_LIST_ITEM_HEIGHT = SCREEN_HEIGHT * 0.65;

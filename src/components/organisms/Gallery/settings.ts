import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
export const GALLERY_ITEM_MARGIN = 1;
export const GALLERY_ITEM_SIZE = (SCREEN_WIDTH - GALLERY_ITEM_MARGIN * 2) / 3;
export const GALLERY_ROW_LENGTH = 3;
export const GALLERY_LENGTH = 6;

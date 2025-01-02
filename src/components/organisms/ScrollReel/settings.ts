import { Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const REEL_HEIGHT = SCREEN_HEIGHT * 0.95;
export const OUTER_VIEW_BORDER_RADIUS = 50;
export const HORIZONTAL_DETATCH_THRESHOLD = 50;
export const DETATCH_ACTIVATE_X_THRESHOLD = 10;
export const DETATCH_ACTIVATE_Y_THRESHOLD = 10;
export const DETATCH_ACTIVATE_BACK_DISTANCE_THRESHOLD = 100;

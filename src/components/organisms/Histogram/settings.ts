import { Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DEFAULT_GRAPH_HEIGHT = SCREEN_HEIGHT * 0.2;

const DEFAULT_BAR_MARGIN = 1;
const DEFAULT_BAR_RADIUS = 5;

const DEFAULT_VALUE_MIN = 0;
const DEFAULT_VALUE_MAX = 1;

export interface BarData {
	value: number; // number between VALUE_MIN and VALUE_MAX
	color: string;
}

export interface HistogramSettings {
	graphHeight: number;
	graphWidth: number;
	valueMin: number;
	valueMax: number;
	barMargin: number;
	barWidth: number;
	barRadius: number;
	graphLoaded: boolean;
}

export const defaultHistogramSettings: HistogramSettings = {
	graphHeight: DEFAULT_GRAPH_HEIGHT,
	graphWidth: 0, // calculated by onLayout
	valueMin: DEFAULT_VALUE_MIN,
	valueMax: DEFAULT_VALUE_MAX,
	barMargin: DEFAULT_BAR_MARGIN,
	barWidth: 0, // calculated in Histogram.tsx
	barRadius: DEFAULT_BAR_RADIUS,
	graphLoaded: false
};

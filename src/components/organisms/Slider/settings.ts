import _ from 'lodash';

const TRACK_HEIGHT = 1;

const DEFAULT_TRACK_HEIGHT = TRACK_HEIGHT;
const DEFAULT_TRACK_COLOR = '#dddddd';

const DEFAULT_ACTIVE_TRACK_HEIGHT = TRACK_HEIGHT;
const DEFAULT_ACTIVE_TRACK_COLOR = '#333333';

const DEFAULT_THUMB_SIZE = 35;
const DEFAULT_THUMB_BORDER_WIDTH = 1;
const DEFAULT_THUMB_BORDER_COLOR = '#000000';
const DEFAULT_THUMB_BACKGROUND_COLOR = '#ffffff';
const DEFAULT_THUMB_BORDER_RADIUS = 999;

const DEFAULT_MARKER_SIZE = 4;
const DEFAULT_ACTIVE_MARKER_COLOR = '#333333';
const DEFAULT_INACTIVE_MARKER_COLOR = '#dddddd';
const DEFAULT_INCLUDE_MARKERS = true;

const DEFAULT_STEPS = null;

export type SliderSettings = {
	loaded: boolean;

	trackWidth: number;
	trackHeight: number;
	trackColor: string;

	activeTrackHeight: number;
	activeTrackColor: string;

	thumbSize: number;
	thumbBorderWidth: number;
	thumbBorderColor: string;
	thumbBackgroundColor: string;
	thumbBorderRadius: number;

	markerSize: number;
	activeMarkerColor: string;
	inactiveMarkerColor: string;
	includeMarkers: boolean;

	defaultMinPosition: number;
	defaultMaxPosition: number;

	steps: number | null;
	stepValues: number[] | null;

	leftInclusive: boolean;
	rightInclusive: boolean;

	containerHeight: number;
	containerWidth: number;
};

export const defaultSliderSettings: SliderSettings = {
	loaded: false,

	trackWidth: 0,
	trackHeight: DEFAULT_TRACK_HEIGHT,
	trackColor: DEFAULT_TRACK_COLOR,

	activeTrackHeight: DEFAULT_ACTIVE_TRACK_HEIGHT,
	activeTrackColor: DEFAULT_ACTIVE_TRACK_COLOR,

	thumbBorderWidth: DEFAULT_THUMB_BORDER_WIDTH,
	thumbBorderColor: DEFAULT_THUMB_BORDER_COLOR,
	thumbBackgroundColor: DEFAULT_THUMB_BACKGROUND_COLOR,
	thumbBorderRadius: DEFAULT_THUMB_BORDER_RADIUS,
	thumbSize: DEFAULT_THUMB_SIZE,

	markerSize: DEFAULT_MARKER_SIZE,
	activeMarkerColor: DEFAULT_ACTIVE_MARKER_COLOR,
	inactiveMarkerColor: DEFAULT_INACTIVE_MARKER_COLOR,
	includeMarkers: DEFAULT_INCLUDE_MARKERS,

	defaultMinPosition: -1,
	defaultMaxPosition: -1,

	steps: DEFAULT_STEPS,
	stepValues: null,

	leftInclusive: true,
	rightInclusive: true,

	containerHeight: 0,
	containerWidth: 0
};

export type ActiveTrackState = {
	minValue: number;
	maxValue: number;
};

export type StepActivityMapState = {
	stepIndex: number;
	stepValue: number;
	isActive: boolean;
}[];

export type ThumbState = {
	value: number;
	previousValue: number;
	stepIndex: number;
	stepValue: number;
	thumbType: ThumbType;
};

export enum ThumbType {
	MIN = 'MIN',
	MAX = 'MAX'
}

export type SlideEvent = {
	sliderSettings: SliderSettings;
	thumbState: ThumbState;
	stepActivityMapState: StepActivityMapState | null;
};

export const generateSteps = (
	min: number,
	max: number,
	steps: number
): number[] => {
	if (steps < 2) {
		throw new Error(
			'Steps must be at least 2 to include both min and max values'
		);
	}

	const step = (max - min) / (steps - 1);
	return _.times(steps, (i) => _.round(min + step * i, 10));
};

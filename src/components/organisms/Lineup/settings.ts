import { Dayjs } from 'dayjs';

// Types
export type ContainerType = 'artist' | 'event';
export type LineupArtistProperties = {
	name: string;
	image: string;
	startTime: Dayjs;
	endTime: Dayjs;
};

// Format
const CONTAINER_MARGIN_TOP = 0;
const CONTAINER_MARGIN_BOTTOM = 1;

// Fixed Container Heights
const CONTAINER_ARTIST_HEIGHT = 85;
const CONTAINER_EVENT_HEIGHT = 30;

// Fixed Container Widths
const INNER_CONTAINER_PROFILE_IMAGE_WIDTH = 65;
const INNER_CONTAINER_RIGHT_COLUMN_WIDTH = 50;

// Etc
const MARKER_SIZE = 6;
const CONNECTION_LINE_WIDTH = 1;

// Schemes
const containerHeightScheme = {
	event: CONTAINER_EVENT_HEIGHT,
	artist: CONTAINER_ARTIST_HEIGHT
};

const calculateLineHeight = (
	currentContainerType: ContainerType,
	nextContainerType: ContainerType
) => {
	// Otherwise, calculate the height of the line
	return (
		containerHeightScheme[currentContainerType] / 2 +
		containerHeightScheme[nextContainerType] / 2 +
		CONTAINER_MARGIN_BOTTOM +
		CONTAINER_MARGIN_TOP
	);
};

export default {
	CONTAINER_MARGIN_TOP,
	CONTAINER_MARGIN_BOTTOM,
	CONTAINER_ARTIST_HEIGHT,
	CONTAINER_EVENT_HEIGHT,
	INNER_CONTAINER_PROFILE_IMAGE_WIDTH,
	INNER_CONTAINER_RIGHT_COLUMN_WIDTH,
	MARKER_SIZE,
	CONNECTION_LINE_WIDTH,
	containerHeightScheme,
	calculateLineHeight
};

import { Location as LocationModel } from '@flux/api/location';
import { Props } from '@types';
import React from 'react';
import LocationContainer from './LocationContainer';
import LocationMapView from './LocationMapView';
import MissingMapView from './MissingMapView';

interface LocationProps {
	containerProps?: Props<typeof LocationContainer>;
	location?: LocationModel | null;
	zoomDelta?: number;
}

const Location: React.FC<LocationProps> = ({
	location,
	zoomDelta,
	containerProps
}) => {
	return (
		<LocationContainer {...containerProps}>
			{!location ? (
				<MissingMapView />
			) : (
				<LocationMapView location={location} zoomDelta={zoomDelta} />
			)}
		</LocationContainer>
	);
};

export default Location;

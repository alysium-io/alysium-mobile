import { Props } from '@types';
import React from 'react';
import LocationContainer from './LocationContainer';
import LocationMapView from './LocationMapView';

type LocationProps = Props<typeof LocationMapView> & {
	containerProps?: Props<typeof LocationContainer>;
};

const Location: React.FC<LocationProps> = ({ containerProps, ...props }) => {
	if (!props.markers) return;
	return (
		<LocationContainer {...containerProps}>
			<LocationMapView {...props} />
		</LocationContainer>
	);
};

export default Location;

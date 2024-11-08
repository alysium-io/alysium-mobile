import { View } from '@atomic';
import React from 'react';

type LocationContainerProps = React.ComponentProps<typeof View> & {};

const LocationContainer: React.FC<LocationContainerProps> = (props) => (
	<View overflow='hidden' {...props} />
);

export default LocationContainer;

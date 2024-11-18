import { View } from '@atomic';
import { Props } from '@types';
import React from 'react';

type LocationContainerProps = Props<typeof View> & {};

const LocationContainer: React.FC<LocationContainerProps> = (props) => (
	<View overflow='hidden' {...props} />
);

export default LocationContainer;

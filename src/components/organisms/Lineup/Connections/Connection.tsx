import React from 'react';
import { ContainerType } from '../settings';
import ConnectionContainer from './ConnectionContainer';
import ConnectionLine from './ConnectionLine';
import Marker from './Marker';

interface ConnectionProps {
	currentContainerType: ContainerType;
	nextContainerType: ContainerType | null;
}

const Connection: React.FC<ConnectionProps> = ({
	currentContainerType,
	nextContainerType
}) => {
	return (
		<ConnectionContainer>
			<Marker containerType={currentContainerType} />
			<ConnectionLine
				currentContainerType={currentContainerType}
				nextContainerType={nextContainerType}
			/>
		</ConnectionContainer>
	);
};

export default Connection;

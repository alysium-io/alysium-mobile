import { SequenceApi, useSequence } from '@hooks';
import React, { useEffect } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import SequenceItem from './SequenceItem';

interface SequenceProps {
	children: React.ReactNode | React.ReactNode[];
	sequenceApi: SequenceApi;
}

const Sequence: React.FC<SequenceProps> = ({ children, sequenceApi }) => {
	const _sequenceApi = useSequence(sequenceApi.numItems);
	const exitDirection = useSharedValue<'left' | 'right' | null>(null);

	useEffect(() => {
		exitDirection.value =
			sequenceApi.sequenceIndex > _sequenceApi.sequenceIndex ? 'left' : 'right';
		_sequenceApi.goTo(sequenceApi.sequenceIndex);
	}, [sequenceApi.sequenceIndex]);

	if (!Array.isArray(children)) {
		return (
			<SequenceItem
				index={0}
				sequenceIndex={_sequenceApi.sequenceIndex}
				exitDirection={exitDirection}
			>
				{children}
			</SequenceItem>
		);
	}

	return children.map((child, index) => {
		return (
			<SequenceItem
				key={index}
				index={index}
				sequenceIndex={_sequenceApi.sequenceIndex}
				exitDirection={exitDirection}
			>
				{child}
			</SequenceItem>
		);
	});
};

export default Sequence;

import { View } from '@atomic';
import React from 'react';
import { StyleSheet } from 'react-native';
import SequenceItem from './components/SequenceItem';

interface SequenceProps {
	children: React.ReactNode | React.ReactNode[];
	sequenceIndex: number;
}

const Sequence: React.FC<SequenceProps> = ({ children, sequenceIndex }) => (
	<View style={styles.sequence}>
		{Array.isArray(children) ? (
			children?.map((child: React.ReactNode, index: number) => {
				return (
					<SequenceItem sequenceIndex={sequenceIndex} index={index} key={index}>
						{child}
					</SequenceItem>
				);
			})
		) : (
			<SequenceItem sequenceIndex={sequenceIndex} index={0}>
				{children}
			</SequenceItem>
		)}
	</View>
);

const styles = StyleSheet.create({
	sequence: {
		flex: 1,
		flexDirection: 'row'
	}
});

export default Sequence;

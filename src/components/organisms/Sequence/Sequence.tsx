import React, { useEffect } from 'react';
import { Dimensions, FlatList } from 'react-native';
import { useAnimatedRef } from 'react-native-reanimated';
import SequenceItem from './components/SequenceItem';

const { width } = Dimensions.get('window');

interface SequenceProps {
	children: React.ReactNode | React.ReactNode[];
	sequenceIndex: number;
}

const Sequence: React.FC<SequenceProps> = ({ children, sequenceIndex }) => {
	const ref = useAnimatedRef<FlatList>();
	useEffect(() => {
		ref.current?.scrollToIndex({
			index: sequenceIndex,
			animated: true
		});
	}, [sequenceIndex]);

	return (
		<FlatList
			keyboardShouldPersistTaps='always'
			ref={ref}
			horizontal
			pagingEnabled
			showsHorizontalScrollIndicator={false}
			scrollEnabled={false}
			initialScrollIndex={sequenceIndex}
			data={Array.isArray(children) ? children : [children]}
			renderItem={({ item, index }) => (
				<SequenceItem key={index}>{item}</SequenceItem>
			)}
			getItemLayout={(_, index) => ({
				length: width,
				offset: width * index,
				index
			})}
		/>
	);
};

export default Sequence;

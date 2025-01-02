import { GalleryItem } from '@flux/api/gallery/gallery-item.entity';
import React, { useState } from 'react';
import DetatchPanResponder from './components/DetatchPanResponder';
import Reels from './components/Reels';

interface ScrollReelProps {
	transitionTagId: string;
	data?: GalleryItem[];
}

const ScrollReel: React.FC<ScrollReelProps> = ({ transitionTagId, data }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	return (
		<DetatchPanResponder>
			<Reels
				currentIndex={currentIndex}
				setCurrentIndex={setCurrentIndex}
				transitionTagId={transitionTagId}
				data={data}
			/>
		</DetatchPanResponder>
	);
};

export default ScrollReel;

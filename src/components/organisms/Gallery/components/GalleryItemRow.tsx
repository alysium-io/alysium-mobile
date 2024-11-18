import { View } from '@atomic';
import { Props } from '@types';
import React from 'react';

type GalleryItemRowProps = Props<typeof View> & {};

const GalleryItemRow: React.FC<GalleryItemRowProps> = (props) => (
	<View flexDirection='row' justifyContent='space-around' {...props} />
);

export default GalleryItemRow;

import { View } from '@atomic';
import React from 'react';

type GalleryItemRowProps = React.ComponentProps<typeof View> & {};

const GalleryItemRow: React.FC<GalleryItemRowProps> = (props) => (
	<View flexDirection='row' justifyContent='space-around' {...props} />
);

export default GalleryItemRow;

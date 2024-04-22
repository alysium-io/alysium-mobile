import { Section } from '@atomic';
import { SheetRef } from '@hooks';
import { BottomSheet, BottomSheetHeader } from '@organisms';
import React from 'react';
import { useArtistPageContext } from '../Artist.context';

interface LinksBottomSheetProps {
	sheetRef: SheetRef;
}

const LinksBottomSheet: React.FC<LinksBottomSheetProps> = ({ sheetRef }) => {
	const { artistData } = useArtistPageContext();

	return (
		<BottomSheet sheetRef={sheetRef}>
			<BottomSheetHeader text='Links' />
			<Section margin='none'>
				{/* {data?.links.map((link, index) => (
                    <BottomSheetListItemLink
                        key={index}
                        text={link.title}
                        url={link.url}
                        border={index !== data?.links.length - 1}
                    />
                ))} */}
			</Section>
		</BottomSheet>
	);
};

export default LinksBottomSheet;

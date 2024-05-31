import { SheetRef } from '@hooks';
import { BottomSheet, BottomSheetHeader } from '@organisms';
import React from 'react';

interface LinksBottomSheetProps {
	sheetRef: SheetRef;
}

const LinksBottomSheet: React.FC<LinksBottomSheetProps> = ({ sheetRef }) => {
	return (
		<BottomSheet sheetRef={sheetRef}>
			<BottomSheetHeader text='Links' />
			{/* {data?.links.map((link, index) => (
                <BottomSheetListItemLink
                    key={index}
                    text={link.title}
                    url={link.url}
                    border={index !== data.links.length - 1}
                />
            ))} */}
		</BottomSheet>
	);
};

export default LinksBottomSheet;

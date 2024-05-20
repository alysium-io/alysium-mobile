import { Section } from '@atomic';
import { SheetApi } from '@hooks';
import { BottomSheet, BottomSheetHeader } from '@organisms';
import React from 'react';

interface LinksBottomSheetProps {
	sheetApi: SheetApi;
}

const LinksBottomSheet: React.FC<LinksBottomSheetProps> = ({ sheetApi }) => {
	return (
		<BottomSheet sheetRef={sheetApi.sheetRef}>
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

import { View } from '@atomic';
import { SheetApi } from '@hooks';
import { Button } from '@molecules';
import { CreateArtistBottomSheet } from '@popups';
import React from 'react';

interface CreateProfileActionFooterProps {
	createArtistSheetApi: SheetApi;
}

const CreateProfileActionFooter: React.FC<CreateProfileActionFooterProps> = ({
	createArtistSheetApi
}) => {
	return (
		<>
			<View margin='m'>
				<Button
					text='Create Artist'
					onPress={() => createArtistSheetApi.open()}
				/>
			</View>
			<CreateArtistBottomSheet sheetApi={createArtistSheetApi} />
		</>
	);
};

export default CreateProfileActionFooter;

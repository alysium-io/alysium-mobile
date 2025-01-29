import { View } from '@atomic';
import { SheetApi } from '@hooks';
import { Button } from '@molecules';
import React from 'react';
import CreateArtistBottomSheet from './sheets/CreateArtistBottomSheet';

interface CreateProfileActionFooterProps {
	createArtistSheetApi: SheetApi;
}

const CreateProfileActionFooter: React.FC<CreateProfileActionFooterProps> = ({
	createArtistSheetApi
}) => {
	return (
		<>
			<View margin='m'>
				<Button text='Create Artist' onPress={createArtistSheetApi.open} />
			</View>
			<CreateArtistBottomSheet sheetApi={createArtistSheetApi} />
		</>
	);
};

export default CreateProfileActionFooter;

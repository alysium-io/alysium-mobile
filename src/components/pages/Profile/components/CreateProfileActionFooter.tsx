import { View } from '@atomic';
import { SheetApi } from '@hooks';
import { Button } from '@molecules';
import { CreateArtistBottomSheet, CreateHostBottomSheet } from '@popups';
import React from 'react';

interface CreateProfileActionFooterProps {
	createHostSheetApi: SheetApi;
	createArtistSheetApi: SheetApi;
}

const CreateProfileActionFooter: React.FC<CreateProfileActionFooterProps> = ({
	createHostSheetApi,
	createArtistSheetApi
}) => {
	return (
		<>
			<View flexDirection='row'>
				<View margin='m' flex={1} marginRight='s'>
					<Button
						text='Create Host'
						onPress={() => createHostSheetApi.open()}
					/>
				</View>
				<View margin='m' flex={1} marginLeft='s'>
					<Button
						text='Create Artist'
						onPress={() => createArtistSheetApi.open()}
					/>
				</View>
			</View>
			<CreateHostBottomSheet sheetApi={createHostSheetApi} />
			<CreateArtistBottomSheet sheetApi={createArtistSheetApi} />
		</>
	);
};

export default CreateProfileActionFooter;

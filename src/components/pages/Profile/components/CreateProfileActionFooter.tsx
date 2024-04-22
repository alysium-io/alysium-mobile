import { View } from '@atomic';
import { useSheet } from '@hooks';
import { Button } from '@molecules';
import { CreateArtistBottomSheet, CreateHostBottomSheet } from '@templates';
import React from 'react';

const CreateProfileActionFooter = () => {
	const createHostSheetApi = useSheet();
	const createArtistSheetApi = useSheet();

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

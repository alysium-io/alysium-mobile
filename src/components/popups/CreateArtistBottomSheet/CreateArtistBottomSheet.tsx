import { Text, View } from '@atomic';
import { SheetApi, useLayoutDimensions } from '@hooks';
import { FullScreenSheetWithHeaderAndFooter } from '@organisms';
import React from 'react';
import useCreateArtistBottomSheet from './useCreateArtistBottomSheet';

interface CreateArtistBottomSheetProps {
	sheetApi: SheetApi;
}

const CreateArtistBottomSheet: React.FC<CreateArtistBottomSheetProps> = ({
	sheetApi
}) => {
	const {
		resetAll,
		cancel,
		onSubmit,
		artistNameTextInputApi,
		onSheetIndexChangeFocusTextInput,
		formMethods
	} = useCreateArtistBottomSheet(sheetApi);

	const footerLayoutApi = useLayoutDimensions();

	return (
		<FullScreenSheetWithHeaderAndFooter
			sheetApi={sheetApi}
			footerLayoutApi={footerLayoutApi}
			onDismiss={cancel}
		>
			<View margin='m'>
				<Text>Hello World</Text>
			</View>
		</FullScreenSheetWithHeaderAndFooter>
	);
};

export default CreateArtistBottomSheet;

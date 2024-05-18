import { SheetApi } from '@hooks';
import { BottomSheet } from '@organisms';
import { ApiIdentifier, ChildrenProps } from '@types';
import React from 'react';
import { CreateContractBottomSheetProvider } from './CreateContractBottomSheet.context';
import Body from './components/Body';
import Footer from './components/Footer';

interface CreateContractBottomSheetProps {
	sheetApi: SheetApi;
	artistId: ApiIdentifier | null;
	eventId: ApiIdentifier;
}

const CreateContractBottomSheet: React.FC<CreateContractBottomSheetProps> = ({
	...props
}) => {
	return (
		<BottomSheet
			sheetRef={props.sheetApi.sheetRef}
			enableDynamicSizing
			footerComponent={Footer}
			containerComponent={(containerProps: ChildrenProps) => (
				<CreateContractBottomSheetProvider {...props} {...containerProps} />
			)}
		>
			<Body />
		</BottomSheet>
	);
};

export default CreateContractBottomSheet;

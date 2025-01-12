import { SheetApi } from '@hooks';
import { Header, HeaderIconButton, HeaderSection } from '@organisms';
import React from 'react';

interface FullScreenSheetHeaderProps {
	sheetApi: SheetApi;
}

const FullScreenSheetHeader: React.FC<FullScreenSheetHeaderProps> = ({
	sheetApi
}) => {
	return (
		<Header>
			<HeaderSection
				LeftComponent={
					<HeaderIconButton name='x' onPress={sheetApi.close} size='xl' />
				}
			/>
		</Header>
	);
};

export default FullScreenSheetHeader;

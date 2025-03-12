import { useSheet } from '@hooks';
import {
	Header,
	HeaderBackButton,
	HeaderIconButton,
	HeaderSection,
	HeaderTitle
} from '@organisms';
import { NanoId } from '@types';
import React from 'react';
import PopupMenuSheet from './sheets/PopupMenuSheet';

interface EditEventMediaHeaderProps {
	event_uid: NanoId;
}

const EditEventMediaHeader: React.FC<EditEventMediaHeaderProps> = ({
	event_uid
}) => {
	const sheetApi = useSheet();

	return (
		<>
			<Header>
				<HeaderSection
					LeftComponent={<HeaderBackButton />}
					CenterComponent={
						<HeaderTitle
							title='Edit Event Media'
							titleProps={{ variant: 'paragraph-small', color: 'text.q' }}
						/>
					}
					RightComponent={
						<HeaderIconButton name='menu' onPress={sheetApi.open} />
					}
				/>
			</Header>
			<PopupMenuSheet sheetApi={sheetApi} event_uid={event_uid} />
		</>
	);
};

export default EditEventMediaHeader;

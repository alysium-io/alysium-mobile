import { Text } from '@atomic';
import { useNavigation } from '@hooks';
import { Header, HeaderIconButton, HeaderSection } from '@organisms';
import React from 'react';

interface EditFanAccountHeaderProps {}

const EditFanAccountHeader: React.FC<EditFanAccountHeaderProps> = () => {
	const { back } = useNavigation();
	return (
		<Header>
			<HeaderSection
				LeftComponent={<HeaderIconButton name='arrow-left' onPress={back} />}
				CenterComponent={
					<Text variant='paragraph-small' color='text.q'>
						Fan Account
					</Text>
				}
			/>
		</Header>
	);
};

export default EditFanAccountHeader;

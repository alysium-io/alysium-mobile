import { useNavigation } from '@hooks';
import { Header, HeaderIconButton, HeaderSection } from '@organisms';
import React from 'react';

interface EditColorThemeHeaderProps {}

const EditColorThemeHeader: React.FC<EditColorThemeHeaderProps> = () => {
	const { back } = useNavigation();

	return (
		<Header>
			<HeaderSection
				LeftComponent={
					<HeaderIconButton
						name='arrow-left'
						color='palette.q.medium'
						onPress={back}
					/>
				}
			/>
		</Header>
	);
};

export default EditColorThemeHeader;

import { Header, HeaderIconButton, HeaderTitle } from '@organisms';
import { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';

const EditContractPageHeader: React.FC<StackHeaderProps> = (
	stackHeaderProps
) => {
	return (
		<Header
			stackHeaderProps={stackHeaderProps}
			LeftComponent={() => (
				<HeaderIconButton
					onPress={stackHeaderProps.navigation.goBack}
					icon='arrow-left'
				/>
			)}
			CenterComponent={() => <HeaderTitle title='edit contract page' />}
			RightComponent={undefined}
		/>
	);
};

export default EditContractPageHeader;

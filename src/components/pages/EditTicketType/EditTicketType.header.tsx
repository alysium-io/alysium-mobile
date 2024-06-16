import { Header, HeaderIconButton, HeaderTitle } from '@organisms';
import { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';

const EditTicketTypePageHeader: React.FC<StackHeaderProps> = (
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
			CenterComponent={() => <HeaderTitle title='edit ticket' />}
			RightComponent={undefined}
		/>
	);
};

export default EditTicketTypePageHeader;

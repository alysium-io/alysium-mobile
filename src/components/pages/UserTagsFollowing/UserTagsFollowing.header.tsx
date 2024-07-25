import { Header, HeaderIconButton, HeaderTitle } from '@organisms';
import { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';

const UserArtistsFollowingPageHeader: React.FC<StackHeaderProps> = (
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
			CenterComponent={() => <HeaderTitle title='artists following' />}
			RightComponent={undefined}
		/>
	);
};

export default UserArtistsFollowingPageHeader;

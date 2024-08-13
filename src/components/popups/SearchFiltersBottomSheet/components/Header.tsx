import { BottomSheetHeader } from '@organisms';
import React from 'react';

const Header = () => (
	<BottomSheetHeader
		variant='paragraph-light'
		containerProps={{
			justifyContent: 'center',
			padding: 'm',
			borderColor: 'border.medium'
		}}
	>
		Filters
	</BottomSheetHeader>
);

export default Header;

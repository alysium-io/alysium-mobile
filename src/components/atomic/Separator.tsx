import { View } from '@atomic';
import { useTheme } from '@hooks';
import { Props } from '@types';
import React from 'react';

type SeparatorProps = Props<typeof View> & {
	size?: 'thin' | 'thick';
};

const Separator: React.FC<SeparatorProps> = ({ size = 'thin', ...props }) => {
	const { theme } = useTheme();
	return (
		<View
			marginTop='xxl'
			height={size === 'thin' ? theme.borderWidth.thick : 10}
			backgroundColor={size === 'thin' ? 'bg.s' : 'bg.light'}
			{...props}
		/>
	);
};

export default Separator;

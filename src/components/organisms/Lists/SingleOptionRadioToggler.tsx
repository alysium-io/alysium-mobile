import { View } from '@atomic';
import { ListItemWithRadio } from '@molecules';
import React, { useState } from 'react';

interface SingleOptionRadioTogglerProps {
	items: Omit<
		React.ComponentProps<typeof ListItemWithRadio>,
		'radioButtonProps'
	>[];
	defaultId?: string;
	onChange?: (id: string) => void;
}

const SingleOptionRadioToggler: React.FC<SingleOptionRadioTogglerProps> = ({
	items,
	defaultId,
	onChange
}) => {
	const [current, setCurrent] = useState<string | undefined>(defaultId);

	const _onPress = (id: string) => {
		setCurrent(id);
		onChange && onChange(id);
	};

	return (
		<View>
			{items.map((item, index) => (
				<ListItemWithRadio
					key={index}
					{...item}
					onPress={item.onPress}
					radioButtonProps={{
						active: current === item.id,
						onPress: () => _onPress(item.id)
					}}
				/>
			))}
		</View>
	);
};

export default SingleOptionRadioToggler;

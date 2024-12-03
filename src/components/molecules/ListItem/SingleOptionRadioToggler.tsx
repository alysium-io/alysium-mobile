import { Props } from '@types';
import React, { useState } from 'react';
import ListItemWithRadio from './ListItemWithRadio';

interface SingleOptionRadioTogglerProps {
	defaultId: string;
	onChange: (id: string) => void;
	items: Omit<Props<typeof ListItemWithRadio>, 'radioButtonProps'>[];
}

const SingleOptionRadioToggler: React.FC<SingleOptionRadioTogglerProps> = ({
	defaultId,
	onChange,
	items
}) => {
	const [activeId, setActiveId] = useState(defaultId);
	const _onChange = (id: string) => {
		setActiveId(id);
		onChange(id);
	};
	return items.map((item, idx) => (
		<ListItemWithRadio
			key={item.id}
			radioButtonProps={{
				active: item.id === activeId,
				onPress: () => _onChange(item.id)
			}}
			{...item}
			containerProps={{
				border: idx !== items.length - 1
			}}
		/>
	));
};

export default SingleOptionRadioToggler;

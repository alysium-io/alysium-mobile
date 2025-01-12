import { Props } from '@types';
import React, { useState } from 'react';
import ListItemWithRadio from './ListItemWithRadio';

interface SingleOptionRadioTogglerProps<T> {
	defaultId: T;
	onChange: (id: T) => void;
	items: (Omit<Props<typeof ListItemWithRadio>, 'radioButtonProps'> & {
		id: T;
	})[];
}

const SingleOptionRadioToggler = <T extends React.Key>({
	defaultId,
	onChange,
	items
}: SingleOptionRadioTogglerProps<T>) => {
	const [activeId, setActiveId] = useState(defaultId);

	const _onChange = (id: T) => {
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

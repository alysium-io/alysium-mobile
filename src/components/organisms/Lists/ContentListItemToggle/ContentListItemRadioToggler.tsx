import { View } from '@atomic';
import { Vibrator } from '@etc';
import { ApiIdentifier, ContentType } from '@types';
import React, { useState } from 'react';
import ContentListItemToggle from './ContentListItemToggle';

type ContentListItem = {
	id: ApiIdentifier;
	image?: string;
	title: string;
	subtitle: string;
	defaultIsActive: boolean;
	onPress: (id: ApiIdentifier, isActive: boolean) => void;
	onPressToggle: (id: ApiIdentifier, isActive: boolean) => void;
};

interface ContentListItemRadioTogglerProps {
	subtitleFirst?: boolean;
	items?: ContentListItem[];
}

const ContentListItemRadioToggler: React.FC<
	ContentListItemRadioTogglerProps
> = ({ subtitleFirst = true, items = [] }) => {
	const [selected, setSelected] = useState<{ [key: ApiIdentifier]: boolean }>(
		Object.fromEntries(items.map((item) => [item.id, item.defaultIsActive]))
	);

	const _onPressToggle = (item: ContentListItem) => {
		Vibrator.contextClick();
		setSelected((prev) => ({
			...prev,
			[item.id]: !prev[item.id]
		}));
		item.onPressToggle(item.id, !selected[item.id]);
	};

	return (
		<View>
			{items.map((item) => (
				<ContentListItemToggle
					key={item.id}
					title={item.title}
					subtitle={item.subtitle}
					onPress={() => item.onPress(item.id, !selected[item.id])}
					onPressToggle={() => _onPressToggle(item)}
					contentType={ContentType.event}
					image={item.image}
					size='medium'
					border
					subtitleFirst={subtitleFirst}
					borderRadius='sharp'
					checked={selected[item.id]}
				/>
			))}
		</View>
	);
};

export default ContentListItemRadioToggler;

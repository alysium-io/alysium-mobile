import { View } from '@atomic';
import { Vibrator } from '@etc';
import { ContentType } from '@types';
import React, { useEffect, useState } from 'react';
import ContentListItemToggle from './ContentListItemToggle';

interface ContentListItemTogglerProps {
	subtitleFirst?: boolean;
	onPressToggle?: (id: string) => void;
	defaultId?: string;
	items: {
		id: string;
		image?: string;
		title: string;
		subtitle: string;
		onPress: (id: string) => void;
	}[];
}

const ContentListItemToggler: React.FC<ContentListItemTogglerProps> = ({
	subtitleFirst = true,
	defaultId,
	onPressToggle,
	items
}) => {
	useEffect(() => {
		setSelected(defaultId);
	}, [defaultId]);

	const [selected, setSelected] = useState<string | undefined>(defaultId);

	const handlePressToggle = (id: string) => {
		Vibrator.contextClick();
		setSelected(id);
		onPressToggle && onPressToggle(id);
	};

	return (
		<View>
			{items.map((item) => (
				<ContentListItemToggle
					key={item.id}
					title={item.title}
					subtitle={item.subtitle}
					onPress={() => item.onPress(item.id)}
					onPressToggle={() => handlePressToggle(item.id)}
					contentType={ContentType.event}
					image={item.image}
					size='medium'
					border
					subtitleFirst={subtitleFirst}
					borderRadius='sharp'
					checked={selected === item.id}
				/>
			))}
		</View>
	);
};

export default ContentListItemToggler;

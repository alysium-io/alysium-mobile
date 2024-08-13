import { Section, Text, View } from '@atomic';
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet';
import { useTheme } from '@hooks';
import { TabToggler } from '@molecules';
import { Props } from '@types';
import React, { useMemo, useState } from 'react';

type SelectTypeToggleItemProps = Props<typeof Text> & {
	text: string;
	active: boolean;
	containerProps?: Props<typeof View>;
	onPress: () => void;
};

const SelectTypeToggleItem: React.FC<SelectTypeToggleItemProps> = ({
	text,
	active,
	containerProps,
	onPress,
	...props
}) => {
	const settings = useMemo(
		() => ({
			backgroundColor: active
				? 'select-type-toggle.active.bg'
				: 'select-type-toggle.inactive.bg',
			textColor: active
				? 'select-type-toggle.active.text'
				: 'select-type-toggle.inactive.text'
		}),
		[active]
	);
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View
				flex={1}
				padding='m'
				backgroundColor={settings.backgroundColor}
				borderColor='select-type-toggle.border'
				{...containerProps}
			>
				<Text
					variant={'paragraph-small' + (active ? '-bold' : '')}
					textAlign='center'
					color={settings.textColor}
					{...props}
				>
					{text}
				</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

type SelectTypeToggleProps = {
	defaultActiveKey: string;
	items: Omit<Props<typeof SelectTypeToggleItem>, 'active' | 'onPress'>[];
	onChange: (key: string) => void;
};

const SelectTypeToggle: React.FC<SelectTypeToggleProps> = ({
	defaultActiveKey,
	items,
	onChange
}) => {
	const { theme } = useTheme();

	const [activeKey, setActiveKey] = useState<string>(defaultActiveKey);

	const _onChange = (key: string) => {
		if (key !== activeKey) {
			onChange(key);
			setActiveKey(key);
		}
	};

	return (
		<View
			borderRadius='l'
			borderColor='select-type-toggle.border'
			borderWidth={theme.borderWidth.thick}
			flexDirection='row'
			overflow='hidden'
		>
			{items.map((item, index) => (
				<SelectTypeToggleItem
					key={item.text}
					text={item.text}
					onPress={() => _onChange(item.text)}
					active={item.text === activeKey}
					containerProps={{
						borderRightWidth:
							index < items.length - 1 ? theme.borderWidth.thick : 0
					}}
				/>
			))}
		</View>
	);
};

const AnythingDescription = () => <Text>Default, search for anything.</Text>;

const TagsDescription = () => (
	<Text>
		Search for tags. Tags are used to categorize artists to help you find what
		you're looking for.
	</Text>
);

const ArtistsDescription = () => (
	<Text>
		Search for artists. We provide various filters to help you find artists
		you're looking for.
	</Text>
);

const SearchType = () => {
	const [searchType, setSearchType] = useState('Anything');

	return (
		<Section>
			<View marginTop='s'>
				<TabToggler
					defaultActiveTab={1}
					onChange={(id) => console.log(id)}
					data={[
						{ text: 'anything', id: 1 },
						{ text: 'tags', id: 2 },
						{ text: 'artists', id: 3 }
					]}
				/>
			</View>
		</Section>
	);
};

export default SearchType;

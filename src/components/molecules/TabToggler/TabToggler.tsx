import { View } from '@atomic';
import { useLayoutDimensions } from '@hooks';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import TabTogglerAnimatedBackground from './TabTogglerAnimatedBackground';
import TabTogglerText from './TabTogglerText';

type TabTogglerItem = {
	id: number;
	text: string;
};

interface TabTogglerProps {
	data: TabTogglerItem[];
	defaultActiveTab: number;
	onChange: (id: number) => void;
}

const TabToggler: React.FC<TabTogglerProps> = ({
	data,
	defaultActiveTab,
	onChange
}) => {
	const [tabIndex, setTabIndex] = useState<number>(defaultActiveTab);
	const { dimensions, onLayout } = useLayoutDimensions();

	const _onChange = (id: number) => {
		setTabIndex(id);
		onChange(id);
	};

	return (
		<View style={styles.container} backgroundColor='text.s' onLayout={onLayout}>
			<TabTogglerAnimatedBackground
				height={dimensions.height}
				width={dimensions.width / data.length}
				tabIndex={tabIndex - 1}
			/>
			{data.map(({ id, text }) => (
				<TabTogglerText
					key={id}
					text={text}
					isActive={id === tabIndex}
					onPress={() => _onChange(id)}
				/>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		borderRadius: 999
	}
});

export default TabToggler;

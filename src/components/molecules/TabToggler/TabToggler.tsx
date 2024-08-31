import { View } from '@atomic';
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

	const _onChange = (id: number) => {
		setTabIndex(id);
		onChange(id);
	};

	return (
		<View style={styles.container} backgroundColor='text.s'>
			<TabTogglerAnimatedBackground
				numItems={data.length}
				tabIndex={tabIndex}
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
		padding: 1,
		flexDirection: 'row',
		borderRadius: 999
	}
});

export default TabToggler;

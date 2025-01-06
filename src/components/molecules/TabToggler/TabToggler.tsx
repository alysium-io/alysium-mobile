import { View } from '@atomic';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import TabTogglerAnimatedBackground from './TabTogglerAnimatedBackground';
import TabTogglerText from './TabTogglerText';

interface TabTogglerItem<T> {
	id: T;
	text: string;
}

interface TabTogglerProps<T> {
	data: TabTogglerItem<T>[];
	defaultActiveTab: T;
	onChange: (id: T) => void;
}

const TabToggler = <T,>({
	data,
	defaultActiveTab,
	onChange
}: TabTogglerProps<T>) => {
	const getTabIndex = (id: T) => {
		return data.findIndex((item) => item.id === id);
	};

	const [tabIndex, setTabIndex] = useState<number>(
		getTabIndex(defaultActiveTab)
	);
	const [activeTab, setActiveTab] = useState<T>(defaultActiveTab);

	const _onChange = (id: T) => {
		setTabIndex(getTabIndex(id));
		setActiveTab(id);
		onChange(id);
	};

	return (
		<View style={styles.container} backgroundColor='text.s'>
			<TabTogglerAnimatedBackground
				numItems={data.length}
				tabIndex={tabIndex}
			/>
			{data.map(({ id, text }, index) => (
				<TabTogglerText
					key={index}
					text={text}
					isActive={id === activeTab}
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

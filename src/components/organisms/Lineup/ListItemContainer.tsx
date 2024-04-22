import { View } from '@atomic';
import React from 'react';
import { StyleSheet } from 'react-native';
import settings, { ContainerType } from './settings';

interface ListItemContainerProps {
	children: React.ReactNode;
	containerType: ContainerType;
}

const ListItemContainer: React.FC<ListItemContainerProps> = ({
	children,
	containerType
}) => {
	return (
		<View
			style={[
				styles.container,
				{ height: settings.containerHeightScheme[containerType] }
			]}
			paddingHorizontal='m'
		>
			{children}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: settings.CONTAINER_MARGIN_BOTTOM,
		marginTop: settings.CONTAINER_MARGIN_TOP
	}
});

export default ListItemContainer;

import { View } from '@atomic';
import { Props } from '@types';
import React from 'react';
import { StyleSheet } from 'react-native';

interface HandleProps {
	containerProps?: Props<typeof View>;
}

const Handle: React.FC<HandleProps> = ({ containerProps }) => {
	return (
		<View
			marginVertical='m'
			flexDirection='row'
			justifyContent='center'
			{...containerProps}
		>
			<View style={styles.handle} backgroundColor='sheet.handle' />
		</View>
	);
};

const styles = StyleSheet.create({
	handle: {
		height: 2,
		width: 32,
		borderRadius: 15
	}
});

export default Handle;

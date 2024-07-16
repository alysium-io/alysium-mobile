import { Icon, View } from '@atomic';
import { useTheme } from '@hooks';
import { ContentType } from '@types';
import React from 'react';
import { StyleSheet } from 'react-native';

interface TagAvatarProps {
	color: string | null;
}

const TagAvatar: React.FC<TagAvatarProps> = ({ color }) => {
	const { theme } = useTheme();

	const backgroundColor = color === null ? theme.colors.bg2 : '#' + color;

	return (
		<View
			borderRadius={ContentType.tag}
			style={[styles.container, { backgroundColor }]}
		>
			<Icon name='tag' size='m' color='#fff' />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: '100%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default TagAvatar;

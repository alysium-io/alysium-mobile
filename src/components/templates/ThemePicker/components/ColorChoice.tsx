import { Icon, View } from '@atomic';
import { useTheme } from '@hooks';
import { ThemeName } from '@types';
import { AnimatePresence, MotiView } from 'moti';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { accentColors } from 'src/restyle/colors/palettes';

interface ColorChoiceProps {
	themeName: ThemeName;
	onPress: (themeName: ThemeName) => void;
	active: boolean;
}

const ColorChoice: React.FC<ColorChoiceProps> = ({
	themeName,
	onPress,
	active
}) => {
	const { theme } = useTheme();
	return (
		<TouchableWithoutFeedback onPress={() => onPress(themeName)}>
			<View style={styles.container}>
				<View
					borderRadius='round'
					padding='xs'
					width={75}
					aspectRatio={1}
					style={{ backgroundColor: accentColors[themeName].q.p5 }}
				/>
				<AnimatePresence>
					{active && (
						<MotiView
							from={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.5 }}
							exitTransition={{
								type: 'spring',
								duration: 300
							}}
							transition={{
								type: 'spring',
								duration: 200
							}}
							style={[
								styles.checkmark,
								{
									backgroundColor: theme.colors['bg.negative.p'],
									borderRadius: theme.borderRadii.round,
									borderWidth: theme.borderWidth.thick,
									borderColor: theme.colors['bg.p'],
									padding: theme.spacing.xs
								}
							]}
						>
							<Icon name='checkmark' color='text.negative.p' size='expanded' />
						</MotiView>
					)}
				</AnimatePresence>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {},
	checkmark: {
		position: 'absolute',
		left: 55,
		width: 21,
		aspectRatio: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default ColorChoice;

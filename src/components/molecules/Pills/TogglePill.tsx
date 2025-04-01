import { Text } from '@atomic';
import { useTheme } from '@hooks';
import { Props } from '@types';
import React, { useMemo } from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Container from './components/Container';

interface TogglePillProps {
	text: string;
	onPress?: () => void;
	isActive: boolean;
	containerProps?: Props<typeof Container>;
}

const TogglePill: React.FC<TogglePillProps> = ({
	text,
	onPress,
	isActive,
	containerProps
}) => {
	const { theme } = useTheme();
	const settings = useMemo(() => {
		return {
			backgroundColor: isActive ? 'bg.negative.p' : 'transparent',
			borderColor: isActive ? 'border.light' : 'border.medium',
			textColor: isActive ? 'text.negative.p' : 'text.p'
		};
	}, [isActive]);

	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<Container
				{...containerProps}
				backgroundColor={settings.backgroundColor}
				borderColor={settings.borderColor}
				borderWidth={
					isActive ? theme.borderWidth.xthick : theme.borderWidth.thick
				}
			>
				<Text
					variant='paragraph-small'
					color={settings.textColor}
					minimumFontScale={0.5}
					adjustsFontSizeToFit
					numberOfLines={1}
				>
					{text}
				</Text>
			</Container>
		</TouchableWithoutFeedback>
	);
};

export default TogglePill;

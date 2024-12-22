import { Text, View } from '@atomic';
import { useTheme } from '@hooks';
import { Props } from '@types';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Label from './components/Label';

type FormTextDisplayProps = Props<typeof Text> & {
	label: string;
	onPress?: () => void;
};

const FormTextDisplay: React.FC<FormTextDisplayProps> = ({
	label,
	onPress,
	...props
}) => {
	const { theme } = useTheme();
	return (
		<TouchableOpacity onPress={onPress} disabled={onPress === undefined}>
			<View
				flexDirection='row'
				paddingVertical='xl'
				borderBottomColor='border.xlight'
				borderBottomWidth={theme.borderWidth.hairline}
			>
				<Label>{label}</Label>
				<View flex={1}>
					<Text variant='paragraph' color='text.q' {...props} />
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default FormTextDisplay;

import { TextVariant } from '@types';

export type DeclarativeTextItemProps = {
	text: string;
	variant?: TextVariant;
	color?: string;
	underline?: boolean;
	newline?: boolean;
	onPress?: () => void;
};

export type DeclarativeTextItems = DeclarativeTextItemProps[];

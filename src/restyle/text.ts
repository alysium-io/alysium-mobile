import { TextStyle } from 'react-native';

const PRIMARY_FONT = 'HelveticaNeue';

const textVariantDefaults: TextStyle = {
	fontFamily: PRIMARY_FONT,
	letterSpacing: 0.3
};

const fontWeights = {
	thin: 'HelveticaNeue-Thin',
	light: 'HelveticaNeue-Light',
	regular: 'HelveticaNeue',
	medium: 'HelveticaNeue-Medium',
	bold: 'HelveticaNeue-Bold',
	condensedBold: 'HelveticaNeue-CondensedBold',
	condensedBlack: 'HelveticaNeue-CondensedBlack'
} as const;

const PARAGRAPH_LARGE_SIZE = 18;
const PARAGRAPH_SIZE = 16;
const PARAGRAPH_SMALL_SIZE = 14;

export const textVariants = {
	defaults: textVariantDefaults,
	'page-header': {
		fontFamily: fontWeights.bold,
		fontSize: 26
	},
	'section-header-1': {
		fontFamily: fontWeights.bold,
		fontSize: 18
	},
	'section-header-2': {
		fontFamily: fontWeights.regular,
		fontSize: 24
	},
	'paragraph-large': {
		fontFamily: fontWeights.regular,
		fontSize: PARAGRAPH_LARGE_SIZE
	},
	'paragraph-large-medium': {
		fontFamily: fontWeights.medium,
		fontSize: PARAGRAPH_LARGE_SIZE
	},
	paragraph: {
		fontFamily: fontWeights.regular,
		fontSize: PARAGRAPH_SIZE
	},
	'paragraph-light': {
		fontFamily: fontWeights.light,
		fontSize: PARAGRAPH_SIZE
	},
	'paragraph-medium': {
		fontFamily: fontWeights.medium,
		fontSize: PARAGRAPH_SIZE
	},
	'paragraph-bold': {
		fontFamily: fontWeights.bold,
		fontSize: PARAGRAPH_SIZE
	},
	'paragraph-small': {
		fontFamily: fontWeights.regular,
		fontSize: PARAGRAPH_SMALL_SIZE
	},
	'paragraph-small-light': {
		fontFamily: fontWeights.light,
		fontSize: PARAGRAPH_SMALL_SIZE
	},
	'paragraph-small-medium': {
		fontFamily: fontWeights.medium,
		fontSize: PARAGRAPH_SMALL_SIZE
	},
	'paragraph-small-bold': {
		fontFamily: fontWeights.bold,
		fontSize: PARAGRAPH_SMALL_SIZE
	}
};

// Helper function to create italic versions of styles
const createItalicStyle = (baseStyle: TextStyle): TextStyle => ({
	...baseStyle,
	fontFamily: `${baseStyle.fontFamily}Italic` as keyof typeof fontWeights
});

// Add italic versions of styles
Object.keys(textVariants).forEach((key) => {
	if (key !== 'defaults') {
		(textVariants as any)[`${key}-italic`] = createItalicStyle(
			textVariants[key as keyof typeof textVariants]
		);
	}
});

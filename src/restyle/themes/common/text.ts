const PRIMARY_FONT = 'Helvetica Neue';

const textVariantDefaults = {
	fontFamily: PRIMARY_FONT,
	letterSpacing: 0.3,
	paddingVertical: 'none'
};

const fontWeights = {
	regular: '400',
	medium: '500',
	bold: '700'
};

const PARAGRAPH_LARGE_SIZE = 20;
const PARAGRAPH_SIZE = 16;
const PARAGRAPH_SMALL_SIZE = 12;

export default {
	'page-header': {
		fontSize: 26,
		fontWeight: fontWeights.bold
	},
	'section-header-1': {
		fontSize: 18,
		fontWeight: fontWeights.bold
	},
	'section-header-2': {
		fontSize: 24,
		fontWeight: fontWeights.regular
	},
	'paragraph-large': {
		fontSize: PARAGRAPH_LARGE_SIZE,
		fontWeight: fontWeights.regular
	},
	'paragraph-large-medium': {
		fontSize: PARAGRAPH_LARGE_SIZE,
		fontWeight: fontWeights.medium
	},
	paragraph: {
		fontSize: PARAGRAPH_SIZE,
		fontWeight: fontWeights.regular
	},
	'paragraph-medium': {
		fontSize: PARAGRAPH_SIZE,
		fontWeight: fontWeights.medium
	},
	'paragraph-bold': {
		fontSize: PARAGRAPH_SIZE,
		fontWeight: fontWeights.bold
	},
	'paragraph-small': {
		fontSize: PARAGRAPH_SMALL_SIZE,
		fontWeight: fontWeights.regular
	},
	'paragraph-small-medium': {
		fontSize: PARAGRAPH_SMALL_SIZE,
		fontWeight: fontWeights.medium
	},
	'paragraph-small-bold': {
		fontSize: PARAGRAPH_SMALL_SIZE,
		fontWeight: fontWeights.bold
	},
	defaults: textVariantDefaults
};

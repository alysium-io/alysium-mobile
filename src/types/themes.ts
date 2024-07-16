import { BaseTheme } from '@shopify/restyle';
import { borderRadii } from '@src/restyle/borderRadii';
import { ThemeMode } from '@types';
import { StatusBarStyle } from 'react-native';
import { borderWidth } from 'src/restyle/borderWidth';
import { iconSize } from 'src/restyle/iconSize';
import { spacing } from 'src/restyle/spacing';

export type BlurColor =
	| 'dark'
	| 'light'
	| 'xlight'
	| 'prominent'
	| 'regular'
	| 'extraDark'
	| 'chromeMaterial'
	| 'material'
	| 'thickMaterial'
	| 'thinMaterial'
	| 'ultraThinMaterial'
	| 'chromeMaterialDark'
	| 'materialDark'
	| 'thickMaterialDark'
	| 'thinMaterialDark'
	| 'ultraThinMaterialDark'
	| 'chromeMaterialLight'
	| 'materialLight'
	| 'thickMaterialLight'
	| 'thinMaterialLight'
	| 'ultraThinMaterialLight';

export type KeyboardColor = 'default' | 'light' | 'dark' | undefined;

export type ColorPalette = {
	p1: string;
	p2: string;
	p3: string;
	p4: string;
	p5: string;
	p6: string;
	p7: string;
	p8: string;
	p9: string;
};

export type HexColor = string;
export type SemanticColors = {
	// Background
	'bg.p': HexColor;
	'bg.s': HexColor;
	'bg.t': HexColor;
	'bg.q': HexColor;

	'bg.negative.p': HexColor;

	// Text
	'text.p': HexColor;
	'text.s': HexColor;
	'text.t': HexColor;
	'text.q': HexColor;

	'text.negative.p': HexColor;

	'subtext.p': HexColor;
	'subtext.s': HexColor;
	'subtext.t': HexColor;
	'subtext.q': HexColor;

	'text.color.p.light': HexColor;
	'text.color.p.medium': HexColor;
	'text.color.p.heavy': HexColor;
	'text.color.s.light': HexColor;
	'text.color.s.medium': HexColor;
	'text.color.s.heavy': HexColor;

	// Touchables
	'bg-touch-animation.bg.p': HexColor;

	// Borders
	'border.light': HexColor;
	'border.medium': HexColor;
	'border.heavy': HexColor;

	// Icons
	'icon.p': HexColor;

	// Sheets
	'sheet.handle': HexColor;

	// Buttons
	'button.solid.loading.bg': HexColor;
	'button.solid.loading.activity-indicator': HexColor;
	'button.solid.disabled.bg': HexColor;
	'button.solid.disabled.text': HexColor;
	'button.solid.active.bg.default': HexColor;
	'button.solid.active.text.default': HexColor;
	'button.solid.active.bg.p': HexColor;
	'button.solid.active.text.p': HexColor;
	'button.solid.active.bg.s': HexColor;
	'button.solid.active.text.s': HexColor;
	'button.solid.active.bg.t': HexColor;
	'button.solid.active.text.t': HexColor;
	'button.solid.active.bg.q': HexColor;
	'button.solid.active.text.q': HexColor;
	'button.outlined.loading.border': HexColor;
	'button.outlined.loading.activity-indicator': HexColor;
	'button.outlined.disabled.bg': HexColor;
	'button.outlined.disabled.text': HexColor;
	'button.outlined.disabled.border': HexColor;
	'button.outlined.active.bg.default': HexColor;
	'button.outlined.active.text.default': HexColor;
	'button.outlined.active.border.default': HexColor;
	'button.outlined.active.bg.p': HexColor;
	'button.outlined.active.text.p': HexColor;
	'button.outlined.active.border.p': HexColor;
	'button.outlined.active.bg.s': HexColor;
	'button.outlined.active.text.s': HexColor;
	'button.outlined.active.border.s': HexColor;
	'button.outlined.active.bg.t': HexColor;
	'button.outlined.active.text.t': HexColor;
	'button.outlined.active.border.t': HexColor;
	'button.outlined.active.bg.q': HexColor;
	'button.outlined.active.text.q': HexColor;
	'button.outlined.active.border.q': HexColor;

	'radio.default': HexColor;
	'radio.p': HexColor;

	'checkbox.bg.default': HexColor;
	'checkbox.icon.default': HexColor;
	'checkbox.bg.p': HexColor;
	'checkbox.icon.p': HexColor;

	'navbar.border': HexColor;
	'navbar.icon.active': HexColor;
	'navbar.icon.inactive': HexColor;

	'default-profile-image.bg': HexColor;
	'default-profile-image.icon': HexColor;

	// Etc
	transparent: 'transparent';
	'etc.activity-indicator': HexColor;
	'etc.status-bar': StatusBarStyle;
	'etc.keyboard': KeyboardColor;
	'etc.blur': BlurColor;

	// Molecules
	'block-list-item.bg': HexColor;
	'block-list-item.icon': HexColor;
	'block-list-item.title': HexColor;
	'block-list-item.subtitle': HexColor;

	// Page specific things
	'search.search-bar.placeholder-text': HexColor;
	'search.search-bar.text': HexColor;
	'search.search-bar.bg': HexColor;
	'search.search-bar.icon': HexColor;
	'search.search-bar.clear-btn-icon': HexColor;

	'palette.neutral.p1': HexColor;
	'palette.neutral.p2': HexColor;
	'palette.neutral.p3': HexColor;
	'palette.neutral.p4': HexColor;
	'palette.neutral.p5': HexColor;
	'palette.neutral.p6': HexColor;
	'palette.neutral.p7': HexColor;
	'palette.neutral.p8': HexColor;
	'palette.neutral.p9': HexColor;
	'palette.p.light': HexColor;
	'palette.p.medium': HexColor;
	'palette.p.dark': HexColor;
	'palette.s.light': HexColor;
	'palette.s.medium': HexColor;
	'palette.s.dark': HexColor;
	'palette.t.light': HexColor;
	'palette.t.medium': HexColor;
	'palette.t.dark': HexColor;
	'palette.q.light': HexColor;
	'palette.q.medium': HexColor;
	'palette.q.dark': HexColor;
};

export type SemanticColor = keyof SemanticColors;

export type IconSize = typeof iconSize;
export type BorderWidth = typeof borderWidth;
export type BorderRadii = typeof borderRadii;
export type Spacing = typeof spacing;

export type Theme = BaseTheme & {
	name: string;
	colors: SemanticColors;
	borderWidth: BorderWidth;
	borderRadii: BorderRadii;
	iconSize: IconSize;
	spacing: Spacing;
};

export type SemanticVariants = {
	[ThemeMode.dark]: SemanticColors;
	[ThemeMode.light]: SemanticColors;
};

export type ThemeState = {
	themeMode: ThemeMode;
	themeName: ThemeName;
};

export type ThemeName = 'alysium' | 'sunset';

export type AccentColorSet = { t: ColorPalette; q: ColorPalette };
export type AccentColors = { [K in ThemeName]: AccentColorSet };

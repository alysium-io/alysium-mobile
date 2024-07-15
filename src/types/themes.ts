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

	// Touchables
	'bg-touch-animation.background.p': HexColor;

	// Borders
	'border.light': HexColor;
	'border.medium': HexColor;
	'border.heavy': HexColor;

	// Icons
	'icon.p': HexColor;

	// Sheets
	'sheet.handle': HexColor;

	// Buttons
	'button.solid.loading.background': HexColor;
	'button.solid.loading.activity-indicator': HexColor;
	'button.solid.disabled.background': HexColor;
	'button.solid.disabled.text': HexColor;
	'button.solid.active.background.default': HexColor;
	'button.solid.active.text.default': HexColor;
	'button.solid.active.background.p': HexColor;
	'button.solid.active.text.p': HexColor;
	'button.solid.active.background.s': HexColor;
	'button.solid.active.text.s': HexColor;
	'button.solid.active.background.t': HexColor;
	'button.solid.active.text.t': HexColor;
	'button.solid.active.background.q': HexColor;
	'button.solid.active.text.q': HexColor;
	'button.outlined.loading.border': HexColor;
	'button.outlined.loading.activity-indicator': HexColor;
	'button.outlined.disabled.background': HexColor;
	'button.outlined.disabled.text': HexColor;
	'button.outlined.disabled.border': HexColor;
	'button.outlined.active.background.default': HexColor;
	'button.outlined.active.text.default': HexColor;
	'button.outlined.active.border.default': HexColor;
	'button.outlined.active.background.p': HexColor;
	'button.outlined.active.text.p': HexColor;
	'button.outlined.active.border.p': HexColor;
	'button.outlined.active.background.s': HexColor;
	'button.outlined.active.text.s': HexColor;
	'button.outlined.active.border.s': HexColor;
	'button.outlined.active.background.t': HexColor;
	'button.outlined.active.text.t': HexColor;
	'button.outlined.active.border.t': HexColor;
	'button.outlined.active.background.q': HexColor;
	'button.outlined.active.text.q': HexColor;
	'button.outlined.active.border.q': HexColor;

	'radio.default': HexColor;
	'radio.p': HexColor;

	'checkbox.bg.default': HexColor;
	'checkbox.icon.default': HexColor;
	'checkbox.bg.p': HexColor;
	'checkbox.icon.p': HexColor;

	'navbar.border-top': HexColor;

	// Etc
	transparent: 'transparent';
	'etc.activity-indicator': HexColor;
	'etc.status-bar': StatusBarStyle;
	'etc.keyboard': KeyboardColor;
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

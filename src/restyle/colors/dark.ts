import { SemanticColors, ThemeName } from '@types';
import { createThemePalette } from './palettes';

export const createSemanticDarkTheme = (
	themeName: ThemeName
): SemanticColors => {
	const palette = createThemePalette(themeName);

	return {
		'bg.p': palette.neutral.p9,
		'bg.s': palette.neutral.p8,
		'bg.t': palette.neutral.p7,
		'bg.q': palette.neutral.p6,

		'bg.negative.p': palette.neutral.p1,

		'text.p': palette.neutral.p1,
		'text.s': palette.neutral.p2,
		'text.t': palette.neutral.p3,
		'text.q': palette.neutral.p4,

		'text.negative.p': palette.neutral.p9,

		'subtext.p': palette.neutral.p3,
		'subtext.s': palette.neutral.p4,
		'subtext.t': palette.p.p6,
		'subtext.q': palette.s.p6,

		'bg-touch-animation.background.p': palette.neutral.p8,

		'border.light': palette.neutral.p8,
		'border.medium': palette.neutral.p6,
		'border.heavy': palette.neutral.p3,

		'icon.p': palette.neutral.p1,

		'sheet.handle': palette.neutral.p4,

		'button.solid.loading.background': palette.neutral.p5,
		'button.solid.loading.activity-indicator': palette.neutral.p1,
		'button.solid.disabled.background': palette.neutral.p4,
		'button.solid.disabled.text': palette.neutral.p8,
		'button.solid.active.background.default': palette.neutral.p1,
		'button.solid.active.text.default': palette.neutral.p9,
		'button.solid.active.background.p': palette.p.p5,
		'button.solid.active.text.p': palette.neutral.p1,
		'button.solid.active.background.s': palette.s.p5,
		'button.solid.active.text.s': palette.neutral.p9,
		'button.solid.active.background.t': palette.t.p5,
		'button.solid.active.text.t': palette.neutral.p9,
		'button.solid.active.background.q': palette.q.p5,
		'button.solid.active.text.q': palette.neutral.p9,

		'button.outlined.loading.border': palette.neutral.p4,
		'button.outlined.loading.activity-indicator': palette.neutral.p4,
		'button.outlined.disabled.background': 'transparent',
		'button.outlined.disabled.text': palette.neutral.p5,
		'button.outlined.disabled.border': palette.neutral.p3,
		'button.outlined.active.background.default': 'transparent',
		'button.outlined.active.text.default': palette.neutral.p1,
		'button.outlined.active.border.default': palette.neutral.p1,
		'button.outlined.active.background.p': 'transparent',
		'button.outlined.active.text.p': palette.p.p5,
		'button.outlined.active.border.p': palette.p.p5,
		'button.outlined.active.background.s': 'transparent',
		'button.outlined.active.text.s': palette.s.p5,
		'button.outlined.active.border.s': palette.s.p5,
		'button.outlined.active.background.t': 'transparent',
		'button.outlined.active.text.t': palette.t.p5,
		'button.outlined.active.border.t': palette.t.p5,
		'button.outlined.active.background.q': 'transparent',
		'button.outlined.active.text.q': palette.q.p5,
		'button.outlined.active.border.q': palette.q.p5,

		'radio.default': palette.neutral.p1,
		'radio.p': palette.s.p5,

		'checkbox.bg.default': palette.neutral.p1,
		'checkbox.icon.default': palette.neutral.p8,
		'checkbox.bg.p': palette.s.p5,
		'checkbox.icon.p': palette.neutral.p8,

		'navbar.border-top': palette.s.p5,

		transparent: 'transparent',
		'etc.activity-indicator': palette.neutral.p1,
		'etc.status-bar': 'light-content',
		'etc.keyboard': 'dark'
	};
};

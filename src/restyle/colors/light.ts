import { SemanticColors, ThemeName } from '@types';
import { createThemePalette } from './palettes';

export const createSemanticLightTheme = (
	themeName: ThemeName
): SemanticColors => {
	const palette = createThemePalette(themeName);

	return {
		'bg.p': palette.neutral.p1,
		'bg.s': palette.neutral.p2,
		'bg.t': palette.neutral.p3,
		'bg.q': palette.neutral.p4,

		'bg.negative.p': palette.neutral.p9,

		'text.p': palette.neutral.p9,
		'text.s': palette.neutral.p8,
		'text.t': palette.neutral.p7,
		'text.q': palette.neutral.p6,

		'text.negative.p': palette.neutral.p1,

		'subtext.p': palette.neutral.p8,
		'subtext.s': palette.neutral.p7,
		'subtext.t': palette.p.p6,
		'subtext.q': palette.s.p6,

		'text.color.p.light': palette.p.p4,
		'text.color.p.medium': palette.p.p5,
		'text.color.p.heavy': palette.p.p6,
		'text.color.s.light': palette.s.p4,
		'text.color.s.medium': palette.s.p5,
		'text.color.s.heavy': palette.s.p6,

		'bg-touch-animation.background.p': palette.neutral.p2,

		'border.light': palette.neutral.p2,
		'border.medium': palette.neutral.p5,
		'border.heavy': palette.neutral.p7,

		'icon.p': palette.neutral.p8,

		'sheet.handle': palette.neutral.p5,

		'button.solid.loading.background': palette.neutral.p4,
		'button.solid.loading.activity-indicator': palette.neutral.p8,
		'button.solid.disabled.background': palette.neutral.p8,
		'button.solid.disabled.text': palette.neutral.p5,
		'button.solid.active.background.default': palette.neutral.p9,
		'button.solid.active.text.default': palette.neutral.p1,
		'button.solid.active.background.p': palette.p.p5,
		'button.solid.active.text.p': palette.neutral.p1,
		'button.solid.active.background.s': palette.s.p5,
		'button.solid.active.text.s': palette.neutral.p9,
		'button.solid.active.background.t': palette.t.p5,
		'button.solid.active.text.t': palette.neutral.p9,
		'button.solid.active.background.q': palette.q.p5,
		'button.solid.active.text.q': palette.neutral.p9,

		'button.outlined.loading.border': palette.neutral.p5,
		'button.outlined.loading.activity-indicator': palette.neutral.p5,
		'button.outlined.disabled.background': 'transparent',
		'button.outlined.disabled.text': palette.neutral.p8,
		'button.outlined.disabled.border': palette.neutral.p8,
		'button.outlined.active.background.default': 'transparent',
		'button.outlined.active.text.default': palette.neutral.p9,
		'button.outlined.active.border.default': palette.neutral.p9,
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

		'radio.default': palette.neutral.p9,
		'radio.p': palette.s.p4,

		'checkbox.bg.default': palette.neutral.p9,
		'checkbox.icon.default': palette.neutral.p1,
		'checkbox.bg.p': palette.s.p4,
		'checkbox.icon.p': palette.s.p1,

		'navbar.border-top': palette.neutral.p2,

		transparent: 'transparent',
		'etc.activity-indicator': palette.neutral.p8,
		'etc.status-bar': 'dark-content',
		'etc.keyboard': 'light',
		'etc.blur': 'xlight'
	};
};

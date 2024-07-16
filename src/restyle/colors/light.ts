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

		'bg-touch-animation.bg.p': palette.neutral.p2,

		'border.light': palette.neutral.p2,
		'border.medium': palette.neutral.p5,
		'border.heavy': palette.neutral.p7,

		'icon.p': palette.neutral.p8,

		'sheet.handle': palette.neutral.p5,

		'button.solid.loading.bg': palette.neutral.p4,
		'button.solid.loading.activity-indicator': palette.neutral.p8,
		'button.solid.disabled.bg': palette.neutral.p8,
		'button.solid.disabled.text': palette.neutral.p5,
		'button.solid.active.bg.default': palette.neutral.p9,
		'button.solid.active.text.default': palette.neutral.p1,
		'button.solid.active.bg.p': palette.p.p5,
		'button.solid.active.text.p': palette.neutral.p1,
		'button.solid.active.bg.s': palette.s.p5,
		'button.solid.active.text.s': palette.neutral.p9,
		'button.solid.active.bg.t': palette.t.p5,
		'button.solid.active.text.t': palette.neutral.p9,
		'button.solid.active.bg.q': palette.q.p5,
		'button.solid.active.text.q': palette.neutral.p9,

		'button.outlined.loading.border': palette.neutral.p5,
		'button.outlined.loading.activity-indicator': palette.neutral.p5,
		'button.outlined.disabled.bg': 'transparent',
		'button.outlined.disabled.text': palette.neutral.p8,
		'button.outlined.disabled.border': palette.neutral.p8,
		'button.outlined.active.bg.default': 'transparent',
		'button.outlined.active.text.default': palette.neutral.p9,
		'button.outlined.active.border.default': palette.neutral.p9,
		'button.outlined.active.bg.p': 'transparent',
		'button.outlined.active.text.p': palette.p.p5,
		'button.outlined.active.border.p': palette.p.p5,
		'button.outlined.active.bg.s': 'transparent',
		'button.outlined.active.text.s': palette.s.p5,
		'button.outlined.active.border.s': palette.s.p5,
		'button.outlined.active.bg.t': 'transparent',
		'button.outlined.active.text.t': palette.t.p5,
		'button.outlined.active.border.t': palette.t.p5,
		'button.outlined.active.bg.q': 'transparent',
		'button.outlined.active.text.q': palette.q.p5,
		'button.outlined.active.border.q': palette.q.p5,

		'radio.default': palette.neutral.p9,
		'radio.p': palette.s.p4,

		'checkbox.bg.default': palette.neutral.p9,
		'checkbox.icon.default': palette.neutral.p1,
		'checkbox.bg.p': palette.s.p4,
		'checkbox.icon.p': palette.s.p1,

		'navbar.border': palette.neutral.p2,
		'navbar.icon.active': palette.neutral.p9,
		'navbar.icon.inactive': palette.neutral.p3,

		'default-profile-image.bg': palette.s.p2,
		'default-profile-image.icon': palette.s.p8,

		'block-list-item.bg': palette.s.p2,
		'block-list-item.icon': palette.s.p7,
		'block-list-item.title': palette.s.p9,
		'block-list-item.subtitle': palette.s.p7,

		'search.search-bar.placeholder-text': palette.s.p6,
		'search.search-bar.text': palette.s.p9,
		'search.search-bar.bg': palette.s.p2,
		'search.search-bar.icon': palette.s.p6,
		'search.search-bar.clear-btn-icon': palette.s.p9,

		transparent: 'transparent',
		'etc.activity-indicator': palette.neutral.p8,
		'etc.status-bar': 'dark-content',
		'etc.keyboard': 'light',
		'etc.blur': 'xlight',

		'palette.neutral.p1': palette.neutral.p1,
		'palette.neutral.p2': palette.neutral.p2,
		'palette.neutral.p3': palette.neutral.p3,
		'palette.neutral.p4': palette.neutral.p4,
		'palette.neutral.p5': palette.neutral.p5,
		'palette.neutral.p6': palette.neutral.p6,
		'palette.neutral.p7': palette.neutral.p7,
		'palette.neutral.p8': palette.neutral.p8,
		'palette.neutral.p9': palette.neutral.p9,
		'palette.p.light': palette.p.p1,
		'palette.p.medium': palette.p.p5,
		'palette.p.dark': palette.p.p9,
		'palette.s.light': palette.s.p1,
		'palette.s.medium': palette.s.p5,
		'palette.s.dark': palette.s.p9,
		'palette.t.light': palette.t.p1,
		'palette.t.medium': palette.t.p5,
		'palette.t.dark': palette.t.p9,
		'palette.q.light': palette.q.p1,
		'palette.q.medium': palette.q.p5,
		'palette.q.dark': palette.q.p9
	};
};

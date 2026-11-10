import type { Theme } from './Theme'

export const LIGHT_THEME: Theme = {
  name: 'light',
  pageBackground: 0xf0f0f0,
  areaFill: 0xffffff,
  areaBorder: { width: 2, color: 0x000000 },
  shapePallete: [0xe53935, 0x1e88e5, 0x43a047, 0xfb8c00, 0x8e24aa, 0x00897b],
};

export const DARK_THEME: Theme = {
  name: 'dark',
  pageBackground: 0x121212,
  areaFill: 0x1e1e1e,
  areaBorder: { width: 2, color: 0xe0e0e0 },
  shapePallete: [0xff6b6b, 0x4fc3f7, 0x81c784, 0xffb74d, 0xce93d8, 0x4dd0e1],
};

export function getInitialTheme(): Theme {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? DARK_THEME : LIGHT_THEME;
}
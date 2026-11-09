import type { Theme } from './Theme'

export const LIGHT_THEME: Theme = {
  name: 'light',
  pageBackground: 0xf0f0f0,
  areaFill: 0xffffff,
  areaBorder: { width: 2, color: 0x000000 },
};

export const DARK_THEME: Theme = {
  name: 'dark',
  pageBackground: 0x121212,
  areaFill: 0x1e1e1e,
  areaBorder: { width: 2, color: 0xe0e0e0 },
};

export function getInitialTheme(): Theme {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? DARK_THEME : LIGHT_THEME;
}
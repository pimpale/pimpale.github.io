import raw from './palette.module.scss';

/** Keys exported by palette.module.scss, which mirrors _palette.scss. */
export type PaletteKey =
  | 'bg0h' | 'bg0' | 'bg1' | 'bg2' | 'bg3' | 'bg4'
  | 'gray'
  | 'fg4' | 'fg3' | 'fg2' | 'fg1' | 'fg0'
  | 'red' | 'green' | 'yellow' | 'blue' | 'purple' | 'aqua' | 'orange'
  | 'brightRed' | 'brightGreen' | 'brightYellow' | 'brightBlue'
  | 'brightPurple' | 'brightAqua' | 'brightOrange';

/** The site's gruvbox palette, as hex strings, sourced from the stylesheet. */
export const palette = raw as Readonly<Record<PaletteKey, string>>;

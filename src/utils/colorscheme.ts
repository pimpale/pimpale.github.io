
export function codeStrToRGB(codeStr: string) {
  const color = parseInt(codeStr, 16);
  return [
    (color >> 16) / 0xFF,
    ((color >> 8) & 0xFF) / 0xFF,
    (color & 0xFF) / 0xFF,
  ];
}


export const colorScheme = {
  "blue": "458588",
  "indigo": "6610f2",
  "purple": "b16286",
  "pink": "fb4934",
  "red": "dc3545",
  "orange": "d65d0e",
  "yellow": "d79921",
  "green": "98971a",
  "teal": "689d6a",
  "cyan": "8ec07c",
};

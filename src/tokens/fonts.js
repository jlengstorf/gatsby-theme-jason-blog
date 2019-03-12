const defaultFontStack = [
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Helvetica',
  'Arial',
  'sans-serif',
  'Apple Color Emoji',
  'Segoe UI Emoji',
  'Segoe UI Symbol',
];

const monoFontStack = [
  // 'Operator Mono', // I know this only works on, like, my computer.
  'SFMono-Regular',
  'Consolas',
  'Liberation Mono',
  'Menlo',
  'Courier',
  'monospace',
];

export default {
  sizeSm: '16px',
  sizeMd: '18px',
  default: defaultFontStack.join(', '),
  heading: ['mallory', ...defaultFontStack].join(', '),
  mono: monoFontStack.join(', '),
};

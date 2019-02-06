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

export default {
  sizeSm: '16px',
  sizeMd: '18px',
  default: defaultFontStack.join(', '),
  heading: ['mallory', ...defaultFontStack].join(', '),
};

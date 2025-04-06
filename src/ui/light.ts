import { lightColors } from './lightColors';
import { typo } from './typo';

const defaultTheme = {
  paddings: {
    p0: 0,
    p2: 2,
    p3: 3,
    p4: 4,
    p6: 6,
    p8: 8,
    p10: 10,
    p12: 12,
    p16: 16,
    p20: 20,
    p24: 24,
    p28: 28,
    p32: 32,
    p36: 36,
    p40: 40,
  },
  raounding: {
    r2: 2,
    r4: 4,
    r8: 8,
    r10: 10,
    r12: 12,
    r16: 16,
    r20: 20,
    rounded: 100,
  },
  typo,
} as const;

export const lightTheme = {
  ...defaultTheme,
  colors: lightColors,
  name: 'light',
  isDark: false,
} as const;

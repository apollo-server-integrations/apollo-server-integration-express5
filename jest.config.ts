import type { Config } from 'jest';
import { createDefaultEsmPreset } from 'ts-jest';

const presetConfig = createDefaultEsmPreset({
  tsconfig: 'tsconfig.test.json',
});

export default {
  ...presetConfig,
  testRegex: '/__tests__/.*.test.ts$',
} satisfies Config;

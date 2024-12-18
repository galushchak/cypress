import pluginCypress from 'eslint-plugin-cypress/flat';
import pluginMocha from 'eslint-plugin-mocha';
import pluginChaiFriendly from 'eslint-plugin-chai-friendly';
import parse from '@typescript-eslint/parser';

export default [
  pluginMocha.configs.flat.recommended,
  pluginCypress.configs.globals,
  pluginCypress.configs.recommended,
  pluginChaiFriendly.configs.recommendedFlat,
  {
    ignores: ['node_modules/*'],
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      parser: parse,
      sourceType: 'module',
      parserOptions: {
        requireConfigFile: false,
      },
    },
    plugins: {
      cypress: pluginCypress,
    },
    rules: {
      'cypress/unsafe-to-chain-command': 'off',
      'cypress/no-unnecessary-waiting': 'off',
      'mocha/no-exclusive-tests': 'error',
      'mocha/no-skipped-tests': 'error',
      'mocha/no-mocha-arrows': 'off',
    },
  },
];

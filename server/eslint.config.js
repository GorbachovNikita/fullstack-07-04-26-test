import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';

export default [
   js.configs.recommended,
   {
      files: ['src/**/*.ts'],
      languageOptions: {
         parser: tsparser,
         parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            project: './tsconfig.json',
         },
      },
      plugins: {
         '@typescript-eslint': tseslint,
      },
      rules: {
         ...tseslint.configs.recommended.rules,
         '@typescript-eslint/no-unused-vars': 'error',
         '@typescript-eslint/no-explicit-any': 'warn',
         '@typescript-eslint/explicit-function-return-type': 'off',
         'no-console': 'off',
      },
   },
   prettier,
];

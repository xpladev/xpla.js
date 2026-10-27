import js from '@eslint/js';
import parser from '@typescript-eslint/parser';
import typescript from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-config-prettier/flat';

export default [
  { ignores: ['dist/**', 'docs/**', 'coverage/**'] },
  {
    files: ['src/**/*.ts'],
    languageOptions: { parser },
    plugins: { '@typescript-eslint': typescript },
    rules: {
      ...js.configs.recommended.rules,
      ...typescript.configs['eslint-recommended'].overrides[0].rules,
      ...typescript.configs.recommended.rules,
      // SDK protobuf wrappers expose merged namespaces and dynamic JSON shapes.
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', caughtErrors: 'none' },
      ],
    },
  },
  prettier,
];

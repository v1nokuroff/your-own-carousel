import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';

export default [
    js.configs.recommended,
    {
        ignores: ['node_modules/**', 'build/**', 'dist/**', '*.config.js'],
    },
    {
        files: ['src/**/*.{ts,tsx,js,jsx}'],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                alert: 'readonly',
                document: 'readonly',
                HTMLElement: 'readonly',
                console: 'readonly',
                SVGElement: 'readonly',
                SVGSVGElement: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': typescript,
            react: react,
            'react-hooks': reactHooks,
            import: importPlugin,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            // TypeScript
            ...typescript.configs.recommended.rules,
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],

            // Console
            'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],

            // React
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',

            // React Hooks
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            // Imports
            'import/first': 'error',
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    pathGroups: [
                        {
                            pattern: 'react',
                            group: 'external',
                            position: 'before',
                        },
                        {
                            pattern: 'react-**',
                            group: 'external',
                            position: 'before',
                        },
                        {
                            pattern: '@/**',
                            group: 'internal',
                            position: 'before',
                        },
                        {
                            pattern: '**/*.css',
                            group: 'index',
                            position: 'after',
                        },
                    ],
                    pathGroupsExcludedImportTypes: ['builtin', 'object', 'type'],
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],
        },
    },
];

module.exports = {
    extends: ['react-app', 'react-app/jest'],
    plugins: ['import', '@typescripts-eslint'],
    rules: {
        'import/first': 'error',
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
                pathGroups: [
                    { pattern: 'react*', group: 'external', position: 'before' },
                    { pattern: '@/**', group: 'internal', position: 'before' },
                    { pattern: './**', group: 'sibling', position: 'before' },
                    { pattern: '**/*.css', group: 'index', position: 'after' },
                ],
                pathGroupsExcludedImportTypes: ['builtin'],
                'newlines-between': 'always',
                alphabetize: { order: 'asc', caseInsensitive: true },
                warnOnUnassignedImports: false,
            },
        ],
    },
};

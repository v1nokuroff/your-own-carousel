module.exports = {
    extends: ['react-app', 'react-app/jest'],
    plugins: ['import'],
    rules: {
        'import/first': 'error',
        'import/order': [
            'error',
            {
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                    'object',
                    'type',
                ],
                pathGroups: [
                    { pattern: '@/**', group: 'internal', position: 'before' },
                    { pattern: '**/*.css', group: 'index', position: 'after' },
                    { pattern: './**', group: 'sibling', position: 'before' },
                ],
                pathGroupsExcludedImportTypes: ['builtin'],
                'newlines-between': 'always',
                alphabetize: { order: 'asc', caseInsensitive: true },
                warnOnUnassignedImports: false,
            },
        ],
    },
};

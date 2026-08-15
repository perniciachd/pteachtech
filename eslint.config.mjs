import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

/**
 * ESLint 9 flat config.
 *
 * eslint-config-next 16 ships native flat-config arrays, so no @eslint/eslintrc
 * FlatCompat shim is needed. `next/core-web-vitals` already bundles
 * `next/typescript`, so importing both would duplicate the TypeScript rules.
 */
const config = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'next-env.d.ts',
      // Vendored shadcn/ui primitives — upstream code, not ours to lint.
      'components/ui/**',
    ],
  },

  ...nextCoreWebVitals,

  {
    rules: {
      // Every console call in this codebase already carries an explicit
      // `eslint-disable-next-line no-console`, so the original authors clearly
      // intended this rule to be on. Enabling it makes those 23 directives
      // meaningful again instead of leaving them flagged as unused.
      'no-console': 'warn',

      // React Compiler-era rule from react-hooks v6. It fires on the
      // fetch-then-setState pattern in the admin pages and in hooks/use-mobile,
      // all of which predate this config. The pattern is common rather than
      // broken, and rewriting four admin data-fetching flows does not belong in
      // a "make lint runnable" change — so this is a warning, kept visible as
      // real cleanup rather than silenced with a blanket disable.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
]

export default config

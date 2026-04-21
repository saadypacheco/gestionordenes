module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      // Drizzle: inline los archivos .sql como strings en build time.
      // Permite `import m0000 from './0000_tidy_pride.sql'` y que el bundler
      // no tenga que resolverlos como módulos JS. Ver src/db/migrate.ts.
      ['inline-import', { extensions: ['.sql'] }],
    ],
  };
};

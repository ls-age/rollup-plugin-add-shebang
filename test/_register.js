require('@babel/register')({
  extensions: ['.js', '.ts'],
  // These patterns are relative to the project directory (where the `package.json` file lives):
  ignore: ['node_modules/*', 'test/*']
});

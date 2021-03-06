module.exports = ({ config }) => {
  config.module.rules.push(
    {
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: 'babel-loader'
        },
        {
          options: {
            configFileName: './.storybook/tsconfig.json',
          },
          loader: require.resolve('awesome-typescript-loader'),
        }
      ],
    },
    {
      test: /\.(sa|sc)ss$/,
      use: [
        "style-loader", // creates style nodes from JS strings
        "css-loader", // translates CSS into CommonJS
        "sass-loader" // compiles Sass to CSS, using Node Sass by default
      ]
    }
  );
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};

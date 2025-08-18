const merge = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "marketing",
      filename: "remoteEntry.js",
      exposes: {
        "./MarketingApp": "./src/bootstrap.js",
      },
      shared: {
        ...packageJson.dependencies,
        react: {
          singleton: true,
          requiredVersion: packageJson.dependencies.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: packageJson.dependencies["react-dom"],
        },
      },
    }),
  ],
});

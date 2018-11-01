const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const srcDir = path.resolve(__dirname, "src");

module.exports = merge(common, {
  devServer: {
    historyApiFallback: true,
    contentBase: srcDir,
    publicPath: "/",
    hot: true
  },
  devtool: "cheap-module-source-map",
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
    // new BundleAnalyzerPlugin()
  ],
  performance: {
    maxEntrypointSize: 1024000,
    maxAssetSize: 1024000,
    hints: "warning"
  }
});

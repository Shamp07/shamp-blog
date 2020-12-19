const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index",

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: `./public/index.html`,
      favicon: './public/favicon.ico',
    })
  ],

  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 8080
  },
};
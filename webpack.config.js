const path = require("path");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackplugin = require("html-webpack-plugin");

const config = {
  mode: "development",
  entry: path.resolve(__dirname, "src/index.tsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "source-map",
  devServer: {
    hot: true,
    open: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".css"],
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackplugin({
      filename: "index.html",
      template: "public/template.html",
    }),
  ],
};

module.exports = () => {
  return config;
};

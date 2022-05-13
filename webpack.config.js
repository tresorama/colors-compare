const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: './dist',
    watchFiles: ['src/**/*'],
  },
  entry: './src/js/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    // Copy 'src/public' folder contents to 'dist', to be served as static files
    new CopyPlugin({
      patterns: [
        { from: "src/public", to: "." },
      ],
    }),
    // Copy html pages to 'dist'
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'calcola-guadagno.html',
    //   template: 'src/pages/calcola-guadagno.html',
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'oggetti-che-si-vendono-velocemente.html',
    //   template: 'src/pages/oggetti-che-si-vendono-velocemente.html',
    // }),
  ],

};

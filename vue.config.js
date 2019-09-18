module.exports = {
  configureWebpack: {
    devServer: {
      contentBase: './dist',
      historyApiFallback: true,
      hot: true,
      inline: true,
      open: true,
      port: 8000,
    },
  },
  filenameHashing: false,
  productionSourceMap: false,
};

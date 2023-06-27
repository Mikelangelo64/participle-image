const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// generate multiple html files
const htmlPageNames = [];
const multipleHtmlPlugins = htmlPageNames.map((name) => {
  return new HtmlWebpackPlugin({
    template: `./src/templates/${name}.html`,
    filename: `${name}.html`,
  });
});

module.exports = {
  mode: 'development',
  entry: './src/index.js',

  devServer: {
    // static: './public',
    watchFiles: path.join(__dirname, 'src'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // filename: 'index.html',
      // chunks: ['header'],
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ].concat(multipleHtmlPlugins),

  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, 'public'),
    clean: true,
  },

  // optimization: {
  //   runtimeChunk: 'single',
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendors',
  //         chunks: 'all',
  //       },
  //     },
  //   },
  // },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              esModule: false,
              // exportType: 'css-style-sheet',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              // webpackImporter: true,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              esModule: false,
              // exportType: 'css-style-sheet',
            },
          },
        ],
      },
      {
        test: /\.(svg|gif|png|avif|jpe?g)$/,
        type: 'asset/resource',
        generator: {
          filename: (resourcePath) => {
            const currentPath = resourcePath.filename.split('/');
            currentPath.splice(0, 2);
            currentPath.splice(-1, 1);

            if (currentPath.includes('..')) {
              currentPath.splice(0, 1);
            }
            return `./assets/${currentPath.join('/')}/[name][ext]`;
          },
          // filename: './assets/[name][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          // filename: (resourcePath) => {
          //   const currentPath = resourcePath.filename.split('/');
          //   currentPath.splice(0, 2);
          //   currentPath.splice(-1, 1);
          //   return `assets/${currentPath.join('/')}/[name][ext]`;
          // },
          filename: './assets/fonts/[name][ext]',
        },
      },
      {
        test: /\.mp4$/,
        type: 'asset/resource',
        generator: {
          // filename: (resourcePath) => {
          //   const currentPath = resourcePath.filename.split('/');
          //   currentPath.splice(0, 2);
          //   currentPath.splice(-1, 1);
          //   return `assets/${currentPath.join('/')}/[name][ext]`;
          // },
          filename: './assets/video/[name][ext]',
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          minimize: false,
          sources: {
            list: [
              '...',
              {
                tag: 'a',
                attribute: 'href',
                type: 'src',
              },
            ],
          },
        },
      },
    ],
  },
};

const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HappyPack = require('happypack');

const config = {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      },
      __DEV_MODEL__: true,
      __DEV__: process.env.APP_ENV === 'DEV',
      __QA__: process.env.APP_ENV === 'QA',
      __YZ__: process.env.APP_ENV === 'YZ',
      __DEMO__: process.env.APP_ENV === 'DEMO',
      __PROD__: process.env.APP_ENV === 'PROD'
    }),
    new HappyPack({
      id: 'jsx',
      threads: 4,
      loaders:['react-hot', 'babel']
    }),
    new HappyPack({
      id: 'scss',
      threads: 4,
      loaders:['style', 'css', 'postcss', 'sass']
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  postcss: [autoprefixer({ browsers: ['last 2 versions', 'ie > 8'] })],
  module: {
    loaders: [{
      test: /\.(png|jpg|gif)$/,
      loader: "url-loader?limit=16384&name=images/[name]-[hash].[ext]"
    }, {
      test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
      loader: 'file-loader?name=fonts/[name]-[hash].[ext]'
    }, {
      test: /\.html$/,
      loader: 'html',
      include: path.join(__dirname, 'src')
    }]
  }
};

config.entry = ['./src/app.jsx', 'webpack-hot-middleware/client', 'webpack/hot/dev-server'];
config.devtool = 'eval';
config.output.publicPath = '/static/';
config.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new webpack.NoErrorsPlugin());
config.module.loaders.push({
  test: /\.jsx?$/,
  loaders: ['happypack/loader?id=jsx'],
  include: path.join(__dirname, 'src')
});
config.module.loaders.push({
  test: /\.css$/,
  loaders: ['style', 'css']
});
config.module.loaders.push({
  test: /\.scss$/,
  loaders: ['happypack/loader?id=scss'],
  include: path.resolve(__dirname + "/src"),
});
config.module.loaders.push({
  test: /\.less$/,
  loaders: ['style', 'css', 'less']
});

module.exports = config;


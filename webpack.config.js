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
    modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
    extensions: ['', 'js', 'jsx', '.web.js', '.js', '.json'],
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
    }],
    rules: [
      {
        test: /\.(css)|(scss)$/,
        use: [
          'isomorphic-style-loader',
          {
            loaders:['style', 'css', 'postcss', 'sass'],
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      }
    ]
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

// svg loader
console.log(require.resolve('antd-mobile').replace(/warn\.js$/, ''));
const svgDirs = [
  // require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
  path.resolve(__dirname, 'antd-mobile/lib'),  // 2. 自己私人的 svg 存放目录
  // path.resolve(__dirname, 'src/my-project-svg-foler'),  // 2. 自己私人的 svg 存放目录
];
config.module.loaders.push({
  test: /\.(svg)$/i,
  loader: 'svg-sprite',
  include: svgDirs,  // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
});

// npm install postcss-pxtorem@^3.3.1 --save-dev
const pxtorem = require('postcss-pxtorem');
config.postcss.push(pxtorem({
  rootValue: 100,
  propWhiteList: [],
}));

module.exports = config;
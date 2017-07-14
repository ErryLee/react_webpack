import path from 'path'
import webpack from 'webpack'
import webpackDevServer from 'webpack-dev-server'
import { format } from 'util'

const PORT = 1688
const PUBLIC_PATH = 'http://localhost:' + PORT + '/'

let config = {
    devtool: "eval-source-map",
    entry: {
        main: [
            './src/app/main.js',
            format('webpack-dev-server/client?%s', PUBLIC_PATH),
            'webpack/hot/only-dev-server' //only表示只有编译成功才进行代码替换
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../../dist'),
        publicPath: PUBLIC_PATH
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'sass-loader']
                // 生产用下边分割css代码
                // use: ExtractTextPlugin.extract({
                //     use:['style-loader', 'sass-loader']
                // })
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        // new ExtractTextPlugin('[name].css'), 生产用
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false // remove all comments
            }
        }),
        new webpack.optimize
    ]
}

new webpackDevServer(webpack(config), {
    inline: true,
    hot: true,
    stats: {
        colors: true
    }
}).listen(PORT, 'localhost', (err) => {
    console.log('启动成功')
})
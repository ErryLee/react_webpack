import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import { format } from 'util'
import chalk from 'chalk'

const PORT = 1688
const PUBLIC_PATH = 'http://localhost:' + PORT + '/'

const config = {
    devtool: "source-map",
    entry: {
        lib: '',
        main: './src/app/main.js'
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
                exclude: '/node_modules/',
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: ['style-loader', 'sass-loader']
                })
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            comments: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('[name].css'),
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery'
        })
    ]
}
const prefix = 'react-project'
webpack(config, (err) => {
    if (err) {
        let msg = format(err)
        console.error(chalk.red(prefix), chalk.gray('.'), msg)
        process.exit(1)
    }
})
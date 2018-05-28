var webpack = require('webpack');
var path = require('path');

NODE_ENV = 'production'

module.exports = {

    entry: {
      lib: ['./src/App.js']
    },

    output: {
        libraryTarget: 'commonjs2',
        path: path.resolve(__dirname, '../build/'),
        filename: 'index.js',
        library: 'react-drawing'
    },

    module: {

        loaders: [

            {
                test: /\.js$/,

                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: ['react', 'es2015']
                        },
                    }
                ],

                exclude: '/node_modules/'

            },

            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader'
                },{
                    loader: 'css-loader'
                }],

                exclude: '/node_modules/'
            }

        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]

}

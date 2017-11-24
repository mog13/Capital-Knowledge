const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './main.js',
    output: {
        filename: 'main.min.js',
        libraryTarget: "commonjs2"
    },
    plugins: [
        new UglifyJsPlugin()
    ]
};
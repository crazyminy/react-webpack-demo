const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports={
    entry:"./src/index.js",
    
    module:{
        rules:[
            {
                test:/\.js|jsx$/,
                use:'babel-loader',
                exclude:'/node_modules/'
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.(png|jpg|jpeg)$/,
                use:['file-loader']
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin(
            {template:'./index.html'}
        )
    ],
    output:{
        filename:'[name].bundle.js',
        path:path.resolve(__dirname,"dist"),
    },
}
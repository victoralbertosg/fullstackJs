const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const devMode=process.env.NODE_ENV !== 'production';

module.exports={
    entry:'./frontend/app.js',
    //entry: path.resolve(__dirname, 'src') + './frontend/app.js',
    
    output:{
        path:path.join(__dirname,'backend/public/'),
        filename:'js/bundle.js'
    },
    mode:'development',
    module:{
        rules:[
            {
                test:/\.css/,
                use:[
                    devMode ? 'style-loader': MiniCssExtractPlugin.loader,                    
                    //'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            //agrear el html al public
            template:'./frontend/index.html',
            minify:{
                collapseWhitespace:true,
                removeComments:true,
                removeRedundantAttributes:true,
                removeScriptTypeAttributes:true,
                removeStyleLinkAttributes:true,
                useShortDocType:true
            }
        }),
        new MiniCssExtractPlugin({
            filename:'css/bundle.css'
        })

    ] ,
    devtool:'source-map'   
}
    

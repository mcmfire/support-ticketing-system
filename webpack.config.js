import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

module.exports = {
    entry: "index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader",
                ],
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    "css-loader",
                    "sass-loader",
                    "style-loader",
                ],
            },
            {
                test: /\.svg$/,
                use: [
                    "@svgr/webpack",
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "",
            favicon: "",
        }),
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname, "dist"),
        },
        port: 8080,
    },
}
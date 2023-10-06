const fs = require("fs");

const path = require("path");

const { DefinePlugin } = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInjectAttributes = require("html-webpack-inject-attributes-plugin");

const pages = fs.readdirSync("./src/pages");

const entry = pages.reduce((acc, curr) => {
    acc[curr] = `./src/pages/${curr}/index.js`;
    return acc;
}, {});

module.exports = () => {
    const stage = process.env.KO_STAGE;

    //CHANGE THIS TO YOUR BLOB STORE DOMAIN
    const hostname = `localhost`;

    return {
        entry,
        // devtool: "eval-source-map",
        devServer: {
            server: { type: "https" },
            port: 443,
            compress: true,
            allowedHosts: "all",
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            client: {
                webSocketURL: `auto://${hostname}/ws`,
            },
            static: [
                {
                    directory: path.join(__dirname, "src/locales"),
                    publicPath: "/locales",
                },
            ],
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ["css-loader", "postcss-loader"],
                },
                {
                    test: /\.svg$/i,
                    type: "asset/resource",
                },
            ],
        },
        plugins: [
            ...pages.map(
                (page) =>
                    new HtmlWebpackPlugin({
                        template: `src/pages/${page}/index.html`,
                        publicPath: `https://${hostname}`,
                        filename: `${page}.html`,
                        chunks: [page],
                    })
            ),
            new HtmlWebpackInjectAttributes({
                "data-preload": "true",
            }),
        ],
        externals: {
            jquery: "jQuery",
        },
        output: {
            publicPath: `https://${hostname}/`,
        },
    };
};

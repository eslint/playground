const path = require("path");

module.exports = {
    entry: {
        playground: path.resolve(__dirname, "src/playground/index.js"),
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "_site/assets/js"),
    },
    resolve: {
        extensions: [".js", ".jsx"],
        mainFields: ["browser", "main", "module"]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/u,
                loader: "babel-loader",
                include: path.resolve(__dirname, "src/playground"),
                exclude: [
                    path.resolve(__dirname, "node_modules"),
                    path.resolve(__dirname, "src/playground/node_modules/lodash")
                ],
                options: {
                    configFile: path.resolve(__dirname, ".babelrc")
                }
            },
        ]
    },
};

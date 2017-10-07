const path = require("path")
const webpack = require("webpack")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

let cssModulesLoader = "css-loader?importLoader=1&modules&localIdentName=[name]__[local]___[hash:base64:5]"

module.exports = {
  devtool: false,
  entry: [
		path.resolve(__dirname, "src/entry.js")
	],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build/public"),
    publicPath: "/"
  },
  resolve: {
    modules: [
			path.resolve(__dirname, "src/components"),
			path.resolve(__dirname, "src/routes"),
			path.resolve(__dirname, "src"),
			path.resolve(__dirname, "node_modules")
		],
		extensions: [".ts", ".tsx", ".js", ".jsx", ".scss", ".css"]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production"),
				WEBPACK: true
			}
    }),
    new ExtractTextPlugin("bundle.css")
	],
  module: {
		rules: [
      {
        test: /\.js(x)*$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: [
                "transform-react-jsx",
                /* [
                  "react-css-modules",
                  {
                    context
                  }
                ] */
              ]
            },
          }
        ],
        include: path.resolve(__dirname, "src"),
      },
      {
        test: /\.(s)*css$/,
        use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						cssModulesLoader,
            {
              loader: "postcss-loader",
              options: {
                plugins: function() {
                  return [
                    require("autoprefixer")
                  ];
                }
              }
            },
            "sass-loader"
					],
				}),
        include: path.resolve(__dirname, "src")
      }
    ]
	}
};
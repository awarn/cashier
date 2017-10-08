import * as path from "path"
import * as webpack from "webpack"

let cssModulesLoader = "css-loader?importLoader=1&modules&localIdentName=[path]___[name]__[local]___[hash:base64:5]"

module.exports = {
  devtool: "inline-source-map",
  entry: [
    "webpack-hot-middleware/client",
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
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
    new webpack.EnvironmentPlugin({
      DEBUG: true,
      AUTH0_CLIENT_ID: null,
      AUTH0_DOMAIN: null,
      KEEN_PROJECT_ID: null,
      KEEN_READ_KEY: null,
      NODE_ENV: "development",
      WEBPACK: true
    })
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
        use: [
          "style-loader",
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
        include: path.resolve(__dirname, "src")
      }
    ]
	}
};

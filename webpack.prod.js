const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

const ImageminPlugin = require("imagemin-webpack-plugin").default;
const ImageminMozjpeg = require("imagemin-mozjpeg");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const BrotliGzipPlugin = require("brotli-gzip-webpack-plugin");

module.exports = merge(common, {
	optimization: {
		minimize: true, // This is used as a fail-safe, since putting this on could break code (like react-router)
		splitChunks: {
			chunks: "all" // "initial" or "all"
			/*
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					chunks: "all",
					enforce: true
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true
				}
			}
			*/
		}
	},
	plugins: [
		new ImageminPlugin({
			plugins: [
				ImageminMozjpeg({
					progressive: true,
					quality: 55
				})
			]
		}),
		new webpack.HashedModuleIdsPlugin(),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new LodashModuleReplacementPlugin({
			// Fail safe: Assume no need for these, but add back if problems occur
			// caching: true,
			// collections: true,
			// paths: true,
			// shorthands: true
		}),
		// new MinifyPlugin({
		// 	removeConsole: true,
		// 	removeDebugger: true
		// }),
		// /*
		// new webpack.optimize.LimitChunkCountPlugin({
		//   maxChunks: 1
		// }),
		// */
		new WorkboxPlugin.GenerateSW({
			clientsClaim: true,
			directoryIndex: "index.html",
			navigateFallback: "index.html",
			skipWaiting: true,
			swDest: "sw.js"
			/*
		  runtimeCaching: [
		    {
		      urlPattern: /\.(?:png|jpg|jpeg|svg|js)$/,
		      handler: "staleWhileRevalidate",
		      options: {
						cacheName: "hbproject",
		        cacheableResponse: {
		          statuses: [0, 200, 304]
		        },
		        expiration: {
		          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
		        }
		      }
		    }
			]
			*/
		}),
		new BrotliGzipPlugin({
			algorithm: "brotli",
			asset: "[path].br[query]",
			minRatio: 0.8,
			test: /\.(js|css|html|svg)$/,
			threshold: 1024
		}),
		new BrotliGzipPlugin({
			algorithm: "gzip",
			asset: "[path].gz[query]",
			minRatio: 0.8,
			test: /\.(js|css|html|svg)$/,
			threshold: 1024
		})
		//new BundleAnalyzerPlugin()
	],
	performance: {
		maxEntrypointSize: 256000,
		maxAssetSize: 256000,
		hints: "warning"
	}
});

/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	pageExtensions: ["md", "mdx", "tsx", "ts", "jsx", "js"],
	webpack(config, options) {
		config.module.rules.push(
			{
				test: /\.mdx?$/,
				use: [
					// The default `babel-loader` used by Next:
					options.defaultLoaders.babel,
					{
						loader: "@mdx-js/loader",
						/** @type {import('@mdx-js/loader').Options} */
						options: {
							/* jsxImportSource: …, otherOptions… */
						},
					},
				],
			},
			{
				test: /\.svg$/,
				use: ["@svgr/webpack"],
			}
		)

		return config
	},
	images: {
		domains: [
			"images.unsplash.com",
			"tailwindui.com",
			"images.pexels.com",
			"res.cloudinary.com",
		],
	},
	eslint: {
		dirs: ["pages", "components", "posts", "services"], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
	},
}

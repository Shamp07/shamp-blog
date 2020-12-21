module.exports = function(api: any) {
	api.cache(true);

	const presets = ["@babel/preset-env", "@babel/preset-react"];
	const plugins: Array<any> = [];

	return {
		presets,
		plugins
	};
};
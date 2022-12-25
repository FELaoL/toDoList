module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ["plugin:vue/essential", "@vue/standard"],
	parserOptions: {
		parser: "babel-eslint"
	},
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-tabs": ["error", { allowIndentationTabs: true }],
		indent: ["error", "tab", { ObjectExpression: "off" }],
		"space-before-function-paren": ["error", { anonymous: "ignore", named: "ignore", asyncArrow: "ignore" }],
		quotes: ["error", "double"],
		semi: ["error", "always"],
		curly: ["error", "multi-or-nest", "consistent"],
		"no-mixed-spaces-and-tabs": ["error", "smart-tabs"]
	}
};

//@ts-check
'use strict';

const isProd = process.env.NODE_ENV === 'production';

/**@type {import('./types/eslintrc').JSONSchemaForESLintConfigurationFiles}*/
module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		'plugin:vue/essential',
		'@vue/standard',
		'@vue/typescript'
	],
	rules: {
		'no-console': isProd ? 'error' : 'off',
		'no-debugger': isProd ? 'error' : 'off',
		"semi": ["error", "always"],
		"no-tabs": "off",
		"space-before-function-paren": ["error", {
			"anonymous": "always",
			"named": "never",
			"asyncArrow": "always"
		}],
		"indent": ["error", "tab"],
		"comma-dangle": ["error", "always-multiline"]
	},
	parserOptions: {
		parser: '@typescript-eslint/parser'
	}
}

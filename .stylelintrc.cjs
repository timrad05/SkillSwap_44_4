module.exports = {
	extends: ['stylelint-config-standard-scss'],
	customSyntax: 'postcss-scss',
	plugins: ['stylelint-scss'],
	ignoreFiles: ['dist/**/*', 'node_modules/**/*'],
	rules: {
		'no-empty-source': null,
		'at-rule-no-unknown': null,
		'scss/at-rule-no-unknown': true,
	},
};

const eslintrc = require("@silverstripe/eslint-config/.eslintrc")
eslintrc.settings["import/resolver"].node.moduleDirectory.push("../www/vendor/silverstripe/admin/node_modules")
eslintrc.settings["import/resolver"].node.moduleDirectory.push("../www/vendor/silverstripe/admin/client/src")
eslintrc.rules["import/no-extraneous-dependencies"] = ["off"]
// TODO change jsx to "always" once https://github.com/silverstripe/eslint-config/issues/7 is fixed
// eslintrc.rules["react/jsx-filename-extension"] = ["error", "always"]
eslintrc.rules["comma-dangle"] = ["error", "only-multiline"]
eslintrc.rules["semi"] = ["error", "never"]
eslintrc.rules["quotes"] = ["error", "double"]
eslintrc.rules["object-curly-spacing"] = ["error", "never"]
eslintrc.rules["spaced-comment"] = ["off"]
eslintrc.rules["arrow-body-style"] = ["warn"]
eslintrc.rules["max-len"] = ["warn"]
eslintrc.rules["no-tabs"] = ["off"]
eslintrc.rules["indent"] = ["error", "tab"]
eslintrc.rules["react/jsx-indent"] = ["error", "tab"]
eslintrc.rules["react/jsx-indent-props"] = ["error", "tab"]
module.exports = eslintrc

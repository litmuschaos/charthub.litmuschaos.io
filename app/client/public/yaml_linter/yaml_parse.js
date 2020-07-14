function yaml_parse(require, exports, module) {


    const yaml = require(self.location.origin + '/yaml_linter/js-yaml.js')

    return function (source, reviver) {
        try {
            yaml.safeLoad(source)
        } catch (error) {
            if (error instanceof yaml.YAMLException) {
                throw {
                    name: 'SyntaxError',
                    message: error.message,
                    at: error.mark.position,
                    text: source
                }
            }
        }
    }
}
var registry = new Map()
var variables = {}

module.exports = {
    registry: registry,
    variables: variables,
    smart_split: function smart_split(input, del, empty_space) {
        if (input.length === 0) return input;
        var outputs = [""];

        var compare = function(base, insert, position) {
            if ((position + insert.length) > base.length) return false;
            for (var i = 0; i < insert.length; i++) {
                if (!(base.charAt(position + i) === insert.charAt(i))) return false;
            }
            return true;
        };

        var quotes = false;
        for (var i = 0; i < input.length; i++) {
            var char = input.charAt(i);
            if (char === '"') {
                quotes = !quotes;
                continue;
            }

            if (!quotes && compare(input, del, i)) {
                outputs.push("");
                i += del.length - 1;
                continue;
            }

            outputs[outputs.length - 1] += char;
        }

        if (!empty_space) {
            for (var i = 0; i < outputs.length; i++) {
                if (outputs[i] === "") {
                    outputs.splice(i, 1);
                }
            }
        }

        return outputs;
    },

    register_cmd: function register_cmd(cmd_name, func) {
        registry.set(cmd_name.toString().toUpperCase(), func);
    },

    submit_command: function submit_command(command) {
        if (registry.has(command.split(" ")[0].toUpperCase())) {
            registry.get(command.split(" ")[0].toUpperCase())(command);
        } else {
            console.log("'" + command.split(" ")[0].toUpperCase() + "' is not a registered command, please use # help command for listing available commands.");
        }
    }
}
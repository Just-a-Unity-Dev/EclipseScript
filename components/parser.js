const geast = require('geast');
const gepars = require('gepars')

const pdef = gepars.definition();

pdef.define('program', 'commandlist', function (value) { return geast.sequence(value); });

pdef.define('commandlist', [ 'commandlist', 'command' ], function (values) { values[0].push(values[1]); return values[0]; });
pdef.define('commandlist', 'command', function (value) { return [ value ]; });

pdef.define('command', [ 'simplecommand', 'delimiter:;' ], function (values) { return values[0]; });

pdef.define('simplecommand', [ 'name:print', 'expression' ], function (values) { return geast.print(values[1]); });
pdef.define('simplecommand', [ 'name:let', 'name:' ], function (values) { return geast.variable(values[1]); });
pdef.define('simplecommand', [ 'name:', 'operator:=', 'expression' ], function (values) { return geast.assign(geast.name(values[0]), values[2]); });

pdef.define('expression', 'expression0');
pdef.define('expression0', [ 'expression0', 'operator:==', 'expression2' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('expression0', [ 'expression0', 'operator:===', 'expression2' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('expression0', [ 'expression0', 'operator:<=', 'expression2' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('expression0', [ 'expression0', 'operator:<', 'expression2' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('expression0', [ 'expression0', 'operator:>=', 'expression2' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('expression0', [ 'expression0', 'operator:>', 'expression2' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('expression0', 'expression1');
pdef.define('expression1', [ 'expression1', 'operator:+', 'expression2' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('expression1', [ 'expression1', 'operator:-', 'expression2' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('expression1', 'expression2');
pdef.define('expression2', [ 'expression2', 'operator:*', 'term' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('expression2', [ 'expression2', 'operator:/', 'term' ], function (values) { return geast.binary(values[1], values[0], values[2]); });
pdef.define('expression2', 'term');

pdef.define('term', 'integer:', function (value) { return geast.constant(parseInt(value)); });
pdef.define('term', 'string:', function (value) { return geast.constant(value); });
pdef.define('term', 'name:', function (value) { return geast.name(value); });
pdef.define('term', [ 'delimiter:(', 'expression', 'delimiter:)' ], function (values) { return values[1]; });

module.exports = {
    parse: function parse(toParse){
        pdef.parser(toParse)
    }
}
const gelex = require('gelex');
const ldef = gelex.definition();
ldef.defineComment('//');
ldef.defineComment('/*', '*/');
ldef.define('integer', '[0-9][0-9]*');
ldef.define('name', '[a-z][a-z]*');
ldef.define('operator', '+-*/='.split(''));
ldef.define('operator', '=== == <= < > =>'.split(' '));
ldef.define('delimiter', '();,'.split(''));
ldef.defineText('string', '"', '"');
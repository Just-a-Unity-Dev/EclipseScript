const gelex = require('gelex');
const ldef = gelex.definition();

//Types
ldef.define('integer', '[0123456789][0123456789]*');
ldef.defineText('string', '"', '"');
ldef.define('name', '[a-zA-Z_][a-zA-Z]*');

// Other
ldef.define('delimiter', [ '{', '}', ',', ';', '(' , ')']);
ldef.define('operator', [ '+', '-', '*', '/', '==', '===', '**', '^', '!', '|', '||', '&', '&&','<=', '<', '>=', '> ']);
ldef.define('assignable', ['=', ':'])

module.exports = {
    lex: function lex(lexerize){
        const lexer = ldef.lexer(lexerize);
     
        let token;
        let lexemes = []
        
        while (token = lexer.next())
            lexemes.push(token)

        return lexemes
    }
}
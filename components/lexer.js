const gelex = require('gelex');
const ldef = gelex.definition();
 
ldef.define('integer', '[0123456789][0123456789]*');
ldef.define('name', '[a-zA-Z_][a-zA-Z0-9_]*');
ldef.define('delimiter', [ '{', '}', ',', ';', '(' , ')']);
ldef.define('operator', [ '+', '-', '*', '/', '==', '===', '**', '^', '!', '|', '||', '&', '&&' ]);
ldef.defineText('string', "'", "'");
 


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
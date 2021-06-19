const fs = require("fs")
const code = fs.readFileSync(process.argv[2]).toString();
const lexer = require('./components/lexer.js').lex(code)
const parser = require('./components/parser.js').parse(lexer)
const program = require('./components/parser.js').parse('program')

function Interpreter() {
    const context = {};
    
    this.processSequence = function (node) {
        const nodes = node.nodes();
        let result;
        
        for (let k = 0; k < nodes.length; k++)
            result = nodes[k].process(this);
        
        return result;
    };
    
    this.processVariable = function (node) {
        context[node.name()] = null;
    };
    
    this.processName = function (node) {
        return context[node.name()];
    }
    
    this.processAssign = function (node) {
        const value = node.expression().process(this);
        
        context[node.lefthand().name()] = value;
        
        return value;
    ;}
    
    this.processConstant = function (node) { return node.value(); };
    
    this.processPrint = function (node) {
        const value = node.expression().process(this);
        
        console.log(value);
        
        return value;
    }
    
    this.processBinary = function (node) {
        const lvalue = node.left().process(this);
        const rvalue = node.right().process(this);
        
        if (node.operator() === '+')
            return lvalue + rvalue;
        if (node.operator() === '-')
            return lvalue - rvalue;
        if (node.operator() === '*')
            return lvalue * rvalue;
        if (node.operator() === '/')
            return lvalue / rvalue;
        if (node.operator() === '===')
            return lvalue === rvalue;
        if (node.operator() === '==')
            return lvalue == rvalue;
        if (node.operator() === '<=')
            return lvalue <= rvalue;
        if (node.operator() === '<')
            return lvalue < rvalue;
        if (node.operator() === '>')
            return lvalue > rvalue;
        if (node.operator() === '>=')
            return lvalue >= rvalue;
    }
}

const interpreter = new Interpreter();

program.process(interpreter);
// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
function id(x) { return x[0]; }
let Lexer = undefined;
let ParserRules = [
    {"name": "main$ebnf$1$subexpression$1", "symbols": ["statement", {"literal":"\n"}]},
    {"name": "main$ebnf$1", "symbols": ["main$ebnf$1$subexpression$1"]},
    {"name": "main$ebnf$1$subexpression$2", "symbols": ["statement", {"literal":"\n"}]},
    {"name": "main$ebnf$1", "symbols": ["main$ebnf$1", "main$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "main", "symbols": ["main$ebnf$1"]},
    {"name": "statement$string$1", "symbols": [{"literal":"f"}, {"literal":"o"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "statement", "symbols": ["statement$string$1"]},
    {"name": "statement$string$2", "symbols": [{"literal":"b"}, {"literal":"a"}, {"literal":"r"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "statement", "symbols": ["statement$string$2"]}
];
let ParserStart = "main";
export default { Lexer, ParserRules, ParserStart };

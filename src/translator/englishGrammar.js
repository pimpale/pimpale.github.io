// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
function id(x) { return x[0]; }

import english from './english.json';


// parts of speech
const det = {test: x => x in english.det};
const pronoun = {test: x => x in english.pronoun};
const pronoun_pos = {test: x => x in english.pronoun_pos};
const proper_noun = {test: x => x in english.proper_noun};
const noun = {test: x => x in english.noun};
const preposition = {test: x => x in english.preposition};

// particles
const to = {test: x => x in english.to};
const s = {test: x => x in english.s};
const that = {test: x => x in english.that};

// verbs
const v = {test: x => x in english.v};
const v_pp = {test: x => x in english.v_pp};
const v_ap = {test: x => x in english.v_ap};
const v_to_inf_cl = {test: x => x in english.v_to_inf_cl};
const v_bare_inf_cl = {test: x => x in english.v_bare_inf_cl};
const v_declarative_cl = {test: x => x in english.v_declarative_cl};
const v_interrogative_cl = {test: x => x in english.v_interrogative_cl};
const v_np = {test: x => x in english.v_np};
const v_np_pp = {test: x => x in english.v_np_pp};
const v_np_ap = {test: x => x in english.v_np_ap};
const v_np_to_inf_cl = {test: x => x in english.v_np_to_inf_cl};
const v_np_bare_inf_cl = {test: x => x in english.v_np_bare_inf_cl};
const v_np_declarative_cl = {test: x => x in english.v_np_declarative_cl};
const v_np_exclamative_cl = {test: x => x in english.v_np_exclamative_cl};
const v_np_interrogative_cl = {test: x => x in english.v_np_interrogative_cl};

// adjectives
const adj = {test: x => x in english.adj}; // adjectives that don't take any arguments (ex: "happy")
const adj_pp = {test: x => x in english.adj_pp}; // adjectives that take a prepositional phrase argument (ex: "fond of cheese")

let Lexer = lexer;
let ParserRules = [
    {"name": "decl_fin_cl$ebnf$1", "symbols": []},
    {"name": "decl_fin_cl$ebnf$1", "symbols": ["decl_fin_cl$ebnf$1", "pp"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decl_fin_cl$ebnf$2", "symbols": []},
    {"name": "decl_fin_cl$ebnf$2", "symbols": ["decl_fin_cl$ebnf$2", "pp"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decl_fin_cl", "symbols": ["decl_fin_cl$ebnf$1", "fin_vp", "decl_fin_cl$ebnf$2"]},
    {"name": "fin_vp", "symbols": ["np", (lexer.has("v") ? {type: "v"} : v)]},
    {"name": "fin_vp", "symbols": ["np", (lexer.has("v_pp") ? {type: "v_pp"} : v_pp), "pp"]},
    {"name": "fin_vp", "symbols": ["np", (lexer.has("v_ap") ? {type: "v_ap"} : v_ap), "ap"]},
    {"name": "fin_vp", "symbols": ["np", (lexer.has("v_to_inf_cl") ? {type: "v_to_inf_cl"} : v_to_inf_cl), "to_inf_cl"]},
    {"name": "fin_vp", "symbols": ["np", (lexer.has("v_bare_inf_cl") ? {type: "v_bare_inf_cl"} : v_bare_inf_cl), "bare_inf_cl"]},
    {"name": "fin_vp", "symbols": ["np", (lexer.has("v_declarative_cl") ? {type: "v_declarative_cl"} : v_declarative_cl), "declarative_cl"]},
    {"name": "fin_vp", "symbols": ["np", (lexer.has("v_interrogative_cl") ? {type: "v_interrogative_cl"} : v_interrogative_cl), "interrogative_cl"]},
    {"name": "fin_vp", "symbols": ["np", (lexer.has("v_declarative_cl") ? {type: "v_declarative_cl"} : v_declarative_cl), "exclamative_cl"]},
    {"name": "fin_vp", "symbols": ["np", (lexer.has("v_np") ? {type: "v_np"} : v_np), "np"]},
    {"name": "fin_vp", "symbols": ["np", (lexer.has("v_np_pp") ? {type: "v_np_pp"} : v_np_pp), "np", "pp"]},
    {"name": "fin_vp", "symbols": ["np", (lexer.has("v_np_ap") ? {type: "v_np_ap"} : v_np_ap), "np", "ap"]},
    {"name": "fin_vp", "symbols": ["np", (lexer.has("v_np_to_inf_cl") ? {type: "v_np_to_inf_cl"} : v_np_to_inf_cl), "np", "to_inf_cl"]},
    {"name": "fin_vp", "symbols": ["np", (lexer.has("v_np_bare_inf_cl") ? {type: "v_np_bare_inf_cl"} : v_np_bare_inf_cl), "np", "bare_inf_cl"]},
    {"name": "fin_vp", "symbols": ["np", (lexer.has("v_np_declarative_cl") ? {type: "v_np_declarative_cl"} : v_np_declarative_cl), "np", "declarative_cl"]},
    {"name": "fin_vp", "symbols": ["np", (lexer.has("v_np_exclamative_cl") ? {type: "v_np_exclamative_cl"} : v_np_exclamative_cl), "np", "exclamative_cl"]},
    {"name": "fin_vp", "symbols": ["np", (lexer.has("v_np_interrogative_cl") ? {type: "v_np_interrogative_cl"} : v_np_interrogative_cl), "np", "interrogative_cl"]},
    {"name": "fin_vp", "symbols": ["np", (lexer.has("v_np_np") ? {type: "v_np_np"} : v_np_np), "np", "np"]},
    {"name": "fin_vp", "symbols": ["np", (lexer.has("v_np_np") ? {type: "v_np_np"} : v_np_np), "np", (lexer.has("to") ? {type: "to"} : to), "np"]},
    {"name": "to_inf_cl", "symbols": [(lexer.has("to") ? {type: "to"} : to), "bare_inf_cl"]},
    {"name": "to_inf_cl_some_np_moved", "symbols": [(lexer.has("to") ? {type: "to"} : to), "bare_inf_cl_some_np_moved"]},
    {"name": "to_inf_cl_pp_moved", "symbols": [(lexer.has("to") ? {type: "to"} : to), "bare_inf_cl_pp_moved"]},
    {"name": "to_inf_cl_pp_stranded", "symbols": [(lexer.has("to") ? {type: "to"} : to), "bare_inf_cl_pp_stranded"]},
    {"name": "bare_inf_cl$ebnf$1", "symbols": []},
    {"name": "bare_inf_cl$ebnf$1", "symbols": ["bare_inf_cl$ebnf$1", "pp"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "bare_inf_cl", "symbols": ["inf_vp", "bare_inf_cl$ebnf$1"]},
    {"name": "bare_inf_cl_some_np_moved$ebnf$1", "symbols": []},
    {"name": "bare_inf_cl_some_np_moved$ebnf$1", "symbols": ["bare_inf_cl_some_np_moved$ebnf$1", "pp"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "bare_inf_cl_some_np_moved", "symbols": ["inf_vp_some_np_moved", "bare_inf_cl_some_np_moved$ebnf$1"]},
    {"name": "bare_inf_cl_pp_moved$ebnf$1", "symbols": []},
    {"name": "bare_inf_cl_pp_moved$ebnf$1", "symbols": ["bare_inf_cl_pp_moved$ebnf$1", "pp"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "bare_inf_cl_pp_moved", "symbols": ["inf_vp_pp_moved", "bare_inf_cl_pp_moved$ebnf$1"]},
    {"name": "bare_inf_cl_pp_stranded$ebnf$1", "symbols": []},
    {"name": "bare_inf_cl_pp_stranded$ebnf$1", "symbols": ["bare_inf_cl_pp_stranded$ebnf$1", "pp"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "bare_inf_cl_pp_stranded", "symbols": ["inf_vp_pp_stranded", "bare_inf_cl_pp_stranded$ebnf$1"]},
    {"name": "inf_vp", "symbols": [(lexer.has("v") ? {type: "v"} : v)]},
    {"name": "inf_vp", "symbols": [(lexer.has("v_pp") ? {type: "v_pp"} : v_pp), "pp"]},
    {"name": "inf_vp", "symbols": [(lexer.has("v_ap") ? {type: "v_ap"} : v_ap), "ap"]},
    {"name": "inf_vp", "symbols": [(lexer.has("v_to_inf_cl") ? {type: "v_to_inf_cl"} : v_to_inf_cl), "to_inf_cl"]},
    {"name": "inf_vp", "symbols": [(lexer.has("v_declarative_cl") ? {type: "v_declarative_cl"} : v_declarative_cl), "declarative_cl"]},
    {"name": "inf_vp", "symbols": [(lexer.has("v_declarative_cl") ? {type: "v_declarative_cl"} : v_declarative_cl), "exclamative_cl"]},
    {"name": "inf_vp", "symbols": [(lexer.has("v_interrogative_cl") ? {type: "v_interrogative_cl"} : v_interrogative_cl), "interrogative_cl"]},
    {"name": "inf_vp", "symbols": [(lexer.has("v_np") ? {type: "v_np"} : v_np), "np"]},
    {"name": "inf_vp", "symbols": [(lexer.has("v_np_pp") ? {type: "v_np_pp"} : v_np_pp), "np", "pp"]},
    {"name": "inf_vp", "symbols": [(lexer.has("v_np_ap") ? {type: "v_np_ap"} : v_np_ap), "np", "ap"]},
    {"name": "inf_vp", "symbols": [(lexer.has("v_np_to_inf_cl") ? {type: "v_np_to_inf_cl"} : v_np_to_inf_cl), "np", "to_inf_cl"]},
    {"name": "inf_vp", "symbols": [(lexer.has("v_np_bare_inf_cl") ? {type: "v_np_bare_inf_cl"} : v_np_bare_inf_cl), "np", "bare_inf_cl"]},
    {"name": "inf_vp", "symbols": [(lexer.has("v_np_declarative_cl") ? {type: "v_np_declarative_cl"} : v_np_declarative_cl), "np", "declarative_cl"]},
    {"name": "inf_vp", "symbols": [(lexer.has("v_np_exclamative_cl") ? {type: "v_np_exclamative_cl"} : v_np_exclamative_cl), "np", "exclamative_cl"]},
    {"name": "inf_vp", "symbols": [(lexer.has("v_np_interrogative_cl") ? {type: "v_np_interrogative_cl"} : v_np_interrogative_cl), "np", "interrogative_cl"]},
    {"name": "inf_vp", "symbols": [(lexer.has("v_np_np") ? {type: "v_np_np"} : v_np_np), "np", "np"]},
    {"name": "inf_vp_some_np_moved", "symbols": [(lexer.has("v_np") ? {type: "v_np"} : v_np)]},
    {"name": "inf_vp_some_np_moved", "symbols": [(lexer.has("v_np_pp") ? {type: "v_np_pp"} : v_np_pp), "pp"]},
    {"name": "inf_vp_some_np_moved", "symbols": [(lexer.has("v_np_ap") ? {type: "v_np_ap"} : v_np_ap), "ap"]},
    {"name": "inf_vp_some_np_moved", "symbols": [(lexer.has("v_np_to_inf_cl") ? {type: "v_np_to_inf_cl"} : v_np_to_inf_cl), "to_inf_cl"]},
    {"name": "inf_vp_some_np_moved", "symbols": [(lexer.has("v_np_bare_inf_cl") ? {type: "v_np_bare_inf_cl"} : v_np_bare_inf_cl), "bare_inf_cl"]},
    {"name": "inf_vp_some_np_moved", "symbols": [(lexer.has("v_np_declarative_cl") ? {type: "v_np_declarative_cl"} : v_np_declarative_cl), "declarative_cl"]},
    {"name": "inf_vp_some_np_moved", "symbols": [(lexer.has("v_np_exclamative_cl") ? {type: "v_np_exclamative_cl"} : v_np_exclamative_cl), "exclamative_cl"]},
    {"name": "inf_vp_some_np_moved", "symbols": [(lexer.has("v_np_interrogative_cl") ? {type: "v_np_interrogative_cl"} : v_np_interrogative_cl), "interrogative_cl"]},
    {"name": "inf_vp_some_np_moved", "symbols": [(lexer.has("v_np_np") ? {type: "v_np_np"} : v_np_np), "np"]},
    {"name": "inf_vp_pp_moved", "symbols": [(lexer.has("v_pp") ? {type: "v_pp"} : v_pp)]},
    {"name": "inf_vp_pp_moved", "symbols": [(lexer.has("v_np_pp") ? {type: "v_np_pp"} : v_np_pp), "np"]},
    {"name": "inf_vp_pp_stranded", "symbols": [(lexer.has("v_pp") ? {type: "v_pp"} : v_pp), (lexer.has("preposition") ? {type: "preposition"} : preposition)]},
    {"name": "inf_vp_pp_stranded", "symbols": [(lexer.has("v_np_pp") ? {type: "v_np_pp"} : v_np_pp), "np", (lexer.has("preposition") ? {type: "preposition"} : preposition)]},
    {"name": "declarative_cl", "symbols": [(lexer.has("that") ? {type: "that"} : that), "decl_fin_cl"]},
    {"name": "exclamative_cl", "symbols": ["interrogative_cl"]},
    {"name": "interrogative_cl", "symbols": ["open_interrogative_cl"]},
    {"name": "interrogative_cl", "symbols": ["closed_interrogative_cl"]},
    {"name": "open_interrogative_cl$ebnf$1", "symbols": []},
    {"name": "open_interrogative_cl$ebnf$1", "symbols": ["open_interrogative_cl$ebnf$1", "pp"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "open_interrogative_cl", "symbols": ["fin_vp_wh_moved", "open_interrogative_cl$ebnf$1"]},
    {"name": "open_interrogative_cl$ebnf$2", "symbols": []},
    {"name": "open_interrogative_cl$ebnf$2", "symbols": ["open_interrogative_cl$ebnf$2", "pp"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "open_interrogative_cl", "symbols": ["wh_pp", "fin_vp", "open_interrogative_cl$ebnf$2"]},
    {"name": "open_interrogative_cl$ebnf$3", "symbols": []},
    {"name": "open_interrogative_cl$ebnf$3", "symbols": ["open_interrogative_cl$ebnf$3", "pp"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "open_interrogative_cl", "symbols": ["wh_np", "fin_vp", (lexer.has("preposition") ? {type: "preposition"} : preposition), "open_interrogative_cl$ebnf$3"]},
    {"name": "closed_interrogative_cl", "symbols": [(lexer.has("interrogative_subordinator") ? {type: "interrogative_subordinator"} : interrogative_subordinator), "decl_fin_cl"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", (lexer.has("v") ? {type: "v"} : v)]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", (lexer.has("v_pp") ? {type: "v_pp"} : v_pp), "pp"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", (lexer.has("v_ap") ? {type: "v_ap"} : v_ap), "ap"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", (lexer.has("v_to_inf_cl") ? {type: "v_to_inf_cl"} : v_to_inf_cl), "to_inf_cl"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", (lexer.has("v_bare_inf_cl") ? {type: "v_bare_inf_cl"} : v_bare_inf_cl), "bare_inf_cl"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", (lexer.has("v_declarative_cl") ? {type: "v_declarative_cl"} : v_declarative_cl), "declarative_cl"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", (lexer.has("v_exclamative_cl") ? {type: "v_exclamative_cl"} : v_exclamative_cl), "exclamative_cl"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", (lexer.has("v_interrogative_cl") ? {type: "v_interrogative_cl"} : v_interrogative_cl), "interrogative_cl"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", (lexer.has("v_np") ? {type: "v_np"} : v_np), "np"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", (lexer.has("v_np_pp") ? {type: "v_np_pp"} : v_np_pp), "np", "pp"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", (lexer.has("v_np_ap") ? {type: "v_np_ap"} : v_np_ap), "np", "ap"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", (lexer.has("v_np_to_inf_cl") ? {type: "v_np_to_inf_cl"} : v_np_to_inf_cl), "np", "to_inf_cl"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", (lexer.has("v_np_bare_inf_cl") ? {type: "v_np_bare_inf_cl"} : v_np_bare_inf_cl), "np", "bare_inf_cl"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", (lexer.has("v_np_declarative_cl") ? {type: "v_np_declarative_cl"} : v_np_declarative_cl), "np", "declarative_cl"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", (lexer.has("v_np_declarative_cl") ? {type: "v_np_declarative_cl"} : v_np_declarative_cl), "np", "exclamative_cl"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", (lexer.has("v_np_interrogative_cl") ? {type: "v_np_interrogative_cl"} : v_np_interrogative_cl), "np", "interrogative_cl"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", (lexer.has("v_np_np") ? {type: "v_np_np"} : v_np_np), "np", "np"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", (lexer.has("v_np_np") ? {type: "v_np_np"} : v_np_np), "np", (lexer.has("to") ? {type: "to"} : to), "np"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", (lexer.has("v_np") ? {type: "v_np"} : v_np)]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", (lexer.has("v_np_pp") ? {type: "v_np_pp"} : v_np_pp), "pp"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", (lexer.has("v_np_ap") ? {type: "v_np_ap"} : v_np_ap), "ap"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", (lexer.has("v_np_to_inf_cl") ? {type: "v_np_to_inf_cl"} : v_np_to_inf_cl), "to_inf_cl"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", (lexer.has("v_np_bare_inf_cl") ? {type: "v_np_bare_inf_cl"} : v_np_bare_inf_cl), "bare_inf_cl"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", (lexer.has("v_np_declarative_cl") ? {type: "v_np_declarative_cl"} : v_np_declarative_cl), "declarative_cl"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", (lexer.has("v_np_exclamative_cl") ? {type: "v_np_exclamative_cl"} : v_np_exclamative_cl), "exclamative_cl"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", (lexer.has("v_np_interrogative_cl") ? {type: "v_np_interrogative_cl"} : v_np_interrogative_cl), "interrogative_cl"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", (lexer.has("v_np_np") ? {type: "v_np_np"} : v_np_np), "np"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", (lexer.has("v_np_np") ? {type: "v_np_np"} : v_np_np), (lexer.has("to") ? {type: "to"} : to), "np"]},
    {"name": "fin_vp_wh_moved", "symbols": [(lexer.has("to") ? {type: "to"} : to), "wh_np", "np", (lexer.has("v_np_np") ? {type: "v_np_np"} : v_np_np), "np"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", (lexer.has("v_np_np") ? {type: "v_np_np"} : v_np_np), "np", (lexer.has("to") ? {type: "to"} : to)]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_pp", (lexer.has("v_pp") ? {type: "v_pp"} : v_pp)]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", (lexer.has("v_pp") ? {type: "v_pp"} : v_pp), (lexer.has("preposition") ? {type: "preposition"} : preposition)]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_pp", "np", (lexer.has("v_np_pp") ? {type: "v_np_pp"} : v_np_pp), "pp"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", (lexer.has("v_np_pp") ? {type: "v_np_pp"} : v_np_pp), (lexer.has("preposition") ? {type: "preposition"} : preposition)]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", (lexer.has("v_to_inf_cl") ? {type: "v_to_inf_cl"} : v_to_inf_cl), "to_inf_cl_some_np_moved"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_pp", (lexer.has("v_to_inf_cl") ? {type: "v_to_inf_cl"} : v_to_inf_cl), "to_inf_cl_pp_moved"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", (lexer.has("v_to_inf_cl") ? {type: "v_to_inf_cl"} : v_to_inf_cl), "to_inf_cl_pp_stranded"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", (lexer.has("v_np_to_inf_cl") ? {type: "v_np_to_inf_cl"} : v_np_to_inf_cl), "to_inf_cl_some_np_moved"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_pp", "np", (lexer.has("v_np_to_inf_cl") ? {type: "v_np_to_inf_cl"} : v_np_to_inf_cl), "to_inf_cl_pp_moved"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", (lexer.has("v_np_to_inf_cl") ? {type: "v_np_to_inf_cl"} : v_np_to_inf_cl), "to_inf_cl_pp_stranded"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", (lexer.has("v_bare_inf_cl") ? {type: "v_bare_inf_cl"} : v_bare_inf_cl), "bare_inf_cl_some_np_moved"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_pp", (lexer.has("v_bare_inf_cl") ? {type: "v_bare_inf_cl"} : v_bare_inf_cl), "bare_inf_cl_pp_moved"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", (lexer.has("v_bare_inf_cl") ? {type: "v_bare_inf_cl"} : v_bare_inf_cl), "bare_inf_cl_pp_stranded"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", (lexer.has("v_np_bare_inf_cl") ? {type: "v_np_bare_inf_cl"} : v_np_bare_inf_cl), "bare_inf_cl_some_np_moved"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_pp", "np", (lexer.has("v_np_bare_inf_cl") ? {type: "v_np_bare_inf_cl"} : v_np_bare_inf_cl), "bare_inf_cl_pp_moved"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", (lexer.has("v_np_bare_inf_cl") ? {type: "v_np_bare_inf_cl"} : v_np_bare_inf_cl), "bare_inf_cl_pp_stranded"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", (lexer.has("v_declarative_cl") ? {type: "v_declarative_cl"} : v_declarative_cl), "declarative_cl_some_np_moved"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_pp", (lexer.has("v_declarative_cl") ? {type: "v_declarative_cl"} : v_declarative_cl), "declarative_cl_pp_moved"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", (lexer.has("v_declarative_cl") ? {type: "v_declarative_cl"} : v_declarative_cl), "declarative_cl_pp_stranded"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", (lexer.has("v_np_declarative_cl") ? {type: "v_np_declarative_cl"} : v_np_declarative_cl), "declarative_cl_some_np_moved"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_pp", "np", (lexer.has("v_np_declarative_cl") ? {type: "v_np_declarative_cl"} : v_np_declarative_cl), "declarative_cl_pp_moved"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", (lexer.has("v_np_declarative_cl") ? {type: "v_np_declarative_cl"} : v_np_declarative_cl), "declarative_cl_pp_stranded"]},
    {"name": "declarative_cl_some_np_moved$ebnf$1", "symbols": []},
    {"name": "declarative_cl_some_np_moved$ebnf$1", "symbols": ["declarative_cl_some_np_moved$ebnf$1", "pp"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "declarative_cl_some_np_moved", "symbols": [(lexer.has("that") ? {type: "that"} : that), "fin_vp_np_moved", "declarative_cl_some_np_moved$ebnf$1"]},
    {"name": "declarative_cl_pp_moved$ebnf$1", "symbols": []},
    {"name": "declarative_cl_pp_moved$ebnf$1", "symbols": ["declarative_cl_pp_moved$ebnf$1", "pp"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "declarative_cl_pp_moved", "symbols": [(lexer.has("that") ? {type: "that"} : that), "fin_vp_pp_moved", "declarative_cl_pp_moved$ebnf$1"]},
    {"name": "declarative_cl_pp_stranded$ebnf$1", "symbols": []},
    {"name": "declarative_cl_pp_stranded$ebnf$1", "symbols": ["declarative_cl_pp_stranded$ebnf$1", "pp"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "declarative_cl_pp_stranded", "symbols": [(lexer.has("that") ? {type: "that"} : that), "fin_vp_pp_stranded", "declarative_cl_pp_stranded$ebnf$1"]},
    {"name": "fin_vp_np_moved", "symbols": ["np", (lexer.has("v_np") ? {type: "v_np"} : v_np)]},
    {"name": "fin_vp_np_moved", "symbols": ["np", (lexer.has("v_np_pp") ? {type: "v_np_pp"} : v_np_pp), "pp"]},
    {"name": "fin_vp_np_moved", "symbols": ["np", (lexer.has("v_np_ap") ? {type: "v_np_ap"} : v_np_ap), "ap"]},
    {"name": "fin_vp_np_moved", "symbols": ["np", (lexer.has("v_np_to_inf_cl") ? {type: "v_np_to_inf_cl"} : v_np_to_inf_cl), "to_inf_cl"]},
    {"name": "fin_vp_np_moved", "symbols": ["np", (lexer.has("v_np_bare_inf_cl") ? {type: "v_np_bare_inf_cl"} : v_np_bare_inf_cl), "bare_inf_cl"]},
    {"name": "fin_vp_np_moved", "symbols": ["np", (lexer.has("v_np_declarative_cl") ? {type: "v_np_declarative_cl"} : v_np_declarative_cl), "declarative_cl"]},
    {"name": "fin_vp_np_moved", "symbols": ["np", (lexer.has("v_np_exclamative_cl") ? {type: "v_np_exclamative_cl"} : v_np_exclamative_cl), "exclamative_cl"]},
    {"name": "fin_vp_np_moved", "symbols": ["np", (lexer.has("v_np_interrogative_cl") ? {type: "v_np_interrogative_cl"} : v_np_interrogative_cl), "interrogative_cl"]},
    {"name": "fin_vp_np_moved", "symbols": ["np", (lexer.has("v_np_np") ? {type: "v_np_np"} : v_np_np), "np"]},
    {"name": "fin_vp_pp_moved", "symbols": ["np", (lexer.has("v_pp") ? {type: "v_pp"} : v_pp)]},
    {"name": "fin_vp_pp_moved", "symbols": ["np", (lexer.has("v_np_pp") ? {type: "v_np_pp"} : v_np_pp), "np"]},
    {"name": "fin_vp_pp_stranded", "symbols": ["np", (lexer.has("v_pp") ? {type: "v_pp"} : v_pp), (lexer.has("preposition") ? {type: "preposition"} : preposition)]},
    {"name": "fin_vp_pp_stranded", "symbols": ["np", (lexer.has("v_np_pp") ? {type: "v_np_pp"} : v_np_pp), "np", (lexer.has("preposition") ? {type: "preposition"} : preposition)]},
    {"name": "np", "symbols": [(lexer.has("proper_noun") ? {type: "proper_noun"} : proper_noun)]},
    {"name": "np", "symbols": [(lexer.has("pronoun") ? {type: "pronoun"} : pronoun)]},
    {"name": "np$ebnf$1", "symbols": []},
    {"name": "np$ebnf$1", "symbols": ["np$ebnf$1", (lexer.has("periph_mod") ? {type: "periph_mod"} : periph_mod)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "np$ebnf$2", "symbols": []},
    {"name": "np$ebnf$2", "symbols": ["np$ebnf$2", "ap"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "np$ebnf$3", "symbols": []},
    {"name": "np$ebnf$3", "symbols": ["np$ebnf$3", "n_modifier"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "np$ebnf$4", "symbols": []},
    {"name": "np$ebnf$4", "symbols": ["np$ebnf$4", (lexer.has("periph_mod") ? {type: "periph_mod"} : periph_mod)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "np", "symbols": ["np$ebnf$1", "dp", "np$ebnf$2", (lexer.has("noun") ? {type: "noun"} : noun), "np$ebnf$3", "np$ebnf$4"]},
    {"name": "wh_np", "symbols": [(lexer.has("wh") ? {type: "wh"} : wh), "np"]},
    {"name": "n_modifier", "symbols": ["declarative_cl"]},
    {"name": "n_modifier", "symbols": ["pp"]},
    {"name": "dp", "symbols": [(lexer.has("det") ? {type: "det"} : det)]},
    {"name": "dp", "symbols": ["np", (lexer.has("s") ? {type: "s"} : s)]},
    {"name": "dp", "symbols": [(lexer.has("pronoun_pos") ? {type: "pronoun_pos"} : pronoun_pos)]},
    {"name": "pp", "symbols": [(lexer.has("preposition") ? {type: "preposition"} : preposition), "np"]},
    {"name": "wh_pp", "symbols": [(lexer.has("preposition") ? {type: "preposition"} : preposition), "wh_np"]},
    {"name": "ap", "symbols": [(lexer.has("adj") ? {type: "adj"} : adj)]},
    {"name": "ap", "symbols": [(lexer.has("adj_pp") ? {type: "adj_pp"} : adj_pp), "pp"]}
];
let ParserStart = "decl_fin_cl";
export default { Lexer, ParserRules, ParserStart };

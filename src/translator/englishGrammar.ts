// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any { return d[0]; }

import english from './english.json';


// parts of speech
const det = {test: x => x in english.det};
const pronoun = {test: x => x in english.pronoun};
const pronoun_pos = {test: x => x in english.pronoun_pos};
const proper_noun = {test: x => x in english.proper_noun};
const uncountable_noun = {test: x => x in english.uncountable_noun};
const noun = {test: x => x in english.noun};
const preposition = {test: x => x in english.preposition};

// particles
const to = {test: x => x in english.to};
const s = {test: x => x in english.s};
const that = {test: x => x in english.that};
const interrogative_subordinator = {test: x => x in english.interrogative_subordinator};

// verbs
const v = {test: x => x in english.v};
const v_pp = {test: x => x in english.v_pp};
const v_ap = {test: x => x in english.v_ap};
const v_to_inf_cl = {test: x => x in english.v_to_inf_cl};
const v_bare_inf_cl = {test: x => x in english.v_bare_inf_cl};
const v_declarative_cl = {test: x => x in english.v_declarative_cl};
const v_exclamative_cl = {test: x => x in english.v_exclamative_cl};
const v_interrogative_cl = {test: x => x in english.v_interrogative_cl};
const v_np = {test: x => x in english.v_np};
const v_np_pp = {test: x => x in english.v_np_pp};
const v_np_ap = {test: x => x in english.v_np_ap};
const v_np_to_inf_cl = {test: x => x in english.v_np_to_inf_cl};
const v_np_bare_inf_cl = {test: x => x in english.v_np_bare_inf_cl};
const v_np_declarative_cl = {test: x => x in english.v_np_declarative_cl};
const v_np_exclamative_cl = {test: x => x in english.v_np_exclamative_cl};
const v_np_interrogative_cl = {test: x => x in english.v_np_interrogative_cl};
const v_np_np = {test: x => x in english.v_np_np};

// adjectives
const adj = {test: x => x in english.adj}; // adjectives that don't take any arguments (ex: "happy")
const adj_pp = {test: x => x in english.adj_pp}; // adjectives that take a prepositional phrase argument (ex: "fond of cheese")

// adverbs
const adv = {test: x => x in english.adv}; // adverbs that don't take any arguments (ex: "quickly")
const precorenp_modifier = {test: x => x in english.precorenp_modifier}; // peripheral modifiers (ex: "even", "all")
const postcorenp_modifier = {test: x => x in english.postcorenp_modifier}; // peripheral modifiers (ex: "too", "altogether")

// wh-words
const wh = {test: x => x in english.wh}; // wh-words (ex: "who", "what", "where", "when", "why", "how")

// define postprocessors

// nonterminal 
function nonterminal(kind) {
    return (children) => ({kind, children});
}

// nonterminal 
function nonterminal_unpack(kind) {
    return ([children]) => ({kind, children});
}

// terminal
function terminal(kind) {
    return ([value]) => ({kind, children: value});
}


interface NearleyToken {
  value: any;
  [key: string]: any;
};

interface NearleyLexer {
  reset: (chunk: string, info: any) => void;
  next: () => NearleyToken | undefined;
  save: () => any;
  formatError: (token: never) => string;
  has: (tokenType: string) => boolean;
};

interface NearleyRule {
  name: string;
  symbols: NearleySymbol[];
  postprocess?: (d: any[], loc?: number, reject?: {}) => any;
};

type NearleySymbol = string | { literal: any } | { test: (token: any) => boolean };

interface Grammar {
  Lexer: NearleyLexer | undefined;
  ParserRules: NearleyRule[];
  ParserStart: string;
};

const grammar: Grammar = {
  Lexer: undefined,
  ParserRules: [
    {"name": "decl_fin_cl", "symbols": ["pp_list", "fin_vp", "pp_list"], "postprocess": (children) => ({kind: "decl_fin_cl", children})},
    {"name": "fin_vp", "symbols": ["np", "vp"], "postprocess": nonterminal("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "vp_pp", "pp"], "postprocess": nonterminal("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "vp_ap", "ap"], "postprocess": nonterminal("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "vp_to_inf_cl", "to_inf_cl"], "postprocess": nonterminal("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "vp_bare_inf_cl", "bare_inf_cl"], "postprocess": nonterminal("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "vp_declarative_cl", "declarative_cl"], "postprocess": nonterminal("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "vp_exclamative_cl", "exclamative_cl"], "postprocess": nonterminal("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "vp_interrogative_cl", "interrogative_cl"], "postprocess": nonterminal("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "vp_np", "np"], "postprocess": nonterminal("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "vp_np_pp", "np", "pp"], "postprocess": nonterminal("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "vp_np_ap", "np", "ap"], "postprocess": nonterminal("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "vp_np_to_inf_cl", "np", "to_inf_cl"], "postprocess": nonterminal("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "vp_np_bare_inf_cl", "np", "bare_inf_cl"], "postprocess": nonterminal("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "vp_np_declarative_cl", "np", "declarative_cl"], "postprocess": nonterminal("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "vp_np_exclamative_cl", "np", "exclamative_cl"], "postprocess": nonterminal("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "vp_np_interrogative_cl", "np", "interrogative_cl"], "postprocess": nonterminal("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "vp_np_np", "np", "np"], "postprocess": nonterminal("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "vp_np_np", "np", "to", "np"], "postprocess": nonterminal("fin_vp")},
    {"name": "to_inf_cl", "symbols": ["to", "bare_inf_cl"], "postprocess": nonterminal("to_inf_cl")},
    {"name": "to_inf_cl_some_np_moved", "symbols": ["to", "bare_inf_cl_some_np_moved"], "postprocess": nonterminal("to_inf_cl_some_np_moved")},
    {"name": "to_inf_cl_pp_moved", "symbols": ["to", "bare_inf_cl_pp_moved"], "postprocess": nonterminal("to_inf_cl_pp_moved")},
    {"name": "to_inf_cl_pp_stranded", "symbols": ["to", "bare_inf_cl_pp_stranded"], "postprocess": nonterminal("to_inf_cl_pp_stranded")},
    {"name": "bare_inf_cl", "symbols": ["inf_vp", "pp_list"], "postprocess": nonterminal("bare_inf_cl")},
    {"name": "bare_inf_cl_some_np_moved", "symbols": ["inf_vp_some_np_moved", "pp_list"], "postprocess": nonterminal("bare_inf_cl_some_np_moved")},
    {"name": "bare_inf_cl_pp_moved", "symbols": ["inf_vp_pp_moved", "pp_list"], "postprocess": nonterminal("bare_inf_cl_pp_moved")},
    {"name": "bare_inf_cl_pp_stranded", "symbols": ["inf_vp_pp_stranded", "pp_list"], "postprocess": nonterminal("bare_inf_cl_pp_stranded")},
    {"name": "inf_vp", "symbols": ["vp"], "postprocess": nonterminal("inf_vp")},
    {"name": "inf_vp", "symbols": ["vp_pp", "pp"], "postprocess": nonterminal("inf_vp")},
    {"name": "inf_vp", "symbols": ["vp_ap", "ap"], "postprocess": nonterminal("inf_vp")},
    {"name": "inf_vp", "symbols": ["vp_to_inf_cl", "to_inf_cl"], "postprocess": nonterminal("inf_vp")},
    {"name": "inf_vp", "symbols": ["vp_declarative_cl", "declarative_cl"], "postprocess": nonterminal("inf_vp")},
    {"name": "inf_vp", "symbols": ["vp_exclamative_cl", "exclamative_cl"], "postprocess": nonterminal("inf_vp")},
    {"name": "inf_vp", "symbols": ["vp_interrogative_cl", "interrogative_cl"], "postprocess": nonterminal("inf_vp")},
    {"name": "inf_vp", "symbols": ["vp_np", "np"], "postprocess": nonterminal("inf_vp")},
    {"name": "inf_vp", "symbols": ["vp_np_pp", "np", "pp"], "postprocess": nonterminal("inf_vp")},
    {"name": "inf_vp", "symbols": ["vp_np_ap", "np", "ap"], "postprocess": nonterminal("inf_vp")},
    {"name": "inf_vp", "symbols": ["vp_np_to_inf_cl", "np", "to_inf_cl"], "postprocess": nonterminal("inf_vp")},
    {"name": "inf_vp", "symbols": ["vp_np_bare_inf_cl", "np", "bare_inf_cl"], "postprocess": nonterminal("inf_vp")},
    {"name": "inf_vp", "symbols": ["vp_np_declarative_cl", "np", "declarative_cl"], "postprocess": nonterminal("inf_vp")},
    {"name": "inf_vp", "symbols": ["vp_np_exclamative_cl", "np", "exclamative_cl"], "postprocess": nonterminal("inf_vp")},
    {"name": "inf_vp", "symbols": ["vp_np_interrogative_cl", "np", "interrogative_cl"], "postprocess": nonterminal("inf_vp")},
    {"name": "inf_vp", "symbols": ["vp_np_np", "np", "np"], "postprocess": nonterminal("inf_vp")},
    {"name": "inf_vp_some_np_moved", "symbols": ["vp_np"], "postprocess": nonterminal("inf_vp_some_np_moved")},
    {"name": "inf_vp_some_np_moved", "symbols": ["vp_np_pp", "pp"], "postprocess": nonterminal("inf_vp_some_np_moved")},
    {"name": "inf_vp_some_np_moved", "symbols": ["vp_np_ap", "ap"], "postprocess": nonterminal("inf_vp_some_np_moved")},
    {"name": "inf_vp_some_np_moved", "symbols": ["vp_np_to_inf_cl", "to_inf_cl"], "postprocess": nonterminal("inf_vp_some_np_moved")},
    {"name": "inf_vp_some_np_moved", "symbols": ["vp_np_bare_inf_cl", "bare_inf_cl"], "postprocess": nonterminal("inf_vp_some_np_moved")},
    {"name": "inf_vp_some_np_moved", "symbols": ["vp_np_declarative_cl", "declarative_cl"], "postprocess": nonterminal("inf_vp_some_np_moved")},
    {"name": "inf_vp_some_np_moved", "symbols": ["vp_np_exclamative_cl", "exclamative_cl"], "postprocess": nonterminal("inf_vp_some_np_moved")},
    {"name": "inf_vp_some_np_moved", "symbols": ["vp_np_interrogative_cl", "interrogative_cl"], "postprocess": nonterminal("inf_vp_some_np_moved")},
    {"name": "inf_vp_some_np_moved", "symbols": ["vp_np_np", "np"], "postprocess": nonterminal("inf_vp_some_np_moved")},
    {"name": "inf_vp_pp_moved", "symbols": ["vp_pp"], "postprocess": nonterminal("inf_vp_pp_moved")},
    {"name": "inf_vp_pp_moved", "symbols": ["vp_np_pp", "np"], "postprocess": nonterminal("inf_vp_pp_moved")},
    {"name": "inf_vp_pp_stranded", "symbols": ["vp_pp", "preposition"], "postprocess": nonterminal("inf_vp_pp_moved")},
    {"name": "inf_vp_pp_stranded", "symbols": ["vp_np_pp", "np", "preposition"], "postprocess": nonterminal("inf_vp_pp_moved")},
    {"name": "declarative_cl", "symbols": ["that", "decl_fin_cl"], "postprocess": nonterminal("declarative_cl")},
    {"name": "exclamative_cl", "symbols": ["interrogative_cl"], "postprocess": nonterminal("exclamative_cl")},
    {"name": "interrogative_cl", "symbols": ["fin_vp_wh_moved", "pp_list"], "postprocess": nonterminal("interrogative_cl")},
    {"name": "interrogative_cl", "symbols": ["wh_pp", "fin_vp", "pp_list"], "postprocess": nonterminal("interrogative_cl")},
    {"name": "interrogative_cl", "symbols": ["wh_np", "fin_vp", "preposition", "pp_list"], "postprocess": nonterminal("interrogative_cl")},
    {"name": "interrogative_cl", "symbols": ["interrogative_subordinator", "decl_fin_cl"], "postprocess": nonterminal("interrogative_cl")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_pp", "pp"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_ap", "ap"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_to_inf_cl", "to_inf_cl"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_bare_inf_cl", "bare_inf_cl"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_declarative_cl", "declarative_cl"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_exclamative_cl", "exclamative_cl"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_interrogative_cl", "interrogative_cl"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_np", "np"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_np_pp", "np", "pp"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_np_ap", "np", "ap"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_np_to_inf_cl", "np", "to_inf_cl"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_np_bare_inf_cl", "np", "bare_inf_cl"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_np_declarative_cl", "np", "declarative_cl"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_np_declarative_cl", "np", "exclamative_cl"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_np_interrogative_cl", "np", "interrogative_cl"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_np_np", "np", "np"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_np_np", "np", "to", "np"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np_pp", "pp"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np_ap", "ap"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np_to_inf_cl", "to_inf_cl"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np_bare_inf_cl", "bare_inf_cl"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np_declarative_cl", "declarative_cl"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np_exclamative_cl", "exclamative_cl"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np_interrogative_cl", "interrogative_cl"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np_np", "np"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np_np", "to", "np"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["to", "wh_np", "np", "vp_np_np", "np"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np_np", "np", "to"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_pp", "vp_pp"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_pp", "preposition"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_pp", "np", "vp_np_pp", "pp"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np_pp", "preposition"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_to_inf_cl", "to_inf_cl_some_np_moved"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_pp", "vp_to_inf_cl", "to_inf_cl_pp_moved"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_to_inf_cl", "to_inf_cl_pp_stranded"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np_to_inf_cl", "to_inf_cl_some_np_moved"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_pp", "np", "vp_np_to_inf_cl", "to_inf_cl_pp_moved"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np_to_inf_cl", "to_inf_cl_pp_stranded"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_bare_inf_cl", "bare_inf_cl_some_np_moved"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_pp", "vp_bare_inf_cl", "bare_inf_cl_pp_moved"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_bare_inf_cl", "bare_inf_cl_pp_stranded"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np_bare_inf_cl", "bare_inf_cl_some_np_moved"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_pp", "np", "vp_np_bare_inf_cl", "bare_inf_cl_pp_moved"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np_bare_inf_cl", "bare_inf_cl_pp_stranded"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_declarative_cl", "declarative_cl_some_np_moved"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_pp", "vp_declarative_cl", "declarative_cl_pp_moved"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_declarative_cl", "declarative_cl_pp_stranded"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np_declarative_cl", "declarative_cl_some_np_moved"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_pp", "np", "vp_np_declarative_cl", "declarative_cl_pp_moved"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np_declarative_cl", "declarative_cl_pp_stranded"], "postprocess": nonterminal("fin_vp_wh_moved")},
    {"name": "declarative_cl_some_np_moved", "symbols": ["that", "fin_vp_np_moved", "pp_list"], "postprocess": nonterminal("declarative_cl_some_np_moved")},
    {"name": "declarative_cl_pp_moved", "symbols": ["that", "fin_vp_pp_moved", "pp_list"], "postprocess": nonterminal("declarative_cl_pp_moved")},
    {"name": "declarative_cl_pp_stranded", "symbols": ["that", "fin_vp_pp_stranded", "pp_list"], "postprocess": nonterminal("declarative_cl_pp_stranded")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "vp_np"], "postprocess": nonterminal("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "vp_np_pp", "pp"], "postprocess": nonterminal("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "vp_np_ap", "ap"], "postprocess": nonterminal("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "vp_np_to_inf_cl", "to_inf_cl"], "postprocess": nonterminal("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "vp_np_bare_inf_cl", "bare_inf_cl"], "postprocess": nonterminal("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "vp_np_declarative_cl", "declarative_cl"], "postprocess": nonterminal("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "vp_np_exclamative_cl", "exclamative_cl"], "postprocess": nonterminal("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "vp_np_interrogative_cl", "interrogative_cl"], "postprocess": nonterminal("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "vp_np_np", "np"], "postprocess": nonterminal("fin_vp_np_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "vp_pp"], "postprocess": nonterminal("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "vp_np_pp", "np"], "postprocess": nonterminal("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_stranded", "symbols": ["np", "vp_pp", "preposition"], "postprocess": nonterminal("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_stranded", "symbols": ["np", "vp_np_pp", "np", "preposition"], "postprocess": nonterminal("fin_vp_pp_moved")},
    {"name": "np", "symbols": ["precorenp_modifier_list", "core_np", "postcorenp_modifier_list"], "postprocess": nonterminal("np")},
    {"name": "precorenp_modifier_list$ebnf$1", "symbols": []},
    {"name": "precorenp_modifier_list$ebnf$1", "symbols": ["precorenp_modifier_list$ebnf$1", "precorenp_modifier"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "precorenp_modifier_list", "symbols": ["precorenp_modifier_list$ebnf$1"], "postprocess": nonterminal_unpack("precorenp_modifier_list")},
    {"name": "postcorenp_modifier_list$ebnf$1", "symbols": []},
    {"name": "postcorenp_modifier_list$ebnf$1", "symbols": ["postcorenp_modifier_list$ebnf$1", postcorenp_modifier], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "postcorenp_modifier_list", "symbols": ["postcorenp_modifier_list$ebnf$1"], "postprocess": nonterminal_unpack("postcorenp_modifier_list")},
    {"name": "core_np", "symbols": ["proper_noun"], "postprocess": nonterminal("core_np")},
    {"name": "core_np", "symbols": ["pronoun"], "postprocess": nonterminal("core_np")},
    {"name": "core_np", "symbols": ["ap_list", "uncountable_noun", "n_modifier_list"], "postprocess": nonterminal("core_np")},
    {"name": "core_np", "symbols": ["dp", "ap_list", "noun", "n_modifier_list"], "postprocess": nonterminal("core_np")},
    {"name": "wh_np", "symbols": ["wh"], "postprocess": nonterminal("wh_np")},
    {"name": "wh_np", "symbols": ["wh", "np"], "postprocess": nonterminal("wh_np")},
    {"name": "n_modifier", "symbols": ["declarative_cl"], "postprocess": nonterminal("n_modifier")},
    {"name": "n_modifier", "symbols": ["pp"], "postprocess": nonterminal("n_modifier")},
    {"name": "n_modifier_list$ebnf$1", "symbols": []},
    {"name": "n_modifier_list$ebnf$1", "symbols": ["n_modifier_list$ebnf$1", "n_modifier"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "n_modifier_list", "symbols": ["n_modifier_list$ebnf$1"], "postprocess": nonterminal_unpack("n_modifier_list")},
    {"name": "dp", "symbols": ["det"], "postprocess": nonterminal("det")},
    {"name": "dp", "symbols": ["np", "s"], "postprocess": nonterminal("det")},
    {"name": "dp", "symbols": ["pronoun_pos"], "postprocess": nonterminal("det")},
    {"name": "pp", "symbols": ["preposition", "np"], "postprocess": nonterminal("pp")},
    {"name": "pp_list$ebnf$1", "symbols": []},
    {"name": "pp_list$ebnf$1", "symbols": ["pp_list$ebnf$1", "pp"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "pp_list", "symbols": ["pp_list$ebnf$1"], "postprocess": nonterminal_unpack("pp_list")},
    {"name": "wh_pp", "symbols": ["preposition", "wh_np"], "postprocess": nonterminal("wh_pp")},
    {"name": "ap", "symbols": ["advp", "ap"], "postprocess": nonterminal("ap")},
    {"name": "ap", "symbols": ["adj"], "postprocess": nonterminal("ap")},
    {"name": "ap", "symbols": ["adj_pp", "pp"], "postprocess": nonterminal("ap")},
    {"name": "ap_list$ebnf$1", "symbols": []},
    {"name": "ap_list$ebnf$1", "symbols": ["ap_list$ebnf$1", "ap"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "ap_list", "symbols": ["ap_list$ebnf$1"], "postprocess": nonterminal_unpack("ap_list")},
    {"name": "advp", "symbols": ["adv"], "postprocess": nonterminal("advp")},
    {"name": "advp", "symbols": ["advp", "advp"], "postprocess": nonterminal("advp")},
    {"name": "vp", "symbols": ["v"], "postprocess": nonterminal("vp")},
    {"name": "vp", "symbols": ["advp", "v"], "postprocess": nonterminal("vp")},
    {"name": "vp", "symbols": ["v", "advp"], "postprocess": nonterminal("vp")},
    {"name": "vp_pp", "symbols": ["v_pp"], "postprocess": nonterminal("vp_pp")},
    {"name": "vp_pp", "symbols": ["advp", "v_pp"], "postprocess": nonterminal("vp_pp")},
    {"name": "vp_pp", "symbols": ["v_pp", "advp"], "postprocess": nonterminal("vp_pp")},
    {"name": "vp_ap", "symbols": ["v_ap"], "postprocess": nonterminal("vp_ap")},
    {"name": "vp_ap", "symbols": ["advp", "v_ap"], "postprocess": nonterminal("vp_ap")},
    {"name": "vp_ap", "symbols": ["v_ap", "advp"], "postprocess": nonterminal("vp_ap")},
    {"name": "vp_to_inf_cl", "symbols": ["v_to_inf_cl"], "postprocess": nonterminal("vp_to_inf_cl")},
    {"name": "vp_to_inf_cl", "symbols": ["advp", "v_to_inf_cl"], "postprocess": nonterminal("vp_to_inf_cl")},
    {"name": "vp_to_inf_cl", "symbols": ["v_to_inf_cl", "advp"], "postprocess": nonterminal("vp_to_inf_cl")},
    {"name": "vp_bare_inf_cl", "symbols": ["v_bare_inf_cl"], "postprocess": nonterminal("vp_bare_inf_cl")},
    {"name": "vp_bare_inf_cl", "symbols": ["advp", "v_bare_inf_cl"], "postprocess": nonterminal("vp_bare_inf_cl")},
    {"name": "vp_bare_inf_cl", "symbols": ["v_bare_inf_cl", "advp"], "postprocess": nonterminal("vp_bare_inf_cl")},
    {"name": "vp_declarative_cl", "symbols": ["v_declarative_cl"], "postprocess": nonterminal("vp_declarative_cl")},
    {"name": "vp_declarative_cl", "symbols": ["advp", "v_declarative_cl"], "postprocess": nonterminal("vp_declarative_cl")},
    {"name": "vp_declarative_cl", "symbols": ["v_declarative_cl", "advp"], "postprocess": nonterminal("vp_declarative_cl")},
    {"name": "vp_exclamative_cl", "symbols": ["v_exclamative_cl"], "postprocess": nonterminal("vp_exclamative_cl")},
    {"name": "vp_exclamative_cl", "symbols": ["advp", "v_exclamative_cl"], "postprocess": nonterminal("vp_exclamative_cl")},
    {"name": "vp_exclamative_cl", "symbols": ["v_exclamative_cl", "advp"], "postprocess": nonterminal("vp_exclamative_cl")},
    {"name": "vp_interrogative_cl", "symbols": ["v_interrogative_cl"], "postprocess": nonterminal("vp_interrogative_cl")},
    {"name": "vp_interrogative_cl", "symbols": ["advp", "v_interrogative_cl"], "postprocess": nonterminal("vp_interrogative_cl")},
    {"name": "vp_interrogative_cl", "symbols": ["v_interrogative_cl", "advp"], "postprocess": nonterminal("vp_interrogative_cl")},
    {"name": "vp_np", "symbols": ["v_np"], "postprocess": nonterminal("vp_np")},
    {"name": "vp_np", "symbols": ["advp", "v_np"], "postprocess": nonterminal("vp_np")},
    {"name": "vp_np", "symbols": ["v_np", "advp"], "postprocess": nonterminal("vp_np")},
    {"name": "vp_np_pp", "symbols": ["v_np_pp"], "postprocess": nonterminal("vp_np_pp")},
    {"name": "vp_np_pp", "symbols": ["advp", "v_np_pp"], "postprocess": nonterminal("vp_np_pp")},
    {"name": "vp_np_pp", "symbols": ["v_np_pp", "advp"], "postprocess": nonterminal("vp_np_pp")},
    {"name": "vp_np_ap", "symbols": ["v_np_ap"], "postprocess": nonterminal("vp_np_ap")},
    {"name": "vp_np_ap", "symbols": ["advp", "v_np_ap"], "postprocess": nonterminal("vp_np_ap")},
    {"name": "vp_np_ap", "symbols": ["v_np_ap", "advp"], "postprocess": nonterminal("vp_np_ap")},
    {"name": "vp_np_to_inf_cl", "symbols": ["v_np_to_inf_cl"], "postprocess": nonterminal("vp_np_to_inf_cl")},
    {"name": "vp_np_to_inf_cl", "symbols": ["advp", "v_np_to_inf_cl"], "postprocess": nonterminal("vp_np_to_inf_cl")},
    {"name": "vp_np_to_inf_cl", "symbols": ["v_np_to_inf_cl", "advp"], "postprocess": nonterminal("vp_np_to_inf_cl")},
    {"name": "vp_np_bare_inf_cl", "symbols": ["v_np_bare_inf_cl"], "postprocess": nonterminal("vp_np_bare_inf_cl")},
    {"name": "vp_np_bare_inf_cl", "symbols": ["advp", "v_np_bare_inf_cl"], "postprocess": nonterminal("vp_np_bare_inf_cl")},
    {"name": "vp_np_bare_inf_cl", "symbols": ["v_np_bare_inf_cl", "advp"], "postprocess": nonterminal("vp_np_bare_inf_cl")},
    {"name": "vp_np_declarative_cl", "symbols": ["v_np_declarative_cl"], "postprocess": nonterminal("vp_np_declarative_cl")},
    {"name": "vp_np_declarative_cl", "symbols": ["advp", "v_np_declarative_cl"], "postprocess": nonterminal("vp_np_declarative_cl")},
    {"name": "vp_np_declarative_cl", "symbols": ["v_np_declarative_cl", "advp"], "postprocess": nonterminal("vp_np_declarative_cl")},
    {"name": "vp_np_exclamative_cl", "symbols": ["v_np_exclamative_cl"], "postprocess": nonterminal("vp_np_exclamative_cl")},
    {"name": "vp_np_exclamative_cl", "symbols": ["advp", "v_np_exclamative_cl"], "postprocess": nonterminal("vp_np_exclamative_cl")},
    {"name": "vp_np_exclamative_cl", "symbols": ["v_np_exclamative_cl", "advp"], "postprocess": nonterminal("vp_np_exclamative_cl")},
    {"name": "vp_np_interrogative_cl", "symbols": ["v_np_interrogative_cl"], "postprocess": nonterminal("vp_np_interrogative_cl")},
    {"name": "vp_np_interrogative_cl", "symbols": ["advp", "v_np_interrogative_cl"], "postprocess": nonterminal("vp_np_interrogative_cl")},
    {"name": "vp_np_interrogative_cl", "symbols": ["v_np_interrogative_cl", "advp"], "postprocess": nonterminal("vp_np_interrogative_cl")},
    {"name": "vp_np_np", "symbols": ["v_np_np"], "postprocess": nonterminal("vp_np_np")},
    {"name": "vp_np_np", "symbols": ["advp", "v_np_np"], "postprocess": nonterminal("vp_np_np")},
    {"name": "vp_np_np", "symbols": ["v_np_np", "advp"], "postprocess": nonterminal("vp_np_np")},
    {"name": "det", "symbols": [det], "postprocess": terminal("det")},
    {"name": "pronoun", "symbols": [pronoun], "postprocess": terminal("pronoun")},
    {"name": "pronoun_pos", "symbols": [pronoun_pos], "postprocess": terminal("pronoun_pos")},
    {"name": "proper_noun", "symbols": [proper_noun], "postprocess": terminal("proper_noun")},
    {"name": "uncountable_noun", "symbols": [uncountable_noun], "postprocess": terminal("uncountable_noun")},
    {"name": "noun", "symbols": [noun], "postprocess": terminal("noun")},
    {"name": "preposition", "symbols": [preposition], "postprocess": terminal("preposition")},
    {"name": "to", "symbols": [to], "postprocess": terminal("to")},
    {"name": "s", "symbols": [s], "postprocess": terminal("s")},
    {"name": "that", "symbols": [that], "postprocess": terminal("that")},
    {"name": "interrogative_subordinator", "symbols": [interrogative_subordinator], "postprocess": terminal("interrogative_subordinator")},
    {"name": "v", "symbols": [v], "postprocess": terminal("v")},
    {"name": "v_pp", "symbols": [v_pp], "postprocess": terminal("v_pp")},
    {"name": "v_ap", "symbols": [v_ap], "postprocess": terminal("v_ap")},
    {"name": "v_to_inf_cl", "symbols": [v_to_inf_cl], "postprocess": terminal("v_to_inf_cl")},
    {"name": "v_bare_inf_cl", "symbols": [v_bare_inf_cl], "postprocess": terminal("v_bare_inf_cl")},
    {"name": "v_declarative_cl", "symbols": [v_declarative_cl], "postprocess": terminal("v_declarative_cl")},
    {"name": "v_exclamative_cl", "symbols": [v_exclamative_cl], "postprocess": terminal("v_exclamative_cl")},
    {"name": "v_interrogative_cl", "symbols": [v_interrogative_cl], "postprocess": terminal("v_interrogative_cl")},
    {"name": "v_np", "symbols": [v_np], "postprocess": terminal("v_np")},
    {"name": "v_np_pp", "symbols": [v_np_pp], "postprocess": terminal("v_np_pp")},
    {"name": "v_np_ap", "symbols": [v_np_ap], "postprocess": terminal("v_np_ap")},
    {"name": "v_np_to_inf_cl", "symbols": [v_np_to_inf_cl], "postprocess": terminal("v_np_to_inf_cl")},
    {"name": "v_np_bare_inf_cl", "symbols": [v_np_bare_inf_cl], "postprocess": terminal("v_np_bare_inf_cl")},
    {"name": "v_np_declarative_cl", "symbols": [v_np_declarative_cl], "postprocess": terminal("v_np_declarative_cl")},
    {"name": "v_np_exclamative_cl", "symbols": [v_np_exclamative_cl], "postprocess": terminal("v_np_exclamative_cl")},
    {"name": "v_np_interrogative_cl", "symbols": [v_np_interrogative_cl], "postprocess": terminal("v_np_interrogative_cl")},
    {"name": "v_np_np", "symbols": [v_np_np], "postprocess": terminal("v_np_np")},
    {"name": "adj", "symbols": [adj], "postprocess": terminal("adj")},
    {"name": "adj_pp", "symbols": [adj_pp], "postprocess": terminal("adj_pp")},
    {"name": "adv", "symbols": [adv], "postprocess": terminal("adv")},
    {"name": "wh", "symbols": [wh], "postprocess": terminal("wh")},
    {"name": "precorenp_modifier", "symbols": [precorenp_modifier], "postprocess": terminal("precorenp_modifier")},
    {"name": "postcorenp_modifier", "symbols": [postcorenp_modifier], "postprocess": terminal("postcorenp_modifier")}
  ],
  ParserStart: "decl_fin_cl",
};

export default grammar;

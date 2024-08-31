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
const periph_mod = {test: x => x in english.periph_mod}; // peripheral modifiers (ex: "even", "too")

// wh-words
const wh = {test: x => x in english.wh}; // wh-words (ex: "who", "what", "where", "when", "why", "how")

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
    {"name": "decl_fin_cl$ebnf$1", "symbols": []},
    {"name": "decl_fin_cl$ebnf$1", "symbols": ["decl_fin_cl$ebnf$1", "pp"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "decl_fin_cl$ebnf$2", "symbols": []},
    {"name": "decl_fin_cl$ebnf$2", "symbols": ["decl_fin_cl$ebnf$2", "pp"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "decl_fin_cl", "symbols": ["decl_fin_cl$ebnf$1", "fin_vp", "decl_fin_cl$ebnf$2"]},
    {"name": "fin_vp", "symbols": ["np", "vp"]},
    {"name": "fin_vp", "symbols": ["np", "vp_pp", "pp"]},
    {"name": "fin_vp", "symbols": ["np", "vp_ap", "ap"]},
    {"name": "fin_vp", "symbols": ["np", "vp_to_inf_cl", "to_inf_cl"]},
    {"name": "fin_vp", "symbols": ["np", "vp_bare_inf_cl", "bare_inf_cl"]},
    {"name": "fin_vp", "symbols": ["np", "vp_declarative_cl", "declarative_cl"]},
    {"name": "fin_vp", "symbols": ["np", "vp_exclamative_cl", "exclamative_cl"]},
    {"name": "fin_vp", "symbols": ["np", "vp_interrogative_cl", "interrogative_cl"]},
    {"name": "fin_vp", "symbols": ["np", "vp_np", "np"]},
    {"name": "fin_vp", "symbols": ["np", "vp_np_pp", "np", "pp"]},
    {"name": "fin_vp", "symbols": ["np", "vp_np_ap", "np", "ap"]},
    {"name": "fin_vp", "symbols": ["np", "vp_np_to_inf_cl", "np", "to_inf_cl"]},
    {"name": "fin_vp", "symbols": ["np", "vp_np_bare_inf_cl", "np", "bare_inf_cl"]},
    {"name": "fin_vp", "symbols": ["np", "vp_np_declarative_cl", "np", "declarative_cl"]},
    {"name": "fin_vp", "symbols": ["np", "vp_np_exclamative_cl", "np", "exclamative_cl"]},
    {"name": "fin_vp", "symbols": ["np", "vp_np_interrogative_cl", "np", "interrogative_cl"]},
    {"name": "fin_vp", "symbols": ["np", "vp_np_np", "np", "np"]},
    {"name": "fin_vp", "symbols": ["np", "vp_np_np", "np", to, "np"]},
    {"name": "to_inf_cl", "symbols": [to, "bare_inf_cl"]},
    {"name": "to_inf_cl_some_np_moved", "symbols": [to, "bare_inf_cl_some_np_moved"]},
    {"name": "to_inf_cl_pp_moved", "symbols": [to, "bare_inf_cl_pp_moved"]},
    {"name": "to_inf_cl_pp_stranded", "symbols": [to, "bare_inf_cl_pp_stranded"]},
    {"name": "bare_inf_cl$ebnf$1", "symbols": []},
    {"name": "bare_inf_cl$ebnf$1", "symbols": ["bare_inf_cl$ebnf$1", "pp"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "bare_inf_cl", "symbols": ["inf_vp", "bare_inf_cl$ebnf$1"]},
    {"name": "bare_inf_cl_some_np_moved$ebnf$1", "symbols": []},
    {"name": "bare_inf_cl_some_np_moved$ebnf$1", "symbols": ["bare_inf_cl_some_np_moved$ebnf$1", "pp"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "bare_inf_cl_some_np_moved", "symbols": ["inf_vp_some_np_moved", "bare_inf_cl_some_np_moved$ebnf$1"]},
    {"name": "bare_inf_cl_pp_moved$ebnf$1", "symbols": []},
    {"name": "bare_inf_cl_pp_moved$ebnf$1", "symbols": ["bare_inf_cl_pp_moved$ebnf$1", "pp"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "bare_inf_cl_pp_moved", "symbols": ["inf_vp_pp_moved", "bare_inf_cl_pp_moved$ebnf$1"]},
    {"name": "bare_inf_cl_pp_stranded$ebnf$1", "symbols": []},
    {"name": "bare_inf_cl_pp_stranded$ebnf$1", "symbols": ["bare_inf_cl_pp_stranded$ebnf$1", "pp"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "bare_inf_cl_pp_stranded", "symbols": ["inf_vp_pp_stranded", "bare_inf_cl_pp_stranded$ebnf$1"]},
    {"name": "inf_vp", "symbols": ["vp"]},
    {"name": "inf_vp", "symbols": ["vp_pp", "pp"]},
    {"name": "inf_vp", "symbols": ["vp_ap", "ap"]},
    {"name": "inf_vp", "symbols": ["vp_to_inf_cl", "to_inf_cl"]},
    {"name": "inf_vp", "symbols": ["vp_declarative_cl", "declarative_cl"]},
    {"name": "inf_vp", "symbols": ["vp_exclamative_cl", "exclamative_cl"]},
    {"name": "inf_vp", "symbols": ["vp_interrogative_cl", "interrogative_cl"]},
    {"name": "inf_vp", "symbols": ["vp_np", "np"]},
    {"name": "inf_vp", "symbols": ["vp_np_pp", "np", "pp"]},
    {"name": "inf_vp", "symbols": ["vp_np_ap", "np", "ap"]},
    {"name": "inf_vp", "symbols": ["vp_np_to_inf_cl", "np", "to_inf_cl"]},
    {"name": "inf_vp", "symbols": ["vp_np_bare_inf_cl", "np", "bare_inf_cl"]},
    {"name": "inf_vp", "symbols": ["vp_np_declarative_cl", "np", "declarative_cl"]},
    {"name": "inf_vp", "symbols": ["vp_np_exclamative_cl", "np", "exclamative_cl"]},
    {"name": "inf_vp", "symbols": ["vp_np_interrogative_cl", "np", "interrogative_cl"]},
    {"name": "inf_vp", "symbols": ["vp_np_np", "np", "np"]},
    {"name": "inf_vp_some_np_moved", "symbols": ["vp_np"]},
    {"name": "inf_vp_some_np_moved", "symbols": ["vp_np_pp", "pp"]},
    {"name": "inf_vp_some_np_moved", "symbols": ["vp_np_ap", "ap"]},
    {"name": "inf_vp_some_np_moved", "symbols": ["vp_np_to_inf_cl", "to_inf_cl"]},
    {"name": "inf_vp_some_np_moved", "symbols": ["vp_np_bare_inf_cl", "bare_inf_cl"]},
    {"name": "inf_vp_some_np_moved", "symbols": ["vp_np_declarative_cl", "declarative_cl"]},
    {"name": "inf_vp_some_np_moved", "symbols": ["vp_np_exclamative_cl", "exclamative_cl"]},
    {"name": "inf_vp_some_np_moved", "symbols": ["vp_np_interrogative_cl", "interrogative_cl"]},
    {"name": "inf_vp_some_np_moved", "symbols": ["vp_np_np", "np"]},
    {"name": "inf_vp_pp_moved", "symbols": ["vp_pp"]},
    {"name": "inf_vp_pp_moved", "symbols": ["vp_np_pp", "np"]},
    {"name": "inf_vp_pp_stranded", "symbols": ["vp_pp", preposition]},
    {"name": "inf_vp_pp_stranded", "symbols": ["vp_np_pp", "np", preposition]},
    {"name": "declarative_cl", "symbols": [that, "decl_fin_cl"]},
    {"name": "exclamative_cl", "symbols": ["interrogative_cl"]},
    {"name": "interrogative_cl", "symbols": ["open_interrogative_cl"]},
    {"name": "interrogative_cl", "symbols": ["closed_interrogative_cl"]},
    {"name": "open_interrogative_cl$ebnf$1", "symbols": []},
    {"name": "open_interrogative_cl$ebnf$1", "symbols": ["open_interrogative_cl$ebnf$1", "pp"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "open_interrogative_cl", "symbols": ["fin_vp_wh_moved", "open_interrogative_cl$ebnf$1"]},
    {"name": "open_interrogative_cl$ebnf$2", "symbols": []},
    {"name": "open_interrogative_cl$ebnf$2", "symbols": ["open_interrogative_cl$ebnf$2", "pp"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "open_interrogative_cl", "symbols": ["wh_pp", "fin_vp", "open_interrogative_cl$ebnf$2"]},
    {"name": "open_interrogative_cl$ebnf$3", "symbols": []},
    {"name": "open_interrogative_cl$ebnf$3", "symbols": ["open_interrogative_cl$ebnf$3", "pp"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "open_interrogative_cl", "symbols": ["wh_np", "fin_vp", preposition, "open_interrogative_cl$ebnf$3"]},
    {"name": "closed_interrogative_cl", "symbols": [interrogative_subordinator, "decl_fin_cl"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_pp", "pp"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_ap", "ap"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_to_inf_cl", "to_inf_cl"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_bare_inf_cl", "bare_inf_cl"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_declarative_cl", "declarative_cl"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_exclamative_cl", "exclamative_cl"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_interrogative_cl", "interrogative_cl"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_np", "np"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_np_pp", "np", "pp"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_np_ap", "np", "ap"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_np_to_inf_cl", "np", "to_inf_cl"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_np_bare_inf_cl", "np", "bare_inf_cl"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_np_declarative_cl", "np", "declarative_cl"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_np_declarative_cl", "np", "exclamative_cl"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_np_interrogative_cl", "np", "interrogative_cl"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_np_np", "np", "np"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_np_np", "np", to, "np"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np_pp", "pp"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np_ap", "ap"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np_to_inf_cl", "to_inf_cl"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np_bare_inf_cl", "bare_inf_cl"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np_declarative_cl", "declarative_cl"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np_exclamative_cl", "exclamative_cl"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np_interrogative_cl", "interrogative_cl"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np_np", "np"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np_np", to, "np"]},
    {"name": "fin_vp_wh_moved", "symbols": [to, "wh_np", "np", "vp_np_np", "np"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np_np", "np", to]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_pp", "vp_pp"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_pp", preposition]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_pp", "np", "vp_np_pp", "pp"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np_pp", preposition]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_to_inf_cl", "to_inf_cl_some_np_moved"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_pp", "vp_to_inf_cl", "to_inf_cl_pp_moved"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_to_inf_cl", "to_inf_cl_pp_stranded"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np_to_inf_cl", "to_inf_cl_some_np_moved"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_pp", "np", "vp_np_to_inf_cl", "to_inf_cl_pp_moved"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np_to_inf_cl", "to_inf_cl_pp_stranded"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_bare_inf_cl", "bare_inf_cl_some_np_moved"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_pp", "vp_bare_inf_cl", "bare_inf_cl_pp_moved"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_bare_inf_cl", "bare_inf_cl_pp_stranded"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np_bare_inf_cl", "bare_inf_cl_some_np_moved"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_pp", "np", "vp_np_bare_inf_cl", "bare_inf_cl_pp_moved"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np_bare_inf_cl", "bare_inf_cl_pp_stranded"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_declarative_cl", "declarative_cl_some_np_moved"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_pp", "vp_declarative_cl", "declarative_cl_pp_moved"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "vp_declarative_cl", "declarative_cl_pp_stranded"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np_declarative_cl", "declarative_cl_some_np_moved"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_pp", "np", "vp_np_declarative_cl", "declarative_cl_pp_moved"]},
    {"name": "fin_vp_wh_moved", "symbols": ["wh_np", "np", "vp_np_declarative_cl", "declarative_cl_pp_stranded"]},
    {"name": "declarative_cl_some_np_moved$ebnf$1", "symbols": []},
    {"name": "declarative_cl_some_np_moved$ebnf$1", "symbols": ["declarative_cl_some_np_moved$ebnf$1", "pp"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "declarative_cl_some_np_moved", "symbols": [that, "fin_vp_np_moved", "declarative_cl_some_np_moved$ebnf$1"]},
    {"name": "declarative_cl_pp_moved$ebnf$1", "symbols": []},
    {"name": "declarative_cl_pp_moved$ebnf$1", "symbols": ["declarative_cl_pp_moved$ebnf$1", "pp"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "declarative_cl_pp_moved", "symbols": [that, "fin_vp_pp_moved", "declarative_cl_pp_moved$ebnf$1"]},
    {"name": "declarative_cl_pp_stranded$ebnf$1", "symbols": []},
    {"name": "declarative_cl_pp_stranded$ebnf$1", "symbols": ["declarative_cl_pp_stranded$ebnf$1", "pp"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "declarative_cl_pp_stranded", "symbols": [that, "fin_vp_pp_stranded", "declarative_cl_pp_stranded$ebnf$1"]},
    {"name": "fin_vp_np_moved", "symbols": ["np", "vp_np"]},
    {"name": "fin_vp_np_moved", "symbols": ["np", "vp_np_pp", "pp"]},
    {"name": "fin_vp_np_moved", "symbols": ["np", "vp_np_ap", "ap"]},
    {"name": "fin_vp_np_moved", "symbols": ["np", "vp_np_to_inf_cl", "to_inf_cl"]},
    {"name": "fin_vp_np_moved", "symbols": ["np", "vp_np_bare_inf_cl", "bare_inf_cl"]},
    {"name": "fin_vp_np_moved", "symbols": ["np", "vp_np_declarative_cl", "declarative_cl"]},
    {"name": "fin_vp_np_moved", "symbols": ["np", "vp_np_exclamative_cl", "exclamative_cl"]},
    {"name": "fin_vp_np_moved", "symbols": ["np", "vp_np_interrogative_cl", "interrogative_cl"]},
    {"name": "fin_vp_np_moved", "symbols": ["np", "vp_np_np", "np"]},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "vp_pp"]},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "vp_np_pp", "np"]},
    {"name": "fin_vp_pp_stranded", "symbols": ["np", "vp_pp", preposition]},
    {"name": "fin_vp_pp_stranded", "symbols": ["np", "vp_np_pp", "np", preposition]},
    {"name": "np", "symbols": [proper_noun]},
    {"name": "np", "symbols": [pronoun]},
    {"name": "np$ebnf$1", "symbols": []},
    {"name": "np$ebnf$1", "symbols": ["np$ebnf$1", periph_mod], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "np$ebnf$2", "symbols": []},
    {"name": "np$ebnf$2", "symbols": ["np$ebnf$2", "ap"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "np$ebnf$3", "symbols": []},
    {"name": "np$ebnf$3", "symbols": ["np$ebnf$3", "n_modifier"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "np$ebnf$4", "symbols": []},
    {"name": "np$ebnf$4", "symbols": ["np$ebnf$4", periph_mod], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "np", "symbols": ["np$ebnf$1", "dp", "np$ebnf$2", noun, "np$ebnf$3", "np$ebnf$4"]},
    {"name": "wh_np", "symbols": [wh]},
    {"name": "wh_np", "symbols": [wh, "np"]},
    {"name": "n_modifier", "symbols": ["declarative_cl"]},
    {"name": "n_modifier", "symbols": ["pp"]},
    {"name": "dp", "symbols": [det]},
    {"name": "dp", "symbols": ["np", s]},
    {"name": "dp", "symbols": [pronoun_pos]},
    {"name": "pp", "symbols": [preposition, "np"]},
    {"name": "wh_pp", "symbols": [preposition, "wh_np"]},
    {"name": "ap", "symbols": ["advp", "ap"]},
    {"name": "ap", "symbols": [adj]},
    {"name": "ap", "symbols": [adj_pp, "pp"]},
    {"name": "advp", "symbols": [adv]},
    {"name": "vp", "symbols": [v]},
    {"name": "vp", "symbols": ["advp", v]},
    {"name": "vp", "symbols": [v, "advp"]},
    {"name": "vp_pp", "symbols": [v_pp]},
    {"name": "vp_pp", "symbols": ["advp", v_pp]},
    {"name": "vp_pp", "symbols": [v_pp, "advp"]},
    {"name": "vp_ap", "symbols": [v_ap]},
    {"name": "vp_ap", "symbols": ["advp", v_ap]},
    {"name": "vp_ap", "symbols": [v_ap, "advp"]},
    {"name": "vp_to_inf_cl", "symbols": [v_to_inf_cl]},
    {"name": "vp_to_inf_cl", "symbols": ["advp", v_to_inf_cl]},
    {"name": "vp_to_inf_cl", "symbols": [v_to_inf_cl, "advp"]},
    {"name": "vp_bare_inf_cl", "symbols": [v_bare_inf_cl]},
    {"name": "vp_bare_inf_cl", "symbols": ["advp", v_bare_inf_cl]},
    {"name": "vp_bare_inf_cl", "symbols": [v_bare_inf_cl, "advp"]},
    {"name": "vp_declarative_cl", "symbols": [v_declarative_cl]},
    {"name": "vp_declarative_cl", "symbols": ["advp", v_declarative_cl]},
    {"name": "vp_declarative_cl", "symbols": [v_declarative_cl, "advp"]},
    {"name": "vp_exclamative_cl", "symbols": [v_exclamative_cl]},
    {"name": "vp_exclamative_cl", "symbols": ["advp", v_exclamative_cl]},
    {"name": "vp_exclamative_cl", "symbols": [v_exclamative_cl, "advp"]},
    {"name": "vp_interrogative_cl", "symbols": [v_interrogative_cl]},
    {"name": "vp_interrogative_cl", "symbols": ["advp", v_interrogative_cl]},
    {"name": "vp_interrogative_cl", "symbols": [v_interrogative_cl, "advp"]},
    {"name": "vp_np", "symbols": [v_np]},
    {"name": "vp_np", "symbols": ["advp", v_np]},
    {"name": "vp_np", "symbols": [v_np, "advp"]},
    {"name": "vp_np_pp", "symbols": [v_np_pp]},
    {"name": "vp_np_pp", "symbols": ["advp", v_np_pp]},
    {"name": "vp_np_pp", "symbols": [v_np_pp, "advp"]},
    {"name": "vp_np_ap", "symbols": [v_np_ap]},
    {"name": "vp_np_ap", "symbols": ["advp", v_np_ap]},
    {"name": "vp_np_ap", "symbols": [v_np_ap, "advp"]},
    {"name": "vp_np_to_inf_cl", "symbols": [v_np_to_inf_cl]},
    {"name": "vp_np_to_inf_cl", "symbols": ["advp", v_np_to_inf_cl]},
    {"name": "vp_np_to_inf_cl", "symbols": [v_np_to_inf_cl, "advp"]},
    {"name": "vp_np_bare_inf_cl", "symbols": [v_np_bare_inf_cl]},
    {"name": "vp_np_bare_inf_cl", "symbols": ["advp", v_np_bare_inf_cl]},
    {"name": "vp_np_bare_inf_cl", "symbols": [v_np_bare_inf_cl, "advp"]},
    {"name": "vp_np_declarative_cl", "symbols": [v_np_declarative_cl]},
    {"name": "vp_np_declarative_cl", "symbols": ["advp", v_np_declarative_cl]},
    {"name": "vp_np_declarative_cl", "symbols": [v_np_declarative_cl, "advp"]},
    {"name": "vp_np_exclamative_cl", "symbols": [v_np_exclamative_cl]},
    {"name": "vp_np_exclamative_cl", "symbols": ["advp", v_np_exclamative_cl]},
    {"name": "vp_np_exclamative_cl", "symbols": [v_np_exclamative_cl, "advp"]},
    {"name": "vp_np_interrogative_cl", "symbols": [v_np_interrogative_cl]},
    {"name": "vp_np_interrogative_cl", "symbols": ["advp", v_np_interrogative_cl]},
    {"name": "vp_np_interrogative_cl", "symbols": [v_np_interrogative_cl, "advp"]},
    {"name": "vp_np_np", "symbols": [v_np_np]},
    {"name": "vp_np_np", "symbols": ["advp", v_np_np]},
    {"name": "vp_np_np", "symbols": [v_np_np, "advp"]},
    {"name": "vp_np_np", "symbols": [v_np_np]},
    {"name": "vp_np_np", "symbols": ["advp", v_np_np]},
    {"name": "vp_np_np", "symbols": [v_np_np, "advp"]}
  ],
  ParserStart: "decl_fin_cl",
};

export default grammar;

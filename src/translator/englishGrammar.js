// Generated automatically by nearley, version 2.13.0
// http://github.com/Hardmath123/nearley
function id(x) { return x[0]; }

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

// Base Verb (VB)
const vb = {test: x => x in english.vb};
const vb_pp = {test: x => x in english.vb_pp};
const vb_ap = {test: x => x in english.vb_ap};
const vb_to_inf_cl = {test: x => x in english.vb_to_inf_cl};
const vb_bare_inf_cl = {test: x => x in english.vb_bare_inf_cl};
const vb_declarative_cl = {test: x => x in english.vb_declarative_cl};
const vb_exclamative_cl = {test: x => x in english.vb_exclamative_cl};
const vb_interrogative_cl = {test: x => x in english.vb_interrogative_cl};
const vb_vbg_cl = {test: x => x in english.vb_vbg_cl};
const vb_vbn_cl = {test: x => x in english.vb_vbn_cl};
const vb_np = {test: x => x in english.vb_np};
const vb_np_pp = {test: x => x in english.vb_np_pp};
const vb_np_ap = {test: x => x in english.vb_np_ap};
const vb_np_to_inf_cl = {test: x => x in english.vb_np_to_inf_cl};
const vb_np_bare_inf_cl = {test: x => x in english.vb_np_bare_inf_cl};
const vb_np_declarative_cl = {test: x => x in english.vb_np_declarative_cl};
const vb_np_exclamative_cl = {test: x => x in english.vb_np_exclamative_cl};
const vb_np_interrogative_cl = {test: x => x in english.vb_np_interrogative_cl};
const vb_np_np = {test: x => x in english.vb_np_np};

// Past Tense Verb (VBD)
const vbd = {test: x => x in english.vbd};
const vbd_pp = {test: x => x in english.vbd_pp};
const vbd_ap = {test: x => x in english.vbd_ap};
const vbd_to_inf_cl = {test: x => x in english.vbd_to_inf_cl};
const vbd_bare_inf_cl = {test: x => x in english.vbd_bare_inf_cl};
const vbd_declarative_cl = {test: x => x in english.vbd_declarative_cl};
const vbd_exclamative_cl = {test: x => x in english.vbd_exclamative_cl};
const vbd_interrogative_cl = {test: x => x in english.vbd_interrogative_cl};
const vbd_vbg_cl = {test: x => x in english.vbd_vbg_cl};
const vbd_vbn_cl = {test: x => x in english.vbd_vbn_cl};
const vbd_np = {test: x => x in english.vbd_np};
const vbd_np_pp = {test: x => x in english.vbd_np_pp};
const vbd_np_ap = {test: x => x in english.vbd_np_ap};
const vbd_np_to_inf_cl = {test: x => x in english.vbd_np_to_inf_cl};
const vbd_np_bare_inf_cl = {test: x => x in english.vbd_np_bare_inf_cl};
const vbd_np_declarative_cl = {test: x => x in english.vbd_np_declarative_cl};
const vbd_np_exclamative_cl = {test: x => x in english.vbd_np_exclamative_cl};
const vbd_np_interrogative_cl = {test: x => x in english.vbd_np_interrogative_cl};
const vbd_np_np = {test: x => x in english.vbd_np_np};

// Verb Gerund or Present Participle (VBG)
const vbg = {test: x => x in english.vbg};
const vbg_pp = {test: x => x in english.vbg_pp};
const vbg_ap = {test: x => x in english.vbg_ap};
const vbg_to_inf_cl = {test: x => x in english.vbg_to_inf_cl};
const vbg_bare_inf_cl = {test: x => x in english.vbg_bare_inf_cl};
const vbg_declarative_cl = {test: x => x in english.vbg_declarative_cl};
const vbg_exclamative_cl = {test: x => x in english.vbg_exclamative_cl};
const vbg_interrogative_cl = {test: x => x in english.vbg_interrogative_cl};
const vbg_vbg_cl = {test: x => x in english.vbg_vbg_cl};
const vbg_vbn_cl = {test: x => x in english.vbg_vbn_cl};
const vbg_np = {test: x => x in english.vbg_np};
const vbg_np_pp = {test: x => x in english.vbg_np_pp};
const vbg_np_ap = {test: x => x in english.vbg_np_ap};
const vbg_np_to_inf_cl = {test: x => x in english.vbg_np_to_inf_cl};
const vbg_np_bare_inf_cl = {test: x => x in english.vbg_np_bare_inf_cl};
const vbg_np_declarative_cl = {test: x => x in english.vbg_np_declarative_cl};
const vbg_np_exclamative_cl = {test: x => x in english.vbg_np_exclamative_cl};
const vbg_np_interrogative_cl = {test: x => x in english.vbg_np_interrogative_cl};
const vbg_np_np = {test: x => x in english.vbg_np_np};

// Verb Past Participle (VBN)
const vbn = {test: x => x in english.vbn};
const vbn_pp = {test: x => x in english.vbn_pp};
const vbn_ap = {test: x => x in english.vbn_ap};
const vbn_to_inf_cl = {test: x => x in english.vbn_to_inf_cl};
const vbn_bare_inf_cl = {test: x => x in english.vbn_bare_inf_cl};
const vbn_declarative_cl = {test: x => x in english.vbn_declarative_cl};
const vbn_exclamative_cl = {test: x => x in english.vbn_exclamative_cl};
const vbn_interrogative_cl = {test: x => x in english.vbn_interrogative_cl};
const vbn_vbg_cl = {test: x => x in english.vbn_vbg_cl};
const vbn_vbn_cl = {test: x => x in english.vbn_vbn_cl};
const vbn_np = {test: x => x in english.vbn_np};
const vbn_np_pp = {test: x => x in english.vbn_np_pp};
const vbn_np_ap = {test: x => x in english.vbn_np_ap};
const vbn_np_to_inf_cl = {test: x => x in english.vbn_np_to_inf_cl};
const vbn_np_bare_inf_cl = {test: x => x in english.vbn_np_bare_inf_cl};
const vbn_np_declarative_cl = {test: x => x in english.vbn_np_declarative_cl};
const vbn_np_exclamative_cl = {test: x => x in english.vbn_np_exclamative_cl};
const vbn_np_interrogative_cl = {test: x => x in english.vbn_np_interrogative_cl};
const vbn_np_np = {test: x => x in english.vbn_np_np};

// Non-third person singular present (VBP)
const vbp = {test: x => x in english.vbp};
const vbp_pp = {test: x => x in english.vbp_pp};
const vbp_ap = {test: x => x in english.vbp_ap};
const vbp_to_inf_cl = {test: x => x in english.vbp_to_inf_cl};
const vbp_bare_inf_cl = {test: x => x in english.vbp_bare_inf_cl};
const vbp_declarative_cl = {test: x => x in english.vbp_declarative_cl};
const vbp_exclamative_cl = {test: x => x in english.vbp_exclamative_cl};
const vbp_interrogative_cl = {test: x => x in english.vbp_interrogative_cl};
const vbp_vbg_cl = {test: x => x in english.vbp_vbg_cl};
const vbp_vbn_cl = {test: x => x in english.vbp_vbn_cl};
const vbp_np = {test: x => x in english.vbp_np};
const vbp_np_pp = {test: x => x in english.vbp_np_pp};
const vbp_np_ap = {test: x => x in english.vbp_np_ap};
const vbp_np_to_inf_cl = {test: x => x in english.vbp_np_to_inf_cl};
const vbp_np_bare_inf_cl = {test: x => x in english.vbp_np_bare_inf_cl};
const vbp_np_declarative_cl = {test: x => x in english.vbp_np_declarative_cl};
const vbp_np_exclamative_cl = {test: x => x in english.vbp_np_exclamative_cl};
const vbp_np_interrogative_cl = {test: x => x in english.vbp_np_interrogative_cl};
const vbp_np_np = {test: x => x in english.vbp_np_np};

// Third person singular present (VBZ)
const vbz = {test: x => x in english.vbz};
const vbz_pp = {test: x => x in english.vbz_pp};
const vbz_ap = {test: x => x in english.vbz_ap};
const vbz_to_inf_cl = {test: x => x in english.vbz_to_inf_cl};
const vbz_bare_inf_cl = {test: x => x in english.vbz_bare_inf_cl};
const vbz_declarative_cl = {test: x => x in english.vbz_declarative_cl};
const vbz_exclamative_cl = {test: x => x in english.vbz_exclamative_cl};
const vbz_interrogative_cl = {test: x => x in english.vbz_interrogative_cl};
const vbz_vbg_cl = {test: x => x in english.vbz_vbg_cl};
const vbz_vbn_cl = {test: x => x in english.vbz_vbn_cl};
const vbz_np = {test: x => x in english.vbz_np};
const vbz_np_pp = {test: x => x in english.vbz_np_pp};
const vbz_np_ap = {test: x => x in english.vbz_np_ap};
const vbz_np_to_inf_cl = {test: x => x in english.vbz_np_to_inf_cl};
const vbz_np_bare_inf_cl = {test: x => x in english.vbz_np_bare_inf_cl};
const vbz_np_declarative_cl = {test: x => x in english.vbz_np_declarative_cl};
const vbz_np_exclamative_cl = {test: x => x in english.vbz_np_exclamative_cl};
const vbz_np_interrogative_cl = {test: x => x in english.vbz_np_interrogative_cl};
const vbz_np_np = {test: x => x in english.vbz_np_np};

// Modal (MODAL)
const modal = {test: x => x in english.modal};

// adjectives
const adj = {test: x => x in english.adj}; // adjectives that don't take any arguments (ex: "happy")
const adj_pp = {test: x => x in english.adj_pp}; // adjectives that take a prepositional phrase argument (ex: "fond of cheese")
const adj_declarative_cl = {test: x => x in english.adj_declarative_cl}; // adjectives that take a prepositional phrase argument (ex: "fond of cheese")


// adverbs
const adv = {test: x => x in english.adv}; // adverbs that don't take any arguments (ex: "quickly")
const precorenp_modifier = {test: x => x in english.precorenp_modifier}; // peripheral modifiers (ex: "even", "all")
const postcorenp_modifier = {test: x => x in english.postcorenp_modifier}; // peripheral modifiers (ex: "too", "altogether")

// wh-words
const wh = {test: x => x in english.wh}; // wh-words (ex: "who", "what", "where", "when", "why", "how")

// define postprocessors

// nonterminal 
function nt(kind) {
    return (children) => ({kind, children});
}

// nonterminal 
function nonterminal_unpack(kind) {
    return ([children]) => ({kind, children});
}

// terminal
function t(kind) {
    return ([value]) => ({kind, children: value});
}

let Lexer = undefined;
let ParserRules = [
    {"name": "decl_fin_cl", "symbols": ["pp_list", "fin_vp", "pp_list"], "postprocess": (children) => ({kind: "decl_fin_cl", children})},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbd", "advp?"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbd_pp", "advp?", "pp"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbd_ap", "advp?", "ap"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbd_to_inf_cl", "advp?", "to_inf_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbd_bare_inf_cl", "advp?", "bare_inf_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbd_declarative_cl", "advp?", "declarative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbd_exclamative_cl", "advp?", "exclamative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbd_interrogative_cl", "advp?", "interrogative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "vbd_vbg_cl", "vbg_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "vbd_vbn_cl", "vbn_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbd_np", "advp?", "np"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbd_np_pp", "advp?", "np", "pp"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbd_np_ap", "advp?", "np", "ap"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbd_np_to_inf_cl", "advp?", "np", "to_inf_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbd_np_bare_inf_cl", "advp?", "np", "bare_inf_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbd_np_declarative_cl", "advp?", "np", "declarative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbd_np_exclamative_cl", "advp?", "np", "exclamative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbd_np_interrogative_cl", "advp?", "np", "interrogative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbd_np_np", "advp?", "np", "np"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbd_np_np", "advp?", "np", "to", "np"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbp", "advp?"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbp_pp", "advp?", "pp"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbp_ap", "advp?", "ap"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbp_to_inf_cl", "advp?", "to_inf_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbp_bare_inf_cl", "advp?", "bare_inf_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbp_declarative_cl", "advp?", "declarative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbp_exclamative_cl", "advp?", "exclamative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbp_interrogative_cl", "advp?", "interrogative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "vbp_vbg_cl", "vbg_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "vbp_vbn_cl", "vbn_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbp_np", "advp?", "np"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbp_np_pp", "advp?", "np", "pp"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbp_np_ap", "advp?", "np", "ap"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbp_np_to_inf_cl", "advp?", "np", "to_inf_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbp_np_bare_inf_cl", "advp?", "np", "bare_inf_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbp_np_declarative_cl", "advp?", "np", "declarative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbp_np_exclamative_cl", "advp?", "np", "exclamative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbp_np_interrogative_cl", "advp?", "np", "interrogative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbp_np_np", "advp?", "np", "np"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbp_np_np", "advp?", "np", "to", "np"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbz", "advp?"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbz_pp", "advp?", "pp"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbz_ap", "advp?", "ap"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbz_to_inf_cl", "advp?", "to_inf_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbz_bare_inf_cl", "advp?", "bare_inf_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbz_declarative_cl", "advp?", "declarative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbz_exclamative_cl", "advp?", "exclamative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbz_interrogative_cl", "advp?", "interrogative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "vbz_vbg_cl", "advp?", "vbg_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "vbz_vbn_cl", "advp?", "vbn_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbz_np", "advp?", "np"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbz_np_pp", "advp?", "np", "pp"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbz_np_ap", "advp?", "np", "ap"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbz_np_to_inf_cl", "advp?", "np", "to_inf_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbz_np_bare_inf_cl", "advp?", "np", "bare_inf_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbz_np_declarative_cl", "advp?", "np", "declarative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbz_np_exclamative_cl", "advp?", "np", "exclamative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbz_np_interrogative_cl", "advp?", "np", "interrogative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbz_np_np", "advp?", "np", "np"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["np", "advp?", "vbz_np_np", "advp?", "np", "to", "np"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbd", "advp?"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbd_pp", "advp?", "pp"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbd_ap", "advp?", "ap"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbd_to_inf_cl", "advp?", "to_inf_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbd_bare_inf_cl", "advp?", "bare_inf_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbd_declarative_cl", "advp?", "declarative_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbd_exclamative_cl", "advp?", "exclamative_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbd_interrogative_cl", "advp?", "interrogative_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["vbd_vbg_cl", "vbg_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["vbd_vbn_cl", "vbn_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbd_np", "advp?", "np"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbd_np_pp", "advp?", "np", "pp"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbd_np_ap", "advp?", "np", "ap"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbd_np_to_inf_cl", "advp?", "np", "to_inf_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbd_np_bare_inf_cl", "advp?", "np", "bare_inf_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbd_np_declarative_cl", "advp?", "np", "declarative_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbd_np_exclamative_cl", "advp?", "np", "exclamative_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbd_np_interrogative_cl", "advp?", "np", "interrogative_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbd_np_np", "advp?", "np", "np"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbd_np_np", "advp?", "np", "to", "np"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vb_pp", "advp?", "preposition"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vb_ap", "advp?", "ap_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vb_to_inf_cl", "advp?", "to_inf_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vb_bare_inf_cl", "advp?", "bare_inf_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vb_declarative_cl", "advp?", "declarative_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "vb_vbg_cl", "vbg_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "vb_vbn_cl", "vbn_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vb_np", "advp?"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vb_np_pp", "advp?", "pp"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vb_np_pp", "advp?", "np", "preposition"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vb_np_ap", "advp?", "ap"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vb_np_ap", "advp?", "np", "ap_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vb_np_to_inf_cl", "advp?", "to_inf_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vb_np_to_inf_cl", "advp?", "np", "to_inf_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vb_np_bare_inf_cl", "advp?", "bare_inf_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vb_np_bare_inf_cl", "advp?", "np", "bare_inf_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vb_np_declarative_cl", "advp?", "declarative_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vb_np_declarative_cl", "advp?", "np", "declarative_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vb_np_exclamative_cl", "advp?", "exclamative_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vb_np_interrogative_cl", "advp?", "interrogative_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vb_np_np", "advp?", "np"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vb_np_np", "advp?", "to", "np"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbp", "advp?"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbp_pp", "advp?", "pp"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbp_ap", "advp?", "ap"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbp_to_inf_cl", "advp?", "to_inf_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbp_bare_inf_cl", "advp?", "bare_inf_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbp_declarative_cl", "advp?", "declarative_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbp_exclamative_cl", "advp?", "exclamative_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbp_interrogative_cl", "advp?", "interrogative_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["vbp_vbg_cl", "vbg_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["vbp_vbn_cl", "vbn_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbp_np", "advp?", "np"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbp_np_pp", "advp?", "np", "pp"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbp_np_ap", "advp?", "np", "ap"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbp_np_to_inf_cl", "advp?", "np", "to_inf_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbp_np_bare_inf_cl", "advp?", "np", "bare_inf_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbp_np_declarative_cl", "advp?", "np", "declarative_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbp_np_exclamative_cl", "advp?", "np", "exclamative_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbp_np_interrogative_cl", "advp?", "np", "interrogative_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbp_np_np", "advp?", "np", "np"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbp_np_np", "advp?", "np", "to", "np"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbp_pp", "advp?", "preposition"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbp_ap", "advp?", "ap_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbp_to_inf_cl", "advp?", "to_inf_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbp_bare_inf_cl", "advp?", "bare_inf_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbp_declarative_cl", "advp?", "declarative_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "vbp_vbg_cl", "vbg_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "vbp_vbn_cl", "vbn_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbp_np", "advp?"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbp_np_pp", "advp?", "pp"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbp_np_pp", "advp?", "np", "preposition"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbp_np_ap", "advp?", "ap"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbp_np_ap", "advp?", "np", "ap_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbp_np_to_inf_cl", "advp?", "to_inf_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbp_np_to_inf_cl", "advp?", "np", "to_inf_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbp_np_bare_inf_cl", "advp?", "bare_inf_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbp_np_bare_inf_cl", "advp?", "np", "bare_inf_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbp_np_declarative_cl", "advp?", "declarative_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbp_np_declarative_cl", "advp?", "np", "declarative_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbp_np_exclamative_cl", "advp?", "exclamative_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbp_np_interrogative_cl", "advp?", "interrogative_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbp_np_np", "advp?", "np"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbp_np_np", "advp?", "to", "np"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbz", "advp?"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbz_pp", "advp?", "pp"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbz_ap", "advp?", "ap"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbz_to_inf_cl", "advp?", "to_inf_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbz_bare_inf_cl", "advp?", "bare_inf_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbz_declarative_cl", "advp?", "declarative_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbz_exclamative_cl", "advp?", "exclamative_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbz_interrogative_cl", "advp?", "interrogative_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["vbz_vbg_cl", "vbg_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["vbz_vbn_cl", "vbn_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbz_np", "advp?", "np"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbz_np_pp", "advp?", "np", "pp"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbz_np_ap", "advp?", "np", "ap"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbz_np_to_inf_cl", "advp?", "np", "to_inf_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbz_np_bare_inf_cl", "advp?", "np", "bare_inf_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbz_np_declarative_cl", "advp?", "np", "declarative_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbz_np_exclamative_cl", "advp?", "np", "exclamative_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbz_np_interrogative_cl", "advp?", "np", "interrogative_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbz_np_np", "advp?", "np", "np"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbz_np_np", "advp?", "np", "to", "np"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbz_pp", "advp?", "preposition"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbz_ap", "advp?", "ap_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbz_to_inf_cl", "advp?", "to_inf_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbz_bare_inf_cl", "advp?", "bare_inf_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbz_declarative_cl", "advp?", "declarative_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "vbz_vbg_cl", "vbg_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "vbz_vbn_cl", "vbn_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbz_np", "advp?"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbz_np_pp", "advp?", "pp"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbz_np_pp", "advp?", "np", "preposition"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbz_np_ap", "advp?", "ap"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbz_np_ap", "advp?", "np", "ap_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbz_np_to_inf_cl", "advp?", "to_inf_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbz_np_to_inf_cl", "advp?", "np", "to_inf_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbz_np_bare_inf_cl", "advp?", "bare_inf_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbz_np_bare_inf_cl", "advp?", "np", "bare_inf_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbz_np_declarative_cl", "advp?", "declarative_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbz_np_declarative_cl", "advp?", "np", "declarative_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbz_np_exclamative_cl", "advp?", "exclamative_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbz_np_interrogative_cl", "advp?", "interrogative_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbz_np_np", "advp?", "np"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["np", "advp?", "vbz_np_np", "advp?", "to", "np"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "advp?", "vbd_pp", "advp?"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "advp?", "vbd_ap", "advp?", "ap_pp_moved"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "advp?", "vbd_to_inf_cl", "advp?", "to_inf_cl_pp_moved"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "advp?", "vbd_bare_inf_cl", "advp?", "bare_inf_cl_pp_moved"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "advp?", "vbd_declarative_cl", "advp?", "declarative_cl_pp_moved"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "vbd_vbg_cl", "vbg_cl_pp_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "vbd_vbn_cl", "vbn_cl_pp_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "advp?", "vbd_np_pp", "advp?", "np"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "advp?", "vbd_np_ap", "advp?", "np", "ap_pp_moved"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "advp?", "vbd_np_to_inf_cl", "advp?", "np", "to_inf_cl_pp_moved"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "advp?", "vbd_np_bare_inf_cl", "advp?", "np", "bare_inf_cl_pp_moved"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "advp?", "vbd_np_declarative_cl", "advp?", "np", "declarative_cl_pp_moved"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "advp?", "vbp_pp", "advp?"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "advp?", "vbp_ap", "advp?", "ap_pp_moved"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "advp?", "vbp_to_inf_cl", "advp?", "to_inf_cl_pp_moved"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "advp?", "vbp_bare_inf_cl", "advp?", "bare_inf_cl_pp_moved"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "advp?", "vbp_declarative_cl", "advp?", "declarative_cl_pp_moved"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "vbp_vbg_cl", "vbg_cl_pp_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "vbp_vbn_cl", "vbn_cl_pp_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "advp?", "vbp_np_pp", "advp?", "np"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "advp?", "vbp_np_ap", "advp?", "np", "ap_pp_moved"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "advp?", "vbp_np_to_inf_cl", "advp?", "np", "to_inf_cl_pp_moved"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "advp?", "vbp_np_bare_inf_cl", "advp?", "np", "bare_inf_cl_pp_moved"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "advp?", "vbp_np_declarative_cl", "advp?", "np", "declarative_cl_pp_moved"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "advp?", "vbz_pp", "advp?"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "advp?", "vbz_ap", "advp?", "ap_pp_moved"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "advp?", "vbz_to_inf_cl", "advp?", "to_inf_cl_pp_moved"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "advp?", "vbz_bare_inf_cl", "advp?", "bare_inf_cl_pp_moved"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "advp?", "vbz_declarative_cl", "advp?", "declarative_cl_pp_moved"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "vbz_vbg_cl", "vbg_cl_pp_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "vbz_vbn_cl", "vbn_cl_pp_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "advp?", "vbz_np_pp", "advp?", "np"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "advp?", "vbz_np_ap", "advp?", "np", "ap_pp_moved"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "advp?", "vbz_np_to_inf_cl", "advp?", "np", "to_inf_cl_pp_moved"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "advp?", "vbz_np_bare_inf_cl", "advp?", "np", "bare_inf_cl_pp_moved"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["np", "advp?", "vbz_np_declarative_cl", "advp?", "np", "declarative_cl_pp_moved"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "to_inf_cl", "symbols": ["to", "bare_inf_cl"], "postprocess": nt("to_inf_cl")},
    {"name": "to_inf_cl_np_moved", "symbols": ["to", "bare_inf_cl_np_moved"], "postprocess": nt("to_inf_cl_np_moved")},
    {"name": "to_inf_cl_pp_moved", "symbols": ["to", "bare_inf_cl_pp_moved"], "postprocess": nt("to_inf_cl_pp_moved")},
    {"name": "bare_inf_cl", "symbols": ["inf_vp", "pp_list"], "postprocess": nt("bare_inf_cl")},
    {"name": "bare_inf_cl_np_moved", "symbols": ["inf_vp_np_moved", "pp_list"], "postprocess": nt("bare_inf_cl_np_moved")},
    {"name": "bare_inf_cl_pp_moved", "symbols": ["inf_vp_pp_moved", "pp_list"], "postprocess": nt("bare_inf_cl_pp_moved")},
    {"name": "inf_vp", "symbols": ["advp?", "vb", "advp?"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_pp", "advp?", "pp"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_ap", "advp?", "ap"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_to_inf_cl", "advp?", "to_inf_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_bare_inf_cl", "advp?", "bare_inf_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_declarative_cl", "advp?", "declarative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_exclamative_cl", "advp?", "exclamative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_interrogative_cl", "advp?", "interrogative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["vb_vbg_cl", "vbg_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["vb_vbn_cl", "vbn_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_np", "advp?", "np"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_np_pp", "advp?", "np", "pp"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_np_ap", "advp?", "np", "ap"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_np_to_inf_cl", "advp?", "np", "to_inf_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_np_bare_inf_cl", "advp?", "np", "bare_inf_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_np_declarative_cl", "advp?", "np", "declarative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_np_exclamative_cl", "advp?", "np", "exclamative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_np_interrogative_cl", "advp?", "np", "interrogative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_np_np", "advp?", "np", "np"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_pp", "advp?", "preposition"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_ap", "advp?", "ap_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_to_inf_cl", "advp?", "to_inf_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_bare_inf_cl", "advp?", "bare_inf_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_declarative_cl", "advp?", "declarative_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["vb_vbg_cl", "vbg_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["vb_vbn_cl", "vbn_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_np", "advp?"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_np_pp", "advp?", "pp"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_np_pp", "advp?", "np", "preposition"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_np_ap", "advp?", "ap"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_np_ap", "advp?", "np", "ap_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_np_to_inf_cl", "advp?", "to_inf_cl"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_np_to_inf_cl", "advp?", "np", "to_inf_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_np_bare_inf_cl", "advp?", "bare_inf_cl"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_np_bare_inf_cl", "advp?", "np", "bare_inf_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_np_declarative_cl", "advp?", "declarative_cl"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_np_declarative_cl", "advp?", "np", "declarative_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_np_exclamative_cl", "advp?", "exclamative_cl"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_np_interrogative_cl", "advp?", "interrogative_cl"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_np_np", "advp?", "np"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_np_np", "advp?", "to", "np"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_pp_moved", "symbols": ["advp?", "vb_pp", "advp?"], "postprocess": nt("inf_vp_pp_moved")},
    {"name": "inf_vp_pp_moved", "symbols": ["advp?", "vb_ap", "advp?", "ap_pp_moved"], "postprocess": nt("inf_vp_pp_moved")},
    {"name": "inf_vp_pp_moved", "symbols": ["advp?", "vb_to_inf_cl", "advp?", "to_inf_cl_pp_moved"], "postprocess": nt("inf_vp_pp_moved")},
    {"name": "inf_vp_pp_moved", "symbols": ["advp?", "vb_bare_inf_cl", "advp?", "bare_inf_cl_pp_moved"], "postprocess": nt("inf_vp_pp_moved")},
    {"name": "inf_vp_pp_moved", "symbols": ["advp?", "vb_declarative_cl", "advp?", "declarative_cl_pp_moved"], "postprocess": nt("inf_vp_pp_moved")},
    {"name": "inf_vp_pp_moved", "symbols": ["advp?", "vb_np_pp", "advp?", "np"], "postprocess": nt("inf_vp_pp_moved")},
    {"name": "inf_vp_pp_moved", "symbols": ["advp?", "vb_np_ap", "advp?", "np", "ap_pp_moved"], "postprocess": nt("inf_vp_pp_moved")},
    {"name": "inf_vp_pp_moved", "symbols": ["advp?", "vb_np_to_inf_cl", "advp?", "np", "to_inf_cl_pp_moved"], "postprocess": nt("inf_vp_pp_moved")},
    {"name": "inf_vp_pp_moved", "symbols": ["advp?", "vb_np_bare_inf_cl", "advp?", "np", "bare_inf_cl_pp_moved"], "postprocess": nt("inf_vp_pp_moved")},
    {"name": "inf_vp_pp_moved", "symbols": ["advp?", "vb_np_declarative_cl", "advp?", "np", "declarative_cl_pp_moved"], "postprocess": nt("inf_vp_pp_moved")},
    {"name": "vbn_cl", "symbols": ["vbn_vp", "pp_list"], "postprocess": nt("vbn_cl")},
    {"name": "vbn_cl_np_moved", "symbols": ["vbn_vp_np_moved", "pp_list"], "postprocess": nt("vbn_cl_np_moved")},
    {"name": "vbn_cl_pp_moved", "symbols": ["vbn_vp_pp_moved", "pp_list"], "postprocess": nt("vbn_cl_pp_moved")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn", "advp?"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_pp", "advp?", "pp"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_ap", "advp?", "ap"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_to_inf_cl", "advp?", "to_inf_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_bare_inf_cl", "advp?", "bare_inf_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_declarative_cl", "advp?", "declarative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_exclamative_cl", "advp?", "exclamative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_interrogative_cl", "advp?", "interrogative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["vbn_vbg_cl", "vbg_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["vbn_vbn_cl", "vbn_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_np", "advp?", "np"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_np_pp", "advp?", "np", "pp"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_np_ap", "advp?", "np", "ap"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_np_to_inf_cl", "advp?", "np", "to_inf_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_np_bare_inf_cl", "advp?", "np", "bare_inf_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_np_declarative_cl", "advp?", "np", "declarative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_np_exclamative_cl", "advp?", "np", "exclamative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_np_interrogative_cl", "advp?", "np", "interrogative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_np_np", "advp?", "np", "np"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_pp", "advp?", "preposition"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_ap", "advp?", "ap_np_moved"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_to_inf_cl", "advp?", "to_inf_cl_np_moved"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_bare_inf_cl", "advp?", "bare_inf_cl_np_moved"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_declarative_cl", "advp?", "declarative_cl_np_moved"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["vbn_vbg_cl", "vbg_cl_np_moved"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["vbn_vbn_cl", "vbn_cl_np_moved"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_np", "advp?"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_np_pp", "advp?", "pp"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_np_pp", "advp?", "np", "preposition"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_np_ap", "advp?", "ap"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_np_ap", "advp?", "np", "ap_np_moved"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_np_to_inf_cl", "advp?", "to_inf_cl"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_np_to_inf_cl", "advp?", "np", "to_inf_cl_np_moved"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_np_bare_inf_cl", "advp?", "bare_inf_cl"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_np_bare_inf_cl", "advp?", "np", "bare_inf_cl_np_moved"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_np_declarative_cl", "advp?", "declarative_cl"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_np_declarative_cl", "advp?", "np", "declarative_cl_np_moved"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_np_exclamative_cl", "advp?", "exclamative_cl"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_np_interrogative_cl", "advp?", "interrogative_cl"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_np_np", "advp?", "np"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_np_np", "advp?", "to", "np"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_pp_moved", "symbols": ["advp?", "vbn_pp", "advp?"], "postprocess": nt("vbn_vp_pp_moved")},
    {"name": "vbn_vp_pp_moved", "symbols": ["advp?", "vbn_ap", "advp?", "ap_pp_moved"], "postprocess": nt("vbn_vp_pp_moved")},
    {"name": "vbn_vp_pp_moved", "symbols": ["advp?", "vbn_to_inf_cl", "advp?", "to_inf_cl_pp_moved"], "postprocess": nt("vbn_vp_pp_moved")},
    {"name": "vbn_vp_pp_moved", "symbols": ["advp?", "vbn_bare_inf_cl", "advp?", "bare_inf_cl_pp_moved"], "postprocess": nt("vbn_vp_pp_moved")},
    {"name": "vbn_vp_pp_moved", "symbols": ["advp?", "vbn_declarative_cl", "advp?", "declarative_cl_pp_moved"], "postprocess": nt("vbn_vp_pp_moved")},
    {"name": "vbn_vp_pp_moved", "symbols": ["advp?", "vbn_np_pp", "advp?", "np"], "postprocess": nt("vbn_vp_pp_moved")},
    {"name": "vbn_vp_pp_moved", "symbols": ["advp?", "vbn_np_ap", "advp?", "np", "ap_pp_moved"], "postprocess": nt("vbn_vp_pp_moved")},
    {"name": "vbn_vp_pp_moved", "symbols": ["advp?", "vbn_np_to_inf_cl", "advp?", "np", "to_inf_cl_pp_moved"], "postprocess": nt("vbn_vp_pp_moved")},
    {"name": "vbn_vp_pp_moved", "symbols": ["advp?", "vbn_np_bare_inf_cl", "advp?", "np", "bare_inf_cl_pp_moved"], "postprocess": nt("vbn_vp_pp_moved")},
    {"name": "vbn_vp_pp_moved", "symbols": ["advp?", "vbn_np_declarative_cl", "advp?", "np", "declarative_cl_pp_moved"], "postprocess": nt("vbn_vp_pp_moved")},
    {"name": "vbg_cl", "symbols": ["vbg_vp", "pp_list"], "postprocess": nt("vbg_cl")},
    {"name": "vbg_cl_np_moved", "symbols": ["vbg_vp_np_moved", "pp_list"], "postprocess": nt("vbg_cl_np_moved")},
    {"name": "vbg_cl_pp_moved", "symbols": ["vbg_vp_pp_moved", "pp_list"], "postprocess": nt("vbg_cl_pp_moved")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg", "advp?"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_pp", "advp?", "pp"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_ap", "advp?", "ap"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_to_inf_cl", "advp?", "to_inf_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_bare_inf_cl", "advp?", "bare_inf_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_declarative_cl", "advp?", "declarative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_exclamative_cl", "advp?", "exclamative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_interrogative_cl", "advp?", "interrogative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["vbg_vbg_cl", "vbg_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["vbg_vbn_cl", "vbn_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_np", "advp?", "np"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_np_pp", "advp?", "np", "pp"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_np_ap", "advp?", "np", "ap"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_np_to_inf_cl", "advp?", "np", "to_inf_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_np_bare_inf_cl", "advp?", "np", "bare_inf_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_np_declarative_cl", "advp?", "np", "declarative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_np_exclamative_cl", "advp?", "np", "exclamative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_np_interrogative_cl", "advp?", "np", "interrogative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_np_np", "advp?", "np", "np"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_pp", "advp?", "preposition"], "postprocess": nt("vbg_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_ap", "advp?", "ap_np_moved"], "postprocess": nt("vbg_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_to_inf_cl", "advp?", "to_inf_cl_np_moved"], "postprocess": nt("vbg_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_bare_inf_cl", "advp?", "bare_inf_cl_np_moved"], "postprocess": nt("vbg_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_declarative_cl", "advp?", "declarative_cl_np_moved"], "postprocess": nt("vbg_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["vbg_vbg_cl", "vbg_cl_np_moved"], "postprocess": nt("vbg_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["vbg_vbn_cl", "vbn_cl_np_moved"], "postprocess": nt("vbg_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_np", "advp?"], "postprocess": nt("vbg_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_np_pp", "advp?", "pp"], "postprocess": nt("vbg_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_np_pp", "advp?", "np", "preposition"], "postprocess": nt("vbg_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_np_ap", "advp?", "ap"], "postprocess": nt("vbg_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_np_ap", "advp?", "np", "ap_np_moved"], "postprocess": nt("vbg_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_np_to_inf_cl", "advp?", "to_inf_cl"], "postprocess": nt("vbg_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_np_to_inf_cl", "advp?", "np", "to_inf_cl_np_moved"], "postprocess": nt("vbg_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_np_bare_inf_cl", "advp?", "bare_inf_cl"], "postprocess": nt("vbg_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_np_bare_inf_cl", "advp?", "np", "bare_inf_cl_np_moved"], "postprocess": nt("vbg_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_np_declarative_cl", "advp?", "declarative_cl"], "postprocess": nt("vbg_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_np_declarative_cl", "advp?", "np", "declarative_cl_np_moved"], "postprocess": nt("vbg_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_np_exclamative_cl", "advp?", "exclamative_cl"], "postprocess": nt("vbg_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_np_interrogative_cl", "advp?", "interrogative_cl"], "postprocess": nt("vbg_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_np_np", "advp?", "np"], "postprocess": nt("vbg_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_np_np", "advp?", "to", "np"], "postprocess": nt("vbg_vp_np_moved")},
    {"name": "vbg_vp_pp_moved", "symbols": ["advp?", "vbg_pp", "advp?"], "postprocess": nt("vbg_vp_pp_moved")},
    {"name": "vbg_vp_pp_moved", "symbols": ["advp?", "vbg_ap", "advp?", "ap_pp_moved"], "postprocess": nt("vbg_vp_pp_moved")},
    {"name": "vbg_vp_pp_moved", "symbols": ["advp?", "vbg_to_inf_cl", "advp?", "to_inf_cl_pp_moved"], "postprocess": nt("vbg_vp_pp_moved")},
    {"name": "vbg_vp_pp_moved", "symbols": ["advp?", "vbg_bare_inf_cl", "advp?", "bare_inf_cl_pp_moved"], "postprocess": nt("vbg_vp_pp_moved")},
    {"name": "vbg_vp_pp_moved", "symbols": ["advp?", "vbg_declarative_cl", "advp?", "declarative_cl_pp_moved"], "postprocess": nt("vbg_vp_pp_moved")},
    {"name": "vbg_vp_pp_moved", "symbols": ["advp?", "vbg_np_pp", "advp?", "np"], "postprocess": nt("vbg_vp_pp_moved")},
    {"name": "vbg_vp_pp_moved", "symbols": ["advp?", "vbg_np_ap", "advp?", "np", "ap_pp_moved"], "postprocess": nt("vbg_vp_pp_moved")},
    {"name": "vbg_vp_pp_moved", "symbols": ["advp?", "vbg_np_to_inf_cl", "advp?", "np", "to_inf_cl_pp_moved"], "postprocess": nt("vbg_vp_pp_moved")},
    {"name": "vbg_vp_pp_moved", "symbols": ["advp?", "vbg_np_bare_inf_cl", "advp?", "np", "bare_inf_cl_pp_moved"], "postprocess": nt("vbg_vp_pp_moved")},
    {"name": "vbg_vp_pp_moved", "symbols": ["advp?", "vbg_np_declarative_cl", "advp?", "np", "declarative_cl_pp_moved"], "postprocess": nt("vbg_vp_pp_moved")},
    {"name": "declarative_cl", "symbols": ["that", "decl_fin_cl"], "postprocess": nt("declarative_cl")},
    {"name": "exclamative_cl", "symbols": ["interrogative_cl"], "postprocess": nt("exclamative_cl")},
    {"name": "interrogative_cl", "symbols": ["wh_np", "fin_vp_np_moved", "pp_list"], "postprocess": nt("interrogative_cl")},
    {"name": "interrogative_cl", "symbols": ["wh_pp", "fin_vp_pp_moved", "pp_list"], "postprocess": nt("interrogative_cl")},
    {"name": "interrogative_cl", "symbols": ["wh_pp", "fin_vp", "pp_list"], "postprocess": nt("interrogative_cl")},
    {"name": "interrogative_cl", "symbols": ["wh_np", "fin_vp", "preposition", "pp_list"], "postprocess": nt("interrogative_cl")},
    {"name": "interrogative_cl", "symbols": ["interrogative_subordinator", "fin_vp", "pp_list"], "postprocess": nt("interrogative_cl")},
    {"name": "declarative_cl_np_moved", "symbols": ["that", "fin_vp_np_moved", "pp_list"], "postprocess": nt("declarative_cl_np_moved")},
    {"name": "declarative_cl_np_moved", "symbols": ["that", "fin_vp", "preposition", "pp_list"], "postprocess": nt("declarative_cl_np_moved")},
    {"name": "declarative_cl_pp_moved", "symbols": ["that", "fin_vp_pp_moved", "pp_list"], "postprocess": nt("declarative_cl_pp_moved")},
    {"name": "declarative_cl_pp_moved", "symbols": ["that", "fin_vp", "preposition", "pp_list"], "postprocess": nt("declarative_cl_pp_moved")},
    {"name": "np", "symbols": ["precorenp_modifier_list", "core_np", "postcorenp_modifier_list"], "postprocess": nt("np")},
    {"name": "precorenp_modifier_list$ebnf$1", "symbols": []},
    {"name": "precorenp_modifier_list$ebnf$1", "symbols": ["precorenp_modifier_list$ebnf$1", "precorenp_modifier"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "precorenp_modifier_list", "symbols": ["precorenp_modifier_list$ebnf$1"], "postprocess": nonterminal_unpack("precorenp_modifier_list")},
    {"name": "postcorenp_modifier_list$ebnf$1", "symbols": []},
    {"name": "postcorenp_modifier_list$ebnf$1", "symbols": ["postcorenp_modifier_list$ebnf$1", postcorenp_modifier], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "postcorenp_modifier_list", "symbols": ["postcorenp_modifier_list$ebnf$1"], "postprocess": nonterminal_unpack("postcorenp_modifier_list")},
    {"name": "core_np", "symbols": ["proper_noun"], "postprocess": nt("core_np")},
    {"name": "core_np", "symbols": ["pronoun"], "postprocess": nt("core_np")},
    {"name": "core_np", "symbols": ["ap_list", "uncountable_noun", "n_modifier_list"], "postprocess": nt("core_np")},
    {"name": "core_np", "symbols": ["dp", "ap_list", "noun", "n_modifier_list"], "postprocess": nt("core_np")},
    {"name": "wh_np", "symbols": ["wh"], "postprocess": nt("wh_np")},
    {"name": "wh_np", "symbols": ["wh", "np"], "postprocess": nt("wh_np")},
    {"name": "n_modifier", "symbols": ["declarative_cl"], "postprocess": nt("n_modifier")},
    {"name": "n_modifier", "symbols": ["pp"], "postprocess": nt("n_modifier")},
    {"name": "n_modifier_list$ebnf$1", "symbols": []},
    {"name": "n_modifier_list$ebnf$1", "symbols": ["n_modifier_list$ebnf$1", "n_modifier"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "n_modifier_list", "symbols": ["n_modifier_list$ebnf$1"], "postprocess": nonterminal_unpack("n_modifier_list")},
    {"name": "dp", "symbols": ["det"], "postprocess": nt("det")},
    {"name": "dp", "symbols": ["np", "s"], "postprocess": nt("det")},
    {"name": "dp", "symbols": ["pronoun_pos"], "postprocess": nt("det")},
    {"name": "pp", "symbols": ["preposition", "np"], "postprocess": nt("pp")},
    {"name": "pp_list$ebnf$1", "symbols": []},
    {"name": "pp_list$ebnf$1", "symbols": ["pp_list$ebnf$1", "pp"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "pp_list", "symbols": ["pp_list$ebnf$1"], "postprocess": nonterminal_unpack("pp_list")},
    {"name": "wh_pp", "symbols": ["preposition", "wh_np"], "postprocess": nt("wh_pp")},
    {"name": "ap", "symbols": ["advp", "ap"], "postprocess": nt("ap")},
    {"name": "ap", "symbols": ["adj"], "postprocess": nt("ap")},
    {"name": "ap", "symbols": ["adj_pp", "pp"], "postprocess": nt("ap")},
    {"name": "ap", "symbols": ["adj_declarative_cl", "declarative_cl"], "postprocess": nt("ap")},
    {"name": "ap_pp_moved", "symbols": ["advp", "ap_pp_moved"], "postprocess": nt("ap_pp_moved")},
    {"name": "ap_pp_moved", "symbols": ["adj_pp"], "postprocess": nt("ap_pp_moved")},
    {"name": "ap_pp_moved", "symbols": ["adj_declarative_cl", "declarative_cl_pp_moved"], "postprocess": nt("ap_pp_moved")},
    {"name": "ap_np_moved", "symbols": ["advp", "ap_np_moved"], "postprocess": nt("ap_np_moved")},
    {"name": "ap_np_moved", "symbols": ["adj_pp", "preposition"], "postprocess": nt("ap_np_moved")},
    {"name": "ap_np_moved", "symbols": ["adj_declarative_cl", "declarative_cl_np_moved"], "postprocess": nt("ap_np_moved")},
    {"name": "ap_list$ebnf$1", "symbols": []},
    {"name": "ap_list$ebnf$1", "symbols": ["ap_list$ebnf$1", "ap"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ap_list", "symbols": ["ap_list$ebnf$1"], "postprocess": nonterminal_unpack("ap_list")},
    {"name": "advp", "symbols": ["adv"], "postprocess": nt("advp")},
    {"name": "advp", "symbols": ["adv", "advp"], "postprocess": nt("advp")},
    {"name": "advp?$ebnf$1", "symbols": ["advp"], "postprocess": id},
    {"name": "advp?$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "advp?", "symbols": ["advp?$ebnf$1"], "postprocess": nonterminal_unpack("advp?")},
    {"name": "det", "symbols": [det], "postprocess": t("det")},
    {"name": "pronoun", "symbols": [pronoun], "postprocess": t("pronoun")},
    {"name": "pronoun_pos", "symbols": [pronoun_pos], "postprocess": t("pronoun_pos")},
    {"name": "proper_noun", "symbols": [proper_noun], "postprocess": t("proper_noun")},
    {"name": "uncountable_noun", "symbols": [uncountable_noun], "postprocess": t("uncountable_noun")},
    {"name": "noun", "symbols": [noun], "postprocess": t("noun")},
    {"name": "preposition", "symbols": [preposition], "postprocess": t("preposition")},
    {"name": "to", "symbols": [to], "postprocess": t("to")},
    {"name": "s", "symbols": [s], "postprocess": t("s")},
    {"name": "that", "symbols": [that], "postprocess": t("that")},
    {"name": "interrogative_subordinator", "symbols": [interrogative_subordinator], "postprocess": t("interrogative_subordinator")},
    {"name": "vb", "symbols": [vb], "postprocess": t("vb")},
    {"name": "vb_pp", "symbols": [vb_pp], "postprocess": t("vb_pp")},
    {"name": "vb_ap", "symbols": [vb_ap], "postprocess": t("vb_ap")},
    {"name": "vb_to_inf_cl", "symbols": [vb_to_inf_cl], "postprocess": t("vb_to_inf_cl")},
    {"name": "vb_bare_inf_cl", "symbols": [vb_bare_inf_cl], "postprocess": t("vb_bare_inf_cl")},
    {"name": "vb_declarative_cl", "symbols": [vb_declarative_cl], "postprocess": t("vb_declarative_cl")},
    {"name": "vb_exclamative_cl", "symbols": [vb_exclamative_cl], "postprocess": t("vb_exclamative_cl")},
    {"name": "vb_interrogative_cl", "symbols": [vb_interrogative_cl], "postprocess": t("vb_interrogative_cl")},
    {"name": "vb_vbg_cl", "symbols": [vb_vbg_cl], "postprocess": t("vb_vbg_cl")},
    {"name": "vb_vbn_cl", "symbols": [vb_vbn_cl], "postprocess": t("vb_vbn_cl")},
    {"name": "vb_np", "symbols": [vb_np], "postprocess": t("vb_np")},
    {"name": "vb_np_pp", "symbols": [vb_np_pp], "postprocess": t("vb_np_pp")},
    {"name": "vb_np_ap", "symbols": [vb_np_ap], "postprocess": t("vb_np_ap")},
    {"name": "vb_np_to_inf_cl", "symbols": [vb_np_to_inf_cl], "postprocess": t("vb_np_to_inf_cl")},
    {"name": "vb_np_bare_inf_cl", "symbols": [vb_np_bare_inf_cl], "postprocess": t("vb_np_bare_inf_cl")},
    {"name": "vb_np_declarative_cl", "symbols": [vb_np_declarative_cl], "postprocess": t("vb_np_declarative_cl")},
    {"name": "vb_np_exclamative_cl", "symbols": [vb_np_exclamative_cl], "postprocess": t("vb_np_exclamative_cl")},
    {"name": "vb_np_interrogative_cl", "symbols": [vb_np_interrogative_cl], "postprocess": t("vb_np_interrogative_cl")},
    {"name": "vb_np_np", "symbols": [vb_np_np], "postprocess": t("vb_np_np")},
    {"name": "vbd", "symbols": [vbd], "postprocess": t("vbd")},
    {"name": "vbd_pp", "symbols": [vbd_pp], "postprocess": t("vbd_pp")},
    {"name": "vbd_ap", "symbols": [vbd_ap], "postprocess": t("vbd_ap")},
    {"name": "vbd_to_inf_cl", "symbols": [vbd_to_inf_cl], "postprocess": t("vbd_to_inf_cl")},
    {"name": "vbd_bare_inf_cl", "symbols": [vbd_bare_inf_cl], "postprocess": t("vbd_bare_inf_cl")},
    {"name": "vbd_declarative_cl", "symbols": [vbd_declarative_cl], "postprocess": t("vbd_declarative_cl")},
    {"name": "vbd_exclamative_cl", "symbols": [vbd_exclamative_cl], "postprocess": t("vbd_exclamative_cl")},
    {"name": "vbd_interrogative_cl", "symbols": [vbd_interrogative_cl], "postprocess": t("vbd_interrogative_cl")},
    {"name": "vbd_vbg_cl", "symbols": [vbd_vbg_cl], "postprocess": t("vbd_vbg_cl")},
    {"name": "vbd_vbn_cl", "symbols": [vbd_vbn_cl], "postprocess": t("vbd_vbn_cl")},
    {"name": "vbd_np", "symbols": [vbd_np], "postprocess": t("vbd_np")},
    {"name": "vbd_np_pp", "symbols": [vbd_np_pp], "postprocess": t("vbd_np_pp")},
    {"name": "vbd_np_ap", "symbols": [vbd_np_ap], "postprocess": t("vbd_np_ap")},
    {"name": "vbd_np_to_inf_cl", "symbols": [vbd_np_to_inf_cl], "postprocess": t("vbd_np_to_inf_cl")},
    {"name": "vbd_np_bare_inf_cl", "symbols": [vbd_np_bare_inf_cl], "postprocess": t("vbd_np_bare_inf_cl")},
    {"name": "vbd_np_declarative_cl", "symbols": [vbd_np_declarative_cl], "postprocess": t("vbd_np_declarative_cl")},
    {"name": "vbd_np_exclamative_cl", "symbols": [vbd_np_exclamative_cl], "postprocess": t("vbd_np_exclamative_cl")},
    {"name": "vbd_np_interrogative_cl", "symbols": [vbd_np_interrogative_cl], "postprocess": t("vbd_np_interrogative_cl")},
    {"name": "vbd_np_np", "symbols": [vbd_np_np], "postprocess": t("vbd_np_np")},
    {"name": "vbg", "symbols": [vbg], "postprocess": t("vbg")},
    {"name": "vbg_pp", "symbols": [vbg_pp], "postprocess": t("vbg_pp")},
    {"name": "vbg_ap", "symbols": [vbg_ap], "postprocess": t("vbg_ap")},
    {"name": "vbg_to_inf_cl", "symbols": [vbg_to_inf_cl], "postprocess": t("vbg_to_inf_cl")},
    {"name": "vbg_bare_inf_cl", "symbols": [vbg_bare_inf_cl], "postprocess": t("vbg_bare_inf_cl")},
    {"name": "vbg_declarative_cl", "symbols": [vbg_declarative_cl], "postprocess": t("vbg_declarative_cl")},
    {"name": "vbg_exclamative_cl", "symbols": [vbg_exclamative_cl], "postprocess": t("vbg_exclamative_cl")},
    {"name": "vbg_interrogative_cl", "symbols": [vbg_interrogative_cl], "postprocess": t("vbg_interrogative_cl")},
    {"name": "vbg_vbg_cl", "symbols": [vbg_vbg_cl], "postprocess": t("vbg_vbg_cl")},
    {"name": "vbg_vbn_cl", "symbols": [vbg_vbn_cl], "postprocess": t("vbg_vbn_cl")},
    {"name": "vbg_np", "symbols": [vbg_np], "postprocess": t("vbg_np")},
    {"name": "vbg_np_pp", "symbols": [vbg_np_pp], "postprocess": t("vbg_np_pp")},
    {"name": "vbg_np_ap", "symbols": [vbg_np_ap], "postprocess": t("vbg_np_ap")},
    {"name": "vbg_np_to_inf_cl", "symbols": [vbg_np_to_inf_cl], "postprocess": t("vbg_np_to_inf_cl")},
    {"name": "vbg_np_bare_inf_cl", "symbols": [vbg_np_bare_inf_cl], "postprocess": t("vbg_np_bare_inf_cl")},
    {"name": "vbg_np_declarative_cl", "symbols": [vbg_np_declarative_cl], "postprocess": t("vbg_np_declarative_cl")},
    {"name": "vbg_np_exclamative_cl", "symbols": [vbg_np_exclamative_cl], "postprocess": t("vbg_np_exclamative_cl")},
    {"name": "vbg_np_interrogative_cl", "symbols": [vbg_np_interrogative_cl], "postprocess": t("vbg_np_interrogative_cl")},
    {"name": "vbg_np_np", "symbols": [vbg_np_np], "postprocess": t("vbg_np_np")},
    {"name": "vbn", "symbols": [vbn], "postprocess": t("vbn")},
    {"name": "vbn_pp", "symbols": [vbn_pp], "postprocess": t("vbn_pp")},
    {"name": "vbn_ap", "symbols": [vbn_ap], "postprocess": t("vbn_ap")},
    {"name": "vbn_to_inf_cl", "symbols": [vbn_to_inf_cl], "postprocess": t("vbn_to_inf_cl")},
    {"name": "vbn_bare_inf_cl", "symbols": [vbn_bare_inf_cl], "postprocess": t("vbn_bare_inf_cl")},
    {"name": "vbn_declarative_cl", "symbols": [vbn_declarative_cl], "postprocess": t("vbn_declarative_cl")},
    {"name": "vbn_exclamative_cl", "symbols": [vbn_exclamative_cl], "postprocess": t("vbn_exclamative_cl")},
    {"name": "vbn_interrogative_cl", "symbols": [vbn_interrogative_cl], "postprocess": t("vbn_interrogative_cl")},
    {"name": "vbn_vbg_cl", "symbols": [vbn_vbg_cl], "postprocess": t("vbn_vbg_cl")},
    {"name": "vbn_vbn_cl", "symbols": [vbn_vbn_cl], "postprocess": t("vbn_vbn_cl")},
    {"name": "vbn_np", "symbols": [vbn_np], "postprocess": t("vbn_np")},
    {"name": "vbn_np_pp", "symbols": [vbn_np_pp], "postprocess": t("vbn_np_pp")},
    {"name": "vbn_np_ap", "symbols": [vbn_np_ap], "postprocess": t("vbn_np_ap")},
    {"name": "vbn_np_to_inf_cl", "symbols": [vbn_np_to_inf_cl], "postprocess": t("vbn_np_to_inf_cl")},
    {"name": "vbn_np_bare_inf_cl", "symbols": [vbn_np_bare_inf_cl], "postprocess": t("vbn_np_bare_inf_cl")},
    {"name": "vbn_np_declarative_cl", "symbols": [vbn_np_declarative_cl], "postprocess": t("vbn_np_declarative_cl")},
    {"name": "vbn_np_exclamative_cl", "symbols": [vbn_np_exclamative_cl], "postprocess": t("vbn_np_exclamative_cl")},
    {"name": "vbn_np_interrogative_cl", "symbols": [vbn_np_interrogative_cl], "postprocess": t("vbn_np_interrogative_cl")},
    {"name": "vbn_np_np", "symbols": [vbn_np_np], "postprocess": t("vbn_np_np")},
    {"name": "vbp", "symbols": [vbp], "postprocess": t("vbp")},
    {"name": "vbp_pp", "symbols": [vbp_pp], "postprocess": t("vbp_pp")},
    {"name": "vbp_ap", "symbols": [vbp_ap], "postprocess": t("vbp_ap")},
    {"name": "vbp_to_inf_cl", "symbols": [vbp_to_inf_cl], "postprocess": t("vbp_to_inf_cl")},
    {"name": "vbp_bare_inf_cl", "symbols": [vbp_bare_inf_cl], "postprocess": t("vbp_bare_inf_cl")},
    {"name": "vbp_declarative_cl", "symbols": [vbp_declarative_cl], "postprocess": t("vbp_declarative_cl")},
    {"name": "vbp_exclamative_cl", "symbols": [vbp_exclamative_cl], "postprocess": t("vbp_exclamative_cl")},
    {"name": "vbp_interrogative_cl", "symbols": [vbp_interrogative_cl], "postprocess": t("vbp_interrogative_cl")},
    {"name": "vbp_vbg_cl", "symbols": [vbp_vbg_cl], "postprocess": t("vbp_vbg_cl")},
    {"name": "vbp_vbn_cl", "symbols": [vbp_vbn_cl], "postprocess": t("vbp_vbn_cl")},
    {"name": "vbp_np", "symbols": [vbp_np], "postprocess": t("vbp_np")},
    {"name": "vbp_np_pp", "symbols": [vbp_np_pp], "postprocess": t("vbp_np_pp")},
    {"name": "vbp_np_ap", "symbols": [vbp_np_ap], "postprocess": t("vbp_np_ap")},
    {"name": "vbp_np_to_inf_cl", "symbols": [vbp_np_to_inf_cl], "postprocess": t("vbp_np_to_inf_cl")},
    {"name": "vbp_np_bare_inf_cl", "symbols": [vbp_np_bare_inf_cl], "postprocess": t("vbp_np_bare_inf_cl")},
    {"name": "vbp_np_declarative_cl", "symbols": [vbp_np_declarative_cl], "postprocess": t("vbp_np_declarative_cl")},
    {"name": "vbp_np_exclamative_cl", "symbols": [vbp_np_exclamative_cl], "postprocess": t("vbp_np_exclamative_cl")},
    {"name": "vbp_np_interrogative_cl", "symbols": [vbp_np_interrogative_cl], "postprocess": t("vbp_np_interrogative_cl")},
    {"name": "vbp_np_np", "symbols": [vbp_np_np], "postprocess": t("vbp_np_np")},
    {"name": "vbz", "symbols": [vbz], "postprocess": t("vbz")},
    {"name": "vbz_pp", "symbols": [vbz_pp], "postprocess": t("vbz_pp")},
    {"name": "vbz_ap", "symbols": [vbz_ap], "postprocess": t("vbz_ap")},
    {"name": "vbz_to_inf_cl", "symbols": [vbz_to_inf_cl], "postprocess": t("vbz_to_inf_cl")},
    {"name": "vbz_bare_inf_cl", "symbols": [vbz_bare_inf_cl], "postprocess": t("vbz_bare_inf_cl")},
    {"name": "vbz_declarative_cl", "symbols": [vbz_declarative_cl], "postprocess": t("vbz_declarative_cl")},
    {"name": "vbz_exclamative_cl", "symbols": [vbz_exclamative_cl], "postprocess": t("vbz_exclamative_cl")},
    {"name": "vbz_interrogative_cl", "symbols": [vbz_interrogative_cl], "postprocess": t("vbz_interrogative_cl")},
    {"name": "vbz_vbg_cl", "symbols": [vbz_vbg_cl], "postprocess": t("vbz_vbg_cl")},
    {"name": "vbz_vbn_cl", "symbols": [vbz_vbn_cl], "postprocess": t("vbz_vbn_cl")},
    {"name": "vbz_np", "symbols": [vbz_np], "postprocess": t("vbz_np")},
    {"name": "vbz_np_pp", "symbols": [vbz_np_pp], "postprocess": t("vbz_np_pp")},
    {"name": "vbz_np_ap", "symbols": [vbz_np_ap], "postprocess": t("vbz_np_ap")},
    {"name": "vbz_np_to_inf_cl", "symbols": [vbz_np_to_inf_cl], "postprocess": t("vbz_np_to_inf_cl")},
    {"name": "vbz_np_bare_inf_cl", "symbols": [vbz_np_bare_inf_cl], "postprocess": t("vbz_np_bare_inf_cl")},
    {"name": "vbz_np_declarative_cl", "symbols": [vbz_np_declarative_cl], "postprocess": t("vbz_np_declarative_cl")},
    {"name": "vbz_np_exclamative_cl", "symbols": [vbz_np_exclamative_cl], "postprocess": t("vbz_np_exclamative_cl")},
    {"name": "vbz_np_interrogative_cl", "symbols": [vbz_np_interrogative_cl], "postprocess": t("vbz_np_interrogative_cl")},
    {"name": "vbz_np_np", "symbols": [vbz_np_np], "postprocess": t("vbz_np_np")},
    {"name": "adj", "symbols": [adj], "postprocess": t("adj")},
    {"name": "adj_pp", "symbols": [adj_pp], "postprocess": t("adj_pp")},
    {"name": "adj_declarative_cl", "symbols": [adj_declarative_cl], "postprocess": t("adj_declarative_cl")},
    {"name": "adv", "symbols": [adv], "postprocess": t("adv")},
    {"name": "wh", "symbols": [wh], "postprocess": t("wh")},
    {"name": "precorenp_modifier", "symbols": [precorenp_modifier], "postprocess": t("precorenp_modifier")},
    {"name": "postcorenp_modifier", "symbols": [postcorenp_modifier], "postprocess": t("postcorenp_modifier")}
];
let ParserStart = "decl_fin_cl";
export default { Lexer, ParserRules, ParserStart };

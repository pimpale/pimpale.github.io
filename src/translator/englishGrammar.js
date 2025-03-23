// Generated automatically by nearley, version 2.20.1
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
const not = {test: x => x in english.not};
const that = {test: x => x in english.that};
const interrogative_subordinator = {test: x => x in english.interrogative_subordinator};

// punctuation
const period = {test: x => x == "." };
const question_mark = { test: x => x == "?" };
const exclamation_mark = { test: x => x == "!" };

// verbs

// Modal (MODAL)
const modal = {test: x => x in english.modal};

// Base Verb (VB)
const vb = {test: x => x in english.vb};
const vb_ap = {test: x => x in english.vb_ap};
const vb_to_inf_cl = {test: x => x in english.vb_to_inf_cl};
const vb_bare_inf_cl = {test: x => x in english.vb_bare_inf_cl};
const vb_declarative_cl = {test: x => x in english.vb_declarative_cl};
const vb_exclamative_cl = {test: x => x in english.vb_exclamative_cl};
const vb_interrogative_cl = {test: x => x in english.vb_interrogative_cl};
const vb_vbg_cl = {test: x => x in english.vb_vbg_cl};
const vb_vbn_cl = {test: x => x in english.vb_vbn_cl};
const vb_np = {test: x => x in english.vb_np};
const vb_np_ap = {test: x => x in english.vb_np_ap};
const vb_np_to_inf_cl = {test: x => x in english.vb_np_to_inf_cl};
const vb_np_bare_inf_cl = {test: x => x in english.vb_np_bare_inf_cl};
const vb_np_declarative_cl = {test: x => x in english.vb_np_declarative_cl};
const vb_np_exclamative_cl = {test: x => x in english.vb_np_exclamative_cl};
const vb_np_interrogative_cl = {test: x => x in english.vb_np_interrogative_cl};
const vb_np_np = {test: x => x in english.vb_np_np};

// Verb Gerund or Present Participle (VBG)
const vbg = {test: x => x in english.vbg};
const vbg_ap = {test: x => x in english.vbg_ap};
const vbg_to_inf_cl = {test: x => x in english.vbg_to_inf_cl};
const vbg_bare_inf_cl = {test: x => x in english.vbg_bare_inf_cl};
const vbg_declarative_cl = {test: x => x in english.vbg_declarative_cl};
const vbg_exclamative_cl = {test: x => x in english.vbg_exclamative_cl};
const vbg_interrogative_cl = {test: x => x in english.vbg_interrogative_cl};
const vbg_vbg_cl = {test: x => x in english.vbg_vbg_cl};
const vbg_vbn_cl = {test: x => x in english.vbg_vbn_cl};
const vbg_np = {test: x => x in english.vbg_np};
const vbg_np_ap = {test: x => x in english.vbg_np_ap};
const vbg_np_to_inf_cl = {test: x => x in english.vbg_np_to_inf_cl};
const vbg_np_bare_inf_cl = {test: x => x in english.vbg_np_bare_inf_cl};
const vbg_np_declarative_cl = {test: x => x in english.vbg_np_declarative_cl};
const vbg_np_exclamative_cl = {test: x => x in english.vbg_np_exclamative_cl};
const vbg_np_interrogative_cl = {test: x => x in english.vbg_np_interrogative_cl};
const vbg_np_np = {test: x => x in english.vbg_np_np};

// Verb Past Participle (VBN)
const vbn = {test: x => x in english.vbn};
const vbn_ap = {test: x => x in english.vbn_ap};
const vbn_to_inf_cl = {test: x => x in english.vbn_to_inf_cl};
const vbn_bare_inf_cl = {test: x => x in english.vbn_bare_inf_cl};
const vbn_declarative_cl = {test: x => x in english.vbn_declarative_cl};
const vbn_exclamative_cl = {test: x => x in english.vbn_exclamative_cl};
const vbn_interrogative_cl = {test: x => x in english.vbn_interrogative_cl};
const vbn_vbg_cl = {test: x => x in english.vbn_vbg_cl};
const vbn_vbn_cl = {test: x => x in english.vbn_vbn_cl};
const vbn_np = {test: x => x in english.vbn_np};
const vbn_np_ap = {test: x => x in english.vbn_np_ap};
const vbn_np_to_inf_cl = {test: x => x in english.vbn_np_to_inf_cl};
const vbn_np_bare_inf_cl = {test: x => x in english.vbn_np_bare_inf_cl};
const vbn_np_declarative_cl = {test: x => x in english.vbn_np_declarative_cl};
const vbn_np_exclamative_cl = {test: x => x in english.vbn_np_exclamative_cl};
const vbn_np_interrogative_cl = {test: x => x in english.vbn_np_interrogative_cl};
const vbn_np_np = {test: x => x in english.vbn_np_np};

// Verb Finite (VBF): supercategory for the following
// - Past Tense Verb (VBD)
// - Non-third person singular present (VBP)
// - Third person singular present (VBZ)

const vbf = {test: x => x in english.vbd || x in english.vbp || x in english.vbz};
const vbf_ap = {test: x => x in english.vbd_ap || x in english.vbp_ap || x in english.vbz_ap};
const vbf_to_inf_cl = {test: x => x in english.vbd_to_inf_cl || x in english.vbp_to_inf_cl || x in english.vbz_to_inf_cl};
const vbf_bare_inf_cl = {test: x => x in english.vbd_bare_inf_cl || x in english.vbp_bare_inf_cl || x in english.vbz_bare_inf_cl};
const vbf_declarative_cl = {test: x => x in english.vbd_declarative_cl || x in english.vbp_declarative_cl || x in english.vbz_declarative_cl};
const vbf_exclamative_cl = {test: x => x in english.vbd_exclamative_cl || x in english.vbp_exclamative_cl || x in english.vbz_exclamative_cl};
const vbf_interrogative_cl = {test: x => x in english.vbd_interrogative_cl || x in english.vbp_interrogative_cl || x in english.vbz_interrogative_cl};
const vbf_vbg_cl = {test: x => x in english.vbd_vbg_cl || x in english.vbp_vbg_cl || x in english.vbz_vbg_cl};
const vbf_vbn_cl = {test: x => x in english.vbd_vbn_cl || x in english.vbp_vbn_cl || x in english.vbz_vbn_cl};
const vbf_np = {test: x => x in english.vbd_np || x in english.vbp_np || x in english.vbz_np};
const vbf_np_ap = {test: x => x in english.vbd_np_ap || x in english.vbp_np_ap || x in english.vbz_np_ap};
const vbf_np_to_inf_cl = {test: x => x in english.vbd_np_to_inf_cl || x in english.vbp_np_to_inf_cl || x in english.vbz_np_to_inf_cl};
const vbf_np_bare_inf_cl = {test: x => x in english.vbd_np_bare_inf_cl || x in english.vbp_np_bare_inf_cl || x in english.vbz_np_bare_inf_cl};
const vbf_np_declarative_cl = {test: x => x in english.vbd_np_declarative_cl || x in english.vbp_np_declarative_cl || x in english.vbz_np_declarative_cl};
const vbf_np_exclamative_cl = {test: x => x in english.vbd_np_exclamative_cl || x in english.vbp_np_exclamative_cl || x in english.vbz_np_exclamative_cl};
const vbf_np_interrogative_cl = {test: x => x in english.vbd_np_interrogative_cl || x in english.vbp_np_interrogative_cl || x in english.vbz_np_interrogative_cl};
const vbf_np_np = {test: x => x in english.vbd_np_np || x in english.vbp_np_np || x in english.vbz_np_np};

// certain core verbs
const be_fin = {test: x => x in english.is || x in english.are || x in english.were};
const do_fin = {test: x => x in english.do || x in english.does || x in english.did};

// adjectives
const adj = {test: x => x in english.adj}; // adjectives that don't take any arguments (ex: "happy")
const adj_pp = {test: x => x in english.adj_pp}; // adjectives that take a prepositional phrase argument (ex: "fond of cheese")
const adj_declarative_cl = {test: x => x in english.adj_declarative_cl}; // adjectives that take a declarative clause argument (ex: "happy that you could make it")
const adj_to_inf_cl = {test: x => x in english.adj_to_inf_cl}; // adjectives that take an infinitive clause argument (ex: "happy to see you")


// adverbs
const adv = {test: x => x in english.adv}; // adverbs that don't take any arguments (ex: "quickly")
const precorenp_modifier = {test: x => x in english.precorenp_modifier}; // peripheral modifiers (ex: "even", "all")
const postcorenp_modifier = {test: x => x in english.postcorenp_modifier}; // peripheral modifiers (ex: "too", "altogether")

// wh-words (that replace nouns)
const wh = {test: x => x in english.wh}; // wh-words (ex: "who", "what", "where", "when", "why")

// replaces adjective phrases
const how = {test: x => x in english.how}; // how
// replaces reasons
const why = {test: x => x in english.why}; // why

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
    {"name": "text$ebnf$1", "symbols": []},
    {"name": "text$ebnf$1", "symbols": ["text$ebnf$1", "sentence"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "text", "symbols": ["text$ebnf$1"], "postprocess": nonterminal_unpack("text")},
    {"name": "sentence", "symbols": ["fin_cl", "period"], "postprocess": nt("sentence")},
    {"name": "sentence", "symbols": ["fin_cl", "exclamation_mark"], "postprocess": nt("sentence")},
    {"name": "sentence", "symbols": ["question_cl", "question_mark"], "postprocess": nt("sentence")},
    {"name": "fin_cl", "symbols": ["adjunct_list", "np", "fin_vp", "adjunct_list"], "postprocess": nt("fin_cl")},
    {"name": "question_cl", "symbols": ["subj_aux_inv_cl", "adjunct_list"], "postprocess": nt("question_cl")},
    {"name": "question_cl", "symbols": ["wh", "fin_vp", "adjunct_list"], "postprocess": nt("question_cl")},
    {"name": "question_cl", "symbols": ["wh", "subj_aux_inv_cl_np_moved", "adjunct_list"], "postprocess": nt("question_cl")},
    {"name": "question_cl", "symbols": ["why", "subj_aux_inv_cl", "adjunct_list"], "postprocess": nt("question_cl")},
    {"name": "question_cl", "symbols": ["how", "advp?", "subj_aux_inv_cl", "adjunct_list"], "postprocess": nt("question_cl")},
    {"name": "question_cl", "symbols": ["how", "subj_aux_inv_cl_ap_moved", "adjunct_list"], "postprocess": nt("question_cl")},
    {"name": "subj_aux_inv_cl", "symbols": ["modal", "not?", "np", "bare_inf_cl"], "postprocess": nt("subj_aux_inv_cl")},
    {"name": "subj_aux_inv_cl", "symbols": ["be_fin", "not?", "np", "ap"], "postprocess": nt("subj_aux_inv_cl")},
    {"name": "subj_aux_inv_cl", "symbols": ["be_fin", "not?", "np", "np"], "postprocess": nt("subj_aux_inv_cl")},
    {"name": "subj_aux_inv_cl", "symbols": ["vbf_vbg_cl", "not?", "np", "vbg_cl"], "postprocess": nt("subj_aux_inv_cl")},
    {"name": "subj_aux_inv_cl", "symbols": ["vbf_vbn_cl", "not?", "np", "vbn_cl"], "postprocess": nt("subj_aux_inv_cl")},
    {"name": "subj_aux_inv_cl", "symbols": ["do_fin", "not?", "np", "bare_inf_cl"], "postprocess": nt("subj_aux_inv_cl")},
    {"name": "subj_aux_inv_cl_np_moved", "symbols": ["modal", "not?", "bare_inf_cl"], "postprocess": nt("subj_aux_inv_cl_np_moved")},
    {"name": "subj_aux_inv_cl_np_moved", "symbols": ["modal", "not?", "np", "bare_inf_cl_np_moved"], "postprocess": nt("subj_aux_inv_cl_np_moved")},
    {"name": "subj_aux_inv_cl_np_moved", "symbols": ["be_fin", "not?", "ap"], "postprocess": nt("subj_aux_inv_cl_np_moved")},
    {"name": "subj_aux_inv_cl_np_moved", "symbols": ["vbf_vbg_cl", "not?", "vbg_cl"], "postprocess": nt("subj_aux_inv_cl_np_moved")},
    {"name": "subj_aux_inv_cl_np_moved", "symbols": ["vbf_vbn_cl", "not?", "vbn_cl"], "postprocess": nt("subj_aux_inv_cl_np_moved")},
    {"name": "subj_aux_inv_cl_np_moved", "symbols": ["do_fin", "not?", "bare_inf_cl"], "postprocess": nt("subj_aux_inv_cl_np_moved")},
    {"name": "subj_aux_inv_cl_np_moved", "symbols": ["vbf_vbg_cl", "not?", "np", "vbg_cl_np_moved"], "postprocess": nt("subj_aux_inv_cl_np_moved")},
    {"name": "subj_aux_inv_cl_np_moved", "symbols": ["vbf_vbn_cl", "not?", "np", "vbn_cl_np_moved"], "postprocess": nt("subj_aux_inv_cl_np_moved")},
    {"name": "subj_aux_inv_cl_np_moved", "symbols": ["do_fin", "not?", "np", "bare_inf_cl_np_moved"], "postprocess": nt("subj_aux_inv_cl_np_moved")},
    {"name": "subj_aux_inv_cl_ap_moved", "symbols": ["modal", "not?", "np", "bare_inf_cl_ap_moved"], "postprocess": nt("subj_aux_inv_cl_ap_moved")},
    {"name": "subj_aux_inv_cl_ap_moved", "symbols": ["be_fin", "not?", "np"], "postprocess": nt("subj_aux_inv_cl_ap_moved")},
    {"name": "subj_aux_inv_cl_ap_moved", "symbols": ["vbf_vbg_cl", "not?", "np", "vbg_cl_ap_moved"], "postprocess": nt("subj_aux_inv_cl_ap_moved")},
    {"name": "subj_aux_inv_cl_ap_moved", "symbols": ["vbf_vbn_cl", "not?", "np", "vbn_cl_ap_moved"], "postprocess": nt("subj_aux_inv_cl_ap_moved")},
    {"name": "subj_aux_inv_cl_ap_moved", "symbols": ["do_fin", "not?", "np", "bare_inf_cl_ap_moved"], "postprocess": nt("subj_aux_inv_cl_ap_moved")},
    {"name": "fin_vp", "symbols": ["advp?", "modal", "not?", "advp?", "bare_inf_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp?", "do_fin", "not?", "bare_inf_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp?", "vbf", "advp?"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp?", "vbf_ap", "advp?", "ap"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp?", "vbf_to_inf_cl", "advp?", "to_inf_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp?", "vbf_bare_inf_cl", "advp?", "bare_inf_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp?", "vbf_declarative_cl", "advp?", "declarative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp?", "vbf_exclamative_cl", "advp?", "exclamative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp?", "vbf_interrogative_cl", "advp?", "interrogative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["vbf_vbg_cl", "vbg_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["vbf_vbn_cl", "vbn_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp?", "vbf_np", "advp?", "np"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp?", "vbf_np_ap", "advp?", "np", "ap"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp?", "vbf_np_to_inf_cl", "advp?", "np", "to_inf_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp?", "vbf_np_bare_inf_cl", "advp?", "np", "bare_inf_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp?", "vbf_np_declarative_cl", "advp?", "np", "declarative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp?", "vbf_np_exclamative_cl", "advp?", "np", "exclamative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp?", "vbf_np_interrogative_cl", "advp?", "np", "interrogative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp?", "vbf_np_np", "advp?", "np", "np"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbf_ap", "advp?", "ap_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbf_to_inf_cl", "advp?", "to_inf_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbf_bare_inf_cl", "advp?", "bare_inf_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbf_declarative_cl", "advp?", "declarative_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["vbf_vbg_cl", "vbg_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["vbf_vbn_cl", "vbn_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbf_np", "advp?"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbf_np_ap", "advp?", "ap"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbf_np_ap", "advp?", "np", "ap_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbf_np_to_inf_cl", "advp?", "to_inf_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbf_np_to_inf_cl", "advp?", "np", "to_inf_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbf_np_bare_inf_cl", "advp?", "bare_inf_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbf_np_bare_inf_cl", "advp?", "np", "bare_inf_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbf_np_declarative_cl", "advp?", "declarative_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbf_np_declarative_cl", "advp?", "np", "declarative_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbf_np_exclamative_cl", "advp?", "exclamative_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbf_np_interrogative_cl", "advp?", "interrogative_cl"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbf_np_np", "advp?", "np"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbf_np_np", "advp?", "to", "np"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["advp?", "vbf", "advp?"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["advp?", "vbf_ap", "advp?", "ap_pp_moved"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["advp?", "vbf_to_inf_cl", "advp?", "to_inf_cl_pp_moved"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["advp?", "vbf_bare_inf_cl", "advp?", "bare_inf_cl_pp_moved"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["advp?", "vbf_declarative_cl", "advp?", "declarative_cl_pp_moved"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["vbf_vbg_cl", "vbg_cl_pp_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["vbf_vbn_cl", "vbn_cl_pp_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["advp?", "vbf_np_ap", "advp?", "np", "ap_pp_moved"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["advp?", "vbf_np_to_inf_cl", "advp?", "np", "to_inf_cl_pp_moved"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["advp?", "vbf_np_bare_inf_cl", "advp?", "np", "bare_inf_cl_pp_moved"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_pp_moved", "symbols": ["advp?", "vbf_np_declarative_cl", "advp?", "np", "declarative_cl_pp_moved"], "postprocess": nt("fin_vp_pp_moved")},
    {"name": "fin_vp_ap_moved", "symbols": ["advp?", "vbf_ap", "advp?"], "postprocess": nt("fin_vp_ap_moved")},
    {"name": "fin_vp_ap_moved", "symbols": ["advp?", "vbf_to_inf_cl", "advp?", "to_inf_cl_ap_moved"], "postprocess": nt("fin_vp_ap_moved")},
    {"name": "fin_vp_ap_moved", "symbols": ["advp?", "vbf_bare_inf_cl", "advp?", "bare_inf_cl_ap_moved"], "postprocess": nt("fin_vp_ap_moved")},
    {"name": "fin_vp_ap_moved", "symbols": ["advp?", "vbf_declarative_cl", "advp?", "declarative_cl_ap_moved"], "postprocess": nt("fin_vp_ap_moved")},
    {"name": "fin_vp_ap_moved", "symbols": ["vbf_vbg_cl", "vbg_cl_ap_moved"], "postprocess": nt("fin_vp_ap_moved")},
    {"name": "fin_vp_ap_moved", "symbols": ["vbf_vbn_cl", "vbn_cl_ap_moved"], "postprocess": nt("fin_vp_ap_moved")},
    {"name": "fin_vp_ap_moved", "symbols": ["advp?", "vbf_np_ap", "advp?", "np"], "postprocess": nt("fin_vp_ap_moved")},
    {"name": "fin_vp_ap_moved", "symbols": ["advp?", "vbf_np_to_inf_cl", "advp?", "np", "to_inf_cl_ap_moved"], "postprocess": nt("fin_vp_ap_moved")},
    {"name": "fin_vp_ap_moved", "symbols": ["advp?", "vbf_np_bare_inf_cl", "advp?", "np", "bare_inf_cl_ap_moved"], "postprocess": nt("fin_vp_ap_moved")},
    {"name": "fin_vp_ap_moved", "symbols": ["advp?", "vbf_np_declarative_cl", "advp?", "np", "declarative_cl_ap_moved"], "postprocess": nt("fin_vp_ap_moved")},
    {"name": "to_inf_cl", "symbols": ["to", "inf_vp", "adjunct_list"], "postprocess": nt("to_inf_cl")},
    {"name": "to_inf_cl_np_moved", "symbols": ["to", "inf_vp_np_moved", "adjunct_list"], "postprocess": nt("to_inf_cl_np_moved")},
    {"name": "to_inf_cl_pp_moved", "symbols": ["to", "inf_vp_pp_moved", "adjunct_list"], "postprocess": nt("to_inf_cl_pp_moved")},
    {"name": "to_inf_cl_ap_moved", "symbols": ["to", "inf_vp_ap_moved", "adjunct_list"], "postprocess": nt("to_inf_cl_ap_moved")},
    {"name": "bare_inf_cl", "symbols": ["inf_vp", "adjunct_list"], "postprocess": nt("bare_inf_cl")},
    {"name": "bare_inf_cl_np_moved", "symbols": ["inf_vp_np_moved", "adjunct_list"], "postprocess": nt("bare_inf_cl_np_moved")},
    {"name": "bare_inf_cl_pp_moved", "symbols": ["inf_vp_pp_moved", "adjunct_list"], "postprocess": nt("bare_inf_cl_pp_moved")},
    {"name": "bare_inf_cl_ap_moved", "symbols": ["inf_vp_ap_moved", "adjunct_list"], "postprocess": nt("bare_inf_cl_ap_moved")},
    {"name": "inf_vp", "symbols": ["advp?", "vb", "advp?"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_ap", "advp?", "ap"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_to_inf_cl", "advp?", "to_inf_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_bare_inf_cl", "advp?", "bare_inf_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_declarative_cl", "advp?", "declarative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_exclamative_cl", "advp?", "exclamative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_interrogative_cl", "advp?", "interrogative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["vb_vbg_cl", "vbg_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["vb_vbn_cl", "vbn_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_np", "advp?", "np"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_np_ap", "advp?", "np", "ap"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_np_to_inf_cl", "advp?", "np", "to_inf_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_np_bare_inf_cl", "advp?", "np", "bare_inf_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_np_declarative_cl", "advp?", "np", "declarative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_np_exclamative_cl", "advp?", "np", "exclamative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_np_interrogative_cl", "advp?", "np", "interrogative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_np_np", "advp?", "np", "np"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_ap", "advp?", "ap_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_to_inf_cl", "advp?", "to_inf_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_bare_inf_cl", "advp?", "bare_inf_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_declarative_cl", "advp?", "declarative_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["vb_vbg_cl", "vbg_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["vb_vbn_cl", "vbn_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_np", "advp?"], "postprocess": nt("inf_vp_np_moved")},
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
    {"name": "inf_vp_pp_moved", "symbols": ["advp?", "vb_ap", "advp?", "ap_pp_moved"], "postprocess": nt("inf_vp_pp_moved")},
    {"name": "inf_vp_pp_moved", "symbols": ["advp?", "vb_to_inf_cl", "advp?", "to_inf_cl_pp_moved"], "postprocess": nt("inf_vp_pp_moved")},
    {"name": "inf_vp_pp_moved", "symbols": ["advp?", "vb_bare_inf_cl", "advp?", "bare_inf_cl_pp_moved"], "postprocess": nt("inf_vp_pp_moved")},
    {"name": "inf_vp_pp_moved", "symbols": ["advp?", "vb_declarative_cl", "advp?", "declarative_cl_pp_moved"], "postprocess": nt("inf_vp_pp_moved")},
    {"name": "inf_vp_pp_moved", "symbols": ["advp?", "vb_np_ap", "advp?", "np", "ap_pp_moved"], "postprocess": nt("inf_vp_pp_moved")},
    {"name": "inf_vp_pp_moved", "symbols": ["advp?", "vb_np_to_inf_cl", "advp?", "np", "to_inf_cl_pp_moved"], "postprocess": nt("inf_vp_pp_moved")},
    {"name": "inf_vp_pp_moved", "symbols": ["advp?", "vb_np_bare_inf_cl", "advp?", "np", "bare_inf_cl_pp_moved"], "postprocess": nt("inf_vp_pp_moved")},
    {"name": "inf_vp_pp_moved", "symbols": ["advp?", "vb_np_declarative_cl", "advp?", "np", "declarative_cl_pp_moved"], "postprocess": nt("inf_vp_pp_moved")},
    {"name": "inf_vp_ap_moved", "symbols": ["advp?", "vb_ap", "advp?"], "postprocess": nt("inf_vp_ap_moved")},
    {"name": "inf_vp_ap_moved", "symbols": ["advp?", "vb_to_inf_cl", "advp?", "to_inf_cl_ap_moved"], "postprocess": nt("inf_vp_ap_moved")},
    {"name": "inf_vp_ap_moved", "symbols": ["advp?", "vb_bare_inf_cl", "advp?", "bare_inf_cl_ap_moved"], "postprocess": nt("inf_vp_ap_moved")},
    {"name": "inf_vp_ap_moved", "symbols": ["advp?", "vb_declarative_cl", "advp?", "declarative_cl_ap_moved"], "postprocess": nt("inf_vp_ap_moved")},
    {"name": "inf_vp_ap_moved", "symbols": ["vb_vbg_cl", "vbg_cl_ap_moved"], "postprocess": nt("inf_vp_ap_moved")},
    {"name": "inf_vp_ap_moved", "symbols": ["vb_vbn_cl", "vbn_cl_ap_moved"], "postprocess": nt("inf_vp_ap_moved")},
    {"name": "inf_vp_ap_moved", "symbols": ["advp?", "vb_np_ap", "advp?", "np"], "postprocess": nt("inf_vp_ap_moved")},
    {"name": "inf_vp_ap_moved", "symbols": ["advp?", "vb_np_to_inf_cl", "advp?", "np", "to_inf_cl_ap_moved"], "postprocess": nt("inf_vp_ap_moved")},
    {"name": "inf_vp_ap_moved", "symbols": ["advp?", "vb_np_bare_inf_cl", "advp?", "np", "bare_inf_cl_ap_moved"], "postprocess": nt("inf_vp_ap_moved")},
    {"name": "inf_vp_ap_moved", "symbols": ["advp?", "vb_np_declarative_cl", "advp?", "np", "declarative_cl_ap_moved"], "postprocess": nt("inf_vp_ap_moved")},
    {"name": "vbn_cl", "symbols": ["vbn_vp", "adjunct_list"], "postprocess": nt("vbn_cl")},
    {"name": "vbn_cl_np_moved", "symbols": ["vbn_vp_np_moved", "adjunct_list"], "postprocess": nt("vbn_cl_np_moved")},
    {"name": "vbn_cl_pp_moved", "symbols": ["vbn_vp_pp_moved", "adjunct_list"], "postprocess": nt("vbn_cl_pp_moved")},
    {"name": "vbn_cl_ap_moved", "symbols": ["vbn_vp_ap_moved", "adjunct_list"], "postprocess": nt("vbn_cl_ap_moved")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn", "advp?"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_ap", "advp?", "ap"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_to_inf_cl", "advp?", "to_inf_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_bare_inf_cl", "advp?", "bare_inf_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_declarative_cl", "advp?", "declarative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_exclamative_cl", "advp?", "exclamative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_interrogative_cl", "advp?", "interrogative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["vbn_vbg_cl", "vbg_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["vbn_vbn_cl", "vbn_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_np", "advp?", "np"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_np_ap", "advp?", "np", "ap"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_np_to_inf_cl", "advp?", "np", "to_inf_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_np_bare_inf_cl", "advp?", "np", "bare_inf_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_np_declarative_cl", "advp?", "np", "declarative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_np_exclamative_cl", "advp?", "np", "exclamative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_np_interrogative_cl", "advp?", "np", "interrogative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_np_np", "advp?", "np", "np"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_ap", "advp?", "ap_np_moved"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_to_inf_cl", "advp?", "to_inf_cl_np_moved"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_bare_inf_cl", "advp?", "bare_inf_cl_np_moved"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_declarative_cl", "advp?", "declarative_cl_np_moved"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["vbn_vbg_cl", "vbg_cl_np_moved"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["vbn_vbn_cl", "vbn_cl_np_moved"], "postprocess": nt("vbn_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_np", "advp?"], "postprocess": nt("vbn_vp_np_moved")},
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
    {"name": "vbn_vp_pp_moved", "symbols": ["advp?", "vbn_ap", "advp?", "ap_pp_moved"], "postprocess": nt("vbn_vp_pp_moved")},
    {"name": "vbn_vp_pp_moved", "symbols": ["advp?", "vbn_to_inf_cl", "advp?", "to_inf_cl_pp_moved"], "postprocess": nt("vbn_vp_pp_moved")},
    {"name": "vbn_vp_pp_moved", "symbols": ["advp?", "vbn_bare_inf_cl", "advp?", "bare_inf_cl_pp_moved"], "postprocess": nt("vbn_vp_pp_moved")},
    {"name": "vbn_vp_pp_moved", "symbols": ["advp?", "vbn_declarative_cl", "advp?", "declarative_cl_pp_moved"], "postprocess": nt("vbn_vp_pp_moved")},
    {"name": "vbn_vp_pp_moved", "symbols": ["advp?", "vbn_np_ap", "advp?", "np", "ap_pp_moved"], "postprocess": nt("vbn_vp_pp_moved")},
    {"name": "vbn_vp_pp_moved", "symbols": ["advp?", "vbn_np_to_inf_cl", "advp?", "np", "to_inf_cl_pp_moved"], "postprocess": nt("vbn_vp_pp_moved")},
    {"name": "vbn_vp_pp_moved", "symbols": ["advp?", "vbn_np_bare_inf_cl", "advp?", "np", "bare_inf_cl_pp_moved"], "postprocess": nt("vbn_vp_pp_moved")},
    {"name": "vbn_vp_pp_moved", "symbols": ["advp?", "vbn_np_declarative_cl", "advp?", "np", "declarative_cl_pp_moved"], "postprocess": nt("vbn_vp_pp_moved")},
    {"name": "vbn_vp_ap_moved", "symbols": ["advp?", "vbn_ap", "advp?"], "postprocess": nt("vbn_vp_ap_moved")},
    {"name": "vbn_vp_ap_moved", "symbols": ["advp?", "vbn_to_inf_cl", "advp?", "to_inf_cl_ap_moved"], "postprocess": nt("vbn_vp_ap_moved")},
    {"name": "vbn_vp_ap_moved", "symbols": ["advp?", "vbn_bare_inf_cl", "advp?", "bare_inf_cl_ap_moved"], "postprocess": nt("vbn_vp_ap_moved")},
    {"name": "vbn_vp_ap_moved", "symbols": ["advp?", "vbn_declarative_cl", "advp?", "declarative_cl_ap_moved"], "postprocess": nt("vbn_vp_ap_moved")},
    {"name": "vbn_vp_ap_moved", "symbols": ["vbn_vbg_cl", "vbg_cl_ap_moved"], "postprocess": nt("vbn_vp_ap_moved")},
    {"name": "vbn_vp_ap_moved", "symbols": ["vbn_vbn_cl", "vbn_cl_ap_moved"], "postprocess": nt("vbn_vp_ap_moved")},
    {"name": "vbn_vp_ap_moved", "symbols": ["advp?", "vbn_np_ap", "advp?", "np"], "postprocess": nt("vbn_vp_ap_moved")},
    {"name": "vbn_vp_ap_moved", "symbols": ["advp?", "vbn_np_to_inf_cl", "advp?", "np", "to_inf_cl_ap_moved"], "postprocess": nt("vbn_vp_ap_moved")},
    {"name": "vbn_vp_ap_moved", "symbols": ["advp?", "vbn_np_bare_inf_cl", "advp?", "np", "bare_inf_cl_ap_moved"], "postprocess": nt("vbn_vp_ap_moved")},
    {"name": "vbn_vp_ap_moved", "symbols": ["advp?", "vbn_np_declarative_cl", "advp?", "np", "declarative_cl_ap_moved"], "postprocess": nt("vbn_vp_ap_moved")},
    {"name": "vbg_cl", "symbols": ["vbg_vp", "adjunct_list"], "postprocess": nt("vbg_cl")},
    {"name": "vbg_cl_np_moved", "symbols": ["vbg_vp_np_moved", "adjunct_list"], "postprocess": nt("vbg_cl_np_moved")},
    {"name": "vbg_cl_pp_moved", "symbols": ["vbg_vp_pp_moved", "adjunct_list"], "postprocess": nt("vbg_cl_pp_moved")},
    {"name": "vbg_cl_ap_moved", "symbols": ["vbg_vp_ap_moved", "adjunct_list"], "postprocess": nt("vbg_cl_ap_moved")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg", "advp?"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_ap", "advp?", "ap"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_to_inf_cl", "advp?", "to_inf_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_bare_inf_cl", "advp?", "bare_inf_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_declarative_cl", "advp?", "declarative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_exclamative_cl", "advp?", "exclamative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_interrogative_cl", "advp?", "interrogative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["vbg_vbg_cl", "vbg_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["vbg_vbn_cl", "vbn_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_np", "advp?", "np"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_np_ap", "advp?", "np", "ap"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_np_to_inf_cl", "advp?", "np", "to_inf_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_np_bare_inf_cl", "advp?", "np", "bare_inf_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_np_declarative_cl", "advp?", "np", "declarative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_np_exclamative_cl", "advp?", "np", "exclamative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_np_interrogative_cl", "advp?", "np", "interrogative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_np_np", "advp?", "np", "np"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_ap", "advp?", "ap_np_moved"], "postprocess": nt("vbg_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_to_inf_cl", "advp?", "to_inf_cl_np_moved"], "postprocess": nt("vbg_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_bare_inf_cl", "advp?", "bare_inf_cl_np_moved"], "postprocess": nt("vbg_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_declarative_cl", "advp?", "declarative_cl_np_moved"], "postprocess": nt("vbg_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["vbg_vbg_cl", "vbg_cl_np_moved"], "postprocess": nt("vbg_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["vbg_vbn_cl", "vbn_cl_np_moved"], "postprocess": nt("vbg_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_np", "advp?"], "postprocess": nt("vbg_vp_np_moved")},
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
    {"name": "vbg_vp_pp_moved", "symbols": ["advp?", "vbg_ap", "advp?", "ap_pp_moved"], "postprocess": nt("vbg_vp_pp_moved")},
    {"name": "vbg_vp_pp_moved", "symbols": ["advp?", "vbg_to_inf_cl", "advp?", "to_inf_cl_pp_moved"], "postprocess": nt("vbg_vp_pp_moved")},
    {"name": "vbg_vp_pp_moved", "symbols": ["advp?", "vbg_bare_inf_cl", "advp?", "bare_inf_cl_pp_moved"], "postprocess": nt("vbg_vp_pp_moved")},
    {"name": "vbg_vp_pp_moved", "symbols": ["advp?", "vbg_declarative_cl", "advp?", "declarative_cl_pp_moved"], "postprocess": nt("vbg_vp_pp_moved")},
    {"name": "vbg_vp_pp_moved", "symbols": ["advp?", "vbg_np_ap", "advp?", "np", "ap_pp_moved"], "postprocess": nt("vbg_vp_pp_moved")},
    {"name": "vbg_vp_pp_moved", "symbols": ["advp?", "vbg_np_to_inf_cl", "advp?", "np", "to_inf_cl_pp_moved"], "postprocess": nt("vbg_vp_pp_moved")},
    {"name": "vbg_vp_pp_moved", "symbols": ["advp?", "vbg_np_bare_inf_cl", "advp?", "np", "bare_inf_cl_pp_moved"], "postprocess": nt("vbg_vp_pp_moved")},
    {"name": "vbg_vp_pp_moved", "symbols": ["advp?", "vbg_np_declarative_cl", "advp?", "np", "declarative_cl_pp_moved"], "postprocess": nt("vbg_vp_pp_moved")},
    {"name": "vbg_vp_ap_moved", "symbols": ["advp?", "vbg_ap", "advp?"], "postprocess": nt("vbg_vp_ap_moved")},
    {"name": "vbg_vp_ap_moved", "symbols": ["advp?", "vbg_to_inf_cl", "advp?", "to_inf_cl_ap_moved"], "postprocess": nt("vbg_vp_ap_moved")},
    {"name": "vbg_vp_ap_moved", "symbols": ["advp?", "vbg_bare_inf_cl", "advp?", "bare_inf_cl_ap_moved"], "postprocess": nt("vbg_vp_ap_moved")},
    {"name": "vbg_vp_ap_moved", "symbols": ["advp?", "vbg_declarative_cl", "advp?", "declarative_cl_ap_moved"], "postprocess": nt("vbg_vp_ap_moved")},
    {"name": "vbg_vp_ap_moved", "symbols": ["vbg_vbg_cl", "vbg_cl_ap_moved"], "postprocess": nt("vbg_vp_ap_moved")},
    {"name": "vbg_vp_ap_moved", "symbols": ["vbg_vbn_cl", "vbn_cl_ap_moved"], "postprocess": nt("vbg_vp_ap_moved")},
    {"name": "vbg_vp_ap_moved", "symbols": ["advp?", "vbg_np_ap", "advp?", "np"], "postprocess": nt("vbg_vp_ap_moved")},
    {"name": "vbg_vp_ap_moved", "symbols": ["advp?", "vbg_np_to_inf_cl", "advp?", "np", "to_inf_cl_ap_moved"], "postprocess": nt("vbg_vp_ap_moved")},
    {"name": "vbg_vp_ap_moved", "symbols": ["advp?", "vbg_np_bare_inf_cl", "advp?", "np", "bare_inf_cl_ap_moved"], "postprocess": nt("vbg_vp_ap_moved")},
    {"name": "vbg_vp_ap_moved", "symbols": ["advp?", "vbg_np_declarative_cl", "advp?", "np", "declarative_cl_ap_moved"], "postprocess": nt("vbg_vp_ap_moved")},
    {"name": "declarative_cl", "symbols": ["that", "fin_cl"], "postprocess": nt("declarative_cl")},
    {"name": "exclamative_cl", "symbols": ["how", "advp", "fin_cl"], "postprocess": nt("exclamative_cl")},
    {"name": "exclamative_cl", "symbols": ["how", "ap", "np", "fin_vp_ap_moved"], "postprocess": nt("exclamative_cl")},
    {"name": "interrogative_cl", "symbols": ["wh_np", "np", "fin_vp_np_moved", "adjunct_list"], "postprocess": nt("interrogative_cl")},
    {"name": "interrogative_cl", "symbols": ["wh_np", "fin_vp", "adjunct_list"], "postprocess": nt("interrogative_cl")},
    {"name": "interrogative_cl", "symbols": ["wh_pp", "np", "fin_vp_pp_moved", "adjunct_list"], "postprocess": nt("interrogative_cl")},
    {"name": "interrogative_cl", "symbols": ["wh_pp", "np", "fin_vp", "adjunct_list"], "postprocess": nt("interrogative_cl")},
    {"name": "interrogative_cl", "symbols": ["wh_np", "np", "fin_vp", "preposition", "adjunct_list"], "postprocess": nt("interrogative_cl")},
    {"name": "interrogative_cl", "symbols": ["interrogative_subordinator", "np", "fin_vp", "adjunct_list"], "postprocess": nt("interrogative_cl")},
    {"name": "declarative_cl_np_moved", "symbols": ["that", "fin_vp", "adjunct_list"], "postprocess": nt("declarative_cl_np_moved")},
    {"name": "declarative_cl_np_moved", "symbols": ["that", "np", "fin_vp_np_moved", "adjunct_list"], "postprocess": nt("declarative_cl_np_moved")},
    {"name": "declarative_cl_np_moved", "symbols": ["that", "np", "fin_vp", "preposition", "adjunct_list"], "postprocess": nt("declarative_cl_np_moved")},
    {"name": "declarative_cl_pp_moved", "symbols": ["that", "np", "fin_vp_pp_moved", "adjunct_list"], "postprocess": nt("declarative_cl_pp_moved")},
    {"name": "declarative_cl_pp_moved", "symbols": ["that", "np", "fin_vp", "adjunct_list"], "postprocess": nt("declarative_cl_pp_moved")},
    {"name": "declarative_cl_ap_moved", "symbols": ["that", "np", "fin_vp_ap_moved", "adjunct_list"], "postprocess": nt("declarative_cl_ap_moved")},
    {"name": "declarative_cl_ap_moved", "symbols": ["that", "np", "fin_vp", "adjunct_list"], "postprocess": nt("declarative_cl_ap_moved")},
    {"name": "np", "symbols": ["precorenp_modifier_list", "core_np", "postcorenp_modifier_list"], "postprocess": nt("np")},
    {"name": "precorenp_modifier_list$ebnf$1", "symbols": []},
    {"name": "precorenp_modifier_list$ebnf$1", "symbols": ["precorenp_modifier_list$ebnf$1", "precorenp_modifier"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "precorenp_modifier_list", "symbols": ["precorenp_modifier_list$ebnf$1"], "postprocess": nonterminal_unpack("precorenp_modifier_list")},
    {"name": "postcorenp_modifier_list$ebnf$1", "symbols": []},
    {"name": "postcorenp_modifier_list$ebnf$1", "symbols": ["postcorenp_modifier_list$ebnf$1", "postcorenp_modifier"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
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
    {"name": "adjunct_list$ebnf$1", "symbols": []},
    {"name": "adjunct_list$ebnf$1", "symbols": ["adjunct_list$ebnf$1", "adjunct"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "adjunct_list", "symbols": ["adjunct_list$ebnf$1"], "postprocess": nonterminal_unpack("adjunct_list")},
    {"name": "adjunct", "symbols": ["pp"], "postprocess": nt("adjunct")},
    {"name": "adjunct", "symbols": ["advp"], "postprocess": nt("adjunct")},
    {"name": "pp", "symbols": ["preposition", "np"], "postprocess": nt("pp")},
    {"name": "wh_pp", "symbols": ["preposition", "wh_np"], "postprocess": nt("wh_pp")},
    {"name": "ap", "symbols": ["advp", "ap"], "postprocess": nt("ap")},
    {"name": "ap", "symbols": ["adj"], "postprocess": nt("ap")},
    {"name": "ap", "symbols": ["adj_pp", "pp"], "postprocess": nt("ap")},
    {"name": "ap", "symbols": ["adj_declarative_cl", "declarative_cl"], "postprocess": nt("ap")},
    {"name": "ap", "symbols": ["adj_to_inf_cl", "to_inf_cl"], "postprocess": nt("ap")},
    {"name": "ap_pp_moved", "symbols": ["advp", "ap_pp_moved"], "postprocess": nt("ap_pp_moved")},
    {"name": "ap_pp_moved", "symbols": ["adj_pp"], "postprocess": nt("ap_pp_moved")},
    {"name": "ap_pp_moved", "symbols": ["adj_declarative_cl", "declarative_cl_pp_moved"], "postprocess": nt("ap_pp_moved")},
    {"name": "ap_pp_moved", "symbols": ["adj_to_inf_cl", "to_inf_cl_pp_moved"], "postprocess": nt("ap_pp_moved")},
    {"name": "ap_np_moved", "symbols": ["advp", "ap_np_moved"], "postprocess": nt("ap_np_moved")},
    {"name": "ap_np_moved", "symbols": ["adj_pp", "preposition"], "postprocess": nt("ap_np_moved")},
    {"name": "ap_np_moved", "symbols": ["adj_declarative_cl", "declarative_cl_np_moved"], "postprocess": nt("ap_np_moved")},
    {"name": "ap_np_moved", "symbols": ["adj_to_inf_cl", "to_inf_cl_np_moved"], "postprocess": nt("ap_np_moved")},
    {"name": "ap_list$ebnf$1", "symbols": []},
    {"name": "ap_list$ebnf$1", "symbols": ["ap_list$ebnf$1", "ap"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ap_list", "symbols": ["ap_list$ebnf$1"], "postprocess": nonterminal_unpack("ap_list")},
    {"name": "advp", "symbols": ["adv"], "postprocess": nt("advp")},
    {"name": "advp", "symbols": ["adv", "advp"], "postprocess": nt("advp")},
    {"name": "advp?", "symbols": ["advp"], "postprocess": nt("advp?")},
    {"name": "advp?", "symbols": [], "postprocess": nt("advp?")},
    {"name": "not?", "symbols": ["not"], "postprocess": nt("not?")},
    {"name": "not?", "symbols": [], "postprocess": nt("not?")},
    {"name": "det", "symbols": [det], "postprocess": t("det")},
    {"name": "pronoun", "symbols": [pronoun], "postprocess": t("pronoun")},
    {"name": "pronoun_pos", "symbols": [pronoun_pos], "postprocess": t("pronoun_pos")},
    {"name": "proper_noun", "symbols": [proper_noun], "postprocess": t("proper_noun")},
    {"name": "uncountable_noun", "symbols": [uncountable_noun], "postprocess": t("uncountable_noun")},
    {"name": "noun", "symbols": [noun], "postprocess": t("noun")},
    {"name": "preposition", "symbols": [preposition], "postprocess": t("preposition")},
    {"name": "to", "symbols": [to], "postprocess": t("to")},
    {"name": "s", "symbols": [s], "postprocess": t("s")},
    {"name": "not", "symbols": [not], "postprocess": t("not")},
    {"name": "that", "symbols": [that], "postprocess": t("that")},
    {"name": "interrogative_subordinator", "symbols": [interrogative_subordinator], "postprocess": t("interrogative_subordinator")},
    {"name": "modal", "symbols": [modal], "postprocess": t("modal")},
    {"name": "vb", "symbols": [vb], "postprocess": t("vb")},
    {"name": "vb_ap", "symbols": [vb_ap], "postprocess": t("vb_ap")},
    {"name": "vb_to_inf_cl", "symbols": [vb_to_inf_cl], "postprocess": t("vb_to_inf_cl")},
    {"name": "vb_bare_inf_cl", "symbols": [vb_bare_inf_cl], "postprocess": t("vb_bare_inf_cl")},
    {"name": "vb_declarative_cl", "symbols": [vb_declarative_cl], "postprocess": t("vb_declarative_cl")},
    {"name": "vb_exclamative_cl", "symbols": [vb_exclamative_cl], "postprocess": t("vb_exclamative_cl")},
    {"name": "vb_interrogative_cl", "symbols": [vb_interrogative_cl], "postprocess": t("vb_interrogative_cl")},
    {"name": "vb_vbg_cl", "symbols": [vb_vbg_cl], "postprocess": t("vb_vbg_cl")},
    {"name": "vb_vbn_cl", "symbols": [vb_vbn_cl], "postprocess": t("vb_vbn_cl")},
    {"name": "vb_np", "symbols": [vb_np], "postprocess": t("vb_np")},
    {"name": "vb_np_ap", "symbols": [vb_np_ap], "postprocess": t("vb_np_ap")},
    {"name": "vb_np_to_inf_cl", "symbols": [vb_np_to_inf_cl], "postprocess": t("vb_np_to_inf_cl")},
    {"name": "vb_np_bare_inf_cl", "symbols": [vb_np_bare_inf_cl], "postprocess": t("vb_np_bare_inf_cl")},
    {"name": "vb_np_declarative_cl", "symbols": [vb_np_declarative_cl], "postprocess": t("vb_np_declarative_cl")},
    {"name": "vb_np_exclamative_cl", "symbols": [vb_np_exclamative_cl], "postprocess": t("vb_np_exclamative_cl")},
    {"name": "vb_np_interrogative_cl", "symbols": [vb_np_interrogative_cl], "postprocess": t("vb_np_interrogative_cl")},
    {"name": "vb_np_np", "symbols": [vb_np_np], "postprocess": t("vb_np_np")},
    {"name": "vbg", "symbols": [vbg], "postprocess": t("vbg")},
    {"name": "vbg_ap", "symbols": [vbg_ap], "postprocess": t("vbg_ap")},
    {"name": "vbg_to_inf_cl", "symbols": [vbg_to_inf_cl], "postprocess": t("vbg_to_inf_cl")},
    {"name": "vbg_bare_inf_cl", "symbols": [vbg_bare_inf_cl], "postprocess": t("vbg_bare_inf_cl")},
    {"name": "vbg_declarative_cl", "symbols": [vbg_declarative_cl], "postprocess": t("vbg_declarative_cl")},
    {"name": "vbg_exclamative_cl", "symbols": [vbg_exclamative_cl], "postprocess": t("vbg_exclamative_cl")},
    {"name": "vbg_interrogative_cl", "symbols": [vbg_interrogative_cl], "postprocess": t("vbg_interrogative_cl")},
    {"name": "vbg_vbg_cl", "symbols": [vbg_vbg_cl], "postprocess": t("vbg_vbg_cl")},
    {"name": "vbg_vbn_cl", "symbols": [vbg_vbn_cl], "postprocess": t("vbg_vbn_cl")},
    {"name": "vbg_np", "symbols": [vbg_np], "postprocess": t("vbg_np")},
    {"name": "vbg_np_ap", "symbols": [vbg_np_ap], "postprocess": t("vbg_np_ap")},
    {"name": "vbg_np_to_inf_cl", "symbols": [vbg_np_to_inf_cl], "postprocess": t("vbg_np_to_inf_cl")},
    {"name": "vbg_np_bare_inf_cl", "symbols": [vbg_np_bare_inf_cl], "postprocess": t("vbg_np_bare_inf_cl")},
    {"name": "vbg_np_declarative_cl", "symbols": [vbg_np_declarative_cl], "postprocess": t("vbg_np_declarative_cl")},
    {"name": "vbg_np_exclamative_cl", "symbols": [vbg_np_exclamative_cl], "postprocess": t("vbg_np_exclamative_cl")},
    {"name": "vbg_np_interrogative_cl", "symbols": [vbg_np_interrogative_cl], "postprocess": t("vbg_np_interrogative_cl")},
    {"name": "vbg_np_np", "symbols": [vbg_np_np], "postprocess": t("vbg_np_np")},
    {"name": "vbn", "symbols": [vbn], "postprocess": t("vbn")},
    {"name": "vbn_ap", "symbols": [vbn_ap], "postprocess": t("vbn_ap")},
    {"name": "vbn_to_inf_cl", "symbols": [vbn_to_inf_cl], "postprocess": t("vbn_to_inf_cl")},
    {"name": "vbn_bare_inf_cl", "symbols": [vbn_bare_inf_cl], "postprocess": t("vbn_bare_inf_cl")},
    {"name": "vbn_declarative_cl", "symbols": [vbn_declarative_cl], "postprocess": t("vbn_declarative_cl")},
    {"name": "vbn_exclamative_cl", "symbols": [vbn_exclamative_cl], "postprocess": t("vbn_exclamative_cl")},
    {"name": "vbn_interrogative_cl", "symbols": [vbn_interrogative_cl], "postprocess": t("vbn_interrogative_cl")},
    {"name": "vbn_vbg_cl", "symbols": [vbn_vbg_cl], "postprocess": t("vbn_vbg_cl")},
    {"name": "vbn_vbn_cl", "symbols": [vbn_vbn_cl], "postprocess": t("vbn_vbn_cl")},
    {"name": "vbn_np", "symbols": [vbn_np], "postprocess": t("vbn_np")},
    {"name": "vbn_np_ap", "symbols": [vbn_np_ap], "postprocess": t("vbn_np_ap")},
    {"name": "vbn_np_to_inf_cl", "symbols": [vbn_np_to_inf_cl], "postprocess": t("vbn_np_to_inf_cl")},
    {"name": "vbn_np_bare_inf_cl", "symbols": [vbn_np_bare_inf_cl], "postprocess": t("vbn_np_bare_inf_cl")},
    {"name": "vbn_np_declarative_cl", "symbols": [vbn_np_declarative_cl], "postprocess": t("vbn_np_declarative_cl")},
    {"name": "vbn_np_exclamative_cl", "symbols": [vbn_np_exclamative_cl], "postprocess": t("vbn_np_exclamative_cl")},
    {"name": "vbn_np_interrogative_cl", "symbols": [vbn_np_interrogative_cl], "postprocess": t("vbn_np_interrogative_cl")},
    {"name": "vbn_np_np", "symbols": [vbn_np_np], "postprocess": t("vbn_np_np")},
    {"name": "vbf", "symbols": [vbf], "postprocess": t("vbf")},
    {"name": "vbf_ap", "symbols": [vbf_ap], "postprocess": t("vbf_ap")},
    {"name": "vbf_to_inf_cl", "symbols": [vbf_to_inf_cl], "postprocess": t("vbf_to_inf_cl")},
    {"name": "vbf_bare_inf_cl", "symbols": [vbf_bare_inf_cl], "postprocess": t("vbf_bare_inf_cl")},
    {"name": "vbf_declarative_cl", "symbols": [vbf_declarative_cl], "postprocess": t("vbf_declarative_cl")},
    {"name": "vbf_exclamative_cl", "symbols": [vbf_exclamative_cl], "postprocess": t("vbf_exclamative_cl")},
    {"name": "vbf_interrogative_cl", "symbols": [vbf_interrogative_cl], "postprocess": t("vbf_interrogative_cl")},
    {"name": "vbf_vbg_cl", "symbols": [vbf_vbg_cl], "postprocess": t("vbf_vbg_cl")},
    {"name": "vbf_vbn_cl", "symbols": [vbf_vbn_cl], "postprocess": t("vbf_vbn_cl")},
    {"name": "vbf_np", "symbols": [vbf_np], "postprocess": t("vbf_np")},
    {"name": "vbf_np_ap", "symbols": [vbf_np_ap], "postprocess": t("vbf_np_ap")},
    {"name": "vbf_np_to_inf_cl", "symbols": [vbf_np_to_inf_cl], "postprocess": t("vbf_np_to_inf_cl")},
    {"name": "vbf_np_bare_inf_cl", "symbols": [vbf_np_bare_inf_cl], "postprocess": t("vbf_np_bare_inf_cl")},
    {"name": "vbf_np_declarative_cl", "symbols": [vbf_np_declarative_cl], "postprocess": t("vbf_np_declarative_cl")},
    {"name": "vbf_np_exclamative_cl", "symbols": [vbf_np_exclamative_cl], "postprocess": t("vbf_np_exclamative_cl")},
    {"name": "vbf_np_interrogative_cl", "symbols": [vbf_np_interrogative_cl], "postprocess": t("vbf_np_interrogative_cl")},
    {"name": "vbf_np_np", "symbols": [vbf_np_np], "postprocess": t("vbf_np_np")},
    {"name": "adj", "symbols": [adj], "postprocess": t("adj")},
    {"name": "adj_pp", "symbols": [adj_pp], "postprocess": t("adj_pp")},
    {"name": "adj_declarative_cl", "symbols": [adj_declarative_cl], "postprocess": t("adj_declarative_cl")},
    {"name": "adj_to_inf_cl", "symbols": [adj_to_inf_cl], "postprocess": t("adj_to_inf_cl")},
    {"name": "adv", "symbols": [adv], "postprocess": t("adv")},
    {"name": "wh", "symbols": [wh], "postprocess": t("wh")},
    {"name": "why", "symbols": [why], "postprocess": t("why")},
    {"name": "how", "symbols": [how], "postprocess": t("how")},
    {"name": "precorenp_modifier", "symbols": [precorenp_modifier], "postprocess": t("precorenp_modifier")},
    {"name": "postcorenp_modifier", "symbols": [postcorenp_modifier], "postprocess": t("postcorenp_modifier")},
    {"name": "be_fin", "symbols": [be_fin], "postprocess": t("is_fin")},
    {"name": "do_fin", "symbols": [do_fin], "postprocess": t("do_fin")},
    {"name": "period", "symbols": [period], "postprocess": t("period")},
    {"name": "question_mark", "symbols": [question_mark], "postprocess": t("question_mark")},
    {"name": "exclamation_mark", "symbols": [exclamation_mark], "postprocess": t("exclamation_mark")}
];
let ParserStart = "text";
export default { Lexer, ParserRules, ParserStart };

// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
function id(x) { return x[0]; }

import english from './english.json';

function isPoS(pos) {
  return {test: word => english[word]?.includes(pos)}
}

function isAnyOfPoS(pos_arr) {
  return {test: word => pos_arr.some(pos => english[word]?.includes(pos))}
}

// parts of speech
const determinative = isPoS("determinative");
const pronoun = isPoS("pronoun");
const independent_genitive_pronoun = isPoS("independent_genitive_pronoun");
const dependent_genitive_pronoun = isPoS("dependent_genitive_pronoun");
const proper_noun = isPoS("proper_noun");
const noun = isPoS("noun");
const preposition = isPoS("preposition");

// particles
const to = isPoS("to");
const s = isPoS("s");
const not = isPoS("not");
const that = isPoS("that");
const interrogative_subordinator = isPoS("interrogative_subordinator");
const how = isPoS("how");
const why = isPoS("why");
const which = isPoS("which");

// punctuation
const period = {test: x => x == "." };
const question_mark = { test: x => x == "?" };
const exclamation_mark = { test: x => x == "!" };

// verbs

// Modal (MODAL)
const modal = isPoS("modal");

// Base Verb (VB)
const vb = isPoS("vb");
const vb_ap = isPoS("vb_ap");
const vb_to_inf_cl = isPoS("vb_to_inf_cl");
const vb_bare_inf_cl = isPoS("vb_bare_inf_cl");
const vb_that_declarative_cl = isPoS("vb_that_declarative_cl");
const vb_bare_declarative_cl = isPoS("vb_bare_declarative_cl");
const vb_exclamative_cl = isPoS("vb_exclamative_cl");
const vb_interrogative_cl = isPoS("vb_interrogative_cl");
const vb_vbg_cl = isPoS("vb_vbg_cl");
const vb_vbn_cl = isPoS("vb_vbn_cl");
const vb_np = isPoS("vb_np");
const vb_np_ap = isPoS("vb_np_ap");
const vb_np_to_inf_cl = isPoS("vb_np_to_inf_cl");
const vb_np_bare_inf_cl = isPoS("vb_np_bare_inf_cl");
const vb_np_that_declarative_cl = isPoS("vb_np_that_declarative_cl");
const vb_np_bare_declarative_cl = isPoS("vb_np_bare_declarative_cl");
const vb_np_exclamative_cl = isPoS("vb_np_exclamative_cl");
const vb_np_interrogative_cl = isPoS("vb_np_interrogative_cl");
const vb_np_np = isPoS("vb_np_np");

// Verb Gerund or Present Participle (VBG)
const vbg = isPoS("vbg");
const vbg_ap = isPoS("vbg_ap");
const vbg_to_inf_cl = isPoS("vbg_to_inf_cl");
const vbg_bare_inf_cl = isPoS("vbg_bare_inf_cl");
const vbg_that_declarative_cl = isPoS("vbg_that_declarative_cl");
const vbg_bare_declarative_cl = isPoS("vbg_bare_declarative_cl");
const vbg_exclamative_cl = isPoS("vbg_exclamative_cl");
const vbg_interrogative_cl = isPoS("vbg_interrogative_cl");
const vbg_vbg_cl = isPoS("vbg_vbg_cl");
const vbg_vbn_cl = isPoS("vbg_vbn_cl");
const vbg_np = isPoS("vbg_np");
const vbg_np_ap = isPoS("vbg_np_ap");
const vbg_np_to_inf_cl = isPoS("vbg_np_to_inf_cl");
const vbg_np_bare_inf_cl = isPoS("vbg_np_bare_inf_cl");
const vbg_np_that_declarative_cl = isPoS("vbg_np_that_declarative_cl");
const vbg_np_bare_declarative_cl = isPoS("vbg_np_bare_declarative_cl");
const vbg_np_exclamative_cl = isPoS("vbg_np_exclamative_cl");
const vbg_np_interrogative_cl = isPoS("vbg_np_interrogative_cl");
const vbg_np_np = isPoS("vbg_np_np");

// Verb Past Participle (VBN)
const vbn = isPoS("vbn");
const vbn_ap = isPoS("vbn_ap");
const vbn_to_inf_cl = isPoS("vbn_to_inf_cl");
const vbn_bare_inf_cl = isPoS("vbn_bare_inf_cl");
const vbn_that_declarative_cl = isPoS("vbn_that_declarative_cl");
const vbn_bare_declarative_cl = isPoS("vbn_bare_declarative_cl");
const vbn_exclamative_cl = isPoS("vbn_exclamative_cl");
const vbn_interrogative_cl = isPoS("vbn_interrogative_cl");
const vbn_vbg_cl = isPoS("vbn_vbg_cl");
const vbn_vbn_cl = isPoS("vbn_vbn_cl");
const vbn_np = isPoS("vbn_np");
const vbn_np_ap = isPoS("vbn_np_ap");
const vbn_np_to_inf_cl = isPoS("vbn_np_to_inf_cl");
const vbn_np_bare_inf_cl = isPoS("vbn_np_bare_inf_cl");
const vbn_np_that_declarative_cl = isPoS("vbn_np_that_declarative_cl");
const vbn_np_bare_declarative_cl = isPoS("vbn_np_bare_declarative_cl");
const vbn_np_exclamative_cl = isPoS("vbn_np_exclamative_cl");
const vbn_np_interrogative_cl = isPoS("vbn_np_interrogative_cl");
const vbn_np_np = isPoS("vbn_np_np");

// Verb Finite (VBF): supercategory for the following
const vbf = isAnyOfPoS(["vbd","vbp","vbz"]);
const vbf_ap = isAnyOfPoS(["vbd_ap","vbp_ap","vbz_ap"]);
const vbf_to_inf_cl = isAnyOfPoS(["vbd_to_inf_cl","vbp_to_inf_cl","vbz_to_inf_cl"]);
const vbf_bare_inf_cl = isAnyOfPoS(["vbd_bare_inf_cl","vbp_bare_inf_cl","vbz_bare_inf_cl"]);
const vbf_that_declarative_cl = isAnyOfPoS(["vbd_that_declarative_cl","vbp_that_declarative_cl","vbz_that_declarative_cl"]);
const vbf_bare_declarative_cl = isAnyOfPoS(["vbd_bare_declarative_cl","vbp_bare_declarative_cl","vbz_bare_declarative_cl"]);
const vbf_exclamative_cl = isAnyOfPoS(["vbd_exclamative_cl","vbp_exclamative_cl","vbz_exclamative_cl"]);
const vbf_interrogative_cl = isAnyOfPoS(["vbd_interrogative_cl","vbp_interrogative_cl","vbz_interrogative_cl"]);
const vbf_vbg_cl = isAnyOfPoS(["vbd_vbg_cl","vbp_vbg_cl","vbz_vbg_cl"]);
const vbf_vbn_cl = isAnyOfPoS(["vbd_vbn_cl","vbp_vbn_cl","vbz_vbn_cl"]);
const vbf_np = isAnyOfPoS(["vbd_np","vbp_np","vbz_np"]);
const vbf_np_ap = isAnyOfPoS(["vbd_np_ap","vbp_np_ap","vbz_np_ap"]);
const vbf_np_to_inf_cl = isAnyOfPoS(["vbd_np_to_inf_cl","vbp_np_to_inf_cl","vbz_np_to_inf_cl"]);
const vbf_np_bare_inf_cl = isAnyOfPoS(["vbd_np_bare_inf_cl","vbp_np_bare_inf_cl","vbz_np_bare_inf_cl"]);
const vbf_np_that_declarative_cl = isAnyOfPoS(["vbd_np_that_declarative_cl","vbp_np_that_declarative_cl","vbz_np_that_declarative_cl"]);
const vbf_np_bare_declarative_cl = isAnyOfPoS(["vbd_np_bare_declarative_cl","vbp_np_bare_declarative_cl","vbz_np_bare_declarative_cl"]);
const vbf_np_exclamative_cl = isAnyOfPoS(["vbd_np_exclamative_cl","vbp_np_exclamative_cl","vbz_np_exclamative_cl"]);
const vbf_np_interrogative_cl = isAnyOfPoS(["vbd_np_interrogative_cl","vbp_np_interrogative_cl","vbz_np_interrogative_cl"]);
const vbf_np_np = isAnyOfPoS(["vbd_np_np","vbp_np_np","vbz_np_np"]);

// certain core verbs
const be_fin = isAnyOfPoS(["is","are","were"]);
const do_fin = isAnyOfPoS(["do","does","did"]);

// certain nouns with special treatment
const times = isPos("times");
const cardinal_number_eng = isPos("cardinal_number_eng");
const digits = { test: word => !isNaN(word) };
const fraction_denominator = isPos("fraction_denominator");

// adjectives
const adj = isPoS("adj");
const adj_pp = isPoS("adj_pp");
const adj_that_declarative_cl = isPoS("adj_that_declarative_cl");
const adj_bare_declarative_cl = isPoS("adj_bare_declarative_cl");
const adj_to_inf_cl = isPoS("adj_to_inf_cl");

// adverbs
const adv = isPoS("adv");
const precorenp_modifier = isPoS("precorenp_modifier");
const postcorenp_modifier = isPoS("postcorenp_modifier");
const quantificational_modifier = isPoS("quantificational_modifier");
const precore_emphatic_modifier = isPoS("precore_emphatic_modifier");
const precore_emphatic_modifier_adj = isPoS("precore_emphatic_modifier_adj");

// wh-words (that replace nouns)
const wh = isPoS("wh");

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
    {"name": "fin_cl", "symbols": ["adjunct_list", "np", "fin_vp"], "postprocess": nt("fin_cl")},
    {"name": "question_cl", "symbols": ["subj_aux_inv_cl"], "postprocess": nt("question_cl")},
    {"name": "question_cl", "symbols": ["wh", "fin_vp"], "postprocess": nt("question_cl")},
    {"name": "question_cl", "symbols": ["wh", "subj_aux_inv_cl_np_moved"], "postprocess": nt("question_cl")},
    {"name": "question_cl", "symbols": ["why", "subj_aux_inv_cl"], "postprocess": nt("question_cl")},
    {"name": "question_cl", "symbols": ["how", "advp?", "subj_aux_inv_cl"], "postprocess": nt("question_cl")},
    {"name": "question_cl", "symbols": ["how", "subj_aux_inv_cl_ap_moved"], "postprocess": nt("question_cl")},
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
    {"name": "adjunct_list$ebnf$1", "symbols": []},
    {"name": "adjunct_list$ebnf$1", "symbols": ["adjunct_list$ebnf$1", "adjunct"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "adjunct_list", "symbols": ["adjunct_list$ebnf$1"], "postprocess": nonterminal_unpack("adjunct_list")},
    {"name": "adjunct_list_ap", "symbols": ["adjunct", "adjunct_list_ap"], "postprocess": nt("adjunct_list_ap")},
    {"name": "adjunct_list_ap", "symbols": ["ap", "adjunct_list"], "postprocess": nt("adjunct_list_ap")},
    {"name": "adjunct_list_to_inf_cl", "symbols": ["adjunct", "adjunct_list_to_inf_cl"], "postprocess": nt("adjunct_list_to_inf_cl")},
    {"name": "adjunct_list_to_inf_cl", "symbols": ["to_inf_cl", "adjunct_list"], "postprocess": nt("adjunct_list_to_inf_cl")},
    {"name": "adjunct_list_bare_inf_cl", "symbols": ["bare_inf_cl", "adjunct_list"], "postprocess": nt("adjunct_list_bare_inf_cl")},
    {"name": "adjunct_list_that_declarative_cl", "symbols": ["adjunct", "adjunct_list_that_declarative_cl"], "postprocess": nt("adjunct_list_that_declarative_cl")},
    {"name": "adjunct_list_that_declarative_cl", "symbols": ["that_declarative_cl", "adjunct_list"], "postprocess": nt("adjunct_list_that_declarative_cl")},
    {"name": "adjunct_list_bare_declarative_cl", "symbols": ["adjunct", "adjunct_list_bare_declarative_cl"], "postprocess": nt("adjunct_list_bare_declarative_cl")},
    {"name": "adjunct_list_bare_declarative_cl", "symbols": ["bare_declarative_cl", "adjunct_list"], "postprocess": nt("adjunct_list_bare_declarative_cl")},
    {"name": "adjunct_list_exclamative_cl", "symbols": ["adjunct", "adjunct_list_exclamative_cl"], "postprocess": nt("adjunct_list_exclamative_cl")},
    {"name": "adjunct_list_exclamative_cl", "symbols": ["exclamative_cl", "adjunct_list"], "postprocess": nt("adjunct_list_exclamative_cl")},
    {"name": "adjunct_list_interrogative_cl", "symbols": ["adjunct", "adjunct_list_interrogative_cl"], "postprocess": nt("adjunct_list_interrogative_cl")},
    {"name": "adjunct_list_interrogative_cl", "symbols": ["interrogative_cl", "adjunct_list"], "postprocess": nt("adjunct_list_interrogative_cl")},
    {"name": "adjunct_list_np", "symbols": ["adjunct", "adjunct_list_np"], "postprocess": nt("adjunct_list_np")},
    {"name": "adjunct_list_np", "symbols": ["np", "adjunct_list"], "postprocess": nt("adjunct_list_np")},
    {"name": "adjunct_list_np_ap", "symbols": ["adjunct", "adjunct_list_np_ap"], "postprocess": nt("adjunct_list_np_ap")},
    {"name": "adjunct_list_np_ap", "symbols": ["np", "adjunct_list_ap"], "postprocess": nt("adjunct_list_np_ap")},
    {"name": "adjunct_list_np_ap", "symbols": ["ap", "adjunct_list_np"], "postprocess": nt("adjunct_list_np_ap")},
    {"name": "adjunct_list_np_to_inf_cl", "symbols": ["adjunct", "adjunct_list_np_to_inf_cl"], "postprocess": nt("adjunct_list_np_ap")},
    {"name": "adjunct_list_np_to_inf_cl", "symbols": ["np", "adjunct_list_to_inf_cl"], "postprocess": nt("adjunct_list_np_ap")},
    {"name": "adjunct_list_np_bare_inf_cl", "symbols": ["adjunct", "adjunct_list_np_bare_inf_cl"], "postprocess": nt("adjunct_list_np_ap")},
    {"name": "adjunct_list_np_bare_inf_cl", "symbols": ["np", "adjunct_list_bare_inf_cl"], "postprocess": nt("adjunct_list_np_ap")},
    {"name": "adjunct_list_np_that_declarative_cl", "symbols": ["adjunct", "adjunct_list_np_that_declarative_cl"], "postprocess": nt("adjunct_list_np_that_declarative_cl")},
    {"name": "adjunct_list_np_that_declarative_cl", "symbols": ["np", "adjunct_list_that_declarative_cl"], "postprocess": nt("adjunct_list_np_that_declarative_cl")},
    {"name": "adjunct_list_np_bare_declarative_cl", "symbols": ["adjunct", "adjunct_list_np_bare_declarative_cl"], "postprocess": nt("adjunct_list_np_bare_declarative_cl")},
    {"name": "adjunct_list_np_bare_declarative_cl", "symbols": ["np", "adjunct_list_bare_declarative_cl"], "postprocess": nt("adjunct_list_np_bare_declarative_cl")},
    {"name": "adjunct_list_np_exclamative_cl", "symbols": ["adjunct", "adjunct_list_np_exclamative_cl"], "postprocess": nt("adjunct_list_np_exclamative_cl")},
    {"name": "adjunct_list_np_exclamative_cl", "symbols": ["np", "adjunct_list_exclamative_cl"], "postprocess": nt("adjunct_list_np_exclamative_cl")},
    {"name": "adjunct_list_np_interrogative_cl", "symbols": ["adjunct", "adjunct_list_np_interrogative_cl"], "postprocess": nt("adjunct_list_np_interrogative_cl")},
    {"name": "adjunct_list_np_interrogative_cl", "symbols": ["np", "adjunct_list_interrogative_cl"], "postprocess": nt("adjunct_list_np_interrogative_cl")},
    {"name": "adjunct_list_np_np", "symbols": ["adjunct", "adjunct_list_np_np"], "postprocess": nt("adjunct_list_np_np")},
    {"name": "adjunct_list_np_np", "symbols": ["np", "adjunct_list_np"], "postprocess": nt("adjunct_list_np_np")},
    {"name": "adjunct_list_np_np", "symbols": ["to", "np", "adjunct_list_np"], "postprocess": nt("adjunct_list_np_np")},
    {"name": "fin_vp", "symbols": ["advp?", "modal", "not?", "bare_inf_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp?", "vbf", "not?", "adjunct_list"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp?", "vbf_ap", "not?", "adjunct_list_ap"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp?", "vbf_to_inf_cl", "not?", "adjunct_list_to_inf_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp?", "vbf_bare_inf_cl", "not?", "adjunct_list_bare_inf_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp?", "vbf_that_declarative_cl", "not?", "adjunct_list_that_declarative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp?", "vbf_bare_declarative_cl", "not?", "adjunct_list_bare_declarative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp?", "vbf_exclamative_cl", "not?", "adjunct_list_exclamative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp?", "vbf_interrogative_cl", "not?", "adjunct_list_interrogative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["vbf_vbg_cl", "not?", "vbg_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["vbf_vbn_cl", "not?", "vbn_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp?", "vbf_np", "not?", "adjunct_list_np"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp?", "vbf_np_ap", "not?", "adjunct_list_np_ap"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp?", "vbf_np_to_inf_cl", "not?", "adjunct_list_np_to_inf_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp?", "vbf_np_bare_inf_cl", "not?", "adjunct_list_np_bare_inf_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp?", "vbf_np_that_declarative_cl", "not?", "adjunct_list_np_that_declarative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp?", "vbf_np_bare_declarative_cl", "not?", "adjunct_list_np_bare_declarative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp?", "vbf_np_exclamative_cl", "not?", "adjunct_list_np_exclamative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp?", "vbf_np_interrogative_cl", "not?", "adjunct_list_np_interrogative_cl"], "postprocess": nt("fin_vp")},
    {"name": "fin_vp", "symbols": ["advp?", "vbf_np_np", "not?", "adjunct_list_np_np"], "postprocess": nt("fin_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb", "not?", "adjunct_list"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_ap", "not?", "adjunct_list_ap"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_to_inf_cl", "not?", "adjunct_list_to_inf_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_bare_inf_cl", "not?", "adjunct_list_bare_inf_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_that_declarative_cl", "not?", "adjunct_list_that_declarative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_bare_declarative_cl", "not?", "adjunct_list_bare_declarative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_exclamative_cl", "not?", "adjunct_list_exclamative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_interrogative_cl", "not?", "adjunct_list_interrogative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["vb_vbg_cl", "not?", "vbg_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["vb_vbn_cl", "not?", "vbn_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_np", "not?", "adjunct_list_np"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_np_ap", "not?", "adjunct_list_np_ap"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_np_to_inf_cl", "not?", "adjunct_list_np_to_inf_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_np_bare_inf_cl", "not?", "adjunct_list_np_bare_inf_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_np_that_declarative_cl", "not?", "adjunct_list_np_that_declarative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_np_bare_declarative_cl", "not?", "adjunct_list_np_bare_declarative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_np_exclamative_cl", "not?", "adjunct_list_np_exclamative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_np_interrogative_cl", "not?", "adjunct_list_np_interrogative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp?", "vb_np_np", "not?", "adjunct_list_np_np"], "postprocess": nt("inf_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg", "not?", "adjunct_list"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_ap", "not?", "adjunct_list_ap"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_to_inf_cl", "not?", "adjunct_list_to_inf_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_bare_inf_cl", "not?", "adjunct_list_bare_inf_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_that_declarative_cl", "not?", "adjunct_list_that_declarative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_bare_declarative_cl", "not?", "adjunct_list_bare_declarative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_exclamative_cl", "not?", "adjunct_list_exclamative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_interrogative_cl", "not?", "adjunct_list_interrogative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["vbg_vbg_cl", "not?", "vbg_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["vbg_vbn_cl", "not?", "vbn_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_np", "not?", "adjunct_list_np"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_np_ap", "not?", "adjunct_list_np_ap"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_np_to_inf_cl", "not?", "adjunct_list_np_to_inf_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_np_bare_inf_cl", "not?", "adjunct_list_np_bare_inf_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_np_that_declarative_cl", "not?", "adjunct_list_np_that_declarative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_np_bare_declarative_cl", "not?", "adjunct_list_np_bare_declarative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_np_exclamative_cl", "not?", "adjunct_list_np_exclamative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_np_interrogative_cl", "not?", "adjunct_list_np_interrogative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp?", "vbg_np_np", "not?", "adjunct_list_np_np"], "postprocess": nt("vbg_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn", "not?", "adjunct_list"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_ap", "not?", "adjunct_list_ap"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_to_inf_cl", "not?", "adjunct_list_to_inf_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_bare_inf_cl", "not?", "adjunct_list_bare_inf_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_that_declarative_cl", "not?", "adjunct_list_that_declarative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_bare_declarative_cl", "not?", "adjunct_list_bare_declarative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_exclamative_cl", "not?", "adjunct_list_exclamative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_interrogative_cl", "not?", "adjunct_list_interrogative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["vbn_vbg_cl", "not?", "vbg_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["vbn_vbn_cl", "not?", "vbn_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_np", "not?", "adjunct_list_np"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_np_ap", "not?", "adjunct_list_np_ap"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_np_to_inf_cl", "not?", "adjunct_list_np_to_inf_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_np_bare_inf_cl", "not?", "adjunct_list_np_bare_inf_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_np_that_declarative_cl", "not?", "adjunct_list_np_that_declarative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_np_bare_declarative_cl", "not?", "adjunct_list_np_bare_declarative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_np_exclamative_cl", "not?", "adjunct_list_np_exclamative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_np_interrogative_cl", "not?", "adjunct_list_np_interrogative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp?", "vbn_np_np", "not?", "adjunct_list_np_np"], "postprocess": nt("vbn_vp")},
    {"name": "adjunct_list_np_moved", "symbols": ["adjunct", "adjunct_list_np_moved"], "postprocess": nt("adjunct_list_np_moved")},
    {"name": "adjunct_list_np_moved", "symbols": ["adjunct_np_moved", "adjunct_list"], "postprocess": nt("adjunct_list_np_moved")},
    {"name": "adjunct_list_ap_np_moved", "symbols": ["adjunct", "adjunct_list_ap_np_moved"], "postprocess": nt("adjunct_list_ap_np_moved")},
    {"name": "adjunct_list_ap_np_moved", "symbols": ["ap", "adjunct_list_np_moved"], "postprocess": nt("adjunct_list_ap_np_moved")},
    {"name": "adjunct_list_ap_np_moved", "symbols": ["ap_np_moved", "adjunct_list"], "postprocess": nt("adjunct_list_ap_np_moved")},
    {"name": "adjunct_list_to_inf_cl_np_moved", "symbols": ["adjunct", "adjunct_list_to_inf_cl_np_moved"], "postprocess": nt("adjunct_list_to_inf_cl_np_moved")},
    {"name": "adjunct_list_to_inf_cl_np_moved", "symbols": ["to_inf_cl", "adjunct_list_np_moved"], "postprocess": nt("adjunct_list_to_inf_cl_np_moved")},
    {"name": "adjunct_list_to_inf_cl_np_moved", "symbols": ["to_inf_cl_np_moved", "adjunct_list"], "postprocess": nt("adjunct_list_to_inf_cl_np_moved")},
    {"name": "adjunct_list_bare_inf_cl_np_moved", "symbols": ["bare_inf_cl_np_moved", "adjunct_list"], "postprocess": nt("adjunct_list_bare_inf_cl_np_moved")},
    {"name": "adjunct_list_bare_inf_cl_np_moved", "symbols": ["bare_inf_cl", "adjunct_list_np_moved"], "postprocess": nt("adjunct_list_bare_inf_cl_np_moved")},
    {"name": "adjunct_list_that_declarative_cl_np_moved", "symbols": ["adjunct", "adjunct_list_that_declarative_cl_np_moved"], "postprocess": nt("adjunct_list_that_declarative_cl_np_moved")},
    {"name": "adjunct_list_that_declarative_cl_np_moved", "symbols": ["adjunct_np_moved", "adjunct_list_that_declarative_cl"], "postprocess": nt("adjunct_list_that_declarative_cl_np_moved")},
    {"name": "adjunct_list_that_declarative_cl_np_moved", "symbols": ["that_declarative_cl", "adjunct_list_np_moved"], "postprocess": nt("adjunct_list_that_declarative_cl_np_moved")},
    {"name": "adjunct_list_that_declarative_cl_np_moved", "symbols": ["that_declarative_cl_np_moved", "adjunct_list"], "postprocess": nt("adjunct_list_that_declarative_cl_np_moved")},
    {"name": "adjunct_list_bare_declarative_cl_np_moved", "symbols": ["adjunct", "adjunct_list_bare_declarative_cl_np_moved"], "postprocess": nt("adjunct_list_bare_declarative_cl_np_moved")},
    {"name": "adjunct_list_bare_declarative_cl_np_moved", "symbols": ["adjunct_np_moved", "adjunct_list_bare_declarative_cl"], "postprocess": nt("adjunct_list_bare_declarative_cl_np_moved")},
    {"name": "adjunct_list_bare_declarative_cl_np_moved", "symbols": ["bare_declarative_cl", "adjunct_list_np_moved"], "postprocess": nt("adjunct_list_bare_declarative_cl_np_moved")},
    {"name": "adjunct_list_bare_declarative_cl_np_moved", "symbols": ["bare_declarative_cl_np_moved", "adjunct_list"], "postprocess": nt("adjunct_list_bare_declarative_cl_np_moved")},
    {"name": "adjunct_list_np_np_moved", "symbols": ["adjunct", "adjunct_list_np_np_moved"], "postprocess": nt("adjunct_list_np_np_moved")},
    {"name": "adjunct_list_np_np_moved", "symbols": ["adjunct_np_moved", "adjunct_list_np"], "postprocess": nt("adjunct_list_np_np_moved")},
    {"name": "adjunct_list_np_np_moved", "symbols": ["np", "adjunct_list_np_moved"], "postprocess": nt("adjunct_list_np_np_moved")},
    {"name": "adjunct_list_np_np_moved", "symbols": [], "postprocess": nt("adjunct_list_np_np_moved")},
    {"name": "adjunct_list_np_ap_np_moved", "symbols": ["adjunct", "adjunct_list_np_ap_np_moved"], "postprocess": nt("adjunct_list_np_ap_np_moved")},
    {"name": "adjunct_list_np_ap_np_moved", "symbols": ["adjunct_np_moved", "adjunct_list_np_ap"], "postprocess": nt("adjunct_list_np_ap_np_moved")},
    {"name": "adjunct_list_np_ap_np_moved", "symbols": ["np", "adjunct_list_ap_np_moved"], "postprocess": nt("adjunct_list_np_ap_np_moved")},
    {"name": "adjunct_list_np_ap_np_moved", "symbols": ["ap", "adjunct_list_np_np_moved"], "postprocess": nt("adjunct_list_np_ap_np_moved")},
    {"name": "adjunct_list_np_ap_np_moved", "symbols": ["ap_np_moved", "adjunct_list_np"], "postprocess": nt("adjunct_list_np_ap_np_moved")},
    {"name": "adjunct_list_np_to_inf_cl_np_moved", "symbols": ["adjunct", "adjunct_list_np_to_inf_cl_np_moved"], "postprocess": nt("adjunct_list_np_to_inf_cl_np_moved")},
    {"name": "adjunct_list_np_to_inf_cl_np_moved", "symbols": ["adjunct_np_moved", "adjunct_list_np_to_inf_cl"], "postprocess": nt("adjunct_list_np_to_inf_cl_np_moved")},
    {"name": "adjunct_list_np_to_inf_cl_np_moved", "symbols": ["np", "adjunct_list_to_inf_cl_np_moved"], "postprocess": nt("adjunct_list_np_to_inf_cl_np_moved")},
    {"name": "adjunct_list_np_to_inf_cl_np_moved", "symbols": ["to_inf_cl", "adjunct_list"], "postprocess": nt("adjunct_list_np_to_inf_cl_np_moved")},
    {"name": "adjunct_list_np_bare_inf_cl_np_moved", "symbols": ["adjunct", "adjunct_list_np_bare_inf_cl_np_moved"], "postprocess": nt("adjunct_list_np_bare_inf_cl_np_moved")},
    {"name": "adjunct_list_np_bare_inf_cl_np_moved", "symbols": ["adjunct_np_moved", "adjunct_list_np_bare_inf_cl"], "postprocess": nt("adjunct_list_np_bare_inf_cl_np_moved")},
    {"name": "adjunct_list_np_bare_inf_cl_np_moved", "symbols": ["np", "adjunct_list_bare_inf_cl_np_moved"], "postprocess": nt("adjunct_list_np_bare_inf_cl_np_moved")},
    {"name": "adjunct_list_np_bare_inf_cl_np_moved", "symbols": ["bare_inf_cl", "adjunct_list"], "postprocess": nt("adjunct_list_np_bare_inf_cl_np_moved")},
    {"name": "adjunct_list_np_that_declarative_cl_np_moved", "symbols": ["adjunct", "adjunct_list_np_that_declarative_cl_np_moved"], "postprocess": nt("adjunct_list_np_that_declarative_cl_np_moved")},
    {"name": "adjunct_list_np_that_declarative_cl_np_moved", "symbols": ["adjunct_np_moved", "adjunct_list_np_that_declarative_cl"], "postprocess": nt("adjunct_list_np_that_declarative_cl_np_moved")},
    {"name": "adjunct_list_np_that_declarative_cl_np_moved", "symbols": ["np", "adjunct_list_that_declarative_cl_np_moved"], "postprocess": nt("adjunct_list_np_that_declarative_cl_np_moved")},
    {"name": "adjunct_list_np_that_declarative_cl_np_moved", "symbols": ["that_declarative_cl", "adjunct_list_np_np_moved"], "postprocess": nt("adjunct_list_np_that_declarative_cl_np_moved")},
    {"name": "adjunct_list_np_that_declarative_cl_np_moved", "symbols": ["that_declarative_cl_np_moved", "adjunct_list_np"], "postprocess": nt("adjunct_list_np_that_declarative_cl_np_moved")},
    {"name": "adjunct_list_np_bare_declarative_cl_np_moved", "symbols": ["adjunct", "adjunct_list_np_bare_declarative_cl_np_moved"], "postprocess": nt("adjunct_list_np_bare_declarative_cl_np_moved")},
    {"name": "adjunct_list_np_bare_declarative_cl_np_moved", "symbols": ["adjunct_np_moved", "adjunct_list_np_bare_declarative_cl"], "postprocess": nt("adjunct_list_np_bare_declarative_cl_np_moved")},
    {"name": "adjunct_list_np_bare_declarative_cl_np_moved", "symbols": ["np", "adjunct_list_bare_declarative_cl_np_moved"], "postprocess": nt("adjunct_list_np_bare_declarative_cl_np_moved")},
    {"name": "adjunct_list_np_bare_declarative_cl_np_moved", "symbols": ["bare_declarative_cl", "adjunct_list_np_np_moved"], "postprocess": nt("adjunct_list_np_bare_declarative_cl_np_moved")},
    {"name": "adjunct_list_np_bare_declarative_cl_np_moved", "symbols": ["bare_declarative_cl_np_moved", "adjunct_list_np"], "postprocess": nt("adjunct_list_np_bare_declarative_cl_np_moved")},
    {"name": "adjunct_list_np_exclamative_cl_np_moved", "symbols": ["adjunct", "adjunct_list_np_exclamative_cl_np_moved"], "postprocess": nt("adjunct_list_np_exclamative_cl_np_moved")},
    {"name": "adjunct_list_np_exclamative_cl_np_moved", "symbols": ["adjunct_np_moved", "adjunct_list_np_exclamative_cl"], "postprocess": nt("adjunct_list_np_exclamative_cl_np_moved")},
    {"name": "adjunct_list_np_exclamative_cl_np_moved", "symbols": ["exclamative_cl", "adjunct_list_np_np_moved"], "postprocess": nt("adjunct_list_np_exclamative_cl_np_moved")},
    {"name": "adjunct_list_np_interrogative_cl_np_moved", "symbols": ["adjunct", "adjunct_list_np_interrogative_cl_np_moved"], "postprocess": nt("adjunct_list_np_interrogative_cl_np_moved")},
    {"name": "adjunct_list_np_interrogative_cl_np_moved", "symbols": ["adjunct_np_moved", "adjunct_list_np_interrogative_cl"], "postprocess": nt("adjunct_list_np_interrogative_cl_np_moved")},
    {"name": "adjunct_list_np_interrogative_cl_np_moved", "symbols": ["interrogative_cl", "adjunct_list_np_np_moved"], "postprocess": nt("adjunct_list_np_interrogative_cl_np_moved")},
    {"name": "adjunct_list_np_np_np_moved", "symbols": ["adjunct", "adjunct_list_np_np_np_moved"], "postprocess": nt("adjunct_list_np_np_np_moved")},
    {"name": "adjunct_list_np_np_np_moved", "symbols": ["adjunct_np_moved", "adjunct_list_np_np"], "postprocess": nt("adjunct_list_np_np_np_moved")},
    {"name": "adjunct_list_np_np_np_moved", "symbols": ["to", "np", "adjunct_list_np_np_moved"], "postprocess": nt("adjunct_list_np_np_np_moved")},
    {"name": "adjunct_list_np_np_np_moved", "symbols": ["np", "adjunct_list_np_np_moved"], "postprocess": nt("adjunct_list_np_np_np_moved")},
    {"name": "adjunct_list_np_np_np_moved", "symbols": ["np", "adjunct_list_np_do_moved"], "postprocess": nt("adjunct_list_np_np_np_moved")},
    {"name": "adjunct_list_np_do_moved", "symbols": ["adjunct", "adjunct_list_np_do_moved"], "postprocess": nt("adjunct_list_np_do_moved")},
    {"name": "adjunct_list_np_do_moved", "symbols": ["to", "adjunct_list"], "postprocess": nt("adjunct_list_np_do_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "modal", "not?", "bare_inf_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbf", "not?", "adjunct_list_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbf_ap", "not?", "adjunct_list_ap_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbf_to_inf_cl", "not?", "adjunct_list_to_inf_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbf_bare_inf_cl", "not?", "adjunct_list_bare_inf_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbf_that_declarative_cl", "not?", "adjunct_list_that_declarative_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbf_bare_declarative_cl", "not?", "adjunct_list_bare_declarative_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["vbf_vbg_cl", "not?", "vbg_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["vbf_vbn_cl", "not?", "vbn_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbf_np", "not?", "adjunct_list_np_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbf_np_ap", "not?", "adjunct_list_np_ap_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbf_np_to_inf_cl", "not?", "adjunct_list_np_to_inf_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbf_np_bare_inf_cl", "not?", "adjunct_list_np_bare_inf_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbf_np_that_declarative_cl", "not?", "adjunct_list_np_that_declarative_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbf_np_bare_declarative_cl", "not?", "adjunct_list_np_bare_declarative_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbf_np_exclamative_cl", "not?", "adjunct_list_np_exclamative_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbf_np_interrogative_cl", "not?", "adjunct_list_np_interrogative_cl_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "fin_vp_np_moved", "symbols": ["advp?", "vbf_np_np", "not?", "adjunct_list_np_np_np_moved"], "postprocess": nt("fin_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb", "not?", "adjunct_list_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_ap", "not?", "adjunct_list_ap_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_to_inf_cl", "not?", "adjunct_list_to_inf_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_bare_inf_cl", "not?", "adjunct_list_bare_inf_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_that_declarative_cl", "not?", "adjunct_list_that_declarative_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_bare_declarative_cl", "not?", "adjunct_list_bare_declarative_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["vb_vbg_cl", "not?", "vbg_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["vb_vbn_cl", "not?", "vbn_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_np", "not?", "adjunct_list_np_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_np_ap", "not?", "adjunct_list_np_ap_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_np_to_inf_cl", "not?", "adjunct_list_np_to_inf_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_np_bare_inf_cl", "not?", "adjunct_list_np_bare_inf_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_np_that_declarative_cl", "not?", "adjunct_list_np_that_declarative_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_np_bare_declarative_cl", "not?", "adjunct_list_np_bare_declarative_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_np_exclamative_cl", "not?", "adjunct_list_np_exclamative_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_np_interrogative_cl", "not?", "adjunct_list_np_interrogative_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "inf_vp_np_moved", "symbols": ["advp?", "vb_np_np", "not?", "adjunct_list_np_np_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg", "not?", "adjunct_list_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_ap", "not?", "adjunct_list_ap_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_to_inf_cl", "not?", "adjunct_list_to_inf_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_bare_inf_cl", "not?", "adjunct_list_bare_inf_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_that_declarative_cl", "not?", "adjunct_list_that_declarative_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_bare_declarative_cl", "not?", "adjunct_list_bare_declarative_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["vbg_vbg_cl", "not?", "vbg_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["vbg_vbn_cl", "not?", "vbn_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_np", "not?", "adjunct_list_np_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_np_ap", "not?", "adjunct_list_np_ap_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_np_to_inf_cl", "not?", "adjunct_list_np_to_inf_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_np_bare_inf_cl", "not?", "adjunct_list_np_bare_inf_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_np_that_declarative_cl", "not?", "adjunct_list_np_that_declarative_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_np_bare_declarative_cl", "not?", "adjunct_list_np_bare_declarative_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_np_exclamative_cl", "not?", "adjunct_list_np_exclamative_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_np_interrogative_cl", "not?", "adjunct_list_np_interrogative_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "vbg_vp_np_moved", "symbols": ["advp?", "vbg_np_np", "not?", "adjunct_list_np_np_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn", "not?", "adjunct_list_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_ap", "not?", "adjunct_list_ap_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_to_inf_cl", "not?", "adjunct_list_to_inf_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_bare_inf_cl", "not?", "adjunct_list_bare_inf_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_that_declarative_cl", "not?", "adjunct_list_that_declarative_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_bare_declarative_cl", "not?", "adjunct_list_bare_declarative_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["vbn_vbg_cl", "not?", "vbg_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["vbn_vbn_cl", "not?", "vbn_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_np", "not?", "adjunct_list_np_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_np_ap", "not?", "adjunct_list_np_ap_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_np_to_inf_cl", "not?", "adjunct_list_np_to_inf_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_np_bare_inf_cl", "not?", "adjunct_list_np_bare_inf_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_np_that_declarative_cl", "not?", "adjunct_list_np_bare_declarative_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_np_bare_declarative_cl", "not?", "adjunct_list_np_bare_declarative_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_np_exclamative_cl", "not?", "adjunct_list_np_exclamative_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_np_interrogative_cl", "not?", "adjunct_list_np_interrogative_cl_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "vbn_vp_np_moved", "symbols": ["advp?", "vbn_np_np", "not?", "adjunct_list_np_np_np_moved"], "postprocess": nt("inf_vp_np_moved")},
    {"name": "adjunct_list_ap_moved", "symbols": ["adjunct_list"], "postprocess": nt("adjunct_list_ap_moved")},
    {"name": "adjunct_list_ap_ap_moved", "symbols": ["adjunct_list_ap"], "postprocess": nt("adjunct_list_ap_ap_moved")},
    {"name": "adjunct_list_ap_ap_moved", "symbols": ["adjunct_list"], "postprocess": nt("adjunct_list_ap_ap_moved")},
    {"name": "adjunct_list_to_inf_cl_ap_moved", "symbols": ["adjunct_list_to_inf_cl"], "postprocess": nt("adjunct_list_to_inf_cl_ap_moved")},
    {"name": "adjunct_list_to_inf_cl_ap_moved", "symbols": ["adjunct_list_to_inf_cl_ap_moved_"], "postprocess": nt("adjunct_list_to_inf_cl_ap_moved")},
    {"name": "adjunct_list_to_inf_cl_ap_moved_", "symbols": ["adjunct", "adjunct_list_to_inf_cl_ap_moved_"], "postprocess": nt("adjunct_list_to_inf_cl_ap_moved_")},
    {"name": "adjunct_list_to_inf_cl_ap_moved_", "symbols": ["to_inf_cl_ap_moved", "adjunct_list"], "postprocess": nt("adjunct_list_to_inf_cl_ap_moved_")},
    {"name": "adjunct_list_bare_inf_cl_ap_moved", "symbols": ["adjunct_list_bare_inf_cl"], "postprocess": nt("adjunct_list_bare_inf_cl_ap_moved")},
    {"name": "adjunct_list_bare_inf_cl_ap_moved", "symbols": ["adjunct_list_bare_inf_cl_ap_moved_"], "postprocess": nt("adjunct_list_bare_inf_cl_ap_moved")},
    {"name": "adjunct_list_bare_inf_cl_ap_moved_", "symbols": ["bare_inf_cl_ap_moved", "adjunct_list"], "postprocess": nt("adjunct_list_bare_inf_cl_ap_moved_")},
    {"name": "adjunct_list_that_declarative_cl_ap_moved", "symbols": ["adjunct_list_that_declarative_cl"], "postprocess": nt("adjunct_list_that_declarative_cl_ap_moved")},
    {"name": "adjunct_list_that_declarative_cl_ap_moved", "symbols": ["adjunct_list_that_declarative_cl_ap_moved_"], "postprocess": nt("adjunct_list_that_declarative_cl_ap_moved")},
    {"name": "adjunct_list_that_declarative_cl_ap_moved_", "symbols": ["adjunct", "adjunct_list_that_declarative_cl_ap_moved_"], "postprocess": nt("adjunct_list_that_declarative_cl_ap_moved_")},
    {"name": "adjunct_list_that_declarative_cl_ap_moved_", "symbols": ["that_declarative_cl_ap_moved", "adjunct_list"], "postprocess": nt("adjunct_list_that_declarative_cl_ap_moved_")},
    {"name": "adjunct_list_bare_declarative_cl_ap_moved", "symbols": ["adjunct_list_bare_declarative_cl"], "postprocess": nt("adjunct_list_bare_declarative_cl_ap_moved")},
    {"name": "adjunct_list_bare_declarative_cl_ap_moved", "symbols": ["adjunct_list_bare_declarative_cl_ap_moved_"], "postprocess": nt("adjunct_list_bare_declarative_cl_ap_moved")},
    {"name": "adjunct_list_bare_declarative_cl_ap_moved_", "symbols": ["adjunct", "adjunct_list_bare_declarative_cl_ap_moved_"], "postprocess": nt("adjunct_list_bare_declarative_cl_ap_moved_")},
    {"name": "adjunct_list_bare_declarative_cl_ap_moved_", "symbols": ["bare_declarative_cl_ap_moved", "adjunct_list"], "postprocess": nt("adjunct_list_bare_declarative_cl_ap_moved_")},
    {"name": "adjunct_list_exclamative_cl_ap_moved", "symbols": ["adjunct_list_exclamative_cl"], "postprocess": nt("adjunct_list_exclamative_cl_ap_moved")},
    {"name": "adjunct_list_interrogative_cl_ap_moved", "symbols": ["adjunct_list_interrogative_cl"], "postprocess": nt("adjunct_list_interrogative_cl_ap_moved")},
    {"name": "adjunct_list_np_ap_moved", "symbols": ["adjunct_list_np"], "postprocess": nt("adjunct_list_np_ap_moved")},
    {"name": "adjunct_list_np_ap_ap_moved", "symbols": ["adjunct_list_np_ap"], "postprocess": nt("adjunct_list_np_ap_ap_moved_")},
    {"name": "adjunct_list_np_ap_ap_moved", "symbols": ["adjunct_list_np"], "postprocess": nt("adjunct_list_np_ap_ap_moved_")},
    {"name": "adjunct_list_np_to_inf_cl_ap_moved", "symbols": ["adjunct_list_np_to_inf_cl"], "postprocess": nt("adjunct_list_np_to_inf_cl_ap_moved")},
    {"name": "adjunct_list_np_to_inf_cl_ap_moved", "symbols": ["adjunct_list_np_to_inf_cl_ap_moved_"], "postprocess": nt("adjunct_list_np_to_inf_cl_ap_moved")},
    {"name": "adjunct_list_np_to_inf_cl_ap_moved_", "symbols": ["adjunct", "adjunct_list_np_to_inf_cl_ap_moved_"], "postprocess": nt("adjunct_list_np_to_inf_cl_ap_moved_")},
    {"name": "adjunct_list_np_to_inf_cl_ap_moved_", "symbols": ["np", "adjunct_list_to_inf_cl_ap_moved_"], "postprocess": nt("adjunct_list_np_to_inf_cl_ap_moved_")},
    {"name": "adjunct_list_np_bare_inf_cl_ap_moved", "symbols": ["adjunct_list_np_bare_inf_cl"], "postprocess": nt("adjunct_list_np_bare_inf_cl_ap_moved")},
    {"name": "adjunct_list_np_bare_inf_cl_ap_moved", "symbols": ["adjunct_list_np_bare_inf_cl_ap_moved_"], "postprocess": nt("adjunct_list_np_bare_inf_cl_ap_moved")},
    {"name": "adjunct_list_np_bare_inf_cl_ap_moved_", "symbols": ["adjunct", "adjunct_list_np_bare_inf_cl_ap_moved_"], "postprocess": nt("adjunct_list_np_bare_inf_cl_ap_moved_")},
    {"name": "adjunct_list_np_bare_inf_cl_ap_moved_", "symbols": ["np", "adjunct_list_bare_inf_cl_ap_moved_"], "postprocess": nt("adjunct_list_np_bare_inf_cl_ap_moved_")},
    {"name": "adjunct_list_np_that_declarative_cl_ap_moved", "symbols": ["adjunct_list_np_that_declarative_cl"], "postprocess": nt("adjunct_list_np_that_declarative_cl_ap_moved")},
    {"name": "adjunct_list_np_that_declarative_cl_ap_moved", "symbols": ["adjunct_list_np_that_declarative_cl_ap_moved_"], "postprocess": nt("adjunct_list_np_that_declarative_cl_ap_moved")},
    {"name": "adjunct_list_np_that_declarative_cl_ap_moved_", "symbols": ["adjunct", "adjunct_list_np_that_declarative_cl_ap_moved"], "postprocess": nt("adjunct_list_np_that_declarative_cl_ap_moved_")},
    {"name": "adjunct_list_np_that_declarative_cl_ap_moved_", "symbols": ["np", "adjunct_list_that_declarative_cl_ap_moved"], "postprocess": nt("adjunct_list_np_that_declarative_cl_ap_moved_")},
    {"name": "adjunct_list_np_bare_declarative_cl_ap_moved", "symbols": ["adjunct_list_np_bare_declarative_cl"], "postprocess": nt("adjunct_list_np_bare_declarative_cl_ap_moved")},
    {"name": "adjunct_list_np_bare_declarative_cl_ap_moved", "symbols": ["adjunct_list_np_bare_declarative_cl_ap_moved_"], "postprocess": nt("adjunct_list_np_bare_declarative_cl_ap_moved")},
    {"name": "adjunct_list_np_bare_declarative_cl_ap_moved_", "symbols": ["adjunct", "adjunct_list_np_bare_declarative_cl_ap_moved"], "postprocess": nt("adjunct_list_np_bare_declarative_cl_ap_moved_")},
    {"name": "adjunct_list_np_bare_declarative_cl_ap_moved_", "symbols": ["np", "adjunct_list_bare_declarative_cl_ap_moved"], "postprocess": nt("adjunct_list_np_bare_declarative_cl_ap_moved_")},
    {"name": "adjunct_list_np_exclamative_cl_ap_moved", "symbols": ["adjunct_list_np_exclamative_cl"], "postprocess": nt("adjunct_list_np_exclamative_cl_ap_moved")},
    {"name": "adjunct_list_np_interrogative_cl_ap_moved", "symbols": ["adjunct_list_np_interrogative_cl"], "postprocess": nt("adjunct_list_np_interrogative_cl_ap_moved")},
    {"name": "adjunct_list_np_np_ap_moved", "symbols": ["adjunct_list_np_np"], "postprocess": nt("adjunct_list_np_np_ap_moved")},
    {"name": "fin_vp_ap_moved", "symbols": ["advp?", "modal", "not?", "bare_inf_cl_ap_moved"], "postprocess": nt("fin_vp_ap_moved")},
    {"name": "fin_vp_ap_moved", "symbols": ["advp?", "vbf", "not?", "adjunct_list_ap_moved"], "postprocess": nt("fin_vp_ap_moved")},
    {"name": "fin_vp_ap_moved", "symbols": ["advp?", "vbf_ap", "not?", "adjunct_list_ap_ap_moved"], "postprocess": nt("fin_vp_ap_moved")},
    {"name": "fin_vp_ap_moved", "symbols": ["advp?", "vbf_to_inf_cl", "not?", "adjunct_list_to_inf_cl_ap_moved"], "postprocess": nt("fin_vp_ap_moved")},
    {"name": "fin_vp_ap_moved", "symbols": ["advp?", "vbf_bare_inf_cl", "not?", "adjunct_list_bare_inf_cl_ap_moved"], "postprocess": nt("fin_vp_ap_moved")},
    {"name": "fin_vp_ap_moved", "symbols": ["advp?", "vbf_that_declarative_cl", "not?", "adjunct_list_that_declarative_cl_ap_moved"], "postprocess": nt("fin_vp_ap_moved")},
    {"name": "fin_vp_ap_moved", "symbols": ["advp?", "vbf_bare_declarative_cl", "not?", "adjunct_list_bare_declarative_cl_ap_moved"], "postprocess": nt("fin_vp_ap_moved")},
    {"name": "fin_vp_ap_moved", "symbols": ["advp?", "vbf_exclamative_cl", "not?", "adjunct_list_exclamative_cl_ap_moved"], "postprocess": nt("fin_vp_ap_moved")},
    {"name": "fin_vp_ap_moved", "symbols": ["advp?", "vbf_interrogative_cl", "not?", "adjunct_list_interrogative_cl_ap_moved"], "postprocess": nt("fin_vp_ap_moved")},
    {"name": "fin_vp_ap_moved", "symbols": ["vbf_vbg_cl", "not?", "vbg_cl_ap_moved"], "postprocess": nt("fin_vp_ap_moved")},
    {"name": "fin_vp_ap_moved", "symbols": ["vbf_vbn_cl", "not?", "vbn_cl_ap_moved"], "postprocess": nt("fin_vp_ap_moved")},
    {"name": "fin_vp_ap_moved", "symbols": ["advp?", "vbf_np", "not?", "adjunct_list_np_ap_moved"], "postprocess": nt("fin_vp_ap_moved")},
    {"name": "fin_vp_ap_moved", "symbols": ["advp?", "vbf_np_ap", "not?", "adjunct_list_np_ap_ap_moved"], "postprocess": nt("fin_vp_ap_moved")},
    {"name": "fin_vp_ap_moved", "symbols": ["advp?", "vbf_np_to_inf_cl", "not?", "adjunct_list_np_to_inf_cl_ap_moved"], "postprocess": nt("fin_vp_ap_moved")},
    {"name": "fin_vp_ap_moved", "symbols": ["advp?", "vbf_np_bare_inf_cl", "not?", "adjunct_list_np_bare_inf_cl_ap_moved"], "postprocess": nt("fin_vp_ap_moved")},
    {"name": "fin_vp_ap_moved", "symbols": ["advp?", "vbf_np_that_declarative_cl", "not?", "adjunct_list_np_that_declarative_cl_ap_moved"], "postprocess": nt("fin_vp_ap_moved")},
    {"name": "fin_vp_ap_moved", "symbols": ["advp?", "vbf_np_bare_declarative_cl", "not?", "adjunct_list_np_bare_declarative_cl_ap_moved"], "postprocess": nt("fin_vp_ap_moved")},
    {"name": "fin_vp_ap_moved", "symbols": ["advp?", "vbf_np_exclamative_cl", "not?", "adjunct_list_np_exclamative_cl_ap_moved"], "postprocess": nt("fin_vp_ap_moved")},
    {"name": "fin_vp_ap_moved", "symbols": ["advp?", "vbf_np_interrogative_cl", "not?", "adjunct_list_np_interrogative_cl_ap_moved"], "postprocess": nt("fin_vp_ap_moved")},
    {"name": "fin_vp_ap_moved", "symbols": ["advp?", "vbf_np_np", "not?", "adjunct_list_np_np_ap_moved"], "postprocess": nt("fin_vp_ap_moved")},
    {"name": "inf_vp_ap_moved", "symbols": ["advp?", "vb", "not?", "adjunct_list_ap_moved"], "postprocess": nt("inf_vp_ap_moved")},
    {"name": "inf_vp_ap_moved", "symbols": ["advp?", "vb_ap", "not?", "adjunct_list_ap_ap_moved"], "postprocess": nt("inf_vp_ap_moved")},
    {"name": "inf_vp_ap_moved", "symbols": ["advp?", "vb_to_inf_cl", "not?", "adjunct_list_to_inf_cl_ap_moved"], "postprocess": nt("inf_vp_ap_moved")},
    {"name": "inf_vp_ap_moved", "symbols": ["advp?", "vb_bare_inf_cl", "not?", "adjunct_list_bare_inf_cl_ap_moved"], "postprocess": nt("inf_vp_ap_moved")},
    {"name": "inf_vp_ap_moved", "symbols": ["advp?", "vb_that_declarative_cl", "not?", "adjunct_list_that_declarative_cl_ap_moved"], "postprocess": nt("inf_vp_ap_moved")},
    {"name": "inf_vp_ap_moved", "symbols": ["advp?", "vb_bare_declarative_cl", "not?", "adjunct_list_bare_declarative_cl_ap_moved"], "postprocess": nt("inf_vp_ap_moved")},
    {"name": "inf_vp_ap_moved", "symbols": ["advp?", "vb_exclamative_cl", "not?", "adjunct_list_exclamative_cl_ap_moved"], "postprocess": nt("inf_vp_ap_moved")},
    {"name": "inf_vp_ap_moved", "symbols": ["advp?", "vb_interrogative_cl", "not?", "adjunct_list_interrogative_cl_ap_moved"], "postprocess": nt("inf_vp_ap_moved")},
    {"name": "inf_vp_ap_moved", "symbols": ["vb_vbg_cl", "not?", "vbg_cl_ap_moved"], "postprocess": nt("inf_vp_ap_moved")},
    {"name": "inf_vp_ap_moved", "symbols": ["vb_vbn_cl", "not?", "vbn_cl_ap_moved"], "postprocess": nt("inf_vp_ap_moved")},
    {"name": "inf_vp_ap_moved", "symbols": ["advp?", "vb_np", "not?", "adjunct_list_np_ap_moved"], "postprocess": nt("inf_vp_ap_moved")},
    {"name": "inf_vp_ap_moved", "symbols": ["advp?", "vb_np_ap", "not?", "adjunct_list_np_ap_ap_moved"], "postprocess": nt("inf_vp_ap_moved")},
    {"name": "inf_vp_ap_moved", "symbols": ["advp?", "vb_np_to_inf_cl", "not?", "adjunct_list_np_to_inf_cl_ap_moved"], "postprocess": nt("inf_vp_ap_moved")},
    {"name": "inf_vp_ap_moved", "symbols": ["advp?", "vb_np_bare_inf_cl", "not?", "adjunct_list_np_bare_inf_cl_ap_moved"], "postprocess": nt("inf_vp_ap_moved")},
    {"name": "inf_vp_ap_moved", "symbols": ["advp?", "vb_np_that_declarative_cl", "not?", "adjunct_list_np_that_declarative_cl_ap_moved"], "postprocess": nt("inf_vp_ap_moved")},
    {"name": "inf_vp_ap_moved", "symbols": ["advp?", "vb_np_bare_declarative_cl", "not?", "adjunct_list_np_bare_declarative_cl_ap_moved"], "postprocess": nt("inf_vp_ap_moved")},
    {"name": "inf_vp_ap_moved", "symbols": ["advp?", "vb_np_exclamative_cl", "not?", "adjunct_list_np_exclamative_cl_ap_moved"], "postprocess": nt("inf_vp_ap_moved")},
    {"name": "inf_vp_ap_moved", "symbols": ["advp?", "vb_np_interrogative_cl", "not?", "adjunct_list_np_interrogative_cl_ap_moved"], "postprocess": nt("inf_vp_ap_moved")},
    {"name": "inf_vp_ap_moved", "symbols": ["advp?", "vb_np_np", "not?", "adjunct_list_np_np_ap_moved"], "postprocess": nt("inf_vp_ap_moved")},
    {"name": "vbn_vp_ap_moved", "symbols": ["advp?", "vbn", "not?", "adjunct_list_ap_moved"], "postprocess": nt("vbn_vp_ap_moved")},
    {"name": "vbn_vp_ap_moved", "symbols": ["advp?", "vbn_ap", "not?", "adjunct_list_ap_ap_moved"], "postprocess": nt("vbn_vp_ap_moved")},
    {"name": "vbn_vp_ap_moved", "symbols": ["advp?", "vbn_to_inf_cl", "not?", "adjunct_list_to_inf_cl_ap_moved"], "postprocess": nt("vbn_vp_ap_moved")},
    {"name": "vbn_vp_ap_moved", "symbols": ["advp?", "vbn_bare_inf_cl", "not?", "adjunct_list_bare_inf_cl_ap_moved"], "postprocess": nt("vbn_vp_ap_moved")},
    {"name": "vbn_vp_ap_moved", "symbols": ["advp?", "vbn_that_declarative_cl", "not?", "adjunct_list_that_declarative_cl_ap_moved"], "postprocess": nt("vbn_vp_ap_moved")},
    {"name": "vbn_vp_ap_moved", "symbols": ["advp?", "vbn_bare_declarative_cl", "not?", "adjunct_list_bare_declarative_cl_ap_moved"], "postprocess": nt("vbn_vp_ap_moved")},
    {"name": "vbn_vp_ap_moved", "symbols": ["advp?", "vbn_exclamative_cl", "not?", "adjunct_list_exclamative_cl_ap_moved"], "postprocess": nt("vbn_vp_ap_moved")},
    {"name": "vbn_vp_ap_moved", "symbols": ["advp?", "vbn_interrogative_cl", "not?", "adjunct_list_interrogative_cl_ap_moved"], "postprocess": nt("vbn_vp_ap_moved")},
    {"name": "vbn_vp_ap_moved", "symbols": ["vbn_vbg_cl", "not?", "vbg_cl_ap_moved"], "postprocess": nt("vbn_vp_ap_moved")},
    {"name": "vbn_vp_ap_moved", "symbols": ["vbn_vbn_cl", "not?", "vbn_cl_ap_moved"], "postprocess": nt("vbn_vp_ap_moved")},
    {"name": "vbn_vp_ap_moved", "symbols": ["advp?", "vbn_np", "not?", "adjunct_list_np_ap_moved"], "postprocess": nt("vbn_vp_ap_moved")},
    {"name": "vbn_vp_ap_moved", "symbols": ["advp?", "vbn_np_ap", "not?", "adjunct_list_np_ap_ap_moved"], "postprocess": nt("vbn_vp_ap_moved")},
    {"name": "vbn_vp_ap_moved", "symbols": ["advp?", "vbn_np_to_inf_cl", "not?", "adjunct_list_np_to_inf_cl_ap_moved"], "postprocess": nt("vbn_vp_ap_moved")},
    {"name": "vbn_vp_ap_moved", "symbols": ["advp?", "vbn_np_bare_inf_cl", "not?", "adjunct_list_np_bare_inf_cl_ap_moved"], "postprocess": nt("vbn_vp_ap_moved")},
    {"name": "vbn_vp_ap_moved", "symbols": ["advp?", "vbn_np_that_declarative_cl", "not?", "adjunct_list_np_that_declarative_cl_ap_moved"], "postprocess": nt("vbn_vp_ap_moved")},
    {"name": "vbn_vp_ap_moved", "symbols": ["advp?", "vbn_np_bare_declarative_cl", "not?", "adjunct_list_np_bare_declarative_cl_ap_moved"], "postprocess": nt("vbn_vp_ap_moved")},
    {"name": "vbn_vp_ap_moved", "symbols": ["advp?", "vbn_np_exclamative_cl", "not?", "adjunct_list_np_exclamative_cl_ap_moved"], "postprocess": nt("vbn_vp_ap_moved")},
    {"name": "vbn_vp_ap_moved", "symbols": ["advp?", "vbn_np_interrogative_cl", "not?", "adjunct_list_np_interrogative_cl_ap_moved"], "postprocess": nt("vbn_vp_ap_moved")},
    {"name": "vbn_vp_ap_moved", "symbols": ["advp?", "vbn_np_np", "not?", "adjunct_list_np_np_ap_moved"], "postprocess": nt("vbn_vp_ap_moved")},
    {"name": "vbg_vp_ap_moved", "symbols": ["advp?", "vbg", "not?", "adjunct_list_ap_moved"], "postprocess": nt("vbg_vp_ap_moved")},
    {"name": "vbg_vp_ap_moved", "symbols": ["advp?", "vbg_ap", "not?", "adjunct_list_ap_ap_moved"], "postprocess": nt("vbg_vp_ap_moved")},
    {"name": "vbg_vp_ap_moved", "symbols": ["advp?", "vbg_to_inf_cl", "not?", "adjunct_list_to_inf_cl_ap_moved"], "postprocess": nt("vbg_vp_ap_moved")},
    {"name": "vbg_vp_ap_moved", "symbols": ["advp?", "vbg_bare_inf_cl", "not?", "adjunct_list_bare_inf_cl_ap_moved"], "postprocess": nt("vbg_vp_ap_moved")},
    {"name": "vbg_vp_ap_moved", "symbols": ["advp?", "vbg_that_declarative_cl", "not?", "adjunct_list_that_declarative_cl_ap_moved"], "postprocess": nt("vbg_vp_ap_moved")},
    {"name": "vbg_vp_ap_moved", "symbols": ["advp?", "vbg_bare_declarative_cl", "not?", "adjunct_list_bare_declarative_cl_ap_moved"], "postprocess": nt("vbg_vp_ap_moved")},
    {"name": "vbg_vp_ap_moved", "symbols": ["advp?", "vbg_exclamative_cl", "not?", "adjunct_list_exclamative_cl_ap_moved"], "postprocess": nt("vbg_vp_ap_moved")},
    {"name": "vbg_vp_ap_moved", "symbols": ["advp?", "vbg_interrogative_cl", "not?", "adjunct_list_interrogative_cl_ap_moved"], "postprocess": nt("vbg_vp_ap_moved")},
    {"name": "vbg_vp_ap_moved", "symbols": ["vbg_vbg_cl", "not?", "vbg_cl_ap_moved"], "postprocess": nt("vbg_vp_ap_moved")},
    {"name": "vbg_vp_ap_moved", "symbols": ["vbg_vbn_cl", "not?", "vbn_cl_ap_moved"], "postprocess": nt("vbg_vp_ap_moved")},
    {"name": "vbg_vp_ap_moved", "symbols": ["advp?", "vbg_np", "not?", "adjunct_list_np_ap_moved"], "postprocess": nt("vbg_vp_ap_moved")},
    {"name": "vbg_vp_ap_moved", "symbols": ["advp?", "vbg_np_ap", "not?", "adjunct_list_np_ap_ap_moved"], "postprocess": nt("vbg_vp_ap_moved")},
    {"name": "vbg_vp_ap_moved", "symbols": ["advp?", "vbg_np_to_inf_cl", "not?", "adjunct_list_np_to_inf_cl_ap_moved"], "postprocess": nt("vbg_vp_ap_moved")},
    {"name": "vbg_vp_ap_moved", "symbols": ["advp?", "vbg_np_bare_inf_cl", "not?", "adjunct_list_np_bare_inf_cl_ap_moved"], "postprocess": nt("vbg_vp_ap_moved")},
    {"name": "vbg_vp_ap_moved", "symbols": ["advp?", "vbg_np_that_declarative_cl", "not?", "adjunct_list_np_that_declarative_cl_ap_moved"], "postprocess": nt("vbg_vp_ap_moved")},
    {"name": "vbg_vp_ap_moved", "symbols": ["advp?", "vbg_np_bare_declarative_cl", "not?", "adjunct_list_np_bare_declarative_cl_ap_moved"], "postprocess": nt("vbg_vp_ap_moved")},
    {"name": "vbg_vp_ap_moved", "symbols": ["advp?", "vbg_np_exclamative_cl", "not?", "adjunct_list_np_exclamative_cl_ap_moved"], "postprocess": nt("vbg_vp_ap_moved")},
    {"name": "vbg_vp_ap_moved", "symbols": ["advp?", "vbg_np_interrogative_cl", "not?", "adjunct_list_np_interrogative_cl_ap_moved"], "postprocess": nt("vbg_vp_ap_moved")},
    {"name": "vbg_vp_ap_moved", "symbols": ["advp?", "vbg_np_np", "not?", "adjunct_list_np_np_ap_moved"], "postprocess": nt("vbg_vp_ap_moved")},
    {"name": "to_inf_cl", "symbols": ["to", "inf_vp"], "postprocess": nt("to_inf_cl")},
    {"name": "to_inf_cl_np_moved", "symbols": ["to", "inf_vp_np_moved"], "postprocess": nt("to_inf_cl_np_moved")},
    {"name": "to_inf_cl_ap_moved", "symbols": ["to", "inf_vp_ap_moved"], "postprocess": nt("to_inf_cl_ap_moved")},
    {"name": "bare_inf_cl", "symbols": ["inf_vp"], "postprocess": nt("bare_inf_cl")},
    {"name": "bare_inf_cl_np_moved", "symbols": ["inf_vp_np_moved"], "postprocess": nt("bare_inf_cl_np_moved")},
    {"name": "bare_inf_cl_ap_moved", "symbols": ["inf_vp_ap_moved"], "postprocess": nt("bare_inf_cl_ap_moved")},
    {"name": "vbg_cl", "symbols": ["vbg_vp"], "postprocess": nt("vbg_cl")},
    {"name": "vbg_cl_np_moved", "symbols": ["vbg_vp_np_moved"], "postprocess": nt("vbg_cl_np_moved")},
    {"name": "vbg_cl_ap_moved", "symbols": ["vbg_vp_ap_moved"], "postprocess": nt("vbg_cl_ap_moved")},
    {"name": "vbn_cl", "symbols": ["vbn_vp"], "postprocess": nt("vbn_cl")},
    {"name": "vbn_cl_np_moved", "symbols": ["vbn_vp_np_moved"], "postprocess": nt("vbn_cl_np_moved")},
    {"name": "vbn_cl_ap_moved", "symbols": ["vbn_vp_ap_moved"], "postprocess": nt("vbn_cl_ap_moved")},
    {"name": "that_declarative_cl", "symbols": ["that", "bare_declarative_cl"], "postprocess": nt("that_declarative_cl")},
    {"name": "bare_declarative_cl", "symbols": ["fin_cl"], "postprocess": nt("bare_declarative_cl")},
    {"name": "exclamative_cl", "symbols": ["how", "advp", "fin_cl"], "postprocess": nt("exclamative_cl")},
    {"name": "exclamative_cl", "symbols": ["how", "ap", "np", "fin_vp_ap_moved"], "postprocess": nt("exclamative_cl")},
    {"name": "interrogative_cl", "symbols": ["wh_np", "np", "fin_vp_np_moved"], "postprocess": nt("interrogative_cl")},
    {"name": "interrogative_cl", "symbols": ["wh_np", "fin_vp"], "postprocess": nt("interrogative_cl")},
    {"name": "interrogative_cl", "symbols": ["wh_pp", "np", "fin_vp"], "postprocess": nt("interrogative_cl")},
    {"name": "interrogative_cl", "symbols": ["interrogative_subordinator", "np", "fin_vp"], "postprocess": nt("interrogative_cl")},
    {"name": "bare_declarative_cl_np_moved", "symbols": ["fin_vp"], "postprocess": nt("bare_declarative_cl_np_moved")},
    {"name": "bare_declarative_cl_np_moved", "symbols": ["np", "fin_vp_np_moved"], "postprocess": nt("bare_declarative_cl_np_moved")},
    {"name": "that_declarative_cl_np_moved", "symbols": ["that", "bare_declarative_cl_np_moved"], "postprocess": nt("that_declarative_cl_np_moved")},
    {"name": "bare_declarative_cl_ap_moved", "symbols": ["np", "fin_vp_ap_moved"], "postprocess": nt("bare_declarative_cl_ap_moved")},
    {"name": "bare_declarative_cl_ap_moved", "symbols": ["np", "fin_vp"], "postprocess": nt("bare_declarative_cl_ap_moved")},
    {"name": "that_declarative_cl_ap_moved", "symbols": ["that", "bare_declarative_cl_ap_moved"], "postprocess": nt("that_declarative_cl_ap_moved")},
    {"name": "np", "symbols": ["precorenp_modifier", "core_np", "postcorenp_modifier"], "postprocess": nt("np")},
    {"name": "core_np", "symbols": ["proper_noun"], "postprocess": nt("core_np")},
    {"name": "core_np", "symbols": ["pronoun"], "postprocess": nt("core_np")},
    {"name": "core_np", "symbols": ["independent_genitive_pronoun"], "postprocess": nt("core_np")},
    {"name": "core_np", "symbols": ["predeterminer_modifier?", "determiner?", "ap_list", "noun", "n_modifier_list"], "postprocess": nt("core_np")},
    {"name": "number", "symbols": ["digits"]},
    {"name": "number", "symbols": ["cardinal_number_eng"], "postprocess": nt("number")},
    {"name": "quantificational_expression", "symbols": ["quantificational_modifier"], "postprocess": nt("quantificational_expression")},
    {"name": "quantificational_expression", "symbols": ["number", "fraction_denominator"], "postprocess": nt("quantificational_expression")},
    {"name": "quantificational_expression", "symbols": ["number", "times"], "postprocess": nt("quantificational_expression")},
    {"name": "precore_emphatic_expression", "symbols": ["precore_emphatic_modifier"], "postprocess": nt("precore_emphatic_modifier")},
    {"name": "precore_emphatic_expression", "symbols": ["precore_emphatic_modifier_adj", "ap"], "postprocess": nt("precore_emphatic_modifier")},
    {"name": "predeterminer_modifier?", "symbols": [], "postprocess": nt("predeterminer_modifier")},
    {"name": "predeterminer_modifier?", "symbols": ["quantificational_expression"], "postprocess": nt("predeterminer_modifier")},
    {"name": "predeterminer_modifier?", "symbols": ["precore_emphatic_expression"], "postprocess": nt("predeterminer_modifier")},
    {"name": "wh_np", "symbols": ["wh"], "postprocess": nt("wh_np")},
    {"name": "wh_np", "symbols": ["wh", "np"], "postprocess": nt("wh_np")},
    {"name": "restrictive_correlative", "symbols": ["that"], "postprocess": nt("restrictive_correlative")},
    {"name": "restrictive_correlative", "symbols": ["which"], "postprocess": nt("restrictive_correlative")},
    {"name": "restrictive_cl", "symbols": ["restrictive_correlative", "fin_vp"], "postprocess": nt("restrictive_cl")},
    {"name": "restrictive_cl", "symbols": ["restrictive_correlative", "np", "fin_vp_np_moved"], "postprocess": nt("restrictive_cl")},
    {"name": "n_modifier", "symbols": ["restrictive_cl"], "postprocess": nt("n_modifier")},
    {"name": "n_modifier", "symbols": ["pp"], "postprocess": nt("n_modifier")},
    {"name": "n_modifier_list$ebnf$1", "symbols": []},
    {"name": "n_modifier_list$ebnf$1", "symbols": ["n_modifier_list$ebnf$1", "n_modifier"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "n_modifier_list", "symbols": ["n_modifier_list$ebnf$1"], "postprocess": nonterminal_unpack("n_modifier_list")},
    {"name": "determiner?", "symbols": [], "postprocess": nt("determiner")},
    {"name": "determiner?", "symbols": ["dp"], "postprocess": nt("determiner")},
    {"name": "determiner?", "symbols": ["genitive_np"], "postprocess": nt("determiner")},
    {"name": "genitive_np", "symbols": ["np", "s"], "postprocess": nt("genitive_np")},
    {"name": "genitive_np", "symbols": ["dependent_genitive_pronoun"], "postprocess": nt("genitive_np")},
    {"name": "dp_modifier?", "symbols": [], "postprocess": nt("dp_modifier?")},
    {"name": "dp_modifier?", "symbols": ["dp_modifier"], "postprocess": nt("dp_modifier?")},
    {"name": "dp", "symbols": ["dp_modifier?", "determinative"], "postprocess": nt("dp")},
    {"name": "dp", "symbols": ["dp_modifier?", "number"], "postprocess": nt("dp")},
    {"name": "adjunct", "symbols": ["pp"], "postprocess": nt("adjunct")},
    {"name": "adjunct", "symbols": ["advp"], "postprocess": nt("adjunct")},
    {"name": "adjunct_np_moved", "symbols": ["pp_np_moved"], "postprocess": nt("adjunct")},
    {"name": "pp", "symbols": ["preposition", "np"], "postprocess": nt("pp")},
    {"name": "pp_np_moved", "symbols": ["preposition"], "postprocess": nt("pp_np_moved")},
    {"name": "wh_pp", "symbols": ["preposition", "wh_np"], "postprocess": nt("wh_pp")},
    {"name": "ap", "symbols": ["advp", "ap"], "postprocess": nt("ap")},
    {"name": "ap", "symbols": ["adj"], "postprocess": nt("ap")},
    {"name": "ap", "symbols": ["adj_pp", "pp"], "postprocess": nt("ap")},
    {"name": "ap", "symbols": ["adj_bare_declarative_cl", "bare_declarative_cl"], "postprocess": nt("ap")},
    {"name": "ap", "symbols": ["adj_that_declarative_cl", "that_declarative_cl"], "postprocess": nt("ap")},
    {"name": "ap", "symbols": ["adj_to_inf_cl", "to_inf_cl"], "postprocess": nt("ap")},
    {"name": "ap_np_moved", "symbols": ["advp", "ap_np_moved"], "postprocess": nt("ap_np_moved")},
    {"name": "ap_np_moved", "symbols": ["adj_pp", "preposition"], "postprocess": nt("ap_np_moved")},
    {"name": "ap_np_moved", "symbols": ["adj_that_declarative_cl", "that_declarative_cl_np_moved"], "postprocess": nt("ap_np_moved")},
    {"name": "ap_np_moved", "symbols": ["adj_bare_declarative_cl", "bare_declarative_cl_np_moved"], "postprocess": nt("ap_np_moved")},
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
    {"name": "determinative", "symbols": [determinative], "postprocess": t("determinative")},
    {"name": "dp_modifier", "symbols": [dp_modifier], "postprocess": t("dp_modifier")},
    {"name": "pronoun", "symbols": [pronoun], "postprocess": t("pronoun")},
    {"name": "dependent_genitive_pronoun", "symbols": [genitive_pronoun], "postprocess": t("dependent_genitive_pronoun")},
    {"name": "independent_genitive_pronoun", "symbols": [genitive_pronoun], "postprocess": t("independent_genitive_pronoun")},
    {"name": "proper_noun", "symbols": [proper_noun], "postprocess": t("proper_noun")},
    {"name": "noun", "symbols": [noun], "postprocess": t("noun")},
    {"name": "preposition", "symbols": [preposition], "postprocess": t("preposition")},
    {"name": "to", "symbols": [to], "postprocess": t("to")},
    {"name": "s", "symbols": [s], "postprocess": t("s")},
    {"name": "not", "symbols": [not], "postprocess": t("not")},
    {"name": "that", "symbols": [that], "postprocess": t("that")},
    {"name": "interrogative_subordinator", "symbols": [interrogative_subordinator], "postprocess": t("interrogative_subordinator")},
    {"name": "times", "symbols": [times], "postprocess": t("times")},
    {"name": "cardinal_number_eng", "symbols": [cardinal_number_eng], "postprocess": t("cardinal_number_eng")},
    {"name": "digits", "symbols": [digits], "postprocess": t("digits")},
    {"name": "fraction_denominator", "symbols": [fraction_denominator], "postprocess": t("fraction_denominator")},
    {"name": "modal", "symbols": [modal], "postprocess": t("modal")},
    {"name": "vb", "symbols": [vb], "postprocess": t("vb")},
    {"name": "vb_ap", "symbols": [vb_ap], "postprocess": t("vb_ap")},
    {"name": "vb_to_inf_cl", "symbols": [vb_to_inf_cl], "postprocess": t("vb_to_inf_cl")},
    {"name": "vb_bare_inf_cl", "symbols": [vb_bare_inf_cl], "postprocess": t("vb_bare_inf_cl")},
    {"name": "vb_that_declarative_cl", "symbols": [vb_that_declarative_cl], "postprocess": t("vb_that_declarative_cl")},
    {"name": "vb_bare_declarative_cl", "symbols": [vb_bare_declarative_cl], "postprocess": t("vb_bare_declarative_cl")},
    {"name": "vb_exclamative_cl", "symbols": [vb_exclamative_cl], "postprocess": t("vb_exclamative_cl")},
    {"name": "vb_interrogative_cl", "symbols": [vb_interrogative_cl], "postprocess": t("vb_interrogative_cl")},
    {"name": "vb_vbg_cl", "symbols": [vb_vbg_cl], "postprocess": t("vb_vbg_cl")},
    {"name": "vb_vbn_cl", "symbols": [vb_vbn_cl], "postprocess": t("vb_vbn_cl")},
    {"name": "vb_np", "symbols": [vb_np], "postprocess": t("vb_np")},
    {"name": "vb_np_ap", "symbols": [vb_np_ap], "postprocess": t("vb_np_ap")},
    {"name": "vb_np_to_inf_cl", "symbols": [vb_np_to_inf_cl], "postprocess": t("vb_np_to_inf_cl")},
    {"name": "vb_np_bare_inf_cl", "symbols": [vb_np_bare_inf_cl], "postprocess": t("vb_np_bare_inf_cl")},
    {"name": "vb_np_that_declarative_cl", "symbols": [vb_np_that_declarative_cl], "postprocess": t("vb_np_that_declarative_cl")},
    {"name": "vb_np_bare_declarative_cl", "symbols": [vb_np_bare_declarative_cl], "postprocess": t("vb_np_bare_declarative_cl")},
    {"name": "vb_np_exclamative_cl", "symbols": [vb_np_exclamative_cl], "postprocess": t("vb_np_exclamative_cl")},
    {"name": "vb_np_interrogative_cl", "symbols": [vb_np_interrogative_cl], "postprocess": t("vb_np_interrogative_cl")},
    {"name": "vb_np_np", "symbols": [vb_np_np], "postprocess": t("vb_np_np")},
    {"name": "vbg", "symbols": [vbg], "postprocess": t("vbg")},
    {"name": "vbg_ap", "symbols": [vbg_ap], "postprocess": t("vbg_ap")},
    {"name": "vbg_to_inf_cl", "symbols": [vbg_to_inf_cl], "postprocess": t("vbg_to_inf_cl")},
    {"name": "vbg_bare_inf_cl", "symbols": [vbg_bare_inf_cl], "postprocess": t("vbg_bare_inf_cl")},
    {"name": "vbg_that_declarative_cl", "symbols": [vbg_that_declarative_cl], "postprocess": t("vbg_that_declarative_cl")},
    {"name": "vbg_bare_declarative_cl", "symbols": [vbg_bare_declarative_cl], "postprocess": t("vbg_bare_declarative_cl")},
    {"name": "vbg_exclamative_cl", "symbols": [vbg_exclamative_cl], "postprocess": t("vbg_exclamative_cl")},
    {"name": "vbg_interrogative_cl", "symbols": [vbg_interrogative_cl], "postprocess": t("vbg_interrogative_cl")},
    {"name": "vbg_vbg_cl", "symbols": [vbg_vbg_cl], "postprocess": t("vbg_vbg_cl")},
    {"name": "vbg_vbn_cl", "symbols": [vbg_vbn_cl], "postprocess": t("vbg_vbn_cl")},
    {"name": "vbg_np", "symbols": [vbg_np], "postprocess": t("vbg_np")},
    {"name": "vbg_np_ap", "symbols": [vbg_np_ap], "postprocess": t("vbg_np_ap")},
    {"name": "vbg_np_to_inf_cl", "symbols": [vbg_np_to_inf_cl], "postprocess": t("vbg_np_to_inf_cl")},
    {"name": "vbg_np_bare_inf_cl", "symbols": [vbg_np_bare_inf_cl], "postprocess": t("vbg_np_bare_inf_cl")},
    {"name": "vbg_np_that_declarative_cl", "symbols": [vbg_np_that_declarative_cl], "postprocess": t("vbg_np_that_declarative_cl")},
    {"name": "vbg_np_bare_declarative_cl", "symbols": [vbg_np_bare_declarative_cl], "postprocess": t("vbg_np_bare_declarative_cl")},
    {"name": "vbg_np_exclamative_cl", "symbols": [vbg_np_exclamative_cl], "postprocess": t("vbg_np_exclamative_cl")},
    {"name": "vbg_np_interrogative_cl", "symbols": [vbg_np_interrogative_cl], "postprocess": t("vbg_np_interrogative_cl")},
    {"name": "vbg_np_np", "symbols": [vbg_np_np], "postprocess": t("vbg_np_np")},
    {"name": "vbn", "symbols": [vbn], "postprocess": t("vbn")},
    {"name": "vbn_ap", "symbols": [vbn_ap], "postprocess": t("vbn_ap")},
    {"name": "vbn_to_inf_cl", "symbols": [vbn_to_inf_cl], "postprocess": t("vbn_to_inf_cl")},
    {"name": "vbn_bare_inf_cl", "symbols": [vbn_bare_inf_cl], "postprocess": t("vbn_bare_inf_cl")},
    {"name": "vbn_that_declarative_cl", "symbols": [vbn_that_declarative_cl], "postprocess": t("vbn_that_declarative_cl")},
    {"name": "vbn_bare_declarative_cl", "symbols": [vbn_bare_declarative_cl], "postprocess": t("vbn_bare_declarative_cl")},
    {"name": "vbn_exclamative_cl", "symbols": [vbn_exclamative_cl], "postprocess": t("vbn_exclamative_cl")},
    {"name": "vbn_interrogative_cl", "symbols": [vbn_interrogative_cl], "postprocess": t("vbn_interrogative_cl")},
    {"name": "vbn_vbg_cl", "symbols": [vbn_vbg_cl], "postprocess": t("vbn_vbg_cl")},
    {"name": "vbn_vbn_cl", "symbols": [vbn_vbn_cl], "postprocess": t("vbn_vbn_cl")},
    {"name": "vbn_np", "symbols": [vbn_np], "postprocess": t("vbn_np")},
    {"name": "vbn_np_ap", "symbols": [vbn_np_ap], "postprocess": t("vbn_np_ap")},
    {"name": "vbn_np_to_inf_cl", "symbols": [vbn_np_to_inf_cl], "postprocess": t("vbn_np_to_inf_cl")},
    {"name": "vbn_np_bare_inf_cl", "symbols": [vbn_np_bare_inf_cl], "postprocess": t("vbn_np_bare_inf_cl")},
    {"name": "vbn_np_that_declarative_cl", "symbols": [vbn_np_that_declarative_cl], "postprocess": t("vbn_np_that_declarative_cl")},
    {"name": "vbn_np_bare_declarative_cl", "symbols": [vbn_np_bare_declarative_cl], "postprocess": t("vbn_np_bare_declarative_cl")},
    {"name": "vbn_np_exclamative_cl", "symbols": [vbn_np_exclamative_cl], "postprocess": t("vbn_np_exclamative_cl")},
    {"name": "vbn_np_interrogative_cl", "symbols": [vbn_np_interrogative_cl], "postprocess": t("vbn_np_interrogative_cl")},
    {"name": "vbn_np_np", "symbols": [vbn_np_np], "postprocess": t("vbn_np_np")},
    {"name": "vbf", "symbols": [vbf], "postprocess": t("vbf")},
    {"name": "vbf_ap", "symbols": [vbf_ap], "postprocess": t("vbf_ap")},
    {"name": "vbf_to_inf_cl", "symbols": [vbf_to_inf_cl], "postprocess": t("vbf_to_inf_cl")},
    {"name": "vbf_bare_inf_cl", "symbols": [vbf_bare_inf_cl], "postprocess": t("vbf_bare_inf_cl")},
    {"name": "vbf_that_declarative_cl", "symbols": [vbf_that_declarative_cl], "postprocess": t("vbf_that_declarative_cl")},
    {"name": "vbf_bare_declarative_cl", "symbols": [vbf_bare_declarative_cl], "postprocess": t("vbf_bare_declarative_cl")},
    {"name": "vbf_exclamative_cl", "symbols": [vbf_exclamative_cl], "postprocess": t("vbf_exclamative_cl")},
    {"name": "vbf_interrogative_cl", "symbols": [vbf_interrogative_cl], "postprocess": t("vbf_interrogative_cl")},
    {"name": "vbf_vbg_cl", "symbols": [vbf_vbg_cl], "postprocess": t("vbf_vbg_cl")},
    {"name": "vbf_vbn_cl", "symbols": [vbf_vbn_cl], "postprocess": t("vbf_vbn_cl")},
    {"name": "vbf_np", "symbols": [vbf_np], "postprocess": t("vbf_np")},
    {"name": "vbf_np_ap", "symbols": [vbf_np_ap], "postprocess": t("vbf_np_ap")},
    {"name": "vbf_np_to_inf_cl", "symbols": [vbf_np_to_inf_cl], "postprocess": t("vbf_np_to_inf_cl")},
    {"name": "vbf_np_bare_inf_cl", "symbols": [vbf_np_bare_inf_cl], "postprocess": t("vbf_np_bare_inf_cl")},
    {"name": "vbf_np_that_declarative_cl", "symbols": [vbf_np_that_declarative_cl], "postprocess": t("vbf_np_that_declarative_cl")},
    {"name": "vbf_np_bare_declarative_cl", "symbols": [vbf_np_bare_declarative_cl], "postprocess": t("vbf_np_bare_declarative_cl")},
    {"name": "vbf_np_exclamative_cl", "symbols": [vbf_np_exclamative_cl], "postprocess": t("vbf_np_exclamative_cl")},
    {"name": "vbf_np_interrogative_cl", "symbols": [vbf_np_interrogative_cl], "postprocess": t("vbf_np_interrogative_cl")},
    {"name": "vbf_np_np", "symbols": [vbf_np_np], "postprocess": t("vbf_np_np")},
    {"name": "adj", "symbols": [adj], "postprocess": t("adj")},
    {"name": "adj_pp", "symbols": [adj_pp], "postprocess": t("adj_pp")},
    {"name": "adj_that_declarative_cl", "symbols": [adj_that_declarative_cl], "postprocess": t("adj_that_declarative_cl")},
    {"name": "adj_bare_declarative_cl", "symbols": [adj_bare_declarative_cl], "postprocess": t("adj_bare_declarative_cl")},
    {"name": "adj_to_inf_cl", "symbols": [adj_to_inf_cl], "postprocess": t("adj_to_inf_cl")},
    {"name": "adv", "symbols": [adv], "postprocess": t("adv")},
    {"name": "wh", "symbols": [wh], "postprocess": t("wh")},
    {"name": "why", "symbols": [why], "postprocess": t("why")},
    {"name": "how", "symbols": [how], "postprocess": t("how")},
    {"name": "which", "symbols": [which], "postprocess": t("which")},
    {"name": "precorenp_modifier", "symbols": [precorenp_modifier], "postprocess": t("precorenp_modifier")},
    {"name": "postcorenp_modifier", "symbols": [postcorenp_modifier], "postprocess": t("postcorenp_modifier")},
    {"name": "precore_emphatic_modifier", "symbols": [precore_emphatic_modifier], "postprocess": t("precore_emphatic_modifier")},
    {"name": "precore_emphatic_modifier_adj", "symbols": [precore_emphatic_modifier_adj], "postprocess": t("precore_emphatic_modifier_adj")},
    {"name": "quantificational_modifier", "symbols": [quantificational_modifier], "postprocess": t("quantificational_modifier")},
    {"name": "be_fin", "symbols": [be_fin], "postprocess": t("is_fin")},
    {"name": "do_fin", "symbols": [do_fin], "postprocess": t("do_fin")},
    {"name": "period", "symbols": [period], "postprocess": t("period")},
    {"name": "question_mark", "symbols": [question_mark], "postprocess": t("question_mark")},
    {"name": "exclamation_mark", "symbols": [exclamation_mark], "postprocess": t("exclamation_mark")}
];
let ParserStart = "text";
export default { Lexer, ParserRules, ParserStart };

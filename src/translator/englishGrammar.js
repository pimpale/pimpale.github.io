// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
function id(x) { return x[0]; }

import english from './english.json';

function isPoS(pos) {
  return {test: word => (english[word] ?? ["proper_noun_sg"]).includes(pos)}
}

function isAllOfPoS(pos_arr) {
  return {test: word => pos_arr.every(pos => (english[word]??["proper_noun_sg"]).includes(pos))}
}

// parts of speech
const determinative = isPoS("determinative");
const dp_modifier = isPoS("dp_modifier");
const pronoun_sg = isPoS("pronoun_sg");
const pronoun_pl = isPoS("pronoun_pl");
const independent_genitive_pronoun = isPoS("independent_genitive_pronoun");
const dependent_genitive_pronoun = isPoS("dependent_genitive_pronoun");
const proper_noun_sg = isPoS("proper_noun_sg");
const proper_noun_pl = isPoS("proper_noun_pl");
const noun_sg = isPoS("noun_sg");
const noun_pl = isPoS("noun_pl");
const preposition = isPoS("preposition");
const preposition_np = isPoS("preposition_np");
const preposition_predcomp = isPoS("preposition_predcomp");
const preposition_bare_declarative_cl = isPoS("preposition_bare_declarative_cl");
const preposition_pp = isPoS("preposition_pp");
const preposition_advp = isPoS("preposition_advp");


// particles
const to = isPoS("to");
const s = isPoS("s");
const not = isPoS("not");
const that = isPoS("that");
const interrogative_subordinator = isPoS("interrogative_subordinator");
const how = isPoS("how");
const why = isPoS("why");
const who = isPoS("who");
const whose = isPoS("whose");
const what = isPoS("what");
const where = isPoS("where");
const when = isPoS("when");
const which = isPoS("which");

// punctuation
const period = {test: x => x == "." };
const question_mark = { test: x => x == "?" };
const exclamation_mark = { test: x => x == "!" };
const comma = { test: x => x == "," };

// verbs

// Modal (MODAL)
const modal = isPoS("modal");

const inf = isPoS("inf");
const inf_predcomp = isPoS("inf_predcomp");
const inf_to_inf_cl = isPoS("inf_to_inf_cl");
const inf_bare_inf_cl = isPoS("inf_bare_inf_cl");
const inf_that_declarative_cl = isPoS("inf_that_declarative_cl");
const inf_bare_declarative_cl = isPoS("inf_bare_declarative_cl");
const inf_exclamative_cl = isPoS("inf_exclamative_cl");
const inf_interrogative_cl = isPoS("inf_interrogative_cl");
const inf_vbg_cl = isPoS("inf_vbg_cl");
const inf_vbn_cl = isPoS("inf_vbn_cl");
const inf_passive_cl = isPoS("inf_passive_cl");
const inf_o = isPoS("inf_o");
const inf_o_predcomp = isPoS("inf_o_predcomp");
const inf_intnp_to_inf_cl = isPoS("inf_intnp_to_inf_cl");
const inf_intnp_bare_inf_cl = isPoS("inf_intnp_bare_inf_cl");
const inf_io_that_declarative_cl = isPoS("inf_io_that_declarative_cl");
const inf_io_bare_declarative_cl = isPoS("inf_io_bare_declarative_cl");
const inf_io_exclamative_cl = isPoS("inf_io_exclamative_cl");
const inf_io_interrogative_cl = isPoS("inf_io_interrogative_cl");
const inf_io_do = isPoS("inf_io_do");


const vbg = isPoS("vbg");
const vbg_predcomp = isPoS("vbg_predcomp");
const vbg_to_inf_cl = isPoS("vbg_to_inf_cl");
const vbg_bare_inf_cl = isPoS("vbg_bare_inf_cl");
const vbg_that_declarative_cl = isPoS("vbg_that_declarative_cl");
const vbg_bare_declarative_cl = isPoS("vbg_bare_declarative_cl");
const vbg_exclamative_cl = isPoS("vbg_exclamative_cl");
const vbg_interrogative_cl = isPoS("vbg_interrogative_cl");
const vbg_vbg_cl = isPoS("vbg_vbg_cl");
const vbg_vbn_cl = isPoS("vbg_vbn_cl");
const vbg_passive_cl = isPoS("vbg_passive_cl");
const vbg_o = isPoS("vbg_o");
const vbg_o_predcomp = isPoS("vbg_o_predcomp");
const vbg_intnp_to_inf_cl = isPoS("vbg_intnp_to_inf_cl");
const vbg_intnp_bare_inf_cl = isPoS("vbg_intnp_bare_inf_cl");
const vbg_io_that_declarative_cl = isPoS("vbg_io_that_declarative_cl");
const vbg_io_bare_declarative_cl = isPoS("vbg_io_bare_declarative_cl");
const vbg_io_exclamative_cl = isPoS("vbg_io_exclamative_cl");
const vbg_io_interrogative_cl = isPoS("vbg_io_interrogative_cl");
const vbg_io_do = isPoS("vbg_io_do");


const vbn = isPoS("vbn");
const vbn_predcomp = isPoS("vbn_predcomp");
const vbn_to_inf_cl = isPoS("vbn_to_inf_cl");
const vbn_bare_inf_cl = isPoS("vbn_bare_inf_cl");
const vbn_that_declarative_cl = isPoS("vbn_that_declarative_cl");
const vbn_bare_declarative_cl = isPoS("vbn_bare_declarative_cl");
const vbn_exclamative_cl = isPoS("vbn_exclamative_cl");
const vbn_interrogative_cl = isPoS("vbn_interrogative_cl");
const vbn_vbg_cl = isPoS("vbn_vbg_cl");
const vbn_vbn_cl = isPoS("vbn_vbn_cl");
const vbn_passive_cl = isPoS("vbn_passive_cl");
const vbn_o = isPoS("vbn_o");
const vbn_o_predcomp = isPoS("vbn_o_predcomp");
const vbn_intnp_to_inf_cl = isPoS("vbn_intnp_to_inf_cl");
const vbn_intnp_bare_inf_cl = isPoS("vbn_intnp_bare_inf_cl");
const vbn_io_that_declarative_cl = isPoS("vbn_io_that_declarative_cl");
const vbn_io_bare_declarative_cl = isPoS("vbn_io_bare_declarative_cl");
const vbn_io_exclamative_cl = isPoS("vbn_io_exclamative_cl");
const vbn_io_interrogative_cl = isPoS("vbn_io_interrogative_cl");
const vbn_io_do = isPoS("vbn_io_do");


const vbf_sg = isPoS("vbf_sg");
const vbf_sg_predcomp = isPoS("vbf_sg_predcomp");
const vbf_sg_to_inf_cl = isPoS("vbf_sg_to_inf_cl");
const vbf_sg_bare_inf_cl = isPoS("vbf_sg_bare_inf_cl");
const vbf_sg_that_declarative_cl = isPoS("vbf_sg_that_declarative_cl");
const vbf_sg_bare_declarative_cl = isPoS("vbf_sg_bare_declarative_cl");
const vbf_sg_exclamative_cl = isPoS("vbf_sg_exclamative_cl");
const vbf_sg_interrogative_cl = isPoS("vbf_sg_interrogative_cl");
const vbf_sg_vbg_cl = isPoS("vbf_sg_vbg_cl");
const vbf_sg_vbn_cl = isPoS("vbf_sg_vbn_cl");
const vbf_sg_passive_cl = isPoS("vbf_sg_passive_cl");
const vbf_sg_o = isPoS("vbf_sg_o");
const vbf_sg_o_predcomp = isPoS("vbf_sg_o_predcomp");
const vbf_sg_intnp_to_inf_cl = isPoS("vbf_sg_intnp_to_inf_cl");
const vbf_sg_intnp_bare_inf_cl = isPoS("vbf_sg_intnp_bare_inf_cl");
const vbf_sg_io_that_declarative_cl = isPoS("vbf_sg_io_that_declarative_cl");
const vbf_sg_io_bare_declarative_cl = isPoS("vbf_sg_io_bare_declarative_cl");
const vbf_sg_io_exclamative_cl = isPoS("vbf_sg_io_exclamative_cl");
const vbf_sg_io_interrogative_cl = isPoS("vbf_sg_io_interrogative_cl");
const vbf_sg_io_do = isPoS("vbf_sg_io_do");


const vbf_pl = isPoS("vbf_pl");
const vbf_pl_predcomp = isPoS("vbf_pl_predcomp");
const vbf_pl_to_inf_cl = isPoS("vbf_pl_to_inf_cl");
const vbf_pl_bare_inf_cl = isPoS("vbf_pl_bare_inf_cl");
const vbf_pl_that_declarative_cl = isPoS("vbf_pl_that_declarative_cl");
const vbf_pl_bare_declarative_cl = isPoS("vbf_pl_bare_declarative_cl");
const vbf_pl_exclamative_cl = isPoS("vbf_pl_exclamative_cl");
const vbf_pl_interrogative_cl = isPoS("vbf_pl_interrogative_cl");
const vbf_pl_vbg_cl = isPoS("vbf_pl_vbg_cl");
const vbf_pl_vbn_cl = isPoS("vbf_pl_vbn_cl");
const vbf_pl_passive_cl = isPoS("vbf_pl_passive_cl");
const vbf_pl_o = isPoS("vbf_pl_o");
const vbf_pl_o_predcomp = isPoS("vbf_pl_o_predcomp");
const vbf_pl_intnp_to_inf_cl = isPoS("vbf_pl_intnp_to_inf_cl");
const vbf_pl_intnp_bare_inf_cl = isPoS("vbf_pl_intnp_bare_inf_cl");
const vbf_pl_io_that_declarative_cl = isPoS("vbf_pl_io_that_declarative_cl");
const vbf_pl_io_bare_declarative_cl = isPoS("vbf_pl_io_bare_declarative_cl");
const vbf_pl_io_exclamative_cl = isPoS("vbf_pl_io_exclamative_cl");
const vbf_pl_io_interrogative_cl = isPoS("vbf_pl_io_interrogative_cl");
const vbf_pl_io_do = isPoS("vbf_pl_io_do");


const aux_vbf_sg_predcomp = isAllOfPoS(["vbf_sg_predcomp", "aux"]);
const aux_vbf_sg_o = isAllOfPoS(["vbf_sg_o", "aux"]);
const aux_vbf_sg_vbg_cl = isAllOfPoS(["vbf_sg_vbg_cl", "aux"]);
const aux_vbf_sg_vbn_cl = isAllOfPoS(["vbf_sg_vbn_cl", "aux"]);
const aux_vbf_sg_passive_cl = isAllOfPoS(["vbf_sg_passive_cl", "aux"]);
const aux_vbf_sg_bare_inf_cl = isAllOfPoS(["vbf_sg_bare_inf_cl", "aux"]);
const aux_vbf_pl_predcomp = isAllOfPoS(["vbf_pl_predcomp", "aux"]);
const aux_vbf_pl_o = isAllOfPoS(["vbf_pl_o", "aux"]);
const aux_vbf_pl_vbg_cl = isAllOfPoS(["vbf_pl_vbg_cl", "aux"]);
const aux_vbf_pl_vbn_cl = isAllOfPoS(["vbf_pl_vbn_cl", "aux"]);
const aux_vbf_pl_passive_cl = isAllOfPoS(["vbf_pl_passive_cl", "aux"]);
const aux_vbf_pl_bare_inf_cl = isAllOfPoS(["vbf_pl_bare_inf_cl", "aux"]);

// certain nouns with special treatment
const times = isPoS("times");
const cardinal_number_eng = isPoS("cardinal_number_eng");
const digits = { test: word => !isNaN(word) };
const fraction_denominator = isPoS("fraction_denominator");

// adjectives
const adj = isPoS("adj");
const adj_pp = isPoS("adj_pp");
const adj_that_declarative_cl = isPoS("adj_that_declarative_cl");
const adj_bare_declarative_cl = isPoS("adj_bare_declarative_cl");
const adj_to_inf_cl = isPoS("adj_to_inf_cl");

// adverbs
const adv = isPoS("adv");
const adv_vp = isPoS("adv_vp");
const precorenp_modifier = isPoS("precorenp_modifier");
const postcorenp_modifier = isPoS("postcorenp_modifier");
const quantificational_modifier = isPoS("quantificational_modifier");
const precore_emphatic_modifier = isPoS("precore_emphatic_modifier");
const precore_emphatic_modifier_adjp  = isPoS("precore_emphatic_modifier_adjp ");

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
    {"name": "fin_cl", "symbols": ["precl_adjunct_list", "np_sg", "vbf_sg_vp"], "postprocess": nt("fin_cl")},
    {"name": "fin_cl", "symbols": ["precl_adjunct_list", "np_pl", "vbf_pl_vp"], "postprocess": nt("fin_cl")},
    {"name": "precl_adjunct_list", "symbols": ["adjunct_list"], "postprocess": nt("precl_adjunct_list")},
    {"name": "precl_adjunct_list", "symbols": ["adjunct_list", "comma"], "postprocess": nt("precl_adjunct_list")},
    {"name": "question_cl", "symbols": ["subj_aux_inv_cl"], "postprocess": nt("question_cl")},
    {"name": "question_cl", "symbols": ["ip_np", "subj_aux_inv_cl_minus_np"], "postprocess": nt("question_cl")},
    {"name": "question_cl", "symbols": ["ip_np_sg", "vbf_sg_vp"], "postprocess": nt("question_cl")},
    {"name": "question_cl", "symbols": ["ip_np_pl", "vbf_pl_vp"], "postprocess": nt("question_cl")},
    {"name": "question_cl", "symbols": ["ip_pp", "subj_aux_inv_cl"], "postprocess": nt("question_cl")},
    {"name": "question_cl", "symbols": ["ip_advp_vp", "subj_aux_inv_cl"], "postprocess": nt("question_cl")},
    {"name": "question_cl", "symbols": ["ip_adjp", "subj_aux_inv_cl_minus_adjp"], "postprocess": nt("question_cl")},
    {"name": "subj_aux_inv_cl", "symbols": ["modal", "np", "adjunct_list_bare_inf_cl"], "postprocess": nt("subj_aux_inv_cl")},
    {"name": "subj_aux_inv_cl", "symbols": ["aux_vbf_sg_predcomp", "np_sg", "adjunct_list_predcomp"], "postprocess": nt("subj_aux_inv_cl")},
    {"name": "subj_aux_inv_cl", "symbols": ["aux_vbf_sg_o", "np_sg", "adjunct_list_o"], "postprocess": nt("subj_aux_inv_cl")},
    {"name": "subj_aux_inv_cl", "symbols": ["aux_vbf_sg_vbg_cl", "np_sg", "vbg_cl"], "postprocess": nt("subj_aux_inv_cl")},
    {"name": "subj_aux_inv_cl", "symbols": ["aux_vbf_sg_vbn_cl", "np_sg", "vbn_cl"], "postprocess": nt("subj_aux_inv_cl")},
    {"name": "subj_aux_inv_cl", "symbols": ["aux_vbf_sg_passive_cl", "np_sg", "passive_cl"], "postprocess": nt("subj_aux_inv_cl")},
    {"name": "subj_aux_inv_cl", "symbols": ["aux_vbf_sg_bare_inf_cl", "np_sg", "adjunct_list_bare_inf_cl"], "postprocess": nt("subj_aux_inv_cl")},
    {"name": "subj_aux_inv_cl", "symbols": ["aux_vbf_pl_predcomp", "np_pl", "adjunct_list_predcomp"], "postprocess": nt("subj_aux_inv_cl")},
    {"name": "subj_aux_inv_cl", "symbols": ["aux_vbf_pl_o", "np_pl", "adjunct_list_o"], "postprocess": nt("subj_aux_inv_cl")},
    {"name": "subj_aux_inv_cl", "symbols": ["aux_vbf_pl_vbg_cl", "np_pl", "vbg_cl"], "postprocess": nt("subj_aux_inv_cl")},
    {"name": "subj_aux_inv_cl", "symbols": ["aux_vbf_pl_vbn_cl", "np_pl", "vbn_cl"], "postprocess": nt("subj_aux_inv_cl")},
    {"name": "subj_aux_inv_cl", "symbols": ["aux_vbf_pl_passive_cl", "np_pl", "passive_cl"], "postprocess": nt("subj_aux_inv_cl")},
    {"name": "subj_aux_inv_cl", "symbols": ["aux_vbf_pl_bare_inf_cl", "np_pl", "adjunct_list_bare_inf_cl"], "postprocess": nt("subj_aux_inv_cl")},
    {"name": "subj_aux_inv_cl_minus_np", "symbols": ["modal", "np", "adjunct_list_bare_inf_cl_minus_np"], "postprocess": nt("subj_aux_inv_cl_minus_np")},
    {"name": "subj_aux_inv_cl_minus_np", "symbols": ["aux_vbf_sg_predcomp", "np_sg", "adjunct_list_predcomp_minus_np"], "postprocess": nt("subj_aux_inv_cl_minus_np")},
    {"name": "subj_aux_inv_cl_minus_np", "symbols": ["aux_vbf_sg_o", "np_sg", "adjunct_list_o_minus_np"], "postprocess": nt("subj_aux_inv_cl_minus_np")},
    {"name": "subj_aux_inv_cl_minus_np", "symbols": ["aux_vbf_sg_vbg_cl", "np_sg", "vbg_cl_minus_np"], "postprocess": nt("subj_aux_inv_cl_minus_np")},
    {"name": "subj_aux_inv_cl_minus_np", "symbols": ["aux_vbf_sg_vbn_cl", "np_sg", "vbn_cl_minus_np"], "postprocess": nt("subj_aux_inv_cl_minus_np")},
    {"name": "subj_aux_inv_cl_minus_np", "symbols": ["aux_vbf_sg_passive_cl", "np_sg", "passive_cl_minus_np"], "postprocess": nt("subj_aux_inv_cl_minus_np")},
    {"name": "subj_aux_inv_cl_minus_np", "symbols": ["aux_vbf_sg_bare_inf_cl", "np_sg", "adjunct_list_bare_inf_cl_minus_np"], "postprocess": nt("subj_aux_inv_cl_minus_np")},
    {"name": "subj_aux_inv_cl_minus_np", "symbols": ["aux_vbf_pl_predcomp", "np_pl", "adjunct_list_predcomp_minus_np"], "postprocess": nt("subj_aux_inv_cl_minus_np")},
    {"name": "subj_aux_inv_cl_minus_np", "symbols": ["aux_vbf_pl_o", "np_pl", "adjunct_list_o_minus_np"], "postprocess": nt("subj_aux_inv_cl_minus_np")},
    {"name": "subj_aux_inv_cl_minus_np", "symbols": ["aux_vbf_pl_vbg_cl", "np_pl", "vbg_cl_minus_np"], "postprocess": nt("subj_aux_inv_cl_minus_np")},
    {"name": "subj_aux_inv_cl_minus_np", "symbols": ["aux_vbf_pl_vbn_cl", "np_pl", "vbn_cl_minus_np"], "postprocess": nt("subj_aux_inv_cl_minus_np")},
    {"name": "subj_aux_inv_cl_minus_np", "symbols": ["aux_vbf_pl_passive_cl", "np_pl", "passive_cl_minus_np"], "postprocess": nt("subj_aux_inv_cl_minus_np")},
    {"name": "subj_aux_inv_cl_minus_np", "symbols": ["aux_vbf_pl_bare_inf_cl", "np_pl", "adjunct_list_bare_inf_cl_minus_np"], "postprocess": nt("subj_aux_inv_cl_minus_np")},
    {"name": "subj_aux_inv_cl_minus_adjp", "symbols": ["modal", "np", "adjunct_list_bare_inf_cl_minus_adjp"], "postprocess": nt("subj_aux_inv_cl_minus_adjp")},
    {"name": "subj_aux_inv_cl_minus_adjp", "symbols": ["aux_vbf_sg_predcomp", "np_sg", "adjunct_list_predcomp_minus_adjp"], "postprocess": nt("subj_aux_inv_cl_minus_adjp")},
    {"name": "subj_aux_inv_cl_minus_adjp", "symbols": ["aux_vbf_sg_o", "np_sg", "adjunct_list_o_minus_adjp"], "postprocess": nt("subj_aux_inv_cl_minus_adjp")},
    {"name": "subj_aux_inv_cl_minus_adjp", "symbols": ["aux_vbf_sg_vbg_cl", "np_sg", "vbg_cl_minus_adjp"], "postprocess": nt("subj_aux_inv_cl_minus_adjp")},
    {"name": "subj_aux_inv_cl_minus_adjp", "symbols": ["aux_vbf_sg_vbn_cl", "np_sg", "vbn_cl_minus_adjp"], "postprocess": nt("subj_aux_inv_cl_minus_adjp")},
    {"name": "subj_aux_inv_cl_minus_adjp", "symbols": ["aux_vbf_sg_passive_cl", "np_sg", "passive_cl_minus_adjp"], "postprocess": nt("subj_aux_inv_cl_minus_adjp")},
    {"name": "subj_aux_inv_cl_minus_adjp", "symbols": ["aux_vbf_sg_bare_inf_cl", "np_sg", "adjunct_list_bare_inf_cl_minus_adjp"], "postprocess": nt("subj_aux_inv_cl_minus_adjp")},
    {"name": "subj_aux_inv_cl_minus_adjp", "symbols": ["aux_vbf_pl_predcomp", "np_pl", "adjunct_list_predcomp_minus_adjp"], "postprocess": nt("subj_aux_inv_cl_minus_adjp")},
    {"name": "subj_aux_inv_cl_minus_adjp", "symbols": ["aux_vbf_pl_o", "np_pl", "adjunct_list_o_minus_adjp"], "postprocess": nt("subj_aux_inv_cl_minus_adjp")},
    {"name": "subj_aux_inv_cl_minus_adjp", "symbols": ["aux_vbf_pl_vbg_cl", "np_pl", "vbg_cl_minus_adjp"], "postprocess": nt("subj_aux_inv_cl_minus_adjp")},
    {"name": "subj_aux_inv_cl_minus_adjp", "symbols": ["aux_vbf_pl_vbn_cl", "np_pl", "vbn_cl_minus_adjp"], "postprocess": nt("subj_aux_inv_cl_minus_adjp")},
    {"name": "subj_aux_inv_cl_minus_adjp", "symbols": ["aux_vbf_pl_passive_cl", "np_pl", "passive_cl_minus_adjp"], "postprocess": nt("subj_aux_inv_cl_minus_adjp")},
    {"name": "subj_aux_inv_cl_minus_adjp", "symbols": ["aux_vbf_pl_bare_inf_cl", "np_pl", "adjunct_list_bare_inf_cl_minus_adjp"], "postprocess": nt("subj_aux_inv_cl_minus_adjp")},
    {"name": "adjunct_list", "symbols": ["adjunct", "adjunct_list"], "postprocess": nt("adjunct_list")},
    {"name": "adjunct_list", "symbols": [], "postprocess": nt("adjunct_list")},
    {"name": "adjunct_list_predcomp", "symbols": ["predcomp", "adjunct_list"], "postprocess": nt("adjunct_list_predcomp")},
    {"name": "adjunct_list_to_inf_cl", "symbols": ["adjunct", "adjunct_list_to_inf_cl"], "postprocess": nt("adjunct_list_to_inf_cl")},
    {"name": "adjunct_list_to_inf_cl", "symbols": ["to_inf_cl", "adjunct_list"], "postprocess": nt("adjunct_list_to_inf_cl")},
    {"name": "adjunct_list_bare_inf_cl", "symbols": ["bare_inf_cl"], "postprocess": nt("adjunct_list_bare_inf_cl")},
    {"name": "adjunct_list_that_declarative_cl", "symbols": ["that_declarative_cl", "adjunct_list"], "postprocess": nt("adjunct_list_that_declarative_cl")},
    {"name": "adjunct_list_that_declarative_cl", "symbols": ["adjunct", "adjunct_list_that_declarative_cl"], "postprocess": nt("adjunct_list_that_declarative_cl")},
    {"name": "adjunct_list_bare_declarative_cl", "symbols": ["bare_declarative_cl", "adjunct_list"], "postprocess": nt("adjunct_list_bare_declarative_cl")},
    {"name": "adjunct_list_bare_declarative_cl", "symbols": ["adjunct", "adjunct_list_bare_declarative_cl"], "postprocess": nt("adjunct_list_bare_declarative_cl")},
    {"name": "adjunct_list_exclamative_cl", "symbols": ["exclamative_cl", "adjunct_list"], "postprocess": nt("adjunct_list_exclamative_cl")},
    {"name": "adjunct_list_exclamative_cl", "symbols": ["adjunct", "adjunct_list_exclamative_cl"], "postprocess": nt("adjunct_list_exclamative_cl")},
    {"name": "adjunct_list_interrogative_cl", "symbols": ["interrogative_cl", "adjunct_list"], "postprocess": nt("adjunct_list_interrogative_cl")},
    {"name": "adjunct_list_interrogative_cl", "symbols": ["adjunct", "adjunct_list_interrogative_cl"], "postprocess": nt("adjunct_list_interrogative_cl")},
    {"name": "adjunct_list_o", "symbols": ["np", "adjunct_list"], "postprocess": nt("adjunct_list_o")},
    {"name": "adjunct_list_o_predcomp", "symbols": ["np", "adjunct_list_o_predcomp"], "postprocess": nt("adjunct_list_o_predcomp")},
    {"name": "adjunct_list_o_predcomp", "symbols": ["predcomp", "adjunct_list_o"], "postprocess": nt("adjunct_list_o_predcomp")},
    {"name": "adjunct_list_intnp_to_inf_cl", "symbols": ["np", "adjunct_list_to_inf_cl"], "postprocess": nt("adjunct_list_intnp_to_inf_cl")},
    {"name": "adjunct_list_intnp_bare_inf_cl", "symbols": ["np", "adjunct_list_bare_inf_cl"], "postprocess": nt("adjunct_list_intnp_bare_inf_cl")},
    {"name": "adjunct_list_io_that_declarative_cl", "symbols": ["np", "adjunct_list_that_declarative_cl"], "postprocess": nt("adjunct_list_io_that_declarative_cl")},
    {"name": "adjunct_list_io_bare_declarative_cl", "symbols": ["np", "adjunct_list_bare_declarative_cl"], "postprocess": nt("adjunct_list_io_bare_declarative_cl")},
    {"name": "adjunct_list_io_exclamative_cl", "symbols": ["np", "adjunct_list_exclamative_cl"], "postprocess": nt("adjunct_list_io_exclamative_cl")},
    {"name": "adjunct_list_io_interrogative_cl", "symbols": ["np", "adjunct_list_interrogative_cl"], "postprocess": nt("adjunct_list_io_interrogative_cl")},
    {"name": "adjunct_list_io_do", "symbols": ["np", "adjunct_list_o"], "postprocess": nt("adjunct_list_io_do")},
    {"name": "adjunct_list_dative_to", "symbols": ["adjunct", "adjunct_list_dative_to"], "postprocess": nt("adjunct_list_dative_to")},
    {"name": "adjunct_list_dative_to", "symbols": ["dative_to", "adjunct_list"], "postprocess": nt("adjunct_list_dative_to")},
    {"name": "adjunct_list_do_dative_to", "symbols": ["np", "adjunct_list_dative_to"], "postprocess": nt("adjunct_list_do_dative_to")},
    {"name": "adjunct_list_do_dative_to", "symbols": ["dative_to", "adjunct_list_o"], "postprocess": nt("adjunct_list_do_dative_to")},
    {"name": "adjunct_list_passive_o", "symbols": ["adjunct_list"], "postprocess": nt("adjunct_list_passive_o")},
    {"name": "adjunct_list_passive_o_predcomp", "symbols": ["adjunct_list_predcomp"], "postprocess": nt("adjunct_list_passive_o_predcomp")},
    {"name": "adjunct_list_passive_intnp_to_inf_cl", "symbols": ["adjunct_list_to_inf_cl"], "postprocess": nt("adjunct_list_passive_intnp_to_inf_cl")},
    {"name": "adjunct_list_passive_io_that_declarative_cl", "symbols": ["adjunct_list_that_declarative_cl"], "postprocess": nt("adjunct_list_passive_io_that_declarative_cl")},
    {"name": "adjunct_list_passive_io_bare_declarative_cl", "symbols": ["adjunct_list_bare_declarative_cl"], "postprocess": nt("adjunct_list_passive_io_bare_declarative_cl")},
    {"name": "adjunct_list_passive_io_exclamative_cl", "symbols": ["adjunct_list_exclamative_cl"], "postprocess": nt("adjunct_list_passive_io_exclamative_cl")},
    {"name": "adjunct_list_passive_io_interrogative_cl", "symbols": ["adjunct_list_interrogative_cl"], "postprocess": nt("adjunct_list_passive_io_interrogative_cl")},
    {"name": "adjunct_list_passive_io_do", "symbols": ["adjunct_list_o"], "postprocess": nt("adjunct_list_passive_io_do")},
    {"name": "adjunct_list_passive_do_dative_to", "symbols": ["adjunct_list_dative_to"], "postprocess": nt("adjunct_list_passive_do_dative_to")},
    {"name": "vbf_sg_vp", "symbols": ["advp_vp?", "modal", "bare_inf_cl"], "postprocess": nt("vbf_sg_vp")},
    {"name": "vbf_sg_vp", "symbols": ["advp_vp?", "vbf_sg", "adjunct_list"], "postprocess": nt("vbf_sg_vp")},
    {"name": "vbf_sg_vp", "symbols": ["advp_vp?", "vbf_sg_predcomp", "adjunct_list_predcomp"], "postprocess": nt("vbf_sg_vp")},
    {"name": "vbf_sg_vp", "symbols": ["advp_vp?", "vbf_sg_to_inf_cl", "adjunct_list_to_inf_cl"], "postprocess": nt("vbf_sg_vp")},
    {"name": "vbf_sg_vp", "symbols": ["advp_vp?", "vbf_sg_bare_inf_cl", "adjunct_list_bare_inf_cl"], "postprocess": nt("vbf_sg_vp")},
    {"name": "vbf_sg_vp", "symbols": ["advp_vp?", "vbf_sg_that_declarative_cl", "adjunct_list_that_declarative_cl"], "postprocess": nt("vbf_sg_vp")},
    {"name": "vbf_sg_vp", "symbols": ["advp_vp?", "vbf_sg_bare_declarative_cl", "adjunct_list_bare_declarative_cl"], "postprocess": nt("vbf_sg_vp")},
    {"name": "vbf_sg_vp", "symbols": ["advp_vp?", "vbf_sg_exclamative_cl", "adjunct_list_exclamative_cl"], "postprocess": nt("vbf_sg_vp")},
    {"name": "vbf_sg_vp", "symbols": ["advp_vp?", "vbf_sg_interrogative_cl", "adjunct_list_interrogative_cl"], "postprocess": nt("vbf_sg_vp")},
    {"name": "vbf_sg_vp", "symbols": ["advp_vp?", "vbf_sg_vbg_cl", "vbg_cl"], "postprocess": nt("vbf_sg_vp")},
    {"name": "vbf_sg_vp", "symbols": ["advp_vp?", "vbf_sg_vbn_cl", "vbn_cl"], "postprocess": nt("vbf_sg_vp")},
    {"name": "vbf_sg_vp", "symbols": ["advp_vp?", "vbf_sg_passive_cl", "passive_cl"], "postprocess": nt("vbf_sg_vp")},
    {"name": "vbf_sg_vp", "symbols": ["advp_vp?", "vbf_sg_o", "adjunct_list_o"], "postprocess": nt("vbf_sg_vp")},
    {"name": "vbf_sg_vp", "symbols": ["advp_vp?", "vbf_sg_o_predcomp", "adjunct_list_o_predcomp"], "postprocess": nt("vbf_sg_vp")},
    {"name": "vbf_sg_vp", "symbols": ["advp_vp?", "vbf_sg_intnp_to_inf_cl", "adjunct_list_intnp_to_inf_cl"], "postprocess": nt("vbf_sg_vp")},
    {"name": "vbf_sg_vp", "symbols": ["advp_vp?", "vbf_sg_intnp_bare_inf_cl", "adjunct_list_intnp_bare_inf_cl"], "postprocess": nt("vbf_sg_vp")},
    {"name": "vbf_sg_vp", "symbols": ["advp_vp?", "vbf_sg_io_that_declarative_cl", "adjunct_list_io_that_declarative_cl"], "postprocess": nt("vbf_sg_vp")},
    {"name": "vbf_sg_vp", "symbols": ["advp_vp?", "vbf_sg_io_bare_declarative_cl", "adjunct_list_io_bare_declarative_cl"], "postprocess": nt("vbf_sg_vp")},
    {"name": "vbf_sg_vp", "symbols": ["advp_vp?", "vbf_sg_io_exclamative_cl", "adjunct_list_io_exclamative_cl"], "postprocess": nt("vbf_sg_vp")},
    {"name": "vbf_sg_vp", "symbols": ["advp_vp?", "vbf_sg_io_interrogative_cl", "adjunct_list_io_interrogative_cl"], "postprocess": nt("vbf_sg_vp")},
    {"name": "vbf_sg_vp", "symbols": ["advp_vp?", "vbf_sg_io_do", "adjunct_list_io_do"], "postprocess": nt("vbf_sg_vp")},
    {"name": "vbf_sg_vp", "symbols": ["advp_vp?", "vbf_sg_io_do", "adjunct_list_do_dative_to"], "postprocess": nt("vbf_sg_vp")},
    {"name": "vbf_pl_vp", "symbols": ["advp_vp?", "modal", "bare_inf_cl"], "postprocess": nt("vbf_pl_vp")},
    {"name": "vbf_pl_vp", "symbols": ["advp_vp?", "vbf_pl", "adjunct_list"], "postprocess": nt("vbf_pl_vp")},
    {"name": "vbf_pl_vp", "symbols": ["advp_vp?", "vbf_pl_predcomp", "adjunct_list_predcomp"], "postprocess": nt("vbf_pl_vp")},
    {"name": "vbf_pl_vp", "symbols": ["advp_vp?", "vbf_pl_to_inf_cl", "adjunct_list_to_inf_cl"], "postprocess": nt("vbf_pl_vp")},
    {"name": "vbf_pl_vp", "symbols": ["advp_vp?", "vbf_pl_bare_inf_cl", "adjunct_list_bare_inf_cl"], "postprocess": nt("vbf_pl_vp")},
    {"name": "vbf_pl_vp", "symbols": ["advp_vp?", "vbf_pl_that_declarative_cl", "adjunct_list_that_declarative_cl"], "postprocess": nt("vbf_pl_vp")},
    {"name": "vbf_pl_vp", "symbols": ["advp_vp?", "vbf_pl_bare_declarative_cl", "adjunct_list_bare_declarative_cl"], "postprocess": nt("vbf_pl_vp")},
    {"name": "vbf_pl_vp", "symbols": ["advp_vp?", "vbf_pl_exclamative_cl", "adjunct_list_exclamative_cl"], "postprocess": nt("vbf_pl_vp")},
    {"name": "vbf_pl_vp", "symbols": ["advp_vp?", "vbf_pl_interrogative_cl", "adjunct_list_interrogative_cl"], "postprocess": nt("vbf_pl_vp")},
    {"name": "vbf_pl_vp", "symbols": ["advp_vp?", "vbf_pl_vbg_cl", "vbg_cl"], "postprocess": nt("vbf_pl_vp")},
    {"name": "vbf_pl_vp", "symbols": ["advp_vp?", "vbf_pl_vbn_cl", "vbn_cl"], "postprocess": nt("vbf_pl_vp")},
    {"name": "vbf_pl_vp", "symbols": ["advp_vp?", "vbf_pl_passive_cl", "passive_cl"], "postprocess": nt("vbf_pl_vp")},
    {"name": "vbf_pl_vp", "symbols": ["advp_vp?", "vbf_pl_o", "adjunct_list_o"], "postprocess": nt("vbf_pl_vp")},
    {"name": "vbf_pl_vp", "symbols": ["advp_vp?", "vbf_pl_o_predcomp", "adjunct_list_o_predcomp"], "postprocess": nt("vbf_pl_vp")},
    {"name": "vbf_pl_vp", "symbols": ["advp_vp?", "vbf_pl_intnp_to_inf_cl", "adjunct_list_intnp_to_inf_cl"], "postprocess": nt("vbf_pl_vp")},
    {"name": "vbf_pl_vp", "symbols": ["advp_vp?", "vbf_pl_intnp_bare_inf_cl", "adjunct_list_intnp_bare_inf_cl"], "postprocess": nt("vbf_pl_vp")},
    {"name": "vbf_pl_vp", "symbols": ["advp_vp?", "vbf_pl_io_that_declarative_cl", "adjunct_list_io_that_declarative_cl"], "postprocess": nt("vbf_pl_vp")},
    {"name": "vbf_pl_vp", "symbols": ["advp_vp?", "vbf_pl_io_bare_declarative_cl", "adjunct_list_io_bare_declarative_cl"], "postprocess": nt("vbf_pl_vp")},
    {"name": "vbf_pl_vp", "symbols": ["advp_vp?", "vbf_pl_io_exclamative_cl", "adjunct_list_io_exclamative_cl"], "postprocess": nt("vbf_pl_vp")},
    {"name": "vbf_pl_vp", "symbols": ["advp_vp?", "vbf_pl_io_interrogative_cl", "adjunct_list_io_interrogative_cl"], "postprocess": nt("vbf_pl_vp")},
    {"name": "vbf_pl_vp", "symbols": ["advp_vp?", "vbf_pl_io_do", "adjunct_list_io_do"], "postprocess": nt("vbf_pl_vp")},
    {"name": "vbf_pl_vp", "symbols": ["advp_vp?", "vbf_pl_io_do", "adjunct_list_do_dative_to"], "postprocess": nt("vbf_pl_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "inf", "adjunct_list"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "inf_predcomp", "adjunct_list_predcomp"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "inf_to_inf_cl", "adjunct_list_to_inf_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "inf_bare_inf_cl", "adjunct_list_bare_inf_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "inf_that_declarative_cl", "adjunct_list_that_declarative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "inf_bare_declarative_cl", "adjunct_list_bare_declarative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "inf_exclamative_cl", "adjunct_list_exclamative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "inf_interrogative_cl", "adjunct_list_interrogative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "inf_vbg_cl", "vbg_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "inf_vbn_cl", "vbn_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "inf_passive_cl", "passive_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "inf_o", "adjunct_list_o"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "inf_o_predcomp", "adjunct_list_o_predcomp"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "inf_intnp_to_inf_cl", "adjunct_list_intnp_to_inf_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "inf_intnp_bare_inf_cl", "adjunct_list_intnp_bare_inf_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "inf_io_that_declarative_cl", "adjunct_list_io_that_declarative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "inf_io_bare_declarative_cl", "adjunct_list_io_bare_declarative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "inf_io_exclamative_cl", "adjunct_list_io_exclamative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "inf_io_interrogative_cl", "adjunct_list_io_interrogative_cl"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "inf_io_do", "adjunct_list_io_do"], "postprocess": nt("inf_vp")},
    {"name": "inf_vp", "symbols": ["advp_vp?", "inf_io_do", "adjunct_list_do_dative_to"], "postprocess": nt("inf_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg", "adjunct_list"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_predcomp", "adjunct_list_predcomp"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_to_inf_cl", "adjunct_list_to_inf_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_bare_inf_cl", "adjunct_list_bare_inf_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_that_declarative_cl", "adjunct_list_that_declarative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_bare_declarative_cl", "adjunct_list_bare_declarative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_exclamative_cl", "adjunct_list_exclamative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_interrogative_cl", "adjunct_list_interrogative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_vbg_cl", "vbg_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_vbn_cl", "vbn_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_passive_cl", "passive_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_o", "adjunct_list_o"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_o_predcomp", "adjunct_list_o_predcomp"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_intnp_to_inf_cl", "adjunct_list_intnp_to_inf_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_intnp_bare_inf_cl", "adjunct_list_intnp_bare_inf_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_io_that_declarative_cl", "adjunct_list_io_that_declarative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_io_bare_declarative_cl", "adjunct_list_io_bare_declarative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_io_exclamative_cl", "adjunct_list_io_exclamative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_io_interrogative_cl", "adjunct_list_io_interrogative_cl"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_io_do", "adjunct_list_io_do"], "postprocess": nt("vbg_vp")},
    {"name": "vbg_vp", "symbols": ["advp_vp?", "vbg_io_do", "adjunct_list_do_dative_to"], "postprocess": nt("vbg_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn", "adjunct_list"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_predcomp", "adjunct_list_predcomp"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_to_inf_cl", "adjunct_list_to_inf_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_bare_inf_cl", "adjunct_list_bare_inf_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_that_declarative_cl", "adjunct_list_that_declarative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_bare_declarative_cl", "adjunct_list_bare_declarative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_exclamative_cl", "adjunct_list_exclamative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_interrogative_cl", "adjunct_list_interrogative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_vbg_cl", "vbg_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_vbn_cl", "vbn_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_passive_cl", "passive_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_o", "adjunct_list_o"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_o_predcomp", "adjunct_list_o_predcomp"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_intnp_to_inf_cl", "adjunct_list_intnp_to_inf_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_intnp_bare_inf_cl", "adjunct_list_intnp_bare_inf_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_io_that_declarative_cl", "adjunct_list_io_that_declarative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_io_bare_declarative_cl", "adjunct_list_io_bare_declarative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_io_exclamative_cl", "adjunct_list_io_exclamative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_io_interrogative_cl", "adjunct_list_io_interrogative_cl"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_io_do", "adjunct_list_io_do"], "postprocess": nt("vbn_vp")},
    {"name": "vbn_vp", "symbols": ["advp_vp?", "vbn_io_do", "adjunct_list_do_dative_to"], "postprocess": nt("vbn_vp")},
    {"name": "passive_cl", "symbols": ["advp_vp?", "vbn_o", "adjunct_list_passive_o"], "postprocess": nt("passive_cl")},
    {"name": "passive_cl", "symbols": ["advp_vp?", "vbn_o_predcomp", "adjunct_list_passive_o_predcomp"], "postprocess": nt("passive_cl")},
    {"name": "passive_cl", "symbols": ["advp_vp?", "vbn_intnp_to_inf_cl", "adjunct_list_passive_intnp_to_inf_cl"], "postprocess": nt("passive_cl")},
    {"name": "passive_cl", "symbols": ["advp_vp?", "vbn_io_that_declarative_cl", "adjunct_list_passive_io_that_declarative_cl"], "postprocess": nt("passive_cl")},
    {"name": "passive_cl", "symbols": ["advp_vp?", "vbn_io_bare_declarative_cl", "adjunct_list_passive_io_bare_declarative_cl"], "postprocess": nt("passive_cl")},
    {"name": "passive_cl", "symbols": ["advp_vp?", "vbn_io_exclamative_cl", "adjunct_list_passive_io_exclamative_cl"], "postprocess": nt("passive_cl")},
    {"name": "passive_cl", "symbols": ["advp_vp?", "vbn_io_interrogative_cl", "adjunct_list_passive_io_interrogative_cl"], "postprocess": nt("passive_cl")},
    {"name": "passive_cl", "symbols": ["advp_vp?", "vbn_io_do", "adjunct_list_passive_io_do"], "postprocess": nt("passive_cl")},
    {"name": "passive_cl", "symbols": ["advp_vp?", "vbn_io_do", "adjunct_list_passive_do_dative_to"], "postprocess": nt("passive_cl")},
    {"name": "adjunct_list_minus_np", "symbols": ["adjunct", "adjunct_list_minus_np"], "postprocess": nt("adjunct_list_minus_np")},
    {"name": "adjunct_list_minus_np", "symbols": ["adjunct_minus_np", "adjunct_list"], "postprocess": nt("adjunct_list_minus_np")},
    {"name": "adjunct_list_predcomp_minus_np", "symbols": ["predcomp", "adjunct_list_minus_np"], "postprocess": nt("adjunct_list_predcomp_minus_np")},
    {"name": "adjunct_list_predcomp_minus_np", "symbols": ["predcomp_minus_np", "adjunct_list"], "postprocess": nt("adjunct_list_predcomp_minus_np")},
    {"name": "adjunct_list_to_inf_cl_minus_np", "symbols": ["adjunct", "adjunct_list_to_inf_cl_minus_np"], "postprocess": nt("adjunct_list_to_inf_cl_minus_np")},
    {"name": "adjunct_list_to_inf_cl_minus_np", "symbols": ["to_inf_cl", "adjunct_list_minus_np"], "postprocess": nt("adjunct_list_to_inf_cl_minus_np")},
    {"name": "adjunct_list_to_inf_cl_minus_np", "symbols": ["adjunct_minus_np", "adjunct_list_to_inf_cl"], "postprocess": nt("adjunct_list_to_inf_cl_minus_np")},
    {"name": "adjunct_list_to_inf_cl_minus_np", "symbols": ["to_inf_cl_minus_np", "adjunct_list"], "postprocess": nt("adjunct_list_to_inf_cl_minus_np")},
    {"name": "adjunct_list_bare_inf_cl_minus_np", "symbols": ["bare_inf_cl_minus_np"], "postprocess": nt("adjunct_list_bare_inf_cl_minus_np")},
    {"name": "adjunct_list_that_declarative_cl_minus_np", "symbols": ["that_declarative_cl", "adjunct_list_minus_np"], "postprocess": nt("adjunct_list_that_declarative_cl_minus_np")},
    {"name": "adjunct_list_that_declarative_cl_minus_np", "symbols": ["adjunct_minus_np", "adjunct_list_that_declarative_cl"], "postprocess": nt("adjunct_list_that_declarative_cl_minus_np")},
    {"name": "adjunct_list_that_declarative_cl_minus_np", "symbols": ["that_declarative_cl_minus_np", "adjunct_list"], "postprocess": nt("adjunct_list_that_declarative_cl_minus_np")},
    {"name": "adjunct_list_bare_declarative_cl_minus_np", "symbols": ["bare_declarative_cl", "adjunct_list_minus_np"], "postprocess": nt("adjunct_list_bare_declarative_cl_minus_np")},
    {"name": "adjunct_list_bare_declarative_cl_minus_np", "symbols": ["adjunct_minus_np", "adjunct_list_bare_declarative_cl"], "postprocess": nt("adjunct_list_bare_declarative_cl_minus_np")},
    {"name": "adjunct_list_bare_declarative_cl_minus_np", "symbols": ["bare_declarative_cl_minus_np", "adjunct_list"], "postprocess": nt("adjunct_list_bare_declarative_cl_minus_np")},
    {"name": "adjunct_list_exclamative_cl_minus_np", "symbols": ["exclamative_cl", "adjunct_list_minus_np"], "postprocess": nt("adjunct_list_exclamative_cl_minus_np")},
    {"name": "adjunct_list_exclamative_cl_minus_np", "symbols": ["adjunct_minus_np", "adjunct_list_exclamative_cl"], "postprocess": nt("adjunct_list_exclamative_cl_minus_np")},
    {"name": "adjunct_list_interrogative_cl_minus_np", "symbols": ["interrogative_cl", "adjunct_list_minus_np"], "postprocess": nt("adjunct_list_interrogative_cl_minus_np")},
    {"name": "adjunct_list_interrogative_cl_minus_np", "symbols": ["adjunct_minus_np", "adjunct_list_interrogative_cl"], "postprocess": nt("adjunct_list_interrogative_cl_minus_np")},
    {"name": "adjunct_list_o_minus_np", "symbols": ["np", "adjunct_list_minus_np"], "postprocess": nt("adjunct_list_o_minus_np")},
    {"name": "adjunct_list_o_minus_np", "symbols": ["np_minus_np", "adjunct_list"], "postprocess": nt("adjunct_list_o_minus_np")},
    {"name": "adjunct_list_o_predcomp_minus_np", "symbols": ["np", "adjunct_list_o_predcomp_minus_np"], "postprocess": nt("adjunct_list_o_predcomp_minus_np")},
    {"name": "adjunct_list_o_predcomp_minus_np", "symbols": ["predcomp", "adjunct_list_o_minus_np"], "postprocess": nt("adjunct_list_o_predcomp_minus_np")},
    {"name": "adjunct_list_o_predcomp_minus_np", "symbols": ["np_minus_np", "adjunct_list_o_predcomp"], "postprocess": nt("adjunct_list_o_predcomp_minus_np")},
    {"name": "adjunct_list_o_predcomp_minus_np", "symbols": ["predcomp_minus_np", "adjunct_list_o"], "postprocess": nt("adjunct_list_o_predcomp_minus_np")},
    {"name": "adjunct_list_intnp_to_inf_cl_minus_np", "symbols": ["np", "adjunct_list_to_inf_cl_minus_np"], "postprocess": nt("adjunct_list_intnp_to_inf_cl_minus_np")},
    {"name": "adjunct_list_intnp_to_inf_cl_minus_np", "symbols": ["np_minus_np", "adjunct_list_to_inf_cl"], "postprocess": nt("adjunct_list_intnp_to_inf_cl_minus_np")},
    {"name": "adjunct_list_intnp_bare_inf_cl_minus_np", "symbols": ["np", "adjunct_list_bare_inf_cl_minus_np"], "postprocess": nt("adjunct_list_intnp_bare_inf_cl_minus_np")},
    {"name": "adjunct_list_intnp_bare_inf_cl_minus_np", "symbols": ["np_minus_np", "adjunct_list_bare_inf_cl"], "postprocess": nt("adjunct_list_intnp_bare_inf_cl_minus_np")},
    {"name": "adjunct_list_io_that_declarative_cl_minus_np", "symbols": ["np", "adjunct_list_that_declarative_cl_minus_np"], "postprocess": nt("adjunct_list_io_that_declarative_cl_minus_np")},
    {"name": "adjunct_list_io_that_declarative_cl_minus_np", "symbols": ["np_minus_np", "adjunct_list_that_declarative_cl"], "postprocess": nt("adjunct_list_io_that_declarative_cl_minus_np")},
    {"name": "adjunct_list_io_bare_declarative_cl_minus_np", "symbols": ["np", "adjunct_list_bare_declarative_cl_minus_np"], "postprocess": nt("adjunct_list_io_bare_declarative_cl_minus_np")},
    {"name": "adjunct_list_io_bare_declarative_cl_minus_np", "symbols": ["np_minus_np", "adjunct_list_bare_declarative_cl"], "postprocess": nt("adjunct_list_io_bare_declarative_cl_minus_np")},
    {"name": "adjunct_list_io_exclamative_cl_minus_np", "symbols": ["np", "adjunct_list_exclamative_cl_minus_np"], "postprocess": nt("adjunct_list_io_exclamative_cl_minus_np")},
    {"name": "adjunct_list_io_exclamative_cl_minus_np", "symbols": ["np_minus_np", "adjunct_list_exclamative_cl"], "postprocess": nt("adjunct_list_io_exclamative_cl_minus_np")},
    {"name": "adjunct_list_io_interrogative_cl_minus_np", "symbols": ["np", "adjunct_list_interrogative_cl_minus_np"], "postprocess": nt("adjunct_list_io_interrogative_cl_minus_np")},
    {"name": "adjunct_list_io_interrogative_cl_minus_np", "symbols": ["np_minus_np", "adjunct_list_interrogative_cl"], "postprocess": nt("adjunct_list_io_interrogative_cl_minus_np")},
    {"name": "adjunct_list_io_do_minus_np", "symbols": ["np", "adjunct_list_o_minus_np"], "postprocess": nt("adjunct_list_io_do_minus_np")},
    {"name": "adjunct_list_io_do_minus_np", "symbols": ["np_minus_np", "adjunct_list_o"], "postprocess": nt("adjunct_list_io_do_minus_np")},
    {"name": "adjunct_list_dative_to_minus_np", "symbols": ["adjunct", "adjunct_list_dative_to_minus_np"], "postprocess": nt("adjunct_list_dative_to_minus_np")},
    {"name": "adjunct_list_dative_to_minus_np", "symbols": ["adjunct_minus_np", "adjunct_list_dative_to"], "postprocess": nt("adjunct_list_dative_to_minus_np")},
    {"name": "adjunct_list_dative_to_minus_np", "symbols": ["dative_to_minus_np", "adjunct_list"], "postprocess": nt("adjunct_list_dative_to_minus_np")},
    {"name": "adjunct_list_do_dative_to_minus_np", "symbols": ["np", "adjunct_list_dative_to_minus_np"], "postprocess": nt("adjunct_list_do_dative_to_minus_np")},
    {"name": "adjunct_list_do_dative_to_minus_np", "symbols": ["dative_to", "adjunct_list_o_minus_np"], "postprocess": nt("adjunct_list_do_dative_to_minus_np")},
    {"name": "adjunct_list_do_dative_to_minus_np", "symbols": ["np_minus_np", "adjunct_list_dative_to"], "postprocess": nt("adjunct_list_do_dative_to_minus_np")},
    {"name": "adjunct_list_do_dative_to_minus_np", "symbols": ["dative_to_minus_np", "adjunct_list_o"], "postprocess": nt("adjunct_list_do_dative_to_minus_np")},
    {"name": "adjunct_list_passive_o_minus_np", "symbols": ["adjunct_list_minus_np"], "postprocess": nt("adjunct_list_passive_o_minus_np")},
    {"name": "adjunct_list_passive_o_predcomp_minus_np", "symbols": ["adjunct_list_predcomp_minus_np"], "postprocess": nt("adjunct_list_passive_o_predcomp_minus_np")},
    {"name": "adjunct_list_passive_intnp_to_inf_cl_minus_np", "symbols": ["adjunct_list_to_inf_cl_minus_np"], "postprocess": nt("adjunct_list_passive_intnp_to_inf_cl_minus_np")},
    {"name": "adjunct_list_passive_io_that_declarative_cl_minus_np", "symbols": ["adjunct_list_that_declarative_cl_minus_np"], "postprocess": nt("adjunct_list_passive_io_that_declarative_cl_minus_np")},
    {"name": "adjunct_list_passive_io_bare_declarative_cl_minus_np", "symbols": ["adjunct_list_bare_declarative_cl_minus_np"], "postprocess": nt("adjunct_list_passive_io_bare_declarative_cl_minus_np")},
    {"name": "adjunct_list_passive_io_exclamative_cl_minus_np", "symbols": ["adjunct_list_exclamative_cl_minus_np"], "postprocess": nt("adjunct_list_passive_io_exclamative_cl_minus_np")},
    {"name": "adjunct_list_passive_io_interrogative_cl_minus_np", "symbols": ["adjunct_list_interrogative_cl_minus_np"], "postprocess": nt("adjunct_list_passive_io_interrogative_cl_minus_np")},
    {"name": "adjunct_list_passive_io_do_minus_np", "symbols": ["adjunct_list_o_minus_np"], "postprocess": nt("adjunct_list_passive_io_do_minus_np")},
    {"name": "adjunct_list_passive_do_dative_to_minus_np", "symbols": ["adjunct_list_dative_to_minus_np"], "postprocess": nt("adjunct_list_passive_do_dative_to_minus_np")},
    {"name": "vbf_sg_vp_minus_np", "symbols": ["advp_vp?", "modal", "bare_inf_cl_minus_np"], "postprocess": nt("vbf_sg_vp_minus_np")},
    {"name": "vbf_sg_vp_minus_np", "symbols": ["advp_vp?", "vbf_sg", "adjunct_list_minus_np"], "postprocess": nt("vbf_sg_vp_minus_np")},
    {"name": "vbf_sg_vp_minus_np", "symbols": ["advp_vp?", "vbf_sg_predcomp", "adjunct_list_predcomp_minus_np"], "postprocess": nt("vbf_sg_vp_minus_np")},
    {"name": "vbf_sg_vp_minus_np", "symbols": ["advp_vp?", "vbf_sg_to_inf_cl", "adjunct_list_to_inf_cl_minus_np"], "postprocess": nt("vbf_sg_vp_minus_np")},
    {"name": "vbf_sg_vp_minus_np", "symbols": ["advp_vp?", "vbf_sg_bare_inf_cl", "adjunct_list_bare_inf_cl_minus_np"], "postprocess": nt("vbf_sg_vp_minus_np")},
    {"name": "vbf_sg_vp_minus_np", "symbols": ["advp_vp?", "vbf_sg_that_declarative_cl", "adjunct_list_that_declarative_cl_minus_np"], "postprocess": nt("vbf_sg_vp_minus_np")},
    {"name": "vbf_sg_vp_minus_np", "symbols": ["advp_vp?", "vbf_sg_bare_declarative_cl", "adjunct_list_bare_declarative_cl_minus_np"], "postprocess": nt("vbf_sg_vp_minus_np")},
    {"name": "vbf_sg_vp_minus_np", "symbols": ["advp_vp?", "vbf_sg_exclamative_cl", "adjunct_list_exclamative_cl_minus_np"], "postprocess": nt("vbf_sg_vp_minus_np")},
    {"name": "vbf_sg_vp_minus_np", "symbols": ["advp_vp?", "vbf_sg_interrogative_cl", "adjunct_list_interrogative_cl_minus_np"], "postprocess": nt("vbf_sg_vp_minus_np")},
    {"name": "vbf_sg_vp_minus_np", "symbols": ["advp_vp?", "vbf_sg_vbg_cl", "vbg_cl_minus_np"], "postprocess": nt("vbf_sg_vp_minus_np")},
    {"name": "vbf_sg_vp_minus_np", "symbols": ["advp_vp?", "vbf_sg_vbn_cl", "vbn_cl_minus_np"], "postprocess": nt("vbf_sg_vp_minus_np")},
    {"name": "vbf_sg_vp_minus_np", "symbols": ["advp_vp?", "vbf_sg_passive_cl", "passive_cl_minus_np"], "postprocess": nt("vbf_sg_vp_minus_np")},
    {"name": "vbf_sg_vp_minus_np", "symbols": ["advp_vp?", "vbf_sg_o", "adjunct_list_o_minus_np"], "postprocess": nt("vbf_sg_vp_minus_np")},
    {"name": "vbf_sg_vp_minus_np", "symbols": ["advp_vp?", "vbf_sg_o_predcomp", "adjunct_list_o_predcomp_minus_np"], "postprocess": nt("vbf_sg_vp_minus_np")},
    {"name": "vbf_sg_vp_minus_np", "symbols": ["advp_vp?", "vbf_sg_intnp_to_inf_cl", "adjunct_list_intnp_to_inf_cl_minus_np"], "postprocess": nt("vbf_sg_vp_minus_np")},
    {"name": "vbf_sg_vp_minus_np", "symbols": ["advp_vp?", "vbf_sg_intnp_bare_inf_cl", "adjunct_list_intnp_bare_inf_cl_minus_np"], "postprocess": nt("vbf_sg_vp_minus_np")},
    {"name": "vbf_sg_vp_minus_np", "symbols": ["advp_vp?", "vbf_sg_io_that_declarative_cl", "adjunct_list_io_that_declarative_cl_minus_np"], "postprocess": nt("vbf_sg_vp_minus_np")},
    {"name": "vbf_sg_vp_minus_np", "symbols": ["advp_vp?", "vbf_sg_io_bare_declarative_cl", "adjunct_list_io_bare_declarative_cl_minus_np"], "postprocess": nt("vbf_sg_vp_minus_np")},
    {"name": "vbf_sg_vp_minus_np", "symbols": ["advp_vp?", "vbf_sg_io_exclamative_cl", "adjunct_list_io_exclamative_cl_minus_np"], "postprocess": nt("vbf_sg_vp_minus_np")},
    {"name": "vbf_sg_vp_minus_np", "symbols": ["advp_vp?", "vbf_sg_io_interrogative_cl", "adjunct_list_io_interrogative_cl_minus_np"], "postprocess": nt("vbf_sg_vp_minus_np")},
    {"name": "vbf_sg_vp_minus_np", "symbols": ["advp_vp?", "vbf_sg_io_do", "adjunct_list_io_do_minus_np"], "postprocess": nt("vbf_sg_vp_minus_np")},
    {"name": "vbf_sg_vp_minus_np", "symbols": ["advp_vp?", "vbf_sg_io_do", "adjunct_list_do_dative_to_minus_np"], "postprocess": nt("vbf_sg_vp_minus_np")},
    {"name": "vbf_pl_vp_minus_np", "symbols": ["advp_vp?", "modal", "bare_inf_cl_minus_np"], "postprocess": nt("vbf_pl_vp_minus_np")},
    {"name": "vbf_pl_vp_minus_np", "symbols": ["advp_vp?", "vbf_pl", "adjunct_list_minus_np"], "postprocess": nt("vbf_pl_vp_minus_np")},
    {"name": "vbf_pl_vp_minus_np", "symbols": ["advp_vp?", "vbf_pl_predcomp", "adjunct_list_predcomp_minus_np"], "postprocess": nt("vbf_pl_vp_minus_np")},
    {"name": "vbf_pl_vp_minus_np", "symbols": ["advp_vp?", "vbf_pl_to_inf_cl", "adjunct_list_to_inf_cl_minus_np"], "postprocess": nt("vbf_pl_vp_minus_np")},
    {"name": "vbf_pl_vp_minus_np", "symbols": ["advp_vp?", "vbf_pl_bare_inf_cl", "adjunct_list_bare_inf_cl_minus_np"], "postprocess": nt("vbf_pl_vp_minus_np")},
    {"name": "vbf_pl_vp_minus_np", "symbols": ["advp_vp?", "vbf_pl_that_declarative_cl", "adjunct_list_that_declarative_cl_minus_np"], "postprocess": nt("vbf_pl_vp_minus_np")},
    {"name": "vbf_pl_vp_minus_np", "symbols": ["advp_vp?", "vbf_pl_bare_declarative_cl", "adjunct_list_bare_declarative_cl_minus_np"], "postprocess": nt("vbf_pl_vp_minus_np")},
    {"name": "vbf_pl_vp_minus_np", "symbols": ["advp_vp?", "vbf_pl_exclamative_cl", "adjunct_list_exclamative_cl_minus_np"], "postprocess": nt("vbf_pl_vp_minus_np")},
    {"name": "vbf_pl_vp_minus_np", "symbols": ["advp_vp?", "vbf_pl_interrogative_cl", "adjunct_list_interrogative_cl_minus_np"], "postprocess": nt("vbf_pl_vp_minus_np")},
    {"name": "vbf_pl_vp_minus_np", "symbols": ["advp_vp?", "vbf_pl_vbg_cl", "vbg_cl_minus_np"], "postprocess": nt("vbf_pl_vp_minus_np")},
    {"name": "vbf_pl_vp_minus_np", "symbols": ["advp_vp?", "vbf_pl_vbn_cl", "vbn_cl_minus_np"], "postprocess": nt("vbf_pl_vp_minus_np")},
    {"name": "vbf_pl_vp_minus_np", "symbols": ["advp_vp?", "vbf_pl_passive_cl", "passive_cl_minus_np"], "postprocess": nt("vbf_pl_vp_minus_np")},
    {"name": "vbf_pl_vp_minus_np", "symbols": ["advp_vp?", "vbf_pl_o", "adjunct_list_o_minus_np"], "postprocess": nt("vbf_pl_vp_minus_np")},
    {"name": "vbf_pl_vp_minus_np", "symbols": ["advp_vp?", "vbf_pl_o_predcomp", "adjunct_list_o_predcomp_minus_np"], "postprocess": nt("vbf_pl_vp_minus_np")},
    {"name": "vbf_pl_vp_minus_np", "symbols": ["advp_vp?", "vbf_pl_intnp_to_inf_cl", "adjunct_list_intnp_to_inf_cl_minus_np"], "postprocess": nt("vbf_pl_vp_minus_np")},
    {"name": "vbf_pl_vp_minus_np", "symbols": ["advp_vp?", "vbf_pl_intnp_bare_inf_cl", "adjunct_list_intnp_bare_inf_cl_minus_np"], "postprocess": nt("vbf_pl_vp_minus_np")},
    {"name": "vbf_pl_vp_minus_np", "symbols": ["advp_vp?", "vbf_pl_io_that_declarative_cl", "adjunct_list_io_that_declarative_cl_minus_np"], "postprocess": nt("vbf_pl_vp_minus_np")},
    {"name": "vbf_pl_vp_minus_np", "symbols": ["advp_vp?", "vbf_pl_io_bare_declarative_cl", "adjunct_list_io_bare_declarative_cl_minus_np"], "postprocess": nt("vbf_pl_vp_minus_np")},
    {"name": "vbf_pl_vp_minus_np", "symbols": ["advp_vp?", "vbf_pl_io_exclamative_cl", "adjunct_list_io_exclamative_cl_minus_np"], "postprocess": nt("vbf_pl_vp_minus_np")},
    {"name": "vbf_pl_vp_minus_np", "symbols": ["advp_vp?", "vbf_pl_io_interrogative_cl", "adjunct_list_io_interrogative_cl_minus_np"], "postprocess": nt("vbf_pl_vp_minus_np")},
    {"name": "vbf_pl_vp_minus_np", "symbols": ["advp_vp?", "vbf_pl_io_do", "adjunct_list_io_do_minus_np"], "postprocess": nt("vbf_pl_vp_minus_np")},
    {"name": "vbf_pl_vp_minus_np", "symbols": ["advp_vp?", "vbf_pl_io_do", "adjunct_list_do_dative_to_minus_np"], "postprocess": nt("vbf_pl_vp_minus_np")},
    {"name": "inf_vp_minus_np", "symbols": ["advp_vp?", "inf", "adjunct_list_minus_np"], "postprocess": nt("inf_vp_minus_np")},
    {"name": "inf_vp_minus_np", "symbols": ["advp_vp?", "inf_predcomp", "adjunct_list_predcomp_minus_np"], "postprocess": nt("inf_vp_minus_np")},
    {"name": "inf_vp_minus_np", "symbols": ["advp_vp?", "inf_to_inf_cl", "adjunct_list_to_inf_cl_minus_np"], "postprocess": nt("inf_vp_minus_np")},
    {"name": "inf_vp_minus_np", "symbols": ["advp_vp?", "inf_bare_inf_cl", "adjunct_list_bare_inf_cl_minus_np"], "postprocess": nt("inf_vp_minus_np")},
    {"name": "inf_vp_minus_np", "symbols": ["advp_vp?", "inf_that_declarative_cl", "adjunct_list_that_declarative_cl_minus_np"], "postprocess": nt("inf_vp_minus_np")},
    {"name": "inf_vp_minus_np", "symbols": ["advp_vp?", "inf_bare_declarative_cl", "adjunct_list_bare_declarative_cl_minus_np"], "postprocess": nt("inf_vp_minus_np")},
    {"name": "inf_vp_minus_np", "symbols": ["advp_vp?", "inf_exclamative_cl", "adjunct_list_exclamative_cl_minus_np"], "postprocess": nt("inf_vp_minus_np")},
    {"name": "inf_vp_minus_np", "symbols": ["advp_vp?", "inf_interrogative_cl", "adjunct_list_interrogative_cl_minus_np"], "postprocess": nt("inf_vp_minus_np")},
    {"name": "inf_vp_minus_np", "symbols": ["advp_vp?", "inf_vbg_cl", "vbg_cl_minus_np"], "postprocess": nt("inf_vp_minus_np")},
    {"name": "inf_vp_minus_np", "symbols": ["advp_vp?", "inf_vbn_cl", "vbn_cl_minus_np"], "postprocess": nt("inf_vp_minus_np")},
    {"name": "inf_vp_minus_np", "symbols": ["advp_vp?", "inf_passive_cl", "passive_cl_minus_np"], "postprocess": nt("inf_vp_minus_np")},
    {"name": "inf_vp_minus_np", "symbols": ["advp_vp?", "inf_o", "adjunct_list_o_minus_np"], "postprocess": nt("inf_vp_minus_np")},
    {"name": "inf_vp_minus_np", "symbols": ["advp_vp?", "inf_o_predcomp", "adjunct_list_o_predcomp_minus_np"], "postprocess": nt("inf_vp_minus_np")},
    {"name": "inf_vp_minus_np", "symbols": ["advp_vp?", "inf_intnp_to_inf_cl", "adjunct_list_intnp_to_inf_cl_minus_np"], "postprocess": nt("inf_vp_minus_np")},
    {"name": "inf_vp_minus_np", "symbols": ["advp_vp?", "inf_intnp_bare_inf_cl", "adjunct_list_intnp_bare_inf_cl_minus_np"], "postprocess": nt("inf_vp_minus_np")},
    {"name": "inf_vp_minus_np", "symbols": ["advp_vp?", "inf_io_that_declarative_cl", "adjunct_list_io_that_declarative_cl_minus_np"], "postprocess": nt("inf_vp_minus_np")},
    {"name": "inf_vp_minus_np", "symbols": ["advp_vp?", "inf_io_bare_declarative_cl", "adjunct_list_io_bare_declarative_cl_minus_np"], "postprocess": nt("inf_vp_minus_np")},
    {"name": "inf_vp_minus_np", "symbols": ["advp_vp?", "inf_io_exclamative_cl", "adjunct_list_io_exclamative_cl_minus_np"], "postprocess": nt("inf_vp_minus_np")},
    {"name": "inf_vp_minus_np", "symbols": ["advp_vp?", "inf_io_interrogative_cl", "adjunct_list_io_interrogative_cl_minus_np"], "postprocess": nt("inf_vp_minus_np")},
    {"name": "inf_vp_minus_np", "symbols": ["advp_vp?", "inf_io_do", "adjunct_list_io_do_minus_np"], "postprocess": nt("inf_vp_minus_np")},
    {"name": "inf_vp_minus_np", "symbols": ["advp_vp?", "inf_io_do", "adjunct_list_do_dative_to_minus_np"], "postprocess": nt("inf_vp_minus_np")},
    {"name": "vbg_vp_minus_np", "symbols": ["advp_vp?", "vbg", "adjunct_list_minus_np"], "postprocess": nt("vbg_vp_minus_np")},
    {"name": "vbg_vp_minus_np", "symbols": ["advp_vp?", "vbg_predcomp", "adjunct_list_predcomp_minus_np"], "postprocess": nt("vbg_vp_minus_np")},
    {"name": "vbg_vp_minus_np", "symbols": ["advp_vp?", "vbg_to_inf_cl", "adjunct_list_to_inf_cl_minus_np"], "postprocess": nt("vbg_vp_minus_np")},
    {"name": "vbg_vp_minus_np", "symbols": ["advp_vp?", "vbg_bare_inf_cl", "adjunct_list_bare_inf_cl_minus_np"], "postprocess": nt("vbg_vp_minus_np")},
    {"name": "vbg_vp_minus_np", "symbols": ["advp_vp?", "vbg_that_declarative_cl", "adjunct_list_that_declarative_cl_minus_np"], "postprocess": nt("vbg_vp_minus_np")},
    {"name": "vbg_vp_minus_np", "symbols": ["advp_vp?", "vbg_bare_declarative_cl", "adjunct_list_bare_declarative_cl_minus_np"], "postprocess": nt("vbg_vp_minus_np")},
    {"name": "vbg_vp_minus_np", "symbols": ["advp_vp?", "vbg_exclamative_cl", "adjunct_list_exclamative_cl_minus_np"], "postprocess": nt("vbg_vp_minus_np")},
    {"name": "vbg_vp_minus_np", "symbols": ["advp_vp?", "vbg_interrogative_cl", "adjunct_list_interrogative_cl_minus_np"], "postprocess": nt("vbg_vp_minus_np")},
    {"name": "vbg_vp_minus_np", "symbols": ["advp_vp?", "vbg_vbg_cl", "vbg_cl_minus_np"], "postprocess": nt("vbg_vp_minus_np")},
    {"name": "vbg_vp_minus_np", "symbols": ["advp_vp?", "vbg_vbn_cl", "vbn_cl_minus_np"], "postprocess": nt("vbg_vp_minus_np")},
    {"name": "vbg_vp_minus_np", "symbols": ["advp_vp?", "vbg_passive_cl", "passive_cl_minus_np"], "postprocess": nt("vbg_vp_minus_np")},
    {"name": "vbg_vp_minus_np", "symbols": ["advp_vp?", "vbg_o", "adjunct_list_o_minus_np"], "postprocess": nt("vbg_vp_minus_np")},
    {"name": "vbg_vp_minus_np", "symbols": ["advp_vp?", "vbg_o_predcomp", "adjunct_list_o_predcomp_minus_np"], "postprocess": nt("vbg_vp_minus_np")},
    {"name": "vbg_vp_minus_np", "symbols": ["advp_vp?", "vbg_intnp_to_inf_cl", "adjunct_list_intnp_to_inf_cl_minus_np"], "postprocess": nt("vbg_vp_minus_np")},
    {"name": "vbg_vp_minus_np", "symbols": ["advp_vp?", "vbg_intnp_bare_inf_cl", "adjunct_list_intnp_bare_inf_cl_minus_np"], "postprocess": nt("vbg_vp_minus_np")},
    {"name": "vbg_vp_minus_np", "symbols": ["advp_vp?", "vbg_io_that_declarative_cl", "adjunct_list_io_that_declarative_cl_minus_np"], "postprocess": nt("vbg_vp_minus_np")},
    {"name": "vbg_vp_minus_np", "symbols": ["advp_vp?", "vbg_io_bare_declarative_cl", "adjunct_list_io_bare_declarative_cl_minus_np"], "postprocess": nt("vbg_vp_minus_np")},
    {"name": "vbg_vp_minus_np", "symbols": ["advp_vp?", "vbg_io_exclamative_cl", "adjunct_list_io_exclamative_cl_minus_np"], "postprocess": nt("vbg_vp_minus_np")},
    {"name": "vbg_vp_minus_np", "symbols": ["advp_vp?", "vbg_io_interrogative_cl", "adjunct_list_io_interrogative_cl_minus_np"], "postprocess": nt("vbg_vp_minus_np")},
    {"name": "vbg_vp_minus_np", "symbols": ["advp_vp?", "vbg_io_do", "adjunct_list_io_do_minus_np"], "postprocess": nt("vbg_vp_minus_np")},
    {"name": "vbg_vp_minus_np", "symbols": ["advp_vp?", "vbg_io_do", "adjunct_list_do_dative_to_minus_np"], "postprocess": nt("vbg_vp_minus_np")},
    {"name": "vbn_vp_minus_np", "symbols": ["advp_vp?", "vbn", "adjunct_list_minus_np"], "postprocess": nt("vbn_vp_minus_np")},
    {"name": "vbn_vp_minus_np", "symbols": ["advp_vp?", "vbn_predcomp", "adjunct_list_predcomp_minus_np"], "postprocess": nt("vbn_vp_minus_np")},
    {"name": "vbn_vp_minus_np", "symbols": ["advp_vp?", "vbn_to_inf_cl", "adjunct_list_to_inf_cl_minus_np"], "postprocess": nt("vbn_vp_minus_np")},
    {"name": "vbn_vp_minus_np", "symbols": ["advp_vp?", "vbn_bare_inf_cl", "adjunct_list_bare_inf_cl_minus_np"], "postprocess": nt("vbn_vp_minus_np")},
    {"name": "vbn_vp_minus_np", "symbols": ["advp_vp?", "vbn_that_declarative_cl", "adjunct_list_that_declarative_cl_minus_np"], "postprocess": nt("vbn_vp_minus_np")},
    {"name": "vbn_vp_minus_np", "symbols": ["advp_vp?", "vbn_bare_declarative_cl", "adjunct_list_bare_declarative_cl_minus_np"], "postprocess": nt("vbn_vp_minus_np")},
    {"name": "vbn_vp_minus_np", "symbols": ["advp_vp?", "vbn_exclamative_cl", "adjunct_list_exclamative_cl_minus_np"], "postprocess": nt("vbn_vp_minus_np")},
    {"name": "vbn_vp_minus_np", "symbols": ["advp_vp?", "vbn_interrogative_cl", "adjunct_list_interrogative_cl_minus_np"], "postprocess": nt("vbn_vp_minus_np")},
    {"name": "vbn_vp_minus_np", "symbols": ["advp_vp?", "vbn_vbg_cl", "vbg_cl_minus_np"], "postprocess": nt("vbn_vp_minus_np")},
    {"name": "vbn_vp_minus_np", "symbols": ["advp_vp?", "vbn_vbn_cl", "vbn_cl_minus_np"], "postprocess": nt("vbn_vp_minus_np")},
    {"name": "vbn_vp_minus_np", "symbols": ["advp_vp?", "vbn_passive_cl", "passive_cl_minus_np"], "postprocess": nt("vbn_vp_minus_np")},
    {"name": "vbn_vp_minus_np", "symbols": ["advp_vp?", "vbn_o", "adjunct_list_o_minus_np"], "postprocess": nt("vbn_vp_minus_np")},
    {"name": "vbn_vp_minus_np", "symbols": ["advp_vp?", "vbn_o_predcomp", "adjunct_list_o_predcomp_minus_np"], "postprocess": nt("vbn_vp_minus_np")},
    {"name": "vbn_vp_minus_np", "symbols": ["advp_vp?", "vbn_intnp_to_inf_cl", "adjunct_list_intnp_to_inf_cl_minus_np"], "postprocess": nt("vbn_vp_minus_np")},
    {"name": "vbn_vp_minus_np", "symbols": ["advp_vp?", "vbn_intnp_bare_inf_cl", "adjunct_list_intnp_bare_inf_cl_minus_np"], "postprocess": nt("vbn_vp_minus_np")},
    {"name": "vbn_vp_minus_np", "symbols": ["advp_vp?", "vbn_io_that_declarative_cl", "adjunct_list_io_that_declarative_cl_minus_np"], "postprocess": nt("vbn_vp_minus_np")},
    {"name": "vbn_vp_minus_np", "symbols": ["advp_vp?", "vbn_io_bare_declarative_cl", "adjunct_list_io_bare_declarative_cl_minus_np"], "postprocess": nt("vbn_vp_minus_np")},
    {"name": "vbn_vp_minus_np", "symbols": ["advp_vp?", "vbn_io_exclamative_cl", "adjunct_list_io_exclamative_cl_minus_np"], "postprocess": nt("vbn_vp_minus_np")},
    {"name": "vbn_vp_minus_np", "symbols": ["advp_vp?", "vbn_io_interrogative_cl", "adjunct_list_io_interrogative_cl_minus_np"], "postprocess": nt("vbn_vp_minus_np")},
    {"name": "vbn_vp_minus_np", "symbols": ["advp_vp?", "vbn_io_do", "adjunct_list_io_do_minus_np"], "postprocess": nt("vbn_vp_minus_np")},
    {"name": "vbn_vp_minus_np", "symbols": ["advp_vp?", "vbn_io_do", "adjunct_list_do_dative_to_minus_np"], "postprocess": nt("vbn_vp_minus_np")},
    {"name": "passive_cl_minus_np", "symbols": ["advp_vp?", "vbn_o", "adjunct_list_passive_o_minus_np"], "postprocess": nt("passive_cl_minus_np")},
    {"name": "passive_cl_minus_np", "symbols": ["advp_vp?", "vbn_o_predcomp", "adjunct_list_passive_o_predcomp_minus_np"], "postprocess": nt("passive_cl_minus_np")},
    {"name": "passive_cl_minus_np", "symbols": ["advp_vp?", "vbn_intnp_to_inf_cl", "adjunct_list_passive_intnp_to_inf_cl_minus_np"], "postprocess": nt("passive_cl_minus_np")},
    {"name": "passive_cl_minus_np", "symbols": ["advp_vp?", "vbn_io_that_declarative_cl", "adjunct_list_passive_io_that_declarative_cl_minus_np"], "postprocess": nt("passive_cl_minus_np")},
    {"name": "passive_cl_minus_np", "symbols": ["advp_vp?", "vbn_io_bare_declarative_cl", "adjunct_list_passive_io_bare_declarative_cl_minus_np"], "postprocess": nt("passive_cl_minus_np")},
    {"name": "passive_cl_minus_np", "symbols": ["advp_vp?", "vbn_io_exclamative_cl", "adjunct_list_passive_io_exclamative_cl_minus_np"], "postprocess": nt("passive_cl_minus_np")},
    {"name": "passive_cl_minus_np", "symbols": ["advp_vp?", "vbn_io_interrogative_cl", "adjunct_list_passive_io_interrogative_cl_minus_np"], "postprocess": nt("passive_cl_minus_np")},
    {"name": "passive_cl_minus_np", "symbols": ["advp_vp?", "vbn_io_do", "adjunct_list_passive_io_do_minus_np"], "postprocess": nt("passive_cl_minus_np")},
    {"name": "passive_cl_minus_np", "symbols": ["advp_vp?", "vbn_io_do", "adjunct_list_passive_do_dative_to_minus_np"], "postprocess": nt("passive_cl_minus_np")},
    {"name": "adjunct_list_minus_adjp", "symbols": ["adjunct", "adjunct_list_minus_adjp"], "postprocess": nt("adjunct_list_minus_adjp")},
    {"name": "adjunct_list_minus_adjp", "symbols": ["adjunct_minus_adjp", "adjunct_list"], "postprocess": nt("adjunct_list_minus_adjp")},
    {"name": "adjunct_list_predcomp_minus_adjp", "symbols": ["predcomp", "adjunct_list_minus_adjp"], "postprocess": nt("adjunct_list_predcomp_minus_adjp")},
    {"name": "adjunct_list_predcomp_minus_adjp", "symbols": ["predcomp_minus_adjp", "adjunct_list"], "postprocess": nt("adjunct_list_predcomp_minus_adjp")},
    {"name": "adjunct_list_to_inf_cl_minus_adjp", "symbols": ["adjunct", "adjunct_list_to_inf_cl_minus_adjp"], "postprocess": nt("adjunct_list_to_inf_cl_minus_adjp")},
    {"name": "adjunct_list_to_inf_cl_minus_adjp", "symbols": ["to_inf_cl", "adjunct_list_minus_adjp"], "postprocess": nt("adjunct_list_to_inf_cl_minus_adjp")},
    {"name": "adjunct_list_to_inf_cl_minus_adjp", "symbols": ["adjunct_minus_adjp", "adjunct_list_to_inf_cl"], "postprocess": nt("adjunct_list_to_inf_cl_minus_adjp")},
    {"name": "adjunct_list_to_inf_cl_minus_adjp", "symbols": ["to_inf_cl_minus_adjp", "adjunct_list"], "postprocess": nt("adjunct_list_to_inf_cl_minus_adjp")},
    {"name": "adjunct_list_bare_inf_cl_minus_adjp", "symbols": ["bare_inf_cl_minus_adjp"], "postprocess": nt("adjunct_list_bare_inf_cl_minus_adjp")},
    {"name": "adjunct_list_that_declarative_cl_minus_adjp", "symbols": ["that_declarative_cl", "adjunct_list_minus_adjp"], "postprocess": nt("adjunct_list_that_declarative_cl_minus_adjp")},
    {"name": "adjunct_list_that_declarative_cl_minus_adjp", "symbols": ["adjunct_minus_adjp", "adjunct_list_that_declarative_cl"], "postprocess": nt("adjunct_list_that_declarative_cl_minus_adjp")},
    {"name": "adjunct_list_that_declarative_cl_minus_adjp", "symbols": ["that_declarative_cl_minus_adjp", "adjunct_list"], "postprocess": nt("adjunct_list_that_declarative_cl_minus_adjp")},
    {"name": "adjunct_list_bare_declarative_cl_minus_adjp", "symbols": ["bare_declarative_cl", "adjunct_list_minus_adjp"], "postprocess": nt("adjunct_list_bare_declarative_cl_minus_adjp")},
    {"name": "adjunct_list_bare_declarative_cl_minus_adjp", "symbols": ["adjunct_minus_adjp", "adjunct_list_bare_declarative_cl"], "postprocess": nt("adjunct_list_bare_declarative_cl_minus_adjp")},
    {"name": "adjunct_list_bare_declarative_cl_minus_adjp", "symbols": ["bare_declarative_cl_minus_adjp", "adjunct_list"], "postprocess": nt("adjunct_list_bare_declarative_cl_minus_adjp")},
    {"name": "adjunct_list_exclamative_cl_minus_adjp", "symbols": ["exclamative_cl", "adjunct_list_minus_adjp"], "postprocess": nt("adjunct_list_exclamative_cl_minus_adjp")},
    {"name": "adjunct_list_exclamative_cl_minus_adjp", "symbols": ["adjunct_minus_adjp", "adjunct_list_exclamative_cl"], "postprocess": nt("adjunct_list_exclamative_cl_minus_adjp")},
    {"name": "adjunct_list_interrogative_cl_minus_adjp", "symbols": ["interrogative_cl", "adjunct_list_minus_adjp"], "postprocess": nt("adjunct_list_interrogative_cl_minus_adjp")},
    {"name": "adjunct_list_interrogative_cl_minus_adjp", "symbols": ["adjunct_minus_adjp", "adjunct_list_interrogative_cl"], "postprocess": nt("adjunct_list_interrogative_cl_minus_adjp")},
    {"name": "adjunct_list_o_minus_adjp", "symbols": ["impossible"]},
    {"name": "adjunct_list_o_predcomp_minus_adjp", "symbols": ["np", "adjunct_list_o_predcomp_minus_adjp"], "postprocess": nt("adjunct_list_o_predcomp_minus_adjp")},
    {"name": "adjunct_list_o_predcomp_minus_adjp", "symbols": ["predcomp", "adjunct_list_o_minus_adjp"], "postprocess": nt("adjunct_list_o_predcomp_minus_adjp")},
    {"name": "adjunct_list_o_predcomp_minus_adjp", "symbols": ["np_minus_adjp", "adjunct_list_o_predcomp"], "postprocess": nt("adjunct_list_o_predcomp_minus_adjp")},
    {"name": "adjunct_list_intnp_to_inf_cl_minus_adjp", "symbols": ["np", "adjunct_list_to_inf_cl_minus_adjp"], "postprocess": nt("adjunct_list_intnp_to_inf_cl_minus_adjp")},
    {"name": "adjunct_list_intnp_to_inf_cl_minus_adjp", "symbols": ["np_minus_adjp", "adjunct_list_to_inf_cl"], "postprocess": nt("adjunct_list_intnp_to_inf_cl_minus_adjp")},
    {"name": "adjunct_list_intnp_bare_inf_cl_minus_adjp", "symbols": ["np", "adjunct_list_bare_inf_cl_minus_adjp"], "postprocess": nt("adjunct_list_intnp_bare_inf_cl_minus_adjp")},
    {"name": "adjunct_list_intnp_bare_inf_cl_minus_adjp", "symbols": ["np_minus_adjp", "adjunct_list_bare_inf_cl"], "postprocess": nt("adjunct_list_intnp_bare_inf_cl_minus_adjp")},
    {"name": "adjunct_list_io_that_declarative_cl_minus_adjp", "symbols": ["np", "adjunct_list_that_declarative_cl_minus_adjp"], "postprocess": nt("adjunct_list_io_that_declarative_cl_minus_adjp")},
    {"name": "adjunct_list_io_that_declarative_cl_minus_adjp", "symbols": ["np_minus_adjp", "adjunct_list_that_declarative_cl"], "postprocess": nt("adjunct_list_io_that_declarative_cl_minus_adjp")},
    {"name": "adjunct_list_io_bare_declarative_cl_minus_adjp", "symbols": ["np", "adjunct_list_bare_declarative_cl_minus_adjp"], "postprocess": nt("adjunct_list_io_bare_declarative_cl_minus_adjp")},
    {"name": "adjunct_list_io_bare_declarative_cl_minus_adjp", "symbols": ["np_minus_adjp", "adjunct_list_bare_declarative_cl"], "postprocess": nt("adjunct_list_io_bare_declarative_cl_minus_adjp")},
    {"name": "adjunct_list_io_exclamative_cl_minus_adjp", "symbols": ["np", "adjunct_list_exclamative_cl_minus_adjp"], "postprocess": nt("adjunct_list_io_exclamative_cl_minus_adjp")},
    {"name": "adjunct_list_io_exclamative_cl_minus_adjp", "symbols": ["np_minus_adjp", "adjunct_list_exclamative_cl"], "postprocess": nt("adjunct_list_io_exclamative_cl_minus_adjp")},
    {"name": "adjunct_list_io_interrogative_cl_minus_adjp", "symbols": ["np", "adjunct_list_interrogative_cl_minus_adjp"], "postprocess": nt("adjunct_list_io_interrogative_cl_minus_adjp")},
    {"name": "adjunct_list_io_interrogative_cl_minus_adjp", "symbols": ["np_minus_adjp", "adjunct_list_interrogative_cl"], "postprocess": nt("adjunct_list_io_interrogative_cl_minus_adjp")},
    {"name": "adjunct_list_io_do_minus_adjp", "symbols": ["np", "adjunct_list_o_minus_adjp"], "postprocess": nt("adjunct_list_io_do_minus_adjp")},
    {"name": "adjunct_list_io_do_minus_adjp", "symbols": ["np_minus_adjp", "adjunct_list_o"], "postprocess": nt("adjunct_list_io_do_minus_adjp")},
    {"name": "adjunct_list_dative_to_minus_adjp", "symbols": ["adjunct", "adjunct_list_dative_to_minus_adjp"], "postprocess": nt("adjunct_list_dative_to_minus_adjp")},
    {"name": "adjunct_list_dative_to_minus_adjp", "symbols": ["adjunct_minus_adjp", "adjunct_list_dative_to"], "postprocess": nt("adjunct_list_dative_to_minus_adjp")},
    {"name": "adjunct_list_dative_to_minus_adjp", "symbols": ["dative_to_minus_adjp", "adjunct_list"], "postprocess": nt("adjunct_list_dative_to_minus_adjp")},
    {"name": "adjunct_list_do_dative_to_minus_adjp", "symbols": ["np", "adjunct_list_dative_to_minus_adjp"], "postprocess": nt("adjunct_list_do_dative_to_minus_adjp")},
    {"name": "adjunct_list_do_dative_to_minus_adjp", "symbols": ["dative_to", "adjunct_list_o_minus_adjp"], "postprocess": nt("adjunct_list_do_dative_to_minus_adjp")},
    {"name": "adjunct_list_do_dative_to_minus_adjp", "symbols": ["np_minus_adjp", "adjunct_list_dative_to"], "postprocess": nt("adjunct_list_do_dative_to_minus_adjp")},
    {"name": "adjunct_list_do_dative_to_minus_adjp", "symbols": ["dative_to_minus_adjp", "adjunct_list_o"], "postprocess": nt("adjunct_list_do_dative_to_minus_adjp")},
    {"name": "adjunct_list_passive_o_minus_adjp", "symbols": ["impossible"]},
    {"name": "adjunct_list_passive_o_predcomp_minus_adjp", "symbols": ["adjunct_list_predcomp_minus_adjp"], "postprocess": nt("adjunct_list_passive_o_predcomp_minus_adjp")},
    {"name": "adjunct_list_passive_intnp_to_inf_cl_minus_adjp", "symbols": ["adjunct_list_to_inf_cl_minus_adjp"], "postprocess": nt("adjunct_list_passive_intnp_to_inf_cl_minus_adjp")},
    {"name": "adjunct_list_passive_io_that_declarative_cl_minus_adjp", "symbols": ["adjunct_list_that_declarative_cl_minus_adjp"], "postprocess": nt("adjunct_list_passive_io_that_declarative_cl_minus_adjp")},
    {"name": "adjunct_list_passive_io_bare_declarative_cl_minus_adjp", "symbols": ["adjunct_list_bare_declarative_cl_minus_adjp"], "postprocess": nt("adjunct_list_passive_io_bare_declarative_cl_minus_adjp")},
    {"name": "adjunct_list_passive_io_exclamative_cl_minus_adjp", "symbols": ["adjunct_list_exclamative_cl_minus_adjp"], "postprocess": nt("adjunct_list_passive_io_exclamative_cl_minus_adjp")},
    {"name": "adjunct_list_passive_io_interrogative_cl_minus_adjp", "symbols": ["adjunct_list_interrogative_cl_minus_adjp"], "postprocess": nt("adjunct_list_passive_io_interrogative_cl_minus_adjp")},
    {"name": "adjunct_list_passive_io_do_minus_adjp", "symbols": ["impossible"]},
    {"name": "adjunct_list_passive_do_dative_to_minus_adjp", "symbols": ["impossible"]},
    {"name": "vbf_sg_vp_minus_adjp", "symbols": ["advp_vp?", "modal", "bare_inf_cl_minus_adjp"], "postprocess": nt("vbf_sg_vp_minus_adjp")},
    {"name": "vbf_sg_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_sg", "adjunct_list_minus_adjp"], "postprocess": nt("vbf_sg_vp_minus_adjp")},
    {"name": "vbf_sg_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_sg_predcomp", "adjunct_list_predcomp_minus_adjp"], "postprocess": nt("vbf_sg_vp_minus_adjp")},
    {"name": "vbf_sg_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_sg_to_inf_cl", "adjunct_list_to_inf_cl_minus_adjp"], "postprocess": nt("vbf_sg_vp_minus_adjp")},
    {"name": "vbf_sg_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_sg_bare_inf_cl", "adjunct_list_bare_inf_cl_minus_adjp"], "postprocess": nt("vbf_sg_vp_minus_adjp")},
    {"name": "vbf_sg_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_sg_that_declarative_cl", "adjunct_list_that_declarative_cl_minus_adjp"], "postprocess": nt("vbf_sg_vp_minus_adjp")},
    {"name": "vbf_sg_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_sg_bare_declarative_cl", "adjunct_list_bare_declarative_cl_minus_adjp"], "postprocess": nt("vbf_sg_vp_minus_adjp")},
    {"name": "vbf_sg_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_sg_exclamative_cl", "adjunct_list_exclamative_cl_minus_adjp"], "postprocess": nt("vbf_sg_vp_minus_adjp")},
    {"name": "vbf_sg_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_sg_interrogative_cl", "adjunct_list_interrogative_cl_minus_adjp"], "postprocess": nt("vbf_sg_vp_minus_adjp")},
    {"name": "vbf_sg_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_sg_vbg_cl", "vbg_cl_minus_adjp"], "postprocess": nt("vbf_sg_vp_minus_adjp")},
    {"name": "vbf_sg_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_sg_vbn_cl", "vbn_cl_minus_adjp"], "postprocess": nt("vbf_sg_vp_minus_adjp")},
    {"name": "vbf_sg_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_sg_passive_cl", "passive_cl_minus_adjp"], "postprocess": nt("vbf_sg_vp_minus_adjp")},
    {"name": "vbf_sg_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_sg_o", "adjunct_list_o_minus_adjp"], "postprocess": nt("vbf_sg_vp_minus_adjp")},
    {"name": "vbf_sg_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_sg_o_predcomp", "adjunct_list_o_predcomp_minus_adjp"], "postprocess": nt("vbf_sg_vp_minus_adjp")},
    {"name": "vbf_sg_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_sg_intnp_to_inf_cl", "adjunct_list_intnp_to_inf_cl_minus_adjp"], "postprocess": nt("vbf_sg_vp_minus_adjp")},
    {"name": "vbf_sg_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_sg_intnp_bare_inf_cl", "adjunct_list_intnp_bare_inf_cl_minus_adjp"], "postprocess": nt("vbf_sg_vp_minus_adjp")},
    {"name": "vbf_sg_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_sg_io_that_declarative_cl", "adjunct_list_io_that_declarative_cl_minus_adjp"], "postprocess": nt("vbf_sg_vp_minus_adjp")},
    {"name": "vbf_sg_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_sg_io_bare_declarative_cl", "adjunct_list_io_bare_declarative_cl_minus_adjp"], "postprocess": nt("vbf_sg_vp_minus_adjp")},
    {"name": "vbf_sg_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_sg_io_exclamative_cl", "adjunct_list_io_exclamative_cl_minus_adjp"], "postprocess": nt("vbf_sg_vp_minus_adjp")},
    {"name": "vbf_sg_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_sg_io_interrogative_cl", "adjunct_list_io_interrogative_cl_minus_adjp"], "postprocess": nt("vbf_sg_vp_minus_adjp")},
    {"name": "vbf_sg_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_sg_io_do", "adjunct_list_io_do_minus_adjp"], "postprocess": nt("vbf_sg_vp_minus_adjp")},
    {"name": "vbf_sg_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_sg_io_do", "adjunct_list_do_dative_to_minus_adjp"], "postprocess": nt("vbf_sg_vp_minus_adjp")},
    {"name": "vbf_pl_vp_minus_adjp", "symbols": ["advp_vp?", "modal", "bare_inf_cl_minus_adjp"], "postprocess": nt("vbf_pl_vp_minus_adjp")},
    {"name": "vbf_pl_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_pl", "adjunct_list_minus_adjp"], "postprocess": nt("vbf_pl_vp_minus_adjp")},
    {"name": "vbf_pl_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_pl_predcomp", "adjunct_list_predcomp_minus_adjp"], "postprocess": nt("vbf_pl_vp_minus_adjp")},
    {"name": "vbf_pl_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_pl_to_inf_cl", "adjunct_list_to_inf_cl_minus_adjp"], "postprocess": nt("vbf_pl_vp_minus_adjp")},
    {"name": "vbf_pl_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_pl_bare_inf_cl", "adjunct_list_bare_inf_cl_minus_adjp"], "postprocess": nt("vbf_pl_vp_minus_adjp")},
    {"name": "vbf_pl_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_pl_that_declarative_cl", "adjunct_list_that_declarative_cl_minus_adjp"], "postprocess": nt("vbf_pl_vp_minus_adjp")},
    {"name": "vbf_pl_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_pl_bare_declarative_cl", "adjunct_list_bare_declarative_cl_minus_adjp"], "postprocess": nt("vbf_pl_vp_minus_adjp")},
    {"name": "vbf_pl_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_pl_exclamative_cl", "adjunct_list_exclamative_cl_minus_adjp"], "postprocess": nt("vbf_pl_vp_minus_adjp")},
    {"name": "vbf_pl_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_pl_interrogative_cl", "adjunct_list_interrogative_cl_minus_adjp"], "postprocess": nt("vbf_pl_vp_minus_adjp")},
    {"name": "vbf_pl_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_pl_vbg_cl", "vbg_cl_minus_adjp"], "postprocess": nt("vbf_pl_vp_minus_adjp")},
    {"name": "vbf_pl_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_pl_vbn_cl", "vbn_cl_minus_adjp"], "postprocess": nt("vbf_pl_vp_minus_adjp")},
    {"name": "vbf_pl_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_pl_passive_cl", "passive_cl_minus_adjp"], "postprocess": nt("vbf_pl_vp_minus_adjp")},
    {"name": "vbf_pl_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_pl_o", "adjunct_list_o_minus_adjp"], "postprocess": nt("vbf_pl_vp_minus_adjp")},
    {"name": "vbf_pl_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_pl_o_predcomp", "adjunct_list_o_predcomp_minus_adjp"], "postprocess": nt("vbf_pl_vp_minus_adjp")},
    {"name": "vbf_pl_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_pl_intnp_to_inf_cl", "adjunct_list_intnp_to_inf_cl_minus_adjp"], "postprocess": nt("vbf_pl_vp_minus_adjp")},
    {"name": "vbf_pl_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_pl_intnp_bare_inf_cl", "adjunct_list_intnp_bare_inf_cl_minus_adjp"], "postprocess": nt("vbf_pl_vp_minus_adjp")},
    {"name": "vbf_pl_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_pl_io_that_declarative_cl", "adjunct_list_io_that_declarative_cl_minus_adjp"], "postprocess": nt("vbf_pl_vp_minus_adjp")},
    {"name": "vbf_pl_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_pl_io_bare_declarative_cl", "adjunct_list_io_bare_declarative_cl_minus_adjp"], "postprocess": nt("vbf_pl_vp_minus_adjp")},
    {"name": "vbf_pl_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_pl_io_exclamative_cl", "adjunct_list_io_exclamative_cl_minus_adjp"], "postprocess": nt("vbf_pl_vp_minus_adjp")},
    {"name": "vbf_pl_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_pl_io_interrogative_cl", "adjunct_list_io_interrogative_cl_minus_adjp"], "postprocess": nt("vbf_pl_vp_minus_adjp")},
    {"name": "vbf_pl_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_pl_io_do", "adjunct_list_io_do_minus_adjp"], "postprocess": nt("vbf_pl_vp_minus_adjp")},
    {"name": "vbf_pl_vp_minus_adjp", "symbols": ["advp_vp?", "vbf_pl_io_do", "adjunct_list_do_dative_to_minus_adjp"], "postprocess": nt("vbf_pl_vp_minus_adjp")},
    {"name": "inf_vp_minus_adjp", "symbols": ["advp_vp?", "inf", "adjunct_list_minus_adjp"], "postprocess": nt("inf_vp_minus_adjp")},
    {"name": "inf_vp_minus_adjp", "symbols": ["advp_vp?", "inf_predcomp", "adjunct_list_predcomp_minus_adjp"], "postprocess": nt("inf_vp_minus_adjp")},
    {"name": "inf_vp_minus_adjp", "symbols": ["advp_vp?", "inf_to_inf_cl", "adjunct_list_to_inf_cl_minus_adjp"], "postprocess": nt("inf_vp_minus_adjp")},
    {"name": "inf_vp_minus_adjp", "symbols": ["advp_vp?", "inf_bare_inf_cl", "adjunct_list_bare_inf_cl_minus_adjp"], "postprocess": nt("inf_vp_minus_adjp")},
    {"name": "inf_vp_minus_adjp", "symbols": ["advp_vp?", "inf_that_declarative_cl", "adjunct_list_that_declarative_cl_minus_adjp"], "postprocess": nt("inf_vp_minus_adjp")},
    {"name": "inf_vp_minus_adjp", "symbols": ["advp_vp?", "inf_bare_declarative_cl", "adjunct_list_bare_declarative_cl_minus_adjp"], "postprocess": nt("inf_vp_minus_adjp")},
    {"name": "inf_vp_minus_adjp", "symbols": ["advp_vp?", "inf_exclamative_cl", "adjunct_list_exclamative_cl_minus_adjp"], "postprocess": nt("inf_vp_minus_adjp")},
    {"name": "inf_vp_minus_adjp", "symbols": ["advp_vp?", "inf_interrogative_cl", "adjunct_list_interrogative_cl_minus_adjp"], "postprocess": nt("inf_vp_minus_adjp")},
    {"name": "inf_vp_minus_adjp", "symbols": ["advp_vp?", "inf_vbg_cl", "vbg_cl_minus_adjp"], "postprocess": nt("inf_vp_minus_adjp")},
    {"name": "inf_vp_minus_adjp", "symbols": ["advp_vp?", "inf_vbn_cl", "vbn_cl_minus_adjp"], "postprocess": nt("inf_vp_minus_adjp")},
    {"name": "inf_vp_minus_adjp", "symbols": ["advp_vp?", "inf_passive_cl", "passive_cl_minus_adjp"], "postprocess": nt("inf_vp_minus_adjp")},
    {"name": "inf_vp_minus_adjp", "symbols": ["advp_vp?", "inf_o", "adjunct_list_o_minus_adjp"], "postprocess": nt("inf_vp_minus_adjp")},
    {"name": "inf_vp_minus_adjp", "symbols": ["advp_vp?", "inf_o_predcomp", "adjunct_list_o_predcomp_minus_adjp"], "postprocess": nt("inf_vp_minus_adjp")},
    {"name": "inf_vp_minus_adjp", "symbols": ["advp_vp?", "inf_intnp_to_inf_cl", "adjunct_list_intnp_to_inf_cl_minus_adjp"], "postprocess": nt("inf_vp_minus_adjp")},
    {"name": "inf_vp_minus_adjp", "symbols": ["advp_vp?", "inf_intnp_bare_inf_cl", "adjunct_list_intnp_bare_inf_cl_minus_adjp"], "postprocess": nt("inf_vp_minus_adjp")},
    {"name": "inf_vp_minus_adjp", "symbols": ["advp_vp?", "inf_io_that_declarative_cl", "adjunct_list_io_that_declarative_cl_minus_adjp"], "postprocess": nt("inf_vp_minus_adjp")},
    {"name": "inf_vp_minus_adjp", "symbols": ["advp_vp?", "inf_io_bare_declarative_cl", "adjunct_list_io_bare_declarative_cl_minus_adjp"], "postprocess": nt("inf_vp_minus_adjp")},
    {"name": "inf_vp_minus_adjp", "symbols": ["advp_vp?", "inf_io_exclamative_cl", "adjunct_list_io_exclamative_cl_minus_adjp"], "postprocess": nt("inf_vp_minus_adjp")},
    {"name": "inf_vp_minus_adjp", "symbols": ["advp_vp?", "inf_io_interrogative_cl", "adjunct_list_io_interrogative_cl_minus_adjp"], "postprocess": nt("inf_vp_minus_adjp")},
    {"name": "inf_vp_minus_adjp", "symbols": ["advp_vp?", "inf_io_do", "adjunct_list_io_do_minus_adjp"], "postprocess": nt("inf_vp_minus_adjp")},
    {"name": "inf_vp_minus_adjp", "symbols": ["advp_vp?", "inf_io_do", "adjunct_list_do_dative_to_minus_adjp"], "postprocess": nt("inf_vp_minus_adjp")},
    {"name": "vbg_vp_minus_adjp", "symbols": ["advp_vp?", "vbg", "adjunct_list_minus_adjp"], "postprocess": nt("vbg_vp_minus_adjp")},
    {"name": "vbg_vp_minus_adjp", "symbols": ["advp_vp?", "vbg_predcomp", "adjunct_list_predcomp_minus_adjp"], "postprocess": nt("vbg_vp_minus_adjp")},
    {"name": "vbg_vp_minus_adjp", "symbols": ["advp_vp?", "vbg_to_inf_cl", "adjunct_list_to_inf_cl_minus_adjp"], "postprocess": nt("vbg_vp_minus_adjp")},
    {"name": "vbg_vp_minus_adjp", "symbols": ["advp_vp?", "vbg_bare_inf_cl", "adjunct_list_bare_inf_cl_minus_adjp"], "postprocess": nt("vbg_vp_minus_adjp")},
    {"name": "vbg_vp_minus_adjp", "symbols": ["advp_vp?", "vbg_that_declarative_cl", "adjunct_list_that_declarative_cl_minus_adjp"], "postprocess": nt("vbg_vp_minus_adjp")},
    {"name": "vbg_vp_minus_adjp", "symbols": ["advp_vp?", "vbg_bare_declarative_cl", "adjunct_list_bare_declarative_cl_minus_adjp"], "postprocess": nt("vbg_vp_minus_adjp")},
    {"name": "vbg_vp_minus_adjp", "symbols": ["advp_vp?", "vbg_exclamative_cl", "adjunct_list_exclamative_cl_minus_adjp"], "postprocess": nt("vbg_vp_minus_adjp")},
    {"name": "vbg_vp_minus_adjp", "symbols": ["advp_vp?", "vbg_interrogative_cl", "adjunct_list_interrogative_cl_minus_adjp"], "postprocess": nt("vbg_vp_minus_adjp")},
    {"name": "vbg_vp_minus_adjp", "symbols": ["advp_vp?", "vbg_vbg_cl", "vbg_cl_minus_adjp"], "postprocess": nt("vbg_vp_minus_adjp")},
    {"name": "vbg_vp_minus_adjp", "symbols": ["advp_vp?", "vbg_vbn_cl", "vbn_cl_minus_adjp"], "postprocess": nt("vbg_vp_minus_adjp")},
    {"name": "vbg_vp_minus_adjp", "symbols": ["advp_vp?", "vbg_passive_cl", "passive_cl_minus_adjp"], "postprocess": nt("vbg_vp_minus_adjp")},
    {"name": "vbg_vp_minus_adjp", "symbols": ["advp_vp?", "vbg_o", "adjunct_list_o_minus_adjp"], "postprocess": nt("vbg_vp_minus_adjp")},
    {"name": "vbg_vp_minus_adjp", "symbols": ["advp_vp?", "vbg_o_predcomp", "adjunct_list_o_predcomp_minus_adjp"], "postprocess": nt("vbg_vp_minus_adjp")},
    {"name": "vbg_vp_minus_adjp", "symbols": ["advp_vp?", "vbg_intnp_to_inf_cl", "adjunct_list_intnp_to_inf_cl_minus_adjp"], "postprocess": nt("vbg_vp_minus_adjp")},
    {"name": "vbg_vp_minus_adjp", "symbols": ["advp_vp?", "vbg_intnp_bare_inf_cl", "adjunct_list_intnp_bare_inf_cl_minus_adjp"], "postprocess": nt("vbg_vp_minus_adjp")},
    {"name": "vbg_vp_minus_adjp", "symbols": ["advp_vp?", "vbg_io_that_declarative_cl", "adjunct_list_io_that_declarative_cl_minus_adjp"], "postprocess": nt("vbg_vp_minus_adjp")},
    {"name": "vbg_vp_minus_adjp", "symbols": ["advp_vp?", "vbg_io_bare_declarative_cl", "adjunct_list_io_bare_declarative_cl_minus_adjp"], "postprocess": nt("vbg_vp_minus_adjp")},
    {"name": "vbg_vp_minus_adjp", "symbols": ["advp_vp?", "vbg_io_exclamative_cl", "adjunct_list_io_exclamative_cl_minus_adjp"], "postprocess": nt("vbg_vp_minus_adjp")},
    {"name": "vbg_vp_minus_adjp", "symbols": ["advp_vp?", "vbg_io_interrogative_cl", "adjunct_list_io_interrogative_cl_minus_adjp"], "postprocess": nt("vbg_vp_minus_adjp")},
    {"name": "vbg_vp_minus_adjp", "symbols": ["advp_vp?", "vbg_io_do", "adjunct_list_io_do_minus_adjp"], "postprocess": nt("vbg_vp_minus_adjp")},
    {"name": "vbg_vp_minus_adjp", "symbols": ["advp_vp?", "vbg_io_do", "adjunct_list_do_dative_to_minus_adjp"], "postprocess": nt("vbg_vp_minus_adjp")},
    {"name": "vbn_vp_minus_adjp", "symbols": ["advp_vp?", "vbn", "adjunct_list_minus_adjp"], "postprocess": nt("vbn_vp_minus_adjp")},
    {"name": "vbn_vp_minus_adjp", "symbols": ["advp_vp?", "vbn_predcomp", "adjunct_list_predcomp_minus_adjp"], "postprocess": nt("vbn_vp_minus_adjp")},
    {"name": "vbn_vp_minus_adjp", "symbols": ["advp_vp?", "vbn_to_inf_cl", "adjunct_list_to_inf_cl_minus_adjp"], "postprocess": nt("vbn_vp_minus_adjp")},
    {"name": "vbn_vp_minus_adjp", "symbols": ["advp_vp?", "vbn_bare_inf_cl", "adjunct_list_bare_inf_cl_minus_adjp"], "postprocess": nt("vbn_vp_minus_adjp")},
    {"name": "vbn_vp_minus_adjp", "symbols": ["advp_vp?", "vbn_that_declarative_cl", "adjunct_list_that_declarative_cl_minus_adjp"], "postprocess": nt("vbn_vp_minus_adjp")},
    {"name": "vbn_vp_minus_adjp", "symbols": ["advp_vp?", "vbn_bare_declarative_cl", "adjunct_list_bare_declarative_cl_minus_adjp"], "postprocess": nt("vbn_vp_minus_adjp")},
    {"name": "vbn_vp_minus_adjp", "symbols": ["advp_vp?", "vbn_exclamative_cl", "adjunct_list_exclamative_cl_minus_adjp"], "postprocess": nt("vbn_vp_minus_adjp")},
    {"name": "vbn_vp_minus_adjp", "symbols": ["advp_vp?", "vbn_interrogative_cl", "adjunct_list_interrogative_cl_minus_adjp"], "postprocess": nt("vbn_vp_minus_adjp")},
    {"name": "vbn_vp_minus_adjp", "symbols": ["advp_vp?", "vbn_vbg_cl", "vbg_cl_minus_adjp"], "postprocess": nt("vbn_vp_minus_adjp")},
    {"name": "vbn_vp_minus_adjp", "symbols": ["advp_vp?", "vbn_vbn_cl", "vbn_cl_minus_adjp"], "postprocess": nt("vbn_vp_minus_adjp")},
    {"name": "vbn_vp_minus_adjp", "symbols": ["advp_vp?", "vbn_passive_cl", "passive_cl_minus_adjp"], "postprocess": nt("vbn_vp_minus_adjp")},
    {"name": "vbn_vp_minus_adjp", "symbols": ["advp_vp?", "vbn_o", "adjunct_list_o_minus_adjp"], "postprocess": nt("vbn_vp_minus_adjp")},
    {"name": "vbn_vp_minus_adjp", "symbols": ["advp_vp?", "vbn_o_predcomp", "adjunct_list_o_predcomp_minus_adjp"], "postprocess": nt("vbn_vp_minus_adjp")},
    {"name": "vbn_vp_minus_adjp", "symbols": ["advp_vp?", "vbn_intnp_to_inf_cl", "adjunct_list_intnp_to_inf_cl_minus_adjp"], "postprocess": nt("vbn_vp_minus_adjp")},
    {"name": "vbn_vp_minus_adjp", "symbols": ["advp_vp?", "vbn_intnp_bare_inf_cl", "adjunct_list_intnp_bare_inf_cl_minus_adjp"], "postprocess": nt("vbn_vp_minus_adjp")},
    {"name": "vbn_vp_minus_adjp", "symbols": ["advp_vp?", "vbn_io_that_declarative_cl", "adjunct_list_io_that_declarative_cl_minus_adjp"], "postprocess": nt("vbn_vp_minus_adjp")},
    {"name": "vbn_vp_minus_adjp", "symbols": ["advp_vp?", "vbn_io_bare_declarative_cl", "adjunct_list_io_bare_declarative_cl_minus_adjp"], "postprocess": nt("vbn_vp_minus_adjp")},
    {"name": "vbn_vp_minus_adjp", "symbols": ["advp_vp?", "vbn_io_exclamative_cl", "adjunct_list_io_exclamative_cl_minus_adjp"], "postprocess": nt("vbn_vp_minus_adjp")},
    {"name": "vbn_vp_minus_adjp", "symbols": ["advp_vp?", "vbn_io_interrogative_cl", "adjunct_list_io_interrogative_cl_minus_adjp"], "postprocess": nt("vbn_vp_minus_adjp")},
    {"name": "vbn_vp_minus_adjp", "symbols": ["advp_vp?", "vbn_io_do", "adjunct_list_io_do_minus_adjp"], "postprocess": nt("vbn_vp_minus_adjp")},
    {"name": "vbn_vp_minus_adjp", "symbols": ["advp_vp?", "vbn_io_do", "adjunct_list_do_dative_to_minus_adjp"], "postprocess": nt("vbn_vp_minus_adjp")},
    {"name": "passive_cl_minus_adjp", "symbols": ["advp_vp?", "vbn_o", "adjunct_list_passive_o_minus_adjp"], "postprocess": nt("passive_cl_minus_adjp")},
    {"name": "passive_cl_minus_adjp", "symbols": ["advp_vp?", "vbn_o_predcomp", "adjunct_list_passive_o_predcomp_minus_adjp"], "postprocess": nt("passive_cl_minus_adjp")},
    {"name": "passive_cl_minus_adjp", "symbols": ["advp_vp?", "vbn_intnp_to_inf_cl", "adjunct_list_passive_intnp_to_inf_cl_minus_adjp"], "postprocess": nt("passive_cl_minus_adjp")},
    {"name": "passive_cl_minus_adjp", "symbols": ["advp_vp?", "vbn_io_that_declarative_cl", "adjunct_list_passive_io_that_declarative_cl_minus_adjp"], "postprocess": nt("passive_cl_minus_adjp")},
    {"name": "passive_cl_minus_adjp", "symbols": ["advp_vp?", "vbn_io_bare_declarative_cl", "adjunct_list_passive_io_bare_declarative_cl_minus_adjp"], "postprocess": nt("passive_cl_minus_adjp")},
    {"name": "passive_cl_minus_adjp", "symbols": ["advp_vp?", "vbn_io_exclamative_cl", "adjunct_list_passive_io_exclamative_cl_minus_adjp"], "postprocess": nt("passive_cl_minus_adjp")},
    {"name": "passive_cl_minus_adjp", "symbols": ["advp_vp?", "vbn_io_interrogative_cl", "adjunct_list_passive_io_interrogative_cl_minus_adjp"], "postprocess": nt("passive_cl_minus_adjp")},
    {"name": "passive_cl_minus_adjp", "symbols": ["advp_vp?", "vbn_io_do", "adjunct_list_passive_io_do_minus_adjp"], "postprocess": nt("passive_cl_minus_adjp")},
    {"name": "passive_cl_minus_adjp", "symbols": ["advp_vp?", "vbn_io_do", "adjunct_list_passive_do_dative_to_minus_adjp"], "postprocess": nt("passive_cl_minus_adjp")},
    {"name": "to_inf_cl", "symbols": ["to", "inf_vp"], "postprocess": nt("to_inf_cl")},
    {"name": "to_inf_cl_minus_np", "symbols": ["to", "inf_vp_minus_np"], "postprocess": nt("to_inf_cl_minus_np")},
    {"name": "to_inf_cl_minus_adjp", "symbols": ["to", "inf_vp_minus_adjp"], "postprocess": nt("to_inf_cl_minus_adjp")},
    {"name": "bare_inf_cl", "symbols": ["inf_vp"], "postprocess": nt("bare_inf_cl")},
    {"name": "bare_inf_cl_minus_np", "symbols": ["inf_vp_minus_np"], "postprocess": nt("bare_inf_cl_minus_np")},
    {"name": "bare_inf_cl_minus_adjp", "symbols": ["inf_vp_minus_adjp"], "postprocess": nt("bare_inf_cl_minus_adjp")},
    {"name": "vbg_cl", "symbols": ["vbg_vp"], "postprocess": nt("vbg_cl")},
    {"name": "vbg_cl_minus_np", "symbols": ["vbg_vp_minus_np"], "postprocess": nt("vbg_cl_minus_np")},
    {"name": "vbg_cl_minus_adjp", "symbols": ["vbg_vp_minus_adjp"], "postprocess": nt("vbg_cl_minus_adjp")},
    {"name": "vbn_cl", "symbols": ["vbn_vp"], "postprocess": nt("vbn_cl")},
    {"name": "vbn_cl_minus_np", "symbols": ["vbn_vp_minus_np"], "postprocess": nt("vbn_cl_minus_np")},
    {"name": "vbn_cl_minus_adjp", "symbols": ["vbn_vp_minus_adjp"], "postprocess": nt("vbn_cl_minus_adjp")},
    {"name": "that_declarative_cl", "symbols": ["that", "bare_declarative_cl"], "postprocess": nt("that_declarative_cl")},
    {"name": "bare_declarative_cl", "symbols": ["fin_cl"], "postprocess": nt("bare_declarative_cl")},
    {"name": "exclamative_cl", "symbols": ["ip_advp_vp", "fin_cl"], "postprocess": nt("exclamative_cl")},
    {"name": "exclamative_cl", "symbols": ["ip_adjp", "np_sg", "vbf_sg_vp_minus_adjp"], "postprocess": nt("exclamative_cl")},
    {"name": "exclamative_cl", "symbols": ["ip_adjp", "np_pl", "vbf_pl_vp_minus_adjp"], "postprocess": nt("exclamative_cl")},
    {"name": "interrogative_cl", "symbols": ["interrogative_subordinator", "np_sg", "vbf_sg_vp"], "postprocess": nt("interrogative_cl")},
    {"name": "interrogative_cl", "symbols": ["interrogative_subordinator", "np_pl", "vbf_pl_vp"], "postprocess": nt("interrogative_cl")},
    {"name": "interrogative_cl", "symbols": ["ip_np_sg", "vbf_sg_vp"], "postprocess": nt("interrogative_cl")},
    {"name": "interrogative_cl", "symbols": ["ip_np_pl", "vbf_pl_vp"], "postprocess": nt("interrogative_cl")},
    {"name": "interrogative_cl", "symbols": ["ip_np", "np_sg", "vbf_sg_vp_minus_np"], "postprocess": nt("interrogative_cl")},
    {"name": "interrogative_cl", "symbols": ["ip_np", "np_pl", "vbf_pl_vp_minus_np"], "postprocess": nt("interrogative_cl")},
    {"name": "interrogative_cl", "symbols": ["ip_pp", "np_sg", "vbf_sg_vp"], "postprocess": nt("interrogative_cl")},
    {"name": "interrogative_cl", "symbols": ["ip_pp", "np_pl", "vbf_pl_vp"], "postprocess": nt("interrogative_cl")},
    {"name": "fused_relative_clause_sg", "symbols": ["ip_np_sg", "vbf_sg_vp"], "postprocess": nt("fused_relative_clause_sg")},
    {"name": "fused_relative_clause_sg", "symbols": ["ip_np_sg", "np_sg", "vbf_sg_vp_minus_np"], "postprocess": nt("fused_relative_clause_sg")},
    {"name": "fused_relative_clause_sg", "symbols": ["ip_np_sg", "np_pl", "vbf_pl_vp_minus_np"], "postprocess": nt("fused_relative_clause_sg")},
    {"name": "fused_relative_clause_pl", "symbols": ["ip_np_pl", "vbf_pl_vp"], "postprocess": nt("fused_relative_clause_pl")},
    {"name": "fused_relative_clause_pl", "symbols": ["ip_np_pl", "np_sg", "vbf_sg_vp_minus_np"], "postprocess": nt("fused_relative_clause_pl")},
    {"name": "fused_relative_clause_pl", "symbols": ["ip_np_pl", "np_pl", "vbf_pl_vp_minus_np"], "postprocess": nt("fused_relative_clause_pl")},
    {"name": "dative_to", "symbols": ["to", "np"], "postprocess": nt("dative_to")},
    {"name": "dative_to_minus_np", "symbols": ["to", "np_minus_np"], "postprocess": nt("dative_to_minus_np")},
    {"name": "dative_to_minus_adjp", "symbols": ["to", "np_minus_adjp"], "postprocess": nt("dative_to_minus_adjp")},
    {"name": "ip_advp_vp", "symbols": ["how", "advp_vp"], "postprocess": nt("ip_advp_vp")},
    {"name": "ip_advp_vp", "symbols": ["how"], "postprocess": nt("ip_advp_vp")},
    {"name": "ip_adjp", "symbols": ["how", "adjp"], "postprocess": nt("ip_advp_vp")},
    {"name": "ip_adjp", "symbols": ["how"], "postprocess": nt("ip_advp_vp")},
    {"name": "bare_declarative_cl_minus_np", "symbols": ["vbf_sg_vp"], "postprocess": nt("bare_declarative_cl_minus_np")},
    {"name": "bare_declarative_cl_minus_np", "symbols": ["vbf_pl_vp"], "postprocess": nt("bare_declarative_cl_minus_np")},
    {"name": "bare_declarative_cl_minus_np", "symbols": ["np_sg", "vbf_sg_vp_minus_np"], "postprocess": nt("bare_declarative_cl_minus_np")},
    {"name": "bare_declarative_cl_minus_np", "symbols": ["np_pl", "vbf_pl_vp_minus_np"], "postprocess": nt("bare_declarative_cl_minus_np")},
    {"name": "that_declarative_cl_minus_np", "symbols": ["that", "bare_declarative_cl_minus_np"], "postprocess": nt("that_declarative_cl_minus_np")},
    {"name": "bare_declarative_cl_minus_adjp", "symbols": ["np_sg", "vbf_sg_vp_minus_adjp"], "postprocess": nt("bare_declarative_cl_minus_adjp")},
    {"name": "bare_declarative_cl_minus_adjp", "symbols": ["np_sg", "vbf_sg_vp"], "postprocess": nt("bare_declarative_cl_minus_adjp")},
    {"name": "bare_declarative_cl_minus_adjp", "symbols": ["np_pl", "vbf_pl_vp_minus_adjp"], "postprocess": nt("bare_declarative_cl_minus_adjp")},
    {"name": "bare_declarative_cl_minus_adjp", "symbols": ["np_pl", "vbf_pl_vp"], "postprocess": nt("bare_declarative_cl_minus_adjp")},
    {"name": "that_declarative_cl_minus_adjp", "symbols": ["that", "bare_declarative_cl_minus_adjp"], "postprocess": nt("that_declarative_cl_minus_adjp")},
    {"name": "ip_np_sg", "symbols": ["who"], "postprocess": nt("ip_np_sg")},
    {"name": "ip_np_sg", "symbols": ["what"], "postprocess": nt("ip_np_sg")},
    {"name": "ip_np_sg", "symbols": ["which"], "postprocess": nt("ip_np_sg")},
    {"name": "ip_np_sg", "symbols": ["ip_det", "adjp_list", "noun_sg", "n_modifier_list_sg"], "postprocess": nt("ip_np_sg")},
    {"name": "ip_np_pl", "symbols": ["ip_det", "adjp_list", "noun_pl", "n_modifier_list_pl"], "postprocess": nt("ip_np_pl")},
    {"name": "ip_np", "symbols": ["ip_np_sg"], "postprocess": nt("ip_np")},
    {"name": "ip_np", "symbols": ["ip_np_pl"], "postprocess": nt("ip_np")},
    {"name": "ip_det", "symbols": ["which"], "postprocess": nt("ip_det")},
    {"name": "ip_det", "symbols": ["whose"], "postprocess": nt("ip_det")},
    {"name": "np", "symbols": ["np_sg"], "postprocess": nt("np")},
    {"name": "np", "symbols": ["np_pl"], "postprocess": nt("np")},
    {"name": "np_sg", "symbols": ["precorenp_modifier?", "core_np_sg", "postcorenp_modifier?"], "postprocess": nt("np_sg")},
    {"name": "np_pl", "symbols": ["precorenp_modifier?", "core_np_pl", "postcorenp_modifier?"], "postprocess": nt("np_pl")},
    {"name": "np_minus_np", "symbols": ["precorenp_modifier?", "core_np_sg_minus_np", "postcorenp_modifier?"], "postprocess": nt("np_minus_np")},
    {"name": "np_minus_np", "symbols": ["precorenp_modifier?", "core_np_pl_minus_np", "postcorenp_modifier?"], "postprocess": nt("np_minus_np")},
    {"name": "np_minus_np", "symbols": [], "postprocess": nt("np_minus_np")},
    {"name": "np_minus_adjp", "symbols": ["np"], "postprocess": nt("np_minus_adjp")},
    {"name": "precorenp_modifier?", "symbols": ["precorenp_modifier"], "postprocess": nt("precorenp_modifier?")},
    {"name": "precorenp_modifier?", "symbols": [], "postprocess": nt("precorenp_modifier?")},
    {"name": "postcorenp_modifier?", "symbols": ["postcorenp_modifier"], "postprocess": nt("postcorenp_modifier?")},
    {"name": "postcorenp_modifier?", "symbols": [], "postprocess": nt("postcorenp_modifier?")},
    {"name": "core_np_sg", "symbols": ["proper_noun_sg"], "postprocess": nt("core_np_sg")},
    {"name": "core_np_sg", "symbols": ["pronoun_sg"], "postprocess": nt("core_np_sg")},
    {"name": "core_np_sg", "symbols": ["independent_genitive_pronoun"], "postprocess": nt("core_np_sg")},
    {"name": "core_np_sg", "symbols": ["predeterminer_modifier?", "determiner?", "adjp_list", "noun_sg", "n_modifier_list_sg"], "postprocess": nt("core_np_sg")},
    {"name": "core_np_sg", "symbols": ["fused_relative_clause_sg"], "postprocess": nt("core_np_sg")},
    {"name": "core_np_pl", "symbols": ["proper_noun_pl"], "postprocess": nt("core_np_pl")},
    {"name": "core_np_pl", "symbols": ["pronoun_pl"], "postprocess": nt("core_np_pl")},
    {"name": "core_np_pl", "symbols": ["independent_genitive_pronoun"], "postprocess": nt("core_np_pl")},
    {"name": "core_np_pl", "symbols": ["predeterminer_modifier?", "determiner?", "adjp_list", "noun_pl", "n_modifier_list_pl"], "postprocess": nt("core_np_pl")},
    {"name": "core_np_pl", "symbols": ["fused_relative_clause_pl"], "postprocess": nt("core_np_pl")},
    {"name": "core_np_sg_minus_np", "symbols": ["predeterminer_modifier?", "determiner?", "adjp_list", "noun_sg", "n_modifier_list_minus_np"], "postprocess": nt("core_np_sg_minus_np")},
    {"name": "core_np_pl_minus_np", "symbols": ["predeterminer_modifier?", "determiner?", "adjp_list", "noun_pl", "n_modifier_list_minus_np"], "postprocess": nt("core_np_pl_minus_np")},
    {"name": "number", "symbols": ["digits"]},
    {"name": "number", "symbols": ["cardinal_number_eng"], "postprocess": nt("number")},
    {"name": "quantificational_expression", "symbols": ["quantificational_modifier"], "postprocess": nt("quantificational_expression")},
    {"name": "quantificational_expression", "symbols": ["number", "fraction_denominator"], "postprocess": nt("quantificational_expression")},
    {"name": "quantificational_expression", "symbols": ["number", "times"], "postprocess": nt("quantificational_expression")},
    {"name": "precore_emphatic_expression", "symbols": ["precore_emphatic_modifier"], "postprocess": nt("precore_emphatic_modifier")},
    {"name": "precore_emphatic_expression", "symbols": ["precore_emphatic_modifier_adjp", "adjp"], "postprocess": nt("precore_emphatic_modifier")},
    {"name": "predeterminer_modifier?", "symbols": [], "postprocess": nt("predeterminer_modifier")},
    {"name": "predeterminer_modifier?", "symbols": ["quantificational_expression"], "postprocess": nt("predeterminer_modifier")},
    {"name": "predeterminer_modifier?", "symbols": ["precore_emphatic_expression"], "postprocess": nt("predeterminer_modifier")},
    {"name": "relative_ip_np_subj", "symbols": ["who"], "postprocess": nt("relative_ip_np_subj")},
    {"name": "relative_ip_np_subj", "symbols": ["which"], "postprocess": nt("relative_ip_np_subj")},
    {"name": "relative_ip_np_subj", "symbols": ["that"], "postprocess": nt("relative_ip_np_subj")},
    {"name": "relative_ip_np_obj", "symbols": [], "postprocess": nt("relative_ip_np_")},
    {"name": "relative_ip_np_obj", "symbols": ["that"], "postprocess": nt("relative_ip_np_")},
    {"name": "relative_ip_np_obj", "symbols": ["ip_np"], "postprocess": nt("relative_ip_np_")},
    {"name": "restrictive_cl_sg", "symbols": ["relative_ip_np_subj", "vbf_sg_vp"], "postprocess": nt("restrictive_cl_sg")},
    {"name": "restrictive_cl_sg", "symbols": ["relative_ip_np_obj", "np_sg", "vbf_sg_vp_minus_np"], "postprocess": nt("restrictive_cl_sg")},
    {"name": "restrictive_cl_sg", "symbols": ["relative_ip_np_obj", "np_pl", "vbf_pl_vp_minus_np"], "postprocess": nt("restrictive_cl_sg")},
    {"name": "restrictive_cl_pl", "symbols": ["relative_ip_np_subj", "vbf_pl_vp"], "postprocess": nt("restrictive_cl_pl")},
    {"name": "restrictive_cl_pl", "symbols": ["relative_ip_np_obj", "np_sg", "vbf_sg_vp_minus_np"], "postprocess": nt("restrictive_cl_pl")},
    {"name": "restrictive_cl_pl", "symbols": ["relative_ip_np_obj", "np_pl", "vbf_pl_vp_minus_np"], "postprocess": nt("restrictive_cl_pl")},
    {"name": "n_modifier_sg", "symbols": ["restrictive_cl_sg"], "postprocess": nt("n_modifier_sg")},
    {"name": "n_modifier_sg", "symbols": ["pp"], "postprocess": nt("n_modifier_sg")},
    {"name": "n_modifier_sg", "symbols": ["passive_cl"], "postprocess": nt("n_modifier_sg")},
    {"name": "n_modifier_pl", "symbols": ["restrictive_cl_pl"], "postprocess": nt("n_modifier_pl")},
    {"name": "n_modifier_pl", "symbols": ["pp"], "postprocess": nt("n_modifier_pl")},
    {"name": "n_modifier_pl", "symbols": ["passive_cl"], "postprocess": nt("n_modifier_pl")},
    {"name": "n_modifier_list_sg$ebnf$1", "symbols": []},
    {"name": "n_modifier_list_sg$ebnf$1", "symbols": ["n_modifier_list_sg$ebnf$1", "n_modifier_sg"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "n_modifier_list_sg", "symbols": ["n_modifier_list_sg$ebnf$1"], "postprocess": nonterminal_unpack("n_modifier_list_sg")},
    {"name": "n_modifier_list_pl$ebnf$1", "symbols": []},
    {"name": "n_modifier_list_pl$ebnf$1", "symbols": ["n_modifier_list_pl$ebnf$1", "n_modifier_pl"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "n_modifier_list_pl", "symbols": ["n_modifier_list_pl$ebnf$1"], "postprocess": nonterminal_unpack("n_modifier_list_pl")},
    {"name": "n_modifier_list_minus_np", "symbols": ["pp_minus_np"], "postprocess": nonterminal_unpack("n_modifier_list_minus_np")},
    {"name": "determiner?", "symbols": [], "postprocess": nt("determiner")},
    {"name": "determiner?", "symbols": ["dp"], "postprocess": nt("determiner")},
    {"name": "determiner?", "symbols": ["genitive_np"], "postprocess": nt("determiner")},
    {"name": "genitive_np", "symbols": ["np", "s"], "postprocess": nt("genitive_np")},
    {"name": "genitive_np", "symbols": ["dependent_genitive_pronoun"], "postprocess": nt("genitive_np")},
    {"name": "dp_modifier?", "symbols": [], "postprocess": nt("dp_modifier?")},
    {"name": "dp_modifier?", "symbols": ["dp_modifier"], "postprocess": nt("dp_modifier?")},
    {"name": "dp", "symbols": ["dp_modifier?", "core_dp"], "postprocess": nt("dp")},
    {"name": "core_dp", "symbols": ["determinative"], "postprocess": nt("core_dp")},
    {"name": "core_dp", "symbols": ["number"], "postprocess": nt("core_dp")},
    {"name": "adjunct", "symbols": ["pp"], "postprocess": nt("adjunct")},
    {"name": "adjunct", "symbols": ["advp_vp"], "postprocess": nt("adjunct")},
    {"name": "adjunct_minus_np", "symbols": ["pp_minus_np"], "postprocess": nt("adjunct")},
    {"name": "adjunct_minus_adjp", "symbols": [], "postprocess": nt("adjunct_minus_adjp")},
    {"name": "ip_pp", "symbols": ["where"], "postprocess": nt("ip_pp")},
    {"name": "ip_pp", "symbols": ["when"], "postprocess": nt("ip_pp")},
    {"name": "ip_pp", "symbols": ["why"], "postprocess": nt("ip_pp")},
    {"name": "ip_pp", "symbols": ["preposition_np", "ip_np"], "postprocess": nt("ip_pp")},
    {"name": "pp", "symbols": ["preposition"], "postprocess": nt("pp")},
    {"name": "pp", "symbols": ["preposition_np", "np"], "postprocess": nt("pp")},
    {"name": "pp", "symbols": ["preposition_predcomp", "predcomp"], "postprocess": nt("pp")},
    {"name": "pp", "symbols": ["preposition_advp", "advp"], "postprocess": nt("pp")},
    {"name": "pp", "symbols": ["preposition_bare_declarative_cl", "bare_declarative_cl"], "postprocess": nt("pp")},
    {"name": "pp_minus_np", "symbols": ["preposition_np"], "postprocess": nt("pp_minus_np")},
    {"name": "predcomp", "symbols": ["adjp"], "postprocess": nt("predcomp")},
    {"name": "predcomp_minus_np", "symbols": ["adjp_minus_np"], "postprocess": nt("predcomp_minus_np")},
    {"name": "predcomp_minus_adjp", "symbols": [], "postprocess": nt("predcomp_minus_adjp")},
    {"name": "adjp", "symbols": ["advp", "adjp"], "postprocess": nt("adjp")},
    {"name": "adjp", "symbols": ["adj"], "postprocess": nt("adjp")},
    {"name": "adjp", "symbols": ["adj_pp", "pp"], "postprocess": nt("adjp")},
    {"name": "adjp", "symbols": ["adj_bare_declarative_cl", "bare_declarative_cl"], "postprocess": nt("adjp")},
    {"name": "adjp", "symbols": ["adj_that_declarative_cl", "that_declarative_cl"], "postprocess": nt("adjp")},
    {"name": "adjp", "symbols": ["adj_to_inf_cl", "to_inf_cl"], "postprocess": nt("adjp")},
    {"name": "adjp_minus_np", "symbols": ["advp", "adjp_minus_np"], "postprocess": nt("adjp_minus_np")},
    {"name": "adjp_minus_np", "symbols": ["adj_pp", "preposition"], "postprocess": nt("adjp_minus_np")},
    {"name": "adjp_minus_np", "symbols": ["adj_that_declarative_cl", "that_declarative_cl_minus_np"], "postprocess": nt("adjp_minus_np")},
    {"name": "adjp_minus_np", "symbols": ["adj_bare_declarative_cl", "bare_declarative_cl_minus_np"], "postprocess": nt("adjp_minus_np")},
    {"name": "adjp_minus_np", "symbols": ["adj_to_inf_cl", "to_inf_cl_minus_np"], "postprocess": nt("adjp_minus_np")},
    {"name": "adjp_list$ebnf$1", "symbols": []},
    {"name": "adjp_list$ebnf$1", "symbols": ["adjp_list$ebnf$1", "adjp"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "adjp_list", "symbols": ["adjp_list$ebnf$1"], "postprocess": nonterminal_unpack("adjp_list")},
    {"name": "advp", "symbols": ["adv"], "postprocess": nt("advp")},
    {"name": "advp", "symbols": ["adv", "advp"], "postprocess": nt("advp")},
    {"name": "advp_vp", "symbols": ["adv_vp"], "postprocess": nt("advp_vp")},
    {"name": "advp_vp", "symbols": ["adv", "advp_vp"], "postprocess": nt("advp_vp")},
    {"name": "advp_vp?", "symbols": ["advp_vp"], "postprocess": nt("advp_vp?")},
    {"name": "advp_vp?", "symbols": [], "postprocess": nt("advp_vp?")},
    {"name": "advp?", "symbols": ["advp"], "postprocess": nt("advp?")},
    {"name": "advp?", "symbols": [], "postprocess": nt("advp?")},
    {"name": "not?", "symbols": ["not"], "postprocess": nt("not?")},
    {"name": "not?", "symbols": [], "postprocess": nt("not?")},
    {"name": "impossible$string$1", "symbols": [{"literal":"<"}, {"literal":"<"}, {"literal":"i"}, {"literal":"m"}, {"literal":"p"}, {"literal":"o"}, {"literal":"s"}, {"literal":"s"}, {"literal":"i"}, {"literal":"b"}, {"literal":"l"}, {"literal":"e"}, {"literal":">"}, {"literal":">"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "impossible", "symbols": ["impossible$string$1"], "postprocess": t("impossible")},
    {"name": "determinative", "symbols": [determinative], "postprocess": t("determinative")},
    {"name": "dp_modifier", "symbols": [dp_modifier], "postprocess": t("dp_modifier")},
    {"name": "pronoun_sg", "symbols": [pronoun_sg], "postprocess": t("pronoun_sg")},
    {"name": "pronoun_pl", "symbols": [pronoun_pl], "postprocess": t("pronoun_pl")},
    {"name": "dependent_genitive_pronoun", "symbols": [dependent_genitive_pronoun], "postprocess": t("dependent_genitive_pronoun")},
    {"name": "independent_genitive_pronoun", "symbols": [independent_genitive_pronoun], "postprocess": t("independent_genitive_pronoun")},
    {"name": "proper_noun_sg", "symbols": [proper_noun_sg], "postprocess": t("proper_noun_sg")},
    {"name": "proper_noun_pl", "symbols": [proper_noun_pl], "postprocess": t("proper_noun_pl")},
    {"name": "noun_sg", "symbols": [noun_sg], "postprocess": t("noun_sg")},
    {"name": "noun_pl", "symbols": [noun_pl], "postprocess": t("noun_pl")},
    {"name": "preposition", "symbols": [preposition], "postprocess": t("preposition")},
    {"name": "preposition_np", "symbols": [preposition_np], "postprocess": t("preposition_np")},
    {"name": "preposition_predcomp", "symbols": [preposition_predcomp], "postprocess": t("preposition_predcomp")},
    {"name": "preposition_pp", "symbols": [preposition_pp], "postprocess": t("preposition_pp")},
    {"name": "preposition_advp", "symbols": [preposition_advp], "postprocess": t("preposition_advp")},
    {"name": "preposition_bare_declarative_cl", "symbols": [preposition_bare_declarative_cl], "postprocess": t("preposition_bare_declarative_cl")},
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
    {"name": "inf", "symbols": [inf], "postprocess": t("inf")},
    {"name": "inf_predcomp", "symbols": [inf_predcomp], "postprocess": t("inf_predcomp")},
    {"name": "inf_to_inf_cl", "symbols": [inf_to_inf_cl], "postprocess": t("inf_to_inf_cl")},
    {"name": "inf_bare_inf_cl", "symbols": [inf_bare_inf_cl], "postprocess": t("inf_bare_inf_cl")},
    {"name": "inf_that_declarative_cl", "symbols": [inf_that_declarative_cl], "postprocess": t("inf_that_declarative_cl")},
    {"name": "inf_bare_declarative_cl", "symbols": [inf_bare_declarative_cl], "postprocess": t("inf_bare_declarative_cl")},
    {"name": "inf_exclamative_cl", "symbols": [inf_exclamative_cl], "postprocess": t("inf_exclamative_cl")},
    {"name": "inf_interrogative_cl", "symbols": [inf_interrogative_cl], "postprocess": t("inf_interrogative_cl")},
    {"name": "inf_vbg_cl", "symbols": [inf_vbg_cl], "postprocess": t("inf_vbg_cl")},
    {"name": "inf_vbn_cl", "symbols": [inf_vbn_cl], "postprocess": t("inf_vbn_cl")},
    {"name": "inf_passive_cl", "symbols": [inf_passive_cl], "postprocess": t("inf_passive_cl")},
    {"name": "inf_o", "symbols": [inf_o], "postprocess": t("inf_o")},
    {"name": "inf_o_predcomp", "symbols": [inf_o_predcomp], "postprocess": t("inf_o_predcomp")},
    {"name": "inf_intnp_to_inf_cl", "symbols": [inf_intnp_to_inf_cl], "postprocess": t("inf_intnp_to_inf_cl")},
    {"name": "inf_intnp_bare_inf_cl", "symbols": [inf_intnp_bare_inf_cl], "postprocess": t("inf_intnp_bare_inf_cl")},
    {"name": "inf_io_that_declarative_cl", "symbols": [inf_io_that_declarative_cl], "postprocess": t("inf_io_that_declarative_cl")},
    {"name": "inf_io_bare_declarative_cl", "symbols": [inf_io_bare_declarative_cl], "postprocess": t("inf_io_bare_declarative_cl")},
    {"name": "inf_io_exclamative_cl", "symbols": [inf_io_exclamative_cl], "postprocess": t("inf_io_exclamative_cl")},
    {"name": "inf_io_interrogative_cl", "symbols": [inf_io_interrogative_cl], "postprocess": t("inf_io_interrogative_cl")},
    {"name": "inf_io_do", "symbols": [inf_io_do], "postprocess": t("inf_io_do")},
    {"name": "vbg", "symbols": [vbg], "postprocess": t("vbg")},
    {"name": "vbg_predcomp", "symbols": [vbg_predcomp], "postprocess": t("vbg_predcomp")},
    {"name": "vbg_to_inf_cl", "symbols": [vbg_to_inf_cl], "postprocess": t("vbg_to_inf_cl")},
    {"name": "vbg_bare_inf_cl", "symbols": [vbg_bare_inf_cl], "postprocess": t("vbg_bare_inf_cl")},
    {"name": "vbg_that_declarative_cl", "symbols": [vbg_that_declarative_cl], "postprocess": t("vbg_that_declarative_cl")},
    {"name": "vbg_bare_declarative_cl", "symbols": [vbg_bare_declarative_cl], "postprocess": t("vbg_bare_declarative_cl")},
    {"name": "vbg_exclamative_cl", "symbols": [vbg_exclamative_cl], "postprocess": t("vbg_exclamative_cl")},
    {"name": "vbg_interrogative_cl", "symbols": [vbg_interrogative_cl], "postprocess": t("vbg_interrogative_cl")},
    {"name": "vbg_vbg_cl", "symbols": [vbg_vbg_cl], "postprocess": t("vbg_vbg_cl")},
    {"name": "vbg_vbn_cl", "symbols": [vbg_vbn_cl], "postprocess": t("vbg_vbn_cl")},
    {"name": "vbg_passive_cl", "symbols": [vbg_passive_cl], "postprocess": t("vbg_passive_cl")},
    {"name": "vbg_o", "symbols": [vbg_o], "postprocess": t("vbg_o")},
    {"name": "vbg_o_predcomp", "symbols": [vbg_o_predcomp], "postprocess": t("vbg_o_predcomp")},
    {"name": "vbg_intnp_to_inf_cl", "symbols": [vbg_intnp_to_inf_cl], "postprocess": t("vbg_intnp_to_inf_cl")},
    {"name": "vbg_intnp_bare_inf_cl", "symbols": [vbg_intnp_bare_inf_cl], "postprocess": t("vbg_intnp_bare_inf_cl")},
    {"name": "vbg_io_that_declarative_cl", "symbols": [vbg_io_that_declarative_cl], "postprocess": t("vbg_io_that_declarative_cl")},
    {"name": "vbg_io_bare_declarative_cl", "symbols": [vbg_io_bare_declarative_cl], "postprocess": t("vbg_io_bare_declarative_cl")},
    {"name": "vbg_io_exclamative_cl", "symbols": [vbg_io_exclamative_cl], "postprocess": t("vbg_io_exclamative_cl")},
    {"name": "vbg_io_interrogative_cl", "symbols": [vbg_io_interrogative_cl], "postprocess": t("vbg_io_interrogative_cl")},
    {"name": "vbg_io_do", "symbols": [vbg_io_do], "postprocess": t("vbg_io_do")},
    {"name": "vbn", "symbols": [vbn], "postprocess": t("vbn")},
    {"name": "vbn_predcomp", "symbols": [vbn_predcomp], "postprocess": t("vbn_predcomp")},
    {"name": "vbn_to_inf_cl", "symbols": [vbn_to_inf_cl], "postprocess": t("vbn_to_inf_cl")},
    {"name": "vbn_bare_inf_cl", "symbols": [vbn_bare_inf_cl], "postprocess": t("vbn_bare_inf_cl")},
    {"name": "vbn_that_declarative_cl", "symbols": [vbn_that_declarative_cl], "postprocess": t("vbn_that_declarative_cl")},
    {"name": "vbn_bare_declarative_cl", "symbols": [vbn_bare_declarative_cl], "postprocess": t("vbn_bare_declarative_cl")},
    {"name": "vbn_exclamative_cl", "symbols": [vbn_exclamative_cl], "postprocess": t("vbn_exclamative_cl")},
    {"name": "vbn_interrogative_cl", "symbols": [vbn_interrogative_cl], "postprocess": t("vbn_interrogative_cl")},
    {"name": "vbn_vbg_cl", "symbols": [vbn_vbg_cl], "postprocess": t("vbn_vbg_cl")},
    {"name": "vbn_vbn_cl", "symbols": [vbn_vbn_cl], "postprocess": t("vbn_vbn_cl")},
    {"name": "vbn_passive_cl", "symbols": [vbn_passive_cl], "postprocess": t("vbn_passive_cl")},
    {"name": "vbn_o", "symbols": [vbn_o], "postprocess": t("vbn_o")},
    {"name": "vbn_o_predcomp", "symbols": [vbn_o_predcomp], "postprocess": t("vbn_o_predcomp")},
    {"name": "vbn_intnp_to_inf_cl", "symbols": [vbn_intnp_to_inf_cl], "postprocess": t("vbn_intnp_to_inf_cl")},
    {"name": "vbn_intnp_bare_inf_cl", "symbols": [vbn_intnp_bare_inf_cl], "postprocess": t("vbn_intnp_bare_inf_cl")},
    {"name": "vbn_io_that_declarative_cl", "symbols": [vbn_io_that_declarative_cl], "postprocess": t("vbn_io_that_declarative_cl")},
    {"name": "vbn_io_bare_declarative_cl", "symbols": [vbn_io_bare_declarative_cl], "postprocess": t("vbn_io_bare_declarative_cl")},
    {"name": "vbn_io_exclamative_cl", "symbols": [vbn_io_exclamative_cl], "postprocess": t("vbn_io_exclamative_cl")},
    {"name": "vbn_io_interrogative_cl", "symbols": [vbn_io_interrogative_cl], "postprocess": t("vbn_io_interrogative_cl")},
    {"name": "vbn_io_do", "symbols": [vbn_io_do], "postprocess": t("vbn_io_do")},
    {"name": "vbf_sg", "symbols": [vbf_sg], "postprocess": t("vbf_sg")},
    {"name": "vbf_sg_predcomp", "symbols": [vbf_sg_predcomp], "postprocess": t("vbf_sg_predcomp")},
    {"name": "vbf_sg_to_inf_cl", "symbols": [vbf_sg_to_inf_cl], "postprocess": t("vbf_sg_to_inf_cl")},
    {"name": "vbf_sg_bare_inf_cl", "symbols": [vbf_sg_bare_inf_cl], "postprocess": t("vbf_sg_bare_inf_cl")},
    {"name": "vbf_sg_that_declarative_cl", "symbols": [vbf_sg_that_declarative_cl], "postprocess": t("vbf_sg_that_declarative_cl")},
    {"name": "vbf_sg_bare_declarative_cl", "symbols": [vbf_sg_bare_declarative_cl], "postprocess": t("vbf_sg_bare_declarative_cl")},
    {"name": "vbf_sg_exclamative_cl", "symbols": [vbf_sg_exclamative_cl], "postprocess": t("vbf_sg_exclamative_cl")},
    {"name": "vbf_sg_interrogative_cl", "symbols": [vbf_sg_interrogative_cl], "postprocess": t("vbf_sg_interrogative_cl")},
    {"name": "vbf_sg_vbg_cl", "symbols": [vbf_sg_vbg_cl], "postprocess": t("vbf_sg_vbg_cl")},
    {"name": "vbf_sg_vbn_cl", "symbols": [vbf_sg_vbn_cl], "postprocess": t("vbf_sg_vbn_cl")},
    {"name": "vbf_sg_passive_cl", "symbols": [vbf_sg_passive_cl], "postprocess": t("vbf_sg_passive_cl")},
    {"name": "vbf_sg_o", "symbols": [vbf_sg_o], "postprocess": t("vbf_sg_o")},
    {"name": "vbf_sg_o_predcomp", "symbols": [vbf_sg_o_predcomp], "postprocess": t("vbf_sg_o_predcomp")},
    {"name": "vbf_sg_intnp_to_inf_cl", "symbols": [vbf_sg_intnp_to_inf_cl], "postprocess": t("vbf_sg_intnp_to_inf_cl")},
    {"name": "vbf_sg_intnp_bare_inf_cl", "symbols": [vbf_sg_intnp_bare_inf_cl], "postprocess": t("vbf_sg_intnp_bare_inf_cl")},
    {"name": "vbf_sg_io_that_declarative_cl", "symbols": [vbf_sg_io_that_declarative_cl], "postprocess": t("vbf_sg_io_that_declarative_cl")},
    {"name": "vbf_sg_io_bare_declarative_cl", "symbols": [vbf_sg_io_bare_declarative_cl], "postprocess": t("vbf_sg_io_bare_declarative_cl")},
    {"name": "vbf_sg_io_exclamative_cl", "symbols": [vbf_sg_io_exclamative_cl], "postprocess": t("vbf_sg_io_exclamative_cl")},
    {"name": "vbf_sg_io_interrogative_cl", "symbols": [vbf_sg_io_interrogative_cl], "postprocess": t("vbf_sg_io_interrogative_cl")},
    {"name": "vbf_sg_io_do", "symbols": [vbf_sg_io_do], "postprocess": t("vbf_sg_io_do")},
    {"name": "vbf_pl", "symbols": [vbf_pl], "postprocess": t("vbf_pl")},
    {"name": "vbf_pl_predcomp", "symbols": [vbf_pl_predcomp], "postprocess": t("vbf_pl_predcomp")},
    {"name": "vbf_pl_to_inf_cl", "symbols": [vbf_pl_to_inf_cl], "postprocess": t("vbf_pl_to_inf_cl")},
    {"name": "vbf_pl_bare_inf_cl", "symbols": [vbf_pl_bare_inf_cl], "postprocess": t("vbf_pl_bare_inf_cl")},
    {"name": "vbf_pl_that_declarative_cl", "symbols": [vbf_pl_that_declarative_cl], "postprocess": t("vbf_pl_that_declarative_cl")},
    {"name": "vbf_pl_bare_declarative_cl", "symbols": [vbf_pl_bare_declarative_cl], "postprocess": t("vbf_pl_bare_declarative_cl")},
    {"name": "vbf_pl_exclamative_cl", "symbols": [vbf_pl_exclamative_cl], "postprocess": t("vbf_pl_exclamative_cl")},
    {"name": "vbf_pl_interrogative_cl", "symbols": [vbf_pl_interrogative_cl], "postprocess": t("vbf_pl_interrogative_cl")},
    {"name": "vbf_pl_vbg_cl", "symbols": [vbf_pl_vbg_cl], "postprocess": t("vbf_pl_vbg_cl")},
    {"name": "vbf_pl_vbn_cl", "symbols": [vbf_pl_vbn_cl], "postprocess": t("vbf_pl_vbn_cl")},
    {"name": "vbf_pl_passive_cl", "symbols": [vbf_pl_passive_cl], "postprocess": t("vbf_pl_passive_cl")},
    {"name": "vbf_pl_o", "symbols": [vbf_pl_o], "postprocess": t("vbf_pl_o")},
    {"name": "vbf_pl_o_predcomp", "symbols": [vbf_pl_o_predcomp], "postprocess": t("vbf_pl_o_predcomp")},
    {"name": "vbf_pl_intnp_to_inf_cl", "symbols": [vbf_pl_intnp_to_inf_cl], "postprocess": t("vbf_pl_intnp_to_inf_cl")},
    {"name": "vbf_pl_intnp_bare_inf_cl", "symbols": [vbf_pl_intnp_bare_inf_cl], "postprocess": t("vbf_pl_intnp_bare_inf_cl")},
    {"name": "vbf_pl_io_that_declarative_cl", "symbols": [vbf_pl_io_that_declarative_cl], "postprocess": t("vbf_pl_io_that_declarative_cl")},
    {"name": "vbf_pl_io_bare_declarative_cl", "symbols": [vbf_pl_io_bare_declarative_cl], "postprocess": t("vbf_pl_io_bare_declarative_cl")},
    {"name": "vbf_pl_io_exclamative_cl", "symbols": [vbf_pl_io_exclamative_cl], "postprocess": t("vbf_pl_io_exclamative_cl")},
    {"name": "vbf_pl_io_interrogative_cl", "symbols": [vbf_pl_io_interrogative_cl], "postprocess": t("vbf_pl_io_interrogative_cl")},
    {"name": "vbf_pl_io_do", "symbols": [vbf_pl_io_do], "postprocess": t("vbf_pl_io_do")},
    {"name": "aux_vbf_sg_predcomp", "symbols": [aux_vbf_sg_predcomp], "postprocess": t("aux_vbf_sg_predcomp")},
    {"name": "aux_vbf_sg_o", "symbols": [aux_vbf_sg_o], "postprocess": t("aux_vbf_sg_o")},
    {"name": "aux_vbf_sg_vbg_cl", "symbols": [aux_vbf_sg_vbg_cl], "postprocess": t("aux_vbf_sg_vbg_cl")},
    {"name": "aux_vbf_sg_vbn_cl", "symbols": [aux_vbf_sg_vbn_cl], "postprocess": t("aux_vbf_sg_vbn_cl")},
    {"name": "aux_vbf_sg_passive_cl", "symbols": [aux_vbf_sg_passive_cl], "postprocess": t("aux_vbf_sg_passive_cl")},
    {"name": "aux_vbf_sg_bare_inf_cl", "symbols": [aux_vbf_sg_bare_inf_cl], "postprocess": t("aux_vbf_sg_bare_inf_cl")},
    {"name": "aux_vbf_pl_predcomp", "symbols": [aux_vbf_pl_predcomp], "postprocess": t("aux_vbf_pl_predcomp")},
    {"name": "aux_vbf_pl_o", "symbols": [aux_vbf_pl_o], "postprocess": t("aux_vbf_pl_o")},
    {"name": "aux_vbf_pl_vbg_cl", "symbols": [aux_vbf_pl_vbg_cl], "postprocess": t("aux_vbf_pl_vbg_cl")},
    {"name": "aux_vbf_pl_vbn_cl", "symbols": [aux_vbf_pl_vbn_cl], "postprocess": t("aux_vbf_pl_vbn_cl")},
    {"name": "aux_vbf_pl_passive_cl", "symbols": [aux_vbf_pl_passive_cl], "postprocess": t("aux_vbf_pl_passive_cl")},
    {"name": "aux_vbf_pl_bare_inf_cl", "symbols": [aux_vbf_pl_bare_inf_cl], "postprocess": t("aux_vbf_pl_bare_inf_cl")},
    {"name": "adj", "symbols": [adj], "postprocess": t("adj")},
    {"name": "adj_pp", "symbols": [adj_pp], "postprocess": t("adj_pp")},
    {"name": "adj_that_declarative_cl", "symbols": [adj_that_declarative_cl], "postprocess": t("adj_that_declarative_cl")},
    {"name": "adj_bare_declarative_cl", "symbols": [adj_bare_declarative_cl], "postprocess": t("adj_bare_declarative_cl")},
    {"name": "adj_to_inf_cl", "symbols": [adj_to_inf_cl], "postprocess": t("adj_to_inf_cl")},
    {"name": "adv", "symbols": [adv], "postprocess": t("adv")},
    {"name": "adv_vp", "symbols": [adv_vp], "postprocess": t("adv_vp")},
    {"name": "who", "symbols": [who], "postprocess": t("who")},
    {"name": "whose", "symbols": [whose], "postprocess": t("whose")},
    {"name": "what", "symbols": [what], "postprocess": t("what")},
    {"name": "which", "symbols": [which], "postprocess": t("which")},
    {"name": "where", "symbols": [where], "postprocess": t("where")},
    {"name": "when", "symbols": [when], "postprocess": t("when")},
    {"name": "why", "symbols": [why], "postprocess": t("why")},
    {"name": "how", "symbols": [how], "postprocess": t("how")},
    {"name": "precorenp_modifier", "symbols": [precorenp_modifier], "postprocess": t("precorenp_modifier")},
    {"name": "postcorenp_modifier", "symbols": [postcorenp_modifier], "postprocess": t("postcorenp_modifier")},
    {"name": "precore_emphatic_modifier", "symbols": [precore_emphatic_modifier], "postprocess": t("precore_emphatic_modifier")},
    {"name": "precore_emphatic_modifier_adjp", "symbols": [precore_emphatic_modifier_adjp], "postprocess": t("precore_emphatic_modifier_adjp ")},
    {"name": "quantificational_modifier", "symbols": [quantificational_modifier], "postprocess": t("quantificational_modifier")},
    {"name": "period", "symbols": [period], "postprocess": t("period")},
    {"name": "question_mark", "symbols": [question_mark], "postprocess": t("question_mark")},
    {"name": "exclamation_mark", "symbols": [exclamation_mark], "postprocess": t("exclamation_mark")},
    {"name": "comma", "symbols": [comma], "postprocess": t("comma")}
];
let ParserStart = "text";
export default { Lexer, ParserRules, ParserStart };

@preprocessor module

@{%
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

// coordinators
const coordinator = isPoS("coordinator");
const binary_coordinator = isPoS("binary_coordinator");

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
const period = isPoS("period");
const question_mark = isPoS("question_mark");
const exclamation_mark = isPoS("exclamation_mark");
const comma = isPoS("comma");

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

%}

text -> sentence:* {%nonterminal_unpack("text")%}

sentence -> 
      fin_cl period {%nt("sentence")%}
    | fin_cl exclamation_mark {%nt("sentence")%}
    | question_cl question_mark {%nt("sentence")%}

# a declarative finite clause
fin_cl -> precl_adjunct_list np_sg vbf_sg_vp {%nt("fin_cl")%}
        | precl_adjunct_list np_pl vbf_pl_vp {%nt("fin_cl")%}

precl_adjunct_list -> adjunct_list          {%nt("precl_adjunct_list")%}
                    | adjunct_list comma    {%nt("precl_adjunct_list")%}

# a question clause
question_cl ->
# yes no qs
                                       subj_aux_inv_cl               {%nt("question_cl")%} # is he happy?
# interrogative phrase replaces np
    | ip_np                            subj_aux_inv_cl_minus_np      {%nt("question_cl")%} # what did he eat?
    | ip_np_sg                         vbf_sg_vp                     {%nt("question_cl")%} # who hunts the deer?
    | ip_np_pl                         vbf_pl_vp                     {%nt("question_cl")%} # which people hunt the deer?
# interrogative phrase replaces adjunct of time, place or reason, also can be used if a preposition is frontend
    | ip_pp                            subj_aux_inv_cl            {%nt("question_cl")%} # where did you eat? / why did you eat? / after which class will you be free?
# interrogative phrase replaces advp_vp 
    | ip_advp_vp                    subj_aux_inv_cl            {%nt("question_cl")%} # how (quickly) did you eat the apple?
# interrogative phrase replaces advp
    | ip_adjp                       subj_aux_inv_cl_minus_adjp {%nt("question_cl")%} # how happy did mary become?

subj_aux_inv_cl ->
# modal
      modal                  np adjunct_list_bare_inf_cl      {%nt("subj_aux_inv_cl")%} # can you eat?
# finite singular
    | aux_vbf_sg_predcomp    np_sg adjunct_list_predcomp      {%nt("subj_aux_inv_cl")%} # is he happy? (`be` when used as a copula)
    | aux_vbf_sg_o           np_sg adjunct_list_o             {%nt("subj_aux_inv_cl")%} # is he a watchman? (`be` when used as an equative)
    | aux_vbf_sg_vbg_cl      np_sg vbg_cl                     {%nt("subj_aux_inv_cl")%} # is he eating? (`be` when used to mark progressive aspect)
    | aux_vbf_sg_vbn_cl      np_sg vbn_cl                     {%nt("subj_aux_inv_cl")%} # has he eaten? (`have` when used to mark past tense)
    | aux_vbf_sg_passive_cl  np_sg passive_cl                 {%nt("subj_aux_inv_cl")%} # is he eaten? (`be` when used to mark passive voice)
    | aux_vbf_sg_bare_inf_cl np_sg adjunct_list_bare_inf_cl   {%nt("subj_aux_inv_cl")%} # does he eat?
# finite plural
    | aux_vbf_pl_predcomp    np_pl adjunct_list_predcomp      {%nt("subj_aux_inv_cl")%} # are you happy? (`be` when used as a copula)
    | aux_vbf_pl_o           np_pl adjunct_list_o             {%nt("subj_aux_inv_cl")%} # are you a watchman? (`be` when used as an equative)
    | aux_vbf_pl_vbg_cl      np_pl vbg_cl                     {%nt("subj_aux_inv_cl")%} # are you eating? (`be` when used to mark progressive aspect)
    | aux_vbf_pl_vbn_cl      np_pl vbn_cl                     {%nt("subj_aux_inv_cl")%} # have you eaten? (`have` when used to mark past tense)
    | aux_vbf_pl_passive_cl  np_pl passive_cl                 {%nt("subj_aux_inv_cl")%} # are you eaten? (`be` when used to mark passive voice)
    | aux_vbf_pl_bare_inf_cl np_pl adjunct_list_bare_inf_cl   {%nt("subj_aux_inv_cl")%} # do you eat?

# note, no moves from head here
subj_aux_inv_cl_minus_np ->
# modal (move from argument)
      modal                    np adjunct_list_bare_inf_cl_minus_np      {%nt("subj_aux_inv_cl_minus_np")%} # what [can you sing]?
# finite singular (move from argument)
    | aux_vbf_sg_predcomp      np_sg adjunct_list_predcomp_minus_np      {%nt("subj_aux_inv_cl_minus_np")%} # what [is he happy to be]? (`be` when used as a copula)
    | aux_vbf_sg_o             np_sg adjunct_list_o_minus_np             {%nt("subj_aux_inv_cl_minus_np")%} # what [is he]? (`be` when used as an equative)
    | aux_vbf_sg_vbg_cl        np_sg vbg_cl_minus_np                     {%nt("subj_aux_inv_cl_minus_np")%} # what [is he eating]?
    | aux_vbf_sg_vbn_cl        np_sg vbn_cl_minus_np                     {%nt("subj_aux_inv_cl_minus_np")%} # what [has he eaten]?
    | aux_vbf_sg_passive_cl    np_sg passive_cl_minus_np                 {%nt("subj_aux_inv_cl_minus_np")%} # what [is he given]?
    | aux_vbf_sg_bare_inf_cl   np_sg adjunct_list_bare_inf_cl_minus_np   {%nt("subj_aux_inv_cl_minus_np")%} # what [doesn't he eat]?
# finite plural (move from argument)
    | aux_vbf_pl_predcomp      np_pl adjunct_list_predcomp_minus_np      {%nt("subj_aux_inv_cl_minus_np")%} # what [are you happy to be]? (`be` when used as a copula)
    | aux_vbf_pl_o             np_pl adjunct_list_o_minus_np             {%nt("subj_aux_inv_cl_minus_np")%} # what [are you]? (`be` when used as an equative)
    | aux_vbf_pl_vbg_cl        np_pl vbg_cl_minus_np                     {%nt("subj_aux_inv_cl_minus_np")%} # what [are you eating]?
    | aux_vbf_pl_vbn_cl        np_pl vbn_cl_minus_np                     {%nt("subj_aux_inv_cl_minus_np")%} # what [have you eaten]?
    | aux_vbf_pl_passive_cl    np_pl passive_cl_minus_np                 {%nt("subj_aux_inv_cl_minus_np")%} # what [are you given]?
    | aux_vbf_pl_bare_inf_cl   np_pl adjunct_list_bare_inf_cl_minus_np   {%nt("subj_aux_inv_cl_minus_np")%} # what [don't you eat]?

subj_aux_inv_cl_minus_adjp ->
      modal                    np adjunct_list_bare_inf_cl_minus_adjp    {%nt("subj_aux_inv_cl_minus_adjp")%} # how [can you seem]?
# finite singular (move from argument)
    | aux_vbf_sg_predcomp      np_sg adjunct_list_predcomp_minus_adjp    {%nt("subj_aux_inv_cl_minus_adjp")%} # how [is he]? (`be` when used as a copula)
    | aux_vbf_sg_o             np_sg adjunct_list_o_minus_adjp           {%nt("subj_aux_inv_cl_minus_adjp")%} # how [is he]? (`be` when used as an equative)
    | aux_vbf_sg_vbg_cl        np_sg vbg_cl_minus_adjp                   {%nt("subj_aux_inv_cl_minus_adjp")%} # how [is he seeming]?
    | aux_vbf_sg_vbn_cl        np_sg vbn_cl_minus_adjp                   {%nt("subj_aux_inv_cl_minus_adjp")%} # how [has he seemed]?
    | aux_vbf_sg_passive_cl    np_sg passive_cl_minus_adjp               {%nt("subj_aux_inv_cl_minus_adjp")%} # how [is he made]?
    | aux_vbf_sg_bare_inf_cl   np_sg adjunct_list_bare_inf_cl_minus_adjp {%nt("subj_aux_inv_cl_minus_adjp")%} # how [doesn't he seem]?
# finite plural (move from argument)
    | aux_vbf_pl_predcomp      np_pl adjunct_list_predcomp_minus_adjp    {%nt("subj_aux_inv_cl_minus_adjp")%} # how [are you]? (`be` when used as a copula)
    | aux_vbf_pl_o             np_pl adjunct_list_o_minus_adjp           {%nt("subj_aux_inv_cl_minus_adjp")%} # how [are you]? (`be` when used as an equative)
    | aux_vbf_pl_vbg_cl        np_pl vbg_cl_minus_adjp                   {%nt("subj_aux_inv_cl_minus_adjp")%} # how [are you seeming]?
    | aux_vbf_pl_vbn_cl        np_pl vbn_cl_minus_adjp                   {%nt("subj_aux_inv_cl_minus_adjp")%} # how [have you seemed]?
    | aux_vbf_pl_passive_cl    np_pl passive_cl_minus_adjp               {%nt("subj_aux_inv_cl_minus_adjp")%} # how [are you made]?
    | aux_vbf_pl_bare_inf_cl   np_pl adjunct_list_bare_inf_cl_minus_adjp {%nt("subj_aux_inv_cl_minus_adjp")%} # how [don't you seem]?
adjunct_list ->
    adjunct adjunct_list {%nt("adjunct_list")%}
  | null {%nt("adjunct_list")%}


adjunct_list_predcomp ->
    predcomp adjunct_list {%nt("adjunct_list_predcomp")%}


adjunct_list_to_inf_cl ->
    adjunct adjunct_list_to_inf_cl {%nt("adjunct_list_to_inf_cl")%}
  | to_inf_cl adjunct_list {%nt("adjunct_list_to_inf_cl")%}


adjunct_list_bare_inf_cl ->
    bare_inf_cl {%nt("adjunct_list_bare_inf_cl")%}


adjunct_list_that_declarative_cl ->
    that_declarative_cl adjunct_list {%nt("adjunct_list_that_declarative_cl")%}
  | adjunct adjunct_list_that_declarative_cl {%nt("adjunct_list_that_declarative_cl")%}


adjunct_list_bare_declarative_cl ->
    bare_declarative_cl adjunct_list {%nt("adjunct_list_bare_declarative_cl")%}
  | adjunct adjunct_list_bare_declarative_cl {%nt("adjunct_list_bare_declarative_cl")%}


adjunct_list_exclamative_cl ->
    exclamative_cl adjunct_list {%nt("adjunct_list_exclamative_cl")%}
  | adjunct adjunct_list_exclamative_cl {%nt("adjunct_list_exclamative_cl")%}


adjunct_list_interrogative_cl ->
    interrogative_cl adjunct_list {%nt("adjunct_list_interrogative_cl")%}
  | adjunct adjunct_list_interrogative_cl {%nt("adjunct_list_interrogative_cl")%}


adjunct_list_o ->
    np adjunct_list {%nt("adjunct_list_o")%}


adjunct_list_o_predcomp ->
    np adjunct_list_o_predcomp {%nt("adjunct_list_o_predcomp")%}
  | predcomp adjunct_list_o {%nt("adjunct_list_o_predcomp")%}


adjunct_list_intnp_to_inf_cl ->
    np adjunct_list_to_inf_cl {%nt("adjunct_list_intnp_to_inf_cl")%}


adjunct_list_intnp_bare_inf_cl ->
    np adjunct_list_bare_inf_cl {%nt("adjunct_list_intnp_bare_inf_cl")%}


adjunct_list_io_that_declarative_cl ->
    np adjunct_list_that_declarative_cl {%nt("adjunct_list_io_that_declarative_cl")%}


adjunct_list_io_bare_declarative_cl ->
    np adjunct_list_bare_declarative_cl {%nt("adjunct_list_io_bare_declarative_cl")%}


adjunct_list_io_exclamative_cl ->
    np adjunct_list_exclamative_cl {%nt("adjunct_list_io_exclamative_cl")%}


adjunct_list_io_interrogative_cl ->
    np adjunct_list_interrogative_cl {%nt("adjunct_list_io_interrogative_cl")%}


adjunct_list_io_do ->
    np adjunct_list_o {%nt("adjunct_list_io_do")%}


adjunct_list_dative_to ->
    adjunct adjunct_list_dative_to {%nt("adjunct_list_dative_to")%}
  | dative_to adjunct_list {%nt("adjunct_list_dative_to")%}


adjunct_list_do_dative_to ->
    np adjunct_list_dative_to {%nt("adjunct_list_do_dative_to")%}
  | dative_to adjunct_list_o {%nt("adjunct_list_do_dative_to")%}


adjunct_list_passive_o ->
    adjunct_list {%nt("adjunct_list_passive_o")%}


adjunct_list_passive_o_predcomp ->
    adjunct_list_predcomp {%nt("adjunct_list_passive_o_predcomp")%}


adjunct_list_passive_intnp_to_inf_cl ->
    adjunct_list_to_inf_cl {%nt("adjunct_list_passive_intnp_to_inf_cl")%}


adjunct_list_passive_io_that_declarative_cl ->
    adjunct_list_that_declarative_cl {%nt("adjunct_list_passive_io_that_declarative_cl")%}


adjunct_list_passive_io_bare_declarative_cl ->
    adjunct_list_bare_declarative_cl {%nt("adjunct_list_passive_io_bare_declarative_cl")%}


adjunct_list_passive_io_exclamative_cl ->
    adjunct_list_exclamative_cl {%nt("adjunct_list_passive_io_exclamative_cl")%}


adjunct_list_passive_io_interrogative_cl ->
    adjunct_list_interrogative_cl {%nt("adjunct_list_passive_io_interrogative_cl")%}


adjunct_list_passive_io_do ->
    adjunct_list_o {%nt("adjunct_list_passive_io_do")%}


adjunct_list_passive_do_dative_to ->
    adjunct_list_dative_to {%nt("adjunct_list_passive_do_dative_to")%}



# modals can only appear in the position of a finite verb (they cannot be conjugated as an infinitive or a participle *to can)
vbf_sg_vp -> advp_vp? modal bare_inf_cl {%nt("vbf_sg_vp")%}

# [sang, danced,]
vbf_sg_vp_coordlist ->  vbf_sg_vp_coordlist_item:+ {%nonterminal_unpack("vbf_sg_vp_coordlist")%}
vbf_sg_vp_coordlist_item -> vbf_sg_vp comma {%nt("vbf_sg_vp_coordlist_item")%}

vbf_sg_vp ->
    # coordinations
      vbf_sg_vp_coordlist coordinator vbf_sg_vp {%nt("vbf_sg_vp")%} # coordination: "We [sang, danced, and laughed]"
    | vbf_sg_vp binary_coordinator vbf_sg_vp {%nt("vbf_sg_vp")%} # coordination: "We [sang and danced]"
    # terminal rules
    | advp_vp? vbf_sg                        adjunct_list                          {%nt("vbf_sg_vp")%} # intransitive verb (ex: "I smoked")
    | advp_vp? vbf_sg_predcomp               adjunct_list_predcomp                 {%nt("vbf_sg_vp")%} # intransitive verb with adjective phrase argument (ex: "You seemed happy")
    | advp_vp? vbf_sg_to_inf_cl              adjunct_list_to_inf_cl                {%nt("vbf_sg_vp")%} # intransitive verb with infinitive clause argument (ex: "I wanted to bring the book")
    | advp_vp? vbf_sg_bare_inf_cl            adjunct_list_bare_inf_cl              {%nt("vbf_sg_vp")%} # intransitive verb with bare infinitive clause argument (ex: "I helped clean")
    | advp_vp? vbf_sg_that_declarative_cl    adjunct_list_that_declarative_cl      {%nt("vbf_sg_vp")%} # intransitive verb with declarative content clause argument (ex: "I knew that you eat")
    | advp_vp? vbf_sg_bare_declarative_cl    adjunct_list_bare_declarative_cl      {%nt("vbf_sg_vp")%} # intransitive verb with declarative content clause argument (ex: "I knew you eat")
    | advp_vp? vbf_sg_exclamative_cl         adjunct_list_exclamative_cl           {%nt("vbf_sg_vp")%} # intransitive verb with exclamative content clause argument (ex: "I said how expensive it was.")
    | advp_vp? vbf_sg_interrogative_cl       adjunct_list_interrogative_cl         {%nt("vbf_sg_vp")%} # intransitive verb with interrogative clause argument (ex: "I knew what you eat")
    | advp_vp? vbf_sg_vbg_cl                 vbg_cl                                {%nt("vbf_sg_vp")%} # progressive aspect (ex: "We are eating") or intransitive verb with vbg argument ("we started eating")
    | advp_vp? vbf_sg_vbn_cl                 vbn_cl                                {%nt("vbf_sg_vp")%} # past perfect (ex: "He had eaten")
    | advp_vp? vbf_sg_passive_cl             passive_cl                            {%nt("vbf_sg_vp")%} # passive voice (ex: "He was eaten")
    | advp_vp? vbf_sg_o                      adjunct_list_o                        {%nt("vbf_sg_vp")%} # transitive verb (ex: "I ate the apple")
    | advp_vp? vbf_sg_o_predcomp             adjunct_list_o_predcomp               {%nt("vbf_sg_vp")%} # transitive verb with adjective phrase argument (ex: "I found you happy")
    | advp_vp? vbf_sg_intnp_to_inf_cl        adjunct_list_intnp_to_inf_cl          {%nt("vbf_sg_vp")%} # transitive verb with infinitive verb argument (ex: "I asked you to eat the apple")
    | advp_vp? vbf_sg_intnp_bare_inf_cl      adjunct_list_intnp_bare_inf_cl        {%nt("vbf_sg_vp")%} # transitive verb with bare infinitive verb argument (ex: "I made you eat the apple")
    | advp_vp? vbf_sg_io_that_declarative_cl adjunct_list_io_that_declarative_cl   {%nt("vbf_sg_vp")%} # transitive verb with declarative content clause argument (ex: "I told you that you eat the apple")
    | advp_vp? vbf_sg_io_bare_declarative_cl adjunct_list_io_bare_declarative_cl   {%nt("vbf_sg_vp")%} # transitive verb with declarative content clause argument (ex: "I told you you eat the apple")
    | advp_vp? vbf_sg_io_exclamative_cl      adjunct_list_io_exclamative_cl        {%nt("vbf_sg_vp")%} # transitive verb with exclamative content clause argument (ex: "I told you how expensive it was")
    | advp_vp? vbf_sg_io_interrogative_cl    adjunct_list_io_interrogative_cl      {%nt("vbf_sg_vp")%} # transitive verb with interrogative clause argument (ex: "I asked you what you eat")
    | advp_vp? vbf_sg_io_do                  adjunct_list_io_do                    {%nt("vbf_sg_vp")%} # ditransitive verb (ex: "I gave you food")
    | advp_vp? vbf_sg_io_do                  adjunct_list_do_dative_to             {%nt("vbf_sg_vp")%} # ditransitive verb with dative shift (ex: "I gave food to you")

# modals can only appear in the position of a finite verb (they cannot be conjugated as an infinitive or a participle *to can)
vbf_pl_vp -> advp_vp? modal bare_inf_cl {%nt("vbf_pl_vp")%}

# [sang, danced,]
vbf_pl_vp_coordlist ->  vbf_pl_vp_coordlist_item:+ {%nonterminal_unpack("vbf_pl_vp_coordlist")%}
vbf_pl_vp_coordlist_item -> vbf_pl_vp comma {%nt("vbf_pl_vp_coordlist_item")%}

vbf_pl_vp ->
    # coordinations
      vbf_pl_vp_coordlist coordinator vbf_pl_vp {%nt("vbf_pl_vp")%} # coordination: "We [sang, danced, and laughed]"
    | vbf_pl_vp binary_coordinator vbf_pl_vp {%nt("vbf_pl_vp")%} # coordination: "We [sang and danced]"
    # terminal rules
    | advp_vp? vbf_pl                        adjunct_list                          {%nt("vbf_pl_vp")%} # intransitive verb (ex: "I smoked")
    | advp_vp? vbf_pl_predcomp               adjunct_list_predcomp                 {%nt("vbf_pl_vp")%} # intransitive verb with adjective phrase argument (ex: "You seemed happy")
    | advp_vp? vbf_pl_to_inf_cl              adjunct_list_to_inf_cl                {%nt("vbf_pl_vp")%} # intransitive verb with infinitive clause argument (ex: "I wanted to bring the book")
    | advp_vp? vbf_pl_bare_inf_cl            adjunct_list_bare_inf_cl              {%nt("vbf_pl_vp")%} # intransitive verb with bare infinitive clause argument (ex: "I helped clean")
    | advp_vp? vbf_pl_that_declarative_cl    adjunct_list_that_declarative_cl      {%nt("vbf_pl_vp")%} # intransitive verb with declarative content clause argument (ex: "I knew that you eat")
    | advp_vp? vbf_pl_bare_declarative_cl    adjunct_list_bare_declarative_cl      {%nt("vbf_pl_vp")%} # intransitive verb with declarative content clause argument (ex: "I knew you eat")
    | advp_vp? vbf_pl_exclamative_cl         adjunct_list_exclamative_cl           {%nt("vbf_pl_vp")%} # intransitive verb with exclamative content clause argument (ex: "I said how expensive it was.")
    | advp_vp? vbf_pl_interrogative_cl       adjunct_list_interrogative_cl         {%nt("vbf_pl_vp")%} # intransitive verb with interrogative clause argument (ex: "I knew what you eat")
    | advp_vp? vbf_pl_vbg_cl                 vbg_cl                                {%nt("vbf_pl_vp")%} # progressive aspect (ex: "We are eating") or intransitive verb with vbg argument ("we started eating")
    | advp_vp? vbf_pl_vbn_cl                 vbn_cl                                {%nt("vbf_pl_vp")%} # past perfect (ex: "He had eaten")
    | advp_vp? vbf_pl_passive_cl             passive_cl                            {%nt("vbf_pl_vp")%} # passive voice (ex: "He was eaten")
    | advp_vp? vbf_pl_o                      adjunct_list_o                        {%nt("vbf_pl_vp")%} # transitive verb (ex: "I ate the apple")
    | advp_vp? vbf_pl_o_predcomp             adjunct_list_o_predcomp               {%nt("vbf_pl_vp")%} # transitive verb with adjective phrase argument (ex: "I found you happy")
    | advp_vp? vbf_pl_intnp_to_inf_cl        adjunct_list_intnp_to_inf_cl          {%nt("vbf_pl_vp")%} # transitive verb with infinitive verb argument (ex: "I asked you to eat the apple")
    | advp_vp? vbf_pl_intnp_bare_inf_cl      adjunct_list_intnp_bare_inf_cl        {%nt("vbf_pl_vp")%} # transitive verb with bare infinitive verb argument (ex: "I made you eat the apple")
    | advp_vp? vbf_pl_io_that_declarative_cl adjunct_list_io_that_declarative_cl   {%nt("vbf_pl_vp")%} # transitive verb with declarative content clause argument (ex: "I told you that you eat the apple")
    | advp_vp? vbf_pl_io_bare_declarative_cl adjunct_list_io_bare_declarative_cl   {%nt("vbf_pl_vp")%} # transitive verb with declarative content clause argument (ex: "I told you you eat the apple")
    | advp_vp? vbf_pl_io_exclamative_cl      adjunct_list_io_exclamative_cl        {%nt("vbf_pl_vp")%} # transitive verb with exclamative content clause argument (ex: "I told you how expensive it was")
    | advp_vp? vbf_pl_io_interrogative_cl    adjunct_list_io_interrogative_cl      {%nt("vbf_pl_vp")%} # transitive verb with interrogative clause argument (ex: "I asked you what you eat")
    | advp_vp? vbf_pl_io_do                  adjunct_list_io_do                    {%nt("vbf_pl_vp")%} # ditransitive verb (ex: "I gave you food")
    | advp_vp? vbf_pl_io_do                  adjunct_list_do_dative_to             {%nt("vbf_pl_vp")%} # ditransitive verb with dative shift (ex: "I gave food to you")

# [sang, danced,]
inf_vp_coordlist ->  inf_vp_coordlist_item:+ {%nonterminal_unpack("inf_vp_coordlist")%}
inf_vp_coordlist_item -> inf_vp comma {%nt("inf_vp_coordlist_item")%}

inf_vp ->
    # coordinations
      inf_vp_coordlist coordinator inf_vp {%nt("inf_vp")%} # coordination: "We [sang, danced, and laughed]"
    | inf_vp binary_coordinator inf_vp {%nt("inf_vp")%} # coordination: "We [sang and danced]"
    # terminal rules
    | advp_vp? inf                        adjunct_list                          {%nt("inf_vp")%} # intransitive verb (ex: "I smoked")
    | advp_vp? inf_predcomp               adjunct_list_predcomp                 {%nt("inf_vp")%} # intransitive verb with adjective phrase argument (ex: "You seemed happy")
    | advp_vp? inf_to_inf_cl              adjunct_list_to_inf_cl                {%nt("inf_vp")%} # intransitive verb with infinitive clause argument (ex: "I wanted to bring the book")
    | advp_vp? inf_bare_inf_cl            adjunct_list_bare_inf_cl              {%nt("inf_vp")%} # intransitive verb with bare infinitive clause argument (ex: "I helped clean")
    | advp_vp? inf_that_declarative_cl    adjunct_list_that_declarative_cl      {%nt("inf_vp")%} # intransitive verb with declarative content clause argument (ex: "I knew that you eat")
    | advp_vp? inf_bare_declarative_cl    adjunct_list_bare_declarative_cl      {%nt("inf_vp")%} # intransitive verb with declarative content clause argument (ex: "I knew you eat")
    | advp_vp? inf_exclamative_cl         adjunct_list_exclamative_cl           {%nt("inf_vp")%} # intransitive verb with exclamative content clause argument (ex: "I said how expensive it was.")
    | advp_vp? inf_interrogative_cl       adjunct_list_interrogative_cl         {%nt("inf_vp")%} # intransitive verb with interrogative clause argument (ex: "I knew what you eat")
    | advp_vp? inf_vbg_cl                 vbg_cl                                {%nt("inf_vp")%} # progressive aspect (ex: "We are eating") or intransitive verb with vbg argument ("we started eating")
    | advp_vp? inf_vbn_cl                 vbn_cl                                {%nt("inf_vp")%} # past perfect (ex: "He had eaten")
    | advp_vp? inf_passive_cl             passive_cl                            {%nt("inf_vp")%} # passive voice (ex: "He was eaten")
    | advp_vp? inf_o                      adjunct_list_o                        {%nt("inf_vp")%} # transitive verb (ex: "I ate the apple")
    | advp_vp? inf_o_predcomp             adjunct_list_o_predcomp               {%nt("inf_vp")%} # transitive verb with adjective phrase argument (ex: "I found you happy")
    | advp_vp? inf_intnp_to_inf_cl        adjunct_list_intnp_to_inf_cl          {%nt("inf_vp")%} # transitive verb with infinitive verb argument (ex: "I asked you to eat the apple")
    | advp_vp? inf_intnp_bare_inf_cl      adjunct_list_intnp_bare_inf_cl        {%nt("inf_vp")%} # transitive verb with bare infinitive verb argument (ex: "I made you eat the apple")
    | advp_vp? inf_io_that_declarative_cl adjunct_list_io_that_declarative_cl   {%nt("inf_vp")%} # transitive verb with declarative content clause argument (ex: "I told you that you eat the apple")
    | advp_vp? inf_io_bare_declarative_cl adjunct_list_io_bare_declarative_cl   {%nt("inf_vp")%} # transitive verb with declarative content clause argument (ex: "I told you you eat the apple")
    | advp_vp? inf_io_exclamative_cl      adjunct_list_io_exclamative_cl        {%nt("inf_vp")%} # transitive verb with exclamative content clause argument (ex: "I told you how expensive it was")
    | advp_vp? inf_io_interrogative_cl    adjunct_list_io_interrogative_cl      {%nt("inf_vp")%} # transitive verb with interrogative clause argument (ex: "I asked you what you eat")
    | advp_vp? inf_io_do                  adjunct_list_io_do                    {%nt("inf_vp")%} # ditransitive verb (ex: "I gave you food")
    | advp_vp? inf_io_do                  adjunct_list_do_dative_to             {%nt("inf_vp")%} # ditransitive verb with dative shift (ex: "I gave food to you")

# [sang, danced,]
vbg_vp_coordlist ->  vbg_vp_coordlist_item:+ {%nonterminal_unpack("vbg_vp_coordlist")%}
vbg_vp_coordlist_item -> vbg_vp comma {%nt("vbg_vp_coordlist_item")%}

vbg_vp ->
    # coordinations
      vbg_vp_coordlist coordinator vbg_vp {%nt("vbg_vp")%} # coordination: "We [sang, danced, and laughed]"
    | vbg_vp binary_coordinator vbg_vp {%nt("vbg_vp")%} # coordination: "We [sang and danced]"
    # terminal rules
    | advp_vp? vbg                        adjunct_list                          {%nt("vbg_vp")%} # intransitive verb (ex: "I smoked")
    | advp_vp? vbg_predcomp               adjunct_list_predcomp                 {%nt("vbg_vp")%} # intransitive verb with adjective phrase argument (ex: "You seemed happy")
    | advp_vp? vbg_to_inf_cl              adjunct_list_to_inf_cl                {%nt("vbg_vp")%} # intransitive verb with infinitive clause argument (ex: "I wanted to bring the book")
    | advp_vp? vbg_bare_inf_cl            adjunct_list_bare_inf_cl              {%nt("vbg_vp")%} # intransitive verb with bare infinitive clause argument (ex: "I helped clean")
    | advp_vp? vbg_that_declarative_cl    adjunct_list_that_declarative_cl      {%nt("vbg_vp")%} # intransitive verb with declarative content clause argument (ex: "I knew that you eat")
    | advp_vp? vbg_bare_declarative_cl    adjunct_list_bare_declarative_cl      {%nt("vbg_vp")%} # intransitive verb with declarative content clause argument (ex: "I knew you eat")
    | advp_vp? vbg_exclamative_cl         adjunct_list_exclamative_cl           {%nt("vbg_vp")%} # intransitive verb with exclamative content clause argument (ex: "I said how expensive it was.")
    | advp_vp? vbg_interrogative_cl       adjunct_list_interrogative_cl         {%nt("vbg_vp")%} # intransitive verb with interrogative clause argument (ex: "I knew what you eat")
    | advp_vp? vbg_vbg_cl                 vbg_cl                                {%nt("vbg_vp")%} # progressive aspect (ex: "We are eating") or intransitive verb with vbg argument ("we started eating")
    | advp_vp? vbg_vbn_cl                 vbn_cl                                {%nt("vbg_vp")%} # past perfect (ex: "He had eaten")
    | advp_vp? vbg_passive_cl             passive_cl                            {%nt("vbg_vp")%} # passive voice (ex: "He was eaten")
    | advp_vp? vbg_o                      adjunct_list_o                        {%nt("vbg_vp")%} # transitive verb (ex: "I ate the apple")
    | advp_vp? vbg_o_predcomp             adjunct_list_o_predcomp               {%nt("vbg_vp")%} # transitive verb with adjective phrase argument (ex: "I found you happy")
    | advp_vp? vbg_intnp_to_inf_cl        adjunct_list_intnp_to_inf_cl          {%nt("vbg_vp")%} # transitive verb with infinitive verb argument (ex: "I asked you to eat the apple")
    | advp_vp? vbg_intnp_bare_inf_cl      adjunct_list_intnp_bare_inf_cl        {%nt("vbg_vp")%} # transitive verb with bare infinitive verb argument (ex: "I made you eat the apple")
    | advp_vp? vbg_io_that_declarative_cl adjunct_list_io_that_declarative_cl   {%nt("vbg_vp")%} # transitive verb with declarative content clause argument (ex: "I told you that you eat the apple")
    | advp_vp? vbg_io_bare_declarative_cl adjunct_list_io_bare_declarative_cl   {%nt("vbg_vp")%} # transitive verb with declarative content clause argument (ex: "I told you you eat the apple")
    | advp_vp? vbg_io_exclamative_cl      adjunct_list_io_exclamative_cl        {%nt("vbg_vp")%} # transitive verb with exclamative content clause argument (ex: "I told you how expensive it was")
    | advp_vp? vbg_io_interrogative_cl    adjunct_list_io_interrogative_cl      {%nt("vbg_vp")%} # transitive verb with interrogative clause argument (ex: "I asked you what you eat")
    | advp_vp? vbg_io_do                  adjunct_list_io_do                    {%nt("vbg_vp")%} # ditransitive verb (ex: "I gave you food")
    | advp_vp? vbg_io_do                  adjunct_list_do_dative_to             {%nt("vbg_vp")%} # ditransitive verb with dative shift (ex: "I gave food to you")

# [sang, danced,]
vbn_vp_coordlist ->  vbn_vp_coordlist_item:+ {%nonterminal_unpack("vbn_vp_coordlist")%}
vbn_vp_coordlist_item -> vbn_vp comma {%nt("vbn_vp_coordlist_item")%}

vbn_vp ->
    # coordinations
      vbn_vp_coordlist coordinator vbn_vp {%nt("vbn_vp")%} # coordination: "We [sang, danced, and laughed]"
    | vbn_vp binary_coordinator vbn_vp {%nt("vbn_vp")%} # coordination: "We [sang and danced]"
    # terminal rules
    | advp_vp? vbn                        adjunct_list                          {%nt("vbn_vp")%} # intransitive verb (ex: "I smoked")
    | advp_vp? vbn_predcomp               adjunct_list_predcomp                 {%nt("vbn_vp")%} # intransitive verb with adjective phrase argument (ex: "You seemed happy")
    | advp_vp? vbn_to_inf_cl              adjunct_list_to_inf_cl                {%nt("vbn_vp")%} # intransitive verb with infinitive clause argument (ex: "I wanted to bring the book")
    | advp_vp? vbn_bare_inf_cl            adjunct_list_bare_inf_cl              {%nt("vbn_vp")%} # intransitive verb with bare infinitive clause argument (ex: "I helped clean")
    | advp_vp? vbn_that_declarative_cl    adjunct_list_that_declarative_cl      {%nt("vbn_vp")%} # intransitive verb with declarative content clause argument (ex: "I knew that you eat")
    | advp_vp? vbn_bare_declarative_cl    adjunct_list_bare_declarative_cl      {%nt("vbn_vp")%} # intransitive verb with declarative content clause argument (ex: "I knew you eat")
    | advp_vp? vbn_exclamative_cl         adjunct_list_exclamative_cl           {%nt("vbn_vp")%} # intransitive verb with exclamative content clause argument (ex: "I said how expensive it was.")
    | advp_vp? vbn_interrogative_cl       adjunct_list_interrogative_cl         {%nt("vbn_vp")%} # intransitive verb with interrogative clause argument (ex: "I knew what you eat")
    | advp_vp? vbn_vbg_cl                 vbg_cl                                {%nt("vbn_vp")%} # progressive aspect (ex: "We are eating") or intransitive verb with vbg argument ("we started eating")
    | advp_vp? vbn_vbn_cl                 vbn_cl                                {%nt("vbn_vp")%} # past perfect (ex: "He had eaten")
    | advp_vp? vbn_passive_cl             passive_cl                            {%nt("vbn_vp")%} # passive voice (ex: "He was eaten")
    | advp_vp? vbn_o                      adjunct_list_o                        {%nt("vbn_vp")%} # transitive verb (ex: "I ate the apple")
    | advp_vp? vbn_o_predcomp             adjunct_list_o_predcomp               {%nt("vbn_vp")%} # transitive verb with adjective phrase argument (ex: "I found you happy")
    | advp_vp? vbn_intnp_to_inf_cl        adjunct_list_intnp_to_inf_cl          {%nt("vbn_vp")%} # transitive verb with infinitive verb argument (ex: "I asked you to eat the apple")
    | advp_vp? vbn_intnp_bare_inf_cl      adjunct_list_intnp_bare_inf_cl        {%nt("vbn_vp")%} # transitive verb with bare infinitive verb argument (ex: "I made you eat the apple")
    | advp_vp? vbn_io_that_declarative_cl adjunct_list_io_that_declarative_cl   {%nt("vbn_vp")%} # transitive verb with declarative content clause argument (ex: "I told you that you eat the apple")
    | advp_vp? vbn_io_bare_declarative_cl adjunct_list_io_bare_declarative_cl   {%nt("vbn_vp")%} # transitive verb with declarative content clause argument (ex: "I told you you eat the apple")
    | advp_vp? vbn_io_exclamative_cl      adjunct_list_io_exclamative_cl        {%nt("vbn_vp")%} # transitive verb with exclamative content clause argument (ex: "I told you how expensive it was")
    | advp_vp? vbn_io_interrogative_cl    adjunct_list_io_interrogative_cl      {%nt("vbn_vp")%} # transitive verb with interrogative clause argument (ex: "I asked you what you eat")
    | advp_vp? vbn_io_do                  adjunct_list_io_do                    {%nt("vbn_vp")%} # ditransitive verb (ex: "I gave you food")
    | advp_vp? vbn_io_do                  adjunct_list_do_dative_to             {%nt("vbn_vp")%} # ditransitive verb with dative shift (ex: "I gave food to you")

passive_cl -> 
# omit all the intransitive verbs
# omit vbg_cl, as one cannot combine passive with progressive aspect *The food was been eaten
# omit vbn_cl, as one cannot combine passive with past perfect *The food was had eaten
# omit passive_cl, as one cannot combine passive with passive *The food was been eaten
      advp_vp? vbn_o                      adjunct_list_passive_o                         {%nt("passive_cl")%}
    | advp_vp? vbn_o_predcomp             adjunct_list_passive_o_predcomp                {%nt("passive_cl")%}
    | advp_vp? vbn_intnp_to_inf_cl        adjunct_list_passive_intnp_to_inf_cl           {%nt("passive_cl")%}
    | advp_vp? vbn_io_that_declarative_cl adjunct_list_passive_io_that_declarative_cl    {%nt("passive_cl")%}
    | advp_vp? vbn_io_bare_declarative_cl adjunct_list_passive_io_bare_declarative_cl    {%nt("passive_cl")%}
    | advp_vp? vbn_io_exclamative_cl      adjunct_list_passive_io_exclamative_cl         {%nt("passive_cl")%}
    | advp_vp? vbn_io_interrogative_cl    adjunct_list_passive_io_interrogative_cl       {%nt("passive_cl")%}
    | advp_vp? vbn_io_do                  adjunct_list_passive_io_do                     {%nt("passive_cl")%}
    | advp_vp? vbn_io_do                  adjunct_list_passive_do_dative_to              {%nt("passive_cl")%}

adjunct_list_minus_np ->
    adjunct adjunct_list_minus_np {%nt("adjunct_list_minus_np")%}
  | adjunct_minus_np adjunct_list {%nt("adjunct_list_minus_np")%}


adjunct_list_predcomp_minus_np ->
    predcomp adjunct_list_minus_np {%nt("adjunct_list_predcomp_minus_np")%}
  | predcomp_minus_np adjunct_list {%nt("adjunct_list_predcomp_minus_np")%}


adjunct_list_to_inf_cl_minus_np ->
    adjunct adjunct_list_to_inf_cl_minus_np {%nt("adjunct_list_to_inf_cl_minus_np")%}
  | to_inf_cl adjunct_list_minus_np {%nt("adjunct_list_to_inf_cl_minus_np")%}
  | adjunct_minus_np adjunct_list_to_inf_cl {%nt("adjunct_list_to_inf_cl_minus_np")%}
  | to_inf_cl_minus_np adjunct_list {%nt("adjunct_list_to_inf_cl_minus_np")%}


adjunct_list_bare_inf_cl_minus_np ->
    bare_inf_cl_minus_np {%nt("adjunct_list_bare_inf_cl_minus_np")%}


adjunct_list_that_declarative_cl_minus_np ->
    that_declarative_cl adjunct_list_minus_np {%nt("adjunct_list_that_declarative_cl_minus_np")%}
  | adjunct_minus_np adjunct_list_that_declarative_cl {%nt("adjunct_list_that_declarative_cl_minus_np")%}
  | that_declarative_cl_minus_np adjunct_list {%nt("adjunct_list_that_declarative_cl_minus_np")%}


adjunct_list_bare_declarative_cl_minus_np ->
    bare_declarative_cl adjunct_list_minus_np {%nt("adjunct_list_bare_declarative_cl_minus_np")%}
  | adjunct_minus_np adjunct_list_bare_declarative_cl {%nt("adjunct_list_bare_declarative_cl_minus_np")%}
  | bare_declarative_cl_minus_np adjunct_list {%nt("adjunct_list_bare_declarative_cl_minus_np")%}


adjunct_list_exclamative_cl_minus_np ->
    exclamative_cl adjunct_list_minus_np {%nt("adjunct_list_exclamative_cl_minus_np")%}
  | adjunct_minus_np adjunct_list_exclamative_cl {%nt("adjunct_list_exclamative_cl_minus_np")%}


adjunct_list_interrogative_cl_minus_np ->
    interrogative_cl adjunct_list_minus_np {%nt("adjunct_list_interrogative_cl_minus_np")%}
  | adjunct_minus_np adjunct_list_interrogative_cl {%nt("adjunct_list_interrogative_cl_minus_np")%}


adjunct_list_o_minus_np ->
    np adjunct_list_minus_np {%nt("adjunct_list_o_minus_np")%}
  | np_minus_np adjunct_list {%nt("adjunct_list_o_minus_np")%}


adjunct_list_o_predcomp_minus_np ->
    np adjunct_list_o_predcomp_minus_np {%nt("adjunct_list_o_predcomp_minus_np")%}
  | predcomp adjunct_list_o_minus_np {%nt("adjunct_list_o_predcomp_minus_np")%}
  | np_minus_np adjunct_list_o_predcomp {%nt("adjunct_list_o_predcomp_minus_np")%}
  | predcomp_minus_np adjunct_list_o {%nt("adjunct_list_o_predcomp_minus_np")%}


adjunct_list_intnp_to_inf_cl_minus_np ->
    np adjunct_list_to_inf_cl_minus_np {%nt("adjunct_list_intnp_to_inf_cl_minus_np")%}
  | np_minus_np adjunct_list_to_inf_cl {%nt("adjunct_list_intnp_to_inf_cl_minus_np")%}


adjunct_list_intnp_bare_inf_cl_minus_np ->
    np adjunct_list_bare_inf_cl_minus_np {%nt("adjunct_list_intnp_bare_inf_cl_minus_np")%}
  | np_minus_np adjunct_list_bare_inf_cl {%nt("adjunct_list_intnp_bare_inf_cl_minus_np")%}


adjunct_list_io_that_declarative_cl_minus_np ->
    np adjunct_list_that_declarative_cl_minus_np {%nt("adjunct_list_io_that_declarative_cl_minus_np")%}
  | np_minus_np adjunct_list_that_declarative_cl {%nt("adjunct_list_io_that_declarative_cl_minus_np")%}


adjunct_list_io_bare_declarative_cl_minus_np ->
    np adjunct_list_bare_declarative_cl_minus_np {%nt("adjunct_list_io_bare_declarative_cl_minus_np")%}
  | np_minus_np adjunct_list_bare_declarative_cl {%nt("adjunct_list_io_bare_declarative_cl_minus_np")%}


adjunct_list_io_exclamative_cl_minus_np ->
    np adjunct_list_exclamative_cl_minus_np {%nt("adjunct_list_io_exclamative_cl_minus_np")%}
  | np_minus_np adjunct_list_exclamative_cl {%nt("adjunct_list_io_exclamative_cl_minus_np")%}


adjunct_list_io_interrogative_cl_minus_np ->
    np adjunct_list_interrogative_cl_minus_np {%nt("adjunct_list_io_interrogative_cl_minus_np")%}
  | np_minus_np adjunct_list_interrogative_cl {%nt("adjunct_list_io_interrogative_cl_minus_np")%}


adjunct_list_io_do_minus_np ->
    np adjunct_list_o_minus_np {%nt("adjunct_list_io_do_minus_np")%}
  | np_minus_np adjunct_list_o {%nt("adjunct_list_io_do_minus_np")%}


adjunct_list_dative_to_minus_np ->
    adjunct adjunct_list_dative_to_minus_np {%nt("adjunct_list_dative_to_minus_np")%}
  | adjunct_minus_np adjunct_list_dative_to {%nt("adjunct_list_dative_to_minus_np")%}
  | dative_to_minus_np adjunct_list {%nt("adjunct_list_dative_to_minus_np")%}


adjunct_list_do_dative_to_minus_np ->
    np adjunct_list_dative_to_minus_np {%nt("adjunct_list_do_dative_to_minus_np")%}
  | dative_to adjunct_list_o_minus_np {%nt("adjunct_list_do_dative_to_minus_np")%}
  | np_minus_np adjunct_list_dative_to {%nt("adjunct_list_do_dative_to_minus_np")%}
  | dative_to_minus_np adjunct_list_o {%nt("adjunct_list_do_dative_to_minus_np")%}


adjunct_list_passive_o_minus_np ->
    adjunct_list_minus_np {%nt("adjunct_list_passive_o_minus_np")%}


adjunct_list_passive_o_predcomp_minus_np ->
    adjunct_list_predcomp_minus_np {%nt("adjunct_list_passive_o_predcomp_minus_np")%}


adjunct_list_passive_intnp_to_inf_cl_minus_np ->
    adjunct_list_to_inf_cl_minus_np {%nt("adjunct_list_passive_intnp_to_inf_cl_minus_np")%}


adjunct_list_passive_io_that_declarative_cl_minus_np ->
    adjunct_list_that_declarative_cl_minus_np {%nt("adjunct_list_passive_io_that_declarative_cl_minus_np")%}


adjunct_list_passive_io_bare_declarative_cl_minus_np ->
    adjunct_list_bare_declarative_cl_minus_np {%nt("adjunct_list_passive_io_bare_declarative_cl_minus_np")%}


adjunct_list_passive_io_exclamative_cl_minus_np ->
    adjunct_list_exclamative_cl_minus_np {%nt("adjunct_list_passive_io_exclamative_cl_minus_np")%}


adjunct_list_passive_io_interrogative_cl_minus_np ->
    adjunct_list_interrogative_cl_minus_np {%nt("adjunct_list_passive_io_interrogative_cl_minus_np")%}


adjunct_list_passive_io_do_minus_np ->
    adjunct_list_o_minus_np {%nt("adjunct_list_passive_io_do_minus_np")%}


adjunct_list_passive_do_dative_to_minus_np ->
    adjunct_list_dative_to_minus_np {%nt("adjunct_list_passive_do_dative_to_minus_np")%}



# modals can only appear in the position of a finite verb (they cannot be conjugated as an infinitive or a participle *to can)
vbf_sg_vp_minus_np -> advp_vp? modal bare_inf_cl_minus_np {%nt("vbf_sg_vp_minus_np")%}

# [sang, danced,]
vbf_sg_vp_minus_np_coordlist ->  vbf_sg_vp_minus_np_coordlist_item:+ {%nonterminal_unpack("vbf_sg_vp_minus_np_coordlist")%}
vbf_sg_vp_minus_np_coordlist_item -> vbf_sg_vp_minus_np comma {%nt("vbf_sg_vp_minus_np_coordlist_item")%}

vbf_sg_vp_minus_np ->
    # coordinations
      vbf_sg_vp_minus_np_coordlist coordinator vbf_sg_vp_minus_np {%nt("vbf_sg_vp_minus_np")%} # coordination: "We [sang, danced, and laughed]"
    | vbf_sg_vp_minus_np binary_coordinator vbf_sg_vp_minus_np {%nt("vbf_sg_vp_minus_np")%} # coordination: "We [sang and danced]"
    # terminal rules
    | advp_vp? vbf_sg                        adjunct_list_minus_np                          {%nt("vbf_sg_vp_minus_np")%} # intransitive verb (ex: "I smoked")
    | advp_vp? vbf_sg_predcomp               adjunct_list_predcomp_minus_np                 {%nt("vbf_sg_vp_minus_np")%} # intransitive verb with adjective phrase argument (ex: "You seemed happy")
    | advp_vp? vbf_sg_to_inf_cl              adjunct_list_to_inf_cl_minus_np                {%nt("vbf_sg_vp_minus_np")%} # intransitive verb with infinitive clause argument (ex: "I wanted to bring the book")
    | advp_vp? vbf_sg_bare_inf_cl            adjunct_list_bare_inf_cl_minus_np              {%nt("vbf_sg_vp_minus_np")%} # intransitive verb with bare infinitive clause argument (ex: "I helped clean")
    | advp_vp? vbf_sg_that_declarative_cl    adjunct_list_that_declarative_cl_minus_np      {%nt("vbf_sg_vp_minus_np")%} # intransitive verb with declarative content clause argument (ex: "I knew that you eat")
    | advp_vp? vbf_sg_bare_declarative_cl    adjunct_list_bare_declarative_cl_minus_np      {%nt("vbf_sg_vp_minus_np")%} # intransitive verb with declarative content clause argument (ex: "I knew you eat")
    | advp_vp? vbf_sg_exclamative_cl         adjunct_list_exclamative_cl_minus_np           {%nt("vbf_sg_vp_minus_np")%} # intransitive verb with exclamative content clause argument (ex: "I said how expensive it was.")
    | advp_vp? vbf_sg_interrogative_cl       adjunct_list_interrogative_cl_minus_np         {%nt("vbf_sg_vp_minus_np")%} # intransitive verb with interrogative clause argument (ex: "I knew what you eat")
    | advp_vp? vbf_sg_vbg_cl                 vbg_cl_minus_np                                {%nt("vbf_sg_vp_minus_np")%} # progressive aspect (ex: "We are eating") or intransitive verb with vbg argument ("we started eating")
    | advp_vp? vbf_sg_vbn_cl                 vbn_cl_minus_np                                {%nt("vbf_sg_vp_minus_np")%} # past perfect (ex: "He had eaten")
    | advp_vp? vbf_sg_passive_cl             passive_cl_minus_np                            {%nt("vbf_sg_vp_minus_np")%} # passive voice (ex: "He was eaten")
    | advp_vp? vbf_sg_o                      adjunct_list_o_minus_np                        {%nt("vbf_sg_vp_minus_np")%} # transitive verb (ex: "I ate the apple")
    | advp_vp? vbf_sg_o_predcomp             adjunct_list_o_predcomp_minus_np               {%nt("vbf_sg_vp_minus_np")%} # transitive verb with adjective phrase argument (ex: "I found you happy")
    | advp_vp? vbf_sg_intnp_to_inf_cl        adjunct_list_intnp_to_inf_cl_minus_np          {%nt("vbf_sg_vp_minus_np")%} # transitive verb with infinitive verb argument (ex: "I asked you to eat the apple")
    | advp_vp? vbf_sg_intnp_bare_inf_cl      adjunct_list_intnp_bare_inf_cl_minus_np        {%nt("vbf_sg_vp_minus_np")%} # transitive verb with bare infinitive verb argument (ex: "I made you eat the apple")
    | advp_vp? vbf_sg_io_that_declarative_cl adjunct_list_io_that_declarative_cl_minus_np   {%nt("vbf_sg_vp_minus_np")%} # transitive verb with declarative content clause argument (ex: "I told you that you eat the apple")
    | advp_vp? vbf_sg_io_bare_declarative_cl adjunct_list_io_bare_declarative_cl_minus_np   {%nt("vbf_sg_vp_minus_np")%} # transitive verb with declarative content clause argument (ex: "I told you you eat the apple")
    | advp_vp? vbf_sg_io_exclamative_cl      adjunct_list_io_exclamative_cl_minus_np        {%nt("vbf_sg_vp_minus_np")%} # transitive verb with exclamative content clause argument (ex: "I told you how expensive it was")
    | advp_vp? vbf_sg_io_interrogative_cl    adjunct_list_io_interrogative_cl_minus_np      {%nt("vbf_sg_vp_minus_np")%} # transitive verb with interrogative clause argument (ex: "I asked you what you eat")
    | advp_vp? vbf_sg_io_do                  adjunct_list_io_do_minus_np                    {%nt("vbf_sg_vp_minus_np")%} # ditransitive verb (ex: "I gave you food")
    | advp_vp? vbf_sg_io_do                  adjunct_list_do_dative_to_minus_np             {%nt("vbf_sg_vp_minus_np")%} # ditransitive verb with dative shift (ex: "I gave food to you")

# modals can only appear in the position of a finite verb (they cannot be conjugated as an infinitive or a participle *to can)
vbf_pl_vp_minus_np -> advp_vp? modal bare_inf_cl_minus_np {%nt("vbf_pl_vp_minus_np")%}

# [sang, danced,]
vbf_pl_vp_minus_np_coordlist ->  vbf_pl_vp_minus_np_coordlist_item:+ {%nonterminal_unpack("vbf_pl_vp_minus_np_coordlist")%}
vbf_pl_vp_minus_np_coordlist_item -> vbf_pl_vp_minus_np comma {%nt("vbf_pl_vp_minus_np_coordlist_item")%}

vbf_pl_vp_minus_np ->
    # coordinations
      vbf_pl_vp_minus_np_coordlist coordinator vbf_pl_vp_minus_np {%nt("vbf_pl_vp_minus_np")%} # coordination: "We [sang, danced, and laughed]"
    | vbf_pl_vp_minus_np binary_coordinator vbf_pl_vp_minus_np {%nt("vbf_pl_vp_minus_np")%} # coordination: "We [sang and danced]"
    # terminal rules
    | advp_vp? vbf_pl                        adjunct_list_minus_np                          {%nt("vbf_pl_vp_minus_np")%} # intransitive verb (ex: "I smoked")
    | advp_vp? vbf_pl_predcomp               adjunct_list_predcomp_minus_np                 {%nt("vbf_pl_vp_minus_np")%} # intransitive verb with adjective phrase argument (ex: "You seemed happy")
    | advp_vp? vbf_pl_to_inf_cl              adjunct_list_to_inf_cl_minus_np                {%nt("vbf_pl_vp_minus_np")%} # intransitive verb with infinitive clause argument (ex: "I wanted to bring the book")
    | advp_vp? vbf_pl_bare_inf_cl            adjunct_list_bare_inf_cl_minus_np              {%nt("vbf_pl_vp_minus_np")%} # intransitive verb with bare infinitive clause argument (ex: "I helped clean")
    | advp_vp? vbf_pl_that_declarative_cl    adjunct_list_that_declarative_cl_minus_np      {%nt("vbf_pl_vp_minus_np")%} # intransitive verb with declarative content clause argument (ex: "I knew that you eat")
    | advp_vp? vbf_pl_bare_declarative_cl    adjunct_list_bare_declarative_cl_minus_np      {%nt("vbf_pl_vp_minus_np")%} # intransitive verb with declarative content clause argument (ex: "I knew you eat")
    | advp_vp? vbf_pl_exclamative_cl         adjunct_list_exclamative_cl_minus_np           {%nt("vbf_pl_vp_minus_np")%} # intransitive verb with exclamative content clause argument (ex: "I said how expensive it was.")
    | advp_vp? vbf_pl_interrogative_cl       adjunct_list_interrogative_cl_minus_np         {%nt("vbf_pl_vp_minus_np")%} # intransitive verb with interrogative clause argument (ex: "I knew what you eat")
    | advp_vp? vbf_pl_vbg_cl                 vbg_cl_minus_np                                {%nt("vbf_pl_vp_minus_np")%} # progressive aspect (ex: "We are eating") or intransitive verb with vbg argument ("we started eating")
    | advp_vp? vbf_pl_vbn_cl                 vbn_cl_minus_np                                {%nt("vbf_pl_vp_minus_np")%} # past perfect (ex: "He had eaten")
    | advp_vp? vbf_pl_passive_cl             passive_cl_minus_np                            {%nt("vbf_pl_vp_minus_np")%} # passive voice (ex: "He was eaten")
    | advp_vp? vbf_pl_o                      adjunct_list_o_minus_np                        {%nt("vbf_pl_vp_minus_np")%} # transitive verb (ex: "I ate the apple")
    | advp_vp? vbf_pl_o_predcomp             adjunct_list_o_predcomp_minus_np               {%nt("vbf_pl_vp_minus_np")%} # transitive verb with adjective phrase argument (ex: "I found you happy")
    | advp_vp? vbf_pl_intnp_to_inf_cl        adjunct_list_intnp_to_inf_cl_minus_np          {%nt("vbf_pl_vp_minus_np")%} # transitive verb with infinitive verb argument (ex: "I asked you to eat the apple")
    | advp_vp? vbf_pl_intnp_bare_inf_cl      adjunct_list_intnp_bare_inf_cl_minus_np        {%nt("vbf_pl_vp_minus_np")%} # transitive verb with bare infinitive verb argument (ex: "I made you eat the apple")
    | advp_vp? vbf_pl_io_that_declarative_cl adjunct_list_io_that_declarative_cl_minus_np   {%nt("vbf_pl_vp_minus_np")%} # transitive verb with declarative content clause argument (ex: "I told you that you eat the apple")
    | advp_vp? vbf_pl_io_bare_declarative_cl adjunct_list_io_bare_declarative_cl_minus_np   {%nt("vbf_pl_vp_minus_np")%} # transitive verb with declarative content clause argument (ex: "I told you you eat the apple")
    | advp_vp? vbf_pl_io_exclamative_cl      adjunct_list_io_exclamative_cl_minus_np        {%nt("vbf_pl_vp_minus_np")%} # transitive verb with exclamative content clause argument (ex: "I told you how expensive it was")
    | advp_vp? vbf_pl_io_interrogative_cl    adjunct_list_io_interrogative_cl_minus_np      {%nt("vbf_pl_vp_minus_np")%} # transitive verb with interrogative clause argument (ex: "I asked you what you eat")
    | advp_vp? vbf_pl_io_do                  adjunct_list_io_do_minus_np                    {%nt("vbf_pl_vp_minus_np")%} # ditransitive verb (ex: "I gave you food")
    | advp_vp? vbf_pl_io_do                  adjunct_list_do_dative_to_minus_np             {%nt("vbf_pl_vp_minus_np")%} # ditransitive verb with dative shift (ex: "I gave food to you")

# [sang, danced,]
inf_vp_minus_np_coordlist ->  inf_vp_minus_np_coordlist_item:+ {%nonterminal_unpack("inf_vp_minus_np_coordlist")%}
inf_vp_minus_np_coordlist_item -> inf_vp_minus_np comma {%nt("inf_vp_minus_np_coordlist_item")%}

inf_vp_minus_np ->
    # coordinations
      inf_vp_minus_np_coordlist coordinator inf_vp_minus_np {%nt("inf_vp_minus_np")%} # coordination: "We [sang, danced, and laughed]"
    | inf_vp_minus_np binary_coordinator inf_vp_minus_np {%nt("inf_vp_minus_np")%} # coordination: "We [sang and danced]"
    # terminal rules
    | advp_vp? inf                        adjunct_list_minus_np                          {%nt("inf_vp_minus_np")%} # intransitive verb (ex: "I smoked")
    | advp_vp? inf_predcomp               adjunct_list_predcomp_minus_np                 {%nt("inf_vp_minus_np")%} # intransitive verb with adjective phrase argument (ex: "You seemed happy")
    | advp_vp? inf_to_inf_cl              adjunct_list_to_inf_cl_minus_np                {%nt("inf_vp_minus_np")%} # intransitive verb with infinitive clause argument (ex: "I wanted to bring the book")
    | advp_vp? inf_bare_inf_cl            adjunct_list_bare_inf_cl_minus_np              {%nt("inf_vp_minus_np")%} # intransitive verb with bare infinitive clause argument (ex: "I helped clean")
    | advp_vp? inf_that_declarative_cl    adjunct_list_that_declarative_cl_minus_np      {%nt("inf_vp_minus_np")%} # intransitive verb with declarative content clause argument (ex: "I knew that you eat")
    | advp_vp? inf_bare_declarative_cl    adjunct_list_bare_declarative_cl_minus_np      {%nt("inf_vp_minus_np")%} # intransitive verb with declarative content clause argument (ex: "I knew you eat")
    | advp_vp? inf_exclamative_cl         adjunct_list_exclamative_cl_minus_np           {%nt("inf_vp_minus_np")%} # intransitive verb with exclamative content clause argument (ex: "I said how expensive it was.")
    | advp_vp? inf_interrogative_cl       adjunct_list_interrogative_cl_minus_np         {%nt("inf_vp_minus_np")%} # intransitive verb with interrogative clause argument (ex: "I knew what you eat")
    | advp_vp? inf_vbg_cl                 vbg_cl_minus_np                                {%nt("inf_vp_minus_np")%} # progressive aspect (ex: "We are eating") or intransitive verb with vbg argument ("we started eating")
    | advp_vp? inf_vbn_cl                 vbn_cl_minus_np                                {%nt("inf_vp_minus_np")%} # past perfect (ex: "He had eaten")
    | advp_vp? inf_passive_cl             passive_cl_minus_np                            {%nt("inf_vp_minus_np")%} # passive voice (ex: "He was eaten")
    | advp_vp? inf_o                      adjunct_list_o_minus_np                        {%nt("inf_vp_minus_np")%} # transitive verb (ex: "I ate the apple")
    | advp_vp? inf_o_predcomp             adjunct_list_o_predcomp_minus_np               {%nt("inf_vp_minus_np")%} # transitive verb with adjective phrase argument (ex: "I found you happy")
    | advp_vp? inf_intnp_to_inf_cl        adjunct_list_intnp_to_inf_cl_minus_np          {%nt("inf_vp_minus_np")%} # transitive verb with infinitive verb argument (ex: "I asked you to eat the apple")
    | advp_vp? inf_intnp_bare_inf_cl      adjunct_list_intnp_bare_inf_cl_minus_np        {%nt("inf_vp_minus_np")%} # transitive verb with bare infinitive verb argument (ex: "I made you eat the apple")
    | advp_vp? inf_io_that_declarative_cl adjunct_list_io_that_declarative_cl_minus_np   {%nt("inf_vp_minus_np")%} # transitive verb with declarative content clause argument (ex: "I told you that you eat the apple")
    | advp_vp? inf_io_bare_declarative_cl adjunct_list_io_bare_declarative_cl_minus_np   {%nt("inf_vp_minus_np")%} # transitive verb with declarative content clause argument (ex: "I told you you eat the apple")
    | advp_vp? inf_io_exclamative_cl      adjunct_list_io_exclamative_cl_minus_np        {%nt("inf_vp_minus_np")%} # transitive verb with exclamative content clause argument (ex: "I told you how expensive it was")
    | advp_vp? inf_io_interrogative_cl    adjunct_list_io_interrogative_cl_minus_np      {%nt("inf_vp_minus_np")%} # transitive verb with interrogative clause argument (ex: "I asked you what you eat")
    | advp_vp? inf_io_do                  adjunct_list_io_do_minus_np                    {%nt("inf_vp_minus_np")%} # ditransitive verb (ex: "I gave you food")
    | advp_vp? inf_io_do                  adjunct_list_do_dative_to_minus_np             {%nt("inf_vp_minus_np")%} # ditransitive verb with dative shift (ex: "I gave food to you")

# [sang, danced,]
vbg_vp_minus_np_coordlist ->  vbg_vp_minus_np_coordlist_item:+ {%nonterminal_unpack("vbg_vp_minus_np_coordlist")%}
vbg_vp_minus_np_coordlist_item -> vbg_vp_minus_np comma {%nt("vbg_vp_minus_np_coordlist_item")%}

vbg_vp_minus_np ->
    # coordinations
      vbg_vp_minus_np_coordlist coordinator vbg_vp_minus_np {%nt("vbg_vp_minus_np")%} # coordination: "We [sang, danced, and laughed]"
    | vbg_vp_minus_np binary_coordinator vbg_vp_minus_np {%nt("vbg_vp_minus_np")%} # coordination: "We [sang and danced]"
    # terminal rules
    | advp_vp? vbg                        adjunct_list_minus_np                          {%nt("vbg_vp_minus_np")%} # intransitive verb (ex: "I smoked")
    | advp_vp? vbg_predcomp               adjunct_list_predcomp_minus_np                 {%nt("vbg_vp_minus_np")%} # intransitive verb with adjective phrase argument (ex: "You seemed happy")
    | advp_vp? vbg_to_inf_cl              adjunct_list_to_inf_cl_minus_np                {%nt("vbg_vp_minus_np")%} # intransitive verb with infinitive clause argument (ex: "I wanted to bring the book")
    | advp_vp? vbg_bare_inf_cl            adjunct_list_bare_inf_cl_minus_np              {%nt("vbg_vp_minus_np")%} # intransitive verb with bare infinitive clause argument (ex: "I helped clean")
    | advp_vp? vbg_that_declarative_cl    adjunct_list_that_declarative_cl_minus_np      {%nt("vbg_vp_minus_np")%} # intransitive verb with declarative content clause argument (ex: "I knew that you eat")
    | advp_vp? vbg_bare_declarative_cl    adjunct_list_bare_declarative_cl_minus_np      {%nt("vbg_vp_minus_np")%} # intransitive verb with declarative content clause argument (ex: "I knew you eat")
    | advp_vp? vbg_exclamative_cl         adjunct_list_exclamative_cl_minus_np           {%nt("vbg_vp_minus_np")%} # intransitive verb with exclamative content clause argument (ex: "I said how expensive it was.")
    | advp_vp? vbg_interrogative_cl       adjunct_list_interrogative_cl_minus_np         {%nt("vbg_vp_minus_np")%} # intransitive verb with interrogative clause argument (ex: "I knew what you eat")
    | advp_vp? vbg_vbg_cl                 vbg_cl_minus_np                                {%nt("vbg_vp_minus_np")%} # progressive aspect (ex: "We are eating") or intransitive verb with vbg argument ("we started eating")
    | advp_vp? vbg_vbn_cl                 vbn_cl_minus_np                                {%nt("vbg_vp_minus_np")%} # past perfect (ex: "He had eaten")
    | advp_vp? vbg_passive_cl             passive_cl_minus_np                            {%nt("vbg_vp_minus_np")%} # passive voice (ex: "He was eaten")
    | advp_vp? vbg_o                      adjunct_list_o_minus_np                        {%nt("vbg_vp_minus_np")%} # transitive verb (ex: "I ate the apple")
    | advp_vp? vbg_o_predcomp             adjunct_list_o_predcomp_minus_np               {%nt("vbg_vp_minus_np")%} # transitive verb with adjective phrase argument (ex: "I found you happy")
    | advp_vp? vbg_intnp_to_inf_cl        adjunct_list_intnp_to_inf_cl_minus_np          {%nt("vbg_vp_minus_np")%} # transitive verb with infinitive verb argument (ex: "I asked you to eat the apple")
    | advp_vp? vbg_intnp_bare_inf_cl      adjunct_list_intnp_bare_inf_cl_minus_np        {%nt("vbg_vp_minus_np")%} # transitive verb with bare infinitive verb argument (ex: "I made you eat the apple")
    | advp_vp? vbg_io_that_declarative_cl adjunct_list_io_that_declarative_cl_minus_np   {%nt("vbg_vp_minus_np")%} # transitive verb with declarative content clause argument (ex: "I told you that you eat the apple")
    | advp_vp? vbg_io_bare_declarative_cl adjunct_list_io_bare_declarative_cl_minus_np   {%nt("vbg_vp_minus_np")%} # transitive verb with declarative content clause argument (ex: "I told you you eat the apple")
    | advp_vp? vbg_io_exclamative_cl      adjunct_list_io_exclamative_cl_minus_np        {%nt("vbg_vp_minus_np")%} # transitive verb with exclamative content clause argument (ex: "I told you how expensive it was")
    | advp_vp? vbg_io_interrogative_cl    adjunct_list_io_interrogative_cl_minus_np      {%nt("vbg_vp_minus_np")%} # transitive verb with interrogative clause argument (ex: "I asked you what you eat")
    | advp_vp? vbg_io_do                  adjunct_list_io_do_minus_np                    {%nt("vbg_vp_minus_np")%} # ditransitive verb (ex: "I gave you food")
    | advp_vp? vbg_io_do                  adjunct_list_do_dative_to_minus_np             {%nt("vbg_vp_minus_np")%} # ditransitive verb with dative shift (ex: "I gave food to you")

# [sang, danced,]
vbn_vp_minus_np_coordlist ->  vbn_vp_minus_np_coordlist_item:+ {%nonterminal_unpack("vbn_vp_minus_np_coordlist")%}
vbn_vp_minus_np_coordlist_item -> vbn_vp_minus_np comma {%nt("vbn_vp_minus_np_coordlist_item")%}

vbn_vp_minus_np ->
    # coordinations
      vbn_vp_minus_np_coordlist coordinator vbn_vp_minus_np {%nt("vbn_vp_minus_np")%} # coordination: "We [sang, danced, and laughed]"
    | vbn_vp_minus_np binary_coordinator vbn_vp_minus_np {%nt("vbn_vp_minus_np")%} # coordination: "We [sang and danced]"
    # terminal rules
    | advp_vp? vbn                        adjunct_list_minus_np                          {%nt("vbn_vp_minus_np")%} # intransitive verb (ex: "I smoked")
    | advp_vp? vbn_predcomp               adjunct_list_predcomp_minus_np                 {%nt("vbn_vp_minus_np")%} # intransitive verb with adjective phrase argument (ex: "You seemed happy")
    | advp_vp? vbn_to_inf_cl              adjunct_list_to_inf_cl_minus_np                {%nt("vbn_vp_minus_np")%} # intransitive verb with infinitive clause argument (ex: "I wanted to bring the book")
    | advp_vp? vbn_bare_inf_cl            adjunct_list_bare_inf_cl_minus_np              {%nt("vbn_vp_minus_np")%} # intransitive verb with bare infinitive clause argument (ex: "I helped clean")
    | advp_vp? vbn_that_declarative_cl    adjunct_list_that_declarative_cl_minus_np      {%nt("vbn_vp_minus_np")%} # intransitive verb with declarative content clause argument (ex: "I knew that you eat")
    | advp_vp? vbn_bare_declarative_cl    adjunct_list_bare_declarative_cl_minus_np      {%nt("vbn_vp_minus_np")%} # intransitive verb with declarative content clause argument (ex: "I knew you eat")
    | advp_vp? vbn_exclamative_cl         adjunct_list_exclamative_cl_minus_np           {%nt("vbn_vp_minus_np")%} # intransitive verb with exclamative content clause argument (ex: "I said how expensive it was.")
    | advp_vp? vbn_interrogative_cl       adjunct_list_interrogative_cl_minus_np         {%nt("vbn_vp_minus_np")%} # intransitive verb with interrogative clause argument (ex: "I knew what you eat")
    | advp_vp? vbn_vbg_cl                 vbg_cl_minus_np                                {%nt("vbn_vp_minus_np")%} # progressive aspect (ex: "We are eating") or intransitive verb with vbg argument ("we started eating")
    | advp_vp? vbn_vbn_cl                 vbn_cl_minus_np                                {%nt("vbn_vp_minus_np")%} # past perfect (ex: "He had eaten")
    | advp_vp? vbn_passive_cl             passive_cl_minus_np                            {%nt("vbn_vp_minus_np")%} # passive voice (ex: "He was eaten")
    | advp_vp? vbn_o                      adjunct_list_o_minus_np                        {%nt("vbn_vp_minus_np")%} # transitive verb (ex: "I ate the apple")
    | advp_vp? vbn_o_predcomp             adjunct_list_o_predcomp_minus_np               {%nt("vbn_vp_minus_np")%} # transitive verb with adjective phrase argument (ex: "I found you happy")
    | advp_vp? vbn_intnp_to_inf_cl        adjunct_list_intnp_to_inf_cl_minus_np          {%nt("vbn_vp_minus_np")%} # transitive verb with infinitive verb argument (ex: "I asked you to eat the apple")
    | advp_vp? vbn_intnp_bare_inf_cl      adjunct_list_intnp_bare_inf_cl_minus_np        {%nt("vbn_vp_minus_np")%} # transitive verb with bare infinitive verb argument (ex: "I made you eat the apple")
    | advp_vp? vbn_io_that_declarative_cl adjunct_list_io_that_declarative_cl_minus_np   {%nt("vbn_vp_minus_np")%} # transitive verb with declarative content clause argument (ex: "I told you that you eat the apple")
    | advp_vp? vbn_io_bare_declarative_cl adjunct_list_io_bare_declarative_cl_minus_np   {%nt("vbn_vp_minus_np")%} # transitive verb with declarative content clause argument (ex: "I told you you eat the apple")
    | advp_vp? vbn_io_exclamative_cl      adjunct_list_io_exclamative_cl_minus_np        {%nt("vbn_vp_minus_np")%} # transitive verb with exclamative content clause argument (ex: "I told you how expensive it was")
    | advp_vp? vbn_io_interrogative_cl    adjunct_list_io_interrogative_cl_minus_np      {%nt("vbn_vp_minus_np")%} # transitive verb with interrogative clause argument (ex: "I asked you what you eat")
    | advp_vp? vbn_io_do                  adjunct_list_io_do_minus_np                    {%nt("vbn_vp_minus_np")%} # ditransitive verb (ex: "I gave you food")
    | advp_vp? vbn_io_do                  adjunct_list_do_dative_to_minus_np             {%nt("vbn_vp_minus_np")%} # ditransitive verb with dative shift (ex: "I gave food to you")

passive_cl_minus_np -> 
# omit all the intransitive verbs
# omit vbg_cl, as one cannot combine passive with progressive aspect *The food was been eaten
# omit vbn_cl, as one cannot combine passive with past perfect *The food was had eaten
# omit passive_cl, as one cannot combine passive with passive *The food was been eaten
      advp_vp? vbn_o                      adjunct_list_passive_o_minus_np                         {%nt("passive_cl_minus_np")%}
    | advp_vp? vbn_o_predcomp             adjunct_list_passive_o_predcomp_minus_np                {%nt("passive_cl_minus_np")%}
    | advp_vp? vbn_intnp_to_inf_cl        adjunct_list_passive_intnp_to_inf_cl_minus_np           {%nt("passive_cl_minus_np")%}
    | advp_vp? vbn_io_that_declarative_cl adjunct_list_passive_io_that_declarative_cl_minus_np    {%nt("passive_cl_minus_np")%}
    | advp_vp? vbn_io_bare_declarative_cl adjunct_list_passive_io_bare_declarative_cl_minus_np    {%nt("passive_cl_minus_np")%}
    | advp_vp? vbn_io_exclamative_cl      adjunct_list_passive_io_exclamative_cl_minus_np         {%nt("passive_cl_minus_np")%}
    | advp_vp? vbn_io_interrogative_cl    adjunct_list_passive_io_interrogative_cl_minus_np       {%nt("passive_cl_minus_np")%}
    | advp_vp? vbn_io_do                  adjunct_list_passive_io_do_minus_np                     {%nt("passive_cl_minus_np")%}
    | advp_vp? vbn_io_do                  adjunct_list_passive_do_dative_to_minus_np              {%nt("passive_cl_minus_np")%}

adjunct_list_minus_adjp ->
    adjunct adjunct_list_minus_adjp {%nt("adjunct_list_minus_adjp")%}
  | adjunct_minus_adjp adjunct_list {%nt("adjunct_list_minus_adjp")%}


adjunct_list_predcomp_minus_adjp ->
    predcomp adjunct_list_minus_adjp {%nt("adjunct_list_predcomp_minus_adjp")%}
  | predcomp_minus_adjp adjunct_list {%nt("adjunct_list_predcomp_minus_adjp")%}


adjunct_list_to_inf_cl_minus_adjp ->
    adjunct adjunct_list_to_inf_cl_minus_adjp {%nt("adjunct_list_to_inf_cl_minus_adjp")%}
  | to_inf_cl adjunct_list_minus_adjp {%nt("adjunct_list_to_inf_cl_minus_adjp")%}
  | adjunct_minus_adjp adjunct_list_to_inf_cl {%nt("adjunct_list_to_inf_cl_minus_adjp")%}
  | to_inf_cl_minus_adjp adjunct_list {%nt("adjunct_list_to_inf_cl_minus_adjp")%}


adjunct_list_bare_inf_cl_minus_adjp ->
    bare_inf_cl_minus_adjp {%nt("adjunct_list_bare_inf_cl_minus_adjp")%}


adjunct_list_that_declarative_cl_minus_adjp ->
    that_declarative_cl adjunct_list_minus_adjp {%nt("adjunct_list_that_declarative_cl_minus_adjp")%}
  | adjunct_minus_adjp adjunct_list_that_declarative_cl {%nt("adjunct_list_that_declarative_cl_minus_adjp")%}
  | that_declarative_cl_minus_adjp adjunct_list {%nt("adjunct_list_that_declarative_cl_minus_adjp")%}


adjunct_list_bare_declarative_cl_minus_adjp ->
    bare_declarative_cl adjunct_list_minus_adjp {%nt("adjunct_list_bare_declarative_cl_minus_adjp")%}
  | adjunct_minus_adjp adjunct_list_bare_declarative_cl {%nt("adjunct_list_bare_declarative_cl_minus_adjp")%}
  | bare_declarative_cl_minus_adjp adjunct_list {%nt("adjunct_list_bare_declarative_cl_minus_adjp")%}


adjunct_list_exclamative_cl_minus_adjp ->
    exclamative_cl adjunct_list_minus_adjp {%nt("adjunct_list_exclamative_cl_minus_adjp")%}
  | adjunct_minus_adjp adjunct_list_exclamative_cl {%nt("adjunct_list_exclamative_cl_minus_adjp")%}


adjunct_list_interrogative_cl_minus_adjp ->
    interrogative_cl adjunct_list_minus_adjp {%nt("adjunct_list_interrogative_cl_minus_adjp")%}
  | adjunct_minus_adjp adjunct_list_interrogative_cl {%nt("adjunct_list_interrogative_cl_minus_adjp")%}


adjunct_list_o_minus_adjp -> impossible

adjunct_list_o_predcomp_minus_adjp ->
    np adjunct_list_o_predcomp_minus_adjp {%nt("adjunct_list_o_predcomp_minus_adjp")%}
  | predcomp adjunct_list_o_minus_adjp {%nt("adjunct_list_o_predcomp_minus_adjp")%}
  | np_minus_adjp adjunct_list_o_predcomp {%nt("adjunct_list_o_predcomp_minus_adjp")%}


adjunct_list_intnp_to_inf_cl_minus_adjp ->
    np adjunct_list_to_inf_cl_minus_adjp {%nt("adjunct_list_intnp_to_inf_cl_minus_adjp")%}
  | np_minus_adjp adjunct_list_to_inf_cl {%nt("adjunct_list_intnp_to_inf_cl_minus_adjp")%}


adjunct_list_intnp_bare_inf_cl_minus_adjp ->
    np adjunct_list_bare_inf_cl_minus_adjp {%nt("adjunct_list_intnp_bare_inf_cl_minus_adjp")%}
  | np_minus_adjp adjunct_list_bare_inf_cl {%nt("adjunct_list_intnp_bare_inf_cl_minus_adjp")%}


adjunct_list_io_that_declarative_cl_minus_adjp ->
    np adjunct_list_that_declarative_cl_minus_adjp {%nt("adjunct_list_io_that_declarative_cl_minus_adjp")%}
  | np_minus_adjp adjunct_list_that_declarative_cl {%nt("adjunct_list_io_that_declarative_cl_minus_adjp")%}


adjunct_list_io_bare_declarative_cl_minus_adjp ->
    np adjunct_list_bare_declarative_cl_minus_adjp {%nt("adjunct_list_io_bare_declarative_cl_minus_adjp")%}
  | np_minus_adjp adjunct_list_bare_declarative_cl {%nt("adjunct_list_io_bare_declarative_cl_minus_adjp")%}


adjunct_list_io_exclamative_cl_minus_adjp ->
    np adjunct_list_exclamative_cl_minus_adjp {%nt("adjunct_list_io_exclamative_cl_minus_adjp")%}
  | np_minus_adjp adjunct_list_exclamative_cl {%nt("adjunct_list_io_exclamative_cl_minus_adjp")%}


adjunct_list_io_interrogative_cl_minus_adjp ->
    np adjunct_list_interrogative_cl_minus_adjp {%nt("adjunct_list_io_interrogative_cl_minus_adjp")%}
  | np_minus_adjp adjunct_list_interrogative_cl {%nt("adjunct_list_io_interrogative_cl_minus_adjp")%}


adjunct_list_io_do_minus_adjp ->
    np adjunct_list_o_minus_adjp {%nt("adjunct_list_io_do_minus_adjp")%}
  | np_minus_adjp adjunct_list_o {%nt("adjunct_list_io_do_minus_adjp")%}


adjunct_list_dative_to_minus_adjp ->
    adjunct adjunct_list_dative_to_minus_adjp {%nt("adjunct_list_dative_to_minus_adjp")%}
  | adjunct_minus_adjp adjunct_list_dative_to {%nt("adjunct_list_dative_to_minus_adjp")%}
  | dative_to_minus_adjp adjunct_list {%nt("adjunct_list_dative_to_minus_adjp")%}


adjunct_list_do_dative_to_minus_adjp ->
    np adjunct_list_dative_to_minus_adjp {%nt("adjunct_list_do_dative_to_minus_adjp")%}
  | dative_to adjunct_list_o_minus_adjp {%nt("adjunct_list_do_dative_to_minus_adjp")%}
  | np_minus_adjp adjunct_list_dative_to {%nt("adjunct_list_do_dative_to_minus_adjp")%}
  | dative_to_minus_adjp adjunct_list_o {%nt("adjunct_list_do_dative_to_minus_adjp")%}


adjunct_list_passive_o_minus_adjp -> impossible

adjunct_list_passive_o_predcomp_minus_adjp ->
    adjunct_list_predcomp_minus_adjp {%nt("adjunct_list_passive_o_predcomp_minus_adjp")%}


adjunct_list_passive_intnp_to_inf_cl_minus_adjp ->
    adjunct_list_to_inf_cl_minus_adjp {%nt("adjunct_list_passive_intnp_to_inf_cl_minus_adjp")%}


adjunct_list_passive_io_that_declarative_cl_minus_adjp ->
    adjunct_list_that_declarative_cl_minus_adjp {%nt("adjunct_list_passive_io_that_declarative_cl_minus_adjp")%}


adjunct_list_passive_io_bare_declarative_cl_minus_adjp ->
    adjunct_list_bare_declarative_cl_minus_adjp {%nt("adjunct_list_passive_io_bare_declarative_cl_minus_adjp")%}


adjunct_list_passive_io_exclamative_cl_minus_adjp ->
    adjunct_list_exclamative_cl_minus_adjp {%nt("adjunct_list_passive_io_exclamative_cl_minus_adjp")%}


adjunct_list_passive_io_interrogative_cl_minus_adjp ->
    adjunct_list_interrogative_cl_minus_adjp {%nt("adjunct_list_passive_io_interrogative_cl_minus_adjp")%}


adjunct_list_passive_io_do_minus_adjp -> impossible

adjunct_list_passive_do_dative_to_minus_adjp -> impossible


# modals can only appear in the position of a finite verb (they cannot be conjugated as an infinitive or a participle *to can)
vbf_sg_vp_minus_adjp -> advp_vp? modal bare_inf_cl_minus_adjp {%nt("vbf_sg_vp_minus_adjp")%}

# [sang, danced,]
vbf_sg_vp_minus_adjp_coordlist ->  vbf_sg_vp_minus_adjp_coordlist_item:+ {%nonterminal_unpack("vbf_sg_vp_minus_adjp_coordlist")%}
vbf_sg_vp_minus_adjp_coordlist_item -> vbf_sg_vp_minus_adjp comma {%nt("vbf_sg_vp_minus_adjp_coordlist_item")%}

vbf_sg_vp_minus_adjp ->
    # coordinations
      vbf_sg_vp_minus_adjp_coordlist coordinator vbf_sg_vp_minus_adjp {%nt("vbf_sg_vp_minus_adjp")%} # coordination: "We [sang, danced, and laughed]"
    | vbf_sg_vp_minus_adjp binary_coordinator vbf_sg_vp_minus_adjp {%nt("vbf_sg_vp_minus_adjp")%} # coordination: "We [sang and danced]"
    # terminal rules
    | advp_vp? vbf_sg                        adjunct_list_minus_adjp                          {%nt("vbf_sg_vp_minus_adjp")%} # intransitive verb (ex: "I smoked")
    | advp_vp? vbf_sg_predcomp               adjunct_list_predcomp_minus_adjp                 {%nt("vbf_sg_vp_minus_adjp")%} # intransitive verb with adjective phrase argument (ex: "You seemed happy")
    | advp_vp? vbf_sg_to_inf_cl              adjunct_list_to_inf_cl_minus_adjp                {%nt("vbf_sg_vp_minus_adjp")%} # intransitive verb with infinitive clause argument (ex: "I wanted to bring the book")
    | advp_vp? vbf_sg_bare_inf_cl            adjunct_list_bare_inf_cl_minus_adjp              {%nt("vbf_sg_vp_minus_adjp")%} # intransitive verb with bare infinitive clause argument (ex: "I helped clean")
    | advp_vp? vbf_sg_that_declarative_cl    adjunct_list_that_declarative_cl_minus_adjp      {%nt("vbf_sg_vp_minus_adjp")%} # intransitive verb with declarative content clause argument (ex: "I knew that you eat")
    | advp_vp? vbf_sg_bare_declarative_cl    adjunct_list_bare_declarative_cl_minus_adjp      {%nt("vbf_sg_vp_minus_adjp")%} # intransitive verb with declarative content clause argument (ex: "I knew you eat")
    | advp_vp? vbf_sg_exclamative_cl         adjunct_list_exclamative_cl_minus_adjp           {%nt("vbf_sg_vp_minus_adjp")%} # intransitive verb with exclamative content clause argument (ex: "I said how expensive it was.")
    | advp_vp? vbf_sg_interrogative_cl       adjunct_list_interrogative_cl_minus_adjp         {%nt("vbf_sg_vp_minus_adjp")%} # intransitive verb with interrogative clause argument (ex: "I knew what you eat")
    | advp_vp? vbf_sg_vbg_cl                 vbg_cl_minus_adjp                                {%nt("vbf_sg_vp_minus_adjp")%} # progressive aspect (ex: "We are eating") or intransitive verb with vbg argument ("we started eating")
    | advp_vp? vbf_sg_vbn_cl                 vbn_cl_minus_adjp                                {%nt("vbf_sg_vp_minus_adjp")%} # past perfect (ex: "He had eaten")
    | advp_vp? vbf_sg_passive_cl             passive_cl_minus_adjp                            {%nt("vbf_sg_vp_minus_adjp")%} # passive voice (ex: "He was eaten")
    | advp_vp? vbf_sg_o                      adjunct_list_o_minus_adjp                        {%nt("vbf_sg_vp_minus_adjp")%} # transitive verb (ex: "I ate the apple")
    | advp_vp? vbf_sg_o_predcomp             adjunct_list_o_predcomp_minus_adjp               {%nt("vbf_sg_vp_minus_adjp")%} # transitive verb with adjective phrase argument (ex: "I found you happy")
    | advp_vp? vbf_sg_intnp_to_inf_cl        adjunct_list_intnp_to_inf_cl_minus_adjp          {%nt("vbf_sg_vp_minus_adjp")%} # transitive verb with infinitive verb argument (ex: "I asked you to eat the apple")
    | advp_vp? vbf_sg_intnp_bare_inf_cl      adjunct_list_intnp_bare_inf_cl_minus_adjp        {%nt("vbf_sg_vp_minus_adjp")%} # transitive verb with bare infinitive verb argument (ex: "I made you eat the apple")
    | advp_vp? vbf_sg_io_that_declarative_cl adjunct_list_io_that_declarative_cl_minus_adjp   {%nt("vbf_sg_vp_minus_adjp")%} # transitive verb with declarative content clause argument (ex: "I told you that you eat the apple")
    | advp_vp? vbf_sg_io_bare_declarative_cl adjunct_list_io_bare_declarative_cl_minus_adjp   {%nt("vbf_sg_vp_minus_adjp")%} # transitive verb with declarative content clause argument (ex: "I told you you eat the apple")
    | advp_vp? vbf_sg_io_exclamative_cl      adjunct_list_io_exclamative_cl_minus_adjp        {%nt("vbf_sg_vp_minus_adjp")%} # transitive verb with exclamative content clause argument (ex: "I told you how expensive it was")
    | advp_vp? vbf_sg_io_interrogative_cl    adjunct_list_io_interrogative_cl_minus_adjp      {%nt("vbf_sg_vp_minus_adjp")%} # transitive verb with interrogative clause argument (ex: "I asked you what you eat")
    | advp_vp? vbf_sg_io_do                  adjunct_list_io_do_minus_adjp                    {%nt("vbf_sg_vp_minus_adjp")%} # ditransitive verb (ex: "I gave you food")
    | advp_vp? vbf_sg_io_do                  adjunct_list_do_dative_to_minus_adjp             {%nt("vbf_sg_vp_minus_adjp")%} # ditransitive verb with dative shift (ex: "I gave food to you")

# modals can only appear in the position of a finite verb (they cannot be conjugated as an infinitive or a participle *to can)
vbf_pl_vp_minus_adjp -> advp_vp? modal bare_inf_cl_minus_adjp {%nt("vbf_pl_vp_minus_adjp")%}

# [sang, danced,]
vbf_pl_vp_minus_adjp_coordlist ->  vbf_pl_vp_minus_adjp_coordlist_item:+ {%nonterminal_unpack("vbf_pl_vp_minus_adjp_coordlist")%}
vbf_pl_vp_minus_adjp_coordlist_item -> vbf_pl_vp_minus_adjp comma {%nt("vbf_pl_vp_minus_adjp_coordlist_item")%}

vbf_pl_vp_minus_adjp ->
    # coordinations
      vbf_pl_vp_minus_adjp_coordlist coordinator vbf_pl_vp_minus_adjp {%nt("vbf_pl_vp_minus_adjp")%} # coordination: "We [sang, danced, and laughed]"
    | vbf_pl_vp_minus_adjp binary_coordinator vbf_pl_vp_minus_adjp {%nt("vbf_pl_vp_minus_adjp")%} # coordination: "We [sang and danced]"
    # terminal rules
    | advp_vp? vbf_pl                        adjunct_list_minus_adjp                          {%nt("vbf_pl_vp_minus_adjp")%} # intransitive verb (ex: "I smoked")
    | advp_vp? vbf_pl_predcomp               adjunct_list_predcomp_minus_adjp                 {%nt("vbf_pl_vp_minus_adjp")%} # intransitive verb with adjective phrase argument (ex: "You seemed happy")
    | advp_vp? vbf_pl_to_inf_cl              adjunct_list_to_inf_cl_minus_adjp                {%nt("vbf_pl_vp_minus_adjp")%} # intransitive verb with infinitive clause argument (ex: "I wanted to bring the book")
    | advp_vp? vbf_pl_bare_inf_cl            adjunct_list_bare_inf_cl_minus_adjp              {%nt("vbf_pl_vp_minus_adjp")%} # intransitive verb with bare infinitive clause argument (ex: "I helped clean")
    | advp_vp? vbf_pl_that_declarative_cl    adjunct_list_that_declarative_cl_minus_adjp      {%nt("vbf_pl_vp_minus_adjp")%} # intransitive verb with declarative content clause argument (ex: "I knew that you eat")
    | advp_vp? vbf_pl_bare_declarative_cl    adjunct_list_bare_declarative_cl_minus_adjp      {%nt("vbf_pl_vp_minus_adjp")%} # intransitive verb with declarative content clause argument (ex: "I knew you eat")
    | advp_vp? vbf_pl_exclamative_cl         adjunct_list_exclamative_cl_minus_adjp           {%nt("vbf_pl_vp_minus_adjp")%} # intransitive verb with exclamative content clause argument (ex: "I said how expensive it was.")
    | advp_vp? vbf_pl_interrogative_cl       adjunct_list_interrogative_cl_minus_adjp         {%nt("vbf_pl_vp_minus_adjp")%} # intransitive verb with interrogative clause argument (ex: "I knew what you eat")
    | advp_vp? vbf_pl_vbg_cl                 vbg_cl_minus_adjp                                {%nt("vbf_pl_vp_minus_adjp")%} # progressive aspect (ex: "We are eating") or intransitive verb with vbg argument ("we started eating")
    | advp_vp? vbf_pl_vbn_cl                 vbn_cl_minus_adjp                                {%nt("vbf_pl_vp_minus_adjp")%} # past perfect (ex: "He had eaten")
    | advp_vp? vbf_pl_passive_cl             passive_cl_minus_adjp                            {%nt("vbf_pl_vp_minus_adjp")%} # passive voice (ex: "He was eaten")
    | advp_vp? vbf_pl_o                      adjunct_list_o_minus_adjp                        {%nt("vbf_pl_vp_minus_adjp")%} # transitive verb (ex: "I ate the apple")
    | advp_vp? vbf_pl_o_predcomp             adjunct_list_o_predcomp_minus_adjp               {%nt("vbf_pl_vp_minus_adjp")%} # transitive verb with adjective phrase argument (ex: "I found you happy")
    | advp_vp? vbf_pl_intnp_to_inf_cl        adjunct_list_intnp_to_inf_cl_minus_adjp          {%nt("vbf_pl_vp_minus_adjp")%} # transitive verb with infinitive verb argument (ex: "I asked you to eat the apple")
    | advp_vp? vbf_pl_intnp_bare_inf_cl      adjunct_list_intnp_bare_inf_cl_minus_adjp        {%nt("vbf_pl_vp_minus_adjp")%} # transitive verb with bare infinitive verb argument (ex: "I made you eat the apple")
    | advp_vp? vbf_pl_io_that_declarative_cl adjunct_list_io_that_declarative_cl_minus_adjp   {%nt("vbf_pl_vp_minus_adjp")%} # transitive verb with declarative content clause argument (ex: "I told you that you eat the apple")
    | advp_vp? vbf_pl_io_bare_declarative_cl adjunct_list_io_bare_declarative_cl_minus_adjp   {%nt("vbf_pl_vp_minus_adjp")%} # transitive verb with declarative content clause argument (ex: "I told you you eat the apple")
    | advp_vp? vbf_pl_io_exclamative_cl      adjunct_list_io_exclamative_cl_minus_adjp        {%nt("vbf_pl_vp_minus_adjp")%} # transitive verb with exclamative content clause argument (ex: "I told you how expensive it was")
    | advp_vp? vbf_pl_io_interrogative_cl    adjunct_list_io_interrogative_cl_minus_adjp      {%nt("vbf_pl_vp_minus_adjp")%} # transitive verb with interrogative clause argument (ex: "I asked you what you eat")
    | advp_vp? vbf_pl_io_do                  adjunct_list_io_do_minus_adjp                    {%nt("vbf_pl_vp_minus_adjp")%} # ditransitive verb (ex: "I gave you food")
    | advp_vp? vbf_pl_io_do                  adjunct_list_do_dative_to_minus_adjp             {%nt("vbf_pl_vp_minus_adjp")%} # ditransitive verb with dative shift (ex: "I gave food to you")

# [sang, danced,]
inf_vp_minus_adjp_coordlist ->  inf_vp_minus_adjp_coordlist_item:+ {%nonterminal_unpack("inf_vp_minus_adjp_coordlist")%}
inf_vp_minus_adjp_coordlist_item -> inf_vp_minus_adjp comma {%nt("inf_vp_minus_adjp_coordlist_item")%}

inf_vp_minus_adjp ->
    # coordinations
      inf_vp_minus_adjp_coordlist coordinator inf_vp_minus_adjp {%nt("inf_vp_minus_adjp")%} # coordination: "We [sang, danced, and laughed]"
    | inf_vp_minus_adjp binary_coordinator inf_vp_minus_adjp {%nt("inf_vp_minus_adjp")%} # coordination: "We [sang and danced]"
    # terminal rules
    | advp_vp? inf                        adjunct_list_minus_adjp                          {%nt("inf_vp_minus_adjp")%} # intransitive verb (ex: "I smoked")
    | advp_vp? inf_predcomp               adjunct_list_predcomp_minus_adjp                 {%nt("inf_vp_minus_adjp")%} # intransitive verb with adjective phrase argument (ex: "You seemed happy")
    | advp_vp? inf_to_inf_cl              adjunct_list_to_inf_cl_minus_adjp                {%nt("inf_vp_minus_adjp")%} # intransitive verb with infinitive clause argument (ex: "I wanted to bring the book")
    | advp_vp? inf_bare_inf_cl            adjunct_list_bare_inf_cl_minus_adjp              {%nt("inf_vp_minus_adjp")%} # intransitive verb with bare infinitive clause argument (ex: "I helped clean")
    | advp_vp? inf_that_declarative_cl    adjunct_list_that_declarative_cl_minus_adjp      {%nt("inf_vp_minus_adjp")%} # intransitive verb with declarative content clause argument (ex: "I knew that you eat")
    | advp_vp? inf_bare_declarative_cl    adjunct_list_bare_declarative_cl_minus_adjp      {%nt("inf_vp_minus_adjp")%} # intransitive verb with declarative content clause argument (ex: "I knew you eat")
    | advp_vp? inf_exclamative_cl         adjunct_list_exclamative_cl_minus_adjp           {%nt("inf_vp_minus_adjp")%} # intransitive verb with exclamative content clause argument (ex: "I said how expensive it was.")
    | advp_vp? inf_interrogative_cl       adjunct_list_interrogative_cl_minus_adjp         {%nt("inf_vp_minus_adjp")%} # intransitive verb with interrogative clause argument (ex: "I knew what you eat")
    | advp_vp? inf_vbg_cl                 vbg_cl_minus_adjp                                {%nt("inf_vp_minus_adjp")%} # progressive aspect (ex: "We are eating") or intransitive verb with vbg argument ("we started eating")
    | advp_vp? inf_vbn_cl                 vbn_cl_minus_adjp                                {%nt("inf_vp_minus_adjp")%} # past perfect (ex: "He had eaten")
    | advp_vp? inf_passive_cl             passive_cl_minus_adjp                            {%nt("inf_vp_minus_adjp")%} # passive voice (ex: "He was eaten")
    | advp_vp? inf_o                      adjunct_list_o_minus_adjp                        {%nt("inf_vp_minus_adjp")%} # transitive verb (ex: "I ate the apple")
    | advp_vp? inf_o_predcomp             adjunct_list_o_predcomp_minus_adjp               {%nt("inf_vp_minus_adjp")%} # transitive verb with adjective phrase argument (ex: "I found you happy")
    | advp_vp? inf_intnp_to_inf_cl        adjunct_list_intnp_to_inf_cl_minus_adjp          {%nt("inf_vp_minus_adjp")%} # transitive verb with infinitive verb argument (ex: "I asked you to eat the apple")
    | advp_vp? inf_intnp_bare_inf_cl      adjunct_list_intnp_bare_inf_cl_minus_adjp        {%nt("inf_vp_minus_adjp")%} # transitive verb with bare infinitive verb argument (ex: "I made you eat the apple")
    | advp_vp? inf_io_that_declarative_cl adjunct_list_io_that_declarative_cl_minus_adjp   {%nt("inf_vp_minus_adjp")%} # transitive verb with declarative content clause argument (ex: "I told you that you eat the apple")
    | advp_vp? inf_io_bare_declarative_cl adjunct_list_io_bare_declarative_cl_minus_adjp   {%nt("inf_vp_minus_adjp")%} # transitive verb with declarative content clause argument (ex: "I told you you eat the apple")
    | advp_vp? inf_io_exclamative_cl      adjunct_list_io_exclamative_cl_minus_adjp        {%nt("inf_vp_minus_adjp")%} # transitive verb with exclamative content clause argument (ex: "I told you how expensive it was")
    | advp_vp? inf_io_interrogative_cl    adjunct_list_io_interrogative_cl_minus_adjp      {%nt("inf_vp_minus_adjp")%} # transitive verb with interrogative clause argument (ex: "I asked you what you eat")
    | advp_vp? inf_io_do                  adjunct_list_io_do_minus_adjp                    {%nt("inf_vp_minus_adjp")%} # ditransitive verb (ex: "I gave you food")
    | advp_vp? inf_io_do                  adjunct_list_do_dative_to_minus_adjp             {%nt("inf_vp_minus_adjp")%} # ditransitive verb with dative shift (ex: "I gave food to you")

# [sang, danced,]
vbg_vp_minus_adjp_coordlist ->  vbg_vp_minus_adjp_coordlist_item:+ {%nonterminal_unpack("vbg_vp_minus_adjp_coordlist")%}
vbg_vp_minus_adjp_coordlist_item -> vbg_vp_minus_adjp comma {%nt("vbg_vp_minus_adjp_coordlist_item")%}

vbg_vp_minus_adjp ->
    # coordinations
      vbg_vp_minus_adjp_coordlist coordinator vbg_vp_minus_adjp {%nt("vbg_vp_minus_adjp")%} # coordination: "We [sang, danced, and laughed]"
    | vbg_vp_minus_adjp binary_coordinator vbg_vp_minus_adjp {%nt("vbg_vp_minus_adjp")%} # coordination: "We [sang and danced]"
    # terminal rules
    | advp_vp? vbg                        adjunct_list_minus_adjp                          {%nt("vbg_vp_minus_adjp")%} # intransitive verb (ex: "I smoked")
    | advp_vp? vbg_predcomp               adjunct_list_predcomp_minus_adjp                 {%nt("vbg_vp_minus_adjp")%} # intransitive verb with adjective phrase argument (ex: "You seemed happy")
    | advp_vp? vbg_to_inf_cl              adjunct_list_to_inf_cl_minus_adjp                {%nt("vbg_vp_minus_adjp")%} # intransitive verb with infinitive clause argument (ex: "I wanted to bring the book")
    | advp_vp? vbg_bare_inf_cl            adjunct_list_bare_inf_cl_minus_adjp              {%nt("vbg_vp_minus_adjp")%} # intransitive verb with bare infinitive clause argument (ex: "I helped clean")
    | advp_vp? vbg_that_declarative_cl    adjunct_list_that_declarative_cl_minus_adjp      {%nt("vbg_vp_minus_adjp")%} # intransitive verb with declarative content clause argument (ex: "I knew that you eat")
    | advp_vp? vbg_bare_declarative_cl    adjunct_list_bare_declarative_cl_minus_adjp      {%nt("vbg_vp_minus_adjp")%} # intransitive verb with declarative content clause argument (ex: "I knew you eat")
    | advp_vp? vbg_exclamative_cl         adjunct_list_exclamative_cl_minus_adjp           {%nt("vbg_vp_minus_adjp")%} # intransitive verb with exclamative content clause argument (ex: "I said how expensive it was.")
    | advp_vp? vbg_interrogative_cl       adjunct_list_interrogative_cl_minus_adjp         {%nt("vbg_vp_minus_adjp")%} # intransitive verb with interrogative clause argument (ex: "I knew what you eat")
    | advp_vp? vbg_vbg_cl                 vbg_cl_minus_adjp                                {%nt("vbg_vp_minus_adjp")%} # progressive aspect (ex: "We are eating") or intransitive verb with vbg argument ("we started eating")
    | advp_vp? vbg_vbn_cl                 vbn_cl_minus_adjp                                {%nt("vbg_vp_minus_adjp")%} # past perfect (ex: "He had eaten")
    | advp_vp? vbg_passive_cl             passive_cl_minus_adjp                            {%nt("vbg_vp_minus_adjp")%} # passive voice (ex: "He was eaten")
    | advp_vp? vbg_o                      adjunct_list_o_minus_adjp                        {%nt("vbg_vp_minus_adjp")%} # transitive verb (ex: "I ate the apple")
    | advp_vp? vbg_o_predcomp             adjunct_list_o_predcomp_minus_adjp               {%nt("vbg_vp_minus_adjp")%} # transitive verb with adjective phrase argument (ex: "I found you happy")
    | advp_vp? vbg_intnp_to_inf_cl        adjunct_list_intnp_to_inf_cl_minus_adjp          {%nt("vbg_vp_minus_adjp")%} # transitive verb with infinitive verb argument (ex: "I asked you to eat the apple")
    | advp_vp? vbg_intnp_bare_inf_cl      adjunct_list_intnp_bare_inf_cl_minus_adjp        {%nt("vbg_vp_minus_adjp")%} # transitive verb with bare infinitive verb argument (ex: "I made you eat the apple")
    | advp_vp? vbg_io_that_declarative_cl adjunct_list_io_that_declarative_cl_minus_adjp   {%nt("vbg_vp_minus_adjp")%} # transitive verb with declarative content clause argument (ex: "I told you that you eat the apple")
    | advp_vp? vbg_io_bare_declarative_cl adjunct_list_io_bare_declarative_cl_minus_adjp   {%nt("vbg_vp_minus_adjp")%} # transitive verb with declarative content clause argument (ex: "I told you you eat the apple")
    | advp_vp? vbg_io_exclamative_cl      adjunct_list_io_exclamative_cl_minus_adjp        {%nt("vbg_vp_minus_adjp")%} # transitive verb with exclamative content clause argument (ex: "I told you how expensive it was")
    | advp_vp? vbg_io_interrogative_cl    adjunct_list_io_interrogative_cl_minus_adjp      {%nt("vbg_vp_minus_adjp")%} # transitive verb with interrogative clause argument (ex: "I asked you what you eat")
    | advp_vp? vbg_io_do                  adjunct_list_io_do_minus_adjp                    {%nt("vbg_vp_minus_adjp")%} # ditransitive verb (ex: "I gave you food")
    | advp_vp? vbg_io_do                  adjunct_list_do_dative_to_minus_adjp             {%nt("vbg_vp_minus_adjp")%} # ditransitive verb with dative shift (ex: "I gave food to you")

# [sang, danced,]
vbn_vp_minus_adjp_coordlist ->  vbn_vp_minus_adjp_coordlist_item:+ {%nonterminal_unpack("vbn_vp_minus_adjp_coordlist")%}
vbn_vp_minus_adjp_coordlist_item -> vbn_vp_minus_adjp comma {%nt("vbn_vp_minus_adjp_coordlist_item")%}

vbn_vp_minus_adjp ->
    # coordinations
      vbn_vp_minus_adjp_coordlist coordinator vbn_vp_minus_adjp {%nt("vbn_vp_minus_adjp")%} # coordination: "We [sang, danced, and laughed]"
    | vbn_vp_minus_adjp binary_coordinator vbn_vp_minus_adjp {%nt("vbn_vp_minus_adjp")%} # coordination: "We [sang and danced]"
    # terminal rules
    | advp_vp? vbn                        adjunct_list_minus_adjp                          {%nt("vbn_vp_minus_adjp")%} # intransitive verb (ex: "I smoked")
    | advp_vp? vbn_predcomp               adjunct_list_predcomp_minus_adjp                 {%nt("vbn_vp_minus_adjp")%} # intransitive verb with adjective phrase argument (ex: "You seemed happy")
    | advp_vp? vbn_to_inf_cl              adjunct_list_to_inf_cl_minus_adjp                {%nt("vbn_vp_minus_adjp")%} # intransitive verb with infinitive clause argument (ex: "I wanted to bring the book")
    | advp_vp? vbn_bare_inf_cl            adjunct_list_bare_inf_cl_minus_adjp              {%nt("vbn_vp_minus_adjp")%} # intransitive verb with bare infinitive clause argument (ex: "I helped clean")
    | advp_vp? vbn_that_declarative_cl    adjunct_list_that_declarative_cl_minus_adjp      {%nt("vbn_vp_minus_adjp")%} # intransitive verb with declarative content clause argument (ex: "I knew that you eat")
    | advp_vp? vbn_bare_declarative_cl    adjunct_list_bare_declarative_cl_minus_adjp      {%nt("vbn_vp_minus_adjp")%} # intransitive verb with declarative content clause argument (ex: "I knew you eat")
    | advp_vp? vbn_exclamative_cl         adjunct_list_exclamative_cl_minus_adjp           {%nt("vbn_vp_minus_adjp")%} # intransitive verb with exclamative content clause argument (ex: "I said how expensive it was.")
    | advp_vp? vbn_interrogative_cl       adjunct_list_interrogative_cl_minus_adjp         {%nt("vbn_vp_minus_adjp")%} # intransitive verb with interrogative clause argument (ex: "I knew what you eat")
    | advp_vp? vbn_vbg_cl                 vbg_cl_minus_adjp                                {%nt("vbn_vp_minus_adjp")%} # progressive aspect (ex: "We are eating") or intransitive verb with vbg argument ("we started eating")
    | advp_vp? vbn_vbn_cl                 vbn_cl_minus_adjp                                {%nt("vbn_vp_minus_adjp")%} # past perfect (ex: "He had eaten")
    | advp_vp? vbn_passive_cl             passive_cl_minus_adjp                            {%nt("vbn_vp_minus_adjp")%} # passive voice (ex: "He was eaten")
    | advp_vp? vbn_o                      adjunct_list_o_minus_adjp                        {%nt("vbn_vp_minus_adjp")%} # transitive verb (ex: "I ate the apple")
    | advp_vp? vbn_o_predcomp             adjunct_list_o_predcomp_minus_adjp               {%nt("vbn_vp_minus_adjp")%} # transitive verb with adjective phrase argument (ex: "I found you happy")
    | advp_vp? vbn_intnp_to_inf_cl        adjunct_list_intnp_to_inf_cl_minus_adjp          {%nt("vbn_vp_minus_adjp")%} # transitive verb with infinitive verb argument (ex: "I asked you to eat the apple")
    | advp_vp? vbn_intnp_bare_inf_cl      adjunct_list_intnp_bare_inf_cl_minus_adjp        {%nt("vbn_vp_minus_adjp")%} # transitive verb with bare infinitive verb argument (ex: "I made you eat the apple")
    | advp_vp? vbn_io_that_declarative_cl adjunct_list_io_that_declarative_cl_minus_adjp   {%nt("vbn_vp_minus_adjp")%} # transitive verb with declarative content clause argument (ex: "I told you that you eat the apple")
    | advp_vp? vbn_io_bare_declarative_cl adjunct_list_io_bare_declarative_cl_minus_adjp   {%nt("vbn_vp_minus_adjp")%} # transitive verb with declarative content clause argument (ex: "I told you you eat the apple")
    | advp_vp? vbn_io_exclamative_cl      adjunct_list_io_exclamative_cl_minus_adjp        {%nt("vbn_vp_minus_adjp")%} # transitive verb with exclamative content clause argument (ex: "I told you how expensive it was")
    | advp_vp? vbn_io_interrogative_cl    adjunct_list_io_interrogative_cl_minus_adjp      {%nt("vbn_vp_minus_adjp")%} # transitive verb with interrogative clause argument (ex: "I asked you what you eat")
    | advp_vp? vbn_io_do                  adjunct_list_io_do_minus_adjp                    {%nt("vbn_vp_minus_adjp")%} # ditransitive verb (ex: "I gave you food")
    | advp_vp? vbn_io_do                  adjunct_list_do_dative_to_minus_adjp             {%nt("vbn_vp_minus_adjp")%} # ditransitive verb with dative shift (ex: "I gave food to you")

passive_cl_minus_adjp -> 
# omit all the intransitive verbs
# omit vbg_cl, as one cannot combine passive with progressive aspect *The food was been eaten
# omit vbn_cl, as one cannot combine passive with past perfect *The food was had eaten
# omit passive_cl, as one cannot combine passive with passive *The food was been eaten
      advp_vp? vbn_o                      adjunct_list_passive_o_minus_adjp                         {%nt("passive_cl_minus_adjp")%}
    | advp_vp? vbn_o_predcomp             adjunct_list_passive_o_predcomp_minus_adjp                {%nt("passive_cl_minus_adjp")%}
    | advp_vp? vbn_intnp_to_inf_cl        adjunct_list_passive_intnp_to_inf_cl_minus_adjp           {%nt("passive_cl_minus_adjp")%}
    | advp_vp? vbn_io_that_declarative_cl adjunct_list_passive_io_that_declarative_cl_minus_adjp    {%nt("passive_cl_minus_adjp")%}
    | advp_vp? vbn_io_bare_declarative_cl adjunct_list_passive_io_bare_declarative_cl_minus_adjp    {%nt("passive_cl_minus_adjp")%}
    | advp_vp? vbn_io_exclamative_cl      adjunct_list_passive_io_exclamative_cl_minus_adjp         {%nt("passive_cl_minus_adjp")%}
    | advp_vp? vbn_io_interrogative_cl    adjunct_list_passive_io_interrogative_cl_minus_adjp       {%nt("passive_cl_minus_adjp")%}
    | advp_vp? vbn_io_do                  adjunct_list_passive_io_do_minus_adjp                     {%nt("passive_cl_minus_adjp")%}
    | advp_vp? vbn_io_do                  adjunct_list_passive_do_dative_to_minus_adjp              {%nt("passive_cl_minus_adjp")%}


# infintive clauses
to_inf_cl -> to inf_vp                   {%nt("to_inf_cl")%}
to_inf_cl_minus_np -> to inf_vp_minus_np {%nt("to_inf_cl_minus_np")%}
to_inf_cl_minus_adjp -> to inf_vp_minus_adjp {%nt("to_inf_cl_minus_adjp")%}

bare_inf_cl -> inf_vp                     {%nt("bare_inf_cl")%}
bare_inf_cl_minus_np -> inf_vp_minus_np   {%nt("bare_inf_cl_minus_np")%}
bare_inf_cl_minus_adjp -> inf_vp_minus_adjp   {%nt("bare_inf_cl_minus_adjp")%}

# vbg clause (participle)
vbg_cl -> vbg_vp                           {%nt("vbg_cl")%}
vbg_cl_minus_np -> vbg_vp_minus_np         {%nt("vbg_cl_minus_np")%}
vbg_cl_minus_adjp -> vbg_vp_minus_adjp         {%nt("vbg_cl_minus_adjp")%}

# vbg clause (past participle)
vbn_cl -> vbn_vp                           {%nt("vbn_cl")%}
vbn_cl_minus_np -> vbn_vp_minus_np         {%nt("vbn_cl_minus_np")%}
vbn_cl_minus_adjp -> vbn_vp_minus_adjp         {%nt("vbn_cl_minus_adjp")%}

# a declarative content clause
that_declarative_cl ->  that bare_declarative_cl         {%nt("that_declarative_cl")%}
bare_declarative_cl ->  fin_cl                           {%nt("bare_declarative_cl")%}

# an exclamative content clause
exclamative_cl -> 
      ip_advp_vp     fin_cl                       {%nt("exclamative_cl")%} # how quickly mary became happy
# singular
    | ip_adjp        np_sg vbf_sg_vp_minus_adjp   {%nt("exclamative_cl")%} # how happy he became
# plural
    | ip_adjp        np_pl vbf_pl_vp_minus_adjp   {%nt("exclamative_cl")%} # how happy they became

# an interrogative content clause
interrogative_cl -> 
# yes no qs (singular)
      interrogative_subordinator np_sg vbf_sg_vp              {%nt("interrogative_cl")%} # closed interrogative clause (ex: "whether he eats the apple")
# yes no qs (plural)
    | interrogative_subordinator np_pl vbf_pl_vp              {%nt("interrogative_cl")%} # closed interrogative clause (ex: "whether they eat the apple")
# interrogative phrase replaces np (singular subject)
    | ip_np_sg                        vbf_sg_vp               {%nt("interrogative_cl")%} # i know who eats that
# interrogative phrase replaces np (plural subject)
    | ip_np_pl                        vbf_pl_vp               {%nt("interrogative_cl")%} # i know which people eat that
# interrogative phrase replaces object np (singular subject)
    | ip_np                        np_sg vbf_sg_vp_minus_np   {%nt("interrogative_cl")%} # i know what he ate
# interrogative phrase replaces object np (plural subject)
    | ip_np                        np_pl vbf_pl_vp_minus_np   {%nt("interrogative_cl")%} # i know what they ate
# interrogative phrase replaces adjunct of time, place, or reason (singular subject)
    | ip_pp                        np_sg vbf_sg_vp            {%nt("interrogative_cl")%} # open interrogative clause (ex: "where he goes")
# interrogative phrase replaces adjunct of time, place, or reason (plural subject)
    | ip_pp                        np_pl vbf_pl_vp            {%nt("interrogative_cl")%} # open interrogative clause (ex: "where they go")

# fused relative clause (singular)
# TODO: note that `who` is usually not preferred in fused relative clauses, it should be `whoever` instead
# *who killed bob is evil -> whoever killed bob is evil
# TODO: also note that you can often use "else" after the ip_np, which you cannot in interrogative clauses
fused_relative_clause_sg -> 
      ip_np_sg                        vbf_sg_vp               {%nt("fused_relative_clause_sg")%} # whoever kills him
    | ip_np_sg                        np_sg vbf_sg_vp_minus_np   {%nt("fused_relative_clause_sg")%} # what he was mailed
    | ip_np_sg                        np_pl vbf_pl_vp_minus_np   {%nt("fused_relative_clause_sg")%} # what they were mailed

# fused relative clause (plural)
fused_relative_clause_pl -> 
      ip_np_pl                        vbf_pl_vp               {%nt("fused_relative_clause_pl")%} # whatever things happen
    | ip_np_pl                        np_sg vbf_sg_vp_minus_np   {%nt("fused_relative_clause_pl")%} # whatever things he was mailed
    | ip_np_pl                        np_pl vbf_pl_vp_minus_np   {%nt("fused_relative_clause_pl")%} # whatever things they were mailed

# a dative to
dative_to -> to np {%nt("dative_to")%}
dative_to_minus_np -> to np_minus_np {%nt("dative_to_minus_np")%}
dative_to_minus_adjp -> to np_minus_adjp {%nt("dative_to_minus_adjp")%}

ip_advp_vp -> how advp_vp {%nt("ip_advp_vp")%}
            | how         {%nt("ip_advp_vp")%}
ip_adjp ->  how adjp      {%nt("ip_advp_vp")%}
            | how         {%nt("ip_advp_vp")%}

# a content clause with some np moved
bare_declarative_cl_minus_np ->
# subject np extracted (singular or plural)
      vbf_sg_vp                    {%nt("bare_declarative_cl_minus_np")%}  # [who] eats apples
    | vbf_pl_vp                    {%nt("bare_declarative_cl_minus_np")%}  # [which people] eat apples
# object np extracted (singular subject)
    | np_sg vbf_sg_vp_minus_np     {%nt("bare_declarative_cl_minus_np")%}  # [what] he eats
# object np extracted (plural subject)
    | np_pl vbf_pl_vp_minus_np     {%nt("bare_declarative_cl_minus_np")%}  # [what] they eat


that_declarative_cl_minus_np -> that bare_declarative_cl_minus_np {%nt("that_declarative_cl_minus_np")%}

# a content clause with some adjp moved
bare_declarative_cl_minus_adjp ->
# singular subject
      np_sg vbf_sg_vp_minus_adjp   {%nt("bare_declarative_cl_minus_adjp")%}  # [how happy] he became
    | np_sg vbf_sg_vp              {%nt("bare_declarative_cl_minus_adjp")%}  # [how quickly] he ran
# plural subject
    | np_pl vbf_pl_vp_minus_adjp   {%nt("bare_declarative_cl_minus_adjp")%}  # [how happy] they became
    | np_pl vbf_pl_vp              {%nt("bare_declarative_cl_minus_adjp")%}  # [how quickly] they ran

# a content clause with some adjp moved
that_declarative_cl_minus_adjp -> that bare_declarative_cl_minus_adjp {%nt("that_declarative_cl_minus_adjp")%}

# interrogative phrase replacing a singular np
# [who] is your friend?
# [what] is your name?
# [which book] is yours?
ip_np_sg -> 
# pronoun equivalent (only singular)
      who                                      {%nt("ip_np_sg")%}
    | what                                     {%nt("ip_np_sg")%}
    | which                                    {%nt("ip_np_sg")%}
# determiner + singular noun
    | ip_det adjp_list noun_sg n_modifier_list_sg {%nt("ip_np_sg")%}

# interrogative phrase replacing a plural np
# [which books] are yours?
# note that the pronouns who, what, and which are grammatically singular.
ip_np_pl -> 
# determiner + plural noun
      ip_det adjp_list noun_pl n_modifier_list_pl {%nt("ip_np_pl")%}

# generic ip_np for contexts where number doesn't matter (e.g., extracted object)
# I know [what] you eat
ip_np -> ip_np_sg {%nt("ip_np")%}
       | ip_np_pl {%nt("ip_np")%}

ip_det -> which  {%nt("ip_det")%}
        | whose  {%nt("ip_det")%}

# noun phrase (either singular or plural)
np -> np_sg {%nt("np")%}
    | np_pl {%nt("np")%}


# core noun phrase (either singular or plural)
core_np -> core_np_sg {%nt("core_np")%}
    | core_np_pl {%nt("core_np")%}

# singular noun phrase
np_sg -> precorenp_modifier? core_np_sg postcorenp_modifier? {%nt("np_sg")%}

# plural noun phrase
np_pl -> precorenp_modifier? core_np_pl postcorenp_modifier? {%nt("np_pl")%}

# a noun phrase with another noun phrase moved out
# Ex: I know which country she serves as [prime minister of]
np_minus_np -> precorenp_modifier? core_np_sg_minus_np postcorenp_modifier? {%nt("np_minus_np")%}
             | precorenp_modifier? core_np_pl_minus_np postcorenp_modifier? {%nt("np_minus_np")%}
             | null           {%nt("np_minus_np")%}

# a noun phrase with an adjective moved out
# TODO: currently we don't model the effects of the missing adjective, but we should
np_minus_adjp -> np {%nt("np_minus_adjp")%}

precorenp_modifier? -> precorenp_modifier {%nt("precorenp_modifier?")%}
                     | null               {%nt("precorenp_modifier?")%}

postcorenp_modifier? -> postcorenp_modifier {%nt("postcorenp_modifier?")%}
                      | null                {%nt("postcorenp_modifier?")%}

core_np_sg_coordlist -> core_np_sg_coordlist_item:+ {%nonterminal_unpack("core_np_sg_coordlist")%}
core_np_sg_coordlist_item -> core_np_sg comma {%nt("core_np_sg_coordlist_item")%}

# a core singular noun phrase without peripheral modifiers
core_np_sg -> 
# coordinations
      core_np_sg_coordlist coordinator core_np_sg {%nt("core_np_sg")%} # coordination: "Either [John, Mary, or Peter] is here."
    | core_np_sg binary_coordinator core_np_sg {%nt("core_np_sg")%} # coordination: "Either [John or Mary] is here."
# terminal rules
    |                                               proper_noun_sg                                  {%nt("core_np_sg")%}  # a singular proper noun (ex: "John", "Mary")
    |                                               pronoun_sg                                      {%nt("core_np_sg")%}  # a singular pronoun (ex: "he", "she", "it")
    |                                               independent_genitive_pronoun                    {%nt("core_np_sg")%}  # a possessive pronoun (ex: "mine", "yours")
    | predeterminer_modifier? determiner? adjp_list noun_sg                      n_modifier_list_sg {%nt("core_np_sg")%}  # determiner phrase followed by a singular nominal (ex: "the lovely apple")
    |                                               fused_relative_clause_sg                        {%nt("core_np_sg")%}  # a singular fused relative clause (ex: "what i was mailed")

core_np_pl_coordlist -> core_np_pl_coordlist_item:+ {%nonterminal_unpack("core_np_pl_coordlist")%}
core_np_pl_coordlist_item -> core_np comma {%nt("core_np_pl_coordlist_item")%}

# a core plural noun phrase without peripheral modifiers
# note that core_np_pl can consist of many singular noun phrases: "Bob, Alice and Carol are here."
core_np_pl -> 
# coordinations
      core_np_pl_coordlist coordinator core_np {%nt("core_np_pl")%} # coordination: "Bob, Alice and Carol are here."
    | core_np binary_coordinator core_np {%nt("core_np_pl")%} # coordination: "Bob and Alice are here."
# terminal rules
    |                                               proper_noun_pl                                  {%nt("core_np_pl")%}  # a plural proper noun (ex: "the Smiths")
    |                                               pronoun_pl                                      {%nt("core_np_pl")%}  # a plural pronoun (ex: "we", "they")
    |                                               independent_genitive_pronoun                    {%nt("core_np_pl")%}  # a possessive pronoun (ex: "mine", "yours")
    | predeterminer_modifier? determiner? adjp_list noun_pl                      n_modifier_list_pl {%nt("core_np_pl")%}  # determiner phrase followed by a plural nominal (ex: "the lovely apples")
    |                                               fused_relative_clause_pl                        {%nt("core_np_pl")%}  # a plural fused relative clause (ex: "whatever things happen")

# I know which country she serves as [prime minister of]
core_np_sg_minus_np -> 
      predeterminer_modifier? determiner? adjp_list noun_sg                      n_modifier_list_minus_np {%nt("core_np_sg_minus_np")%}

core_np_pl_minus_np -> 
      predeterminer_modifier? determiner? adjp_list noun_pl                      n_modifier_list_minus_np {%nt("core_np_pl_minus_np")%}

number -> digits | cardinal_number_eng {%nt("number")%}

quantificational_expression -> quantificational_modifier                        {%nt("quantificational_expression")%}
                             | number                     fraction_denominator  {%nt("quantificational_expression")%}
                             | number                     times                 {%nt("quantificational_expression")%}

precore_emphatic_expression -> precore_emphatic_modifier         {%nt("precore_emphatic_modifier")%} # such a disaster 
                             | precore_emphatic_modifier_adjp  adjp  {%nt("precore_emphatic_modifier")%} # too risky a venture

predeterminer_modifier? -> null                        {%nt("predeterminer_modifier")%}
                        | quantificational_expression  {%nt("predeterminer_modifier")%}
                        | precore_emphatic_expression  {%nt("predeterminer_modifier")%}

# the lawyer [who] defended her
# the dog [which] bit him
# the dog [that] bit him
relative_ip_np_subj -> 
    who     {%nt("relative_ip_np_subj")%}
  | which   {%nt("relative_ip_np_subj")%}
  | that    {%nt("relative_ip_np_subj")%}

# a person [who] she met
# a key [which] she found
# a key [that] she found
# a key [] she found
# a problem [the answer to which] she found online
relative_ip_np_obj ->
    null   {%nt("relative_ip_np_")%}
  | that   {%nt("relative_ip_np_")%}
  | ip_np  {%nt("relative_ip_np_")%}

# restrictive clause (singular) - the head noun is singular, so when the relative pronoun is subject, verb is singular
# ex: "box that is on the table"
restrictive_cl_sg -> 
      relative_ip_np_subj        vbf_sg_vp              {%nt("restrictive_cl_sg")%}  # box [that is on the table]
    | relative_ip_np_obj   np_sg vbf_sg_vp_minus_np    {%nt("restrictive_cl_sg")%}  # box [that he put on the table]
    | relative_ip_np_obj   np_pl vbf_pl_vp_minus_np    {%nt("restrictive_cl_sg")%}  # box [that they put on the table]

# restrictive clause (plural) - the head noun is plural, so when the relative pronoun is subject, verb is plural
# ex: "boxes that are on the table"
restrictive_cl_pl -> 
      relative_ip_np_subj        vbf_pl_vp              {%nt("restrictive_cl_pl")%}  # boxes [that are on the table]
    | relative_ip_np_obj   np_sg vbf_sg_vp_minus_np    {%nt("restrictive_cl_pl")%}  # boxes [that he put on the table]
    | relative_ip_np_obj   np_pl vbf_pl_vp_minus_np    {%nt("restrictive_cl_pl")%}  # boxes [that they put on the table]
  
# a specifier coming after a singular noun
n_modifier_sg -> restrictive_cl_sg     {%nt("n_modifier_sg")%} # a relative clause specifying the noun (ex: box that is on the table)
               | pp                    {%nt("n_modifier_sg")%} # a prepositional phrase specifying the noun (ex: "the book on the table")
               | passive_cl            {%nt("n_modifier_sg")%} # a reduced object relative passive clause (ex: "the horse raced past the barn")

# a specifier coming after a plural noun
n_modifier_pl -> restrictive_cl_pl     {%nt("n_modifier_pl")%} # a relative clause specifying the noun (ex: boxes that are on the table)
               | pp                    {%nt("n_modifier_pl")%} # a prepositional phrase specifying the noun (ex: "the books on the table")
               | passive_cl            {%nt("n_modifier_pl")%} # a reduced object relative passive clause (ex: "the horses raced past the barn")

n_modifier_list_sg -> n_modifier_sg:* {%nonterminal_unpack("n_modifier_list_sg")%}
n_modifier_list_pl -> n_modifier_pl:* {%nonterminal_unpack("n_modifier_list_pl")%}


# I know which country she serves as prime minister [of]
# TODO: there are more cases to consider here.
n_modifier_list_minus_np -> pp_minus_np {%nonterminal_unpack("n_modifier_list_minus_np")%}

# a determiner phrase suitable for countable nouns only
determiner? -> null                 {%nt("determiner")%} # null determiner
             | dp                   {%nt("determiner")%} # the, a, an, some, this, that
             | genitive_np          {%nt("determiner")%} # a noun phrase followed by a possessive suffix (ex: "John's")

genitive_np -> np s                         {%nt("genitive_np")%}
             | dependent_genitive_pronoun   {%nt("genitive_np")%}

dp_modifier? -> null         {%nt("dp_modifier?")%}
              | dp_modifier  {%nt("dp_modifier?")%}

dp -> dp_modifier? core_dp {%nt("dp")%}

core_dp -> determinative {%nt("core_dp")%}
         | number        {%nt("core_dp")%}

adjunct_coordlist -> adjunct_coordlist_item:+ {%nonterminal_unpack("adjunct_coordlist")%}
adjunct_coordlist_item -> adjunct comma {%nt("adjunct_coordlist_item")%}

adjunct -> 
# coordinations
      adjunct_coordlist coordinator adjunct {%nt("adjunct")%}
    | adjunct binary_coordinator adjunct {%nt("adjunct")%}
# terminal rules
    | pp             {%nt("adjunct")%} # a prepositional phrase adjunct (ex: "in the house")
    | advp_vp        {%nt("adjunct")%} # an adverb phrase adjunct compatible with verb use (ex: "quickly")

adjunct_minus_np ->
      pp_minus_np   {%nt("adjunct")%}

adjunct_minus_adjp ->
      null    {%nt("adjunct_minus_adjp")%}

# interrogative phrase replacing a pp
ip_pp -> where                {%nt("ip_pp")%}   
       | when                 {%nt("ip_pp")%} 
       | why                  {%nt("ip_pp")%}
       | preposition_np ip_np {%nt("ip_pp")%} 

# a prepositional phrase
pp -> preposition                                         {%nt("pp")%}
    | preposition_np                  np                  {%nt("pp")%}
    | preposition_predcomp            predcomp            {%nt("pp")%}
    | preposition_advp                advp                {%nt("pp")%}
    | preposition_bare_declarative_cl bare_declarative_cl {%nt("pp")%}

# a prepositional phrase with np moved
# NOTE: you cannot move out of prepositional clauses: https://en.wikipedia.org/wiki/Wh-movement#Extraction_islands
pp_minus_np ->      preposition_np             {%nt("pp_minus_np")%}

# a predcomp
predcomp_coordlist -> predcomp_coordlist_item:+ {%nonterminal_unpack("predcomp_coordlist")%}
predcomp_coordlist_item -> predcomp comma {%nt("predcomp_coordlist_item")%}

predcomp -> 
# coordinations
      predcomp coordinator predcomp {%nt("predcomp")%}
    | predcomp_coordlist binary_coordinator predcomp {%nt("predcomp")%}
# terminal rules
    | adjp {%nt("predcomp")%} # an adjective phrase (ex: "happy")

predcomp_minus_np -> adjp_minus_np {%nt("predcomp_minus_np")%}

predcomp_minus_adjp -> null {%nt("predcomp_minus_adjp")%}

# an adjective phrase
adjp ->
      advp                  adjp              {%nt("adjp")%} # an adverb phrase followed by an adjective phrase (ex: "very happy") 
    | adj                                   {%nt("adjp")%} # an adjective (ex: "happy")
    | adj_pp                pp              {%nt("adjp")%} # an adjective with a prepositional phrase argument (ex: "fond of music")
    | adj_bare_declarative_cl    bare_declarative_cl  {%nt("adjp")%} # an adjective with a declarative content clause argument (ex: "happy that you are here")
    | adj_that_declarative_cl    that_declarative_cl  {%nt("adjp")%} # an adjective with a declarative content clause argument (ex: "happy you are here")
    | adj_to_inf_cl         to_inf_cl       {%nt("adjp")%} # an adjective with an infinitive clause argument (ex: "happy to be here")

adjp_minus_np ->                                     
      advp                    adjp_minus_np                   {%nt("adjp_minus_np")%}
    | adj_pp                  preposition                     {%nt("adjp_minus_np")%}
    | adj_that_declarative_cl that_declarative_cl_minus_np    {%nt("adjp_minus_np")%}
    | adj_bare_declarative_cl bare_declarative_cl_minus_np    {%nt("adjp_minus_np")%}
    | adj_to_inf_cl           to_inf_cl_minus_np              {%nt("adjp_minus_np")%}

# a sequence of adjps
adjp_list -> adjp:* {%nonterminal_unpack("adjp_list")%}

# an adverb phrase (not necessarily able to modify a vp)
advp -> adv             {%nt("advp")%} # an adverb (ex: "very")
      | adv advp        {%nt("advp")%} # an adverb phrase preceeded by another adverb phrase (ex: "very quickly")

# an adverb phrase able to modify a vp 
advp_vp -> adv_vp             {%nt("advp_vp")%} # an adverb (ex: "quickly")
         | adv advp_vp        {%nt("advp_vp")%} # an adverb phrase preceeded by another adverb phrase (ex: "very quickly")

advp_vp? -> advp_vp {%nt("advp_vp?")%}
          | null    {%nt("advp_vp?")%}

advp? -> advp       {%nt("advp?")%}
       | null       {%nt("advp?")%}

not? -> not         {%nt("not?")%}
      | null        {%nt("not?")%}

# terminals

# a rule that always rejects (for impossible cases)
impossible -> "<<impossible>>" {%t("impossible")%}

determinative -> %determinative {%t("determinative")%}
dp_modifier -> %dp_modifier {%t("dp_modifier")%}
pronoun_sg -> %pronoun_sg {%t("pronoun_sg")%}
pronoun_pl -> %pronoun_pl {%t("pronoun_pl")%}
dependent_genitive_pronoun -> %dependent_genitive_pronoun {%t("dependent_genitive_pronoun")%}
independent_genitive_pronoun -> %independent_genitive_pronoun {%t("independent_genitive_pronoun")%}
proper_noun_sg -> %proper_noun_sg {%t("proper_noun_sg")%}
proper_noun_pl -> %proper_noun_pl {%t("proper_noun_pl")%}
noun_sg -> %noun_sg {%t("noun_sg")%}
noun_pl -> %noun_pl {%t("noun_pl")%}
preposition -> %preposition {%t("preposition")%}
preposition_np -> %preposition_np {%t("preposition_np")%}
preposition_predcomp -> %preposition_predcomp {%t("preposition_predcomp")%}
preposition_pp ->  %preposition_pp {%t("preposition_pp")%}
preposition_advp ->  %preposition_advp {%t("preposition_advp")%}
preposition_bare_declarative_cl -> %preposition_bare_declarative_cl {%t("preposition_bare_declarative_cl")%}
to -> %to {%t("to")%}
s -> %s {%t("s")%}
not -> %not {%t("not")%}
that -> %that {%t("that")%}
interrogative_subordinator -> %interrogative_subordinator {%t("interrogative_subordinator")%}
times -> %times {%t("times")%}
cardinal_number_eng -> %cardinal_number_eng {%t("cardinal_number_eng")%}
digits -> %digits {%t("digits")%}
fraction_denominator -> %fraction_denominator {%t("fraction_denominator")%}
modal -> %modal {%t("modal")%}

inf -> %inf {%t("inf")%}
inf_predcomp -> %inf_predcomp {%t("inf_predcomp")%}
inf_to_inf_cl -> %inf_to_inf_cl {%t("inf_to_inf_cl")%}
inf_bare_inf_cl -> %inf_bare_inf_cl {%t("inf_bare_inf_cl")%}
inf_that_declarative_cl -> %inf_that_declarative_cl {%t("inf_that_declarative_cl")%}
inf_bare_declarative_cl -> %inf_bare_declarative_cl {%t("inf_bare_declarative_cl")%}
inf_exclamative_cl -> %inf_exclamative_cl {%t("inf_exclamative_cl")%}
inf_interrogative_cl -> %inf_interrogative_cl {%t("inf_interrogative_cl")%}
inf_vbg_cl -> %inf_vbg_cl {%t("inf_vbg_cl")%}
inf_vbn_cl -> %inf_vbn_cl {%t("inf_vbn_cl")%}
inf_passive_cl -> %inf_passive_cl {%t("inf_passive_cl")%}
inf_o -> %inf_o {%t("inf_o")%}
inf_o_predcomp -> %inf_o_predcomp {%t("inf_o_predcomp")%}
inf_intnp_to_inf_cl -> %inf_intnp_to_inf_cl {%t("inf_intnp_to_inf_cl")%}
inf_intnp_bare_inf_cl -> %inf_intnp_bare_inf_cl {%t("inf_intnp_bare_inf_cl")%}
inf_io_that_declarative_cl -> %inf_io_that_declarative_cl {%t("inf_io_that_declarative_cl")%}
inf_io_bare_declarative_cl -> %inf_io_bare_declarative_cl {%t("inf_io_bare_declarative_cl")%}
inf_io_exclamative_cl -> %inf_io_exclamative_cl {%t("inf_io_exclamative_cl")%}
inf_io_interrogative_cl -> %inf_io_interrogative_cl {%t("inf_io_interrogative_cl")%}
inf_io_do -> %inf_io_do {%t("inf_io_do")%}

vbg -> %vbg {%t("vbg")%}
vbg_predcomp -> %vbg_predcomp {%t("vbg_predcomp")%}
vbg_to_inf_cl -> %vbg_to_inf_cl {%t("vbg_to_inf_cl")%}
vbg_bare_inf_cl -> %vbg_bare_inf_cl {%t("vbg_bare_inf_cl")%}
vbg_that_declarative_cl -> %vbg_that_declarative_cl {%t("vbg_that_declarative_cl")%}
vbg_bare_declarative_cl -> %vbg_bare_declarative_cl {%t("vbg_bare_declarative_cl")%}
vbg_exclamative_cl -> %vbg_exclamative_cl {%t("vbg_exclamative_cl")%}
vbg_interrogative_cl -> %vbg_interrogative_cl {%t("vbg_interrogative_cl")%}
vbg_vbg_cl -> %vbg_vbg_cl {%t("vbg_vbg_cl")%}
vbg_vbn_cl -> %vbg_vbn_cl {%t("vbg_vbn_cl")%}
vbg_passive_cl -> %vbg_passive_cl {%t("vbg_passive_cl")%}
vbg_o -> %vbg_o {%t("vbg_o")%}
vbg_o_predcomp -> %vbg_o_predcomp {%t("vbg_o_predcomp")%}
vbg_intnp_to_inf_cl -> %vbg_intnp_to_inf_cl {%t("vbg_intnp_to_inf_cl")%}
vbg_intnp_bare_inf_cl -> %vbg_intnp_bare_inf_cl {%t("vbg_intnp_bare_inf_cl")%}
vbg_io_that_declarative_cl -> %vbg_io_that_declarative_cl {%t("vbg_io_that_declarative_cl")%}
vbg_io_bare_declarative_cl -> %vbg_io_bare_declarative_cl {%t("vbg_io_bare_declarative_cl")%}
vbg_io_exclamative_cl -> %vbg_io_exclamative_cl {%t("vbg_io_exclamative_cl")%}
vbg_io_interrogative_cl -> %vbg_io_interrogative_cl {%t("vbg_io_interrogative_cl")%}
vbg_io_do -> %vbg_io_do {%t("vbg_io_do")%}

vbn -> %vbn {%t("vbn")%}
vbn_predcomp -> %vbn_predcomp {%t("vbn_predcomp")%}
vbn_to_inf_cl -> %vbn_to_inf_cl {%t("vbn_to_inf_cl")%}
vbn_bare_inf_cl -> %vbn_bare_inf_cl {%t("vbn_bare_inf_cl")%}
vbn_that_declarative_cl -> %vbn_that_declarative_cl {%t("vbn_that_declarative_cl")%}
vbn_bare_declarative_cl -> %vbn_bare_declarative_cl {%t("vbn_bare_declarative_cl")%}
vbn_exclamative_cl -> %vbn_exclamative_cl {%t("vbn_exclamative_cl")%}
vbn_interrogative_cl -> %vbn_interrogative_cl {%t("vbn_interrogative_cl")%}
vbn_vbg_cl -> %vbn_vbg_cl {%t("vbn_vbg_cl")%}
vbn_vbn_cl -> %vbn_vbn_cl {%t("vbn_vbn_cl")%}
vbn_passive_cl -> %vbn_passive_cl {%t("vbn_passive_cl")%}
vbn_o -> %vbn_o {%t("vbn_o")%}
vbn_o_predcomp -> %vbn_o_predcomp {%t("vbn_o_predcomp")%}
vbn_intnp_to_inf_cl -> %vbn_intnp_to_inf_cl {%t("vbn_intnp_to_inf_cl")%}
vbn_intnp_bare_inf_cl -> %vbn_intnp_bare_inf_cl {%t("vbn_intnp_bare_inf_cl")%}
vbn_io_that_declarative_cl -> %vbn_io_that_declarative_cl {%t("vbn_io_that_declarative_cl")%}
vbn_io_bare_declarative_cl -> %vbn_io_bare_declarative_cl {%t("vbn_io_bare_declarative_cl")%}
vbn_io_exclamative_cl -> %vbn_io_exclamative_cl {%t("vbn_io_exclamative_cl")%}
vbn_io_interrogative_cl -> %vbn_io_interrogative_cl {%t("vbn_io_interrogative_cl")%}
vbn_io_do -> %vbn_io_do {%t("vbn_io_do")%}

vbf_sg -> %vbf_sg {%t("vbf_sg")%}
vbf_sg_predcomp -> %vbf_sg_predcomp {%t("vbf_sg_predcomp")%}
vbf_sg_to_inf_cl -> %vbf_sg_to_inf_cl {%t("vbf_sg_to_inf_cl")%}
vbf_sg_bare_inf_cl -> %vbf_sg_bare_inf_cl {%t("vbf_sg_bare_inf_cl")%}
vbf_sg_that_declarative_cl -> %vbf_sg_that_declarative_cl {%t("vbf_sg_that_declarative_cl")%}
vbf_sg_bare_declarative_cl -> %vbf_sg_bare_declarative_cl {%t("vbf_sg_bare_declarative_cl")%}
vbf_sg_exclamative_cl -> %vbf_sg_exclamative_cl {%t("vbf_sg_exclamative_cl")%}
vbf_sg_interrogative_cl -> %vbf_sg_interrogative_cl {%t("vbf_sg_interrogative_cl")%}
vbf_sg_vbg_cl -> %vbf_sg_vbg_cl {%t("vbf_sg_vbg_cl")%}
vbf_sg_vbn_cl -> %vbf_sg_vbn_cl {%t("vbf_sg_vbn_cl")%}
vbf_sg_passive_cl -> %vbf_sg_passive_cl {%t("vbf_sg_passive_cl")%}
vbf_sg_o -> %vbf_sg_o {%t("vbf_sg_o")%}
vbf_sg_o_predcomp -> %vbf_sg_o_predcomp {%t("vbf_sg_o_predcomp")%}
vbf_sg_intnp_to_inf_cl -> %vbf_sg_intnp_to_inf_cl {%t("vbf_sg_intnp_to_inf_cl")%}
vbf_sg_intnp_bare_inf_cl -> %vbf_sg_intnp_bare_inf_cl {%t("vbf_sg_intnp_bare_inf_cl")%}
vbf_sg_io_that_declarative_cl -> %vbf_sg_io_that_declarative_cl {%t("vbf_sg_io_that_declarative_cl")%}
vbf_sg_io_bare_declarative_cl -> %vbf_sg_io_bare_declarative_cl {%t("vbf_sg_io_bare_declarative_cl")%}
vbf_sg_io_exclamative_cl -> %vbf_sg_io_exclamative_cl {%t("vbf_sg_io_exclamative_cl")%}
vbf_sg_io_interrogative_cl -> %vbf_sg_io_interrogative_cl {%t("vbf_sg_io_interrogative_cl")%}
vbf_sg_io_do -> %vbf_sg_io_do {%t("vbf_sg_io_do")%}

vbf_pl -> %vbf_pl {%t("vbf_pl")%}
vbf_pl_predcomp -> %vbf_pl_predcomp {%t("vbf_pl_predcomp")%}
vbf_pl_to_inf_cl -> %vbf_pl_to_inf_cl {%t("vbf_pl_to_inf_cl")%}
vbf_pl_bare_inf_cl -> %vbf_pl_bare_inf_cl {%t("vbf_pl_bare_inf_cl")%}
vbf_pl_that_declarative_cl -> %vbf_pl_that_declarative_cl {%t("vbf_pl_that_declarative_cl")%}
vbf_pl_bare_declarative_cl -> %vbf_pl_bare_declarative_cl {%t("vbf_pl_bare_declarative_cl")%}
vbf_pl_exclamative_cl -> %vbf_pl_exclamative_cl {%t("vbf_pl_exclamative_cl")%}
vbf_pl_interrogative_cl -> %vbf_pl_interrogative_cl {%t("vbf_pl_interrogative_cl")%}
vbf_pl_vbg_cl -> %vbf_pl_vbg_cl {%t("vbf_pl_vbg_cl")%}
vbf_pl_vbn_cl -> %vbf_pl_vbn_cl {%t("vbf_pl_vbn_cl")%}
vbf_pl_passive_cl -> %vbf_pl_passive_cl {%t("vbf_pl_passive_cl")%}
vbf_pl_o -> %vbf_pl_o {%t("vbf_pl_o")%}
vbf_pl_o_predcomp -> %vbf_pl_o_predcomp {%t("vbf_pl_o_predcomp")%}
vbf_pl_intnp_to_inf_cl -> %vbf_pl_intnp_to_inf_cl {%t("vbf_pl_intnp_to_inf_cl")%}
vbf_pl_intnp_bare_inf_cl -> %vbf_pl_intnp_bare_inf_cl {%t("vbf_pl_intnp_bare_inf_cl")%}
vbf_pl_io_that_declarative_cl -> %vbf_pl_io_that_declarative_cl {%t("vbf_pl_io_that_declarative_cl")%}
vbf_pl_io_bare_declarative_cl -> %vbf_pl_io_bare_declarative_cl {%t("vbf_pl_io_bare_declarative_cl")%}
vbf_pl_io_exclamative_cl -> %vbf_pl_io_exclamative_cl {%t("vbf_pl_io_exclamative_cl")%}
vbf_pl_io_interrogative_cl -> %vbf_pl_io_interrogative_cl {%t("vbf_pl_io_interrogative_cl")%}
vbf_pl_io_do -> %vbf_pl_io_do {%t("vbf_pl_io_do")%}

aux_vbf_sg_predcomp -> %aux_vbf_sg_predcomp {%t("aux_vbf_sg_predcomp")%}
aux_vbf_sg_o -> %aux_vbf_sg_o {%t("aux_vbf_sg_o")%}
aux_vbf_sg_vbg_cl -> %aux_vbf_sg_vbg_cl {%t("aux_vbf_sg_vbg_cl")%}
aux_vbf_sg_vbn_cl -> %aux_vbf_sg_vbn_cl {%t("aux_vbf_sg_vbn_cl")%}
aux_vbf_sg_passive_cl -> %aux_vbf_sg_passive_cl {%t("aux_vbf_sg_passive_cl")%}
aux_vbf_sg_bare_inf_cl -> %aux_vbf_sg_bare_inf_cl {%t("aux_vbf_sg_bare_inf_cl")%}

aux_vbf_pl_predcomp -> %aux_vbf_pl_predcomp {%t("aux_vbf_pl_predcomp")%}
aux_vbf_pl_o -> %aux_vbf_pl_o {%t("aux_vbf_pl_o")%}
aux_vbf_pl_vbg_cl -> %aux_vbf_pl_vbg_cl {%t("aux_vbf_pl_vbg_cl")%}
aux_vbf_pl_vbn_cl -> %aux_vbf_pl_vbn_cl {%t("aux_vbf_pl_vbn_cl")%}
aux_vbf_pl_passive_cl -> %aux_vbf_pl_passive_cl {%t("aux_vbf_pl_passive_cl")%}
aux_vbf_pl_bare_inf_cl -> %aux_vbf_pl_bare_inf_cl {%t("aux_vbf_pl_bare_inf_cl")%}

adj -> %adj {%t("adj")%}
adj_pp -> %adj_pp {%t("adj_pp")%}
adj_that_declarative_cl -> %adj_that_declarative_cl {%t("adj_that_declarative_cl")%}
adj_bare_declarative_cl -> %adj_bare_declarative_cl {%t("adj_bare_declarative_cl")%}
adj_to_inf_cl -> %adj_to_inf_cl {%t("adj_to_inf_cl")%}
adv -> %adv {%t("adv")%}
adv_vp -> %adv_vp {%t("adv_vp")%}
who -> %who {%t("who")%}
whose -> %whose {%t("whose")%}
what -> %what {%t("what")%}
which -> %which {%t("which")%}
where -> %where {%t("where")%}
when -> %when {%t("when")%}
why -> %why {%t("why")%}
how -> %how {%t("how")%}
precorenp_modifier -> %precorenp_modifier {%t("precorenp_modifier")%}
postcorenp_modifier -> %postcorenp_modifier {%t("postcorenp_modifier")%}
precore_emphatic_modifier -> %precore_emphatic_modifier {%t("precore_emphatic_modifier")%}
precore_emphatic_modifier_adjp  -> %precore_emphatic_modifier_adjp  {%t("precore_emphatic_modifier_adjp ")%}
quantificational_modifier -> %quantificational_modifier {%t("quantificational_modifier")%}
coordinator -> %coordinator {%t("coordinator")%}
binary_coordinator -> %binary_coordinator {%t("binary_coordinator")%}
period -> %period {%t("period")%}
question_mark -> %question_mark {%t("question_mark")%}
exclamation_mark -> %exclamation_mark {%t("exclamation_mark")%}
comma -> %comma {%t("comma")%}

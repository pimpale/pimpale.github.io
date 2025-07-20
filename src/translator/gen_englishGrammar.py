output = ""

output += """@preprocessor module

@{%
import english from './english.json';

function isPoS(pos) {
  return {test: word => (english[word] ?? ["proper_noun"]).includes(pos)}
}

function isAllOfPoS(pos_arr) {
  return {test: word => pos_arr.every(pos => (english[word]??["proper_noun"]).includes(pos))}
}

// parts of speech
const determinative = isPoS("determinative");
const dp_modifier = isPoS("dp_modifier");
const pronoun = isPoS("pronoun");
const independent_genitive_pronoun = isPoS("independent_genitive_pronoun");
const dependent_genitive_pronoun = isPoS("dependent_genitive_pronoun");
const proper_noun = isPoS("proper_noun");
const noun = isPoS("noun");
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

// verbs

// Modal (MODAL)
const modal = isPoS("modal");

// Infinitive Verb (INF)
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
const inf_np = isPoS("inf_np");
const inf_np_predcomp = isPoS("inf_np_predcomp");
const inf_np_to_inf_cl = isPoS("inf_np_to_inf_cl");
const inf_np_bare_inf_cl = isPoS("inf_np_bare_inf_cl");
const inf_np_that_declarative_cl = isPoS("inf_np_that_declarative_cl");
const inf_np_bare_declarative_cl = isPoS("inf_np_bare_declarative_cl");
const inf_np_exclamative_cl = isPoS("inf_np_exclamative_cl");
const inf_np_interrogative_cl = isPoS("inf_np_interrogative_cl");
const inf_np_np = isPoS("inf_np_np");

// Verb Gerund or Present Participle (VBG)
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
const vbg_np = isPoS("vbg_np");
const vbg_np_predcomp = isPoS("vbg_np_predcomp");
const vbg_np_to_inf_cl = isPoS("vbg_np_to_inf_cl");
const vbg_np_bare_inf_cl = isPoS("vbg_np_bare_inf_cl");
const vbg_np_that_declarative_cl = isPoS("vbg_np_that_declarative_cl");
const vbg_np_bare_declarative_cl = isPoS("vbg_np_bare_declarative_cl");
const vbg_np_exclamative_cl = isPoS("vbg_np_exclamative_cl");
const vbg_np_interrogative_cl = isPoS("vbg_np_interrogative_cl");
const vbg_np_np = isPoS("vbg_np_np");

// Verb Past Participle (VBN)
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
const vbn_np = isPoS("vbn_np");
const vbn_np_predcomp = isPoS("vbn_np_predcomp");
const vbn_np_to_inf_cl = isPoS("vbn_np_to_inf_cl");
const vbn_np_bare_inf_cl = isPoS("vbn_np_bare_inf_cl");
const vbn_np_that_declarative_cl = isPoS("vbn_np_that_declarative_cl");
const vbn_np_bare_declarative_cl = isPoS("vbn_np_bare_declarative_cl");
const vbn_np_exclamative_cl = isPoS("vbn_np_exclamative_cl");
const vbn_np_interrogative_cl = isPoS("vbn_np_interrogative_cl");
const vbn_np_np = isPoS("vbn_np_np");

// Verb Finite (VBF): supercategory for the following
const vbf = isPoS("vbf");
const vbf_predcomp = isPoS("vbf_predcomp");
const vbf_to_inf_cl = isPoS("vbf_to_inf_cl");
const vbf_bare_inf_cl = isPoS("vbf_bare_inf_cl");
const vbf_that_declarative_cl = isPoS("vbf_that_declarative_cl");
const vbf_bare_declarative_cl = isPoS("vbf_bare_declarative_cl");
const vbf_exclamative_cl = isPoS("vbf_exclamative_cl");
const vbf_interrogative_cl = isPoS("vbf_interrogative_cl");
const vbf_vbg_cl = isPoS("vbf_vbg_cl");
const vbf_vbn_cl = isPoS("vbf_vbn_cl");
const vbf_passive_cl = isPoS("vbf_passive_cl");
const vbf_np = isPoS("vbf_np");
const vbf_np_predcomp = isPoS("vbf_np_predcomp");
const vbf_np_to_inf_cl = isPoS("vbf_np_to_inf_cl");
const vbf_np_bare_inf_cl = isPoS("vbf_np_bare_inf_cl");
const vbf_np_that_declarative_cl = isPoS("vbf_np_that_declarative_cl");
const vbf_np_bare_declarative_cl = isPoS("vbf_np_bare_declarative_cl");
const vbf_np_exclamative_cl = isPoS("vbf_np_exclamative_cl");
const vbf_np_interrogative_cl = isPoS("vbf_np_interrogative_cl");
const vbf_np_np = isPoS("vbf_np_np");

// certain core auxiliaries
const aux_vbf_predcomp = isAllOfPoS(["vbf_predcomp", "aux"]);
const aux_vbf_np = isAllOfPoS(["vbf_np", "aux"]);
const aux_vbf_vbg_cl = isAllOfPoS(["vbf_vbg_cl", "aux"]);
const aux_vbf_vbn_cl = isAllOfPoS(["vbf_vbn_cl", "aux"]);
const aux_vbf_passive_cl = isAllOfPoS(["vbf_passive_cl", "aux"]);
const aux_vbf_bare_inf_cl = isAllOfPoS(["vbf_bare_inf_cl", "aux"]);

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
fin_cl -> adjunct_list np vbf_vp {%nt("fin_cl")%}

# a question clause
question_cl ->
# yes no qs
                                    subj_aux_inv_cl            {%nt("question_cl")%} # are you happy?
# interrogative phrase replaces np
    | ip_np                         vbf_vp                     {%nt("question_cl")%} # who ate that?
    | ip_np                         subj_aux_inv_cl_np_moved   {%nt("question_cl")%} # what did you eat?
# interrogative phrase replaces adjunct of time, place or reason, also can be used if a preposition is frontend
    | ip_pp                         subj_aux_inv_cl            {%nt("question_cl")%} # where did you eat? / why did you eat? / after which class will you be free?
# interrogative phrase replaces advp_vp 
    | ip_advp_vp                    subj_aux_inv_cl            {%nt("question_cl")%} # how (quickly) did you eat the apple?
# interrogative phrase replaces advp
    | ip_adjp                       subj_aux_inv_cl_adjp_moved {%nt("question_cl")%} # how happy did mary become?

subj_aux_inv_cl ->
# modal
      modal               np adjunct_list_bare_inf_cl      {%nt("subj_aux_inv_cl")%} # can you eat?
# finite
    | aux_vbf_predcomp    np adjunct_list_predcomp         {%nt("subj_aux_inv_cl")%} # were you happy? (`be` when used as a copula)
    | aux_vbf_np          np adjunct_list_np               {%nt("subj_aux_inv_cl")%} # were you a watchman? (`be` when used as an equative)
    | aux_vbf_vbg_cl      np vbg_cl                        {%nt("subj_aux_inv_cl")%} # were you eating? (`be` when used to mark progressive aspect)
    | aux_vbf_vbn_cl      np vbn_cl                        {%nt("subj_aux_inv_cl")%} # have you eaten? (`have` when used to mark past tense)
    | aux_vbf_passive_cl  np passive_cl                    {%nt("subj_aux_inv_cl")%} # were you eaten? (`be` when used to mark passive voice)
    | aux_vbf_bare_inf_cl np adjunct_list_bare_inf_cl      {%nt("subj_aux_inv_cl")%} # did you eat?


subj_aux_inv_cl_np_moved ->
# modal (move from head)
      modal                 adjunct_list_bare_inf_cl                  {%nt("subj_aux_inv_cl_np_moved")%} # who [can sing]?
# modal (move from argument)
    | modal                 np adjunct_list_np_bare_inf_cl_np_moved      {%nt("subj_aux_inv_cl_np_moved")%} # what [can you sing]?
# finite (move from head)
    | aux_vbf_predcomp      adjunct_list_predcomp                     {%nt("subj_aux_inv_cl_np_moved")%} # who [was happy]? (`be` when used as a copula)
    | aux_vbf_np            adjunct_list_np                           {%nt("subj_aux_inv_cl_np_moved")%} # who [was a watchman]? (`be` when used as an equative)
    | aux_vbf_vbg_cl        vbg_cl                                    {%nt("subj_aux_inv_cl_np_moved")%} # who [was eating]?
    | aux_vbf_vbn_cl        vbn_cl                                    {%nt("subj_aux_inv_cl_np_moved")%} # who [had eaten]?
    | aux_vbf_passive_cl    passive_cl                                {%nt("subj_aux_inv_cl_np_moved")%} # who [was given the book]?
    | aux_vbf_bare_inf_cl   adjunct_list_bare_inf_cl                  {%nt("subj_aux_inv_cl_np_moved")%} # who [didn't eat the bread]?
# finite (move from argument)
    | aux_vbf_predcomp      np adjunct_list_predcomp_np_moved            {%nt("subj_aux_inv_cl_np_moved")%} # what [were you happy to be]? (`be` when used as a copula)
    | aux_vbf_np            np adjunct_list_np_np_moved                  {%nt("subj_aux_inv_cl_np_moved")%} # what [were you]? (`be` when used as an equative)
    | aux_vbf_vbg_cl        np vbg_cl_np_moved                           {%nt("subj_aux_inv_cl_np_moved")%} # what [were you eating]?
    | aux_vbf_vbn_cl        np vbn_cl_np_moved                           {%nt("subj_aux_inv_cl_np_moved")%} # what [had you eaten]?
    | aux_vbf_passive_cl    np passive_cl_np_moved                       {%nt("subj_aux_inv_cl_np_moved")%} # what [were you given]?
    | aux_vbf_bare_inf_cl   np adjunct_list_bare_inf_cl_np_moved         {%nt("subj_aux_inv_cl_np_moved")%} # what [didn't you eat]?

subj_aux_inv_cl_adjp_moved ->
      modal         np adjunct_list_bare_inf_cl_adjp_moved               {%nt("subj_aux_inv_cl_adjp_moved")%} # how [can you seem]?
# finite (move from argument)
    | aux_vbf_predcomp      np adjunct_list_predcomp_adjp_moved          {%nt("subj_aux_inv_cl_adjp_moved")%} # how [were you]? (`be` when used as a copula)
    | aux_vbf_np            np adjunct_list_np_adjp_moved                {%nt("subj_aux_inv_cl_adjp_moved")%} # how [were you]? (`be` when used as an equative)
    | aux_vbf_vbg_cl        np vbg_cl_adjp_moved                         {%nt("subj_aux_inv_cl_adjp_moved")%} # how [were you seeming]?
    | aux_vbf_vbn_cl        np vbn_cl_adjp_moved                         {%nt("subj_aux_inv_cl_adjp_moved")%} # how [had you seemed]?
    | aux_vbf_passive_cl    np passive_cl_adjp_moved                     {%nt("subj_aux_inv_cl_adjp_moved")%} # how [were you made]?
    | aux_vbf_bare_inf_cl   np adjunct_list_bare_inf_cl_adjp_moved       {%nt("subj_aux_inv_cl_adjp_moved")%} # how [didn't you seem]?
"""

def adjunct_list_grammar(mv_type):
    mv_suf = "" if mv_type is None else f"_minus_{mv_type}"
    
    out = ""
    out += f"""
# following constituents are flat grammars that permit core arguments + some adjuncts in any order
adjunct_list{mv_suf} -> adjunct:* {{%nonterminal_unpack("adjunct_list{mv_suf}")%}}

adjunct_list_predcomp{mv_suf} ->
      adjunct     adjunct_list_predcomp      {{%nt("adjunct_list_predcomp{mv_suf}")%}}
    | predcomp          adjunct_list         {{%nt("adjunct_list_predcomp{mv_suf}")%}}

adjunct_list_to_inf_cl{mv_suf} ->
      adjunct     adjunct_list_to_inf_cl  {{%nt("adjunct_list_to_inf_cl{mv_suf}")%}}
    | to_inf_cl   adjunct_list            {{%nt("adjunct_list_to_inf_cl{mv_suf}")%}}

# adjuncts also do not seem to sit before the bare infintive 
# - *i helped before dawn clean the car and the house 
# - *i made you earlier stop talking about this very long phrase 
adjunct_list_bare_inf_cl{mv_suf} ->
      bare_inf_cl   adjunct_list         {{%nt("adjunct_list_bare_inf_cl{mv_suf}")%}}

adjunct_list_that_declarative_cl{mv_suf} ->
      adjunct          adjunct_list_that_declarative_cl      {{%nt("adjunct_list_that_declarative_cl{mv_suf}")%}}
    | that_declarative_cl   adjunct_list                     {{%nt("adjunct_list_that_declarative_cl{mv_suf}")%}}

adjunct_list_bare_declarative_cl{mv_suf} ->
      adjunct          adjunct_list_bare_declarative_cl      {{%nt("adjunct_list_bare_declarative_cl{mv_suf}")%}}
    | bare_declarative_cl   adjunct_list                     {{%nt("adjunct_list_bare_declarative_cl{mv_suf}")%}}

adjunct_list_exclamative_cl{mv_suf} ->
      adjunct     adjunct_list_exclamative_cl           {{%nt("adjunct_list_exclamative_cl{mv_suf}")%}}
    | exclamative_cl   adjunct_list                     {{%nt("adjunct_list_exclamative_cl{mv_suf}")%}}

adjunct_list_interrogative_cl{mv_suf} ->
      adjunct            adjunct_list_interrogative_cl      {{%nt("adjunct_list_interrogative_cl{mv_suf}")%}}
    | interrogative_cl   adjunct_list                       {{%nt("adjunct_list_interrogative_cl{mv_suf}")%}}

# cannot be shifted: *I saw quickly the janitor
adjunct_list_o{mv_suf} -> np      adjunct_list                                 {{%nt("adjunct_list_o{mv_suf}")%}}

adjunct_list_do{mv_suf} -> np                     {{%nt("adjunct_list_do{mv_suf}")%}}

# can be out of order, not normally the case
# normal: i found the janitor happy 
# shifted: i found happy the janitor with two cars and a house
adjunct_list_o_predcomp{mv_suf} -> 
      np      adjunct_list_o_predcomp               {{%nt("adjunct_list_o_predcomp{mv_suf}")%}}
    | predcomp      adjunct_list_o               {{%nt("adjunct_list_o_predcomp{mv_suf}")%}}

# cannot shift: 
# - *i asked to eat the apple you
# on the other hand, adjuncts may sit between the np and the to inf
# - i asked you earlier to stop talking about this very long phrase 
adjunct_list_o_to_inf_cl{mv_suf} ->                
      adjunct adjunct_list_o_to_inf_cl     {{%nt("adjunct_list_o_to_inf_cl{mv_suf}")%}}
    | np      adjunct_list_to_inf_cl        {{%nt("adjunct_list_o_to_inf_cl{mv_suf}")%}}

# bare inf cannot shift
# - *i made stumble the huge giant that killed the last hero
# it seems like it cannot even have a 
adjunct_list_o_bare_inf_cl{mv_suf} ->
      adjunct adjunct_list_o_bare_inf_cl {{%nt("adjunct_list_o_bare_inf_cl{mv_suf}")%}}
    | np      adjunct_list_bare_inf_cl    {{%nt("adjunct_list_o_bare_inf_cl{mv_suf}")%}}

# shifting possible, if a to is used:
# - I told you earlier that we are out of grammars
# cannot invert the declarative_cl and np tho:
# - *I told that I ate to the person that i saw earlier
# - *I told that I ate the person that i saw earlier
adjunct_list_io_that_declarative_cl{mv_suf} -> 
      adjunct               adjunct_list_io_that_declarative_cl {{%nt("adjunct_list_io_that_declarative_cl{mv_suf}")%}}
    | np                    adjunct_list_that_declarative_cl    {{%nt("adjunct_list_io_that_declarative_cl{mv_suf}")%}}

adjunct_list_io_bare_declarative_cl{mv_suf} -> 
      adjunct               adjunct_list_io_bare_declarative_cl   {{%nt("adjunct_list_io_bare_declarative_cl{mv_suf}")%}}
    | np                    adjunct_list_bare_declarative_cl      {{%nt("adjunct_list_io_bare_declarative_cl{mv_suf}")%}}

# ditto
adjunct_list_io_exclamative_cl{mv_suf} -> 
      adjunct               adjunct_list_io_exclamative_cl   {{%nt("adjunct_list_io_exclamative_cl{mv_suf}")%}}
    | np                    adjunct_list_exclamative_cl      {{%nt("adjunct_list_io_exclamative_cl{mv_suf}")%}}

# ditto
adjunct_list_io_interrogative_cl{mv_suf} -> 
      adjunct                 adjunct_list_io_interrogative_cl {{%nt("adjunct_list_io_interrogative_cl{mv_suf}")%}}
    | np                      adjunct_list_interrogative_cl    {{%nt("adjunct_list_io_interrogative_cl{mv_suf}")%}}

# can invert the nps with a to
adjunct_list_io_do{mv_suf} ->
      adjunct           adjunct_list_io_do                  {{%nt("adjunct_list_io_do{mv_suf}")%}}
    | np                adjunct_list_do                     {{%nt("adjunct_list_io_do{mv_suf}")%}}

dative_to -> to np

adjunct_list_dative_to{mv_suf} ->
      adjunct           adjunct_list_dative_to                     {{%nt("adjunct_list_dative_to{mv_suf}")%}}
    | dative_to                                                    {{%nt("adjunct_list_dative_to{mv_suf}")%}}

adjunct_list_do_dative_to{mv_suf} ->
      adjunct           adjunct_list_do_dative_to                  {{%nt("adjunct_list_do_dative_to{mv_suf}")%}}
    | np                adjunct_list_dative_to                     {{%nt("adjunct_list_do_dative_to{mv_suf}")%}}
    | dative_to         adjunct_list_do                            {{%nt("adjunct_list_do_dative_to{mv_suf}")%}}

adjunct_list_passive{mv_suf} -> 
      adjunct           adjunct_list_passive                  {{%nt("adjunct_list_passive{mv_suf}")%}}
    | pp_                adjunct_list_passive                  {{%nt("adjunct_list_passive{mv_suf}")%}}

adjunct_list_passive_predcomp{mv_suf} ->
      adjunct           adjunct_list_passive_predcomp         {{%nt("adjunct_list_passive_predcomp{mv_suf}")%}}
    | predcomp          adjunct_list_passive                  {{%nt("adjunct_list_passive_predcomp{mv_suf}")%}}
"""
    return out

def vp_grammar(vp_type: str, mv_type: str | None = None):
    mv_suf = "" if mv_type is None else f"_minus_{mv_type}"

    out = ""
    
    if vp_type == "vbf":
        out += f"""
# modals can only appear in the position of a finite verb (they cannot be conjugated as an infinitive or a participle *to can)
{vp_type}_vp{mv_suf} -> advp_vp? modal bare_inf_cl{mv_suf} {{%nt("{vp_type}_vp{mv_suf}")%}}
"""

    out += f"""
{vp_type}_vp{mv_suf} -> 
      advp_vp? {vp_type}                        adjunct_list{mv_suf}                          {{%nt("{vp_type}_vp{mv_suf}")%}} # intransitive verb (ex: "I smoked")
    | advp_vp? {vp_type}_predcomp               adjunct_list_predcomp{mv_suf}                 {{%nt("{vp_type}_vp{mv_suf}")%}} # intransitive verb with adjective phrase argument (ex: "You seemed happy")
    | advp_vp? {vp_type}_to_inf_cl              adjunct_list_to_inf_cl{mv_suf}                {{%nt("{vp_type}_vp{mv_suf}")%}} # intransitive verb with infinitive clause argument (ex: "I wanted to bring the book")
    | advp_vp? {vp_type}_bare_inf_cl            adjunct_list_bare_inf_cl{mv_suf}              {{%nt("{vp_type}_vp{mv_suf}")%}} # intransitive verb with bare infinitive clause argument (ex: "I helped clean")
    | advp_vp? {vp_type}_that_declarative_cl    adjunct_list_that_declarative_cl{mv_suf}      {{%nt("{vp_type}_vp{mv_suf}")%}} # intransitive verb with declarative content clause argument (ex: "I knew that you eat")
    | advp_vp? {vp_type}_bare_declarative_cl    adjunct_list_bare_declarative_cl{mv_suf}      {{%nt("{vp_type}_vp{mv_suf}")%}} # intransitive verb with declarative content clause argument (ex: "I knew you eat")
    | advp_vp? {vp_type}_exclamative_cl         adjunct_list_exclamative_cl{mv_suf}           {{%nt("{vp_type}_vp{mv_suf}")%}} # intransitive verb with exclamative content clause argument (ex: "I said how expensive it was.")
    | advp_vp? {vp_type}_interrogative_cl       adjunct_list_interrogative_cl{mv_suf}         {{%nt("{vp_type}_vp{mv_suf}")%}} # intransitive verb with interrogative clause argument (ex: "I knew what you eat")
    | advp_vp? {vp_type}_vbg_cl                 vbg_cl{mv_suf}                                {{%nt("{vp_type}_vp{mv_suf}")%}} # progressive aspect (ex: "We are eating") or intransitive verb with vbg argument ("we started eating")
    | advp_vp? {vp_type}_vbn_cl                 vbn_cl{mv_suf}                                {{%nt("{vp_type}_vp{mv_suf}")%}} # past perfect (ex: "He had eaten")
    | advp_vp? {vp_type}_passive_cl             passive_cl{mv_suf}                            {{%nt("{vp_type}_vp{mv_suf}")%}} # passive voice (ex: "He was eaten")
    | advp_vp? {vp_type}_o                      adjunct_list_o{mv_suf}                        {{%nt("{vp_type}_vp{mv_suf}")%}} # transitive verb (ex: "I ate the apple")
    | advp_vp? {vp_type}_o_predcomp             adjunct_list_o_predcomp{mv_suf}               {{%nt("{vp_type}_vp{mv_suf}")%}} # transitive verb with adjective phrase argument (ex: "I found you happy")
    | advp_vp? {vp_type}_o_to_inf_cl            adjunct_list_o_to_inf_cl{mv_suf}              {{%nt("{vp_type}_vp{mv_suf}")%}} # transitive verb with infinitive verb argument (ex: "I asked you to eat the apple")
    | advp_vp? {vp_type}_o_bare_inf_cl          adjunct_list_o_bare_inf_cl{mv_suf}            {{%nt("{vp_type}_vp{mv_suf}")%}} # transitive verb with bare infinitive verb argument (ex: "I made you eat the apple")
    | advp_vp? {vp_type}_io_that_declarative_cl adjunct_list_io_that_declarative_cl{mv_suf}   {{%nt("{vp_type}_vp{mv_suf}")%}} # transitive verb with declarative content clause argument (ex: "I told you that you eat the apple")
    | advp_vp? {vp_type}_io_bare_declarative_cl adjunct_list_io_bare_declarative_cl{mv_suf}   {{%nt("{vp_type}_vp{mv_suf}")%}} # transitive verb with declarative content clause argument (ex: "I told you you eat the apple")
    | advp_vp? {vp_type}_io_exclamative_cl      adjunct_list_io_exclamative_cl{mv_suf}        {{%nt("{vp_type}_vp{mv_suf}")%}} # transitive verb with exclamative content clause argument (ex: "I told you how expensive it was")
    | advp_vp? {vp_type}_io_interrogative_cl    adjunct_list_io_interrogative_cl{mv_suf}      {{%nt("{vp_type}_vp{mv_suf}")%}} # transitive verb with interrogative clause argument (ex: "I asked you what you eat")
    | advp_vp? {vp_type}_io_do                  adjunct_list_io_do{mv_suf}                    {{%nt("{vp_type}_vp{mv_suf}")%}} # ditransitive verb (ex: "I gave you food")
    | advp_vp? {vp_type}_do_dative_to           adjunct_list_do_dative_to{mv_suf}             {{%nt("{vp_type}_vp{mv_suf}")%}} # ditransitive verb with dative shift (ex: "I gave food to you")
"""
    
    if vp_type == "vbn":
        out += f"""
passive_cl{mv_suf} -> 
      advp_vp? {vp_type}                        adjunct_list_passive{mv_suf}                           {{%nt("passive_cl{mv_suf}")%}}
    | advp_vp? {vp_type}_predcomp               adjunct_list_passive_predcomp{mv_suf}                  {{%nt("passive_cl{mv_suf}")%}}
    | advp_vp? {vp_type}_to_inf_cl              adjunct_list_passive_to_inf_cl{mv_suf}                 {{%nt("passive_cl{mv_suf}")%}}
    | advp_vp? {vp_type}_bare_inf_cl            adjunct_list_passive_bare_inf_cl{mv_suf}               {{%nt("passive_cl{mv_suf}")%}}
    | advp_vp? {vp_type}_that_declarative_cl    adjunct_list_passive_that_declarative_cl{mv_suf}       {{%nt("passive_cl{mv_suf}")%}}
    | advp_vp? {vp_type}_bare_declarative_cl    adjunct_list_passive_bare_declarative_cl{mv_suf}       {{%nt("passive_cl{mv_suf}")%}}
    | advp_vp? {vp_type}_exclamative_cl         adjunct_list_passive_exclamative_cl{mv_suf}            {{%nt("passive_cl{mv_suf}")%}}
    | advp_vp? {vp_type}_interrogative_cl       adjunct_list_passive_interrogative_cl{mv_suf}          {{%nt("passive_cl{mv_suf}")%}}
# omit vbg_cl, as one cannot combine passive with progressive aspect *The food was been eaten
# omit vbn_cl, as one cannot combine passive with past perfect *The food was had eaten
# omit passive_cl, as one cannot combine passive with passive *The food was been eaten
    | advp_vp? {vp_type}_o                      adjunct_list_passive_o{mv_suf}                         {{%nt("passive_cl{mv_suf}")%}}
    | advp_vp? {vp_type}_o_predcomp             adjunct_list_passive_o_predcomp{mv_suf}                {{%nt("passive_cl{mv_suf}")%}}
    | advp_vp? {vp_type}_io_that_declarative_cl adjunct_list_passive_io_that_declarative_cl{mv_suf}    {{%nt("passive_cl{mv_suf}")%}}
    | advp_vp? {vp_type}_io_bare_declarative_cl adjunct_list_passive_io_bare_declarative_cl{mv_suf}    {{%nt("passive_cl{mv_suf}")%}}
    | advp_vp? {vp_type}_io_exclamative_cl      adjunct_list_passive_io_exclamative_cl{mv_suf}         {{%nt("passive_cl{mv_suf}")%}}
    | advp_vp? {vp_type}_io_interrogative_cl    adjunct_list_passive_io_interrogative_cl{mv_suf}       {{%nt("passive_cl{mv_suf}")%}}
    | advp_vp? {vp_type}_io_do                  adjunct_list_passive_io_do{mv_suf}                     {{%nt("passive_cl{mv_suf}")%}}
    | advp_vp? {vp_type}_do_dative_to           adjunct_list_passive_do_dative_to{mv_suf}              {{%nt("passive_cl{mv_suf}")%}}

"""
    return out

for mv_type in [None, "np", "adjp"]:  
    output += adjunct_list_grammar(mv_type)
    for vp_type in ["vbf", "inf", "vbg", "vbn"]:
        output += vp_grammar(vp_type, mv_type)

output += """
# infintive clauses
to_inf_cl -> to inf_vp                   {%nt("to_inf_cl")%}
to_inf_cl_np_moved -> to inf_vp_np_moved {%nt("to_inf_cl_np_moved")%}
to_inf_cl_adjp_moved -> to inf_vp_adjp_moved {%nt("to_inf_cl_adjp_moved")%}

bare_inf_cl -> inf_vp                     {%nt("bare_inf_cl")%}
bare_inf_cl_np_moved -> inf_vp_np_moved   {%nt("bare_inf_cl_np_moved")%}
bare_inf_cl_adjp_moved -> inf_vp_adjp_moved   {%nt("bare_inf_cl_adjp_moved")%}

# vbg clause (participle)
vbg_cl -> vbg_vp                           {%nt("vbg_cl")%}
vbg_cl_np_moved -> vbg_vp_np_moved         {%nt("vbg_cl_np_moved")%}
vbg_cl_adjp_moved -> vbg_vp_adjp_moved         {%nt("vbg_cl_adjp_moved")%}

# vbg clause (past participle)
vbn_cl -> vbn_vp                           {%nt("vbn_cl")%}
vbn_cl_np_moved -> vbn_vp_np_moved         {%nt("vbn_cl_np_moved")%}
vbn_cl_adjp_moved -> vbn_vp_adjp_moved         {%nt("vbn_cl_adjp_moved")%}

# a declarative content clause
that_declarative_cl ->  that bare_declarative_cl         {%nt("that_declarative_cl")%}
bare_declarative_cl ->  fin_cl                           {%nt("bare_declarative_cl")%}

# an exclamative content clause
exclamative_cl -> 
      ip_advp_vp     fin_cl            {%nt("exclamative_cl")%} # how quickly mary became happy
    | ip_adjp     np vbf_vp_adjp_moved     {%nt("exclamative_cl")%} # how happy mary became

# an interrogative content clause
interrogative_cl -> 
# yes no qs
      interrogative_subordinator np vbf_vp                     {%nt("interrogative_cl")%} # closed interrogative clause (ex: "whether you eat the apple")
# interrogative phrase replaces np
    | ip_np                          vbf_vp                    {%nt("interrogative_cl")%} # i know who ate that / i know what kind of disease causes that symptom
    | ip_np                       np vbf_vp_np_moved           {%nt("interrogative_cl")%} # i know what he ate
# interrogative phrase replaces adjunct of time, place, or reason, can also be used 
    | ip_pp                      np vbf_vp                     {%nt("interrogative_cl")%} # open interrogative clause with move from the adjuncts using pied piping (ex: "to where I go")

ip_advp_vp -> how advp_vp {%nt("ip_advp_vp")%}
            | how         {%nt("ip_advp_vp")%}
ip_adjp ->  how adjp      {%nt("ip_advp_vp")%}
            | how         {%nt("ip_advp_vp")%}

# a content clause with some np moved
bare_declarative_cl_np_moved ->
         vbf_vp              {%nt("bare_declarative_cl_np_moved")%}
    | np vbf_vp_np_moved     {%nt("bare_declarative_cl_np_moved")%}


that_declarative_cl_np_moved -> that bare_declarative_cl_np_moved {%nt("that_declarative_cl_np_moved")%}

# a content clause with some adjp moved
bare_declarative_cl_adjp_moved ->
      np vbf_vp_adjp_moved     {%nt("bare_declarative_cl_adjp_moved")%}
    | np vbf_vp              {%nt("bare_declarative_cl_adjp_moved")%}

# a content clause with some adjp moved
that_declarative_cl_adjp_moved -> that bare_declarative_cl_adjp_moved {%nt("that_declarative_cl_adjp_moved")%}

# interrogative phrase replacing an np
# [what] is your name 
# [who] killed bob?
# I know [what] you eat 
# I know [which kind of bread] you eat
ip_np -> 
# pronoun equivalent
      who                                   {%nt("ip_np")%}
    | what                                  {%nt("ip_np")%}
    | which                                 {%nt("ip_np")%}
# determiner is replaced by an adj noun
    | ip_det adjp_list noun n_modifier_list {%nt("ip_np")%}

ip_det -> which  {%nt("ip_det")%}
        | whose  {%nt("ip_det")%}

np -> precorenp_modifier? core_np postcorenp_modifier? {%nt("np")%}

precorenp_modifier? -> precorenp_modifier {%nt("precorenp_modifier?")%}
                     | null               {%nt("precorenp_modifier?")%}

postcorenp_modifier? -> postcorenp_modifier {%nt("postcorenp_modifier?")%}
                      | null                {%nt("postcorenp_modifier?")%}

# a noun phrase that can be used in the sentence "which x did you get?"
whichable_np -> adjp_list noun n_modifier_list {%nt("whichable_np")%}

# a core noun phrase without peripheral modifiers
core_np -> 
                                                  proper_noun                               {%nt("core_np")%}  # a proper noun (ex: "John", "Mary")
    |                                             pronoun                                   {%nt("core_np")%}  # a pronoun (ex: "I", "you", "he", "she", "it", "we", "they")
    |                                             independent_genitive_pronoun              {%nt("core_np")%}  # a possessive pronoun (ex: "mine", "yours")
    | predeterminer_modifier? determiner? adjp_list noun                    n_modifier_list   {%nt("core_np")%}  # determiner phrase followed by a nominal (ex: "even all the lovely food too")

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

restrictive_cl -> 
      relative_ip_np_subj     vbf_vp              {%nt("restrictive_cl")%}
    | relative_ip_np_obj   np vbf_vp_np_moved     {%nt("restrictive_cl")%}
  
# a specifier coming after the noun
n_modifier -> restrictive_cl           {%nt("n_modifier")%} # a relative clause specifying the noun (ex: president who was elected) (ex: box that is on the table)
            | pp                       {%nt("n_modifier")%} # a prepositional phrase specifying the noun (ex: "the book on the table")
            | passive_cl               {%nt("n_modifier")%} # a reduced object relative passive clause (ex: "the horse raced past the barn")

n_modifier_list -> n_modifier:* {%nonterminal_unpack("n_modifier_list")%}

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

adjunct -> pp             {%nt("adjunct")%} # a prepositional phrase adjunct (ex: "in the house")
         | advp_vp        {%nt("adjunct")%} # an adverb phrase adjunct compatible with verb use (ex: "quickly")

adjunct_np_moved ->
      pp_np_moved   {%nt("adjunct")%}

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
pp_np_moved ->      preposition_np             {%nt("pp_np_moved")%}

# a predcomp
predcomp -> adjp {%nt("predcomp")%}

predcomp_np_moved -> adjp_np_moved {%nt("predcomp_np_moved")%}

predcomp_adjp_moved -> null {%nt("predcomp_adjp_moved")%}

# an adjective phrase
adjp ->
      advp                  adjp              {%nt("adjp")%} # an adverb phrase followed by an adjective phrase (ex: "very happy") 
    | adj                                   {%nt("adjp")%} # an adjective (ex: "happy")
    | adj_pp                pp              {%nt("adjp")%} # an adjective with a prepositional phrase argument (ex: "fond of music")
    | adj_bare_declarative_cl    bare_declarative_cl  {%nt("adjp")%} # an adjective with a declarative content clause argument (ex: "happy that you are here")
    | adj_that_declarative_cl    that_declarative_cl  {%nt("adjp")%} # an adjective with a declarative content clause argument (ex: "happy you are here")
    | adj_to_inf_cl         to_inf_cl       {%nt("adjp")%} # an adjective with an infinitive clause argument (ex: "happy to be here")
    | proper_noun                           {%nt("adjp")%} # a proper noun used as an adjective like "English" (TODO: kind of a hack, not sure)

adjp_np_moved ->                                     
      advp adjp_np_moved                              {%nt("adjp_np_moved")%}
    | adj_pp             preposition                {%nt("adjp_np_moved")%}
    | adj_that_declarative_cl that_declarative_cl_np_moved    {%nt("adjp_np_moved")%}
    | adj_bare_declarative_cl bare_declarative_cl_np_moved    {%nt("adjp_np_moved")%}
    | adj_to_inf_cl      to_inf_cl_np_moved         {%nt("adjp_np_moved")%}

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

determinative -> %determinative {%t("determinative")%}
dp_modifier -> %dp_modifier {%t("dp_modifier")%}
pronoun -> %pronoun {%t("pronoun")%}
dependent_genitive_pronoun -> %dependent_genitive_pronoun {%t("dependent_genitive_pronoun")%}
independent_genitive_pronoun -> %independent_genitive_pronoun {%t("independent_genitive_pronoun")%}
proper_noun -> %proper_noun {%t("proper_noun")%}
noun -> %noun {%t("noun")%}
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
aux_vbf_predcomp -> %aux_vbf_predcomp {%t("aux_vbf_predcomp")%}
aux_vbf_np -> %aux_vbf_np {%t("aux_vbf_np")%}
aux_vbf_vbg_cl -> %aux_vbf_vbg_cl {%t("aux_vbf_vbg_cl")%}
aux_vbf_vbn_cl -> %aux_vbf_vbn_cl {%t("aux_vbf_vbn_cl")%}
aux_vbf_passive_cl -> %aux_vbf_passive_cl {%t("aux_vbf_passive_cl")%}
aux_vbf_bare_inf_cl -> %aux_vbf_bare_inf_cl {%t("aux_vbf_bare_inf_cl")%}
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
inf_np -> %inf_np {%t("inf_np")%}
inf_np_predcomp -> %inf_np_predcomp {%t("inf_np_predcomp")%}
inf_np_to_inf_cl -> %inf_np_to_inf_cl {%t("inf_np_to_inf_cl")%}
inf_np_bare_inf_cl -> %inf_np_bare_inf_cl {%t("inf_np_bare_inf_cl")%}
inf_np_that_declarative_cl -> %inf_np_that_declarative_cl {%t("inf_np_that_declarative_cl")%}
inf_np_bare_declarative_cl -> %inf_np_bare_declarative_cl {%t("inf_np_bare_declarative_cl")%}
inf_np_exclamative_cl -> %inf_np_exclamative_cl {%t("inf_np_exclamative_cl")%}
inf_np_interrogative_cl -> %inf_np_interrogative_cl {%t("inf_np_interrogative_cl")%}
inf_np_np -> %inf_np_np {%t("inf_np_np")%}
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
vbg_np -> %vbg_np {%t("vbg_np")%}
vbg_np_predcomp -> %vbg_np_predcomp {%t("vbg_np_predcomp")%}
vbg_np_to_inf_cl -> %vbg_np_to_inf_cl {%t("vbg_np_to_inf_cl")%}
vbg_np_bare_inf_cl -> %vbg_np_bare_inf_cl {%t("vbg_np_bare_inf_cl")%}
vbg_np_that_declarative_cl -> %vbg_np_that_declarative_cl {%t("vbg_np_that_declarative_cl")%}
vbg_np_bare_declarative_cl -> %vbg_np_bare_declarative_cl {%t("vbg_np_bare_declarative_cl")%}
vbg_np_exclamative_cl -> %vbg_np_exclamative_cl {%t("vbg_np_exclamative_cl")%}
vbg_np_interrogative_cl -> %vbg_np_interrogative_cl {%t("vbg_np_interrogative_cl")%}
vbg_np_np -> %vbg_np_np {%t("vbg_np_np")%}
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
vbn_np -> %vbn_np {%t("vbn_np")%}
vbn_np_predcomp -> %vbn_np_predcomp {%t("vbn_np_predcomp")%}
vbn_np_to_inf_cl -> %vbn_np_to_inf_cl {%t("vbn_np_to_inf_cl")%}
vbn_np_bare_inf_cl -> %vbn_np_bare_inf_cl {%t("vbn_np_bare_inf_cl")%}
vbn_np_that_declarative_cl -> %vbn_np_that_declarative_cl {%t("vbn_np_that_declarative_cl")%}
vbn_np_bare_declarative_cl -> %vbn_np_bare_declarative_cl {%t("vbn_np_bare_declarative_cl")%}
vbn_np_exclamative_cl -> %vbn_np_exclamative_cl {%t("vbn_np_exclamative_cl")%}
vbn_np_interrogative_cl -> %vbn_np_interrogative_cl {%t("vbn_np_interrogative_cl")%}
vbn_np_np -> %vbn_np_np {%t("vbn_np_np")%}
vbf -> %vbf {%t("vbf")%}
vbf_predcomp -> %vbf_predcomp {%t("vbf_predcomp")%}
vbf_to_inf_cl -> %vbf_to_inf_cl {%t("vbf_to_inf_cl")%}
vbf_bare_inf_cl -> %vbf_bare_inf_cl {%t("vbf_bare_inf_cl")%}
vbf_that_declarative_cl -> %vbf_that_declarative_cl {%t("vbf_that_declarative_cl")%}
vbf_bare_declarative_cl -> %vbf_bare_declarative_cl {%t("vbf_bare_declarative_cl")%}
vbf_exclamative_cl -> %vbf_exclamative_cl {%t("vbf_exclamative_cl")%}
vbf_interrogative_cl -> %vbf_interrogative_cl {%t("vbf_interrogative_cl")%}
vbf_vbg_cl -> %vbf_vbg_cl {%t("vbf_vbg_cl")%}
vbf_vbn_cl -> %vbf_vbn_cl {%t("vbf_vbn_cl")%}
vbf_passive_cl -> %vbf_passive_cl {%t("vbf_passive_cl")%}
vbf_np -> %vbf_np {%t("vbf_np")%}
vbf_np_predcomp -> %vbf_np_predcomp {%t("vbf_np_predcomp")%}
vbf_np_to_inf_cl -> %vbf_np_to_inf_cl {%t("vbf_np_to_inf_cl")%}
vbf_np_bare_inf_cl -> %vbf_np_bare_inf_cl {%t("vbf_np_bare_inf_cl")%}
vbf_np_that_declarative_cl -> %vbf_np_that_declarative_cl {%t("vbf_np_that_declarative_cl")%}
vbf_np_bare_declarative_cl -> %vbf_np_bare_declarative_cl {%t("vbf_np_bare_declarative_cl")%}
vbf_np_exclamative_cl -> %vbf_np_exclamative_cl {%t("vbf_np_exclamative_cl")%}
vbf_np_interrogative_cl -> %vbf_np_interrogative_cl {%t("vbf_np_interrogative_cl")%}
vbf_np_np -> %vbf_np_np {%t("vbf_np_np")%}
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
period -> %period {%t("period")%}
question_mark -> %question_mark {%t("question_mark")%}
exclamation_mark -> %exclamation_mark {%t("exclamation_mark")%}
"""

with open("englishGrammarGenerated.ne", "w") as f:
    f.write(output)
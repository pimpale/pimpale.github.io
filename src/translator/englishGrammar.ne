@preprocessor module

@{%
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

// verbs

// Modal (MODAL)
const modal = {test: x => x in english.modal};

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

// certain core verbs
const is = {test: x => x in english.is};
const are = {test: x => x in english.are};
const were = {test: x => x in english.were};
const do_ = {test: x => x in english.do};
const does = {test: x => x in english.does};
const did = {test: x => x in english.did};

// adjectives
const adj = {test: x => x in english.adj}; // adjectives that don't take any arguments (ex: "happy")
const adj_pp = {test: x => x in english.adj_pp}; // adjectives that take a prepositional phrase argument (ex: "fond of cheese")
const adj_declarative_cl = {test: x => x in english.adj_declarative_cl}; // adjectives that take a declarative clause argument (ex: "happy that you could make it")


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

%}

sentence -> 
      decl_fin_cl {%nt("sentence")%}
    | question_cl {%nt("sentence")%}

# a declarative finite clause
decl_fin_cl -> pp_list np fin_vp pp_list {%nt("decl_fin_cl")%}

# a question clause
question_cl -> 
                subj_aux_inv_cl          pp_list {%nt("question_cl")%} # are you happy?
    | wh        fin_vp                   pp_list {%nt("question_cl")%} # who ate that?
    | wh        subj_aux_inv_cl_np_moved pp_list {%nt("question_cl")%} # what did you eat?
    | why       subj_aux_inv_cl          pp_list {%nt("question_cl")%}
    | how advp? subj_aux_inv_cl          pp_list {%nt("question_cl")%} # how did you eat the apple?
    | how       subj_aux_inv_cl_ap_moved pp_list {%nt("question_cl")%} # how happy are you?


subj_aux_inv_cl ->
# modal
      modal         not? np bare_inf_cl      {%nt("subj_aux_inv_cl")%} # can you eat?
# preterite
    | were          not? np ap               {%nt("subj_aux_inv_cl")%} # were you happy? (`be` when used as a copula)
    | were          not? np np               {%nt("subj_aux_inv_cl")%} # were you a watchman? (`be` when used as an equative)
    | vbd_vbg_cl    not? np vbg_cl           {%nt("subj_aux_inv_cl")%} # were you eating?
    | vbd_vbn_cl    not? np vbn_cl           {%nt("subj_aux_inv_cl")%} # were you eaten? / had you eaten?
    | did           not? np bare_inf_cl      {%nt("subj_aux_inv_cl")%} # did you eat?
# present (non-3rd person singular)
    | are           not? np ap               {%nt("subj_aux_inv_cl")%} # are you happy?
    | are           not? np np               {%nt("subj_aux_inv_cl")%} # are you a watchman?
    | vbp_vbg_cl    not? np vbg_cl           {%nt("subj_aux_inv_cl")%} # are you eating?
    | vbp_vbn_cl    not? np vbn_cl           {%nt("subj_aux_inv_cl")%} # have you eaten?
    | do            not? np bare_inf_cl      {%nt("subj_aux_inv_cl")%} # do you eat?
# present (3rd person singular)
    | is            not? np ap               {%nt("subj_aux_inv_cl")%} # is he happy?
    | is            not? np np               {%nt("subj_aux_inv_cl")%} # is he a watchman?
    | vbz_vbg_cl    not? np vbg_cl           {%nt("subj_aux_inv_cl")%} # is he eating?
    | vbz_vbn_cl    not? np vbn_cl           {%nt("subj_aux_inv_cl")%} # has he eaten?
    | does          not? np bare_inf_cl      {%nt("subj_aux_inv_cl")%} # does he eat?


subj_aux_inv_cl_np_moved ->
# modal (move from head)
      modal         not? bare_inf_cl                  {%nt("subj_aux_inv_cl_np_moved")%} # who [can sing]?
# modal (move from argument)
    | modal         not? np bare_inf_cl_np_moved      {%nt("subj_aux_inv_cl_np_moved")%} # what [can you sing]?
# preterite (move from head)
    | were          not? ap                           {%nt("subj_aux_inv_cl_np_moved")%} # who [was happy]? (`be` when used as a copula)
    | vbd_vbg_cl    not? vbg_cl                       {%nt("subj_aux_inv_cl_np_moved")%} # who [was eating]?
    | vbd_vbn_cl    not? vbn_cl                       {%nt("subj_aux_inv_cl_np_moved")%} # who [was eaten]? / who [had eaten]?
    | did           not? bare_inf_cl                  {%nt("subj_aux_inv_cl_np_moved")%} # who [didn't eat]?
# preterite (move from argument)
    | vbd_vbg_cl    not? np vbg_cl_np_moved           {%nt("subj_aux_inv_cl_np_moved")%} # what [were you eating]?
    | vbd_vbn_cl    not? np vbn_cl_np_moved           {%nt("subj_aux_inv_cl_np_moved")%} # what [were you given]? / what [had you eaten]?
    | did           not? np bare_inf_cl_np_moved      {%nt("subj_aux_inv_cl_np_moved")%} # what [did you eat]?
# present (non-3rd person singular) (move from head)
    | are           not? ap                           {%nt("subj_aux_inv_cl_np_moved")%} # who [are happy]?
    | vbp_vbg_cl    not? vbg_cl                       {%nt("subj_aux_inv_cl_np_moved")%} # who [are eating]?
    | vbp_vbn_cl    not? vbn_cl                       {%nt("subj_aux_inv_cl_np_moved")%} # who [are eaten]? / who [has eaten]?
    | do            not? bare_inf_cl                  {%nt("subj_aux_inv_cl_np_moved")%} # who [don't eat]?
# present (non-3rd person singular) (move from argument)
    | vbp_vbg_cl    not? np vbg_cl_np_moved           {%nt("subj_aux_inv_cl_np_moved")%} # what [are you eating]?
    | vbp_vbn_cl    not? np vbn_cl_np_moved           {%nt("subj_aux_inv_cl_np_moved")%} # what [are you given]? / what [have you eaten]?
    | do            not? np bare_inf_cl_np_moved      {%nt("subj_aux_inv_cl_np_moved")%} # what [do you eat]?
# present (3rd person singular) (move from head)
    | is            not? ap                           {%nt("subj_aux_inv_cl_np_moved")%} # who [is happy]?
    | vbz_vbg_cl    not? vbg_cl                       {%nt("subj_aux_inv_cl_np_moved")%} # who [is eating]?
    | vbz_vbn_cl    not? vbn_cl                       {%nt("subj_aux_inv_cl_np_moved")%} # who [is eaten]? / who [has eaten]?
    | does          not? bare_inf_cl                  {%nt("subj_aux_inv_cl_np_moved")%} # who [doesn't eat]?
# present (3rd person singular) (move from argument)
    | vbz_vbg_cl    not? np vbg_cl_np_moved           {%nt("subj_aux_inv_cl_np_moved")%} # what [is he eating]?
    | vbz_vbn_cl    not? np vbn_cl_np_moved           {%nt("subj_aux_inv_cl_np_moved")%} # what [is he given]? / what [has he eaten]?
    | does          not? np bare_inf_cl_np_moved      {%nt("subj_aux_inv_cl_np_moved")%} # what [does he eat]?


subj_aux_inv_cl_ap_moved ->
      modal         not? np bare_inf_cl_ap_moved      {%nt("subj_aux_inv_cl_ap_moved")%} # how [can you eat]?
# preterite
    | were          not? np                           {%nt("subj_aux_inv_cl_ap_moved")%} # how [were you]? (`be` when used as a copula)
    | vbd_vbg_cl    not? np vbg_cl_ap_moved           {%nt("subj_aux_inv_cl_ap_moved")%} # how [were you feeling]?
    | vbd_vbn_cl    not? np vbn_cl_ap_moved           {%nt("subj_aux_inv_cl_ap_moved")%} # how [were you found]? / how [had you felt]?
    | did           not? np bare_inf_cl_ap_moved      {%nt("subj_aux_inv_cl_ap_moved")%} # how [did you feel]?
# present (non-3rd person singular)
    | are           not? np                           {%nt("subj_aux_inv_cl_ap_moved")%} # how [are you]?
    | vbp_vbg_cl    not? np vbg_cl_ap_moved           {%nt("subj_aux_inv_cl_ap_moved")%} # how [are you feeling]?
    | vbp_vbn_cl    not? np vbn_cl_ap_moved           {%nt("subj_aux_inv_cl_ap_moved")%} # how [are you found] / how [have you felt]?
    | do            not? np bare_inf_cl_ap_moved      {%nt("subj_aux_inv_cl_ap_moved")%} # how [do you feel]?
# present (3rd person singular)
    | is            not? np                           {%nt("subj_aux_inv_cl_ap_moved")%} # how [is he]?
    | vbz_vbg_cl    not? np vbg_cl_ap_moved           {%nt("subj_aux_inv_cl_ap_moved")%} # how [is he feeling]?
    | vbz_vbn_cl    not? np vbn_cl_ap_moved           {%nt("subj_aux_inv_cl_ap_moved")%} # how [is he found] / how [has he felt]?
    | does          not? np bare_inf_cl_ap_moved      {%nt("subj_aux_inv_cl_ap_moved")%} # how [does he feel]?

fin_vp -> 
# modal
      advp? modal              not? advp? bare_inf_cl                           {%nt("fin_vp")%} # modal verb with bare infinitive clause argument (ex: "I can eat") 
# complete preterite verb phrase
    | advp? vbd                     advp?                                       {%nt("fin_vp")%} # intransitive verb (ex: "I smoked")
    | advp? vbd_pp                  advp? pp                                    {%nt("fin_vp")%} # intransitive verb with prepositional phrase argument (ex: "I looked at the book")
    | advp? vbd_ap                  advp? ap                                    {%nt("fin_vp")%} # intransitive verb with adjective phrase argument (ex: "You seemed happy")
    | advp? vbd_to_inf_cl           advp? to_inf_cl                             {%nt("fin_vp")%} # intransitive verb with infinitive clause argument (ex: "I wanted to bring the book")
    | advp? vbd_bare_inf_cl         advp? bare_inf_cl                           {%nt("fin_vp")%} # intransitive verb with bare infinitive clause argument (ex: "I helped clean")
    | advp? vbd_declarative_cl      advp? declarative_cl                        {%nt("fin_vp")%} # intransitive verb with declarative content clause argument (ex: "I knew that you eat")
    | advp? vbd_exclamative_cl      advp? exclamative_cl                        {%nt("fin_vp")%} # intransitive verb with exclamative content clause argument (ex: "I said how expensive it was.")
    | advp? vbd_interrogative_cl    advp? interrogative_cl                      {%nt("fin_vp")%} # intransitive verb with interrogative clause argument (ex: "I knew what you eat")
    |       vbd_vbg_cl                    vbg_cl                                {%nt("fin_vp")%} # past continuous (ex: "We were eating")
    |       vbd_vbn_cl                    vbn_cl                                {%nt("fin_vp")%} # past perfect (ex: "He had eaten") OR passive voice (ex: "He was eaten")
    | advp? vbd_np                  advp? np                                    {%nt("fin_vp")%} # transitive verb (ex: "I ate the apple")
    | advp? vbd_np_pp               advp? np              pp                    {%nt("fin_vp")%} # transitive verb with prepositional phrase argument (ex: "I put the book on the table")
    | advp? vbd_np_ap               advp? np              ap                    {%nt("fin_vp")%} # transitive verb with adjective phrase argument (ex: "I found you happy")
    | advp? vbd_np_to_inf_cl        advp? np              to_inf_cl             {%nt("fin_vp")%} # transitive verb with infinitive verb argument (ex: "I asked you to eat the apple")
    | advp? vbd_np_bare_inf_cl      advp? np              bare_inf_cl           {%nt("fin_vp")%} # transitive verb with bare infinitive verb argument (ex: "I made you eat the apple")
    | advp? vbd_np_declarative_cl   advp? np              declarative_cl        {%nt("fin_vp")%} # transitive verb with declarative content clause argument (ex: "I told you that you eat the apple")
    | advp? vbd_np_exclamative_cl   advp? np              exclamative_cl        {%nt("fin_vp")%} # transitive verb with exclamative content clause argument (ex: "I told you how expensive it was")
    | advp? vbd_np_interrogative_cl advp? np              interrogative_cl      {%nt("fin_vp")%} # transitive verb with interrogative clause argument (ex: "I asked you what you eat")
    | advp? vbd_np_np               advp? np              np                    {%nt("fin_vp")%} # ditransitive verb (ex: "I gave you food")
    | advp? vbd_np_np               advp? np              to              np    {%nt("fin_vp")%} # ditransitive verb with dative shift (ex: "I gave the book to you")
# complete present verb phrase (non 3rd person singular)
    | advp? vbp                     advp?                                       {%nt("fin_vp")%} # intransitive verb (ex: "I smoke")
    | advp? vbp_pp                  advp? pp                                    {%nt("fin_vp")%} # intransitive verb with prepositional phrase argument (ex: "I look at the book")
    | advp? vbp_ap                  advp? ap                                    {%nt("fin_vp")%} # intransitive verb with adjective phrase argument (ex: "You seem happy")
    | advp? vbp_to_inf_cl           advp? to_inf_cl                             {%nt("fin_vp")%} # intransitive verb with infinitive clause argument (ex: "I want to eat")
    | advp? vbp_bare_inf_cl         advp? bare_inf_cl                           {%nt("fin_vp")%} # intransitive verb with bare infinitive clause argument (ex: "I help clean")
    | advp? vbp_declarative_cl      advp? declarative_cl                        {%nt("fin_vp")%} # intransitive verb with declarative content clause argument (ex: "I know that you eat")
    | advp? vbp_exclamative_cl      advp? exclamative_cl                        {%nt("fin_vp")%} # intransitive verb with exclamative content clause argument (ex: "I said how expensive it was.")
    | advp? vbp_interrogative_cl    advp? interrogative_cl                      {%nt("fin_vp")%} # intransitive verb with interrogative clause argument (ex: "I know what you eat")
    |       vbp_vbg_cl                    vbg_cl                                {%nt("fin_vp")%} # present progressive (ex: "I am eating the apple")
    |       vbp_vbn_cl                    vbn_cl                                {%nt("fin_vp")%} # present perfect (ex: "They have eaten")
    | advp? vbp_np                  advp? np                                    {%nt("fin_vp")%} # transitive verb (ex: "I eat the apple")
    | advp? vbp_np_pp               advp? np              pp                    {%nt("fin_vp")%} # transitive verb with prepositional phrase argument (ex: "I put the book on the table")
    | advp? vbp_np_ap               advp? np              ap                    {%nt("fin_vp")%} # transitive verb with adjective phrase argument (ex: "I find you happy")
    | advp? vbp_np_to_inf_cl        advp? np              to_inf_cl             {%nt("fin_vp")%} # transitive verb with infinitive verb argument (ex: "I ask you to eat the apple")
    | advp? vbp_np_bare_inf_cl      advp? np              bare_inf_cl           {%nt("fin_vp")%} # transitive verb with bare infinitive verb argument (ex: "I make you eat the apple")
    | advp? vbp_np_declarative_cl   advp? np              declarative_cl        {%nt("fin_vp")%} # transitive verb with declarative content clause argument (ex: "I tell you that you eat the apple")
    | advp? vbp_np_exclamative_cl   advp? np              exclamative_cl        {%nt("fin_vp")%} # transitive verb with exclamative content clause argument (ex: "I told you how expensive it was")
    | advp? vbp_np_interrogative_cl advp? np              interrogative_cl      {%nt("fin_vp")%} # transitive verb with interrogative clause argument (ex: "I ask you what you eat")
    | advp? vbp_np_np               advp? np              np                    {%nt("fin_vp")%} # ditransitive verb (ex: "I give you food")
    | advp? vbp_np_np               advp? np              to              np    {%nt("fin_vp")%} # ditransitive verb with dative shift (ex: "I give the book to you")
# complete present verb phrase (3rd person singular)
    | advp? vbz                     advp?                                       {%nt("fin_vp")%} # intransitive verb (ex: "He smokes")
    | advp? vbz_pp                  advp? pp                                    {%nt("fin_vp")%} # intransitive verb with prepositional phrase argument (ex: "He looks at the book")
    | advp? vbz_ap                  advp? ap                                    {%nt("fin_vp")%} # intransitive verb with adjective phrase argument (ex: "He seems happy")
    | advp? vbz_to_inf_cl           advp? to_inf_cl                             {%nt("fin_vp")%} # intransitive verb with infinitive clause argument (ex: "He wants to eat")
    | advp? vbz_bare_inf_cl         advp? bare_inf_cl                           {%nt("fin_vp")%} # intransitive verb with bare infinitive clause argument (ex: "He might eat")
    | advp? vbz_declarative_cl      advp? declarative_cl                        {%nt("fin_vp")%} # intransitive verb with declarative content clause argument (ex: "He knows that you eat")
    | advp? vbz_exclamative_cl      advp? exclamative_cl                        {%nt("fin_vp")%} # intransitive verb with exclamative content clause argument (ex: "He says how expensive it was.")
    | advp? vbz_interrogative_cl    advp? interrogative_cl                      {%nt("fin_vp")%} # intransitive verb with interrogative clause argument (ex: "He knows what you eat")
    |       vbz_vbg_cl              advp? vbg_cl                                {%nt("fin_vp")%} # present progressive (ex: "He is eating")
    |       vbz_vbn_cl              advp? vbn_cl                                {%nt("fin_vp")%} # present perfect (ex: "He has eaten")
    | advp? vbz_np                  advp? np                                    {%nt("fin_vp")%} # transitive verb (ex: "He eats the apple")
    | advp? vbz_np_pp               advp? np              pp                    {%nt("fin_vp")%} # transitive verb with prepositional phrase argument (ex: "He puts the book on the table")
    | advp? vbz_np_ap               advp? np              ap                    {%nt("fin_vp")%} # transitive verb with adjective phrase argument (ex: "He finds you happy")
    | advp? vbz_np_to_inf_cl        advp? np              to_inf_cl             {%nt("fin_vp")%} # transitive verb with infinitive verb argument (ex: "He asks you to eat the apple")
    | advp? vbz_np_bare_inf_cl      advp? np              bare_inf_cl           {%nt("fin_vp")%} # transitive verb with bare infinitive verb argument (ex: "He makes you eat the apple")
    | advp? vbz_np_declarative_cl   advp? np              declarative_cl        {%nt("fin_vp")%} # transitive verb with declarative content clause argument (ex: "He tells you that you eat the apple")
    | advp? vbz_np_exclamative_cl   advp? np              exclamative_cl        {%nt("fin_vp")%} # transitive verb with exclamative content clause argument (ex: "He tells you how expensive it was")
    | advp? vbz_np_interrogative_cl advp? np              interrogative_cl      {%nt("fin_vp")%} # transitive verb with interrogative clause argument (ex: "He asks you what you eat")
    | advp? vbz_np_np               advp? np              np                    {%nt("fin_vp")%} # ditransitive verb (ex: "He gives you food")
    | advp? vbz_np_np               advp? np              to              np    {%nt("fin_vp")%} # ditransitive verb with dative shift (ex: "He gives the book to you")

# a declarative clause but one of the noun phrases has been moved out of it
# this happens when a declarative clause is inside an interrogative clause
# this happens in sentences like "i know that you think that he eats the apple" -> "i know what you think that he eats"
# non-finite verb phrase with a noun phrase moved
fin_vp_np_moved ->
# complete preterite verb phrase (move argument)
      advp? vb_pp                   advp? preposition                                    {%nt("fin_vp_np_moved")%} # I know what you [talked about]
    | advp? vb_ap                   advp? ap_np_moved                                    {%nt("fin_vp_np_moved")%} # I know what you [seemed good at]
    | advp? vb_to_inf_cl            advp? to_inf_cl_np_moved                             {%nt("fin_vp_np_moved")%} # I know what you [asked to bring]
    | advp? vb_bare_inf_cl          advp? bare_inf_cl_np_moved                           {%nt("fin_vp_np_moved")%} # I know what you [helped bring]
    | advp? vb_declarative_cl       advp? declarative_cl_np_moved                        {%nt("fin_vp_np_moved")%} # I know what you [said that you bring]
    |       vb_vbg_cl                     vbg_cl_np_moved                                {%nt("fin_vp_np_moved")%} # I know what you [were bringing]
    |       vb_vbn_cl                     vbn_cl_np_moved                                {%nt("fin_vp_np_moved")%} # I know what you [had brought] OR I know what you [were brought]
    | advp? vb_np                   advp?                                                {%nt("fin_vp_np_moved")%} # I know what you [brought]
    | advp? vb_np_pp                advp? pp                                             {%nt("fin_vp_np_moved")%} # I know what you [put on the table]
    | advp? vb_np_pp                advp? np                     preposition             {%nt("fin_vp_np_moved")%} # I know what you [put the book on]
    | advp? vb_np_ap                advp? ap                                             {%nt("fin_vp_np_moved")%} # I know who you [considered good at chess]
    | advp? vb_np_ap                advp? np                     ap_np_moved             {%nt("fin_vp_np_moved")%} # I know what you [considered Bob good at]
    | advp? vb_np_to_inf_cl         advp? to_inf_cl                                      {%nt("fin_vp_np_moved")%} # I know who you [asked to bring cheese]
    | advp? vb_np_to_inf_cl         advp? np                     to_inf_cl_np_moved      {%nt("fin_vp_np_moved")%} # I know what you [asked Bob to bring]
    | advp? vb_np_bare_inf_cl       advp? bare_inf_cl                                    {%nt("fin_vp_np_moved")%} # I know who you [helped bring cheese]
    | advp? vb_np_bare_inf_cl       advp? np                     bare_inf_cl_np_moved    {%nt("fin_vp_np_moved")%} # I know what you [helped Bob bring]
    | advp? vb_np_declarative_cl    advp? declarative_cl                                 {%nt("fin_vp_np_moved")%} # I know who you [told that you bring cheese]
    | advp? vb_np_declarative_cl    advp? np                     declarative_cl_np_moved {%nt("fin_vp_np_moved")%} # I know what you [told Bob that you bring]
    | advp? vb_np_exclamative_cl    advp? exclamative_cl                                 {%nt("fin_vp_np_moved")%} # I know who you [told how expensive it is]
    | advp? vb_np_interrogative_cl  advp? interrogative_cl                               {%nt("fin_vp_np_moved")%} # I know who you [asked what Bob brings]
    | advp? vb_np_np                advp? np                                             {%nt("fin_vp_np_moved")%} # I know what you [gave Bob]
    | advp? vb_np_np                advp? to                     np                      {%nt("fin_vp_np_moved")%} # I know who you [gave the book to]
# complete present verb phrase (non 3rd person singular) (move argument)
    | advp? vbp_pp                   advp? preposition                                    {%nt("fin_vp_np_moved")%} # I know what you [talk about]
    | advp? vbp_ap                   advp? ap_np_moved                                    {%nt("fin_vp_np_moved")%} # I know what you [seem good at]
    | advp? vbp_to_inf_cl            advp? to_inf_cl_np_moved                             {%nt("fin_vp_np_moved")%} # I know what you [ask to bring]
    | advp? vbp_bare_inf_cl          advp? bare_inf_cl_np_moved                           {%nt("fin_vp_np_moved")%} # I know what you [help bring]
    | advp? vbp_declarative_cl       advp? declarative_cl_np_moved                        {%nt("fin_vp_np_moved")%} # I know what you [say that you bring]
    |       vbp_vbg_cl                     vbg_cl_np_moved                                {%nt("fin_vp_np_moved")%} # I know what you [are bringing]
    |       vbp_vbn_cl                     vbn_cl_np_moved                                {%nt("fin_vp_np_moved")%} # I know what you [have brought] OR I know what you [were brought]
    | advp? vbp_np                   advp?                                                {%nt("fin_vp_np_moved")%} # I know what you [bring]
    | advp? vbp_np_pp                advp? pp                                             {%nt("fin_vp_np_moved")%} # I know what you [put on the table]
    | advp? vbp_np_pp                advp? np                     preposition             {%nt("fin_vp_np_moved")%} # I know what you [put the book on]
    | advp? vbp_np_ap                advp? ap                                             {%nt("fin_vp_np_moved")%} # I know who you [consider good at chess]
    | advp? vbp_np_ap                advp? np                     ap_np_moved             {%nt("fin_vp_np_moved")%} # I know what you [consider Bob good at]
    | advp? vbp_np_to_inf_cl         advp? to_inf_cl                                      {%nt("fin_vp_np_moved")%} # I know who you [ask to bring cheese]
    | advp? vbp_np_to_inf_cl         advp? np                     to_inf_cl_np_moved      {%nt("fin_vp_np_moved")%} # I know what you [ask Bob to bring]
    | advp? vbp_np_bare_inf_cl       advp? bare_inf_cl                                    {%nt("fin_vp_np_moved")%} # I know who you [help bring cheese]
    | advp? vbp_np_bare_inf_cl       advp? np                     bare_inf_cl_np_moved    {%nt("fin_vp_np_moved")%} # I know what you [help Bob bring]
    | advp? vbp_np_declarative_cl    advp? declarative_cl                                 {%nt("fin_vp_np_moved")%} # I know who you [tell that you bring cheese]
    | advp? vbp_np_declarative_cl    advp? np                     declarative_cl_np_moved {%nt("fin_vp_np_moved")%} # I know what you [tell Bob that you bring]
    | advp? vbp_np_exclamative_cl    advp? exclamative_cl                                 {%nt("fin_vp_np_moved")%} # I know who you [tell how expensive it is]
    | advp? vbp_np_interrogative_cl  advp? interrogative_cl                               {%nt("fin_vp_np_moved")%} # I know who you [ask what Bob brings]
    | advp? vbp_np_np                advp? np                                             {%nt("fin_vp_np_moved")%} # I know what you [give Bob]
    | advp? vbp_np_np                advp? to                     np                      {%nt("fin_vp_np_moved")%} # I know who you [give the book to]
# complete present verb phrase (3rd person singular) (move argument)
    | advp? vbz_pp                   advp? preposition                                    {%nt("fin_vp_np_moved")%} # I know what he [talks about]
    | advp? vbz_ap                   advp? ap_np_moved                                    {%nt("fin_vp_np_moved")%} # I know what he [seems good at]
    | advp? vbz_to_inf_cl            advp? to_inf_cl_np_moved                             {%nt("fin_vp_np_moved")%} # I know what he [asks to bring]
    | advp? vbz_bare_inf_cl          advp? bare_inf_cl_np_moved                           {%nt("fin_vp_np_moved")%} # I know what he [helps bring]
    | advp? vbz_declarative_cl       advp? declarative_cl_np_moved                        {%nt("fin_vp_np_moved")%} # I know what he [says that you bring]
    |       vbz_vbg_cl                     vbg_cl_np_moved                                {%nt("fin_vp_np_moved")%} # I know what he [was bringing]
    |       vbz_vbn_cl                     vbn_cl_np_moved                                {%nt("fin_vp_np_moved")%} # I know what he [has brought] OR I know what he [was brought]
    | advp? vbz_np                   advp?                                                {%nt("fin_vp_np_moved")%} # I know what he [brings]
    | advp? vbz_np_pp                advp? pp                                             {%nt("fin_vp_np_moved")%} # I know what he [puts on the table]
    | advp? vbz_np_pp                advp? np                     preposition             {%nt("fin_vp_np_moved")%} # I know what he [puts the book on]
    | advp? vbz_np_ap                advp? ap                                             {%nt("fin_vp_np_moved")%} # I know who he [considers good at chess]
    | advp? vbz_np_ap                advp? np                     ap_np_moved             {%nt("fin_vp_np_moved")%} # I know what he [considers Bob good at]
    | advp? vbz_np_to_inf_cl         advp? to_inf_cl                                      {%nt("fin_vp_np_moved")%} # I know who he [asks to bring cheese]
    | advp? vbz_np_to_inf_cl         advp? np                     to_inf_cl_np_moved      {%nt("fin_vp_np_moved")%} # I know what he [asks Bob to bring]
    | advp? vbz_np_bare_inf_cl       advp? bare_inf_cl                                    {%nt("fin_vp_np_moved")%} # I know who he [helps bring cheese]
    | advp? vbz_np_bare_inf_cl       advp? np                     bare_inf_cl_np_moved    {%nt("fin_vp_np_moved")%} # I know what he [helps Bob bring]
    | advp? vbz_np_declarative_cl    advp? declarative_cl                                 {%nt("fin_vp_np_moved")%} # I know who he [tells that you bring cheese]
    | advp? vbz_np_declarative_cl    advp? np                     declarative_cl_np_moved {%nt("fin_vp_np_moved")%} # I know what he [tells Bob that you bring]
    | advp? vbz_np_exclamative_cl    advp? exclamative_cl                                 {%nt("fin_vp_np_moved")%} # I know who he [tells how expensive it is]
    | advp? vbz_np_interrogative_cl  advp? interrogative_cl                               {%nt("fin_vp_np_moved")%} # I know who he [asks what Bob brings]
    | advp? vbz_np_np                advp? np                                             {%nt("fin_vp_np_moved")%} # I know what he [gives Bob]
    | advp? vbz_np_np                advp? to                     np                      {%nt("fin_vp_np_moved")%} # I know who he [gives the book to]


# non-finite verb phrase with a prepositional phrase moved
fin_vp_pp_moved ->
# preterite verb phrase
      advp? vbd_pp                   advp?                                              {%nt("fin_vp_pp_moved")%} # I know to where [you went]
    | advp? vbd_ap                   advp?  ap_pp_moved                                 {%nt("fin_vp_pp_moved")%} # I know at what [you seemed good]
    | advp? vbd_to_inf_cl            advp?  to_inf_cl_pp_moved                          {%nt("fin_vp_pp_moved")%} # I know to where [you asked to go]
    | advp? vbd_bare_inf_cl          advp?  bare_inf_cl_pp_moved                        {%nt("fin_vp_pp_moved")%} # I know to where [you helped go]
    | advp? vbd_declarative_cl       advp?  declarative_cl_pp_moved                     {%nt("fin_vp_pp_moved")%} # I know to where [you said that you go]
    |       vbd_vbg_cl                      vbg_cl_pp_moved                             {%nt("fin_vp_np_moved")%} # I know to where [he was going]
    |       vbd_vbn_cl                      vbn_cl_pp_moved                             {%nt("fin_vp_np_moved")%} # I know at what he [has looked] OR I know on what [the book was put]
    | advp? vbd_np_pp                advp?  np                                          {%nt("fin_vp_pp_moved")%} # I know on what you [put the book]
    | advp? vbd_np_ap                advp?  np               ap_pp_moved                {%nt("fin_vp_pp_moved")%} # I know at what you [considered Bob good]
    | advp? vbd_np_to_inf_cl         advp?  np               to_inf_cl_pp_moved         {%nt("fin_vp_pp_moved")%} # I know to where you [asked Bob to go]
    | advp? vbd_np_bare_inf_cl       advp?  np               bare_inf_cl_pp_moved       {%nt("fin_vp_pp_moved")%} # I know to where you [helped Bob go]
    | advp? vbd_np_declarative_cl    advp?  np               declarative_cl_pp_moved    {%nt("fin_vp_pp_moved")%} # I know to where you [told Bob that you go]
# present verb phrase (non 3rd person singular) 
    | advp? vbp_pp                   advp?                                              {%nt("fin_vp_pp_moved")%} # I know to where you [go]
    | advp? vbp_ap                   advp?  ap_pp_moved                                 {%nt("fin_vp_pp_moved")%} # I know at what you [seem good]
    | advp? vbp_to_inf_cl            advp?  to_inf_cl_pp_moved                          {%nt("fin_vp_pp_moved")%} # I know to where you [ask to go]
    | advp? vbp_bare_inf_cl          advp?  bare_inf_cl_pp_moved                        {%nt("fin_vp_pp_moved")%} # I know to where you [help go]
    | advp? vbp_declarative_cl       advp?  declarative_cl_pp_moved                     {%nt("fin_vp_pp_moved")%} # I know to where you [say that you go]
    |       vbp_vbg_cl                      vbg_cl_pp_moved                             {%nt("fin_vp_np_moved")%} # I know to where you [are going]
    |       vbp_vbn_cl                      vbn_cl_pp_moved                             {%nt("fin_vp_np_moved")%} # I know at what you [have looked] OR I know on what [the book is put]
    | advp? vbp_np_pp                advp?  np                                          {%nt("fin_vp_pp_moved")%} # I know on what you [put the book]
    | advp? vbp_np_ap                advp?  np               ap_pp_moved                {%nt("fin_vp_pp_moved")%} # I know at what you [consider Bob good]
    | advp? vbp_np_to_inf_cl         advp?  np               to_inf_cl_pp_moved         {%nt("fin_vp_pp_moved")%} # I know to where you [ask Bob to go]
    | advp? vbp_np_bare_inf_cl       advp?  np               bare_inf_cl_pp_moved       {%nt("fin_vp_pp_moved")%} # I know to where you [help Bob go]
    | advp? vbp_np_declarative_cl    advp?  np               declarative_cl_pp_moved    {%nt("fin_vp_pp_moved")%} # I know to where you [tell Bob that you go]
# present verb phrase (3rd person singular)
    | advp? vbz_pp                   advp?                                              {%nt("fin_vp_pp_moved")%} # I know to where he [goes]
    | advp? vbz_ap                   advp?  ap_pp_moved                                 {%nt("fin_vp_pp_moved")%} # I know at what he [seems good]
    | advp? vbz_to_inf_cl            advp?  to_inf_cl_pp_moved                          {%nt("fin_vp_pp_moved")%} # I know to where he [asks to go]
    | advp? vbz_bare_inf_cl          advp?  bare_inf_cl_pp_moved                        {%nt("fin_vp_pp_moved")%} # I know to where he [helps go]
    | advp? vbz_declarative_cl       advp?  declarative_cl_pp_moved                     {%nt("fin_vp_pp_moved")%} # I know to where he [says that you go]
    |       vbz_vbg_cl                      vbg_cl_pp_moved                             {%nt("fin_vp_np_moved")%} # I know to where he [is going]
    |       vbz_vbn_cl                      vbn_cl_pp_moved                             {%nt("fin_vp_np_moved")%} # I know at what he [has looked] OR I know on what [the book is put]
    | advp? vbz_np_pp                advp?  np                                          {%nt("fin_vp_pp_moved")%} # I know on what you [put the book]
    | advp? vbz_np_ap                advp?  np               ap_pp_moved                {%nt("fin_vp_pp_moved")%} # I know at what you [consider Bob good]
    | advp? vbz_np_to_inf_cl         advp?  np               to_inf_cl_pp_moved         {%nt("fin_vp_pp_moved")%} # I know to where you [ask Bob to go]
    | advp? vbz_np_bare_inf_cl       advp?  np               bare_inf_cl_pp_moved       {%nt("fin_vp_pp_moved")%} # I know to where you [help Bob go]
    | advp? vbz_np_declarative_cl    advp?  np               declarative_cl_pp_moved    {%nt("fin_vp_pp_moved")%} # I know to where you [tell Bob that you go]

fin_vp_ap_moved -> 
# complete preterite verb phrase
      advp? vbd_ap                  advp?                                         {%nt("fin_vp_ap_moved")%} # intransitive verb with adjective phrase argument (ex: "I know how happy you [seemed]")
    | advp? vbd_to_inf_cl           advp? to_inf_cl_ap_moved                      {%nt("fin_vp_ap_moved")%} # intransitive verb with infinitive clause argument (ex: "I know how happy you [wanted to seem]")
    | advp? vbd_bare_inf_cl         advp? bare_inf_cl_ap_moved                    {%nt("fin_vp_ap_moved")%} # intransitive verb with bare infinitive clause argument (ex: "I know how tall you [could grow]") 
    | advp? vbd_declarative_cl      advp? declarative_cl_ap_moved                 {%nt("fin_vp_ap_moved")%} # intransitive verb with declarative content clause argument (ex: "I know how happy you [knew that you are]")
    |       vbd_vbg_cl                    vbg_cl_ap_moved                         {%nt("fin_vp_ap_moved")%} # past continuous (ex: "I know how happy you [were seeming]")
    |       vbd_vbn_cl                    vbn_cl_ap_moved                         {%nt("fin_vp_ap_moved")%} # past perfect (ex: "I know how happy you [had seemed]") OR passive voice (ex: "I know how good bob [was considered]")
    | advp? vbd_np_ap               advp? np                                      {%nt("fin_vp_ap_moved")%} # transitive verb with adjective phrase argument (ex: "I know how happy I [found you]")
    | advp? vbd_np_to_inf_cl        advp? np              to_inf_cl_ap_moved      {%nt("fin_vp_ap_moved")%} # transitive verb with infinitive verb argument (ex: "I know how skilled I [asked you to become]")
    | advp? vbd_np_bare_inf_cl      advp? np              bare_inf_cl_ap_moved    {%nt("fin_vp_ap_moved")%} # transitive verb with bare infinitive verb argument (ex: "I know how skilled bob [made you become]")
    | advp? vbd_np_declarative_cl   advp? np              declarative_cl_ap_moved {%nt("fin_vp_ap_moved")%} # transitive verb with declarative content clause argument (ex: "I know how happy I [told you that you are]")
# complete present verb phrase (non 3rd person singular)
    | advp? vbp_ap                  advp?                                         {%nt("fin_vp_ap_moved")%} # intransitive verb with adjective phrase argument (ex: "I know how happy you [seem]")
    | advp? vbp_to_inf_cl           advp? to_inf_cl_ap_moved                      {%nt("fin_vp_ap_moved")%} # intransitive verb with infinitive clause argument (ex: "I know how happy you [want to seem]")
    | advp? vbp_bare_inf_cl         advp? bare_inf_cl_ap_moved                    {%nt("fin_vp_ap_moved")%} # intransitive verb with bare infinitive clause argument (ex: "I know how tall you [can grow]") 
    | advp? vbp_declarative_cl      advp? declarative_cl_ap_moved                 {%nt("fin_vp_ap_moved")%} # intransitive verb with declarative content clause argument (ex: "I know how happy you [know that you are]")
    |       vbp_vbg_cl                    vbg_cl_ap_moved                         {%nt("fin_vp_ap_moved")%} # present continuous (ex: "I know how happy you [are seeming]")
    |       vbp_vbn_cl                    vbn_cl_ap_moved                         {%nt("fin_vp_ap_moved")%} # present perfect (ex: "I know how happy you [have seemed]") OR passive voice (ex: "I know how good you [are considered]")
    | advp? vbp_np_ap               advp? np                                      {%nt("fin_vp_ap_moved")%} # transitive verb with adjective phrase argument (ex: "I know how happy I [find you]")
    | advp? vbp_np_to_inf_cl        advp? np              to_inf_cl_ap_moved      {%nt("fin_vp_ap_moved")%} # transitive verb with infinitive verb argument (ex: "I know how skilled I [ask you to become]")
    | advp? vbp_np_bare_inf_cl      advp? np              bare_inf_cl_ap_moved    {%nt("fin_vp_ap_moved")%} # transitive verb with bare infinitive verb argument (ex: "I know how skilled they [make you become]")
    | advp? vbp_np_declarative_cl   advp? np              declarative_cl_ap_moved {%nt("fin_vp_ap_moved")%} # transitive verb with declarative content clause argument (ex: "I know how happy I [tell you that you are]")
# complete present verb phrase (3rd person singular)
    | advp? vbz_ap                  advp?                                         {%nt("fin_vp_ap_moved")%} # intransitive verb with adjective phrase argument (ex: "I know how happy you [seem]")
    | advp? vbz_to_inf_cl           advp? to_inf_cl_ap_moved                      {%nt("fin_vp_ap_moved")%} # intransitive verb with infinitive clause argument (ex: "I know how happy you [want to seem]")
    | advp? vbz_bare_inf_cl         advp? bare_inf_cl_ap_moved                    {%nt("fin_vp_ap_moved")%} # intransitive verb with bare infinitive clause argument (ex: "I know how tall you [can grow]") 
    | advp? vbz_declarative_cl      advp? declarative_cl_ap_moved                 {%nt("fin_vp_ap_moved")%} # intransitive verb with declarative content clause argument (ex: "I know how happy you [know that you are]")
    |       vbz_vbg_cl                    vbg_cl_ap_moved                         {%nt("fin_vp_ap_moved")%} # present continuous (ex: "I know how happy he [is seeming]")
    |       vbz_vbn_cl                    vbn_cl_ap_moved                         {%nt("fin_vp_ap_moved")%} # present perfect (ex: "I know how happy he [has seemed]") OR passive voice (ex: "I know how good bob [is considered]")
    | advp? vbz_np_ap               advp? np                                      {%nt("fin_vp_ap_moved")%} # transitive verb with adjective phrase argument (ex: "I know how happy he [finds you]")
    | advp? vbz_np_to_inf_cl        advp? np              to_inf_cl_ap_moved      {%nt("fin_vp_ap_moved")%} # transitive verb with infinitive verb argument (ex: "I know how skilled he [asks you to become]")
    | advp? vbz_np_bare_inf_cl      advp? np              bare_inf_cl_ap_moved    {%nt("fin_vp_ap_moved")%} # transitive verb with bare infinitive verb argument (ex: "I know how skilled he [makes you become]")
    | advp? vbz_np_declarative_cl   advp? np              declarative_cl_ap_moved {%nt("fin_vp_ap_moved")%} # transitive verb with declarative content clause argument (ex: "I know how happy he [tells you that you are]")

# a non-finite clause starting with "to"
to_inf_cl -> to bare_inf_cl                                  {%nt("to_inf_cl")%}
to_inf_cl_np_moved -> to bare_inf_cl_np_moved                {%nt("to_inf_cl_np_moved")%}
to_inf_cl_pp_moved -> to bare_inf_cl_pp_moved                {%nt("to_inf_cl_pp_moved")%}
to_inf_cl_ap_moved -> to bare_inf_cl_ap_moved                {%nt("to_inf_cl_pp_moved")%}


# a non-finite clause with a bare infinitive
bare_inf_cl -> inf_vp pp_list                                {%nt("bare_inf_cl")%}
bare_inf_cl_np_moved -> inf_vp_np_moved pp_list              {%nt("bare_inf_cl_np_moved")%}
bare_inf_cl_pp_moved -> inf_vp_pp_moved pp_list              {%nt("bare_inf_cl_pp_moved")%}
bare_inf_cl_ap_moved -> inf_vp_ap_moved pp_list              {%nt("bare_inf_cl_ap_moved")%}

# a non-finite verb phrase
inf_vp ->
      advp? vb                      advp?                                      {%nt("inf_vp")%} # intransitive verb (ex: "to smoke")
    | advp? vb_pp                   advp? pp                                   {%nt("inf_vp")%} # intransitive verb with prepositional phrase argument (ex: "to look at the book")
    | advp? vb_ap                   advp? ap                                   {%nt("inf_vp")%} # intransitive verb with adjective phrase argument (ex: "to seem happy")
    | advp? vb_to_inf_cl            advp? to_inf_cl                            {%nt("inf_vp")%} # intransitive verb with infinitive clause argument (ex: "to want to eat")
    | advp? vb_bare_inf_cl          advp? bare_inf_cl                          {%nt("inf_vp")%} # intransitive verb with bare infinitive clause argument (ex: "to help eat")
    | advp? vb_declarative_cl       advp? declarative_cl                       {%nt("inf_vp")%} # intransitive verb with declarative content clause argument (ex: "to know that you eat")
    | advp? vb_exclamative_cl       advp? exclamative_cl                       {%nt("inf_vp")%} # intransitive verb with exclamative content clause argument (ex: "to say how expensive it was.")
    | advp? vb_interrogative_cl     advp? interrogative_cl                     {%nt("inf_vp")%} # intransitive verb with interrogative clause argument (ex: "to know what you eat")
    |       vb_vbg_cl                     vbg_cl                               {%nt("inf_vp")%} # present continuous (ex: "to be eating")
    |       vb_vbn_cl                     vbn_cl                               {%nt("inf_vp")%} # present perfect (ex: "to have eaten") OR passive voice (ex: "to be eaten")
    | advp? vb_np                   advp? np                                   {%nt("inf_vp")%} # transitive verb (ex: "to eat food")    
    | advp? vb_np_pp                advp? np               pp                  {%nt("inf_vp")%} # transitive verb with prepositional phrase argument (ex: "to put the book on the table")
    | advp? vb_np_ap                advp? np               ap                  {%nt("inf_vp")%} # transitive verb with adjective phrase argument (ex: "to find you happy")
    | advp? vb_np_to_inf_cl         advp? np               to_inf_cl           {%nt("inf_vp")%} # transitive verb with infinitive verb argument (ex: "to ask you to eat")
    | advp? vb_np_bare_inf_cl       advp? np               bare_inf_cl         {%nt("inf_vp")%} # transitive verb with bare infinitive verb argument (ex: "to make you eat")
    | advp? vb_np_declarative_cl    advp? np               declarative_cl      {%nt("inf_vp")%} # transitive verb with declarative content clause argument (ex: "to tell you that you eat")
    | advp? vb_np_exclamative_cl    advp? np               exclamative_cl      {%nt("inf_vp")%} # transitive verb with exclamative content clause argument (ex: "to tell you how expensive it was")
    | advp? vb_np_interrogative_cl  advp? np               interrogative_cl    {%nt("inf_vp")%} # transitive verb with interrogative clause argument (ex: "to ask you what you eat")
    | advp? vb_np_np                advp? np               np                  {%nt("inf_vp")%} # ditransitive verb (ex: "to give you food")

# non-finite verb phrase with a noun phrase moved
inf_vp_np_moved ->
      advp? vb_pp                   advp? preposition                                    {%nt("inf_vp_np_moved")%} # I know what you want to [talk about]
    | advp? vb_ap                   advp? ap_np_moved                                    {%nt("inf_vp_np_moved")%} # I know what you want to [seem good at]
    | advp? vb_to_inf_cl            advp? to_inf_cl_np_moved                             {%nt("inf_vp_np_moved")%} # I know what you want to [ask to bring]
    | advp? vb_bare_inf_cl          advp? bare_inf_cl_np_moved                           {%nt("inf_vp_np_moved")%} # I know what you want to [help bring]
    | advp? vb_declarative_cl       advp? declarative_cl_np_moved                        {%nt("inf_vp_np_moved")%} # I know what you want to [say that you bring]
    |       vb_vbg_cl                     vbg_cl_np_moved                                {%nt("inf_vp_np_moved")%} # I know what you want to [be bringing]
    |       vb_vbn_cl                     vbn_cl_np_moved                                {%nt("inf_vp_np_moved")%} # I know what you want to [have brought] OR I know what you want to [be brought]
    | advp? vb_np                   advp?                                                {%nt("inf_vp_np_moved")%} # I know what you want to [bring]
    | advp? vb_np_pp                advp? pp                                             {%nt("inf_vp_np_moved")%} # I know what you want to [put on the table]
    | advp? vb_np_pp                advp? np                     preposition             {%nt("inf_vp_np_moved")%} # I know what you want to [put the book on]
    | advp? vb_np_ap                advp? ap                                             {%nt("inf_vp_np_moved")%} # I know who you want to [consider good at chess]
    | advp? vb_np_ap                advp? np                     ap_np_moved             {%nt("inf_vp_np_moved")%} # I know what you want to [consider Bob good at]
    | advp? vb_np_to_inf_cl         advp? to_inf_cl                                      {%nt("inf_vp_np_moved")%} # I know who you want to [ask to bring cheese]
    | advp? vb_np_to_inf_cl         advp? np                     to_inf_cl_np_moved      {%nt("inf_vp_np_moved")%} # I know what you want to [ask Bob to bring]
    | advp? vb_np_bare_inf_cl       advp? bare_inf_cl                                    {%nt("inf_vp_np_moved")%} # I know who you want to [help bring cheese]
    | advp? vb_np_bare_inf_cl       advp? np                     bare_inf_cl_np_moved    {%nt("inf_vp_np_moved")%} # I know what you want to [help Bob bring]
    | advp? vb_np_declarative_cl    advp? declarative_cl                                 {%nt("inf_vp_np_moved")%} # I know who you want to [tell that you bring cheese]
    | advp? vb_np_declarative_cl    advp? np                     declarative_cl_np_moved {%nt("inf_vp_np_moved")%} # I know what you want to [tell Bob that you bring]
    | advp? vb_np_exclamative_cl    advp? exclamative_cl                                 {%nt("inf_vp_np_moved")%} # I know who you want to [tell how expensive it is]
    | advp? vb_np_interrogative_cl  advp? interrogative_cl                               {%nt("inf_vp_np_moved")%} # I know who you want to [ask what Bob brings]
    | advp? vb_np_np                advp? np                                             {%nt("inf_vp_np_moved")%} # I know what you want to [give Bob]
    | advp? vb_np_np                advp? to                     np                      {%nt("inf_vp_np_moved")%} # I know who you want to [give the book to]


# non-finite verb phrase with a prepositional phrase moved
inf_vp_pp_moved ->
      advp? vb_pp                   advp?                                                 {%nt("inf_vp_pp_moved")%} # I know to where you want to [go]
    | advp? vb_ap                   advp?     ap_pp_moved                                 {%nt("inf_vp_pp_moved")%} # I know at what you want to [seem good]
    | advp? vb_to_inf_cl            advp?     to_inf_cl_pp_moved                          {%nt("inf_vp_pp_moved")%} # I know to where you want to [ask to go]
    | advp? vb_bare_inf_cl          advp?     bare_inf_cl_pp_moved                        {%nt("inf_vp_pp_moved")%} # I know to where you want to [help go]
    | advp? vb_declarative_cl       advp?     declarative_cl_pp_moved                     {%nt("inf_vp_pp_moved")%} # I know to where you want to [say that you go]
    | advp? vb_np_pp                advp?     np                                          {%nt("inf_vp_pp_moved")%} # I know on what you want to [put the book]
    | advp? vb_np_ap                advp?     np               ap_pp_moved                {%nt("inf_vp_pp_moved")%} # I know at what you want to [consider Bob good]
    | advp? vb_np_to_inf_cl         advp?     np               to_inf_cl_pp_moved         {%nt("inf_vp_pp_moved")%} # I know to where you want to [ask Bob to go]
    | advp? vb_np_bare_inf_cl       advp?     np               bare_inf_cl_pp_moved       {%nt("inf_vp_pp_moved")%} # I know to where you want to [help Bob go]
    | advp? vb_np_declarative_cl    advp?     np               declarative_cl_pp_moved    {%nt("inf_vp_pp_moved")%} # I know to where you want to [tell Bob that you go]


inf_vp_ap_moved ->
      advp? vb_ap                  advp?                                         {%nt("inf_vp_ap_moved")%} # intransitive verb with adjective phrase argument (ex: "I know how happy you want to [seem]")
    | advp? vb_to_inf_cl           advp? to_inf_cl_ap_moved                      {%nt("inf_vp_ap_moved")%} # intransitive verb with infinitive clause argument (ex: "I know how happy you want to [try to seem]")
    | advp? vb_bare_inf_cl         advp? bare_inf_cl_ap_moved                    {%nt("inf_vp_ap_moved")%} # intransitive verb with bare infinitive clause argument (ex: "I know how happy you want to [help seem]") 
    | advp? vb_declarative_cl      advp? declarative_cl_ap_moved                 {%nt("inf_vp_ap_moved")%} # intransitive verb with declarative content clause argument (ex: "I know how happy you want to [know that you are]")
    |       vb_vbg_cl                    vbg_cl_ap_moved                         {%nt("inf_vp_ap_moved")%} # past continuous (ex: "I know how happy you want to [be seeming]")
    |       vb_vbn_cl                    vbn_cl_ap_moved                         {%nt("inf_vp_ap_moved")%} # past perfect (ex: "I know how happy you want to [have seemed]") OR passive voice (ex: "I know how good bob wanted to [be considered]")
    | advp? vb_np_ap               advp? np                                      {%nt("inf_vp_ap_moved")%} # transitive verb with adjective phrase argument (ex: "I know how happy I want to [find you]")
    | advp? vb_np_to_inf_cl        advp? np              to_inf_cl_ap_moved      {%nt("inf_vp_ap_moved")%} # transitive verb with infinitive verb argument (ex: "I know how skilled I want to [ask you to become]")
    | advp? vb_np_bare_inf_cl      advp? np              bare_inf_cl_ap_moved    {%nt("inf_vp_ap_moved")%} # transitive verb with bare infinitive verb argument (ex: "I know how skilled bob wants to [make you become]")
    | advp? vb_np_declarative_cl   advp? np              declarative_cl_ap_moved {%nt("inf_vp_ap_moved")%} # transitive verb with declarative content clause argument (ex: "I know how happy I want to [tell you that you are]")

vbn_cl          -> vbn_vp          pp_list                 {%nt("vbn_cl")%}
vbn_cl_np_moved -> vbn_vp_np_moved pp_list                 {%nt("vbn_cl_np_moved")%}
vbn_cl_pp_moved -> vbn_vp_pp_moved pp_list                 {%nt("vbn_cl_pp_moved")%}
vbn_cl_ap_moved -> vbn_vp_ap_moved pp_list                 {%nt("vbn_cl_ap_moved")%}

# a past participle verb phrase
vbn_vp ->
      advp? vbn                      advp?                                      {%nt("vbn_vp")%} # intransitive verb (ex: "to smoke")
    | advp? vbn_pp                   advp? pp                                   {%nt("vbn_vp")%} # intransitive verb with prepositional phrase argument (ex: "to look at the book")
    | advp? vbn_ap                   advp? ap                                   {%nt("vbn_vp")%} # intransitive verb with adjective phrase argument (ex: "to seem happy")
    | advp? vbn_to_inf_cl            advp? to_inf_cl                            {%nt("vbn_vp")%} # intransitive verb with infinitive clause argument (ex: "to want to eat")
    | advp? vbn_bare_inf_cl          advp? bare_inf_cl                          {%nt("vbn_vp")%} # intransitive verb with bare infinitive clause argument (ex: "to help eat")
    | advp? vbn_declarative_cl       advp? declarative_cl                       {%nt("vbn_vp")%} # intransitive verb with declarative content clause argument (ex: "to know that you eat")
    | advp? vbn_exclamative_cl       advp? exclamative_cl                       {%nt("vbn_vp")%} # intransitive verb with exclamative content clause argument (ex: "to say how expensive it was.")
    | advp? vbn_interrogative_cl     advp? interrogative_cl                     {%nt("vbn_vp")%} # intransitive verb with interrogative clause argument (ex: "to know what you eat")
    |       vbn_vbg_cl                     vbg_cl                               {%nt("vbn_vp")%} # present continuous (ex: "to be eating")
    |       vbn_vbn_cl                     vbn_cl                               {%nt("vbn_vp")%} # present perfect (ex: "to have eaten") OR passive voice (ex: "to be eaten")
    | advp? vbn_np                   advp? np                                   {%nt("vbn_vp")%} # transitive verb (ex: "to eat food")    
    | advp? vbn_np_pp                advp? np               pp                  {%nt("vbn_vp")%} # transitive verb with prepositional phrase argument (ex: "to put the book on the table")
    | advp? vbn_np_ap                advp? np               ap                  {%nt("vbn_vp")%} # transitive verb with adjective phrase argument (ex: "to find you happy")
    | advp? vbn_np_to_inf_cl         advp? np               to_inf_cl           {%nt("vbn_vp")%} # transitive verb with infinitive verb argument (ex: "to ask you to eat")
    | advp? vbn_np_bare_inf_cl       advp? np               bare_inf_cl         {%nt("vbn_vp")%} # transitive verb with bare infinitive verb argument (ex: "to make you eat")
    | advp? vbn_np_declarative_cl    advp? np               declarative_cl      {%nt("vbn_vp")%} # transitive verb with declarative content clause argument (ex: "to tell you that you eat")
    | advp? vbn_np_exclamative_cl    advp? np               exclamative_cl      {%nt("vbn_vp")%} # transitive verb with exclamative content clause argument (ex: "to tell you how expensive it was")
    | advp? vbn_np_interrogative_cl  advp? np               interrogative_cl    {%nt("vbn_vp")%} # transitive verb with interrogative clause argument (ex: "to ask you what you eat")
    | advp? vbn_np_np                advp? np               np                  {%nt("vbn_vp")%} # ditransitive verb (ex: "to give you food")

# past participle verb phrase with a noun phrase moved
vbn_vp_np_moved ->
      advp? vbn_pp                   advp? preposition                                    {%nt("vbn_vp_np_moved")%} # I know what you have [talked about]
    | advp? vbn_ap                   advp? ap_np_moved                                    {%nt("vbn_vp_np_moved")%} # I know what you have [seemed good at]
    | advp? vbn_to_inf_cl            advp? to_inf_cl_np_moved                             {%nt("vbn_vp_np_moved")%} # I know what you have [asked to bring]
    | advp? vbn_bare_inf_cl          advp? bare_inf_cl_np_moved                           {%nt("vbn_vp_np_moved")%} # I know what you have [helped bring]
    | advp? vbn_declarative_cl       advp? declarative_cl_np_moved                        {%nt("vbn_vp_np_moved")%} # I know what you have [said that you bring]
    |       vbn_vbg_cl                     vbg_cl_np_moved                                {%nt("vbn_vp_np_moved")%} # I know what you have [been bringing]
    |       vbn_vbn_cl                     vbn_cl_np_moved                                {%nt("vbn_vp_np_moved")%} # I know what you have [had brought] OR I know what you have [been brought]
    | advp? vbn_np                   advp?                                                {%nt("vbn_vp_np_moved")%} # I know what you have [brought]
    | advp? vbn_np_pp                advp? pp                                             {%nt("vbn_vp_np_moved")%} # I know what you have [put on the table]
    | advp? vbn_np_pp                advp? np                     preposition             {%nt("vbn_vp_np_moved")%} # I know what you have [put the book on]
    | advp? vbn_np_ap                advp? ap                                             {%nt("vbn_vp_np_moved")%} # I know who you have [considered good at chess]
    | advp? vbn_np_ap                advp? np                     ap_np_moved             {%nt("vbn_vp_np_moved")%} # I know what you have [considered Bob good at]
    | advp? vbn_np_to_inf_cl         advp? to_inf_cl                                      {%nt("vbn_vp_np_moved")%} # I know who you have [asked to bring cheese]
    | advp? vbn_np_to_inf_cl         advp? np                     to_inf_cl_np_moved      {%nt("vbn_vp_np_moved")%} # I know what you have [asked Bob to bring]
    | advp? vbn_np_bare_inf_cl       advp? bare_inf_cl                                    {%nt("vbn_vp_np_moved")%} # I know who you have [helped bring cheese]
    | advp? vbn_np_bare_inf_cl       advp? np                     bare_inf_cl_np_moved    {%nt("vbn_vp_np_moved")%} # I know what you have [helped Bob bring]
    | advp? vbn_np_declarative_cl    advp? declarative_cl                                 {%nt("vbn_vp_np_moved")%} # I know who you have [told that you bring cheese]
    | advp? vbn_np_declarative_cl    advp? np                     declarative_cl_np_moved {%nt("vbn_vp_np_moved")%} # I know what you have [told Bob that you bring]
    | advp? vbn_np_exclamative_cl    advp? exclamative_cl                                 {%nt("vbn_vp_np_moved")%} # I know who you have [told how expensive it is]
    | advp? vbn_np_interrogative_cl  advp? interrogative_cl                               {%nt("vbn_vp_np_moved")%} # I know who you have [asked what Bob brings]
    | advp? vbn_np_np                advp? np                                             {%nt("vbn_vp_np_moved")%} # I know what you have [given Bob]
    | advp? vbn_np_np                advp? to                     np                      {%nt("vbn_vp_np_moved")%} # I know who you have [given the book to]


# past participle verb phrase with a prepositional phrase moved
vbn_vp_pp_moved ->
      advp? vbn_pp                   advp?                                                 {%nt("vbn_vp_pp_moved")%} # I know to where you have [gone]
    | advp? vbn_ap                   advp?     ap_pp_moved                                 {%nt("vbn_vp_pp_moved")%} # I know at what you have [seemed good]
    | advp? vbn_to_inf_cl            advp?     to_inf_cl_pp_moved                          {%nt("vbn_vp_pp_moved")%} # I know to where you have [asked to go]
    | advp? vbn_bare_inf_cl          advp?     bare_inf_cl_pp_moved                        {%nt("vbn_vp_pp_moved")%} # I know to where you have [helped go]
    | advp? vbn_declarative_cl       advp?     declarative_cl_pp_moved                     {%nt("vbn_vp_pp_moved")%} # I know to where you have [said that you go]
    | advp? vbn_np_pp                advp?     np                                          {%nt("vbn_vp_pp_moved")%} # I know on what you have [put the book]
    | advp? vbn_np_ap                advp?     np               ap_pp_moved                {%nt("vbn_vp_pp_moved")%} # I know at what you have [considered Bob good]
    | advp? vbn_np_to_inf_cl         advp?     np               to_inf_cl_pp_moved         {%nt("vbn_vp_pp_moved")%} # I know to where you have [asked Bob to go]
    | advp? vbn_np_bare_inf_cl       advp?     np               bare_inf_cl_pp_moved       {%nt("vbn_vp_pp_moved")%} # I know to where you have [helped Bob go]
    | advp? vbn_np_declarative_cl    advp?     np               declarative_cl_pp_moved    {%nt("vbn_vp_pp_moved")%} # I know to where you have [told Bob that you go]

vbn_vp_ap_moved ->
      advp? vbn_ap                  advp?                                         {%nt("vbn_vp_ap_moved")%} # intransitive verb with adjective phrase argument (ex: "I know how happy you have [seemed]")
    | advp? vbn_to_inf_cl           advp? to_inf_cl_ap_moved                      {%nt("vbn_vp_ap_moved")%} # intransitive verb with infinitive clause argument (ex: "I know how happy you have [tried to seem]")
    | advp? vbn_bare_inf_cl         advp? bare_inf_cl_ap_moved                    {%nt("vbn_vp_ap_moved")%} # intransitive verb with bare infinitive clause argument (ex: "I know how happy you have [helped seem]") 
    | advp? vbn_declarative_cl      advp? declarative_cl_ap_moved                 {%nt("vbn_vp_ap_moved")%} # intransitive verb with declarative content clause argument (ex: "I know how happy you have [known that you are]")
    |       vbn_vbg_cl                    vbg_cl_ap_moved                         {%nt("vbn_vp_ap_moved")%} # past continuous (ex: "I know how happy you have [been seeming]")
    |       vbn_vbn_cl                    vbn_cl_ap_moved                         {%nt("vbn_vp_ap_moved")%} # past perfect (ex: "I know how happy you have [seemed]") OR passive voice (ex: "I know how good bob has [been considered]")
    | advp? vbn_np_ap               advp? np                                      {%nt("vbn_vp_ap_moved")%} # transitive verb with adjective phrase argument (ex: "I know how happy I have [found you]")
    | advp? vbn_np_to_inf_cl        advp? np              to_inf_cl_ap_moved      {%nt("vbn_vp_ap_moved")%} # transitive verb with infinitive verb argument (ex: "I know how skilled I have [asked you to become]")
    | advp? vbn_np_bare_inf_cl      advp? np              bare_inf_cl_ap_moved    {%nt("vbn_vp_ap_moved")%} # transitive verb with bare infinitive verb argument (ex: "I know how skilled bob has [made you become]")
    | advp? vbn_np_declarative_cl   advp? np              declarative_cl_ap_moved {%nt("vbn_vp_ap_moved")%} # transitive verb with declarative content clause argument (ex: "I know how happy I have [told you that you are]")


vbg_cl          -> vbg_vp           pp_list                 {%nt("vbg_cl")%}
vbg_cl_np_moved -> vbg_vp_np_moved  pp_list                 {%nt("vbg_cl_np_moved")%}
vbg_cl_pp_moved -> vbg_vp_pp_moved  pp_list                 {%nt("vbg_cl_pp_moved")%}
vbg_cl_ap_moved -> vbg_vp_ap_moved  pp_list                 {%nt("vbg_cl_ap_moved")%}


# present participle / gerund verb phrase
vbg_vp ->
      advp? vbg                      advp?                                      {%nt("vbg_vp")%} # intransitive verb (ex: "smoking")
    | advp? vbg_pp                   advp? pp                                   {%nt("vbg_vp")%} # intransitive verb with prepositional phrase argument (ex: "looking at the book")
    | advp? vbg_ap                   advp? ap                                   {%nt("vbg_vp")%} # intransitive verb with adjective phrase argument (ex: "seeming happy")
    | advp? vbg_to_inf_cl            advp? to_inf_cl                            {%nt("vbg_vp")%} # intransitive verb with infinitive clause argument (ex: "wanting to eat")
    | advp? vbg_bare_inf_cl          advp? bare_inf_cl                          {%nt("vbg_vp")%} # intransitive verb with bare infinitive clause argument (ex: "helping eat")
    | advp? vbg_declarative_cl       advp? declarative_cl                       {%nt("vbg_vp")%} # intransitive verb with declarative content clause argument (ex: "knowing that you eat")
    | advp? vbg_exclamative_cl       advp? exclamative_cl                       {%nt("vbg_vp")%} # intransitive verb with exclamative content clause argument (ex: "saying how expensive it was.")
    | advp? vbg_interrogative_cl     advp? interrogative_cl                     {%nt("vbg_vp")%} # intransitive verb with interrogative clause argument (ex: "knowing what you eat")
    |       vbg_vbg_cl                     vbg_cl                               {%nt("vbg_vp")%} # present continuous (ex: "?? being eating")
    |       vbg_vbn_cl                     vbn_cl                               {%nt("vbg_vp")%} # passive voice (ex: "being eaten")
    | advp? vbg_np                   advp? np                                   {%nt("vbg_vp")%} # transitive verb (ex: "to eat food")    
    | advp? vbg_np_pp                advp? np               pp                  {%nt("vbg_vp")%} # transitive verb with prepositional phrase argument (ex: "putting the book on the table")
    | advp? vbg_np_ap                advp? np               ap                  {%nt("vbg_vp")%} # transitive verb with adjective phrase argument (ex: "finding you happy")
    | advp? vbg_np_to_inf_cl         advp? np               to_inf_cl           {%nt("vbg_vp")%} # transitive verb with infinitive verb argument (ex: "asking you to eat")
    | advp? vbg_np_bare_inf_cl       advp? np               bare_inf_cl         {%nt("vbg_vp")%} # transitive verb with bare infinitive verb argument (ex: "making you eat")
    | advp? vbg_np_declarative_cl    advp? np               declarative_cl      {%nt("vbg_vp")%} # transitive verb with declarative content clause argument (ex: "telling you that you eat")
    | advp? vbg_np_exclamative_cl    advp? np               exclamative_cl      {%nt("vbg_vp")%} # transitive verb with exclamative content clause argument (ex: "telling you how expensive it was")
    | advp? vbg_np_interrogative_cl  advp? np               interrogative_cl    {%nt("vbg_vp")%} # transitive verb with interrogative clause argument (ex: "asking you what you eat")
    | advp? vbg_np_np                advp? np               np                  {%nt("vbg_vp")%} # ditransitive verb (ex: "giving you food")


# present participle verb phrase with a noun phrase moved
vbg_vp_np_moved ->
      advp? vbg_pp                   advp? preposition                                    {%nt("vbg_vp_np_moved")%} # I know what you have [talked about]
    | advp? vbg_ap                   advp? ap_np_moved                                    {%nt("vbg_vp_np_moved")%} # I know what you have [seemed good at]
    | advp? vbg_to_inf_cl            advp? to_inf_cl_np_moved                             {%nt("vbg_vp_np_moved")%} # I know what you have [asked to bring]
    | advp? vbg_bare_inf_cl          advp? bare_inf_cl_np_moved                           {%nt("vbg_vp_np_moved")%} # I know what you have [helped bring]
    | advp? vbg_declarative_cl       advp? declarative_cl_np_moved                        {%nt("vbg_vp_np_moved")%} # I know what you have [said that you bring]
    |      vbg_vbg_cl                    vbg_cl_np_moved                                  {%nt("vbg_vp_np_moved")%} # I know what you have [been bringing]
    |      vbg_vbn_cl                    vbn_cl_np_moved                                  {%nt("vbg_vp_np_moved")%} # I know what you have [had brought] OR I know what you have [been brought]
    | advp? vbg_np                   advp?                                                {%nt("vbg_vp_np_moved")%} # I know what you have [brought]
    | advp? vbg_np_pp                advp? pp                                             {%nt("vbg_vp_np_moved")%} # I know what you have [put on the table]
    | advp? vbg_np_pp                advp? np                     preposition             {%nt("vbg_vp_np_moved")%} # I know what you have [put the book on]
    | advp? vbg_np_ap                advp? ap                                             {%nt("vbg_vp_np_moved")%} # I know who you have [considered good at chess]
    | advp? vbg_np_ap                advp? np                     ap_np_moved             {%nt("vbg_vp_np_moved")%} # I know what you have [considered Bob good at]
    | advp? vbg_np_to_inf_cl         advp? to_inf_cl                                      {%nt("vbg_vp_np_moved")%} # I know who you have [asked to bring cheese]
    | advp? vbg_np_to_inf_cl         advp? np                     to_inf_cl_np_moved      {%nt("vbg_vp_np_moved")%} # I know what you have [asked Bob to bring]
    | advp? vbg_np_bare_inf_cl       advp? bare_inf_cl                                    {%nt("vbg_vp_np_moved")%} # I know who you have [helped bring cheese]
    | advp? vbg_np_bare_inf_cl       advp? np                     bare_inf_cl_np_moved    {%nt("vbg_vp_np_moved")%} # I know what you have [helped Bob bring]
    | advp? vbg_np_declarative_cl    advp? declarative_cl                                 {%nt("vbg_vp_np_moved")%} # I know who you have [told that you bring cheese]
    | advp? vbg_np_declarative_cl    advp? np                     declarative_cl_np_moved {%nt("vbg_vp_np_moved")%} # I know what you have [told Bob that you bring]
    | advp? vbg_np_exclamative_cl    advp? exclamative_cl                                 {%nt("vbg_vp_np_moved")%} # I know who you have [told how expensive it is]
    | advp? vbg_np_interrogative_cl  advp? interrogative_cl                               {%nt("vbg_vp_np_moved")%} # I know who you have [asked what Bob brings]
    | advp? vbg_np_np                advp? np                                             {%nt("vbg_vp_np_moved")%} # I know what you have [given Bob]
    | advp? vbg_np_np                advp? to                     np                      {%nt("vbg_vp_np_moved")%} # I know who you have [given the book to]


# present participle verb phrase with a prepositional phrase moved
vbg_vp_pp_moved ->
      advp? vbg_pp                   advp?                                                 {%nt("vbg_vp_pp_moved")%} # I know to where you are [going]
    | advp? vbg_ap                   advp?     ap_pp_moved                                 {%nt("vbg_vp_pp_moved")%} # I know at what you are [seeming good]
    | advp? vbg_to_inf_cl            advp?     to_inf_cl_pp_moved                          {%nt("vbg_vp_pp_moved")%} # I know to where you are [asking to go]
    | advp? vbg_bare_inf_cl          advp?     bare_inf_cl_pp_moved                        {%nt("vbg_vp_pp_moved")%} # I know to where you are [helping go]
    | advp? vbg_declarative_cl       advp?     declarative_cl_pp_moved                     {%nt("vbg_vp_pp_moved")%} # I know to where you are [saying that you go]
    | advp? vbg_np_pp                advp?     np                                          {%nt("vbg_vp_pp_moved")%} # I know on what you are [putting the xbook]
    | advp? vbg_np_ap                advp?     np               ap_pp_moved                {%nt("vbg_vp_pp_moved")%} # I know at what you are [considering Bob good]
    | advp? vbg_np_to_inf_cl         advp?     np               to_inf_cl_pp_moved         {%nt("vbg_vp_pp_moved")%} # I know to where you are [asking Bob to go]
    | advp? vbg_np_bare_inf_cl       advp?     np               bare_inf_cl_pp_moved       {%nt("vbg_vp_pp_moved")%} # I know to where you are [helping Bob go]
    | advp? vbg_np_declarative_cl    advp?     np               declarative_cl_pp_moved    {%nt("vbg_vp_pp_moved")%} # I know to where you are [telling Bob that you go]

# present participle verb phrase with an adjective phrase moved
vbg_vp_ap_moved ->
      advp? vbg_ap                  advp?                                         {%nt("vbg_vp_ap_moved")%} # intransitive verb with adjective phrase argument (ex: "I know how happy you are [seeming]")
    | advp? vbg_to_inf_cl           advp? to_inf_cl_ap_moved                      {%nt("vbg_vp_ap_moved")%} # intransitive verb with infinitive clause argument (ex: "I know how happy you are [trying to seem]")
    | advp? vbg_bare_inf_cl         advp? bare_inf_cl_ap_moved                    {%nt("vbg_vp_ap_moved")%} # intransitive verb with bare infinitive clause argument (ex: "I know how happy you are [helping seem]") 
    | advp? vbg_declarative_cl      advp? declarative_cl_ap_moved                 {%nt("vbg_vp_ap_moved")%} # intransitive verb with declarative content clause argument (ex: "I know how happy you are [knowing that you are]")
    |       vbg_vbg_cl                    vbg_cl_ap_moved                         {%nt("vbg_vp_ap_moved")%} # past continuous (ex: "I know how happy you are [being seeming]")
    |       vbg_vbn_cl                    vbn_cl_ap_moved                         {%nt("vbg_vp_ap_moved")%} # past perfect (ex: "I know how happy you are [seeming]") OR passive voice (ex: "I know how good bob is [being considered]")
    | advp? vbg_np_ap               advp? np                                      {%nt("vbg_vp_ap_moved")%} # transitive verb with adjective phrase argument (ex: "I know how happy I am [finding you]")
    | advp? vbg_np_to_inf_cl        advp? np              to_inf_cl_ap_moved      {%nt("vbg_vp_ap_moved")%} # transitive verb with infinitive verb argument (ex: "I know how skilled I am [asking you to become]")
    | advp? vbg_np_bare_inf_cl      advp? np              bare_inf_cl_ap_moved    {%nt("vbg_vp_ap_moved")%} # transitive verb with bare infinitive verb argument (ex: "I know how skilled bob is [making you become]")
    | advp? vbg_np_declarative_cl   advp? np              declarative_cl_ap_moved {%nt("vbg_vp_ap_moved")%} # transitive verb with declarative content clause argument (ex: "I know how happy I am [telling you that you are]")


# a declarative content clause
declarative_cl ->  that decl_fin_cl                   {%nt("declarative_cl")%}

# an exclamative content clause
exclamative_cl -> 
      how advp decl_fin_cl            {%nt("exclamative_cl")%} # how quickly mary became happy
    | how ap np fin_vp_ap_moved     {%nt("exclamative_cl")%} # how happy mary became

# an interrogative content clause
interrogative_cl -> 
      wh_np                      np fin_vp_np_moved              pp_list                    {%nt("interrogative_cl")%} # open interrogative clause with move from the core arguments
    | wh_np                         fin_vp                       pp_list                    {%nt("interrogative_cl")%} # open interrogative clause with move from the agent
    | wh_pp                      np fin_vp_pp_moved              pp_list                    {%nt("interrogative_cl")%} # open interrogative clause with move from the core arguments using pied piping (ex: "at where I look")
    | wh_pp                      np fin_vp                       pp_list                    {%nt("interrogative_cl")%} # open interrogative clause with move from the adjuncts using pied piping (ex: "to where I go")
    | wh_np                      np fin_vp          preposition  pp_list                    {%nt("interrogative_cl")%} # open interrogative clause with move from the adjuncts using preposition stranding (ex: "where I go to")    
    | interrogative_subordinator np fin_vp                       pp_list                    {%nt("interrogative_cl")%} # closed interrogative clause (ex: "whether you eat the apple")

# a content clause with some np moved
declarative_cl_np_moved ->
      that    fin_vp                      pp_list          {%nt("declarative_cl_np_moved")%}
    | that np fin_vp_np_moved             pp_list          {%nt("declarative_cl_np_moved")%}
    | that np fin_vp          preposition pp_list          {%nt("declarative_cl_np_moved")%}

# a content clause with some pp moved
declarative_cl_pp_moved ->
      that np fin_vp_pp_moved    pp_list          {%nt("declarative_cl_pp_moved")%}
    | that np fin_vp             pp_list          {%nt("declarative_cl_pp_moved")%}

# a content clause with some ap moved
declarative_cl_ap_moved ->
      that np fin_vp_ap_moved    pp_list          {%nt("declarative_cl_ap_moved")%}
    | that np fin_vp             pp_list          {%nt("declarative_cl_ap_moved")%}

np ->
    precorenp_modifier_list core_np postcorenp_modifier_list  {%nt("np")%}

precorenp_modifier_list -> precorenp_modifier:* {%nonterminal_unpack("precorenp_modifier_list")%} 

postcorenp_modifier_list -> postcorenp_modifier:* {%nonterminal_unpack("postcorenp_modifier_list")%}

# a noun phrase not including peripheral modifiers
core_np -> 
                    proper_noun                                     {%nt("core_np")%}  # a proper noun (ex: "John", "Mary")
    |               pronoun                                         {%nt("core_np")%}  # a pronoun (ex: "I", "you", "he", "she", "it", "we", "they")
    |     ap_list   uncountable_noun n_modifier_list                {%nt("core_np")%}  # an uncountable noun with an adjective phrase (ex: "happy music") 
    | dp  ap_list   noun             n_modifier_list                {%nt("core_np")%}  # determiner phrase followed by a nominal (ex: "even all the lovely food too")


# a noun phrase that has been moved to the front (wh-movement)
wh_np -> wh    {%nt("wh_np")%} 
       | wh np {%nt("wh_np")%}


# a specifier coming after the noun
n_modifier -> declarative_cl  {%nt("n_modifier")%} # a relative clause specifying the noun (ex: president who was elected) (ex: box that is on the table)
            | pp              {%nt("n_modifier")%} # a prepositional phrase specifying the noun (ex: "the book on the table")

n_modifier_list -> n_modifier:* {%nonterminal_unpack("n_modifier_list")%}
# a determiner phrase
dp -> det         {%nt("det")%} # the, a, an, some, this, that
    | np s        {%nt("det")%} # a noun phrase followed by a possessive suffix (ex: "John's")
    | pronoun_pos {%nt("det")%} # a possessive pronoun (ex: "my", "yours", "his", "hers", "ours", "theirs")


# a prepositional phrase
pp ->   preposition np {%nt("pp")%}

pp_list -> pp:* {%nonterminal_unpack("pp_list")%}

# a prepositional phrase that has been moved to the front (pied piping)
wh_pp ->   preposition wh_np {%nt("wh_pp")%}

# an adjective phrase
ap ->
      advp                  ap              {%nt("ap")%} # an adverb phrase followed by an adjective phrase (ex: "very happy") 
    | adj                                   {%nt("ap")%} # an adjective (ex: "happy")
    | adj_pp                pp              {%nt("ap")%} # an adjective with a prepositional phrase argument (ex: "fond of music")
    | adj_declarative_cl    declarative_cl  {%nt("ap")%} # an adjective with a declarative content clause argument (ex: "happy that you are here")

ap_pp_moved ->                                     
      advp ap_pp_moved                              {%nt("ap_pp_moved")%}
    | adj_pp                                        {%nt("ap_pp_moved")%}
    | adj_declarative_cl declarative_cl_pp_moved    {%nt("ap_pp_moved")%}

ap_np_moved ->                                     
      advp ap_np_moved                              {%nt("ap_np_moved")%}
    | adj_pp             preposition                {%nt("ap_np_moved")%}
    | adj_declarative_cl declarative_cl_np_moved    {%nt("ap_np_moved")%}

# a sequence of aps
ap_list -> ap:* {%nonterminal_unpack("ap_list")%}

# an adverb phrase
advp -> adv  {%nt("advp")%} # an adverb (ex: "quickly")
      | adv advp {%nt("advp")%} # an adverb phrase preceeded by another adverb phrase (ex: "very quickly")

advp? -> advp:? {%nonterminal_unpack("advp?")%}

not? -> not:? {%nonterminal_unpack("not?")%}

# terminals

det -> %det {%t("det")%}
pronoun -> %pronoun {%t("pronoun")%}
pronoun_pos -> %pronoun_pos {%t("pronoun_pos")%}
proper_noun -> %proper_noun {%t("proper_noun")%}
uncountable_noun -> %uncountable_noun {%t("uncountable_noun")%}
noun -> %noun {%t("noun")%}
preposition -> %preposition {%t("preposition")%}
to -> %to {%t("to")%}
s -> %s {%t("s")%}
not -> %not {%t("not")%}
that -> %that {%t("that")%}
interrogative_subordinator -> %interrogative_subordinator {%t("interrogative_subordinator")%}
modal -> %modal {%t("modal")%}
vb -> %vb {%t("vb")%}
vb_pp -> %vb_pp {%t("vb_pp")%}
vb_ap -> %vb_ap {%t("vb_ap")%}
vb_to_inf_cl -> %vb_to_inf_cl {%t("vb_to_inf_cl")%}
vb_bare_inf_cl -> %vb_bare_inf_cl {%t("vb_bare_inf_cl")%}
vb_declarative_cl -> %vb_declarative_cl {%t("vb_declarative_cl")%}
vb_exclamative_cl -> %vb_exclamative_cl {%t("vb_exclamative_cl")%}
vb_interrogative_cl -> %vb_interrogative_cl {%t("vb_interrogative_cl")%}
vb_vbg_cl -> %vb_vbg_cl {%t("vb_vbg_cl")%}
vb_vbn_cl -> %vb_vbn_cl {%t("vb_vbn_cl")%}
vb_np -> %vb_np {%t("vb_np")%}
vb_np_pp -> %vb_np_pp {%t("vb_np_pp")%}
vb_np_ap -> %vb_np_ap {%t("vb_np_ap")%}
vb_np_to_inf_cl -> %vb_np_to_inf_cl {%t("vb_np_to_inf_cl")%}
vb_np_bare_inf_cl -> %vb_np_bare_inf_cl {%t("vb_np_bare_inf_cl")%}
vb_np_declarative_cl -> %vb_np_declarative_cl {%t("vb_np_declarative_cl")%}
vb_np_exclamative_cl -> %vb_np_exclamative_cl {%t("vb_np_exclamative_cl")%}
vb_np_interrogative_cl -> %vb_np_interrogative_cl {%t("vb_np_interrogative_cl")%}
vb_np_np -> %vb_np_np {%t("vb_np_np")%}
vbd -> %vbd {%t("vbd")%}
vbd_pp -> %vbd_pp {%t("vbd_pp")%}
vbd_ap -> %vbd_ap {%t("vbd_ap")%}
vbd_to_inf_cl -> %vbd_to_inf_cl {%t("vbd_to_inf_cl")%}
vbd_bare_inf_cl -> %vbd_bare_inf_cl {%t("vbd_bare_inf_cl")%}
vbd_declarative_cl -> %vbd_declarative_cl {%t("vbd_declarative_cl")%}
vbd_exclamative_cl -> %vbd_exclamative_cl {%t("vbd_exclamative_cl")%}
vbd_interrogative_cl -> %vbd_interrogative_cl {%t("vbd_interrogative_cl")%}
vbd_vbg_cl -> %vbd_vbg_cl {%t("vbd_vbg_cl")%}
vbd_vbn_cl -> %vbd_vbn_cl {%t("vbd_vbn_cl")%}
vbd_np -> %vbd_np {%t("vbd_np")%}
vbd_np_pp -> %vbd_np_pp {%t("vbd_np_pp")%}
vbd_np_ap -> %vbd_np_ap {%t("vbd_np_ap")%}
vbd_np_to_inf_cl -> %vbd_np_to_inf_cl {%t("vbd_np_to_inf_cl")%}
vbd_np_bare_inf_cl -> %vbd_np_bare_inf_cl {%t("vbd_np_bare_inf_cl")%}
vbd_np_declarative_cl -> %vbd_np_declarative_cl {%t("vbd_np_declarative_cl")%}
vbd_np_exclamative_cl -> %vbd_np_exclamative_cl {%t("vbd_np_exclamative_cl")%}
vbd_np_interrogative_cl -> %vbd_np_interrogative_cl {%t("vbd_np_interrogative_cl")%}
vbd_np_np -> %vbd_np_np {%t("vbd_np_np")%}
vbg -> %vbg {%t("vbg")%}
vbg_pp -> %vbg_pp {%t("vbg_pp")%}
vbg_ap -> %vbg_ap {%t("vbg_ap")%}
vbg_to_inf_cl -> %vbg_to_inf_cl {%t("vbg_to_inf_cl")%}
vbg_bare_inf_cl -> %vbg_bare_inf_cl {%t("vbg_bare_inf_cl")%}
vbg_declarative_cl -> %vbg_declarative_cl {%t("vbg_declarative_cl")%}
vbg_exclamative_cl -> %vbg_exclamative_cl {%t("vbg_exclamative_cl")%}
vbg_interrogative_cl -> %vbg_interrogative_cl {%t("vbg_interrogative_cl")%}
vbg_vbg_cl -> %vbg_vbg_cl {%t("vbg_vbg_cl")%}
vbg_vbn_cl -> %vbg_vbn_cl {%t("vbg_vbn_cl")%}
vbg_np -> %vbg_np {%t("vbg_np")%}
vbg_np_pp -> %vbg_np_pp {%t("vbg_np_pp")%}
vbg_np_ap -> %vbg_np_ap {%t("vbg_np_ap")%}
vbg_np_to_inf_cl -> %vbg_np_to_inf_cl {%t("vbg_np_to_inf_cl")%}
vbg_np_bare_inf_cl -> %vbg_np_bare_inf_cl {%t("vbg_np_bare_inf_cl")%}
vbg_np_declarative_cl -> %vbg_np_declarative_cl {%t("vbg_np_declarative_cl")%}
vbg_np_exclamative_cl -> %vbg_np_exclamative_cl {%t("vbg_np_exclamative_cl")%}
vbg_np_interrogative_cl -> %vbg_np_interrogative_cl {%t("vbg_np_interrogative_cl")%}
vbg_np_np -> %vbg_np_np {%t("vbg_np_np")%}
vbn -> %vbn {%t("vbn")%}
vbn_pp -> %vbn_pp {%t("vbn_pp")%}
vbn_ap -> %vbn_ap {%t("vbn_ap")%}
vbn_to_inf_cl -> %vbn_to_inf_cl {%t("vbn_to_inf_cl")%}
vbn_bare_inf_cl -> %vbn_bare_inf_cl {%t("vbn_bare_inf_cl")%}
vbn_declarative_cl -> %vbn_declarative_cl {%t("vbn_declarative_cl")%}
vbn_exclamative_cl -> %vbn_exclamative_cl {%t("vbn_exclamative_cl")%}
vbn_interrogative_cl -> %vbn_interrogative_cl {%t("vbn_interrogative_cl")%}
vbn_vbg_cl -> %vbn_vbg_cl {%t("vbn_vbg_cl")%}
vbn_vbn_cl -> %vbn_vbn_cl {%t("vbn_vbn_cl")%}
vbn_np -> %vbn_np {%t("vbn_np")%}
vbn_np_pp -> %vbn_np_pp {%t("vbn_np_pp")%}
vbn_np_ap -> %vbn_np_ap {%t("vbn_np_ap")%}
vbn_np_to_inf_cl -> %vbn_np_to_inf_cl {%t("vbn_np_to_inf_cl")%}
vbn_np_bare_inf_cl -> %vbn_np_bare_inf_cl {%t("vbn_np_bare_inf_cl")%}
vbn_np_declarative_cl -> %vbn_np_declarative_cl {%t("vbn_np_declarative_cl")%}
vbn_np_exclamative_cl -> %vbn_np_exclamative_cl {%t("vbn_np_exclamative_cl")%}
vbn_np_interrogative_cl -> %vbn_np_interrogative_cl {%t("vbn_np_interrogative_cl")%}
vbn_np_np -> %vbn_np_np {%t("vbn_np_np")%}
vbp -> %vbp {%t("vbp")%}
vbp_pp -> %vbp_pp {%t("vbp_pp")%}
vbp_ap -> %vbp_ap {%t("vbp_ap")%}
vbp_to_inf_cl -> %vbp_to_inf_cl {%t("vbp_to_inf_cl")%}
vbp_bare_inf_cl -> %vbp_bare_inf_cl {%t("vbp_bare_inf_cl")%}
vbp_declarative_cl -> %vbp_declarative_cl {%t("vbp_declarative_cl")%}
vbp_exclamative_cl -> %vbp_exclamative_cl {%t("vbp_exclamative_cl")%}
vbp_interrogative_cl -> %vbp_interrogative_cl {%t("vbp_interrogative_cl")%}
vbp_vbg_cl -> %vbp_vbg_cl {%t("vbp_vbg_cl")%}
vbp_vbn_cl -> %vbp_vbn_cl {%t("vbp_vbn_cl")%}
vbp_np -> %vbp_np {%t("vbp_np")%}
vbp_np_pp -> %vbp_np_pp {%t("vbp_np_pp")%}
vbp_np_ap -> %vbp_np_ap {%t("vbp_np_ap")%}
vbp_np_to_inf_cl -> %vbp_np_to_inf_cl {%t("vbp_np_to_inf_cl")%}
vbp_np_bare_inf_cl -> %vbp_np_bare_inf_cl {%t("vbp_np_bare_inf_cl")%}
vbp_np_declarative_cl -> %vbp_np_declarative_cl {%t("vbp_np_declarative_cl")%}
vbp_np_exclamative_cl -> %vbp_np_exclamative_cl {%t("vbp_np_exclamative_cl")%}
vbp_np_interrogative_cl -> %vbp_np_interrogative_cl {%t("vbp_np_interrogative_cl")%}
vbp_np_np -> %vbp_np_np {%t("vbp_np_np")%}
vbz -> %vbz {%t("vbz")%}
vbz_pp -> %vbz_pp {%t("vbz_pp")%}
vbz_ap -> %vbz_ap {%t("vbz_ap")%}
vbz_to_inf_cl -> %vbz_to_inf_cl {%t("vbz_to_inf_cl")%}
vbz_bare_inf_cl -> %vbz_bare_inf_cl {%t("vbz_bare_inf_cl")%}
vbz_declarative_cl -> %vbz_declarative_cl {%t("vbz_declarative_cl")%}
vbz_exclamative_cl -> %vbz_exclamative_cl {%t("vbz_exclamative_cl")%}
vbz_interrogative_cl -> %vbz_interrogative_cl {%t("vbz_interrogative_cl")%}
vbz_vbg_cl -> %vbz_vbg_cl {%t("vbz_vbg_cl")%}
vbz_vbn_cl -> %vbz_vbn_cl {%t("vbz_vbn_cl")%}
vbz_np -> %vbz_np {%t("vbz_np")%}
vbz_np_pp -> %vbz_np_pp {%t("vbz_np_pp")%}
vbz_np_ap -> %vbz_np_ap {%t("vbz_np_ap")%}
vbz_np_to_inf_cl -> %vbz_np_to_inf_cl {%t("vbz_np_to_inf_cl")%}
vbz_np_bare_inf_cl -> %vbz_np_bare_inf_cl {%t("vbz_np_bare_inf_cl")%}
vbz_np_declarative_cl -> %vbz_np_declarative_cl {%t("vbz_np_declarative_cl")%}
vbz_np_exclamative_cl -> %vbz_np_exclamative_cl {%t("vbz_np_exclamative_cl")%}
vbz_np_interrogative_cl -> %vbz_np_interrogative_cl {%t("vbz_np_interrogative_cl")%}
vbz_np_np -> %vbz_np_np {%t("vbz_np_np")%}
adj -> %adj {%t("adj")%}
adj_pp -> %adj_pp {%t("adj_pp")%}
adj_declarative_cl -> %adj_declarative_cl {%t("adj_declarative_cl")%}
adv -> %adv {%t("adv")%}
wh -> %wh {%t("wh")%}
why -> %why {%t("why")%}
how -> %how {%t("how")%}
precorenp_modifier -> %precorenp_modifier {%t("precorenp_modifier")%}
postcorenp_modifier -> %postcorenp_modifier {%t("postcorenp_modifier")%}
is -> %is {%t("is")%}
are -> %are {%t("are")%}
were -> %were {%t("were")%}
does -> %does {%t("does")%}
do -> %do_ {%t("do")%}
did -> %did {%t("did")%}
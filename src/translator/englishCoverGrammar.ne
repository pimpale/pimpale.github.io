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

%}

sentence -> 
      fin_cl {%nt("sentence")%}
    | question_cl {%nt("sentence")%}

# a declarative finite clause
fin_cl -> adjunct_list np fin_vp adjunct_list {%nt("fin_cl")%}

# a question clause
question_cl -> 
                subj_aux_inv_cl          adjunct_list {%nt("question_cl")%} # are you happy?
    | wh        fin_vp                   adjunct_list {%nt("question_cl")%} # who ate that?
    | wh        subj_aux_inv_cl_np_moved adjunct_list {%nt("question_cl")%} # what did you eat?
    | why       subj_aux_inv_cl          adjunct_list {%nt("question_cl")%}
    | how advp? subj_aux_inv_cl          adjunct_list {%nt("question_cl")%} # how did you eat the apple?
    | how       subj_aux_inv_cl_ap_moved adjunct_list {%nt("question_cl")%} # how happy are you?


subj_aux_inv_cl ->
# modal
      modal         not? np bare_inf_cl      {%nt("subj_aux_inv_cl")%} # can you eat?
# finite
    | be_fin        not? np ap               {%nt("subj_aux_inv_cl")%} # were you happy? (`be` when used as a copula)
    | be_fin        not? np np               {%nt("subj_aux_inv_cl")%} # were you a watchman? (`be` when used as an equative)
    | vbf_vbg_cl    not? np vbg_cl           {%nt("subj_aux_inv_cl")%} # were you eating?
    | vbf_vbn_cl    not? np vbn_cl           {%nt("subj_aux_inv_cl")%} # were you eaten? / had you eaten?
    | do_fin        not? np bare_inf_cl      {%nt("subj_aux_inv_cl")%} # did you eat?


subj_aux_inv_cl_np_moved ->
# modal (move from head)
      modal         not? bare_inf_cl                  {%nt("subj_aux_inv_cl_np_moved")%} # who [can sing]?
# modal (move from argument)
    | modal         not? np bare_inf_cl_np_moved      {%nt("subj_aux_inv_cl_np_moved")%} # what [can you sing]?
# finite (move from head)
    | be_fin        not? ap                           {%nt("subj_aux_inv_cl_np_moved")%} # who [was happy]? (`be` when used as a copula)
    | vbf_vbg_cl    not? vbg_cl                       {%nt("subj_aux_inv_cl_np_moved")%} # who [was eating]?
    | vbf_vbn_cl    not? vbn_cl                       {%nt("subj_aux_inv_cl_np_moved")%} # who [was eaten]? / who [had eaten]?
    | do_fin        not? bare_inf_cl                  {%nt("subj_aux_inv_cl_np_moved")%} # who [didn't eat]?
# finite (move from argument)
    | vbf_vbg_cl    not? np vbg_cl_np_moved           {%nt("subj_aux_inv_cl_np_moved")%} # what [were you eating]?
    | vbf_vbn_cl    not? np vbn_cl_np_moved           {%nt("subj_aux_inv_cl_np_moved")%} # what [were you given]? / what [had you eaten]?
    | do_fin        not? np bare_inf_cl_np_moved      {%nt("subj_aux_inv_cl_np_moved")%} # what [did you eat]?


subj_aux_inv_cl_ap_moved ->
      modal         not? np bare_inf_cl_ap_moved      {%nt("subj_aux_inv_cl_ap_moved")%} # how [can you eat]?
# finite
    | be_fin        not? np                           {%nt("subj_aux_inv_cl_ap_moved")%} # how [were you]? (`be` when used as a copula)
    | vbf_vbg_cl    not? np vbg_cl_ap_moved           {%nt("subj_aux_inv_cl_ap_moved")%} # how [were you feeling]?
    | vbf_vbn_cl    not? np vbn_cl_ap_moved           {%nt("subj_aux_inv_cl_ap_moved")%} # how [were you found]? / how [had you felt]?
    | do_fin        not? np bare_inf_cl_ap_moved      {%nt("subj_aux_inv_cl_ap_moved")%} # how [did you feel]?


fin_vp -> 
# modal
      advp? modal              not? advp? bare_inf_cl                           {%nt("fin_vp")%} # modal verb with bare infinitive clause argument (ex: "I can eat") 
# complete preterite verb phrase
    | advp? vbf                     advp?                                       {%nt("fin_vp")%} # intransitive verb (ex: "I smoked")
    | advp? vbf_ap                  advp? ap                                    {%nt("fin_vp")%} # intransitive verb with adjective phrase argument (ex: "You seemed happy")
    | advp? vbf_to_inf_cl           advp? to_inf_cl                             {%nt("fin_vp")%} # intransitive verb with infinitive clause argument (ex: "I wanted to bring the book")
    | advp? vbf_bare_inf_cl         advp? bare_inf_cl                           {%nt("fin_vp")%} # intransitive verb with bare infinitive clause argument (ex: "I helped clean")
    | advp? vbf_declarative_cl      advp? declarative_cl                        {%nt("fin_vp")%} # intransitive verb with declarative content clause argument (ex: "I knew that you eat")
    | advp? vbf_exclamative_cl      advp? exclamative_cl                        {%nt("fin_vp")%} # intransitive verb with exclamative content clause argument (ex: "I said how expensive it was.")
    | advp? vbf_interrogative_cl    advp? interrogative_cl                      {%nt("fin_vp")%} # intransitive verb with interrogative clause argument (ex: "I knew what you eat")
    |       vbf_vbg_cl                    vbg_cl                                {%nt("fin_vp")%} # past continuous (ex: "We were eating")
    |       vbf_vbn_cl                    vbn_cl                                {%nt("fin_vp")%} # past perfect (ex: "He had eaten") OR passive voice (ex: "He was eaten")
    | advp? vbf_np                  advp? np                                    {%nt("fin_vp")%} # transitive verb (ex: "I ate the apple")
    | advp? vbf_np_ap               advp? np              ap                    {%nt("fin_vp")%} # transitive verb with adjective phrase argument (ex: "I found you happy")
    | advp? vbf_np_to_inf_cl        advp? np              to_inf_cl             {%nt("fin_vp")%} # transitive verb with infinitive verb argument (ex: "I asked you to eat the apple")
    | advp? vbf_np_bare_inf_cl      advp? np              bare_inf_cl           {%nt("fin_vp")%} # transitive verb with bare infinitive verb argument (ex: "I made you eat the apple")
    | advp? vbf_np_declarative_cl   advp? np              declarative_cl        {%nt("fin_vp")%} # transitive verb with declarative content clause argument (ex: "I told you that you eat the apple")
    | advp? vbf_np_exclamative_cl   advp? np              exclamative_cl        {%nt("fin_vp")%} # transitive verb with exclamative content clause argument (ex: "I told you how expensive it was")
    | advp? vbf_np_interrogative_cl advp? np              interrogative_cl      {%nt("fin_vp")%} # transitive verb with interrogative clause argument (ex: "I asked you what you eat")
    | advp? vbf_np_np               advp? np              np                    {%nt("fin_vp")%} # ditransitive verb (ex: "I gave you food")

# a declarative clause but one of the noun phrases has been moved out of it
# this happens when a declarative clause is inside an interrogative clause
# this happens in sentences like "i know that you think that he eats the apple" -> "i know what you think that he eats"
# finite verb phrase with a noun phrase moved
fin_vp_np_moved ->
# complete preterite verb phrase (move argument)
      advp? vbf_ap                   advp? ap_np_moved                                    {%nt("fin_vp_np_moved")%} # I know what you [seemed good at]
    | advp? vbf_to_inf_cl            advp? to_inf_cl_np_moved                             {%nt("fin_vp_np_moved")%} # I know what you [asked to bring]
    | advp? vbf_bare_inf_cl          advp? bare_inf_cl_np_moved                           {%nt("fin_vp_np_moved")%} # I know what you [helped bring]
    | advp? vbf_declarative_cl       advp? declarative_cl_np_moved                        {%nt("fin_vp_np_moved")%} # I know what you [said that you bring]
    |       vbf_vbg_cl                     vbg_cl_np_moved                                {%nt("fin_vp_np_moved")%} # I know what you [were bringing]
    |       vbf_vbn_cl                     vbn_cl_np_moved                                {%nt("fin_vp_np_moved")%} # I know what you [had brought] OR I know what you [were brought]
    | advp? vbf_np                   advp?                                                {%nt("fin_vp_np_moved")%} # I know what you [brought]
    | advp? vbf_np_ap                advp? ap                                             {%nt("fin_vp_np_moved")%} # I know who you [considered good at chess]
    | advp? vbf_np_ap                advp? np                     ap_np_moved             {%nt("fin_vp_np_moved")%} # I know what you [considered Bob good at]
    | advp? vbf_np_to_inf_cl         advp? to_inf_cl                                      {%nt("fin_vp_np_moved")%} # I know who you [asked to bring cheese]
    | advp? vbf_np_to_inf_cl         advp? np                     to_inf_cl_np_moved      {%nt("fin_vp_np_moved")%} # I know what you [asked Bob to bring]
    | advp? vbf_np_bare_inf_cl       advp? bare_inf_cl                                    {%nt("fin_vp_np_moved")%} # I know who you [helped bring cheese]
    | advp? vbf_np_bare_inf_cl       advp? np                     bare_inf_cl_np_moved    {%nt("fin_vp_np_moved")%} # I know what you [helped Bob bring]
    | advp? vbf_np_declarative_cl    advp? declarative_cl                                 {%nt("fin_vp_np_moved")%} # I know who you [told that you bring cheese]
    | advp? vbf_np_declarative_cl    advp? np                     declarative_cl_np_moved {%nt("fin_vp_np_moved")%} # I know what you [told Bob that you bring]
    | advp? vbf_np_exclamative_cl    advp? exclamative_cl                                 {%nt("fin_vp_np_moved")%} # I know who you [told how expensive it is]
    | advp? vbf_np_interrogative_cl  advp? interrogative_cl                               {%nt("fin_vp_np_moved")%} # I know who you [asked what Bob brings]
    | advp? vbf_np_np                advp? np                                             {%nt("fin_vp_np_moved")%} # I know what you [gave Bob]
    | advp? vbf_np_np                advp? to                     np                      {%nt("fin_vp_np_moved")%} # I know who you [gave the book to]

# finite verb phrase with a prepositional phrase moved
fin_vp_pp_moved ->
      advp? vbf                      advp?                                              {%nt("fin_vp_pp_moved")%} # I know to where [you go]
    | advp? vbf_ap                   advp?  ap_pp_moved                                 {%nt("fin_vp_pp_moved")%} # I know at what [you seemed good]
    | advp? vbf_to_inf_cl            advp?  to_inf_cl_pp_moved                          {%nt("fin_vp_pp_moved")%} # I know to where [you asked to go]
    | advp? vbf_bare_inf_cl          advp?  bare_inf_cl_pp_moved                        {%nt("fin_vp_pp_moved")%} # I know to where [you helped go]
    | advp? vbf_declarative_cl       advp?  declarative_cl_pp_moved                     {%nt("fin_vp_pp_moved")%} # I know to where [you said that you go]
    |       vbf_vbg_cl                      vbg_cl_pp_moved                             {%nt("fin_vp_np_moved")%} # I know to where [he was going]
    |       vbf_vbn_cl                      vbn_cl_pp_moved                             {%nt("fin_vp_np_moved")%} # I know at what he [has looked] OR I know on what [the book was put]
    | advp? vbf_np_ap                advp?  np               ap_pp_moved                {%nt("fin_vp_pp_moved")%} # I know at what you [considered Bob good]
    | advp? vbf_np_to_inf_cl         advp?  np               to_inf_cl_pp_moved         {%nt("fin_vp_pp_moved")%} # I know to where you [asked Bob to go]
    | advp? vbf_np_bare_inf_cl       advp?  np               bare_inf_cl_pp_moved       {%nt("fin_vp_pp_moved")%} # I know to where you [helped Bob go]
    | advp? vbf_np_declarative_cl    advp?  np               declarative_cl_pp_moved    {%nt("fin_vp_pp_moved")%} # I know to where you [told Bob that you go]

fin_vp_ap_moved -> 
      advp? vbf_ap                  advp?                                         {%nt("fin_vp_ap_moved")%} # intransitive verb with adjective phrase argument (ex: "I know how happy you [seemed]")
    | advp? vbf_to_inf_cl           advp? to_inf_cl_ap_moved                      {%nt("fin_vp_ap_moved")%} # intransitive verb with infinitive clause argument (ex: "I know how happy you [wanted to seem]")
    | advp? vbf_bare_inf_cl         advp? bare_inf_cl_ap_moved                    {%nt("fin_vp_ap_moved")%} # intransitive verb with bare infinitive clause argument (ex: "I know how tall you [could grow]") 
    | advp? vbf_declarative_cl      advp? declarative_cl_ap_moved                 {%nt("fin_vp_ap_moved")%} # intransitive verb with declarative content clause argument (ex: "I know how happy you [knew that you are]")
    |       vbf_vbg_cl                    vbg_cl_ap_moved                         {%nt("fin_vp_ap_moved")%} # past continuous (ex: "I know how happy you [were seeming]")
    |       vbf_vbn_cl                    vbn_cl_ap_moved                         {%nt("fin_vp_ap_moved")%} # past perfect (ex: "I know how happy you [had seemed]") OR passive voice (ex: "I know how good bob [was considered]")
    | advp? vbf_np_ap               advp? np                                      {%nt("fin_vp_ap_moved")%} # transitive verb with adjective phrase argument (ex: "I know how happy I [found you]")
    | advp? vbf_np_to_inf_cl        advp? np              to_inf_cl_ap_moved      {%nt("fin_vp_ap_moved")%} # transitive verb with infinitive verb argument (ex: "I know how skilled I [asked you to become]")
    | advp? vbf_np_bare_inf_cl      advp? np              bare_inf_cl_ap_moved    {%nt("fin_vp_ap_moved")%} # transitive verb with bare infinitive verb argument (ex: "I know how skilled bob [made you become]")
    | advp? vbf_np_declarative_cl   advp? np              declarative_cl_ap_moved {%nt("fin_vp_ap_moved")%} # transitive verb with declarative content clause argument (ex: "I know how happy I [told you that you are]")

# a non-finite clause starting with "to"
to_inf_cl ->            to inf_vp          adjunct_list                {%nt("to_inf_cl")%}
to_inf_cl_np_moved ->   to inf_vp_np_moved adjunct_list                {%nt("to_inf_cl_np_moved")%}
to_inf_cl_pp_moved ->   to inf_vp_pp_moved adjunct_list                {%nt("to_inf_cl_pp_moved")%}
to_inf_cl_ap_moved ->   to inf_vp_ap_moved adjunct_list                {%nt("to_inf_cl_ap_moved")%}


# a non-finite clause with a bare infinitive
bare_inf_cl -> inf_vp adjunct_list                                {%nt("bare_inf_cl")%}
bare_inf_cl_np_moved -> inf_vp_np_moved adjunct_list              {%nt("bare_inf_cl_np_moved")%}
bare_inf_cl_pp_moved -> inf_vp_pp_moved adjunct_list              {%nt("bare_inf_cl_pp_moved")%}
bare_inf_cl_ap_moved -> inf_vp_ap_moved adjunct_list              {%nt("bare_inf_cl_ap_moved")%}

# a non-finite verb phrase
inf_vp ->
      advp? vb                      advp?                                      {%nt("inf_vp")%} # intransitive verb (ex: "to smoke")
    | advp? vb_ap                   advp? ap                                   {%nt("inf_vp")%} # intransitive verb with adjective phrase argument (ex: "to seem happy")
    | advp? vb_to_inf_cl            advp? to_inf_cl                            {%nt("inf_vp")%} # intransitive verb with infinitive clause argument (ex: "to want to eat")
    | advp? vb_bare_inf_cl          advp? bare_inf_cl                          {%nt("inf_vp")%} # intransitive verb with bare infinitive clause argument (ex: "to help eat")
    | advp? vb_declarative_cl       advp? declarative_cl                       {%nt("inf_vp")%} # intransitive verb with declarative content clause argument (ex: "to know that you eat")
    | advp? vb_exclamative_cl       advp? exclamative_cl                       {%nt("inf_vp")%} # intransitive verb with exclamative content clause argument (ex: "to say how expensive it was.")
    | advp? vb_interrogative_cl     advp? interrogative_cl                     {%nt("inf_vp")%} # intransitive verb with interrogative clause argument (ex: "to know what you eat")
    |       vb_vbg_cl                     vbg_cl                               {%nt("inf_vp")%} # present continuous (ex: "to be eating")
    |       vb_vbn_cl                     vbn_cl                               {%nt("inf_vp")%} # present perfect (ex: "to have eaten") OR passive voice (ex: "to be eaten")
    | advp? vb_np                   advp? np                                   {%nt("inf_vp")%} # transitive verb (ex: "to eat food")    
    | advp? vb_np_ap                advp? np               ap                  {%nt("inf_vp")%} # transitive verb with adjective phrase argument (ex: "to find you happy")
    | advp? vb_np_to_inf_cl         advp? np               to_inf_cl           {%nt("inf_vp")%} # transitive verb with infinitive verb argument (ex: "to ask you to eat")
    | advp? vb_np_bare_inf_cl       advp? np               bare_inf_cl         {%nt("inf_vp")%} # transitive verb with bare infinitive verb argument (ex: "to make you eat")
    | advp? vb_np_declarative_cl    advp? np               declarative_cl      {%nt("inf_vp")%} # transitive verb with declarative content clause argument (ex: "to tell you that you eat")
    | advp? vb_np_exclamative_cl    advp? np               exclamative_cl      {%nt("inf_vp")%} # transitive verb with exclamative content clause argument (ex: "to tell you how expensive it was")
    | advp? vb_np_interrogative_cl  advp? np               interrogative_cl    {%nt("inf_vp")%} # transitive verb with interrogative clause argument (ex: "to ask you what you eat")
    | advp? vb_np_np                advp? np               np                  {%nt("inf_vp")%} # ditransitive verb (ex: "to give you food")

# non-finite verb phrase with a noun phrase moved
inf_vp_np_moved ->
      advp? vb_ap                   advp? ap_np_moved                                    {%nt("inf_vp_np_moved")%} # I know what you want to [seem good at]
    | advp? vb_to_inf_cl            advp? to_inf_cl_np_moved                             {%nt("inf_vp_np_moved")%} # I know what you want to [ask to bring]
    | advp? vb_bare_inf_cl          advp? bare_inf_cl_np_moved                           {%nt("inf_vp_np_moved")%} # I know what you want to [help bring]
    | advp? vb_declarative_cl       advp? declarative_cl_np_moved                        {%nt("inf_vp_np_moved")%} # I know what you want to [say that you bring]
    |       vb_vbg_cl                     vbg_cl_np_moved                                {%nt("inf_vp_np_moved")%} # I know what you want to [be bringing]
    |       vb_vbn_cl                     vbn_cl_np_moved                                {%nt("inf_vp_np_moved")%} # I know what you want to [have brought] OR I know what you want to [be brought]
    | advp? vb_np                   advp?                                                {%nt("inf_vp_np_moved")%} # I know what you want to [bring]
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


# non-finite verb phrase with a prepositional phrase moved
inf_vp_pp_moved ->
      advp? vb_ap                   advp?     ap_pp_moved                                 {%nt("inf_vp_pp_moved")%} # I know at what you want to [seem good]
    | advp? vb_to_inf_cl            advp?     to_inf_cl_pp_moved                          {%nt("inf_vp_pp_moved")%} # I know to where you want to [ask to go]
    | advp? vb_bare_inf_cl          advp?     bare_inf_cl_pp_moved                        {%nt("inf_vp_pp_moved")%} # I know to where you want to [help go]
    | advp? vb_declarative_cl       advp?     declarative_cl_pp_moved                     {%nt("inf_vp_pp_moved")%} # I know to where you want to [say that you go]
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

vbn_cl          -> vbn_vp          adjunct_list                 {%nt("vbn_cl")%}
vbn_cl_np_moved -> vbn_vp_np_moved adjunct_list                 {%nt("vbn_cl_np_moved")%}
vbn_cl_pp_moved -> vbn_vp_pp_moved adjunct_list                 {%nt("vbn_cl_pp_moved")%}
vbn_cl_ap_moved -> vbn_vp_ap_moved adjunct_list                 {%nt("vbn_cl_ap_moved")%}


# a past participle verb phrase
vbn_vp ->
      advp? vbn                      advp?                                      {%nt("vbn_vp")%} # intransitive verb (ex: "to smoke")
    | advp? vbn_ap                   advp? ap                                   {%nt("vbn_vp")%} # intransitive verb with adjective phrase argument (ex: "to seem happy")
    | advp? vbn_to_inf_cl            advp? to_inf_cl                            {%nt("vbn_vp")%} # intransitive verb with infinitive clause argument (ex: "to want to eat")
    | advp? vbn_bare_inf_cl          advp? bare_inf_cl                          {%nt("vbn_vp")%} # intransitive verb with bare infinitive clause argument (ex: "to help eat")
    | advp? vbn_declarative_cl       advp? declarative_cl                       {%nt("vbn_vp")%} # intransitive verb with declarative content clause argument (ex: "to know that you eat")
    | advp? vbn_exclamative_cl       advp? exclamative_cl                       {%nt("vbn_vp")%} # intransitive verb with exclamative content clause argument (ex: "to say how expensive it was.")
    | advp? vbn_interrogative_cl     advp? interrogative_cl                     {%nt("vbn_vp")%} # intransitive verb with interrogative clause argument (ex: "to know what you eat")
    |       vbn_vbg_cl                     vbg_cl                               {%nt("vbn_vp")%} # present continuous (ex: "to be eating")
    |       vbn_vbn_cl                     vbn_cl                               {%nt("vbn_vp")%} # present perfect (ex: "to have eaten") OR passive voice (ex: "to be eaten")
    | advp? vbn_np                   advp? np                                   {%nt("vbn_vp")%} # transitive verb (ex: "to eat food")    
    | advp? vbn_np_ap                advp? np               ap                  {%nt("vbn_vp")%} # transitive verb with adjective phrase argument (ex: "to find you happy")
    | advp? vbn_np_to_inf_cl         advp? np               to_inf_cl           {%nt("vbn_vp")%} # transitive verb with infinitive verb argument (ex: "to ask you to eat")
    | advp? vbn_np_bare_inf_cl       advp? np               bare_inf_cl         {%nt("vbn_vp")%} # transitive verb with bare infinitive verb argument (ex: "to make you eat")
    | advp? vbn_np_declarative_cl    advp? np               declarative_cl      {%nt("vbn_vp")%} # transitive verb with declarative content clause argument (ex: "to tell you that you eat")
    | advp? vbn_np_exclamative_cl    advp? np               exclamative_cl      {%nt("vbn_vp")%} # transitive verb with exclamative content clause argument (ex: "to tell you how expensive it was")
    | advp? vbn_np_interrogative_cl  advp? np               interrogative_cl    {%nt("vbn_vp")%} # transitive verb with interrogative clause argument (ex: "to ask you what you eat")
    | advp? vbn_np_np                advp? np               np                  {%nt("vbn_vp")%} # ditransitive verb (ex: "to give you food")

# past participle verb phrase with a noun phrase moved
vbn_vp_np_moved ->
      advp? vbn_ap                   advp? ap_np_moved                                    {%nt("vbn_vp_np_moved")%} # I know what you have [seemed good at]
    | advp? vbn_to_inf_cl            advp? to_inf_cl_np_moved                             {%nt("vbn_vp_np_moved")%} # I know what you have [asked to bring]
    | advp? vbn_bare_inf_cl          advp? bare_inf_cl_np_moved                           {%nt("vbn_vp_np_moved")%} # I know what you have [helped bring]
    | advp? vbn_declarative_cl       advp? declarative_cl_np_moved                        {%nt("vbn_vp_np_moved")%} # I know what you have [said that you bring]
    |       vbn_vbg_cl                     vbg_cl_np_moved                                {%nt("vbn_vp_np_moved")%} # I know what you have [been bringing]
    |       vbn_vbn_cl                     vbn_cl_np_moved                                {%nt("vbn_vp_np_moved")%} # I know what you have [had brought] OR I know what you have [been brought]
    | advp? vbn_np                   advp?                                                {%nt("vbn_vp_np_moved")%} # I know what you have [brought]
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



# past participle verb phrase with a prepositional phrase moved
vbn_vp_pp_moved ->
      advp? vbn_ap                   advp?     ap_pp_moved                                 {%nt("vbn_vp_pp_moved")%} # I know at what you have [seemed good]
    | advp? vbn_to_inf_cl            advp?     to_inf_cl_pp_moved                          {%nt("vbn_vp_pp_moved")%} # I know to where you have [asked to go]
    | advp? vbn_bare_inf_cl          advp?     bare_inf_cl_pp_moved                        {%nt("vbn_vp_pp_moved")%} # I know to where you have [helped go]
    | advp? vbn_declarative_cl       advp?     declarative_cl_pp_moved                     {%nt("vbn_vp_pp_moved")%} # I know to where you have [said that you go]
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


vbg_cl          -> vbg_vp           adjunct_list                 {%nt("vbg_cl")%}
vbg_cl_np_moved -> vbg_vp_np_moved  adjunct_list                 {%nt("vbg_cl_np_moved")%}
vbg_cl_pp_moved -> vbg_vp_pp_moved  adjunct_list                 {%nt("vbg_cl_pp_moved")%}
vbg_cl_ap_moved -> vbg_vp_ap_moved  adjunct_list                 {%nt("vbg_cl_ap_moved")%}


# present participle / gerund verb phrase
vbg_vp ->
      advp? vbg                      advp?                                      {%nt("vbg_vp")%} # intransitive verb (ex: "smoking")
    | advp? vbg_ap                   advp? ap                                   {%nt("vbg_vp")%} # intransitive verb with adjective phrase argument (ex: "seeming happy")
    | advp? vbg_to_inf_cl            advp? to_inf_cl                            {%nt("vbg_vp")%} # intransitive verb with infinitive clause argument (ex: "wanting to eat")
    | advp? vbg_bare_inf_cl          advp? bare_inf_cl                          {%nt("vbg_vp")%} # intransitive verb with bare infinitive clause argument (ex: "helping eat")
    | advp? vbg_declarative_cl       advp? declarative_cl                       {%nt("vbg_vp")%} # intransitive verb with declarative content clause argument (ex: "knowing that you eat")
    | advp? vbg_exclamative_cl       advp? exclamative_cl                       {%nt("vbg_vp")%} # intransitive verb with exclamative content clause argument (ex: "saying how expensive it was.")
    | advp? vbg_interrogative_cl     advp? interrogative_cl                     {%nt("vbg_vp")%} # intransitive verb with interrogative clause argument (ex: "knowing what you eat")
    |       vbg_vbg_cl                     vbg_cl                               {%nt("vbg_vp")%} # present continuous (ex: "?? being eating")
    |       vbg_vbn_cl                     vbn_cl                               {%nt("vbg_vp")%} # passive voice (ex: "being eaten")
    | advp? vbg_np                   advp? np                                   {%nt("vbg_vp")%} # transitive verb (ex: "to eat food")    
    | advp? vbg_np_ap                advp? np               ap                  {%nt("vbg_vp")%} # transitive verb with adjective phrase argument (ex: "finding you happy")
    | advp? vbg_np_to_inf_cl         advp? np               to_inf_cl           {%nt("vbg_vp")%} # transitive verb with infinitive verb argument (ex: "asking you to eat")
    | advp? vbg_np_bare_inf_cl       advp? np               bare_inf_cl         {%nt("vbg_vp")%} # transitive verb with bare infinitive verb argument (ex: "making you eat")
    | advp? vbg_np_declarative_cl    advp? np               declarative_cl      {%nt("vbg_vp")%} # transitive verb with declarative content clause argument (ex: "telling you that you eat")
    | advp? vbg_np_exclamative_cl    advp? np               exclamative_cl      {%nt("vbg_vp")%} # transitive verb with exclamative content clause argument (ex: "telling you how expensive it was")
    | advp? vbg_np_interrogative_cl  advp? np               interrogative_cl    {%nt("vbg_vp")%} # transitive verb with interrogative clause argument (ex: "asking you what you eat")
    | advp? vbg_np_np                advp? np               np                  {%nt("vbg_vp")%} # ditransitive verb (ex: "giving you food")


# present participle verb phrase with a noun phrase moved
vbg_vp_np_moved ->
      advp? vbg_ap                   advp? ap_np_moved                                    {%nt("vbg_vp_np_moved")%} # I know what you have [seemed good at]
    | advp? vbg_to_inf_cl            advp? to_inf_cl_np_moved                             {%nt("vbg_vp_np_moved")%} # I know what you have [asked to bring]
    | advp? vbg_bare_inf_cl          advp? bare_inf_cl_np_moved                           {%nt("vbg_vp_np_moved")%} # I know what you have [helped bring]
    | advp? vbg_declarative_cl       advp? declarative_cl_np_moved                        {%nt("vbg_vp_np_moved")%} # I know what you have [said that you bring]
    |      vbg_vbg_cl                    vbg_cl_np_moved                                  {%nt("vbg_vp_np_moved")%} # I know what you have [been bringing]
    |      vbg_vbn_cl                    vbn_cl_np_moved                                  {%nt("vbg_vp_np_moved")%} # I know what you have [had brought] OR I know what you have [been brought]
    | advp? vbg_np                   advp?                                                {%nt("vbg_vp_np_moved")%} # I know what you have [brought]
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

# present participle verb phrase with a prepositional phrase moved
vbg_vp_pp_moved ->
      advp? vbg_ap                   advp?     ap_pp_moved                                 {%nt("vbg_vp_pp_moved")%} # I know at what you are [seeming good]
    | advp? vbg_to_inf_cl            advp?     to_inf_cl_pp_moved                          {%nt("vbg_vp_pp_moved")%} # I know to where you are [asking to go]
    | advp? vbg_bare_inf_cl          advp?     bare_inf_cl_pp_moved                        {%nt("vbg_vp_pp_moved")%} # I know to where you are [helping go]
    | advp? vbg_declarative_cl       advp?     declarative_cl_pp_moved                     {%nt("vbg_vp_pp_moved")%} # I know to where you are [saying that you go]
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
declarative_cl ->  that fin_cl                   {%nt("declarative_cl")%}

# an exclamative content clause
exclamative_cl -> 
      how advp fin_cl            {%nt("exclamative_cl")%} # how quickly mary became happy
    | how ap np fin_vp_ap_moved     {%nt("exclamative_cl")%} # how happy mary became

# an interrogative content clause
interrogative_cl -> 
      wh_np                      np fin_vp_np_moved              adjunct_list                    {%nt("interrogative_cl")%} # open interrogative clause with move from the core arguments
    | wh_np                         fin_vp                       adjunct_list                    {%nt("interrogative_cl")%} # open interrogative clause with move from the agent
    | wh_pp                      np fin_vp_pp_moved              adjunct_list                    {%nt("interrogative_cl")%} # open interrogative clause with move from the core arguments using pied piping (ex: "at where I look")
    | wh_pp                      np fin_vp                       adjunct_list                    {%nt("interrogative_cl")%} # open interrogative clause with move from the adjuncts using pied piping (ex: "to where I go")
    | wh_np                      np fin_vp          preposition  adjunct_list                    {%nt("interrogative_cl")%} # open interrogative clause with move from the adjuncts using preposition stranding (ex: "where I go to")    
    | interrogative_subordinator np fin_vp                       adjunct_list                    {%nt("interrogative_cl")%} # closed interrogative clause (ex: "whether you eat the apple")

# a content clause with some np moved
declarative_cl_np_moved ->
      that    fin_vp                      adjunct_list          {%nt("declarative_cl_np_moved")%}
    | that np fin_vp_np_moved             adjunct_list          {%nt("declarative_cl_np_moved")%}
    | that np fin_vp          preposition adjunct_list          {%nt("declarative_cl_np_moved")%}

# a content clause with some pp moved
declarative_cl_pp_moved ->
      that np fin_vp_pp_moved    adjunct_list          {%nt("declarative_cl_pp_moved")%}
    | that np fin_vp             adjunct_list          {%nt("declarative_cl_pp_moved")%}

# a content clause with some ap moved
declarative_cl_ap_moved ->
      that np fin_vp_ap_moved    adjunct_list          {%nt("declarative_cl_ap_moved")%}
    | that np fin_vp             adjunct_list          {%nt("declarative_cl_ap_moved")%}

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



adjunct_list -> adjunct:* {%nonterminal_unpack("adjunct_list")%}

adjunct ->
      pp             {%nt("adjunct")%} # a prepositional phrase adjunct (ex: "in the house")
    | advp           {%nt("adjunct")%} # an adverb phrase adjunct (ex: "quickly")

# a prepositional phrase
pp ->   preposition np {%nt("pp")%}

# a prepositional phrase that has been moved to the front (pied piping)
wh_pp ->   preposition wh_np {%nt("wh_pp")%}

# an adjective phrase
ap ->
      advp                  ap              {%nt("ap")%} # an adverb phrase followed by an adjective phrase (ex: "very happy") 
    | adj                                   {%nt("ap")%} # an adjective (ex: "happy")
    | adj_pp                pp              {%nt("ap")%} # an adjective with a prepositional phrase argument (ex: "fond of music")
    | adj_declarative_cl    declarative_cl  {%nt("ap")%} # an adjective with a declarative content clause argument (ex: "happy that you are here")
    | adj_to_inf_cl         to_inf_cl       {%nt("ap")%} # an adjective with an infinitive clause argument (ex: "happy to be here")

ap_pp_moved ->                                     
      advp ap_pp_moved                              {%nt("ap_pp_moved")%}
    | adj_pp                                        {%nt("ap_pp_moved")%}
    | adj_declarative_cl declarative_cl_pp_moved    {%nt("ap_pp_moved")%}
    | adj_to_inf_cl to_inf_cl_pp_moved              {%nt("ap_pp_moved")%}

ap_np_moved ->                                     
      advp ap_np_moved                              {%nt("ap_np_moved")%}
    | adj_pp             preposition                {%nt("ap_np_moved")%}
    | adj_declarative_cl declarative_cl_np_moved    {%nt("ap_np_moved")%}
    | adj_to_inf_cl      to_inf_cl_np_moved         {%nt("ap_np_moved")%}

# a sequence of aps
ap_list -> ap:* {%nonterminal_unpack("ap_list")%}

# an adverb phrase
advp -> adv             {%nt("advp")%} # an adverb (ex: "quickly")
      | adv advp        {%nt("advp")%} # an adverb phrase preceeded by another adverb phrase (ex: "very quickly")

advp? -> advp       {%nt("advp?")%}
       | null       {%nt("advp?")%}

not? -> not         {%nt("not?")%}
      | null        {%nt("not?")%}

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
vb_ap -> %vb_ap {%t("vb_ap")%}
vb_to_inf_cl -> %vb_to_inf_cl {%t("vb_to_inf_cl")%}
vb_bare_inf_cl -> %vb_bare_inf_cl {%t("vb_bare_inf_cl")%}
vb_declarative_cl -> %vb_declarative_cl {%t("vb_declarative_cl")%}
vb_exclamative_cl -> %vb_exclamative_cl {%t("vb_exclamative_cl")%}
vb_interrogative_cl -> %vb_interrogative_cl {%t("vb_interrogative_cl")%}
vb_vbg_cl -> %vb_vbg_cl {%t("vb_vbg_cl")%}
vb_vbn_cl -> %vb_vbn_cl {%t("vb_vbn_cl")%}
vb_np -> %vb_np {%t("vb_np")%}
vb_np_ap -> %vb_np_ap {%t("vb_np_ap")%}
vb_np_to_inf_cl -> %vb_np_to_inf_cl {%t("vb_np_to_inf_cl")%}
vb_np_bare_inf_cl -> %vb_np_bare_inf_cl {%t("vb_np_bare_inf_cl")%}
vb_np_declarative_cl -> %vb_np_declarative_cl {%t("vb_np_declarative_cl")%}
vb_np_exclamative_cl -> %vb_np_exclamative_cl {%t("vb_np_exclamative_cl")%}
vb_np_interrogative_cl -> %vb_np_interrogative_cl {%t("vb_np_interrogative_cl")%}
vb_np_np -> %vb_np_np {%t("vb_np_np")%}
vbg -> %vbg {%t("vbg")%}
vbg_ap -> %vbg_ap {%t("vbg_ap")%}
vbg_to_inf_cl -> %vbg_to_inf_cl {%t("vbg_to_inf_cl")%}
vbg_bare_inf_cl -> %vbg_bare_inf_cl {%t("vbg_bare_inf_cl")%}
vbg_declarative_cl -> %vbg_declarative_cl {%t("vbg_declarative_cl")%}
vbg_exclamative_cl -> %vbg_exclamative_cl {%t("vbg_exclamative_cl")%}
vbg_interrogative_cl -> %vbg_interrogative_cl {%t("vbg_interrogative_cl")%}
vbg_vbg_cl -> %vbg_vbg_cl {%t("vbg_vbg_cl")%}
vbg_vbn_cl -> %vbg_vbn_cl {%t("vbg_vbn_cl")%}
vbg_np -> %vbg_np {%t("vbg_np")%}
vbg_np_ap -> %vbg_np_ap {%t("vbg_np_ap")%}
vbg_np_to_inf_cl -> %vbg_np_to_inf_cl {%t("vbg_np_to_inf_cl")%}
vbg_np_bare_inf_cl -> %vbg_np_bare_inf_cl {%t("vbg_np_bare_inf_cl")%}
vbg_np_declarative_cl -> %vbg_np_declarative_cl {%t("vbg_np_declarative_cl")%}
vbg_np_exclamative_cl -> %vbg_np_exclamative_cl {%t("vbg_np_exclamative_cl")%}
vbg_np_interrogative_cl -> %vbg_np_interrogative_cl {%t("vbg_np_interrogative_cl")%}
vbg_np_np -> %vbg_np_np {%t("vbg_np_np")%}
vbn -> %vbn {%t("vbn")%}
vbn_ap -> %vbn_ap {%t("vbn_ap")%}
vbn_to_inf_cl -> %vbn_to_inf_cl {%t("vbn_to_inf_cl")%}
vbn_bare_inf_cl -> %vbn_bare_inf_cl {%t("vbn_bare_inf_cl")%}
vbn_declarative_cl -> %vbn_declarative_cl {%t("vbn_declarative_cl")%}
vbn_exclamative_cl -> %vbn_exclamative_cl {%t("vbn_exclamative_cl")%}
vbn_interrogative_cl -> %vbn_interrogative_cl {%t("vbn_interrogative_cl")%}
vbn_vbg_cl -> %vbn_vbg_cl {%t("vbn_vbg_cl")%}
vbn_vbn_cl -> %vbn_vbn_cl {%t("vbn_vbn_cl")%}
vbn_np -> %vbn_np {%t("vbn_np")%}
vbn_np_ap -> %vbn_np_ap {%t("vbn_np_ap")%}
vbn_np_to_inf_cl -> %vbn_np_to_inf_cl {%t("vbn_np_to_inf_cl")%}
vbn_np_bare_inf_cl -> %vbn_np_bare_inf_cl {%t("vbn_np_bare_inf_cl")%}
vbn_np_declarative_cl -> %vbn_np_declarative_cl {%t("vbn_np_declarative_cl")%}
vbn_np_exclamative_cl -> %vbn_np_exclamative_cl {%t("vbn_np_exclamative_cl")%}
vbn_np_interrogative_cl -> %vbn_np_interrogative_cl {%t("vbn_np_interrogative_cl")%}
vbn_np_np -> %vbn_np_np {%t("vbn_np_np")%}
vbf -> %vbf {%t("vbf")%}
vbf_ap -> %vbf_ap {%t("vbf_ap")%}
vbf_to_inf_cl -> %vbf_to_inf_cl {%t("vbf_to_inf_cl")%}
vbf_bare_inf_cl -> %vbf_bare_inf_cl {%t("vbf_bare_inf_cl")%}
vbf_declarative_cl -> %vbf_declarative_cl {%t("vbf_declarative_cl")%}
vbf_exclamative_cl -> %vbf_exclamative_cl {%t("vbf_exclamative_cl")%}
vbf_interrogative_cl -> %vbf_interrogative_cl {%t("vbf_interrogative_cl")%}
vbf_vbg_cl -> %vbf_vbg_cl {%t("vbf_vbg_cl")%}
vbf_vbn_cl -> %vbf_vbn_cl {%t("vbf_vbn_cl")%}
vbf_np -> %vbf_np {%t("vbf_np")%}
vbf_np_ap -> %vbf_np_ap {%t("vbf_np_ap")%}
vbf_np_to_inf_cl -> %vbf_np_to_inf_cl {%t("vbf_np_to_inf_cl")%}
vbf_np_bare_inf_cl -> %vbf_np_bare_inf_cl {%t("vbf_np_bare_inf_cl")%}
vbf_np_declarative_cl -> %vbf_np_declarative_cl {%t("vbf_np_declarative_cl")%}
vbf_np_exclamative_cl -> %vbf_np_exclamative_cl {%t("vbf_np_exclamative_cl")%}
vbf_np_interrogative_cl -> %vbf_np_interrogative_cl {%t("vbf_np_interrogative_cl")%}
vbf_np_np -> %vbf_np_np {%t("vbf_np_np")%}
adj -> %adj {%t("adj")%}
adj_pp -> %adj_pp {%t("adj_pp")%}
adj_declarative_cl -> %adj_declarative_cl {%t("adj_declarative_cl")%}
adj_to_inf_cl -> %adj_to_inf_cl {%t("adj_to_inf_cl")%}
adv -> %adv {%t("adv")%}
wh -> %wh {%t("wh")%}
why -> %why {%t("why")%}
how -> %how {%t("how")%}
precorenp_modifier -> %precorenp_modifier {%t("precorenp_modifier")%}
postcorenp_modifier -> %postcorenp_modifier {%t("postcorenp_modifier")%}
be_fin -> %be_fin {%t("is_fin")%}
do_fin -> %do_fin {%t("do_fin")%}

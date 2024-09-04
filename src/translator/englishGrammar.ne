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
const vbd = {test: x => x in english.vbg};
const vbd_pp = {test: x => x in english.vbg_pp};
const vbd_ap = {test: x => x in english.vbg_ap};
const vbd_to_inf_cl = {test: x => x in english.vbg_to_inf_cl};
const vbd_bare_inf_cl = {test: x => x in english.vbg_bare_inf_cl};
const vbd_declarative_cl = {test: x => x in english.vbg_declarative_cl};
const vbd_exclamative_cl = {test: x => x in english.vbg_exclamative_cl};
const vbd_interrogative_cl = {test: x => x in english.vbg_interrogative_cl};
const vbd_np = {test: x => x in english.vbg_np};
const vbd_np_pp = {test: x => x in english.vbg_np_pp};
const vbd_np_ap = {test: x => x in english.vbg_np_ap};
const vbd_np_to_inf_cl = {test: x => x in english.vbg_np_to_inf_cl};
const vbd_np_bare_inf_cl = {test: x => x in english.vbg_np_bare_inf_cl};
const vbd_np_declarative_cl = {test: x => x in english.vbg_np_declarative_cl};
const vbd_np_exclamative_cl = {test: x => x in english.vbg_np_exclamative_cl};
const vbd_np_interrogative_cl = {test: x => x in english.vbg_np_interrogative_cl};
const vbd_np_np = {test: x => x in english.vbg_np_np};

// Verb Past Participle (VBN)
const vbn = {test: x => x in english.vbn};
const vbn_pp = {test: x => x in english.vbn_pp};
const vbn_ap = {test: x => x in english.vbn_ap};
const vbn_to_inf_cl = {test: x => x in english.vbn_to_inf_cl};
const vbn_bare_inf_cl = {test: x => x in english.vbn_bare_inf_cl};
const vbn_declarative_cl = {test: x => x in english.vbn_declarative_cl};
const vbn_exclamative_cl = {test: x => x in english.vbn_exclamative_cl};
const vbn_interrogative_cl = {test: x => x in english.vbn_interrogative_cl};
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

%}

# a declarative finite clause
decl_fin_cl -> pp_list fin_vp pp_list {%(children) => ({kind: "decl_fin_cl", children})%}

fin_vp -> 
# complete preterite verb phrase
      np adv? vbd                     adv?                                       {%nonterminal("fin_vp")%} # intransitive verb (ex: "I smoked")
    | np adv? vbd_pp                  adv? pp                                    {%nonterminal("fin_vp")%} # intransitive verb with prepositional phrase argument (ex: "I looked at the book")
    | np adv? vbd_ap                  adv? ap                                    {%nonterminal("fin_vp")%} # intransitive verb with adjective phrase argument (ex: "You seemed happy")
    | np adv? vbd_to_inf_cl           adv? to_inf_cl                             {%nonterminal("fin_vp")%} # intransitive verb with infinitive clause argument (ex: "I wanted to eat")
    | np adv? vbd_bare_inf_cl         adv? bare_inf_cl                           {%nonterminal("fin_vp")%} # intransitive verb with bare infinitive clause argument (ex: "I helped eat") 
    | np adv? vbd_declarative_cl      adv? declarative_cl                        {%nonterminal("fin_vp")%} # intransitive verb with declarative content clause argument (ex: "I knew that you eat")
    | np adv? vbd_exclamative_cl      adv? exclamative_cl                        {%nonterminal("fin_vp")%} # intransitive verb with exclamative content clause argument (ex: "I said how expensive it was.")
    | np adv? vbd_interrogative_cl    adv? interrogative_cl                      {%nonterminal("fin_vp")%} # intransitive verb with interrogative clause argument (ex: "I knew what you eat")
    | np      vbd_vbg_cl                   vbg_cl                                {%nonterminal("fin_vp")%} # past continuous (ex: "I was eating")
    | np      vbd_vbn_cl                   vbn_cl                                {%nonterminal("fin_vp")%} # past perfect (ex: "He had eaten") OR passive voice (ex: "He was eaten")
    | np adv? vbd_np                  adv? np                                    {%nonterminal("fin_vp")%} # transitive verb (ex: "I ate the apple")
    | np adv? vbd_np_pp               adv? np              pp                    {%nonterminal("fin_vp")%} # transitive verb with prepositional phrase argument (ex: "I put the book on the table")
    | np adv? vbd_np_ap               adv? np              ap                    {%nonterminal("fin_vp")%} # transitive verb with adjective phrase argument (ex: "I found you happy")
    | np adv? vbd_np_to_inf_cl        adv? np              to_inf_cl             {%nonterminal("fin_vp")%} # transitive verb with infinitive verb argument (ex: "I asked you to eat the apple")
    | np adv? vbd_np_bare_inf_cl      adv? np              bare_inf_cl           {%nonterminal("fin_vp")%} # transitive verb with bare infinitive verb argument (ex: "I made you eat the apple")
    | np adv? vbd_np_declarative_cl   adv? np              declarative_cl        {%nonterminal("fin_vp")%} # transitive verb with declarative content clause argument (ex: "I told you that you eat the apple")
    | np adv? vbd_np_exclamative_cl   adv? np              exclamative_cl        {%nonterminal("fin_vp")%} # transitive verb with exclamative content clause argument (ex: "I told you how expensive it was")
    | np adv? vbd_np_interrogative_cl adv? np              interrogative_cl      {%nonterminal("fin_vp")%} # transitive verb with interrogative clause argument (ex: "I asked you what you eat")
    | np adv? vbd_np_np               adv? np              np                    {%nonterminal("fin_vp")%} # ditransitive verb (ex: "I gave you food")
    | np adv? vbd_np_np               adv? np              to              np    {%nonterminal("fin_vp")%} # ditransitive verb with dative shift (ex: "I gave the book to you")
# complete present verb phrase (non 3rd person singular)
    | np adv? vbp                     adv?                                       {%nonterminal("fin_vp")%} # intransitive verb (ex: "I smoke")
    | np adv? vbp_pp                  adv? pp                                    {%nonterminal("fin_vp")%} # intransitive verb with prepositional phrase argument (ex: "I look at the book")
    | np adv? vbp_ap                  adv? ap                                    {%nonterminal("fin_vp")%} # intransitive verb with adjective phrase argument (ex: "You seem happy")
    | np adv? vbp_to_inf_cl           adv? to_inf_cl                             {%nonterminal("fin_vp")%} # intransitive verb with infinitive clause argument (ex: "I want to eat")
    | np adv? vbp_bare_inf_cl         adv? bare_inf_cl                           {%nonterminal("fin_vp")%} # intransitive verb with bare infinitive clause argument (ex: "I might eat")
    | np adv? vbp_declarative_cl      adv? declarative_cl                        {%nonterminal("fin_vp")%} # intransitive verb with declarative content clause argument (ex: "I know that you eat")
    | np adv? vbp_exclamative_cl      adv? exclamative_cl                        {%nonterminal("fin_vp")%} # intransitive verb with exclamative content clause argument (ex: "I said how expensive it was.")
    | np adv? vbp_interrogative_cl    adv? interrogative_cl                      {%nonterminal("fin_vp")%} # intransitive verb with interrogative clause argument (ex: "I know what you eat")
    | np      vbp_vbg_cl                   vbg_cl                                {%nonterminal("fin_vp")%} # present progressive (ex: "I am eating the apple")
    | np      vbp_vbn_cl                   vbn_cl                                {%nonterminal("fin_vp")%} # present perfect (ex: "They have eaten") OR passive voice (??) (ex: "??They are eaten")
    | np adv? vbp_np                  adv? np                                    {%nonterminal("fin_vp")%} # transitive verb (ex: "I eat the apple")
    | np adv? vbp_np_pp               adv? np              pp                    {%nonterminal("fin_vp")%} # transitive verb with prepositional phrase argument (ex: "I put the book on the table")
    | np adv? vbp_np_ap               adv? np              ap                    {%nonterminal("fin_vp")%} # transitive verb with adjective phrase argument (ex: "I find you happy")
    | np adv? vbp_np_to_inf_cl        adv? np              to_inf_cl             {%nonterminal("fin_vp")%} # transitive verb with infinitive verb argument (ex: "I ask you to eat the apple")
    | np adv? vbp_np_bare_inf_cl      adv? np              bare_inf_cl           {%nonterminal("fin_vp")%} # transitive verb with bare infinitive verb argument (ex: "I make you eat the apple")
    | np adv? vbp_np_declarative_cl   adv? np              declarative_cl        {%nonterminal("fin_vp")%} # transitive verb with declarative content clause argument (ex: "I tell you that you eat the apple")
    | np adv? vbp_np_exclamative_cl   adv? np              exclamative_cl        {%nonterminal("fin_vp")%} # transitive verb with exclamative content clause argument (ex: "I told you how expensive it was")
    | np adv? vbp_np_interrogative_cl adv? np              interrogative_cl      {%nonterminal("fin_vp")%} # transitive verb with interrogative clause argument (ex: "I ask you what you eat")
    | np adv? vbp_np_np               adv? np              np                    {%nonterminal("fin_vp")%} # ditransitive verb (ex: "I give you food")
    | np adv? vbp_np_np               adv? np              to              np    {%nonterminal("fin_vp")%} # ditransitive verb with dative shift (ex: "I give the book to you")
# complete present verb phrase (3rd person singular)
    | np adv? vbz                     adv?                                       {%nonterminal("fin_vp")%} # intransitive verb (ex: "He smokes")
    | np adv? vbz_pp                  adv? pp                                    {%nonterminal("fin_vp")%} # intransitive verb with prepositional phrase argument (ex: "He looks at the book")
    | np adv? vbz_ap                  adv? ap                                    {%nonterminal("fin_vp")%} # intransitive verb with adjective phrase argument (ex: "He seems happy")
    | np adv? vbz_to_inf_cl           adv? to_inf_cl                             {%nonterminal("fin_vp")%} # intransitive verb with infinitive clause argument (ex: "He wants to eat")
    | np adv? vbz_bare_inf_cl         adv? bare_inf_cl                           {%nonterminal("fin_vp")%} # intransitive verb with bare infinitive clause argument (ex: "He might eat")
    | np adv? vbz_declarative_cl      adv? declarative_cl                        {%nonterminal("fin_vp")%} # intransitive verb with declarative content clause argument (ex: "He knows that you eat")
    | np adv? vbz_exclamative_cl      adv? exclamative_cl                        {%nonterminal("fin_vp")%} # intransitive verb with exclamative content clause argument (ex: "He says how expensive it was.")
    | np adv? vbz_interrogative_cl    adv? interrogative_cl                      {%nonterminal("fin_vp")%} # intransitive verb with interrogative clause argument (ex: "He knows what you eat")
    | np      vbz_vbg_cl              adv? vbg_cl                                {%nonterminal("fin_vp")%} # present progressive (ex: "He is eating")
    | np      vbz_vbn_cl              adv? vbn_cl                                {%nonterminal("fin_vp")%} # present perfect (ex: "He has eaten") OR passive voice (??) (ex: "??He is eaten")
    | np adv? vbz_np                  adv? np                                    {%nonterminal("fin_vp")%} # transitive verb (ex: "He eats the apple")
    | np adv? vbz_np_pp               adv? np              pp                    {%nonterminal("fin_vp")%} # transitive verb with prepositional phrase argument (ex: "He puts the book on the table")
    | np adv? vbz_np_ap               adv? np              ap                    {%nonterminal("fin_vp")%} # transitive verb with adjective phrase argument (ex: "He finds you happy")
    | np adv? vbz_np_to_inf_cl        adv? np              to_inf_cl             {%nonterminal("fin_vp")%} # transitive verb with infinitive verb argument (ex: "He asks you to eat the apple")
    | np adv? vbz_np_bare_inf_cl      adv? np              bare_inf_cl           {%nonterminal("fin_vp")%} # transitive verb with bare infinitive verb argument (ex: "He makes you eat the apple")
    | np adv? vbz_np_declarative_cl   adv? np              declarative_cl        {%nonterminal("fin_vp")%} # transitive verb with declarative content clause argument (ex: "He tells you that you eat the apple")
    | np adv? vbz_np_exclamative_cl   adv? np              exclamative_cl        {%nonterminal("fin_vp")%} # transitive verb with exclamative content clause argument (ex: "He tells you how expensive it was")
    | np adv? vbz_np_interrogative_cl adv? np              interrogative_cl      {%nonterminal("fin_vp")%} # transitive verb with interrogative clause argument (ex: "He asks you what you eat")
    | np adv? vbz_np_np               adv? np              np                    {%nonterminal("fin_vp")%} # ditransitive verb (ex: "He gives you food")
    | np adv? vbz_np_np               adv? np              to              np    {%nonterminal("fin_vp")%} # ditransitive verb with dative shift (ex: "He gives the book to you")

# a non-finite clause starting with "to"
to_inf_cl -> to bare_inf_cl                                  {%nonterminal("to_inf_cl")%}
to_inf_cl_np_moved -> to bare_inf_cl_np_moved                {%nonterminal("to_inf_cl_np_moved")%}
to_inf_cl_pp_moved -> to bare_inf_cl_pp_moved                {%nonterminal("to_inf_cl_pp_moved")%}
to_inf_cl_pp_stranded -> to bare_inf_cl_pp_stranded          {%nonterminal("to_inf_cl_pp_stranded")%}

# a non-finite clause with a bare infinitive
bare_inf_cl -> inf_vp pp_list                                {%nonterminal("bare_inf_cl")%}
bare_inf_cl_np_moved -> inf_vp_np_moved pp_list    {%nonterminal("bare_inf_cl_np_moved")%}
bare_inf_cl_pp_moved -> inf_vp_pp_moved pp_list              {%nonterminal("bare_inf_cl_pp_moved")%}
bare_inf_cl_pp_stranded -> inf_vp_pp_stranded pp_list        {%nonterminal("bare_inf_cl_pp_stranded")%}

# a non-finite verb phrase
inf_vp -> 
      adv? vb                      adv?                                      {%nonterminal("inf_vp")%} # intransitive verb (ex: "to smoke")
    | adv? vb_pp                   adv? pp                                   {%nonterminal("inf_vp")%} # verb with prepositional phrase argument (ex: "to look at the book")
    | adv? vb_ap                   adv? ap                                   {%nonterminal("inf_vp")%} # verb with adjective phrase argument (ex: "to seem happy")
    | adv? vb_to_inf_cl            adv? to_inf_cl                            {%nonterminal("inf_vp")%} # verb with infinitive clause argument (ex: "to want to eat")
    | adv? vb_bare_inf_cl          adv? bare_inf_cl                          {%nonterminal("inf_vp")%} # verb with bare infinitive clause argument (ex: "to help eat")
    | adv? vb_declarative_cl       adv? declarative_cl                       {%nonterminal("inf_vp")%} # verb with declarative content clause argument (ex: "to know that you eat")
    | adv? vb_exclamative_cl       adv? exclamative_cl                       {%nonterminal("inf_vp")%} # verb with exclamative content clause argument (ex: "to say how expensive it was.")
    | adv? vb_interrogative_cl     adv? interrogative_cl                     {%nonterminal("inf_vp")%} # verb with interrogative clause argument (ex: "to know what you eat")
    |      vb_vbg_cl                    vbg_cl                               {%nonterminal("inf_vp")%} # present continuous (ex: "to be eating")
    |      vb_vbn_cl                    vbn_cl                               {%nonterminal("inf_vp")%} # present perfect (ex: "to have eaten") OR passive voice (ex: "to be eaten")
    | adv? vb_np                   adv? np                                   {%nonterminal("inf_vp")%} # transitive verb (ex: "to eat food")    
    | adv? vb_np_pp                adv? np               pp                  {%nonterminal("inf_vp")%} # transitive verb with prepositional phrase argument (ex: "to put the book on the table")
    | adv? vb_np_ap                adv? np               ap                  {%nonterminal("inf_vp")%} # transitive verb with adjective phrase argument (ex: "to find you happy")
    | adv? vb_np_to_inf_cl         adv? np               to_inf_cl           {%nonterminal("inf_vp")%} # transitive verb with infinitive verb argument (ex: "to ask you to eat")
    | adv? vb_np_bare_inf_cl       adv? np               bare_inf_cl         {%nonterminal("inf_vp")%} # transitive verb with bare infinitive verb argument (ex: "to make you eat")
    | adv? vb_np_declarative_cl    adv? np               declarative_cl      {%nonterminal("inf_vp")%} # transitive verb with declarative content clause argument (ex: "to tell you that you eat")
    | adv? vb_np_exclamative_cl    adv? np               exclamative_cl      {%nonterminal("inf_vp")%} # transitive verb with exclamative content clause argument (ex: "to tell you how expensive it was")
    | adv? vb_np_interrogative_cl  adv? np               interrogative_cl    {%nonterminal("inf_vp")%} # transitive verb with interrogative clause argument (ex: "to ask you what you eat")
    | adv? vb_np_np                adv? np               np                  {%nonterminal("inf_vp")%} # ditransitive verb (ex: "to give you food")

# non-finite verb phrase with a noun phrase moved
inf_vp_np_moved ->
      adv? vb_to_inf_cl            adv? to_inf_cl_np_moved                             {%nonterminal("inf_vp_np_moved")%} # verb with infinitive clause argument (ex: "to want to eat")
    | adv? vb_bare_inf_cl          adv? bare_inf_cl_np_moved                           {%nonterminal("inf_vp_np_moved")%} # verb with bare infinitive clause argument (ex: "to help eat")
    | adv? vb_declarative_cl       adv? declarative_cl_np_moved                        {%nonterminal("inf_vp_np_moved")%} # verb with declarative content clause argument (ex: "to know that you eat")
    |      vb_vbg_cl                    vbg_cl_np_moved                                {%nonterminal("inf_vp_np_moved")%} # present continuous (ex: "to be eating")
    |      vb_vbn_cl                    vbn_cl_np_moved                                {%nonterminal("inf_vp_np_moved")%} # present perfect (ex: "to have eaten") OR passive voice (ex: "to be eaten")
    | adv? vb_np                   adv?                                                {%nonterminal("inf_vp_np_moved")%} # transitive verb (ex: "to eat")
    | adv? vb_np_pp                adv? pp                                             {%nonterminal("inf_vp_np_moved")%} # transitive verb with prepositional phrase argument (ex: "to put on the table")
    | adv? vb_np_ap                adv? ap                                             {%nonterminal("inf_vp_np_moved")%} # transitive verb with adjective phrase argument (ex: "to find happy")
    | adv? vb_np_to_inf_cl         adv? to_inf_cl                                      {%nonterminal("inf_vp_np_moved")%} # transitive verb with infinitive verb argument (ex: "to ask to eat")
    | adv? vb_np_bare_inf_cl       adv? bare_inf_cl                                    {%nonterminal("inf_vp_np_moved")%} # transitive verb with bare infinitive verb argument (ex: "to make eat")
    | adv? vb_np_declarative_cl    adv? declarative_cl                                 {%nonterminal("inf_vp_np_moved")%} # transitive verb with declarative content clause argument (ex: "to tell that you eat")
    | adv? vb_np_declarative_cl    adv? np               declarative_cl_np_moved       {%nonterminal("inf_vp_np_moved")%} # transitive verb with declarative content clause argument (ex: "to tell how expensive it was")
    | adv? vb_np_exclamative_cl    adv? exclamative_cl                                 {%nonterminal("inf_vp_np_moved")%} # transitive verb with exclamative content clause argument (ex: "to tell how expensive it was")
    | adv? vb_np_interrogative_cl  adv? interrogative_cl                               {%nonterminal("inf_vp_np_moved")%} # transitive verb with interrogative clause argument (ex: "to ask what you eat")
    | adv? vb_np_np                adv? np                                             {%nonterminal("inf_vp_np_moved")%} # ditransitive verb (ex: "to give food")

# non-finite verb phrase with a prepositional phrase moved
inf_vp_pp_moved ->
      adv? vb_pp         adv?                                      {%nonterminal("inf_vp_pp_moved")%}   # verb with prepositional phrase argument (ex: "to look")
    | adv? vb_np_pp      adv?     np                               {%nonterminal("inf_vp_pp_moved")%}   # transitive verb with prepositional phrase argument (ex: "to put the book")

# non-finite verb phrase with a prepositional phrase stranded
inf_vp_pp_stranded ->
      adv? vb_pp         adv?     preposition                         {%nonterminal("inf_vp_pp_moved")%} # verb with prepositional phrase argument (ex: "to look at")
    | adv? vb_np_pp      adv?     np              preposition         {%nonterminal("inf_vp_pp_moved")%} # transitive verb with prepositional phrase argument (ex: "to put the book on")



# a past participle verb phrase
vbn_vp -> 
      adv? vbn                       adv?                                       {%nonterminal("vbn_vp")%} # intransitive verb (ex: "broken")
    | adv? vbn_pp                    adv?  pp                                   {%nonterminal("vbn_vp")%} # verb with prepositional phrase argument (ex: "looked at the book")
    | adv? vbn_ap                    adv?  ap                                   {%nonterminal("vbn_vp")%} # verb with adjective phrase argument (ex: "seemed happy")
    | adv? vbn_to_inf_cl             adv?  to_inf_cl                            {%nonterminal("vbn_vp")%} # verb with infinitive clause argument (ex: "wanted to eat")
    | adv? vbn_bare_inf_cl           adv?  bare_inf_cl                          {%nonterminal("vbn_vp")%} # verb with bare infinitive clause argument (ex: "helped eat")
    | adv? vbn_declarative_cl        adv?  declarative_cl                       {%nonterminal("vbn_vp")%} # verb with declarative content clause argument (ex: "known that you eat")
    | adv? vbn_exclamative_cl        adv?  exclamative_cl                       {%nonterminal("vbn_vp")%} # verb with exclamative content clause argument (ex: "said how expensive it was.")
    | adv? vbn_interrogative_cl      adv?  interrogative_cl                     {%nonterminal("vbn_vp")%} # verb with interrogative clause argument (ex: "known what you eat")
    | adv? vbn_np                    adv?  np                                   {%nonterminal("vbn_vp")%} # transitive verb (ex: "eaten food")    
    | adv? vbn_np_pp                 adv?  np               pp                  {%nonterminal("vbn_vp")%} # transitive verb with prepositional phrase argument (ex: "put the book on the table")
    | adv? vbn_np_ap                 adv?  np               ap                  {%nonterminal("vbn_vp")%} # transitive verb with adjective phrase argument (ex: "found you happy")
    | adv? vbn_np_to_inf_cl          adv?  np               to_inf_cl           {%nonterminal("vbn_vp")%} # transitive verb with infinitive verb argument (ex: "asked you to eat")
    | adv? vbn_np_bare_inf_cl        adv?  np               bare_inf_cl         {%nonterminal("vbn_vp")%} # transitive verb with bare infinitive verb argument (ex: "made you eat")
    | adv? vbn_np_declarative_cl     adv?  np               declarative_cl      {%nonterminal("vbn_vp")%} # transitive verb with declarative content clause argument (ex: "told you that you eat")
    | adv? vbn_np_exclamative_cl     adv?  np               exclamative_cl      {%nonterminal("vbn_vp")%} # transitive verb with exclamative content clause argument (ex: "told you how expensive it was")
    | adv? vbn_np_interrogative_cl   adv?  np               interrogative_cl    {%nonterminal("vbn_vp")%} # transitive verb with interrogative clause argument (ex: "asked you what you eat")
    | adv? vbn_np_np                 adv?  np               np                  {%nonterminal("vbn_vp")%} # ditransitive verb (ex: "given you food")

# non-finite verb phrase with a noun phrase moved
vbn_vp_np_moved ->
      adv? vbn_np                    adv?                                    {%nonterminal("vbn_vp_np_moved")%}  # transitive verb (ex: "have eaten")
    | adv? vbn_np_pp                 adv? pp                                 {%nonterminal("vbn_vp_np_moved")%}  # transitive verb with prepositional phrase argument (ex: "have put on the table")
    | adv? vbn_np_ap                 adv? ap                                 {%nonterminal("vbn_vp_np_moved")%}  # transitive verb with adjective phrase argument (ex: "have found happy")
    | adv? vbn_np_to_inf_cl          adv? to_inf_cl                          {%nonterminal("vbn_vp_np_moved")%}  # transitive verb with infinitive verb argument (ex: "have asked to eat")
    | adv? vbn_np_bare_inf_cl        adv? bare_inf_cl                        {%nonterminal("vbn_vp_np_moved")%}  # transitive verb with bare infinitive verb argument (ex: "have made eat")
    | adv? vbn_np_declarative_cl     adv? declarative_cl                     {%nonterminal("vbn_vp_np_moved")%}  # transitive verb with declarative content clause argument (ex: "have told that you eat")
    | adv? vbn_np_exclamative_cl     adv? exclamative_cl                     {%nonterminal("vbn_vp_np_moved")%}  # transitive verb with exclamative content clause argument (ex: "have told how expensive it was")
    | adv? vbn_np_interrogative_cl   adv? interrogative_cl                   {%nonterminal("vbn_vp_np_moved")%}  # transitive verb with interrogative clause argument (ex: "have asked what you eat")
    | adv? vbn_np_np                 adv? np                                 {%nonterminal("vbn_vp_np_moved")%}  # ditransitive verb (ex: "have given food")

# non-finite verb phrase with a prepositional phrase moved
vbn_vp_pp_moved ->
      adv? vbn_pp      adv?                                         {%nonterminal("vbn_vp_pp_moved")%}   # verb with prepositional phrase argument (ex: "have looked")
    | adv? vbn_np_pp   adv?        np                               {%nonterminal("vbn_vp_pp_moved")%}   # transitive verb with prepositional phrase argument (ex: "have put the book")

# non-finite verb phrase with a prepositional phrase stranded
vbn_vp_pp_stranded ->
      adv? vbn_pp      adv?        preposition                         {%nonterminal("inf_vp_pp_moved")%} # verb with prepositional phrase argument (ex: "have looked at")
    | adv? vbn_np_pp   adv?        np              preposition         {%nonterminal("inf_vp_pp_moved")%} # transitive verb with prepositional phrase argument (ex: "have put the book on")

# a present participle / gerund verb phrase
vbg_vp -> 
      adv? vbg                      adv?                                      {%nonterminal("vbg_vp")%} # intransitive verb (ex: "breaking")
    | adv? vbg_pp                   adv? pp                                   {%nonterminal("vbg_vp")%} # verb with prepositional phrase argument (ex: "looking at the book")
    | adv? vbg_ap                   adv? ap                                   {%nonterminal("vbg_vp")%} # verb with adjective phrase argument (ex: "seeming happy")
    | adv? vbg_to_inf_cl            adv? to_inf_cl                            {%nonterminal("vbg_vp")%} # verb with infinitive clause argument (ex: "wanting to eat")
    | adv? vbg_bare_inf_cl          adv? bare_inf_cl                          {%nonterminal("vbg_vp")%} # verb with bare infinitive clause argument (ex: "helping eat")
    | adv? vbg_declarative_cl       adv? declarative_cl                       {%nonterminal("vbg_vp")%} # verb with declarative content clause argument (ex: "knowing that you eat")
    | adv? vbg_exclamative_cl       adv? exclamative_cl                       {%nonterminal("vbg_vp")%} # verb with exclamative content clause argument (ex: "saying how expensive it was.")
    | adv? vbg_interrogative_cl     adv? interrogative_cl                     {%nonterminal("vbg_vp")%} # verb with interrogative clause argument (ex: "knowing what you eat")
    | adv? vbg_np                   adv? np                                   {%nonterminal("vbg_vp")%} # transitive verb (ex: "eating food")    
    | adv? vbg_np_pp                adv? np               pp                  {%nonterminal("vbg_vp")%} # transitive verb with prepositional phrase argument (ex: "putting the book on the table")
    | adv? vbg_np_ap                adv? np               ap                  {%nonterminal("vbg_vp")%} # transitive verb with adjective phrase argument (ex: "finding you happy")
    | adv? vbg_np_to_inf_cl         adv? np               to_inf_cl           {%nonterminal("vbg_vp")%} # transitive verb with infinitive verb argument (ex: "asking you to eat")
    | adv? vbg_np_bare_inf_cl       adv? np               bare_inf_cl         {%nonterminal("vbg_vp")%} # transitive verb with bare infinitive verb argument (ex: "making you eat")
    | adv? vbg_np_declarative_cl    adv? np               declarative_cl      {%nonterminal("vbg_vp")%} # transitive verb with declarative content clause argument (ex: "telling you that you eat")
    | adv? vbg_np_exclamative_cl    adv? np               exclamative_cl      {%nonterminal("vbg_vp")%} # transitive verb with exclamative content clause argument (ex: "telling you how expensive it was")
    | adv? vbg_np_interrogative_cl  adv? np               interrogative_cl    {%nonterminal("vbg_vp")%} # transitive verb with interrogative clause argument (ex: "asking you what you eat")
    | adv? vbg_np_np                adv? np               np                  {%nonterminal("vbg_vp")%} # ditransitive verb (ex: "giving you food")

# non-finite verb phrase with a noun phrase moved
vbg_vp_np_moved ->
      adv? vbg_np                   adv?                                    {%nonterminal("vbg_vp_np_moved")%}  # transitive verb (ex: "eating")
    | adv? vbg_np_pp                adv? pp                                 {%nonterminal("vbg_vp_np_moved")%}  # transitive verb with prepositional phrase argument (ex: "putting on the table")
    | adv? vbg_np_ap                adv? ap                                 {%nonterminal("vbg_vp_np_moved")%}  # transitive verb with adjective phrase argument (ex: "finding happy")
    | adv? vbg_np_to_inf_cl         adv? to_inf_cl                          {%nonterminal("vbg_vp_np_moved")%}  # transitive verb with infinitive verb argument (ex: "asking to eat")
    | adv? vbg_np_bare_inf_cl       adv? bare_inf_cl                        {%nonterminal("vbg_vp_np_moved")%}  # transitive verb with bare infinitive verb argument (ex: "making eat")
    | adv? vbg_np_declarative_cl    adv? declarative_cl                     {%nonterminal("vbg_vp_np_moved")%}  # transitive verb with declarative content clause argument (ex: "telling that you eat")
    | adv? vbg_np_exclamative_cl    adv? exclamative_cl                     {%nonterminal("vbg_vp_np_moved")%}  # transitive verb with exclamative content clause argument (ex: "telling how expensive it was")
    | adv? vbg_np_interrogative_cl  adv? interrogative_cl                   {%nonterminal("vbg_vp_np_moved")%}  # transitive verb with interrogative clause argument (ex: "asking what you eat")
    | adv? vbg_np_np                adv? np                                 {%nonterminal("vbg_vp_np_moved")%}  # ditransitive verb (ex: "giving food")

# non-finite verb phrase with a prepositional phrase moved
vbg_vp_pp_moved ->
      adv? vbg_pp      adv?                                         {%nonterminal("vbn_vp_pp_moved")%}   # verb with prepositional phrase argument (ex: "looking")
    | adv? vbg_np_pp   adv?        np                               {%nonterminal("vbn_vp_pp_moved")%}   # transitive verb with prepositional phrase argument (ex: "putting the book")

# non-finite verb phrase with a prepositional phrase stranded
vbg_vp_pp_stranded ->
      adv? vbg_pp      adv?        preposition                         {%nonterminal("inf_vp_pp_moved")%} # verb with prepositional phrase argument (ex: "looking at")
    | adv? vbg_np_pp   adv?        np              preposition         {%nonterminal("inf_vp_pp_moved")%} # transitive verb with prepositional phrase argument (ex: "putting the book on")

# a declarative content clause
declarative_cl ->  that decl_fin_cl                   {%nonterminal("declarative_cl")%}

# an exclamative content clause (TODO)
exclamative_cl -> interrogative_cl                    {%nonterminal("exclamative_cl")%}

# an interrogative content clause
interrogative_cl -> 
      fin_vp_wh_moved               pp_list                                 {%nonterminal("interrogative_cl")%} # open interrogative clause with move from the core arguments
    | wh_pp                         fin_vp       pp_list                    {%nonterminal("interrogative_cl")%} # open interrogative clause with move from the adjuncts using pied piping (ex: "to where I go")
    | wh_np                         fin_vp       preposition    pp_list     {%nonterminal("interrogative_cl")%} # open interrogative clause with move from the adjuncts using preposition stranding (ex: "where I go to")    
    | interrogative_subordinator    decl_fin_cl                             {%nonterminal("interrogative_cl")%} # closed interrogative clause (ex: "whether you eat the apple")


fin_vp_wh_moved -> 
# we ask about the subject
      wh_np vp                                                                    {%nonterminal("fin_vp_wh_moved")%} # intransitive verb (ex: "Who smokes")
    | wh_np vp_pp                      pp                                         {%nonterminal("fin_vp_wh_moved")%} # intransitive verb with prepositional phrase argument (ex: "Who looks at the book")
    | wh_np vp_ap                      ap                                         {%nonterminal("fin_vp_wh_moved")%} # intransitive verb with adjective phrase argument (ex: "Who seems happy")
    | wh_np vp_to_inf_cl               to_inf_cl                                  {%nonterminal("fin_vp_wh_moved")%} # intransitive verb with infinitive clause argument (ex: "Who wants to eat")
    | wh_np vp_bare_inf_cl             bare_inf_cl                                {%nonterminal("fin_vp_wh_moved")%} # intransitive verb with bare infinitive clause argument (ex: "Who might eat")
    | wh_np vp_declarative_cl          declarative_cl                             {%nonterminal("fin_vp_wh_moved")%} # intransitive verb with declarative content clause argument (ex: "Who knows that you eat")
    | wh_np vp_exclamative_cl          exclamative_cl                             {%nonterminal("fin_vp_wh_moved")%} # intransitive verb with exclamative content clause argument (ex: "Who said how expensive it was.")
    | wh_np vp_interrogative_cl        interrogative_cl                           {%nonterminal("fin_vp_wh_moved")%} # intransitive verb with interrogative clause argument (ex: "Who knows what you eat")
    | wh_np vp_np                      np                                         {%nonterminal("fin_vp_wh_moved")%} # transitive verb (ex: "Who eats food")
    | wh_np vp_np_pp                   np              pp                         {%nonterminal("fin_vp_wh_moved")%} # transitive verb with prepositional phrase argument (ex: "Who put the book on the table")
    | wh_np vp_np_ap                   np              ap                         {%nonterminal("fin_vp_wh_moved")%} # transitive verb with adjective phrase argument (ex: "Who finds you happy")
    | wh_np vp_np_to_inf_cl            np              to_inf_cl                  {%nonterminal("fin_vp_wh_moved")%} # transitive verb with infinitive verb argument (ex: "Who asks you to eat")
    | wh_np vp_np_bare_inf_cl          np              bare_inf_cl                {%nonterminal("fin_vp_wh_moved")%} # transitive verb with bare infinitive verb argument (ex: "Who makes you eat")
    | wh_np vp_np_declarative_cl       np              declarative_cl             {%nonterminal("fin_vp_wh_moved")%} # transitive verb with declarative content clause argument (ex: "Who tells you that you eat")
    | wh_np vp_np_declarative_cl       np              exclamative_cl             {%nonterminal("fin_vp_wh_moved")%} # transitive verb with exclamative content clause argument (ex: "Who told you how expensive it was")
    | wh_np vp_np_interrogative_cl     np              interrogative_cl           {%nonterminal("fin_vp_wh_moved")%} # transitive verb with interrogative clause argument (ex: "Who asks you what you eat")
    | wh_np vp_np_np                   np              np                         {%nonterminal("fin_vp_wh_moved")%} # ditransitive verb (ex: "Who gives you food")
    | wh_np vp_np_np                   np              to               np        {%nonterminal("fin_vp_wh_moved")%} # ditransitive verb with dative shift (ex: "Who gives the book to you")
# we ask about the direct object
    | wh_np np vp_np                                                {%nonterminal("fin_vp_wh_moved")%} # transitive verb (ex: "What I eat")
    | wh_np np vp_np_pp                pp                           {%nonterminal("fin_vp_wh_moved")%} # transitive verb with prepositional phrase argument (ex: "What I put on the table")
    | wh_np np vp_np_ap                ap                           {%nonterminal("fin_vp_wh_moved")%} # transitive verb with adjective phrase argument (ex: "Who I find happy")
    | wh_np np vp_np_to_inf_cl         to_inf_cl                    {%nonterminal("fin_vp_wh_moved")%} # transitive verb with infinitive verb argument (ex: "Who I ask to eat")
    | wh_np np vp_np_bare_inf_cl       bare_inf_cl                  {%nonterminal("fin_vp_wh_moved")%} # transitive verb with bare infinitive verb argument (ex: "Who I make eat")
    | wh_np np vp_np_declarative_cl    declarative_cl               {%nonterminal("fin_vp_wh_moved")%} # transitive verb with declarative content clause argument (ex: "Who I tell that you eat")
    | wh_np np vp_np_exclamative_cl    exclamative_cl               {%nonterminal("fin_vp_wh_moved")%} # transitive verb with exclamative content clause argument (ex: "Who told you how expensive it was")
    | wh_np np vp_np_interrogative_cl  interrogative_cl             {%nonterminal("fin_vp_wh_moved")%} # transitive verb with interrogative clause argument (ex: "Who asks you what you eat")
    | wh_np np vp_np_np                np                           {%nonterminal("fin_vp_wh_moved")%} # ditransitive verb (ex: "What I give you")
    | wh_np np vp_np_np                to            np             {%nonterminal("fin_vp_wh_moved")%} # ditransitive verb with dative shift (ex: "What I give to you")
# we ask about the indirect object
    |  to wh_np np vp_np_np                 np                      {%nonterminal("fin_vp_wh_moved")%} # ditransitive verb (ex: "To who I give food")
    |     wh_np np vp_np_np                 np              to      {%nonterminal("fin_vp_wh_moved")%} # ditransitive verb with dative shift (ex: "Who I give food to")
# we ask about something in the preposition
    | wh_pp    vp_pp                                                {%nonterminal("fin_vp_wh_moved")%} # intransitive verb with prepositional phrase argument using pied piping (ex: "At what I look")
    | wh_np    vp_pp                          preposition            {%nonterminal("fin_vp_wh_moved")%} # transitive verb with prepositional phrase argument using preposition stranding (ex: "What I look at")
    | wh_pp np vp_np_pp                     pp                      {%nonterminal("fin_vp_wh_moved")%} # transitive verb with prepositional phrase argument using pied piping (ex: "On what I put the book")
    | wh_np np vp_np_pp                       preposition            {%nonterminal("fin_vp_wh_moved")%} # transitive verb with prepositional phrase argument using preposition stranding (ex: "What I put the book on")
# we ask about something in the inf clause
    | wh_np    vp_to_inf_cl                 to_inf_cl_np_moved {%nonterminal("fin_vp_wh_moved")%} # intransitive verb with infinitive clause argument using (ex: "What I want to eat")
    | wh_pp    vp_to_inf_cl                 to_inf_cl_pp_moved      {%nonterminal("fin_vp_wh_moved")%} # intransitive verb with infinitive clause argument using pied piping (ex: "To where I want to go")
    | wh_np    vp_to_inf_cl                 to_inf_cl_pp_stranded   {%nonterminal("fin_vp_wh_moved")%} # intransitive verb with infinitive clause argument using preposition stranding (ex: "where I want to go to")
    | wh_np np vp_np_to_inf_cl              to_inf_cl_np_moved {%nonterminal("fin_vp_wh_moved")%} # transitive verb with infinitive clause argument (ex: "What I want you to eat")
    | wh_pp np vp_np_to_inf_cl              to_inf_cl_pp_moved      {%nonterminal("fin_vp_wh_moved")%} # transitive verb with infinitive clause argument using pied piping (ex: "To where I want you to go")
    | wh_np np vp_np_to_inf_cl              to_inf_cl_pp_stranded   {%nonterminal("fin_vp_wh_moved")%} # transitive verb with infinitive clause argument using preposition stranding (ex: "Where I want you to go to")
# we ask about something in the bare inf clause
    | wh_np    vp_bare_inf_cl               bare_inf_cl_np_moved   {%nonterminal("fin_vp_wh_moved")%} # intransitive verb with bare infinitive clause argument (ex: "What I might eat")
    | wh_pp    vp_bare_inf_cl               bare_inf_cl_pp_moved        {%nonterminal("fin_vp_wh_moved")%} # intransitive verb with bare infinitive clause argument using pied piping (ex: "To where I might go")
    | wh_np    vp_bare_inf_cl               bare_inf_cl_pp_stranded     {%nonterminal("fin_vp_wh_moved")%} # intransitive verb with bare infinitive clause argument using preposition stranding (ex: "where I might go to")
    | wh_np np vp_np_bare_inf_cl            bare_inf_cl_np_moved   {%nonterminal("fin_vp_wh_moved")%} # transitive verb with bare infinitive clause argument (ex: "What I might make you eat")
    | wh_pp np vp_np_bare_inf_cl            bare_inf_cl_pp_moved        {%nonterminal("fin_vp_wh_moved")%} # transitive verb with bare infinitive clause argument using pied piping (ex: "To where I might make you go")
    | wh_np np vp_np_bare_inf_cl            bare_inf_cl_pp_stranded     {%nonterminal("fin_vp_wh_moved")%} # transitive verb with bare infinitive clause argument using preposition stranding (ex: "Where I might make you go to")
# we ask about something in the declarative content clause
    | wh_np    vp_declarative_cl              declarative_cl_np_moved  {%nonterminal("fin_vp_wh_moved")%} # intransitive verb with declarative content clause argument (ex: "What I know that you eat")
    | wh_pp    vp_declarative_cl              declarative_cl_pp_moved       {%nonterminal("fin_vp_wh_moved")%} # intransitive verb with declarative content clause argument using pied piping (ex: "To where I know that you go")
    | wh_np    vp_declarative_cl              declarative_cl_pp_stranded    {%nonterminal("fin_vp_wh_moved")%} # intransitive verb with declarative content clause argument using preposition stranding (ex: "where I know that you go to")
    | wh_np np vp_np_declarative_cl           declarative_cl_np_moved  {%nonterminal("fin_vp_wh_moved")%} # transitive verb with declarative content clause argument (ex: "What I told you that he eats")
    | wh_pp np vp_np_declarative_cl           declarative_cl_pp_moved       {%nonterminal("fin_vp_wh_moved")%} # transitive verb with declarative content clause argument using pied piping (ex: "To where I told him that you go")
    | wh_np np vp_np_declarative_cl           declarative_cl_pp_stranded    {%nonterminal("fin_vp_wh_moved")%} # transitive verb with declarative content clause argument using preposition stranding (ex: "Where I told him that you go to")

# note: we can't ask about something in the wh-content or exclamative content clause because it's ungrammatical

# a content clause with some np moved
declarative_cl_np_moved ->  that fin_vp_np_moved pp_list       {%nonterminal("declarative_cl_np_moved")%}
declarative_cl_pp_moved ->  that fin_vp_pp_moved pp_list            {%nonterminal("declarative_cl_pp_moved")%}
declarative_cl_pp_stranded ->  that fin_vp_pp_stranded pp_list      {%nonterminal("declarative_cl_pp_stranded")%}

# a declarative clause but one of the noun phrases has been moved out of it
# this happens when a declarative clause is inside an interrogative clause
# this happens in sentences like "i know that you think that he eats the apple" -> "i know what you think that he eats"
fin_vp_np_moved -> 
      np vp_np                                                 {%nonterminal("fin_vp_np_moved")%} # transitive verb (ex: "that I eat")
    | np vp_np_pp                 pp                           {%nonterminal("fin_vp_np_moved")%} # transitive verb with prepositional phrase argument (ex: "that I put on the table")
    | np vp_np_ap                 ap                           {%nonterminal("fin_vp_np_moved")%} # transitive verb with adjective phrase argument (ex: "that I find happy")
    | np vp_np_to_inf_cl          to_inf_cl                    {%nonterminal("fin_vp_np_moved")%} # transitive verb with infinitive verb argument (ex: "that I ask to eat")
    | np vp_np_bare_inf_cl        bare_inf_cl                  {%nonterminal("fin_vp_np_moved")%} # transitive verb with bare infinitive verb argument (ex: "that I make eat")
    | np vp_np_declarative_cl     declarative_cl               {%nonterminal("fin_vp_np_moved")%} # transitive verb with declarative content clause argument (ex: "who I tell that you eat")
    | np vp_np_exclamative_cl     exclamative_cl               {%nonterminal("fin_vp_np_moved")%} # transitive verb with exclamative content clause argument (ex: "who I told how expensive it was")
    | np vp_np_interrogative_cl   interrogative_cl             {%nonterminal("fin_vp_np_moved")%} # transitive verb with interrogative clause argument (ex: "who I ask what you eat")
    | np vp_np_np                 np                           {%nonterminal("fin_vp_np_moved")%} # ditransitive verb (ex: "that I give food")

# a prepositional phrase moved
fin_vp_pp_moved -> 
      np vp_pp                                                {%nonterminal("fin_vp_pp_moved")%}  # verb with prepositional phrase argument (ex: "that I look")
    | np vp_np_pp           np                                {%nonterminal("fin_vp_pp_moved")%}  # transitive verb with prepositional phrase argument (ex: "that I put the book on")

# a prepositional phrase stranded
fin_vp_pp_stranded -> 
      np vp_pp              preposition                      {%nonterminal("fin_vp_pp_moved")%}  # verb with prepositional phrase argument (ex: "that I look at")
    | np vp_np_pp           np           preposition         {%nonterminal("fin_vp_pp_moved")%}  # transitive verb with prepositional phrase argument (ex: "that I put the book on")


np ->
    precorenp_modifier_list core_np postcorenp_modifier_list  {%nonterminal("np")%}

precorenp_modifier_list -> precorenp_modifier:* {%nonterminal_unpack("precorenp_modifier_list")%} 

postcorenp_modifier_list -> %postcorenp_modifier:* {%nonterminal_unpack("postcorenp_modifier_list")%}
# a noun phrase not including peripheral modifiers
core_np -> 
                    proper_noun                                     {%nonterminal("core_np")%}  # a proper noun (ex: "John", "Mary")
    |               pronoun                                         {%nonterminal("core_np")%}  # a pronoun (ex: "I", "you", "he", "she", "it", "we", "they")
    |     ap_list   uncountable_noun n_modifier_list                {%nonterminal("core_np")%}  # an uncountable noun with an adjective phrase (ex: "happy music") 
    | dp  ap_list   noun             n_modifier_list                {%nonterminal("core_np")%}  # determiner phrase followed by a nominal (ex: "even all the lovely food too")


# a noun phrase that has been moved to the front (wh-movement)
wh_np -> wh    {%nonterminal("wh_np")%} 
       | wh np {%nonterminal("wh_np")%}


# a specifier coming after the noun
n_modifier -> declarative_cl  {%nonterminal("n_modifier")%} # a relative clause specifying the noun (ex: president who was elected) (ex: box that is on the table)
            | pp              {%nonterminal("n_modifier")%} # a prepositional phrase specifying the noun (ex: "the book on the table")

n_modifier_list -> n_modifier:* {%nonterminal_unpack("n_modifier_list")%}
# a determiner phrase
dp -> det         {%nonterminal("det")%} # the, a, an, some, this, that
    | np s        {%nonterminal("det")%} # a noun phrase followed by a possessive suffix (ex: "John's")
    | pronoun_pos {%nonterminal("det")%} # a possessive pronoun (ex: "my", "yours", "his", "hers", "ours", "theirs")


# a prepositional phrase
pp ->   preposition np {%nonterminal("pp")%}

pp_list -> pp:* {%nonterminal_unpack("pp_list")%}

# a prepositional phrase that has been moved to the front (pied piping)
wh_pp ->   preposition wh_np {%nonterminal("wh_pp")%}

# an adjective phrase
ap -> advp ap   {%nonterminal("ap")%} # an adverb phrase followed by an adjective phrase (ex: "very happy") 
    | adj       {%nonterminal("ap")%} # an adjective (ex: "happy")
    | adj_pp pp {%nonterminal("ap")%} # an adjective with a prepositional phrase argument (ex: "fond of music")

# a sequence of aps
ap_list -> ap:* {%nonterminal_unpack("ap_list")%}

# an adverb phrase
advp -> adv  {%nonterminal("advp")%} # an adverb (ex: "quickly")
      | advp advp {%nonterminal("advp")%} # an adverb phrase followed by another adverb phrase (ex: "very quickly")


# terminals

det -> %det {%terminal("det")%}
pronoun -> %pronoun {%terminal("pronoun")%}
pronoun_pos -> %pronoun_pos {%terminal("pronoun_pos")%}
proper_noun -> %proper_noun {%terminal("proper_noun")%}
uncountable_noun -> %uncountable_noun {%terminal("uncountable_noun")%}
noun -> %noun {%terminal("noun")%}
preposition -> %preposition {%terminal("preposition")%}
to -> %to {%terminal("to")%}
s -> %s {%terminal("s")%}
that -> %that {%terminal("that")%}
interrogative_subordinator -> %interrogative_subordinator {%terminal("interrogative_subordinator")%}
vb -> %vb {%terminal("vb")%}
vb_pp -> %vb_pp {%terminal("vb_pp")%}
vb_ap -> %vb_ap {%terminal("vb_ap")%}
vb_to_inf_cl -> %vb_to_inf_cl {%terminal("vb_to_inf_cl")%}
vb_bare_inf_cl -> %vb_bare_inf_cl {%terminal("vb_bare_inf_cl")%}
vb_declarative_cl -> %vb_declarative_cl {%terminal("vb_declarative_cl")%}
vb_exclamative_cl -> %vb_exclamative_cl {%terminal("vb_exclamative_cl")%}
vb_interrogative_cl -> %vb_interrogative_cl {%terminal("vb_interrogative_cl")%}
vb_np -> %vb_np {%terminal("vb_np")%}
vb_np_pp -> %vb_np_pp {%terminal("vb_np_pp")%}
vb_np_ap -> %vb_np_ap {%terminal("vb_np_ap")%}
vb_np_to_inf_cl -> %vb_np_to_inf_cl {%terminal("vb_np_to_inf_cl")%}
vb_np_bare_inf_cl -> %vb_np_bare_inf_cl {%terminal("vb_np_bare_inf_cl")%}
vb_np_declarative_cl -> %vb_np_declarative_cl {%terminal("vb_np_declarative_cl")%}
vb_np_exclamative_cl -> %vb_np_exclamative_cl {%terminal("vb_np_exclamative_cl")%}
vb_np_interrogative_cl -> %vb_np_interrogative_cl {%terminal("vb_np_interrogative_cl")%}
vb_np_np -> %vb_np_np {%terminal("vb_np_np")%}
vbd -> %vbd {%terminal("vbd")%}
vbd_pp -> %vbd_pp {%terminal("vbd_pp")%}
vbd_ap -> %vbd_ap {%terminal("vbd_ap")%}
vbd_to_inf_cl -> %vbd_to_inf_cl {%terminal("vbd_to_inf_cl")%}
vbd_bare_inf_cl -> %vbd_bare_inf_cl {%terminal("vbd_bare_inf_cl")%}
vbd_declarative_cl -> %vbd_declarative_cl {%terminal("vbd_declarative_cl")%}
vbd_exclamative_cl -> %vbd_exclamative_cl {%terminal("vbd_exclamative_cl")%}
vbd_interrogative_cl -> %vbd_interrogative_cl {%terminal("vbd_interrogative_cl")%}
vbd_np -> %vbd_np {%terminal("vbd_np")%}
vbd_np_pp -> %vbd_np_pp {%terminal("vbd_np_pp")%}
vbd_np_ap -> %vbd_np_ap {%terminal("vbd_np_ap")%}
vbd_np_to_inf_cl -> %vbd_np_to_inf_cl {%terminal("vbd_np_to_inf_cl")%}
vbd_np_bare_inf_cl -> %vbd_np_bare_inf_cl {%terminal("vbd_np_bare_inf_cl")%}
vbd_np_declarative_cl -> %vbd_np_declarative_cl {%terminal("vbd_np_declarative_cl")%}
vbd_np_exclamative_cl -> %vbd_np_exclamative_cl {%terminal("vbd_np_exclamative_cl")%}
vbd_np_interrogative_cl -> %vbd_np_interrogative_cl {%terminal("vbd_np_interrogative_cl")%}
vbd_np_np -> %vbd_np_np {%terminal("vbd_np_np")%}
vbg -> %vbg {%terminal("vbg")%}
vbg_pp -> %vbg_pp {%terminal("vbg_pp")%}
vbg_ap -> %vbg_ap {%terminal("vbg_ap")%}
vbg_to_inf_cl -> %vbg_to_inf_cl {%terminal("vbg_to_inf_cl")%}
vbg_bare_inf_cl -> %vbg_bare_inf_cl {%terminal("vbg_bare_inf_cl")%}
vbg_declarative_cl -> %vbg_declarative_cl {%terminal("vbg_declarative_cl")%}
vbg_exclamative_cl -> %vbg_exclamative_cl {%terminal("vbg_exclamative_cl")%}
vbg_interrogative_cl -> %vbg_interrogative_cl {%terminal("vbg_interrogative_cl")%}
vbg_np -> %vbg_np {%terminal("vbg_np")%}
vbg_np_pp -> %vbg_np_pp {%terminal("vbg_np_pp")%}
vbg_np_ap -> %vbg_np_ap {%terminal("vbg_np_ap")%}
vbg_np_to_inf_cl -> %vbg_np_to_inf_cl {%terminal("vbg_np_to_inf_cl")%}
vbg_np_bare_inf_cl -> %vbg_np_bare_inf_cl {%terminal("vbg_np_bare_inf_cl")%}
vbg_np_declarative_cl -> %vbg_np_declarative_cl {%terminal("vbg_np_declarative_cl")%}
vbg_np_exclamative_cl -> %vbg_np_exclamative_cl {%terminal("vbg_np_exclamative_cl")%}
vbg_np_interrogative_cl -> %vbg_np_interrogative_cl {%terminal("vbg_np_interrogative_cl")%}
vbg_np_np -> %vbg_np_np {%terminal("vbg_np_np")%}
vbn -> %vbn {%terminal("vbn")%}
vbn_pp -> %vbn_pp {%terminal("vbn_pp")%}
vbn_ap -> %vbn_ap {%terminal("vbn_ap")%}
vbn_to_inf_cl -> %vbn_to_inf_cl {%terminal("vbn_to_inf_cl")%}
vbn_bare_inf_cl -> %vbn_bare_inf_cl {%terminal("vbn_bare_inf_cl")%}
vbn_declarative_cl -> %vbn_declarative_cl {%terminal("vbn_declarative_cl")%}
vbn_exclamative_cl -> %vbn_exclamative_cl {%terminal("vbn_exclamative_cl")%}
vbn_interrogative_cl -> %vbn_interrogative_cl {%terminal("vbn_interrogative_cl")%}
vbn_np -> %vbn_np {%terminal("vbn_np")%}
vbn_np_pp -> %vbn_np_pp {%terminal("vbn_np_pp")%}
vbn_np_ap -> %vbn_np_ap {%terminal("vbn_np_ap")%}
vbn_np_to_inf_cl -> %vbn_np_to_inf_cl {%terminal("vbn_np_to_inf_cl")%}
vbn_np_bare_inf_cl -> %vbn_np_bare_inf_cl {%terminal("vbn_np_bare_inf_cl")%}
vbn_np_declarative_cl -> %vbn_np_declarative_cl {%terminal("vbn_np_declarative_cl")%}
vbn_np_exclamative_cl -> %vbn_np_exclamative_cl {%terminal("vbn_np_exclamative_cl")%}
vbn_np_interrogative_cl -> %vbn_np_interrogative_cl {%terminal("vbn_np_interrogative_cl")%}
vbn_np_np -> %vbn_np_np {%terminal("vbn_np_np")%}
vbp -> %vbp {%terminal("vbp")%}
vbp_pp -> %vbp_pp {%terminal("vbp_pp")%}
vbp_ap -> %vbp_ap {%terminal("vbp_ap")%}
vbp_to_inf_cl -> %vbp_to_inf_cl {%terminal("vbp_to_inf_cl")%}
vbp_bare_inf_cl -> %vbp_bare_inf_cl {%terminal("vbp_bare_inf_cl")%}
vbp_declarative_cl -> %vbp_declarative_cl {%terminal("vbp_declarative_cl")%}
vbp_exclamative_cl -> %vbp_exclamative_cl {%terminal("vbp_exclamative_cl")%}
vbp_interrogative_cl -> %vbp_interrogative_cl {%terminal("vbp_interrogative_cl")%}
vbp_np -> %vbp_np {%terminal("vbp_np")%}
vbp_np_pp -> %vbp_np_pp {%terminal("vbp_np_pp")%}
vbp_np_ap -> %vbp_np_ap {%terminal("vbp_np_ap")%}
vbp_np_to_inf_cl -> %vbp_np_to_inf_cl {%terminal("vbp_np_to_inf_cl")%}
vbp_np_bare_inf_cl -> %vbp_np_bare_inf_cl {%terminal("vbp_np_bare_inf_cl")%}
vbp_np_declarative_cl -> %vbp_np_declarative_cl {%terminal("vbp_np_declarative_cl")%}
vbp_np_exclamative_cl -> %vbp_np_exclamative_cl {%terminal("vbp_np_exclamative_cl")%}
vbp_np_interrogative_cl -> %vbp_np_interrogative_cl {%terminal("vbp_np_interrogative_cl")%}
vbp_np_np -> %vbp_np_np {%terminal("vbp_np_np")%}
vbz -> %vbz {%terminal("vbz")%}
vbz_pp -> %vbz_pp {%terminal("vbz_pp")%}
vbz_ap -> %vbz_ap {%terminal("vbz_ap")%}
vbz_to_inf_cl -> %vbz_to_inf_cl {%terminal("vbz_to_inf_cl")%}
vbz_bare_inf_cl -> %vbz_bare_inf_cl {%terminal("vbz_bare_inf_cl")%}
vbz_declarative_cl -> %vbz_declarative_cl {%terminal("vbz_declarative_cl")%}
vbz_exclamative_cl -> %vbz_exclamative_cl {%terminal("vbz_exclamative_cl")%}
vbz_interrogative_cl -> %vbz_interrogative_cl {%terminal("vbz_interrogative_cl")%}
vbz_np -> %vbz_np {%terminal("vbz_np")%}
vbz_np_pp -> %vbz_np_pp {%terminal("vbz_np_pp")%}
vbz_np_ap -> %vbz_np_ap {%terminal("vbz_np_ap")%}
vbz_np_to_inf_cl -> %vbz_np_to_inf_cl {%terminal("vbz_np_to_inf_cl")%}
vbz_np_bare_inf_cl -> %vbz_np_bare_inf_cl {%terminal("vbz_np_bare_inf_cl")%}
vbz_np_declarative_cl -> %vbz_np_declarative_cl {%terminal("vbz_np_declarative_cl")%}
vbz_np_exclamative_cl -> %vbz_np_exclamative_cl {%terminal("vbz_np_exclamative_cl")%}
vbz_np_interrogative_cl -> %vbz_np_interrogative_cl {%terminal("vbz_np_interrogative_cl")%}
vbz_np_np -> %vbz_np_np {%terminal("vbz_np_np")%}
adj -> %adj {%terminal("adj")%}
adj_pp -> %adj_pp {%terminal("adj_pp")%}
adv -> %adv {%terminal("adv")%}
wh -> %wh {%terminal("wh")%}
precorenp_modifier -> %precorenp_modifier {%terminal("precorenp_modifier")%}
postcorenp_modifier -> %postcorenp_modifier {%terminal("postcorenp_modifier")%}

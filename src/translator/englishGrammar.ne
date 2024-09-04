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

# a declarative finite clause
decl_fin_cl -> pp_list fin_vp pp_list {%(children) => ({kind: "decl_fin_cl", children})%}

fin_vp -> 
# complete preterite verb phrase
      np adv? vbd                     adv?                                       {%nt("fin_vp")%} # intransitive verb (ex: "I smoked")
    | np adv? vbd_pp                  adv? pp                                    {%nt("fin_vp")%} # intransitive verb with prepositional phrase argument (ex: "I looked at the book")
    | np adv? vbd_ap                  adv? ap                                    {%nt("fin_vp")%} # intransitive verb with adjective phrase argument (ex: "You seemed happy")
    | np adv? vbd_to_inf_cl           adv? to_inf_cl                             {%nt("fin_vp")%} # intransitive verb with infinitive clause argument (ex: "I wanted to bring the book")
    | np adv? vbd_bare_inf_cl         adv? bare_inf_cl                           {%nt("fin_vp")%} # intransitive verb with bare infinitive clause argument (ex: "I helped bring the book") 
    | np adv? vbd_declarative_cl      adv? declarative_cl                        {%nt("fin_vp")%} # intransitive verb with declarative content clause argument (ex: "I knew that you eat")
    | np adv? vbd_exclamative_cl      adv? exclamative_cl                        {%nt("fin_vp")%} # intransitive verb with exclamative content clause argument (ex: "I said how expensive it was.")
    | np adv? vbd_interrogative_cl    adv? interrogative_cl                      {%nt("fin_vp")%} # intransitive verb with interrogative clause argument (ex: "I knew what you eat")
    | np      vbd_vbg_cl                   vbg_cl                                {%nt("fin_vp")%} # past continuous (ex: "I was eating")
    | np      vbd_vbn_cl                   vbn_cl                                {%nt("fin_vp")%} # past perfect (ex: "He had eaten") OR passive voice (ex: "He was eaten")
    | np adv? vbd_np                  adv? np                                    {%nt("fin_vp")%} # transitive verb (ex: "I ate the apple")
    | np adv? vbd_np_pp               adv? np              pp                    {%nt("fin_vp")%} # transitive verb with prepositional phrase argument (ex: "I put the book on the table")
    | np adv? vbd_np_ap               adv? np              ap                    {%nt("fin_vp")%} # transitive verb with adjective phrase argument (ex: "I found you happy")
    | np adv? vbd_np_to_inf_cl        adv? np              to_inf_cl             {%nt("fin_vp")%} # transitive verb with infinitive verb argument (ex: "I asked you to eat the apple")
    | np adv? vbd_np_bare_inf_cl      adv? np              bare_inf_cl           {%nt("fin_vp")%} # transitive verb with bare infinitive verb argument (ex: "I made you eat the apple")
    | np adv? vbd_np_declarative_cl   adv? np              declarative_cl        {%nt("fin_vp")%} # transitive verb with declarative content clause argument (ex: "I told you that you eat the apple")
    | np adv? vbd_np_exclamative_cl   adv? np              exclamative_cl        {%nt("fin_vp")%} # transitive verb with exclamative content clause argument (ex: "I told you how expensive it was")
    | np adv? vbd_np_interrogative_cl adv? np              interrogative_cl      {%nt("fin_vp")%} # transitive verb with interrogative clause argument (ex: "I asked you what you eat")
    | np adv? vbd_np_np               adv? np              np                    {%nt("fin_vp")%} # ditransitive verb (ex: "I gave you food")
    | np adv? vbd_np_np               adv? np              to              np    {%nt("fin_vp")%} # ditransitive verb with dative shift (ex: "I gave the book to you")
# complete present verb phrase (non 3rd person singular)
    | np adv? vbp                     adv?                                       {%nt("fin_vp")%} # intransitive verb (ex: "I smoke")
    | np adv? vbp_pp                  adv? pp                                    {%nt("fin_vp")%} # intransitive verb with prepositional phrase argument (ex: "I look at the book")
    | np adv? vbp_ap                  adv? ap                                    {%nt("fin_vp")%} # intransitive verb with adjective phrase argument (ex: "You seem happy")
    | np adv? vbp_to_inf_cl           adv? to_inf_cl                             {%nt("fin_vp")%} # intransitive verb with infinitive clause argument (ex: "I want to eat")
    | np adv? vbp_bare_inf_cl         adv? bare_inf_cl                           {%nt("fin_vp")%} # intransitive verb with bare infinitive clause argument (ex: "I might eat")
    | np adv? vbp_declarative_cl      adv? declarative_cl                        {%nt("fin_vp")%} # intransitive verb with declarative content clause argument (ex: "I know that you eat")
    | np adv? vbp_exclamative_cl      adv? exclamative_cl                        {%nt("fin_vp")%} # intransitive verb with exclamative content clause argument (ex: "I said how expensive it was.")
    | np adv? vbp_interrogative_cl    adv? interrogative_cl                      {%nt("fin_vp")%} # intransitive verb with interrogative clause argument (ex: "I know what you eat")
    | np      vbp_vbg_cl                   vbg_cl                                {%nt("fin_vp")%} # present progressive (ex: "I am eating the apple")
    | np      vbp_vbn_cl                   vbn_cl                                {%nt("fin_vp")%} # present perfect (ex: "They have eaten")
    | np adv? vbp_np                  adv? np                                    {%nt("fin_vp")%} # transitive verb (ex: "I eat the apple")
    | np adv? vbp_np_pp               adv? np              pp                    {%nt("fin_vp")%} # transitive verb with prepositional phrase argument (ex: "I put the book on the table")
    | np adv? vbp_np_ap               adv? np              ap                    {%nt("fin_vp")%} # transitive verb with adjective phrase argument (ex: "I find you happy")
    | np adv? vbp_np_to_inf_cl        adv? np              to_inf_cl             {%nt("fin_vp")%} # transitive verb with infinitive verb argument (ex: "I ask you to eat the apple")
    | np adv? vbp_np_bare_inf_cl      adv? np              bare_inf_cl           {%nt("fin_vp")%} # transitive verb with bare infinitive verb argument (ex: "I make you eat the apple")
    | np adv? vbp_np_declarative_cl   adv? np              declarative_cl        {%nt("fin_vp")%} # transitive verb with declarative content clause argument (ex: "I tell you that you eat the apple")
    | np adv? vbp_np_exclamative_cl   adv? np              exclamative_cl        {%nt("fin_vp")%} # transitive verb with exclamative content clause argument (ex: "I told you how expensive it was")
    | np adv? vbp_np_interrogative_cl adv? np              interrogative_cl      {%nt("fin_vp")%} # transitive verb with interrogative clause argument (ex: "I ask you what you eat")
    | np adv? vbp_np_np               adv? np              np                    {%nt("fin_vp")%} # ditransitive verb (ex: "I give you food")
    | np adv? vbp_np_np               adv? np              to              np    {%nt("fin_vp")%} # ditransitive verb with dative shift (ex: "I give the book to you")
# complete present verb phrase (3rd person singular)
    | np adv? vbz                     adv?                                       {%nt("fin_vp")%} # intransitive verb (ex: "He smokes")
    | np adv? vbz_pp                  adv? pp                                    {%nt("fin_vp")%} # intransitive verb with prepositional phrase argument (ex: "He looks at the book")
    | np adv? vbz_ap                  adv? ap                                    {%nt("fin_vp")%} # intransitive verb with adjective phrase argument (ex: "He seems happy")
    | np adv? vbz_to_inf_cl           adv? to_inf_cl                             {%nt("fin_vp")%} # intransitive verb with infinitive clause argument (ex: "He wants to eat")
    | np adv? vbz_bare_inf_cl         adv? bare_inf_cl                           {%nt("fin_vp")%} # intransitive verb with bare infinitive clause argument (ex: "He might eat")
    | np adv? vbz_declarative_cl      adv? declarative_cl                        {%nt("fin_vp")%} # intransitive verb with declarative content clause argument (ex: "He knows that you eat")
    | np adv? vbz_exclamative_cl      adv? exclamative_cl                        {%nt("fin_vp")%} # intransitive verb with exclamative content clause argument (ex: "He says how expensive it was.")
    | np adv? vbz_interrogative_cl    adv? interrogative_cl                      {%nt("fin_vp")%} # intransitive verb with interrogative clause argument (ex: "He knows what you eat")
    | np      vbz_vbg_cl              adv? vbg_cl                                {%nt("fin_vp")%} # present progressive (ex: "He is eating")
    | np      vbz_vbn_cl              adv? vbn_cl                                {%nt("fin_vp")%} # present perfect (ex: "He has eaten")
    | np adv? vbz_np                  adv? np                                    {%nt("fin_vp")%} # transitive verb (ex: "He eats the apple")
    | np adv? vbz_np_pp               adv? np              pp                    {%nt("fin_vp")%} # transitive verb with prepositional phrase argument (ex: "He puts the book on the table")
    | np adv? vbz_np_ap               adv? np              ap                    {%nt("fin_vp")%} # transitive verb with adjective phrase argument (ex: "He finds you happy")
    | np adv? vbz_np_to_inf_cl        adv? np              to_inf_cl             {%nt("fin_vp")%} # transitive verb with infinitive verb argument (ex: "He asks you to eat the apple")
    | np adv? vbz_np_bare_inf_cl      adv? np              bare_inf_cl           {%nt("fin_vp")%} # transitive verb with bare infinitive verb argument (ex: "He makes you eat the apple")
    | np adv? vbz_np_declarative_cl   adv? np              declarative_cl        {%nt("fin_vp")%} # transitive verb with declarative content clause argument (ex: "He tells you that you eat the apple")
    | np adv? vbz_np_exclamative_cl   adv? np              exclamative_cl        {%nt("fin_vp")%} # transitive verb with exclamative content clause argument (ex: "He tells you how expensive it was")
    | np adv? vbz_np_interrogative_cl adv? np              interrogative_cl      {%nt("fin_vp")%} # transitive verb with interrogative clause argument (ex: "He asks you what you eat")
    | np adv? vbz_np_np               adv? np              np                    {%nt("fin_vp")%} # ditransitive verb (ex: "He gives you food")
    | np adv? vbz_np_np               adv? np              to              np    {%nt("fin_vp")%} # ditransitive verb with dative shift (ex: "He gives the book to you")

# a declarative clause but one of the noun phrases has been moved out of it
# this happens when a declarative clause is inside an interrogative clause
# this happens in sentences like "i know that you think that he eats the apple" -> "i know what you think that he eats"
fin_vp_np_moved -> 
      np vp_np                                                 {%nt("fin_vp_np_moved")%} # transitive verb (ex: "that I eat")
    | np vp_np_pp                 pp                           {%nt("fin_vp_np_moved")%} # transitive verb with prepositional phrase argument (ex: "that I put on the table")
    | np vp_np_ap                 ap                           {%nt("fin_vp_np_moved")%} # transitive verb with adjective phrase argument (ex: "that I find happy")
    | np vp_np_to_inf_cl          to_inf_cl                    {%nt("fin_vp_np_moved")%} # transitive verb with infinitive verb argument (ex: "that I ask to eat")
    | np vp_np_bare_inf_cl        bare_inf_cl                  {%nt("fin_vp_np_moved")%} # transitive verb with bare infinitive verb argument (ex: "that I make eat")
    | np vp_np_declarative_cl     declarative_cl               {%nt("fin_vp_np_moved")%} # transitive verb with declarative content clause argument (ex: "who I tell that you eat")
    | np vp_np_exclamative_cl     exclamative_cl               {%nt("fin_vp_np_moved")%} # transitive verb with exclamative content clause argument (ex: "who I told how expensive it was")
    | np vp_np_interrogative_cl   interrogative_cl             {%nt("fin_vp_np_moved")%} # transitive verb with interrogative clause argument (ex: "who I ask what you eat")
    | np vp_np_np                 np                           {%nt("fin_vp_np_moved")%} # ditransitive verb (ex: "that I give food")

# a prepositional phrase moved
fin_vp_pp_moved -> 
      np vp_pp                                                {%nt("fin_vp_pp_moved")%}  # verb with prepositional phrase argument (ex: "that I look")
    | np vp_np_pp           np                                {%nt("fin_vp_pp_moved")%}  # transitive verb with prepositional phrase argument (ex: "that I put the book on")

# a prepositional phrase stranded
fin_vp_pp_stranded -> 
      np vp_pp              preposition                      {%nt("fin_vp_pp_moved")%}  # verb with prepositional phrase argument (ex: "that I look at")
    | np vp_np_pp           np           preposition         {%nt("fin_vp_pp_moved")%}  # transitive verb with prepositional phrase argument (ex: "that I put the book on")



# a non-finite clause starting with "to"
to_inf_cl -> to bare_inf_cl                                  {%nt("to_inf_cl")%}
to_inf_cl_np_moved -> to bare_inf_cl_np_moved                {%nt("to_inf_cl_np_moved")%}
to_inf_cl_pp_moved -> to bare_inf_cl_pp_moved                {%nt("to_inf_cl_pp_moved")%}


# a non-finite clause with a bare infinitive
bare_inf_cl -> inf_vp pp_list                                {%nt("bare_inf_cl")%}
bare_inf_cl_np_moved -> inf_vp_np_moved pp_list              {%nt("bare_inf_cl_np_moved")%}
bare_inf_cl_pp_moved -> inf_vp_pp_moved pp_list              {%nt("bare_inf_cl_pp_moved")%}

# a non-finite verb phrase
inf_vp ->
      adv? vb                      adv?                                      {%nt("inf_vp")%} # intransitive verb (ex: "to smoke")
    | adv? vb_pp                   adv? pp                                   {%nt("inf_vp")%} # intransitive verb with prepositional phrase argument (ex: "to look at the book")
    | adv? vb_ap                   adv? ap                                   {%nt("inf_vp")%} # intransitive verb with adjective phrase argument (ex: "to seem happy")
    | adv? vb_to_inf_cl            adv? to_inf_cl                            {%nt("inf_vp")%} # intransitive verb with infinitive clause argument (ex: "to want to eat")
    | adv? vb_bare_inf_cl          adv? bare_inf_cl                          {%nt("inf_vp")%} # intransitive verb with bare infinitive clause argument (ex: "to help eat")
    | adv? vb_declarative_cl       adv? declarative_cl                       {%nt("inf_vp")%} # intransitive verb with declarative content clause argument (ex: "to know that you eat")
    | adv? vb_exclamative_cl       adv? exclamative_cl                       {%nt("inf_vp")%} # intransitive verb with exclamative content clause argument (ex: "to say how expensive it was.")
    | adv? vb_interrogative_cl     adv? interrogative_cl                     {%nt("inf_vp")%} # intransitive verb with interrogative clause argument (ex: "to know what you eat")
    |      vb_vbg_cl                    vbg_cl                               {%nt("inf_vp")%} # present continuous (ex: "to be eating")
    |      vb_vbn_cl                    vbn_cl                               {%nt("inf_vp")%} # present perfect (ex: "to have eaten") OR passive voice (ex: "to be eaten")
    | adv? vb_np                   adv? np                                   {%nt("inf_vp")%} # transitive verb (ex: "to eat food")    
    | adv? vb_np_pp                adv? np               pp                  {%nt("inf_vp")%} # transitive verb with prepositional phrase argument (ex: "to put the book on the table")
    | adv? vb_np_ap                adv? np               ap                  {%nt("inf_vp")%} # transitive verb with adjective phrase argument (ex: "to find you happy")
    | adv? vb_np_to_inf_cl         adv? np               to_inf_cl           {%nt("inf_vp")%} # transitive verb with infinitive verb argument (ex: "to ask you to eat")
    | adv? vb_np_bare_inf_cl       adv? np               bare_inf_cl         {%nt("inf_vp")%} # transitive verb with bare infinitive verb argument (ex: "to make you eat")
    | adv? vb_np_declarative_cl    adv? np               declarative_cl      {%nt("inf_vp")%} # transitive verb with declarative content clause argument (ex: "to tell you that you eat")
    | adv? vb_np_exclamative_cl    adv? np               exclamative_cl      {%nt("inf_vp")%} # transitive verb with exclamative content clause argument (ex: "to tell you how expensive it was")
    | adv? vb_np_interrogative_cl  adv? np               interrogative_cl    {%nt("inf_vp")%} # transitive verb with interrogative clause argument (ex: "to ask you what you eat")
    | adv? vb_np_np                adv? np               np                  {%nt("inf_vp")%} # ditransitive verb (ex: "to give you food")

# non-finite verb phrase with a noun phrase moved
inf_vp_np_moved ->
      adv? vb_pp                   adv? preposition                                    {%nt("inf_vp_np_moved")%} # I know what you want to [talk about]
    | adv? vb_ap                   adv? ap_np_moved                                    {%nt("inf_vp_np_moved")%} # I know what you want to [seem good at]
    | adv? vb_to_inf_cl            adv? to_inf_cl_np_moved                             {%nt("inf_vp_np_moved")%} # I know what you want to [ask to bring]
    | adv? vb_bare_inf_cl          adv? bare_inf_cl_np_moved                           {%nt("inf_vp_np_moved")%} # I know what you want to [help bring]
    | adv? vb_declarative_cl       adv? declarative_cl_np_moved                        {%nt("inf_vp_np_moved")%} # I know what you want to [say that you bring]
    |      vb_vbg_cl                    vbg_cl_np_moved                                {%nt("inf_vp_np_moved")%} # I know what you want to [be bringing]
    |      vb_vbn_cl                    vbn_cl_np_moved                                {%nt("inf_vp_np_moved")%} # I know what you want to [have brought] OR I know what you want to [be brought]
    | adv? vb_np                   adv?                                                {%nt("inf_vp_np_moved")%} # I know what you want to [bring]
    | adv? vb_np_pp                adv? pp                                             {%nt("inf_vp_np_moved")%} # I know what you want to [put on the table]
    | adv? vb_np_pp                adv? np                     preposition             {%nt("inf_vp_np_moved")%} # I know what you want to [put the book on]
    | adv? vb_np_ap                adv? ap                                             {%nt("inf_vp_np_moved")%} # I know who you want to [consider good at chess]
    | adv? vb_np_ap                adv? np                     ap_np_moved             {%nt("inf_vp_np_moved")%} # I know what you want to [consider Bob good at]
    | adv? vb_np_to_inf_cl         adv? to_inf_cl                                      {%nt("inf_vp_np_moved")%} # I know who you want to [ask to bring cheese]
    | adv? vb_np_to_inf_cl         adv? np                     to_inf_cl_np_moved      {%nt("inf_vp_np_moved")%} # I know what you want to [ask Bob to bring]
    | adv? vb_np_bare_inf_cl       adv? bare_inf_cl                                    {%nt("inf_vp_np_moved")%} # I know who you want to [help bring cheese]
    | adv? vb_np_bare_inf_cl       adv? np                     bare_inf_cl_np_moved    {%nt("inf_vp_np_moved")%} # I know what you want to [help Bob bring]
    | adv? vb_np_declarative_cl    adv? declarative_cl                                 {%nt("inf_vp_np_moved")%} # I know who you want to [tell that you bring cheese]
    | adv? vb_np_declarative_cl    adv? np                     declarative_cl_np_moved {%nt("inf_vp_np_moved")%} # I know what you want to [tell Bob that you bring]
    | adv? vb_np_exclamative_cl    adv? exclamative_cl                                 {%nt("inf_vp_np_moved")%} # I know who you want to [tell how expensive it is]
    | adv? vb_np_interrogative_cl  adv? interrogative_cl                               {%nt("inf_vp_np_moved")%} # I know who you want to [ask what Bob brings]
    | adv? vb_np_np                adv? np                                             {%nt("inf_vp_np_moved")%} # I know what you want to [give Bob]
    | adv? vb_np_np                adv? to                     np                      {%nt("inf_vp_np_moved")%} # I know who you want to [give the book to]


# non-finite verb phrase with a prepositional phrase moved
inf_vp_pp_moved ->
      adv? vb_pp                   adv?                                                 {%nt("inf_vp_pp_moved")%} # I know to where you want to [go]
    | adv? vb_ap                   adv?     ap_pp_moved                                 {%nt("inf_vp_pp_moved")%} # I know at what you want to [seem good]
    | adv? vb_to_inf_cl            adv?     to_inf_cl_pp_moved                          {%nt("inf_vp_pp_moved")%} # I know to where you want to [ask to go]
    | adv? vb_bare_inf_cl          adv?     bare_inf_cl_pp_moved                        {%nt("inf_vp_pp_moved")%} # I know to where you want to [help go]
    | adv? vb_declarative_cl       adv?     declarative_cl_pp_moved                     {%nt("inf_vp_pp_moved")%} # I know to where you want to [say that you go]
    | adv? vb_np_pp                adv?     np                                          {%nt("inf_vp_pp_moved")%} # I know on what you want to [put the book]
    | adv? vb_np_ap                adv?     np               ap_pp_moved                {%nt("inf_vp_pp_moved")%} # I know at what you want to [consider Bob good]
    | adv? vb_np_to_inf_cl         adv?     np               to_inf_cl_pp_moved         {%nt("inf_vp_pp_moved")%} # I know to where you want to [ask Bob to go]
    | adv? vb_np_bare_inf_cl       adv?     np               bare_inf_cl_pp_moved       {%nt("inf_vp_pp_moved")%} # I know to where you want to [help Bob go]
    | adv? vb_np_declarative_cl    adv?     np               declarative_cl_pp_moved    {%nt("inf_vp_pp_moved")%} # I know to where you want to [tell Bob that you go]



# a past participle verb phrase
vbn_vp ->
      adv? vbn                      adv?                                      {%nt("vbn_vp")%} # intransitive verb (ex: "to smoke")
    | adv? vbn_pp                   adv? pp                                   {%nt("vbn_vp")%} # intransitive verb with prepositional phrase argument (ex: "to look at the book")
    | adv? vbn_ap                   adv? ap                                   {%nt("vbn_vp")%} # intransitive verb with adjective phrase argument (ex: "to seem happy")
    | adv? vbn_to_inf_cl            adv? to_inf_cl                            {%nt("vbn_vp")%} # intransitive verb with infinitive clause argument (ex: "to want to eat")
    | adv? vbn_bare_inf_cl          adv? bare_inf_cl                          {%nt("vbn_vp")%} # intransitive verb with bare infinitive clause argument (ex: "to help eat")
    | adv? vbn_declarative_cl       adv? declarative_cl                       {%nt("vbn_vp")%} # intransitive verb with declarative content clause argument (ex: "to know that you eat")
    | adv? vbn_exclamative_cl       adv? exclamative_cl                       {%nt("vbn_vp")%} # intransitive verb with exclamative content clause argument (ex: "to say how expensive it was.")
    | adv? vbn_interrogative_cl     adv? interrogative_cl                     {%nt("vbn_vp")%} # intransitive verb with interrogative clause argument (ex: "to know what you eat")
    |      vbn_vbg_cl                    vbg_cl                               {%nt("vbn_vp")%} # present continuous (ex: "to be eating")
    |      vbn_vbn_cl                    vbn_cl                               {%nt("vbn_vp")%} # present perfect (ex: "to have eaten") OR passive voice (ex: "to be eaten")
    | adv? vbn_np                   adv? np                                   {%nt("vbn_vp")%} # transitive verb (ex: "to eat food")    
    | adv? vbn_np_pp                adv? np               pp                  {%nt("vbn_vp")%} # transitive verb with prepositional phrase argument (ex: "to put the book on the table")
    | adv? vbn_np_ap                adv? np               ap                  {%nt("vbn_vp")%} # transitive verb with adjective phrase argument (ex: "to find you happy")
    | adv? vbn_np_to_inf_cl         adv? np               to_inf_cl           {%nt("vbn_vp")%} # transitive verb with infinitive verb argument (ex: "to ask you to eat")
    | adv? vbn_np_bare_inf_cl       adv? np               bare_inf_cl         {%nt("vbn_vp")%} # transitive verb with bare infinitive verb argument (ex: "to make you eat")
    | adv? vbn_np_declarative_cl    adv? np               declarative_cl      {%nt("vbn_vp")%} # transitive verb with declarative content clause argument (ex: "to tell you that you eat")
    | adv? vbn_np_exclamative_cl    adv? np               exclamative_cl      {%nt("vbn_vp")%} # transitive verb with exclamative content clause argument (ex: "to tell you how expensive it was")
    | adv? vbn_np_interrogative_cl  adv? np               interrogative_cl    {%nt("vbn_vp")%} # transitive verb with interrogative clause argument (ex: "to ask you what you eat")
    | adv? vbn_np_np                adv? np               np                  {%nt("vbn_vp")%} # ditransitive verb (ex: "to give you food")

# past participle verb phrase with a noun phrase moved
vbn_vp_np_moved ->
      adv? vbn_pp                   adv? preposition                                    {%nt("vbd_vp_np_moved")%} # I know what you have [talked about]
    | adv? vbn_ap                   adv? ap_np_moved                                    {%nt("vbd_vp_np_moved")%} # I know what you have [seemed good at]
    | adv? vbn_to_inf_cl            adv? to_inf_cl_np_moved                             {%nt("vbd_vp_np_moved")%} # I know what you have [asked to bring]
    | adv? vbn_bare_inf_cl          adv? bare_inf_cl_np_moved                           {%nt("vbd_vp_np_moved")%} # I know what you have [helped bring]
    | adv? vbn_declarative_cl       adv? declarative_cl_np_moved                        {%nt("vbd_vp_np_moved")%} # I know what you have [said that you bring]
    |      vbn_vbg_cl                    vbg_cl_np_moved                                {%nt("vbd_vp_np_moved")%} # I know what you have [been bringing]
    |      vbn_vbn_cl                    vbn_cl_np_moved                                {%nt("vbd_vp_np_moved")%} # I know what you have [had brought] OR I know what you have [been brought]
    | adv? vbn_np                   adv?                                                {%nt("vbd_vp_np_moved")%} # I know what you have [brought]
    | adv? vbn_np_pp                adv? pp                                             {%nt("vbd_vp_np_moved")%} # I know what you have [put on the table]
    | adv? vbn_np_pp                adv? np                     preposition             {%nt("vbd_vp_np_moved")%} # I know what you have [put the book on]
    | adv? vbn_np_ap                adv? ap                                             {%nt("vbd_vp_np_moved")%} # I know who you have [considered good at chess]
    | adv? vbn_np_ap                adv? np                     ap_np_moved             {%nt("vbd_vp_np_moved")%} # I know what you have [considered Bob good at]
    | adv? vbn_np_to_inf_cl         adv? to_inf_cl                                      {%nt("vbd_vp_np_moved")%} # I know who you have [asked to bring cheese]
    | adv? vbn_np_to_inf_cl         adv? np                     to_inf_cl_np_moved      {%nt("vbd_vp_np_moved")%} # I know what you have [asked Bob to bring]
    | adv? vbn_np_bare_inf_cl       adv? bare_inf_cl                                    {%nt("vbd_vp_np_moved")%} # I know who you have [helped bring cheese]
    | adv? vbn_np_bare_inf_cl       adv? np                     bare_inf_cl_np_moved    {%nt("vbd_vp_np_moved")%} # I know what you have [helped Bob bring]
    | adv? vbn_np_declarative_cl    adv? declarative_cl                                 {%nt("vbd_vp_np_moved")%} # I know who you have [told that you bring cheese]
    | adv? vbn_np_declarative_cl    adv? np                     declarative_cl_np_moved {%nt("vbd_vp_np_moved")%} # I know what you have [told Bob that you bring]
    | adv? vbn_np_exclamative_cl    adv? exclamative_cl                                 {%nt("vbd_vp_np_moved")%} # I know who you have [told how expensive it is]
    | adv? vbn_np_interrogative_cl  adv? interrogative_cl                               {%nt("vbd_vp_np_moved")%} # I know who you have [asked what Bob brings]
    | adv? vbn_np_np                adv? np                                             {%nt("vbd_vp_np_moved")%} # I know what you have [given Bob]
    | adv? vbn_np_np                adv? to                     np                      {%nt("vbd_vp_np_moved")%} # I know who you have [given the book to]


# past participle verb phrase with a prepositional phrase moved
vbn_vp_pp_moved ->
      adv? vbd_pp                   adv?                                                 {%nt("vbd_vp_pp_moved")%} # I know to where you have [gone]
    | adv? vbd_ap                   adv?     ap_pp_moved                                 {%nt("vbd_vp_pp_moved")%} # I know at what you have [seemed good]
    | adv? vbd_to_inf_cl            adv?     to_inf_cl_pp_moved                          {%nt("vbd_vp_pp_moved")%} # I know to where you have [asked to go]
    | adv? vbd_bare_inf_cl          adv?     bare_inf_cl_pp_moved                        {%nt("vbd_vp_pp_moved")%} # I know to where you have [helped go]
    | adv? vbd_declarative_cl       adv?     declarative_cl_pp_moved                     {%nt("vbd_vp_pp_moved")%} # I know to where you have [said that you go]
    | adv? vbd_np_pp                adv?     np                                          {%nt("vbd_vp_pp_moved")%} # I know on what you have [put the book]
    | adv? vbd_np_ap                adv?     np               ap_pp_moved                {%nt("vbd_vp_pp_moved")%} # I know at what you have [considered Bob good]
    | adv? vbd_np_to_inf_cl         adv?     np               to_inf_cl_pp_moved         {%nt("vbd_vp_pp_moved")%} # I know to where you have [asked Bob to go]
    | adv? vbd_np_bare_inf_cl       adv?     np               bare_inf_cl_pp_moved       {%nt("vbd_vp_pp_moved")%} # I know to where you have [helped Bob go]
    | adv? vbd_np_declarative_cl    adv?     np               declarative_cl_pp_moved    {%nt("vbd_vp_pp_moved")%} # I know to where you have [told Bob that you go]

# present participle / gerund verb phrase
vbg_vp ->
      adv? vbg                      adv?                                      {%nt("vbg_vp")%} # intransitive verb (ex: "smoking")
    | adv? vbg_pp                   adv? pp                                   {%nt("vbg_vp")%} # intransitive verb with prepositional phrase argument (ex: "looking at the book")
    | adv? vbg_ap                   adv? ap                                   {%nt("vbg_vp")%} # intransitive verb with adjective phrase argument (ex: "seeming happy")
    | adv? vbg_to_inf_cl            adv? to_inf_cl                            {%nt("vbg_vp")%} # intransitive verb with infinitive clause argument (ex: "wanting to eat")
    | adv? vbg_bare_inf_cl          adv? bare_inf_cl                          {%nt("vbg_vp")%} # intransitive verb with bare infinitive clause argument (ex: "helping eat")
    | adv? vbg_declarative_cl       adv? declarative_cl                       {%nt("vbg_vp")%} # intransitive verb with declarative content clause argument (ex: "knowing that you eat")
    | adv? vbg_exclamative_cl       adv? exclamative_cl                       {%nt("vbg_vp")%} # intransitive verb with exclamative content clause argument (ex: "saying how expensive it was.")
    | adv? vbg_interrogative_cl     adv? interrogative_cl                     {%nt("vbg_vp")%} # intransitive verb with interrogative clause argument (ex: "knowing what you eat")
    |      vbg_vbg_cl                    vbg_cl                               {%nt("vbg_vp")%} # present continuous (ex: "?? being eating")
    |      vbg_vbn_cl                    vbn_cl                               {%nt("vbg_vp")%} # passive voice (ex: "being eaten")
    | adv? vbg_np                   adv? np                                   {%nt("vbg_vp")%} # transitive verb (ex: "to eat food")    
    | adv? vbg_np_pp                adv? np               pp                  {%nt("vbg_vp")%} # transitive verb with prepositional phrase argument (ex: "putting the book on the table")
    | adv? vbg_np_ap                adv? np               ap                  {%nt("vbg_vp")%} # transitive verb with adjective phrase argument (ex: "finding you happy")
    | adv? vbg_np_to_inf_cl         adv? np               to_inf_cl           {%nt("vbg_vp")%} # transitive verb with infinitive verb argument (ex: "asking you to eat")
    | adv? vbg_np_bare_inf_cl       adv? np               bare_inf_cl         {%nt("vbg_vp")%} # transitive verb with bare infinitive verb argument (ex: "making you eat")
    | adv? vbg_np_declarative_cl    adv? np               declarative_cl      {%nt("vbg_vp")%} # transitive verb with declarative content clause argument (ex: "telling you that you eat")
    | adv? vbg_np_exclamative_cl    adv? np               exclamative_cl      {%nt("vbg_vp")%} # transitive verb with exclamative content clause argument (ex: "telling you how expensive it was")
    | adv? vbg_np_interrogative_cl  adv? np               interrogative_cl    {%nt("vbg_vp")%} # transitive verb with interrogative clause argument (ex: "asking you what you eat")
    | adv? vbg_np_np                adv? np               np                  {%nt("vbg_vp")%} # ditransitive verb (ex: "giving you food")

# present participle verb phrase with a noun phrase moved
vbg_vp_np_moved ->
      adv? vbg_pp                   adv? preposition                                    {%nt("vbg_vp_np_moved")%} # I know what you have [talked about]
    | adv? vbg_ap                   adv? ap_np_moved                                    {%nt("vbg_vp_np_moved")%} # I know what you have [seemed good at]
    | adv? vbg_to_inf_cl            adv? to_inf_cl_np_moved                             {%nt("vbg_vp_np_moved")%} # I know what you have [asked to bring]
    | adv? vbg_bare_inf_cl          adv? bare_inf_cl_np_moved                           {%nt("vbg_vp_np_moved")%} # I know what you have [helped bring]
    | adv? vbg_declarative_cl       adv? declarative_cl_np_moved                        {%nt("vbg_vp_np_moved")%} # I know what you have [said that you bring]
    |      vbg_vbg_cl                    vbg_cl_np_moved                                {%nt("vbg_vp_np_moved")%} # I know what you have [been bringing]
    |      vbg_vbn_cl                    vbn_cl_np_moved                                {%nt("vbg_vp_np_moved")%} # I know what you have [had brought] OR I know what you have [been brought]
    | adv? vbg_np                   adv?                                                {%nt("vbg_vp_np_moved")%} # I know what you have [brought]
    | adv? vbg_np_pp                adv? pp                                             {%nt("vbg_vp_np_moved")%} # I know what you have [put on the table]
    | adv? vbg_np_pp                adv? np                     preposition             {%nt("vbg_vp_np_moved")%} # I know what you have [put the book on]
    | adv? vbg_np_ap                adv? ap                                             {%nt("vbg_vp_np_moved")%} # I know who you have [considered good at chess]
    | adv? vbg_np_ap                adv? np                     ap_np_moved             {%nt("vbg_vp_np_moved")%} # I know what you have [considered Bob good at]
    | adv? vbg_np_to_inf_cl         adv? to_inf_cl                                      {%nt("vbg_vp_np_moved")%} # I know who you have [asked to bring cheese]
    | adv? vbg_np_to_inf_cl         adv? np                     to_inf_cl_np_moved      {%nt("vbg_vp_np_moved")%} # I know what you have [asked Bob to bring]
    | adv? vbg_np_bare_inf_cl       adv? bare_inf_cl                                    {%nt("vbg_vp_np_moved")%} # I know who you have [helped bring cheese]
    | adv? vbg_np_bare_inf_cl       adv? np                     bare_inf_cl_np_moved    {%nt("vbg_vp_np_moved")%} # I know what you have [helped Bob bring]
    | adv? vbg_np_declarative_cl    adv? declarative_cl                                 {%nt("vbg_vp_np_moved")%} # I know who you have [told that you bring cheese]
    | adv? vbg_np_declarative_cl    adv? np                     declarative_cl_np_moved {%nt("vbg_vp_np_moved")%} # I know what you have [told Bob that you bring]
    | adv? vbg_np_exclamative_cl    adv? exclamative_cl                                 {%nt("vbg_vp_np_moved")%} # I know who you have [told how expensive it is]
    | adv? vbg_np_interrogative_cl  adv? interrogative_cl                               {%nt("vbg_vp_np_moved")%} # I know who you have [asked what Bob brings]
    | adv? vbg_np_np                adv? np                                             {%nt("vbg_vp_np_moved")%} # I know what you have [given Bob]
    | adv? vbg_np_np                adv? to                     np                      {%nt("vbg_vp_np_moved")%} # I know who you have [given the book to]


# past participle verb phrase with a prepositional phrase moved
vbn_vp_pp_moved ->
      adv? vbg_pp                   adv?                                                 {%nt("vbg_vp_pp_moved")%} # I know to where you have [gone]
    | adv? vbg_ap                   adv?     ap_pp_moved                                 {%nt("vbg_vp_pp_moved")%} # I know at what you have [seemed good]
    | adv? vbg_to_inf_cl            adv?     to_inf_cl_pp_moved                          {%nt("vbg_vp_pp_moved")%} # I know to where you have [asked to go]
    | adv? vbg_bare_inf_cl          adv?     bare_inf_cl_pp_moved                        {%nt("vbg_vp_pp_moved")%} # I know to where you have [helped go]
    | adv? vbg_declarative_cl       adv?     declarative_cl_pp_moved                     {%nt("vbg_vp_pp_moved")%} # I know to where you have [said that you go]
    | adv? vbg_np_pp                adv?     np                                          {%nt("vbg_vp_pp_moved")%} # I know on what you have [put the book]
    | adv? vbg_np_ap                adv?     np               ap_pp_moved                {%nt("vbg_vp_pp_moved")%} # I know at what you have [considered Bob good]
    | adv? vbg_np_to_inf_cl         adv?     np               to_inf_cl_pp_moved         {%nt("vbg_vp_pp_moved")%} # I know to where you have [asked Bob to go]
    | adv? vbg_np_bare_inf_cl       adv?     np               bare_inf_cl_pp_moved       {%nt("vbg_vp_pp_moved")%} # I know to where you have [helped Bob go]
    | adv? vbg_np_declarative_cl    adv?     np               declarative_cl_pp_moved    {%nt("vbg_vp_pp_moved")%} # I know to where you have [told Bob that you go]


# a declarative content clause
declarative_cl ->  that decl_fin_cl                   {%nt("declarative_cl")%}

# an exclamative content clause (TODO)
exclamative_cl -> interrogative_cl                    {%nt("exclamative_cl")%}

# an interrogative content clause
interrogative_cl -> 
      wh_np                      fin_vp_np_moved              pp_list                    {%nt("interrogative_cl")%} # open interrogative clause with move from the core arguments
    | wh_pp                      fin_vp_pp_moved              pp_list                    {%nt("interrogative_cl")%} # open interrogative clause with move from the core arguments using pied piping (ex: "at where I look")
    | wh_pp                      fin_vp                       pp_list                    {%nt("interrogative_cl")%} # open interrogative clause with move from the adjuncts using pied piping (ex: "to where I go")
    | wh_np                      fin_vp          preposition  pp_list                    {%nt("interrogative_cl")%} # open interrogative clause with move from the adjuncts using preposition stranding (ex: "where I go to")    
    | interrogative_subordinator fin_vp                       pp_list                    {%nt("interrogative_cl")%} # closed interrogative clause (ex: "whether you eat the apple")

# a content clause with some np moved
declarative_cl_np_moved ->  that fin_vp_np_moved pp_list       {%nt("declarative_cl_np_moved")%}
declarative_cl_pp_moved ->  that fin_vp_pp_moved pp_list            {%nt("declarative_cl_pp_moved")%}
declarative_cl_pp_stranded ->  that fin_vp_pp_stranded pp_list      {%nt("declarative_cl_pp_stranded")%}


np ->
    precorenp_modifier_list core_np postcorenp_modifier_list  {%nt("np")%}

precorenp_modifier_list -> precorenp_modifier:* {%nonterminal_unpack("precorenp_modifier_list")%} 

postcorenp_modifier_list -> %postcorenp_modifier:* {%nonterminal_unpack("postcorenp_modifier_list")%}
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
ap -> advp ap   {%nt("ap")%} # an adverb phrase followed by an adjective phrase (ex: "very happy") 
    | adj       {%nt("ap")%} # an adjective (ex: "happy")
    | adj_pp pp {%nt("ap")%} # an adjective with a prepositional phrase argument (ex: "fond of music")

# a sequence of aps
ap_list -> ap:* {%nonterminal_unpack("ap_list")%}

# an adverb phrase
advp -> adv  {%nt("advp")%} # an adverb (ex: "quickly")
      | advp advp {%nt("advp")%} # an adverb phrase followed by another adverb phrase (ex: "very quickly")


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
that -> %that {%t("that")%}
interrogative_subordinator -> %interrogative_subordinator {%t("interrogative_subordinator")%}
vb -> %vb {%t("vb")%}
vb_pp -> %vb_pp {%t("vb_pp")%}
vb_ap -> %vb_ap {%t("vb_ap")%}
vb_to_inf_cl -> %vb_to_inf_cl {%t("vb_to_inf_cl")%}
vb_bare_inf_cl -> %vb_bare_inf_cl {%t("vb_bare_inf_cl")%}
vb_declarative_cl -> %vb_declarative_cl {%t("vb_declarative_cl")%}
vb_exclamative_cl -> %vb_exclamative_cl {%t("vb_exclamative_cl")%}
vb_interrogative_cl -> %vb_interrogative_cl {%t("vb_interrogative_cl")%}
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
adv -> %adv {%t("adv")%}
wh -> %wh {%t("wh")%}
precorenp_modifier -> %precorenp_modifier {%t("precorenp_modifier")%}
postcorenp_modifier -> %postcorenp_modifier {%t("postcorenp_modifier")%}

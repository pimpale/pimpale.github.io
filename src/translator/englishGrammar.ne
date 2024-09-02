@preprocessor typescript

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
const v = {test: x => x in english.v};
const v_pp = {test: x => x in english.v_pp};
const v_ap = {test: x => x in english.v_ap};
const v_to_inf_cl = {test: x => x in english.v_to_inf_cl};
const v_bare_inf_cl = {test: x => x in english.v_bare_inf_cl};
const v_declarative_cl = {test: x => x in english.v_declarative_cl};
const v_exclamative_cl = {test: x => x in english.v_exclamative_cl};
const v_interrogative_cl = {test: x => x in english.v_interrogative_cl};
const v_np = {test: x => x in english.v_np};
const v_np_pp = {test: x => x in english.v_np_pp};
const v_np_ap = {test: x => x in english.v_np_ap};
const v_np_to_inf_cl = {test: x => x in english.v_np_to_inf_cl};
const v_np_bare_inf_cl = {test: x => x in english.v_np_bare_inf_cl};
const v_np_declarative_cl = {test: x => x in english.v_np_declarative_cl};
const v_np_exclamative_cl = {test: x => x in english.v_np_exclamative_cl};
const v_np_interrogative_cl = {test: x => x in english.v_np_interrogative_cl};
const v_np_np = {test: x => x in english.v_np_np};

// adjectives
const adj = {test: x => x in english.adj}; // adjectives that don't take any arguments (ex: "happy")
const adj_pp = {test: x => x in english.adj_pp}; // adjectives that take a prepositional phrase argument (ex: "fond of cheese")

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
      np vp                                                           {%nonterminal("fin_vp")%} # intransitive verb (ex: "I smoke")
    | np vp_pp                  pp                                    {%nonterminal("fin_vp")%} # intransitive verb with prepositional phrase argument (ex: "I look at the book")
    | np vp_ap                  ap                                    {%nonterminal("fin_vp")%} # intransitive verb with adjective phrase argument (ex: "You seem happy")
    | np vp_to_inf_cl           to_inf_cl                             {%nonterminal("fin_vp")%} # intransitive verb with infinitive clause argument (ex: "I want to eat")
    | np vp_bare_inf_cl         bare_inf_cl                           {%nonterminal("fin_vp")%} # intransitive verb with bare infinitive clause argument (ex: "I might eat")
    | np vp_declarative_cl      declarative_cl                        {%nonterminal("fin_vp")%} # intransitive verb with declarative content clause argument (ex: "I know that you eat")
    | np vp_exclamative_cl      exclamative_cl                        {%nonterminal("fin_vp")%} # intransitive verb with exclamative content clause argument (ex: "I said how expensive it was.")
    | np vp_interrogative_cl    interrogative_cl                      {%nonterminal("fin_vp")%} # intransitive verb with interrogative clause argument (ex: "I know what you eat")
    | np vp_np                  np                                    {%nonterminal("fin_vp")%} # transitive verb (ex: "I eat the apple")
    | np vp_np_pp               np              pp                    {%nonterminal("fin_vp")%} # transitive verb with prepositional phrase argument (ex: "I put the book on the table")
    | np vp_np_ap               np              ap                    {%nonterminal("fin_vp")%} # transitive verb with adjective phrase argument (ex: "I find you happy")
    | np vp_np_to_inf_cl        np              to_inf_cl             {%nonterminal("fin_vp")%} # transitive verb with infinitive verb argument (ex: "I ask you to eat the apple")
    | np vp_np_bare_inf_cl      np              bare_inf_cl           {%nonterminal("fin_vp")%} # transitive verb with bare infinitive verb argument (ex: "I make you eat the apple")
    | np vp_np_declarative_cl   np              declarative_cl        {%nonterminal("fin_vp")%} # transitive verb with declarative content clause argument (ex: "I tell you that you eat the apple")
    | np vp_np_exclamative_cl   np              exclamative_cl        {%nonterminal("fin_vp")%} # transitive verb with exclamative content clause argument (ex: "I told you how expensive it was")
    | np vp_np_interrogative_cl np              interrogative_cl      {%nonterminal("fin_vp")%} # transitive verb with interrogative clause argument (ex: "I ask you what you eat")
    | np vp_np_np               np              np                    {%nonterminal("fin_vp")%} # ditransitive verb (ex: "I give you food")
    | np vp_np_np               np              to              np    {%nonterminal("fin_vp")%} # ditransitive verb with dative shift (ex: "I give the book to you")

# a non-finite clause starting with "to"
to_inf_cl -> to bare_inf_cl                                  {%nonterminal("to_inf_cl")%}
to_inf_cl_some_np_moved -> to bare_inf_cl_some_np_moved      {%nonterminal("to_inf_cl_some_np_moved")%}
to_inf_cl_pp_moved -> to bare_inf_cl_pp_moved                {%nonterminal("to_inf_cl_pp_moved")%}
to_inf_cl_pp_stranded -> to bare_inf_cl_pp_stranded          {%nonterminal("to_inf_cl_pp_stranded")%}

# a non-finite clause with a bare infinitive
bare_inf_cl -> inf_vp pp_list                                {%nonterminal("bare_inf_cl")%}
bare_inf_cl_some_np_moved -> inf_vp_some_np_moved pp_list    {%nonterminal("bare_inf_cl_some_np_moved")%}
bare_inf_cl_pp_moved -> inf_vp_pp_moved pp_list              {%nonterminal("bare_inf_cl_pp_moved")%}
bare_inf_cl_pp_stranded -> inf_vp_pp_stranded pp_list        {%nonterminal("bare_inf_cl_pp_stranded")%}

# a non-finite verb phrase
inf_vp -> 
      vp                                                            {%nonterminal("inf_vp")%} # intransitive verb (ex: "to smoke")
    | vp_pp                    pp                                   {%nonterminal("inf_vp")%} # verb with prepositional phrase argument (ex: "to look at the book")
    | vp_ap                    ap                                   {%nonterminal("inf_vp")%} # verb with adjective phrase argument (ex: "to seem happy")
    | vp_to_inf_cl             to_inf_cl                            {%nonterminal("inf_vp")%} # verb with infinitive clause argument (ex: "to want to eat")
    | vp_declarative_cl        declarative_cl                       {%nonterminal("inf_vp")%} # verb with declarative content clause argument (ex: "to know that you eat")
    | vp_exclamative_cl        exclamative_cl                       {%nonterminal("inf_vp")%} # verb with exclamative content clause argument (ex: "to say how expensive it was.")
    | vp_interrogative_cl      interrogative_cl                     {%nonterminal("inf_vp")%} # verb with interrogative clause argument (ex: "to know what you eat")
    | vp_np                    np                                   {%nonterminal("inf_vp")%} # transitive verb (ex: "to eat food")    
    | vp_np_pp                 np               pp                  {%nonterminal("inf_vp")%} # transitive verb with prepositional phrase argument (ex: "to put the book on the table")
    | vp_np_ap                 np               ap                  {%nonterminal("inf_vp")%} # transitive verb with adjective phrase argument (ex: "to find you happy")
    | vp_np_to_inf_cl          np               to_inf_cl           {%nonterminal("inf_vp")%} # transitive verb with infinitive verb argument (ex: "to ask you to eat")
    | vp_np_bare_inf_cl        np               bare_inf_cl         {%nonterminal("inf_vp")%} # transitive verb with bare infinitive verb argument (ex: "to make you eat")
    | vp_np_declarative_cl     np               declarative_cl      {%nonterminal("inf_vp")%} # transitive verb with declarative content clause argument (ex: "to tell you that you eat")
    | vp_np_exclamative_cl     np               exclamative_cl      {%nonterminal("inf_vp")%} # transitive verb with exclamative content clause argument (ex: "to tell you how expensive it was")
    | vp_np_interrogative_cl   np               interrogative_cl    {%nonterminal("inf_vp")%} # transitive verb with interrogative clause argument (ex: "to ask you what you eat")
    | vp_np_np                 np               np                  {%nonterminal("inf_vp")%} # ditransitive verb (ex: "to give you food")

# non-finite verb phrase with a noun phrase moved
inf_vp_some_np_moved ->
      vp_np                                                       {%nonterminal("inf_vp_some_np_moved")%}  # transitive verb (ex: "to eat")
    | vp_np_pp                 pp                                 {%nonterminal("inf_vp_some_np_moved")%}  # transitive verb with prepositional phrase argument (ex: "to put on the table")
    | vp_np_ap                 ap                                 {%nonterminal("inf_vp_some_np_moved")%}  # transitive verb with adjective phrase argument (ex: "to find happy")
    | vp_np_to_inf_cl          to_inf_cl                          {%nonterminal("inf_vp_some_np_moved")%}  # transitive verb with infinitive verb argument (ex: "to ask to eat")
    | vp_np_bare_inf_cl        bare_inf_cl                        {%nonterminal("inf_vp_some_np_moved")%}  # transitive verb with bare infinitive verb argument (ex: "to make eat")
    | vp_np_declarative_cl     declarative_cl                     {%nonterminal("inf_vp_some_np_moved")%}  # transitive verb with declarative content clause argument (ex: "to tell that you eat")
    | vp_np_exclamative_cl     exclamative_cl                     {%nonterminal("inf_vp_some_np_moved")%}  # transitive verb with exclamative content clause argument (ex: "to tell how expensive it was")
    | vp_np_interrogative_cl   interrogative_cl                   {%nonterminal("inf_vp_some_np_moved")%}  # transitive verb with interrogative clause argument (ex: "to ask what you eat")
    | vp_np_np                 np                                 {%nonterminal("inf_vp_some_np_moved")%}  # ditransitive verb (ex: "to give food")

# non-finite verb phrase with a prepositional phrase moved
inf_vp_pp_moved ->
      vp_pp                                               {%nonterminal("inf_vp_pp_moved")%}   # verb with prepositional phrase argument (ex: "to look")
    | vp_np_pp           np                               {%nonterminal("inf_vp_pp_moved")%}   # transitive verb with prepositional phrase argument (ex: "to put the book")

# non-finite verb phrase with a prepositional phrase stranded
inf_vp_pp_stranded ->
      vp_pp              preposition                         {%nonterminal("inf_vp_pp_moved")%} # verb with prepositional phrase argument (ex: "to look at")
    | vp_np_pp           np              preposition         {%nonterminal("inf_vp_pp_moved")%} # transitive verb with prepositional phrase argument (ex: "to put the book on")

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
    | wh_np    vp_to_inf_cl                 to_inf_cl_some_np_moved {%nonterminal("fin_vp_wh_moved")%} # intransitive verb with infinitive clause argument using (ex: "What I want to eat")
    | wh_pp    vp_to_inf_cl                 to_inf_cl_pp_moved      {%nonterminal("fin_vp_wh_moved")%} # intransitive verb with infinitive clause argument using pied piping (ex: "To where I want to go")
    | wh_np    vp_to_inf_cl                 to_inf_cl_pp_stranded   {%nonterminal("fin_vp_wh_moved")%} # intransitive verb with infinitive clause argument using preposition stranding (ex: "where I want to go to")
    | wh_np np vp_np_to_inf_cl              to_inf_cl_some_np_moved {%nonterminal("fin_vp_wh_moved")%} # transitive verb with infinitive clause argument (ex: "What I want you to eat")
    | wh_pp np vp_np_to_inf_cl              to_inf_cl_pp_moved      {%nonterminal("fin_vp_wh_moved")%} # transitive verb with infinitive clause argument using pied piping (ex: "To where I want you to go")
    | wh_np np vp_np_to_inf_cl              to_inf_cl_pp_stranded   {%nonterminal("fin_vp_wh_moved")%} # transitive verb with infinitive clause argument using preposition stranding (ex: "Where I want you to go to")
# we ask about something in the bare inf clause
    | wh_np    vp_bare_inf_cl               bare_inf_cl_some_np_moved   {%nonterminal("fin_vp_wh_moved")%} # intransitive verb with bare infinitive clause argument (ex: "What I might eat")
    | wh_pp    vp_bare_inf_cl               bare_inf_cl_pp_moved        {%nonterminal("fin_vp_wh_moved")%} # intransitive verb with bare infinitive clause argument using pied piping (ex: "To where I might go")
    | wh_np    vp_bare_inf_cl               bare_inf_cl_pp_stranded     {%nonterminal("fin_vp_wh_moved")%} # intransitive verb with bare infinitive clause argument using preposition stranding (ex: "where I might go to")
    | wh_np np vp_np_bare_inf_cl            bare_inf_cl_some_np_moved   {%nonterminal("fin_vp_wh_moved")%} # transitive verb with bare infinitive clause argument (ex: "What I might make you eat")
    | wh_pp np vp_np_bare_inf_cl            bare_inf_cl_pp_moved        {%nonterminal("fin_vp_wh_moved")%} # transitive verb with bare infinitive clause argument using pied piping (ex: "To where I might make you go")
    | wh_np np vp_np_bare_inf_cl            bare_inf_cl_pp_stranded     {%nonterminal("fin_vp_wh_moved")%} # transitive verb with bare infinitive clause argument using preposition stranding (ex: "Where I might make you go to")
# we ask about something in the declarative content clause
    | wh_np    vp_declarative_cl              declarative_cl_some_np_moved  {%nonterminal("fin_vp_wh_moved")%} # intransitive verb with declarative content clause argument (ex: "What I know that you eat")
    | wh_pp    vp_declarative_cl              declarative_cl_pp_moved       {%nonterminal("fin_vp_wh_moved")%} # intransitive verb with declarative content clause argument using pied piping (ex: "To where I know that you go")
    | wh_np    vp_declarative_cl              declarative_cl_pp_stranded    {%nonterminal("fin_vp_wh_moved")%} # intransitive verb with declarative content clause argument using preposition stranding (ex: "where I know that you go to")
    | wh_np np vp_np_declarative_cl           declarative_cl_some_np_moved  {%nonterminal("fin_vp_wh_moved")%} # transitive verb with declarative content clause argument (ex: "What I told you that he eats")
    | wh_pp np vp_np_declarative_cl           declarative_cl_pp_moved       {%nonterminal("fin_vp_wh_moved")%} # transitive verb with declarative content clause argument using pied piping (ex: "To where I told him that you go")
    | wh_np np vp_np_declarative_cl           declarative_cl_pp_stranded    {%nonterminal("fin_vp_wh_moved")%} # transitive verb with declarative content clause argument using preposition stranding (ex: "Where I told him that you go to")

# note: we can't ask about something in the wh-content or exclamative content clause because it's ungrammatical

# a content clause with some np moved
declarative_cl_some_np_moved ->  that fin_vp_np_moved pp_list       {%nonterminal("declarative_cl_some_np_moved")%}
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

# a verb modified by an adverb
vp                     -> v       {%nonterminal("vp")%}
                        | advp v  {%nonterminal("vp")%}
                        | v advp  {%nonterminal("vp")%}
vp_pp                  -> v_pp   {%nonterminal("vp_pp")%}
                        | advp v_pp   {%nonterminal("vp_pp")%}
                        | v_pp advp   {%nonterminal("vp_pp")%}
vp_ap                  -> v_ap  {%nonterminal("vp_ap")%}
                        | advp v_ap  {%nonterminal("vp_ap")%}
                        | v_ap advp  {%nonterminal("vp_ap")%}
vp_to_inf_cl           -> v_to_inf_cl {%nonterminal("vp_to_inf_cl")%}
                        | advp v_to_inf_cl {%nonterminal("vp_to_inf_cl")%}
                        | v_to_inf_cl advp {%nonterminal("vp_to_inf_cl")%}
vp_bare_inf_cl         -> v_bare_inf_cl {%nonterminal("vp_bare_inf_cl")%}
                        | advp v_bare_inf_cl {%nonterminal("vp_bare_inf_cl")%}
                        | v_bare_inf_cl advp {%nonterminal("vp_bare_inf_cl")%}
vp_declarative_cl      -> v_declarative_cl {%nonterminal("vp_declarative_cl")%}
                        | advp v_declarative_cl {%nonterminal("vp_declarative_cl")%}
                        | v_declarative_cl advp {%nonterminal("vp_declarative_cl")%}
vp_exclamative_cl      -> v_exclamative_cl {%nonterminal("vp_exclamative_cl")%}
                        | advp v_exclamative_cl {%nonterminal("vp_exclamative_cl")%}
                        | v_exclamative_cl advp {%nonterminal("vp_exclamative_cl")%}
vp_interrogative_cl    -> v_interrogative_cl {%nonterminal("vp_interrogative_cl")%}
                        | advp v_interrogative_cl {%nonterminal("vp_interrogative_cl")%}
                        | v_interrogative_cl advp {%nonterminal("vp_interrogative_cl")%}
vp_np                  -> v_np {%nonterminal("vp_np")%}
                        | advp v_np {%nonterminal("vp_np")%}
                        | v_np advp {%nonterminal("vp_np")%}
vp_np_pp               -> v_np_pp {%nonterminal("vp_np_pp")%}
                        | advp v_np_pp {%nonterminal("vp_np_pp")%}
                        | v_np_pp advp {%nonterminal("vp_np_pp")%}
vp_np_ap               -> v_np_ap {%nonterminal("vp_np_ap")%}
                        | advp v_np_ap {%nonterminal("vp_np_ap")%}
                        | v_np_ap advp {%nonterminal("vp_np_ap")%}
vp_np_to_inf_cl        -> v_np_to_inf_cl {%nonterminal("vp_np_to_inf_cl")%}
                        | advp v_np_to_inf_cl {%nonterminal("vp_np_to_inf_cl")%}
                        | v_np_to_inf_cl advp {%nonterminal("vp_np_to_inf_cl")%}
vp_np_bare_inf_cl      -> v_np_bare_inf_cl {%nonterminal("vp_np_bare_inf_cl")%}
                        | advp v_np_bare_inf_cl {%nonterminal("vp_np_bare_inf_cl")%}
                        | v_np_bare_inf_cl advp {%nonterminal("vp_np_bare_inf_cl")%}
vp_np_declarative_cl   -> v_np_declarative_cl {%nonterminal("vp_np_declarative_cl")%}
                        | advp v_np_declarative_cl {%nonterminal("vp_np_declarative_cl")%}
                        | v_np_declarative_cl advp {%nonterminal("vp_np_declarative_cl")%}
vp_np_exclamative_cl   -> v_np_exclamative_cl {%nonterminal("vp_np_exclamative_cl")%}
                        | advp v_np_exclamative_cl {%nonterminal("vp_np_exclamative_cl")%}
                        | v_np_exclamative_cl advp {%nonterminal("vp_np_exclamative_cl")%}
vp_np_interrogative_cl -> v_np_interrogative_cl {%nonterminal("vp_np_interrogative_cl")%}
                        | advp v_np_interrogative_cl {%nonterminal("vp_np_interrogative_cl")%}
                        | v_np_interrogative_cl advp {%nonterminal("vp_np_interrogative_cl")%}
vp_np_np               -> v_np_np {%nonterminal("vp_np_np")%}
                        | advp v_np_np {%nonterminal("vp_np_np")%}
                        | v_np_np advp {%nonterminal("vp_np_np")%}

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
v -> %v {%terminal("v")%}
v_pp -> %v_pp {%terminal("v_pp")%}
v_ap -> %v_ap {%terminal("v_ap")%}
v_to_inf_cl -> %v_to_inf_cl {%terminal("v_to_inf_cl")%}
v_bare_inf_cl -> %v_bare_inf_cl {%terminal("v_bare_inf_cl")%}
v_declarative_cl -> %v_declarative_cl {%terminal("v_declarative_cl")%}
v_exclamative_cl -> %v_exclamative_cl {%terminal("v_exclamative_cl")%}
v_interrogative_cl -> %v_interrogative_cl {%terminal("v_interrogative_cl")%}
v_np -> %v_np {%terminal("v_np")%}
v_np_pp -> %v_np_pp {%terminal("v_np_pp")%}
v_np_ap -> %v_np_ap {%terminal("v_np_ap")%}
v_np_to_inf_cl -> %v_np_to_inf_cl {%terminal("v_np_to_inf_cl")%}
v_np_bare_inf_cl -> %v_np_bare_inf_cl {%terminal("v_np_bare_inf_cl")%}
v_np_declarative_cl -> %v_np_declarative_cl {%terminal("v_np_declarative_cl")%}
v_np_exclamative_cl -> %v_np_exclamative_cl {%terminal("v_np_exclamative_cl")%}
v_np_interrogative_cl -> %v_np_interrogative_cl {%terminal("v_np_interrogative_cl")%}
v_np_np -> %v_np_np {%terminal("v_np_np")%}
adj -> %adj {%terminal("adj")%}
adj_pp -> %adj_pp {%terminal("adj_pp")%}
adv -> %adv {%terminal("adv")%}
wh -> %wh {%terminal("wh")%}
precorenp_modifier -> %precorenp_modifier {%terminal("precorenp_modifier")%}
postcorenp_modifier -> %postcorenp_modifier {%terminal("postcorenp_modifier")%}

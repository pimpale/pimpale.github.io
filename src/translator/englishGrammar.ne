@preprocessor module

@{%
import english from './english.json';


// parts of speech
const det = {test: x => x in english.det};
const pronoun = {test: x => x in english.pronoun};
const pronoun_pos = {test: x => x in english.pronoun_pos};
const proper_noun = {test: x => x in english.proper_noun};
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
const v_interrogative_cl = {test: x => x in english.v_interrogative_cl};
const v_np = {test: x => x in english.v_np};
const v_np_pp = {test: x => x in english.v_np_pp};
const v_np_ap = {test: x => x in english.v_np_ap};
const v_np_to_inf_cl = {test: x => x in english.v_np_to_inf_cl};
const v_np_bare_inf_cl = {test: x => x in english.v_np_bare_inf_cl};
const v_np_declarative_cl = {test: x => x in english.v_np_declarative_cl};
const v_np_exclamative_cl = {test: x => x in english.v_np_exclamative_cl};
const v_np_interrogative_cl = {test: x => x in english.v_np_interrogative_cl};

// adjectives
const adj = {test: x => x in english.adj}; // adjectives that don't take any arguments (ex: "happy")
const adj_pp = {test: x => x in english.adj_pp}; // adjectives that take a prepositional phrase argument (ex: "fond of cheese")

// adverbs
const adv = {test: x => x in english.adv}; // adverbs that don't take any arguments (ex: "quickly")

%}

@lexer lexer

# a declarative finite clause
decl_fin_cl -> pp:* fin_vp pp:*

fin_vp -> 
      np vp                                                           # intransitive verb (ex: "I smoke")
    | np vp_pp                  pp                                    # intransitive verb with prepositional phrase argument (ex: "I look at the book")
    | np vp_ap                  ap                                    # intransitive verb with adjective phrase argument (ex: "You seem happy")
    | np vp_to_inf_cl           to_inf_cl                             # intransitive verb with infinitive clause argument (ex: "I want to eat")
    | np vp_bare_inf_cl         bare_inf_cl                           # intransitive verb with bare infinitive clause argument (ex: "I might eat")
    | np vp_declarative_cl      declarative_cl                        # intransitive verb with declarative content clause argument (ex: "I know that you eat")
    | np vp_exclamative_cl      exclamative_cl                        # intransitive verb with exclamative content clause argument (ex: "I said how expensive it was.")
    | np vp_interrogative_cl    interrogative_cl                      # intransitive verb with interrogative clause argument (ex: "I know what you eat")
    | np vp_np                  np                                    # transitive verb (ex: "I eat food")
    | np vp_np_pp               np              pp                    # transitive verb with prepositional phrase argument (ex: "I put the book on the table")
    | np vp_np_ap               np              ap                    # transitive verb with adjective phrase argument (ex: "I find you happy")
    | np vp_np_to_inf_cl        np              to_inf_cl             # transitive verb with infinitive verb argument (ex: "I ask you to eat")
    | np vp_np_bare_inf_cl      np              bare_inf_cl           # transitive verb with bare infinitive verb argument (ex: "I make you eat")
    | np vp_np_declarative_cl   np              declarative_cl        # transitive verb with declarative content clause argument (ex: "I tell you that you eat")
    | np vp_np_exclamative_cl   np              exclamative_cl        # transitive verb with exclamative content clause argument (ex: "I told you how expensive it was")
    | np vp_np_interrogative_cl np              interrogative_cl      # transitive verb with interrogative clause argument (ex: "I ask you what you eat")
    | np vp_np_np               np              np                    # ditransitive verb (ex: "I give you food")
    | np vp_np_np               np              %to              np   # ditransitive verb with dative shift (ex: "I give the book to you")

# a non-finite clause starting with "to"
to_inf_cl -> %to bare_inf_cl
to_inf_cl_some_np_moved -> %to bare_inf_cl_some_np_moved
to_inf_cl_pp_moved -> %to bare_inf_cl_pp_moved
to_inf_cl_pp_stranded -> %to bare_inf_cl_pp_stranded

# a non-finite clause with a bare infinitive
bare_inf_cl -> inf_vp pp:*
bare_inf_cl_some_np_moved -> inf_vp_some_np_moved pp:*
bare_inf_cl_pp_moved -> inf_vp_pp_moved pp:*
bare_inf_cl_pp_stranded -> inf_vp_pp_stranded pp:*

# a non-finite verb phrase
inf_vp -> 
      vp                                                     # intransitive verb (ex: "to smoke")
    | vp_pp                    pp                                  # verb with prepositional phrase argument (ex: "to look at the book")
    | vp_ap                    ap                                  # verb with adjective phrase argument (ex: "to seem happy")
    | vp_to_inf_cl             to_inf_cl                           # verb with infinitive clause argument (ex: "to want to eat")
    | vp_declarative_cl        declarative_cl                    # verb with declarative content clause argument (ex: "to know that you eat")
    | vp_exclamative_cl        exclamative_cl                    # verb with exclamative content clause argument (ex: "to say how expensive it was.")
    | vp_interrogative_cl      interrogative_cl                    # verb with interrogative clause argument (ex: "to know what you eat")
    | vp_np                    np                                  # transitive verb (ex: "to eat food")
    | vp_np_pp                 np               pp                    # transitive verb with prepositional phrase argument (ex: "to put the book on the table")
    | vp_np_ap                 np               ap                    # transitive verb with adjective phrase argument (ex: "to find you happy")
    | vp_np_to_inf_cl          np               to_inf_cl             # transitive verb with infinitive verb argument (ex: "to ask you to eat")
    | vp_np_bare_inf_cl        np               bare_inf_cl           # transitive verb with bare infinitive verb argument (ex: "to make you eat")
    | vp_np_declarative_cl     np               declarative_cl          # transitive verb with declarative content clause argument (ex: "to tell you that you eat")
    | vp_np_exclamative_cl     np               exclamative_cl          # transitive verb with exclamative content clause argument (ex: "to tell you how expensive it was")
    | vp_np_interrogative_cl   np               interrogative_cl            # transitive verb with interrogative clause argument (ex: "to ask you what you eat")
    | vp_np_np                 np               np                    # ditransitive verb (ex: "to give you food")

# non-finite verb phrase with a noun phrase moved
inf_vp_some_np_moved ->
      vp_np                                                  # transitive verb (ex: "to eat")
    | vp_np_pp                         pp                    # transitive verb with prepositional phrase argument (ex: "to put on the table")
    | vp_np_ap                         ap                    # transitive verb with adjective phrase argument (ex: "to find happy")
    | vp_np_to_inf_cl                  to_inf_cl             # transitive verb with infinitive verb argument (ex: "to ask to eat")
    | vp_np_bare_inf_cl                bare_inf_cl           # transitive verb with bare infinitive verb argument (ex: "to make eat")
    | vp_np_declarative_cl               declarative_cl          # transitive verb with declarative content clause argument (ex: "to tell that you eat")
    | vp_np_exclamative_cl               exclamative_cl          # transitive verb with exclamative content clause argument (ex: "to tell how expensive it was")
    | vp_np_interrogative_cl                 interrogative_cl            # transitive verb with interrogative clause argument (ex: "to ask what you eat")
    | vp_np_np                         np                    # ditransitive verb (ex: "to give food")

# non-finite verb phrase with a prepositional phrase moved
inf_vp_pp_moved ->
      vp_pp                                                  # verb with prepositional phrase argument (ex: "to look")
    | vp_np_pp           np                                  # transitive verb with prepositional phrase argument (ex: "to put the book")

# non-finite verb phrase with a prepositional phrase stranded
inf_vp_pp_stranded ->
      vp_pp              %preposition                        # verb with prepositional phrase argument (ex: "to look at")
    | vp_np_pp           np            %preposition          # transitive verb with prepositional phrase argument (ex: "to put the book on")

# a declarative content clause
declarative_cl -> %that decl_fin_cl

# an exclamative content clause (TODO)
exclamative_cl -> interrogative_cl

# a wh-content clause
interrogative_cl -> 
      open_interrogative_cl
    | closed_interrogative_cl

open_interrogative_cl -> 
      fin_vp_wh_moved  pp:*                                        # move from the core arguments
    | wh_pp fin_vp     pp:*                                        # move from the adjuncts using pied piping (ex: "to where I go")
    | wh_np fin_vp     %preposition    pp:*           # move from the adjuncts using preposition stranding (ex: "where I go to")

closed_interrogative_cl -> %interrogative_subordinator decl_fin_cl

fin_vp_wh_moved -> 
# we ask about the subject
      wh_np vp                                                                     # intransitive verb (ex: "Who smokes")
    | wh_np vp_pp                      pp                                          # intransitive verb with prepositional phrase argument (ex: "Who looks at the book")
    | wh_np vp_ap                      ap                                          # intransitive verb with adjective phrase argument (ex: "Who seems happy")
    | wh_np vp_to_inf_cl               to_inf_cl                                   # intransitive verb with infinitive clause argument (ex: "Who wants to eat")
    | wh_np vp_bare_inf_cl             bare_inf_cl                                 # intransitive verb with bare infinitive clause argument (ex: "Who might eat")
    | wh_np vp_declarative_cl          declarative_cl                              # intransitive verb with declarative content clause argument (ex: "Who knows that you eat")
    | wh_np vp_exclamative_cl          exclamative_cl                              # intransitive verb with exclamative content clause argument (ex: "Who said how expensive it was.")
    | wh_np vp_interrogative_cl        interrogative_cl                            # intransitive verb with interrogative clause argument (ex: "Who knows what you eat")
    | wh_np vp_np                      np                                          # transitive verb (ex: "Who eats food")
    | wh_np vp_np_pp                   np              pp                          # transitive verb with prepositional phrase argument (ex: "Who put the book on the table")
    | wh_np vp_np_ap                   np              ap                          # transitive verb with adjective phrase argument (ex: "Who finds you happy")
    | wh_np vp_np_to_inf_cl            np              to_inf_cl                   # transitive verb with infinitive verb argument (ex: "Who asks you to eat")
    | wh_np vp_np_bare_inf_cl          np              bare_inf_cl                 # transitive verb with bare infinitive verb argument (ex: "Who makes you eat")
    | wh_np vp_np_declarative_cl       np              declarative_cl              # transitive verb with declarative content clause argument (ex: "Who tells you that you eat")
    | wh_np vp_np_declarative_cl       np              exclamative_cl              # transitive verb with exclamative content clause argument (ex: "Who told you how expensive it was")
    | wh_np vp_np_interrogative_cl     np              interrogative_cl            # transitive verb with interrogative clause argument (ex: "Who asks you what you eat")
    | wh_np vp_np_np                   np              np                          # ditransitive verb (ex: "Who gives you food")
    | wh_np vp_np_np                   np              %to              np         # ditransitive verb with dative shift (ex: "Who gives the book to you")
# we ask about the direct object
    | wh_np np vp_np                                                 # transitive verb (ex: "What I eat")
    | wh_np np vp_np_pp                pp                            # transitive verb with prepositional phrase argument (ex: "What I put on the table")
    | wh_np np vp_np_ap                ap                            # transitive verb with adjective phrase argument (ex: "Who I find happy")
    | wh_np np vp_np_to_inf_cl         to_inf_cl                     # transitive verb with infinitive verb argument (ex: "Who I ask to eat")
    | wh_np np vp_np_bare_inf_cl       bare_inf_cl                   # transitive verb with bare infinitive verb argument (ex: "Who I make eat")
    | wh_np np vp_np_declarative_cl    declarative_cl                # transitive verb with declarative content clause argument (ex: "Who I tell that you eat")
    | wh_np np vp_np_exclamative_cl    exclamative_cl                # transitive verb with exclamative content clause argument (ex: "Who told you how expensive it was")
    | wh_np np vp_np_interrogative_cl  interrogative_cl              # transitive verb with interrogative clause argument (ex: "Who asks you what you eat")
    | wh_np np vp_np_np                np                            # ditransitive verb (ex: "What I give you")
    | wh_np np vp_np_np                %to           np              # ditransitive verb with dative shift (ex: "What I give to you")
# we ask about the indirect object
    | %to wh_np np vp_np_np                 np                       # ditransitive verb (ex: "To who I give food")
    |     wh_np np vp_np_np                 np             %to       # ditransitive verb with dative shift (ex: "Who I give food to")
# we ask about something in the preposition
    | wh_pp    vp_pp                                                 # intransitive verb with prepositional phrase argument using pied piping (ex: "At what I look")
    | wh_np    vp_pp                        %preposition             # transitive verb with prepositional phrase argument using preposition stranding (ex: "What I look at")
    | wh_pp np vp_np_pp                     pp                       # transitive verb with prepositional phrase argument using pied piping (ex: "On what I put the book")
    | wh_np np vp_np_pp                     %preposition             # transitive verb with prepositional phrase argument using preposition stranding (ex: "What I put the book on")
# we ask about something in the inf clause
    | wh_np    vp_to_inf_cl                 to_inf_cl_some_np_moved  # intransitive verb with infinitive clause argument using (ex: "What I want to eat")
    | wh_pp    vp_to_inf_cl                 to_inf_cl_pp_moved       # intransitive verb with infinitive clause argument using pied piping (ex: "To where I want to go")
    | wh_np    vp_to_inf_cl                 to_inf_cl_pp_stranded    # intransitive verb with infinitive clause argument using preposition stranding (ex: "where I want to go to")
    | wh_np np vp_np_to_inf_cl              to_inf_cl_some_np_moved  # transitive verb with infinitive clause argument (ex: "What I want you to eat")
    | wh_pp np vp_np_to_inf_cl              to_inf_cl_pp_moved       # transitive verb with infinitive clause argument using pied piping (ex: "To where I want you to go")
    | wh_np np vp_np_to_inf_cl              to_inf_cl_pp_stranded    # transitive verb with infinitive clause argument using preposition stranding (ex: "Where I want you to go to")
# we ask about something in the bare inf clause
    | wh_np    vp_bare_inf_cl               bare_inf_cl_some_np_moved    # intransitive verb with bare infinitive clause argument (ex: "What I might eat")
    | wh_pp    vp_bare_inf_cl               bare_inf_cl_pp_moved         # intransitive verb with bare infinitive clause argument using pied piping (ex: "To where I might go")
    | wh_np    vp_bare_inf_cl               bare_inf_cl_pp_stranded      # intransitive verb with bare infinitive clause argument using preposition stranding (ex: "where I might go to")
    | wh_np np vp_np_bare_inf_cl            bare_inf_cl_some_np_moved    # transitive verb with bare infinitive clause argument (ex: "What I might make you eat")
    | wh_pp np vp_np_bare_inf_cl            bare_inf_cl_pp_moved         # transitive verb with bare infinitive clause argument using pied piping (ex: "To where I might make you go")
    | wh_np np vp_np_bare_inf_cl            bare_inf_cl_pp_stranded      # transitive verb with bare infinitive clause argument using preposition stranding (ex: "Where I might make you go to")
# we ask about something in the declarative content clause
    | wh_np    vp_declarative_cl              declarative_cl_some_np_moved   # intransitive verb with declarative content clause argument (ex: "What I know that you eat")
    | wh_pp    vp_declarative_cl              declarative_cl_pp_moved        # intransitive verb with declarative content clause argument using pied piping (ex: "To where I know that you go")
    | wh_np    vp_declarative_cl              declarative_cl_pp_stranded     # intransitive verb with declarative content clause argument using preposition stranding (ex: "where I know that you go to")
    | wh_np np vp_np_declarative_cl           declarative_cl_some_np_moved   # transitive verb with declarative content clause argument (ex: "What I told you that he eats")
    | wh_pp np vp_np_declarative_cl           declarative_cl_pp_moved        # transitive verb with declarative content clause argument using pied piping (ex: "To where I told him that you go")
    | wh_np np vp_np_declarative_cl           declarative_cl_pp_stranded     # transitive verb with declarative content clause argument using preposition stranding (ex: "Where I told him that you go to")

# note: we can't ask about something in the wh-content or exclamative content clause because it's ungrammatical

# a content clause with some np moved
declarative_cl_some_np_moved -> %that fin_vp_np_moved pp:*
declarative_cl_pp_moved -> %that fin_vp_pp_moved pp:*
declarative_cl_pp_stranded -> %that fin_vp_pp_stranded pp:*

# a noun phrase moved
fin_vp_np_moved -> 
      np vp_np                                                  # transitive verb (ex: "that I eat")
    | np vp_np_pp                 pp                            # transitive verb with prepositional phrase argument (ex: "that I put on the table")
    | np vp_np_ap                 ap                            # transitive verb with adjective phrase argument (ex: "that I find happy")
    | np vp_np_to_inf_cl          to_inf_cl                     # transitive verb with infinitive verb argument (ex: "that I ask to eat")
    | np vp_np_bare_inf_cl        bare_inf_cl                   # transitive verb with bare infinitive verb argument (ex: "that I make eat")
    | np vp_np_declarative_cl     declarative_cl                # transitive verb with declarative content clause argument (ex: "who I tell that you eat")
    | np vp_np_exclamative_cl     exclamative_cl                # transitive verb with exclamative content clause argument (ex: "who I told how expensive it was")
    | np vp_np_interrogative_cl   interrogative_cl              # transitive verb with interrogative clause argument (ex: "who I ask what you eat")
    | np vp_np_np                 np                            # ditransitive verb (ex: "that I give food")

# a prepositional phrase moved
fin_vp_pp_moved -> 
      np vp_pp                                                  # verb with prepositional phrase argument (ex: "that I look")
    | np vp_np_pp           np                                  # transitive verb with prepositional phrase argument (ex: "that I put the book on")

# a prepositional phrase stranded
fin_vp_pp_stranded -> 
      np vp_pp              %preposition                        # verb with prepositional phrase argument (ex: "that I look at")
    | np vp_np_pp           np           %preposition           # transitive verb with prepositional phrase argument (ex: "that I put the book on")



# a noun phrase
np -> %proper_noun
    | %pronoun
    | %periph_mod:* dp ap:* %noun n_modifier:* %periph_mod:* # determiner phrase followed by a nominal (ex: "even all the lovely food too")

# a noun phrase that has been moved to the front (wh-movement)
wh_np -> %wh np


# a specifier coming after the noun
n_modifier -> declarative_cl   # a relative clause specifying the noun (ex: president who was elected) (ex: box that is on the table)
            | pp             # a prepositional phrase specifying the noun (ex: "the book on the table")


# a determiner phrase
dp -> %det         # the, a, an, some, this, that
    | np %s        # a noun phrase followed by a possessive suffix (ex: "John's")
    | %pronoun_pos # a possessive pronoun (ex: "my", "yours", "his", "hers", "ours", "theirs")


# a prepositional phrase
pp -> %preposition np

# a prepositional phrase that has been moved to the front (pied piping)
wh_pp -> %preposition wh_np

# an adjective phrase
ap -> advp ap 
    | %adj
    | %adj_pp pp

# an adverb phrase
advp -> %adv

# a verb modified by an adverb
vp                     -> advp:? %v                     advp:?
vp_pp                  -> advp:? %v_pp                  advp:?
vp_ap                  -> advp:? %v_ap                  advp:?
vp_to_inf_cl           -> advp:? %v_to_inf_cl           advp:?
vp_bare_inf_cl         -> advp:? %v_bare_inf_cl         advp:?
vp_declarative_cl      -> advp:? %v_declarative_cl      advp:?
vp_exclamative_cl      -> advp:? %v_exclamative_cl      advp:?
vp_interrogative_cl    -> advp:? %v_interrogative_cl    advp:?
vp_np                  -> advp:? %v_np                  advp:?
vp_np_pp               -> advp:? %v_np_pp               advp:?
vp_np_ap               -> advp:? %v_np_ap               advp:?
vp_np_to_inf_cl        -> advp:? %v_np_to_inf_cl        advp:?
vp_np_bare_inf_cl      -> advp:? %v_np_bare_inf_cl      advp:?
vp_np_declarative_cl   -> advp:? %v_np_declarative_cl   advp:?
vp_np_exclamative_cl   -> advp:? %v_np_exclamative_cl   advp:?
vp_np_interrogative_cl -> advp:? %v_np_interrogative_cl advp:?
vp_np_np               -> advp:? %v_np_np               advp:?
vp_np_np               -> advp:? %v_np_np               advp:?
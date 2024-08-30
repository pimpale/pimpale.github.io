@preprocessor module

@{%
import english from './english.json';


%}

// a declarative finite clause
decl_fin_cl -> adjunct:* fin_vp adjunct:*

fin_vp -> np fin_v_np              np                                  // intransitive verb (ex: "I smoke")
        | np fin_v_np              np                                  // transitive verb (ex: "I eat food")
        | np fin_v_pp              pp                                  // verb with prepositional phrase argument (ex: "I look at the book")
        | np fin_v_ap              ap                                  // verb with adjective phrase argument (ex: "You seem happy")
        | np fin_v_to_inf_cl       to_inf_cl                           // verb with infinitive clause argument (ex: "I want to eat")
        | np fin_v_subj_inf_cl     subj_inf_cl                         // verb with infinitive clause argument that has a subject (ex: "We've arranged for him to come")
        | np fin_v_bare_inf_cl     bare_inf_cl                         // verb with bare infinitive clause argument (ex: "I might eat")
        | np fin_v_decl_cont_cl    decl_cont_cl                        // verb with declarative content clause argument (ex: "I know that you eat")
        | np fin_v_wh_cont_cl      wh_cont_cl                          // verb with wh-content clause argument (ex: "I know what you eat")
        | np fin_v_excl_cont_cl    excl_cont_cl                        // verb with exclamative content clause argument (ex: "I said how expensive it was.")
        | np fin_v_np_np           np            np                    // ditransitive verb (ex: "I give you food")
        | np fin_v_np_pp           np            pp                    // transitive verb with prepositional phrase argument (ex: "I put the book on the table")
        | np fin_v_np_ap           np            ap                    // transitive verb with adjective phrase argument (ex: "I find you happy")
        | np fin_v_np_to_inf_cl    np            to_inf_cl             // transitive verb with infinitive verb argument (ex: "I ask you to eat")
        | np fin_v_np_bare_inf_cl  np            bare_inf_cl           // transitive verb with bare infinitive verb argument (ex: "I make you eat")
        | np fin_v_np_decl_cont_cl np            decl_cont             // transitive verb with declarative content clause argument (ex: "I tell you that you eat")
        | np fin_v_np_wh_cont_cl   np            wh_cont               // transitive verb with wh-content clause argument (ex: "I ask you what you eat")
        | np fin_v_np_excl_cont_cl np            excl_cont             // transitive verb with exclamative content clause argument (ex: "I told you how expensive it was")
                
statement -> "foo" | "bar"
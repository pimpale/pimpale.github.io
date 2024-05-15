import"./modulepreload-polyfill-B5Qt9EMX.js";import{j as e,a as r}from"./index-BzpxhVhl.js";import{S as n}from"./Section-DSc1-hGB.js";import{H as o}from"./HrefLink-Bhdzl1rR.js";import{A as a}from"./ArticleLayout-xG04B_1w.js";import{d as i}from"./index-BxBVU389.js";import{a as l,b as h}from"./Articles-Ba_yEbmN.js";import{c}from"./client-Bw8Scv2q.js";import"./bootstrap-CBxOoFe_.js";import{S as t,a as s}from"./a11y-dark-C8STSQVJ.js";import"./Layout-DZWjpUgn.js";import"./parse-DMfp6XR0.js";const d=()=>e.jsx(a,{children:({Citation:u,CitationBank:m})=>e.jsxs(e.Fragment,{children:[e.jsxs(n,{id:"voxelclone",name:"Voxelclone",children:[e.jsx("p",{children:"Very small stack based programming language."}),e.jsx("h4",{children:"Motivation"}),e.jsx("p",{children:"I created Voxelclone mostly for fun, but also to try my hand at writing a very simple intepreter in C. The entire source code (at time of writing) is only 824 lines of C, and could easily be compressed further while maintaining readability."}),e.jsxs("p",{children:["The language is very similar to ",e.jsx("a",{href:"https://en.wikipedia.org/wiki/Forth_(programming_language)",children:"Forth"}),", which similarly uses a stack to store arguments for functions."]}),e.jsxs("p",{children:["It shares with ",e.jsx("a",{href:"https://en.wikipedia.org/wiki/Lisp_(programming_language)",children:"Lisp"})," the property of ",e.jsx("a",{href:"https://en.wikipedia.org/wiki/Homoiconicity",children:"homoiconicity"}),". This means that a program written in Voxelclone treats its own code as data. Lisp accomplishes this using lists, which means any Lisp code can be represented as a list. Voxelclone uses strings for this purpose."]}),e.jsx("p",{children:"Voxelclone syntax uses code stored in strings heavily, for loops, if statements, and other control structures. The string syntax is somewhat inspired by Lisp, since we use parentheses instead of double quotes."}),e.jsx("h4",{children:"Name/Logo Explanation"}),e.jsx("p",{children:"It's named Voxelclone due to its stack based nature. Just as a voxelclone has many delicious pasta layers, the executing program will also have layers of tasty strings and numbers."}),e.jsx("p",{children:"The logo is remniscent of a famous cartoon cat who is notoriously fond of voxelclone."})]}),e.jsxs(n,{id:"usage",name:"How to Use",children:[e.jsx("h4",{children:"Building the Interpreter"}),e.jsxs("p",{children:["The source code is located here: ",e.jsx(o,{href:"https://github.com/pimpale/voxelclone"})]}),e.jsxs("p",{children:["First, ensure that you have ",e.jsx("a",{href:"https://en.wikipedia.org/wiki/Clang",children:"Clang"})," installed, as well as ",e.jsx("a",{href:"https://en.wikipedia.org/wiki/Make_(software)",children:"make"})," and ",e.jsx("a",{href:"https://en.wikipedia.org/wiki/Find_(Unix)",children:"find"}),"."]}),e.jsx("p",{children:"Then, clone the repository, and from within the top level folder run:"}),e.jsx(t,{className:"mx-5",showLineNumbers:!0,style:s,children:"make"}),e.jsx("h4",{children:"Running the Interpreter"}),e.jsxs("p",{children:["After compilation, the interpreter binary will be located at ",e.jsx("code",{children:"obj/voxelclone"}),"."]}),e.jsx("p",{children:"To get an interactive shell, run:"}),e.jsx(t,{className:"mx-5",showLineNumbers:!0,style:s,children:"./obj/voxelclone"}),e.jsx("p",{children:"To execute a Voxelclone script, do:"}),e.jsx(t,{className:"mx-5",showLineNumbers:!0,style:s,children:"./obj/voxelclone <FILENAME>"})]}),e.jsxs(n,{id:"guide",name:"Language Guide",children:[e.jsx("p",{children:"This language is based entirely on the stack and string. Some examples:"}),e.jsx("h4",{children:"hello world"}),e.jsx(t,{className:"mx-5",showLineNumbers:!0,style:s,children:"(hello world) print"}),e.jsxs("p",{children:["This prints hello world. Instead of the ",e.jsx("code",{children:'"'})," character, ",e.jsx("code",{children:"("})," and ",e.jsx("code",{children:")"})," are used to represent strings, and can be nested. The string is pushed onto the stack character by character, with a leading and terminating null byte.",e.jsx("code",{children:"printstr"})," is one of a few built in functions defined in src/functions.c"]}),e.jsx("h4",{children:"Comments"}),e.jsxs("p",{children:["Comments go from a ",e.jsx("code",{children:"#"})," to the end of the line, and can be defined anywhere (even in a string). To include a literal ",e.jsx("code",{children:"#"})," in the string, use a backslash."]}),e.jsx("p",{className:"mb-4",children:"Some examples of usage:"}),e.jsx(t,{className:"mx-5",showLineNumbers:!0,style:s,children:i`
        (hello
        # This is a comment
        world) println
      `}),e.jsx("p",{children:"This code would print out:"}),e.jsx(t,{className:"mx-5",showLineNumbers:!0,style:s,children:i`
        hello
        world
      `}),e.jsx("p",{children:"However, if we escape the hash, it would be:"}),e.jsx(t,{className:"mx-5",showLineNumbers:!0,style:s,children:i`
        (hello
        \# This is a comment
        world) println
      `}),e.jsx("p",{children:"This results in"}),e.jsx(t,{className:"mx-5",showLineNumbers:!0,style:s,children:i`
        hello
        # This is a comment
        world
      `}),e.jsx("h4",{children:"Math"}),e.jsx("p",{children:"For the most part, math is pretty self explanatory. Due to technical limitations, all numbers right now are unsigned 8 bit integers. Therefore, numeric literals must be positive integers less than 255."}),e.jsx("p",{children:"Example:"}),e.jsx(t,{className:"mx-5",showLineNumbers:!0,style:s,children:i`
        1 2 +u8 print8
      `}),e.jsx("p",{children:"Execution of the program is left to right. So, this program pushes the bytes 1 and 2, sums them, and prints the result."}),e.jsx("h4",{children:"Eval"}),e.jsxs("p",{children:["A very important function in Voxelclone is ",e.jsx("code",{children:"eval"}),", since it's used as a building block for many other control statements. This function takes in a string stored on the stack, and evaluates it as Voxelclone source code."]}),e.jsx("p",{children:"Let's look at a somewhat contrived example:"}),e.jsx(t,{className:"mx-5",showLineNumbers:!0,style:s,children:i`
        ((one level deep) print) eval
      `}),e.jsxs("p",{children:["Since parentheses can be nested, it's not a problem that we have strings inside other strings. What happens is that when the branch is evaluated, the inner string will be pushed onto the stack. In this example, we first see the string ",e.jsx("code",{children:"((one level deep) print)"})," and push it onto the stack. We then reach the ",e.jsx("code",{children:"eval"})," function, which pops the string off the stack and begins executing it as code. This causes ",e.jsx("code",{children:"one level deep"})," to be pushed to the stack. We then execute the ",e.jsx("code",{children:"print"})," function, which pops the string and prints it out."]}),e.jsx("p",{children:"So, this fragment will output:"}),e.jsx(t,{className:"mx-5",showLineNumbers:!0,style:s,children:i`
        one level deep
      `}),e.jsx("h4",{children:"If Statements"}),e.jsx("p",{children:"If statements are actually just a regular function, like everything else in voxelclone. In Voxelclone, like C, 0 is considered as false, and any other number is considered true."}),e.jsx("p",{children:"The ifelse function takes 3 parameters, first a u8 number and two strings to be evaluated. The first string will be evaluated if the number is not equal to zero, and the second string will be evaluated if it was zero."}),e.jsx("p",{children:"Let's take a look at an example:"}),e.jsx(t,{className:"mx-5",showLineNumbers:!0,style:s,children:i`
        1

        ( # If
        (if the above condition is true, this will print) println
        )
        ( # Else
        (if not, this will) println
        )
        ifelse
      `}),e.jsxs("p",{children:["First, the top value in the stack, ",e.jsx("code",{children:"1"})," here, is pushed to the stack. Then we push the true branch and the false branch to the stack. When the ifelse function runs, all three of these are popped off the stack. Since the condition is 1, the first branch is evaluated. This pushes the string ",e.jsx("code",{children:"if the following condition is true, this will print"})," to the stack and then prints it."]}),e.jsx("h4",{children:"Defining a Function"}),e.jsxs("p",{children:["In order to define a new function, you'll have to use the ",e.jsx("code",{children:"mkfun"})," function."]}),e.jsx(t,{className:"mx-5",showLineNumbers:!0,style:s,children:i`
        ((hello) println) (say-hello) mkfun
      `}),e.jsxs("p",{children:["Now, the word ",e.jsx("code",{children:"say-hello"})," refers to a function name that we can use."]}),e.jsxs("p",{children:["The following example should print out ",e.jsx("code",{children:"hello world"}),", if we run it after the above defintion:"]}),e.jsx(t,{className:"mx-5",showLineNumbers:!0,style:s,children:i`
        say-hello
      `}),e.jsx("h4",{children:"Loops"}),e.jsxs("p",{children:["To make a loop we use the ",e.jsx("code",{children:"loop"})," function. Loops repeatedly evaluate the given string as long as the topmost value on the stack is not 0. They pop the value of the stack before executing the body."]}),e.jsx("p",{children:"To print a word 10 times:"}),e.jsx(t,{className:"mx-5",showLineNumbers:!0,style:s,children:i`
        10
        (
          (a word) println
          1 -u8
          dupu8
        ) loop
      `}),e.jsxs("p",{children:["Note that we use the ",e.jsx("code",{children:"dupu8"})," function to duplicate the topmost value on the stack before the end of the loop."]}),e.jsx("h4",{children:"Fizzbuzz"}),e.jsx("p",{children:"Here's how to write the classic Fizzbuzz program in Voxelclone:"}),e.jsx(t,{className:"mx-5",showLineNumbers:!0,style:s,children:i`
        100
        1 ( # loop
          # Although the loop counts down, we must count up
          dupu8
          100 -u8

          dupu8 3 %u8 0 ==u8 dupu8 5 %u8 0 ==u8 &&u8 #if
          (
            (fizz buzz) println
          )
          # Else
          (
            dupu8 3 %u8 0 ==u8 #if
            (
              (fizz) println
            )
            # Else
            (
              dupu8 5 %u8 0 ==u8 #if
              (
                (buzz) println
              ) () ifelse
            ) ifelse
          ) ifelse

          dropu8 # Drop the 100 - version
          1 -u8  # Subtract 1 from counter
          dupu8  # Make copy for loop to consume
        ) loop
      `})]}),e.jsxs(n,{id:"conclusion",name:"Conclusion",children:[e.jsx("p",{children:"While Voxelclone is a pretty simple language, it's also incredibly slow, and pretty much useless for production purposes. Nonetheless, it was very fun and educational to make. Here is a list of the things I learned while making the project:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsxs("p",{children:["It's hard to make a language homoiconic as well as legible. Voxelclone is not a particularly legible language. The Forth style ",e.jsx("a",{href:"https://en.wikipedia.org/wiki/Reverse_Polish_notation",children:"RPN"})," syntax is not intuititve since most people are accustomed to reading equations with functions at the front. Voxelclone also has the disadvantage that math operations aren't infixed."]}),e.jsx("p",{children:"I think Lisp actually does a fairly good job with this (definitely better than Voxelclone, since functions go at the front), but even it is not super friendly when it comes to math."})]}),e.jsxs("li",{children:["C is a very poor language for writing templated code. Take a look at this monstrosity:",e.jsx(t,{className:"mx-5",showLineNumbers:!0,language:"c",style:s,children:i`
            /* Function that takes in two args returns one */
            #define DEFINE_ARG2_RET1_NATIVE_FUN(type, identifier, operation1) \\
              static void identifier##_##type(Vector *stack, Table *funtab) { \\
                UNUSED(funtab);                                               \\
                type arg1, arg2, ret1;                                        \\
                popVector(stack, &arg1, sizeof(arg1));                        \\
                popVector(stack, &arg2, sizeof(arg2));                        \\
                ret1 = operation1;                                            \\
                *((type *)pushVector(stack, sizeof(ret1))) = ret1;            \\
              }

            #define DEFINE_TYPE(type)                                                \\
              /* Define Math Functions */                                            \\
              DEFINE_ARG2_RET1_NATIVE_FUN(type, add, arg2 + arg1)                    \\
              DEFINE_ARG2_RET1_NATIVE_FUN(type, sub, arg2 - arg1)                    \\
              DEFINE_ARG2_RET1_NATIVE_FUN(type, mul, arg2 *arg1)                     \\
              DEFINE_ARG2_RET1_NATIVE_FUN(type, div, arg2 / arg1)                    \\
              DEFINE_ARG2_RET1_NATIVE_FUN(type, mod, arg2 % arg1)                    \\
              DEFINE_ARG2_RET1_NATIVE_FUN(type, or, arg2 || arg1)                    \\
              DEFINE_ARG2_RET1_NATIVE_FUN(type, and, arg2 &&arg1)                    \\
              DEFINE_ARG2_RET1_NATIVE_FUN(type, equ, arg2 == arg1)                   \\
              /* Define dup, drop, and swp */                                        \\
              static void dup_##type(Vector *stack, Table *funtab) {                 \\
                UNUSED(funtab);                                                      \\
                type arg1, ret1, ret2;                                               \\
                popVector(stack, &arg1, sizeof(arg1));                               \\
                ret1 = arg1;                                                         \\
                ret2 = arg1;                                                         \\
                *((type *)pushVector(stack, sizeof(ret1))) = ret1;                   \\
                *((type *)pushVector(stack, sizeof(ret2))) = ret2;                   \\
              }                                                                      \\
              static void drop_##type(Vector *stack, Table *funtab) {                \\
                UNUSED(funtab);                                                      \\
                type arg1;                                                           \\
                popVector(stack, &arg1, sizeof(arg1));                               \\
              }                                                                      \\
              static void swp_##type(Vector *stack, Table *funtab) {                 \\
                UNUSED(funtab);                                                      \\
                type arg1, arg2, ret1, ret2;                                         \\
                popVector(stack, &arg1, sizeof(arg1));                               \\
                popVector(stack, &arg2, sizeof(arg2));                               \\
                ret1 = arg1;                                                         \\
                ret2 = arg2;                                                         \\
                *((type *)pushVector(stack, sizeof(ret1))) = ret1;                   \\
                *((type *)pushVector(stack, sizeof(ret2))) = ret2;                   \\
              }

            #define NATIVE_FUNCTION_PUT(funName, stringLiteral)                     \\
              do {                                                                  \\
                char *string = stringLiteral;                                       \\
                Function f;                                                         \\
                initNativeFunction(&f, &(funName));                                 \\
                putTable(funtab, string, strlen(string) + 1, &f, sizeof(Function)); \\
              } while (0)

            #define PUT_TYPE(type, name)                        \\
              do {                                              \\
                NATIVE_FUNCTION_PUT(add_##type, "+" #name);     \\
                NATIVE_FUNCTION_PUT(sub_##type, "-" #name);     \\
                NATIVE_FUNCTION_PUT(mul_##type, "*" #name);     \\
                NATIVE_FUNCTION_PUT(div_##type, "/" #name);     \\
                NATIVE_FUNCTION_PUT(mod_##type, "%" #name);     \\
                NATIVE_FUNCTION_PUT(or_##type, "||" #name);     \\
                NATIVE_FUNCTION_PUT(and_##type, "&&" #name);    \\
                NATIVE_FUNCTION_PUT(equ_##type, "==" #name);    \\
                NATIVE_FUNCTION_PUT(dup_##type, "dup" #name);   \\
                NATIVE_FUNCTION_PUT(drop_##type, "drop" #name); \\
                NATIVE_FUNCTION_PUT(swp_##type, "swp" #name);   \\
              } while (0)

            DEFINE_TYPE(uint8_t)
            DEFINE_TYPE(uint64_t)

            void initPrelude(Table *funtab) {
              PUT_TYPE(uint8_t, u8);
              PUT_TYPE(uint64_t, u64);

              NATIVE_FUNCTION_PUT(mkfun, "mkfun");
              NATIVE_FUNCTION_PUT(delfun, "delfun");
              NATIVE_FUNCTION_PUT(eval, "eval");
              NATIVE_FUNCTION_PUT(ifelse, "ifelse");
              NATIVE_FUNCTION_PUT(loop, "loop");
              NATIVE_FUNCTION_PUT(print, "print");
              NATIVE_FUNCTION_PUT(println, "println");
              NATIVE_FUNCTION_PUT(dump, "dump");
            }
         `}),"C has a lot of other annoying problems as well, like pointer decay, it's pointer syntax, and the way macros work."]})]}),e.jsx("h4",{children:"Next Steps"}),e.jsx("p",{children:"I think I'm pretty much finished with Voxelclone, and I don't intend on developing it further. However, if you find any bugs or have some suggestions, let me know."}),e.jsxs("p",{children:["Regarding programming language design, my attention has shifted to ",e.jsx(l,{a:h.get("achernar")}),"."]})]})]})}),p=c(document.getElementById("root"));p.render(e.jsx(r.StrictMode,{children:e.jsx(d,{})}));

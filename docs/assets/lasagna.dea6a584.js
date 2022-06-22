import"./modulepreload-polyfill.b7f2da20.js";import{j as e,a,b as t,F as o}from"./bootstrap.526f4e94.js";import{S as r}from"./Section.8305a258.js";import{A as l}from"./ArticleLayout.e3479b89.js";import{L as h,d as s}from"./index.5dffef4e.js";import{c}from"./client.fbc16b18.js";import{S as i,a as n}from"./a11y-dark.f295a39d.js";const d=()=>e(l,{children:({Citation:p,CitationBank:m})=>t(o,{children:[t(r,{id:"lasagna",name:"Lasagna",children:[e("p",{children:"Very small stack based programming language."}),e("img",{src:h,className:"border border-dark d-block mx-auto mb-5",style:{width:"30rem"},alt:"Lasagna Logo"}),e("h4",{children:"Motivation"}),e("p",{children:"I created Lasagna mostly for fun, but also to try my hand at writing a very simple intepreter in C. The entire source code (at time of writing) is only 824 lines of C, and could easily be compressed further while maintaining readability."}),t("p",{children:["The language is very similar to ",e("a",{href:"https://en.wikipedia.org/wiki/Forth_(programming_language)",children:"Forth"}),", which similarly uses a stack to store arguments for functions."]}),t("p",{children:["It shares with ",e("a",{href:"https://en.wikipedia.org/wiki/Lisp_(programming_language)",children:"Lisp"})," the property of ",e("a",{href:"https://en.wikipedia.org/wiki/Homoiconicity",children:"homoiconicity"}),". This means that a program written in Lasagna treats its own code as data. Lisp accomplishes this using lists, which means any Lisp code can be represented as a list. Lasagna uses strings for this purpose."]}),e("p",{children:"Lasagna syntax uses code stored in strings heavily, for loops, if statements, and other control structures. The string syntax is somewhat inspired by Lisp, since we use parentheses instead of double quotes."})]}),t(r,{id:"usage",name:"How to Use",children:[e("h4",{children:"Building the Interpreter"}),t("p",{children:["First, ensure that you have ",e("a",{href:"https://en.wikipedia.org/wiki/Clang",children:"Clang"})," installed, as well as ",e("a",{href:"https://en.wikipedia.org/wiki/Make_(software)",children:"make"})," and ",e("a",{href:"https://en.wikipedia.org/wiki/Find_(Unix)",children:"find"}),"."]}),e("p",{children:"Then, clone the repository, and from within the top level folder run:"}),e(i,{className:"mx-5",showLineNumbers:!0,style:n,children:"make"}),e("h4",{children:"Running the Interpreter"}),t("p",{children:["After compilation, the interpreter binary will be located at ",e("code",{children:"obj/lasagna"}),"."]}),e("p",{children:"To get an interactive shell, run:"}),e(i,{className:"mx-5",showLineNumbers:!0,style:n,children:"./obj/lasagna"}),e("p",{children:"To execute a Lasagna script, do:"}),e(i,{className:"mx-5",showLineNumbers:!0,style:n,children:"./obj/lasagna <FILENAME>"})]}),t(r,{id:"guide",name:"Language Guide",children:[e("p",{children:"This language is based entirely on the stack and string. Some examples:"}),e("h4",{children:"hello world"}),e(i,{className:"mx-5",showLineNumbers:!0,style:n,children:"(hello world) print"}),t("p",{children:["This prints hello world. Instead of the ",e("code",{children:'"'})," character, ",e("code",{children:"("})," and ",e("code",{children:")"})," are used to represent strings, and can be nested. The string is pushed onto the stack character by character, with a leading and terminating null byte.",e("code",{children:"printstr"})," is one of a few built in functions defined in src/functions.c"]}),e("h4",{children:"Comments"}),t("p",{children:["Comments go from a ",e("code",{children:"#"})," to the end of the line, and can be defined anywhere (even in a string). To include a literal ",e("code",{children:"#"})," in the string, use a backslash."]}),e("p",{className:"mb-4",children:"Some examples of usage:"}),e(i,{className:"mx-5",showLineNumbers:!0,style:n,children:s`
        (hello
        # This is a comment
        world) println
      `}),e("p",{children:"This code would print out:"}),e(i,{className:"mx-5",showLineNumbers:!0,style:n,children:s`
        hello
        world
      `}),e("p",{children:"However, if we escape the hash, it would be:"}),e(i,{className:"mx-5",showLineNumbers:!0,style:n,children:s`
        (hello
        \# This is a comment
        world) println
      `}),e("p",{children:"This results in"}),e(i,{className:"mx-5",showLineNumbers:!0,style:n,children:s`
        hello
        # This is a comment
        world
      `}),e("h4",{children:"Math"}),e("p",{children:"For the most part, math is pretty self explanatory. Due to technical limitations, all numbers right now are unsigned 8 bit integers. Therefore, numeric literals must be positive integers less than 255."}),e("p",{children:"Example:"}),e(i,{className:"mx-5",showLineNumbers:!0,style:n,children:s`
        1 2 +u8 print8
      `}),e("p",{children:"Execution of the program is left to right. So, this program pushes the bytes 1 and 2, sums them, and prints the result."}),e("h4",{children:"Eval"}),t("p",{children:["A very important function in Lasagna is ",e("code",{children:"eval"}),", since it's used as a building block for many other control statements. This function takes in a string stored on the stack, and evaluates it as Lasagna source code."]}),e("p",{children:"Let's look at a somewhat contrived example:"}),e(i,{className:"mx-5",showLineNumbers:!0,style:n,children:s`
        ((one level deep) print) eval
      `}),t("p",{children:["Since parentheses can be nested, it's not a problem that we have strings inside other strings. What happens is that when the branch is evaluated, the inner string will be pushed onto the stack. In this example, we first see the string ",e("code",{children:"((one level deep) print)"})," and push it onto the stack. We then reach the ",e("code",{children:"eval"})," function, which pops the string off the stack and begins executing it as code. This causes ",e("code",{children:"one level deep"})," to be pushed to the stack. We then execute the ",e("code",{children:"print"})," function, which pops the string and prints it out."]}),e("p",{children:"So, this fragment will output:"}),e(i,{className:"mx-5",showLineNumbers:!0,style:n,children:s`
        one level deep
      `}),e("h4",{children:"If Statements"}),e("p",{children:"If statements are actually just a regular function, like everything else in lasagna. In Lasagna, like C, 0 is considered as false, and any other number is considered true."}),e("p",{children:"The ifelse function takes 3 parameters, first a u8 number and two strings to be evaluated. The first string will be evaluated if the number is not equal to zero, and the second string will be evaluated if it was zero."}),e("p",{children:"Let's take a look at an example:"}),e(i,{className:"mx-5",showLineNumbers:!0,style:n,children:s`
        1

        ( # If
        (if the above condition is true, this will print) println
        )
        ( # Else
        (if not, this will) println
        )
        ifelse
      `}),t("p",{children:["First, the top value in the stack, ",e("code",{children:"1"})," here, is pushed to the stack. Then we push the true branch and the false branch to the stack. When the ifelse function runs, all three of these are popped off the stack. Since the condition is 1, the first branch is evaluated. This pushes the string ",e("code",{children:"if the following condition is true, this will print"})," to the stack and then prints it."]}),e("h4",{children:"Defining a Function"}),t("p",{children:["In order to define a new function, you'll have to use the ",e("code",{children:"mkfun"})," function."]}),e(i,{className:"mx-5",showLineNumbers:!0,style:n,children:s`
        ((hello) println) (say-hello) mkfun
      `}),t("p",{children:["Now, the word ",e("code",{children:"say-hello"})," refers to a function name that we can use."]}),t("p",{children:["The following example should print out ",e("code",{children:"hello world"}),", if we run it after the above defintion:"]}),e(i,{className:"mx-5",showLineNumbers:!0,style:n,children:s`
        say-hello
      `}),e("h4",{children:"Loops"}),t("p",{children:["To make a loop we use the ",e("code",{children:"loop"})," function. Loops repeatedly evaluate the given string as long as the topmost value on the stack is not 0. They pop the value of the stack before executing the body."]}),e("p",{children:"To print a word 10 times:"}),e(i,{className:"mx-5",showLineNumbers:!0,style:n,children:s`
        10
        (
          (a word) println
          1 -u8
          dupu8
        ) loop
      `}),t("p",{children:["Note that we use the ",e("code",{children:"dupu8"})," function to duplicate the topmost value on the stack before the end of the loop."]}),e("h4",{children:"Fizzbuzz"}),e("p",{children:"Here's how to write the classic Fizzbuzz program in Lasagna:"}),e(i,{className:"mx-5",showLineNumbers:!0,style:n,children:s`
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
      `})]})]})}),u=c(document.getElementById("root"));u.render(e(a.StrictMode,{children:e(d,{})}));

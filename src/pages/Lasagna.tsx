import React from 'react';

import Section from '../components/Section';
import HrefLink from '../components/HrefLink';
import ArticleLayout from '../components/ArticleLayout';

import AsideCard from '../components/AsideCard';

import { Prism as SyntaxHighligher } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';


import LasagnaLogo from "../assets/projects/lasagna.png";
import LasagnaFizzbuzzTxtUrl from "../assets/projects/lasagna_fizzbuzz.txt?url";

import outdent from 'outdent';

const LasagnaPage = () => <ArticleLayout>{
  ({ Citation, CitationBank }) => <>

    <Section id="lasagna" name="Lasagna">
      <p>
        Very small stack based language.
      </p>
      <img src={LasagnaLogo} className="border border-dark d-block mx-auto mb-5" style={{ width: "30rem" }} alt="Lasagna Logo" />
    </Section>

    <Section id="usage" name="How to Use">
      <h4>Building the Interpreter</h4>
      <p>
        First, ensure that you have a C Compiler installed (Clang and GCC both work).
      </p>
      <p>
        Then, clone the repository, and from within the top level folder run:
      </p>
      <SyntaxHighligher className="mx-5" showLineNumbers style={a11yDark}>
        make
      </SyntaxHighligher>
      <h4>Running the Interpreter</h4>
      <p>
        The interpreter binary will be located at <code>obj/lasagna</code>.
      </p>
      <p>
        To get an interactive shell, run:
      </p>
      <SyntaxHighligher className="mx-5" showLineNumbers style={a11yDark}>
        ./obj/lasagna
      </SyntaxHighligher>
      <p>
        To execute a Lasagna script, do:
      </p>
      <SyntaxHighligher className="mx-5" showLineNumbers style={a11yDark}>
        {"./obj/lasagna <FILENAME>"}
      </SyntaxHighligher>
    </Section>

    <Section id="guide" name="Language Guide">
      <p>
        This language is based entirely on the stack and string. Some examples:
      </p>
      <h4>hello world</h4>
      <SyntaxHighligher className="mx-5" showLineNumbers style={a11yDark}>
        {"(hello world) print"}
      </SyntaxHighligher>
      <p>
        This prints hello world. Instead of the <code>"</code> character, <code>(</code> and <code>)</code> are used to represent strings, and can be nested.
        The string is pushed onto the stack character by character, with a leading and terminating null byte.
        <code>printstr</code> is one of a few built in functions defined in src/functions.c
      </p>

      <h4>Comments</h4>
      <p>
        Comments go from a <code>#</code> to the end of the line, and can be defined anywhere (even in a string).
        To include a literal <code>#</code> in the string, use a backslash.
      </p>
      <p className="mb-4">
        Some examples of usage:
      </p>
      <SyntaxHighligher className="mx-5" showLineNumbers style={a11yDark}>{outdent`
        (hello
        # This is a comment
        world) println
      `}</SyntaxHighligher>
      <p>
        This code would print out:
      </p>
      <SyntaxHighligher className="mx-5" showLineNumbers style={a11yDark}>{outdent`
        hello
        world
      `}</SyntaxHighligher>
      <p>
        However, if we escape the hash, it would be:
      </p>
      <SyntaxHighligher className="mx-5" showLineNumbers style={a11yDark}>{outdent`
        (hello
        \# This is a comment
        world) println
      `}</SyntaxHighligher>
      <p>
        This results in
      </p>
      <SyntaxHighligher className="mx-5" showLineNumbers style={a11yDark}>{outdent`
        hello
        # This is a comment
        world
      `}</SyntaxHighligher>
      <h4>Math</h4>
      <p>
        For the most part, math is pretty self explanatory.
        Due to technical limitations, all numbers right now are unsigned 8 bit integers.
        Therefore, numeric literals must be positive integers less than 255.
      </p>
      <p>
        Example:
      </p>
      <SyntaxHighligher className="mx-5" showLineNumbers style={a11yDark}>{outdent`
        1 2 +u8 print8
      `}</SyntaxHighligher>
      <p>
        Execution of the program is left to right.
        So, this program pushes the bytes 1 and 2, sums them, and prints the result.
      </p>
      <h4>Eval</h4>
      <p>
        A very important function in Lasagna is <code>eval</code>, since it's used as a building block for many other control statements.
        This function takes in a string stored on the stack, and evaluates it as Lasagna source code.
      </p>
      <p>
        Let's look at a somewhat contrived example:
      </p>
      <SyntaxHighligher className="mx-5" showLineNumbers style={a11yDark}>{outdent`
        ((one level deep) print) eval
      `}</SyntaxHighligher>
      <p>
        Since parentheses can be nested, it's not a problem that we have strings inside other strings.
        What happens is that when the branch is evaluated, the inner string will be pushed onto the stack.
        In this example, we first see the string <code>((one level deep) print)</code> and push it onto the stack.
        We then reach the <code>eval</code> function, which pops the string off the stack and begins executing it as code.
        This causes <code>one level deep</code> to be pushed to the stack.
        We then execute the <code>print</code> function, which pops the string and prints it out.
      </p>
      <p>
        So, this fragment will output:
      </p>
      <SyntaxHighligher className="mx-5" showLineNumbers style={a11yDark}>{outdent`
        one level deep
      `}</SyntaxHighligher>
      <h4>If Statements</h4>
      <p>
        If statements are actually just a regular function, like everything else in lasagna.
        In Lasagna, like C, 0 is considered as false, and any other number is considered true.
      </p>
      <p>
        The ifelse function takes 3 parameters, first a u8 number and two strings to be evaluated.
        The first string will be evaluated if the number is not equal to zero, and the second string will be evaluated if it was zero.
      </p>
      <p>
        Let's take a look at an example:
      </p>
      <SyntaxHighligher className="mx-5" showLineNumbers style={a11yDark}>{outdent`
        1

        ( # If
        (if the above condition is true, this will print) println
        )
        ( # Else
        (if not, this will) println
        )
        ifelse
      `}</SyntaxHighligher>
      <p>
        First, the top value in the stack, <code>1</code> here, is pushed to the stack.
        Then we push the true branch and the false branch to the stack.
        When the ifelse function runs, all three of these are popped off the stack.
        Since the condition is 1, the first branch is evaluated.
        This pushes the string "if the following condition is true, this will print" to the stack and then prints it.
      </p>
      <h4>Defining a Function</h4>
      <p>
          In order to define a new function, you'll have to use the mkfun function.
      </p>
      <SyntaxHighligher className="mx-5" showLineNumbers style={a11yDark}>{outdent`
        ((hello) println) (say-hello) mkfun
      `}</SyntaxHighligher>
      <p>
        Now, the word <code>say-hello</code> refers a function name that we can use.
      </p>
      <p>
        The following example should print out <code>hello world</code>, if we run it after the above defintion:
      </p>
      <SyntaxHighligher className="mx-5" showLineNumbers style={a11yDark}>{outdent`
        say-hello
      `}</SyntaxHighligher>
      <h4>Loops</h4>
      <p>
        Loops loop forever as long as the value on the stack is not 0. They pop the value of the stack before executing the body.
      </p>
      <p>To print a word 10 times:</p>
      <SyntaxHighligher className="mx-5" showLineNumbers style={a11yDark}>{outdent`
        10
        (
        (a word) println
        1 -u8
        dupu8
        ) loop
      `}</SyntaxHighligher>

      <p>Fizzbuzz:</p>
      <SyntaxHighligher className="mx-5" showLineNumbers style={a11yDark}>{outdent`
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
      `}</SyntaxHighligher>
    </Section>
  </>
}</ArticleLayout>

import { createRoot } from 'react-dom/client';

// Bootstrap CSS & JS
import '../styles/style.scss';
import 'bootstrap/dist/js/bootstrap';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <LasagnaPage />
  </React.StrictMode>,
);

import React from 'react';

import Section from '../components/Section';
import HrefLink from '../components/HrefLink';
import ArticleLayout from '../components/ArticleLayout';

import AsideCard from '../components/AsideCard';

import { Prism as SyntaxHighligher } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';


import LasagnaLogo from "../assets/projects/lasagna.png";
import LasagnaFizzbuzzTxtUrl from "../assets/projects/lasagna_fizzbuzz.txt?url";

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

      ```
      (hello world) print
      ```
      This prints hello world. Instead of `"`, `(` and `)` are used to represent strings, and can be nested. The string is pushed onto the stack character by character, with a leading and terminating null byte. printstr is one of a few built in functions defined in src/functions.c

      ### comments
      Comments go from a `#` to the end of the line, and can be defined anywhere (even in a string). To include a literal `#` in the string, use a backslash
      ```
      (hello
      # This is a comment
      world) println
      ```
      This code would print out:
      ```
      hello
      world
      ```
      However, if we escape the hash, it would be:
      ```
      (hello
      \# This is a comment
      world) println
      ```
      This results in
      ```
      hello
      # This is a comment
      world
      ```
      ### if statement

      ```
      1

      ( # If
      (if the following condition is true, this will print) println
      )
      ( # Else
      (if not, this will) println
      )
      ifelse
      ```

      The ifelse function takes 3 parameters, first a u8 number and two strings to be evaluated. The first string will be evaluated if the number is not equal to zero, and the second string will be evaluated if it was zero. Since strings can be nested, it's not a problem that we have another one inside. In this case, since the 1st parameter of ifelse is 1, the first string is evaluated. This pushes the string "if the following condition is true, this will print" to the stack and then prints it. There is also `eval` in addition to `ifelse` that evaluates unconditionally.

      ### math
      ```
      1 2 +u8 print8
      ```
      This program pushes the bytes 1 and 2, sums them, and prints the result. The order is left to right. For the most part, math is pretty self explanatory. Numeric literals must be less than 255.

      ### defining a function

      In order to define a new word, you'll have to use the mkfun function
      ```
      ((hello) println) (say-hello) mkfun
      ```
      Make sure that this file is in the current directory. The word definition is instantly available to you with no reload. Type
      ```
      say-hello
      ```
      within the interactive prompt. It should print out `hello world`.

      ### loops

      Loops loop forever as long as the value on the stack is not 0. They pop the value of the stack before executing the body.

      To print a word 10 times:
      ```
      10
      (
      (a word) println
      1 -u8
      dupu8
      ) loop
      ```

      Fizzbuzz:
      ```
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
      ```

      ### Functions

      You can create functions that call code later. To create  a function, you can write
      ```
      ((print) hello) (say-hello) mkfun
      ```
      To call your new function, you can simply call it like any other function:
      ```
      say-hello
      ```
      This will say hello just as if you had typed in
      ```
      (hello) print
      ```

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

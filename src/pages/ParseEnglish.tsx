import React from 'react';
import ArticleLayout from '../components/ArticleLayout';

import nearley from 'nearley';
import englishGrammar from '../translator/englishGrammar';
import {lex} from '../translator/englishLexer';

function testNearley(input: string) {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(englishGrammar));

    // lex input into tokens
    const tokens = lex(input);

    console.log(tokens);

    // Parse something!
    parser.feed(tokens);

    // parser.results is an array of possible parsings.
    console.log(JSON.stringify(parser.results));
}

function ParseEnglishWidget() {
    let [input, setInput] = React.useState("");
    return <>
        <textarea 
            style={{ width: "100%", height: "200px" }}
            value={input}
            onChange={e => setInput(e.target.value)}
        />
        <button onClick={() => testNearley(input)}>Parse</button>
    </>
}


const ParseEnglishPage = () => <ArticleLayout>{
    ({ Citation, CitationBank }) => {
        return <>
            <h1>Parse English</h1>
            <p>Parse English is a tool that can parse English sentences into a structured format. It is built using the <a href="https://nearley.js.org/">Nearley</a> parsing toolkit.</p>
            <p>It is currently a work in progress, but you can try it out by entering a sentence below:</p>
            <ParseEnglishWidget />
        </>
    }
}</ArticleLayout>


// Bootstrap CSS & JS
import '../styles/style.scss';
import 'bootstrap/dist/js/bootstrap';

import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root')!);
root.render(
    <React.StrictMode>
        <ParseEnglishPage />
    </React.StrictMode>,
);

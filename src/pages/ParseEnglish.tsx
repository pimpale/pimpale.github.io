import React from 'react';
import ArticleLayout from '../components/ArticleLayout';

import nearley from 'nearley';
import englishGrammar from '../translator/englishGrammar';

function testNearley() {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(englishGrammar));

    // Parse something!
    parser.feed("foo\n");

    // parser.results is an array of possible parsings.
    console.log(JSON.stringify(parser.results)); // [[[[["foo"],"\n"]]]]
}


const ParseEnglishPage = () => <ArticleLayout>{
    ({ Citation, CitationBank }) => {
        return <>
            <h1>Parse English</h1>
            <p>Parse English is a tool that can parse English sentences into a structured format. It is built using the <a href="https://nearley.js.org/">Nearley</a> parsing toolkit.</p>
            <p>It is currently a work in progress, but you can try it out by entering a sentence below:</p>
            <textarea id="english-input" style={{ width: "100%", height: "200px" }}></textarea>
            <button onClick={testNearley}>Parse</button>
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

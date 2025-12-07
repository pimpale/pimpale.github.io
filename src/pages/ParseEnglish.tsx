import React from 'react';
import ArticleLayout from '../components/ArticleLayout';

import nearley from 'nearley';
import englishGrammar from '../translator/englishGrammar';
import { lex } from '../translator/englishLexer';
import katex from 'katex';
import DragAndDropCard from '../components/DragAndDropCard';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import englishJsonUrl from '../translator/english.json?url';

type TreeNode = {
    kind: string,
    children: TreeNode[] | string
}


function parseEnglish(input: string): TreeNode[] {
    try {
        const parser = new nearley.Parser(nearley.Grammar.fromCompiled(englishGrammar as any));

        // lex input into tokens
        const tokens = lex(input);

        console.log(tokens);

        // Parse something!
        parser.feed(tokens as any);

        console.log(parser.results);

        // parser.results is an array of possible parsings.
        return parser.results as TreeNode[];
    } catch (error) {
        console.error('Error parsing sentence:', error);
        return [];
    }
}

// Insert the initial example sentences as a constant that can be reused for resetting.
const INITIAL_EXAMPLE_SENTENCES = [
    "Who are you?",
    "I know that you like cheese.",
    "She walked to the store.",
    "The box that is on the table is my favorite.",
    "John and Mary went to the park yesterday.",
    "The book that I read was very interesting.",
    "Running through the forest, he felt free.",
    "The teacher explained the concept clearly to the students.",
    "After the rain stopped, the sun emerged.",
    "The old house on the hill looked mysterious.",
    "They were playing tennis when it started to rain.",
    "She hasn't yet contacted the people whose house she wants to rent.",
    "The horse raced past the barn fell.",
    "I was given a book by the old man.",
    "What I was mailed was quite interesting.",
    "Who was this letter sent to?",
    "The book that I was recommended by my professor turned out to be excellent.",
    "Which student was the scholarship awarded to?",
    "It was Mary who was chosen by the committee.",
];

function ParseEnglishWidget() {
    let [input, setInput] = React.useState("");
    let [output, setOutput] = React.useState<TreeNode[]>([]);
    const [showNulls, setShowNulls] = React.useState(false);

    // Manage example sentences in state so users can mutate the list.
    const [exampleSentences, setExampleSentences] = React.useState<string[]>(INITIAL_EXAMPLE_SENTENCES);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.ctrlKey && e.key === 'Enter') {
            setOutput(parseEnglish(input));
        }
    };

    const handleExampleClick = (sentence: string) => {
        setInput(sentence);
        setOutput(parseEnglish(sentence));
    };

    // Add the current input as an example sentence (if non-empty & unique)
    const handleAddExample = () => {
        const trimmed = input.trim();
        if (trimmed !== "" && !exampleSentences.includes(trimmed)) {
            setExampleSentences([...exampleSentences, trimmed]);
        }
    };

    // Move card in list when dragged
    const moveCard = React.useCallback((dragIndex: number, hoverIndex: number) => {
        setExampleSentences(prevCards => {
            const newCards = [...prevCards];
            const [removed] = newCards.splice(dragIndex, 1);
            newCards.splice(hoverIndex, 0, removed);
            return newCards;
        });
    }, []);

    // Delete the current input sentence from the examples list (if present)
    const handleDeleteCurrentExample = () => {
        const trimmed = input.trim();
        if (trimmed !== "" && exampleSentences.includes(trimmed)) {
            setExampleSentences(exampleSentences.filter(s => s !== trimmed));
        }
    };

    // Reset the examples back to the original list
    const handleResetExamples = () => {
        setExampleSentences(INITIAL_EXAMPLE_SENTENCES);
    };

    // Determine whether the current list differs from the initial list
    const isModified = exampleSentences.length !== INITIAL_EXAMPLE_SENTENCES.length || exampleSentences.some((s, i) => s !== INITIAL_EXAMPLE_SENTENCES[i]);

    // Determine if we can delete the current sentence
    const canDeleteCurrent = input.trim() !== "" && exampleSentences.includes(input.trim());

    return <div className="row">
        <div className="col-md-3">
            <h5 className="mb-3 d-flex justify-content-between align-items-center">
                <span>Example Sentences</span>
                {isModified && <button className="btn btn-sm btn-secondary" onClick={handleResetExamples}>Reset</button>}
            </h5>
            <div style={{ overflowY: "auto" }}>
                <div className="list-group">
                    <DndProvider backend={HTML5Backend}>
                        {exampleSentences.map((sentence, index) => (
                            <DragAndDropCard
                                key={sentence}
                                id={sentence}
                                index={index}
                                text={sentence}
                                moveCard={moveCard}
                                onClick={() => handleExampleClick(sentence)}
                                isActive={sentence === input}
                            />
                        ))}
                    </DndProvider>
                </div>
            </div>
        </div>
        <div className="col-md-9">
            <textarea
                style={{ width: "100%", height: "200px" }}
                value={input}
                className="form-control"
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <div className="mt-2 d-flex align-items-start">
                <div>
                    <button
                        className="btn btn-primary me-2"
                        onClick={() => setOutput(parseEnglish(input))}
                    >
                        Parse
                    </button>
                    {(() => {
                        const trimmedInput = input.trim();
                        if (trimmedInput !== "" && !exampleSentences.includes(trimmedInput)) {
                            return <button
                                className="btn btn-secondary"
                                onClick={handleAddExample}
                            >
                                Add to Examples
                            </button>;
                        }
                        return null;
                    })()}
                </div>
                {canDeleteCurrent && (
                    <button
                        className="btn btn-danger ms-auto"
                        onClick={handleDeleteCurrentExample}
                    >
                        Delete Example
                    </button>
                )}
            </div>
            <div className="form-check mt-2">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="showNullsCheckbox"
                    checked={showNulls}
                    onChange={() => setShowNulls(prev => !prev)}
                />
                <label className="form-check-label" htmlFor="showNullsCheckbox">
                    Show Nulls
                </label>
            </div>
            {output.length === 0 ? (
                <div className="alert alert-danger mt-3">
                    No valid parse trees found for this sentence.
                </div>
            ) : (
                <>
                    {output.length > 1 && (
                        <div className="alert alert-warning mt-3">
                            This sentence has multiple possible parses (ambiguous).
                        </div>
                    )}
                    {output.map((tree, i) =>
                        <div key={i} className="mt-3">
                            {output.length > 1 && (
                                <h3 className="mb-2">Parse {i + 1}</h3>
                            )}
                            <SyntaxTree showNulls={showNulls} tree={tree} />
                        </div>
                    )}
                </>
            )}
        </div>
    </div>;
}

type AugmentedTreeNode = {
    kind: string,
    width: number,
    this_width: number,
    l_offset: number,
    depth: number,
    children: AugmentedTreeNode[]
};

// eliminate branches which have no children 
function pruneTree(node: TreeNode, showNulls: boolean): TreeNode | null {
    if (typeof node.children === "string") {
        return node;
    }

    if (node.children == null) {
        if (showNulls) {
            return { kind: node.kind, children: "<null>" };
        }
        return null;
    }

    let children = node.children.map(child => pruneTree(child, showNulls)).filter((child): child is TreeNode => child !== null);
    if (children.length === 0) {
        if (showNulls) {
            return { kind: node.kind, children: "<empty list>" };
        }
        return null;
    }
    return { kind: node.kind, children };
}

// find width and depth of each node
function augmentNode(node: TreeNode | string, depth: number, l_offset: number): AugmentedTreeNode {
    if (typeof node === "string") {
        return {
            kind: node,
            width: node.length,
            this_width: node.length,
            children: [],
            depth,
            l_offset
        }
    }
    let children = [];
    let curr_child_width = 0;
    let node_children = typeof node.children === "string"
        ? [node.children]
        : node.children;
    for (let child of node_children) {
        let child_node = augmentNode(child, depth + 1, l_offset + curr_child_width);
        children.push(child_node);
        curr_child_width += child_node.width;
    }
    let this_width = node.kind.length;
    let width = Math.max(curr_child_width, this_width);
    let maxdepth = children.reduce((acc, child) => Math.max(acc, child.depth), depth);

    return { kind: node.kind, width, this_width, children, depth: maxdepth, l_offset }
}

type SyntaxTreeSvgProps = {
    depth: number,
    maxdepth: number,
    node: AugmentedTreeNode,
    parent_loc: { x: number, y: number } | null
}

const LEVEL_DEPTH = 50;
const CHAR_WIDTH = 10;

function SyntaxTreeSvg(props: SyntaxTreeSvgProps) {
    let { depth, maxdepth, node, parent_loc } = props;
    let { kind, this_width, width, children, l_offset } = node;

    let center_x = l_offset + width / 2 - this_width / 2;

    let this_depth = children.length === 0
        ? maxdepth
        : depth;

    let x = center_x * CHAR_WIDTH;
    let y = this_depth * LEVEL_DEPTH;

    let line_x = (l_offset + width / 2) * CHAR_WIDTH
    let line_y = this_depth * LEVEL_DEPTH + 20;

    return <>
        {children.length === 0
            ? <rect x={x} y={y} width={this_width * CHAR_WIDTH} height="40" fill="var(--bs-blue)" />
            : children.map((child, i) => <SyntaxTreeSvg key={i} node={child} depth={depth + 1} maxdepth={maxdepth} parent_loc={{ x: line_x, y: line_y }} />)
        }
        <text x={x} y={y + 30} fill="var(--bs-body-color)">{kind}</text>
        {
            parent_loc === null
                ? null
                : <line x1={line_x} y1={line_y - 10} x2={parent_loc.x} y2={parent_loc.y + 15} stroke="var(--bs-blue)" />
        }
    </>
}


function SyntaxTree({ showNulls, tree }: { showNulls: boolean, tree: TreeNode }) {
    let prunedTree = pruneTree(tree, showNulls);
    if (prunedTree === null) {
        return <div>Empty tree</div>;
    }

    let augmentedTree = augmentNode(prunedTree, 0, 0);

    return <div style={{ paddingTop: "2em" }}>

        <svg width={(augmentedTree.width + 1) * CHAR_WIDTH} height={(augmentedTree.depth + 1) * LEVEL_DEPTH}>
            <SyntaxTreeSvg node={augmentedTree} depth={0} maxdepth={augmentedTree.depth} parent_loc={null} />
        </svg >
    </div>;
}


const ParseEnglishPage = () => <ArticleLayout>{
    ({ Citation, CitationBank }) => {
        return <>
            <h1>Parse English</h1>
            <p>Parse English is a tool that can parse English sentences into a structured format. It is built using the <a href="https://nearley.js.org/">Nearley</a> parsing toolkit.</p>
            <p>It is currently a work in progress, but you can try it out by entering a sentence below, and pressing <kbd>Ctrl+Enter</kbd> or clicking the Parse button. Make sure to insert correct punctuation.</p>

            {/* Capabilities & caveats */}
            <div className="mb-4">
                <h4>Things it can do</h4>
                <ul>
                    <li>Statements (declarative sentences)</li>
                    <li>Questions (interrogative sentences) - including complex moves</li>
                    <li>Most common nouns and some verbs (see dictionary section below for details)</li>
                    <li>Numbers</li>
                    <li>Most irregular verbs</li>
                    <li>Passive phrases in questions or interrogative clauses (e.g., "What was he given?")</li>
                    <li>Subject-verb agreement (e.g., rejecting <em>"I is smart."</em>)</li>
                </ul>

                <h4>Things it <strong>cannot</strong> do <small className="text-muted">(but could in the future, with improvements)</small></h4>
                <ul>
                    <li>Imperatives</li>
                    <li>Unknown words (all unknown words are treated as proper nouns for now)</li>
                    <li>Fused head constructions (e.g., "the poor" treated as a noun phrase)</li>
                    <li>Phrasal verbs (e.g., "He chatted her up")</li>
                    <li>Coordinations ("and", "or", and "but")</li>
                    <li>Quotatives (e.g., <q>And I was like "no way!"</q>)</li>
                    <li>Polarity (e.g., rejecting <em>"I am happy whatsoever"</em>)</li>
                </ul>

                <h4>Things it probably <strong>will never</strong> do <small className="text-muted">(but could be checked in post-processing)</small></h4>
                <ul>
                    <li>Preposition agreement</li>
                    <li>Idioms that aren't grammatical</li>
                    <li>Sentence fragments</li>
                </ul>
            </div>

            <ParseEnglishWidget />
            <div className="mt-5">
                <h4>Dictionary</h4>
                <p>
                    The parser uses a simple dictionary of lexical categories partially sourced from VerbNet. The other ones (all the nouns and adjectives) are manually added by me. You can view the raw file <a href={englishJsonUrl} target="_blank" rel="noopener noreferrer">here</a>.
                </p>
            </div>
            <div className="mt-5">
                <h4>Credits</h4>
                <ul>
                    <li>
                        This project leverages lexical data and verb classifications from <a href="https://verbs.colorado.edu/verbnet/" target="_blank" rel="noopener noreferrer">VerbNet</a>.
                    </li>
                    <li>
                        All grammatical rules are from <a href="https://archive.org/details/a-students-introduction-to-english-grammar" target="_blank" rel="noopener noreferrer"><em>A Student's Introduction to English Grammar</em></a> by Huddleston, Pullum et al.
                    </li>
                </ul>
            </div>
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

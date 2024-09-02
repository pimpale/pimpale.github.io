import React from 'react';
import ArticleLayout from '../components/ArticleLayout';

import nearley from 'nearley';
import englishGrammar from '../translator/englishGrammar';
import { lex } from '../translator/englishLexer';
import katex from 'katex';

type TreeNode = {
    kind: string,
    children: TreeNode[] | string
}


function testNearley(input: string): TreeNode[] {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(englishGrammar));

    // lex input into tokens
    const tokens = lex(input);

    console.log(tokens);

    // Parse something!
    parser.feed(tokens as any);

    // parser.results is an array of possible parsings.
    return parser.results as TreeNode[];
}

function ParseEnglishWidget() {
    let [input, setInput] = React.useState("");
    let [output, setOutput] = React.useState<TreeNode[]>([]);
    return <>
        <textarea
            style={{ width: "100%", height: "200px" }}
            value={input}
            onChange={e => setInput(e.target.value)}
        />
        <button onClick={() => setOutput(testNearley(input))}>Parse</button>
        {output.map((tree, i) =>
            <div key={i}>
                <SyntaxTree tree={tree} />
            </div>
        )}
    </>
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
function pruneTree(node: TreeNode): TreeNode | null {
    if (typeof node.children === "string") {
        return node;
    }
    let children = node.children.map(pruneTree).filter((child): child is TreeNode => child !== null);
    if (children.length === 0) {
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
    for (let child of node.children) {
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
    node: AugmentedTreeNode
}

function SyntaxTreeSvg(props: SyntaxTreeSvgProps) {
    let { depth, node } = props;
    let { kind, this_width, width, children, l_offset } = node;

    let center_x = l_offset + width / 2 - this_width / 2;

    let x = center_x * 10;
    let y = depth * 50;

    return <>
        {children.length === 0
            ? <rect x={x} y={y} width={this_width * 10} height="40" fill="var(--bs-blue)" />
            : children.map((child, i) => <SyntaxTreeSvg key={i} node={child} depth={depth + 1} />)
        }
        <text x={x} y={y + 30} fill="var(--bs-body-color)">{kind}</text>
    </>
}

function SyntaxTreeHtml(props: SyntaxTreeSvgProps) {
    let { depth, node } = props;
    let { kind, width, children, l_offset } = node;

    const katexRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
        if (katexRef.current) {
            katex.render(kind, katexRef.current, {
                throwOnError: false
            });
        }
    }, [kind]);

    let x = l_offset * 10;
    let y = depth * 50;

    return <>
        <span
            ref={katexRef}
            style={{
                position: "absolute",
                left: `${x}px`,
                top: `${y}px`,
            }}
        />
        {typeof children === "string"
            ? null
            : children.map((child, i) => <SyntaxTreeHtml key={i} node={child} depth={depth + 1} />)
        }
    </>
}

function SyntaxTree({ tree }: { tree: TreeNode }) {
    let prunedTree = pruneTree(tree);
    if (prunedTree === null) {
        return <div>Empty tree</div>;
    }

    let augmentedTree = augmentNode(prunedTree, 0, 0);


    //     <div style={{position: "relative"}}>
    //     <SyntaxTreeHtml node={augmentedTree} depth={0} />
    // </div>

    // placeholder
    return <div style={{ paddingTop: "2em" }}>

        <svg width={(augmentedTree.width + 1) * 10} height={(augmentedTree.depth + 1) * 50}>
            <SyntaxTreeSvg node={augmentedTree} depth={0} />
        </svg >
    </div>;
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

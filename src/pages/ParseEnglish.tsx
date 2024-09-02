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
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(englishGrammar as any));

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
            : children.map((child, i) => <SyntaxTreeSvg key={i} node={child} depth={depth + 1} maxdepth={maxdepth} parent_loc={{ x:line_x, y:line_y }} />)
        }
        <text x={x} y={y + 30} fill="var(--bs-body-color)">{kind}</text>
        {
            parent_loc === null
                ? null
                : <line x1={line_x} y1={line_y - 10} x2={parent_loc.x} y2={parent_loc.y + 15} stroke="var(--bs-blue)" />
        }
    </>
}


function SyntaxTree({ tree }: { tree: TreeNode }) {
    let prunedTree = pruneTree(tree);
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

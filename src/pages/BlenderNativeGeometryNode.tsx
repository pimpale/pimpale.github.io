import React from 'react';

import Section from '../components/Section';
import HrefLink from '../components/HrefLink';
import ArticleLayout from '../components/ArticleLayout';

import AsideCard from '../components/AsideCard';

import { Prism as SyntaxHighligher } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import GitDiffUrl from "../assets/blendernativegeometrynode/gitdiff.txt?url";
import DiffCMakeUrl from "../assets/blendernativegeometrynode/diff_node_geo_cc.txt?url";
import DiffDnaUrl from "../assets/blendernativegeometrynode/diff_dna_node_types.txt?url";
import DiffRnaDefUrl from "../assets/blendernativegeometrynode/diff_rna_nodetree_def.txt?url";
import DiffRnaRegisterUrl from "../assets/blendernativegeometrynode/diff_rna_nodetree_register.txt?url";
import DiffMenuUrl from "../assets/blendernativegeometrynode/diff_node_add_menu.txt?url";
import DiffPizzaUrl from "../assets/blendernativegeometrynode/diff_node_geo_pizza.txt?url";
import ResultImgUrl from "../assets/blendernativegeometrynode/result.png"
import PizzaNodeImgUrl from "../assets/blendernativegeometrynode/pizza_node.png"

const BlenderNativeGeometryNodePage = () => <ArticleLayout>{
  ({ Citation, CitationBank }) => <>

    <Section id="blender-native-geometry-node" name="Adding a new Native Geometry Node in Blender 5.2">
      <p>
        <i className='text-muted'>This post builds off of <HrefLink href="https://blog.exppad.com/article/writing-blender-geometry-node" /></i>
      </p>
      <h4>Motivation</h4>
      <p>
        I wanted to write geometry nodes with code instead of visual blocks.
        In general, using something like <a href="https://github.com/carson-katri/geometry-scrip">Geometry Script</a> is probably easier for simple node operations, but if you need more speed, or want to dynamically call libraries at runtime, it won't work (since it only generates nodes trees, and doesn't run the python at runtime).
      </p>
      <AsideCard title="All Possibilities" id="alternatives">
        <details>
          <summary>Here are all ways I am aware of to write a geometry node with code.</summary>
          <ul>
            <li>
              <b><a href="https://github.com/carson-katri/geometry-script">Geometry Script</a></b>: An addon that can translate python code into a node tree.
              <ul>
                <li>Pros / Cons
                  <ul>
                    <li>Pro: Normal addon. Will work anywhere the addon is installed.</li>
                    <li>Con: The python is only used to trace the graph (similar to <a href="https://docs.jax.dev/en/latest/notebooks/thinking_in_jax.html">JAX</a>). As such, it's limited by the abilities of existing native geometry nodes.</li>
                    <li>Con: Can't import other python libraries to process nodes</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <b><a href="https://github.com/al1brn/geonodes">Geonodes</a></b>: An addon that works similarly to Geometry Script. It traces python code, and generates a node tree. Not aware of any major differences from Geometry Script other than API usage.
              <ul>
                <li>Pros / Cons
                  <ul>
                    <li>Same as Geometry Script</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <b><a href="https://blenderartists.org/t/native-code-node-write-geometry-nodes-using-a-native-programming-language-such-as-c-or-c/1543244">Native Code Node</a></b>: A paid addon that allows you to use a dll to process code.
              <ul>
                <li>Pros / Cons
                  <ul>
                    <li>Pro: Can directly interface with the actual values.</li>
                    <li>Pro: Can call libraries</li>
                    <li>Con: Windows Only</li>
                    <li>Con: Paid</li>
                    <li>Con: Broken on modern versions of Blender.</li>
                    <li>Con: Even if it worked, a poorly written node will crash Blender as a whole.</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <b>Adding a Native Node in Source Code</b>: Forking blender and adding a native code node.
              <ul>
                <li>Pros / Cons
                  <ul>
                    <li>Pro: Can directly interface with the actual values.</li>
                    <li>Pro: Ultimate flexibility levels.</li>
                    <li>Pro: Can call any library.</li>
                    <li>Pro: Cross platform, you can compile the blender source code on any supported platform.</li>
                    <li>Con: Need to recompile blender every time you make a change.</li>
                    <li>Con: Could break in future versions of Blender.</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </details>
      </AsideCard>
      <p className='mt-2'>
        If you do decide to write a native geometry node, this guide (<HrefLink href="https://blog.exppad.com/article/writing-blender-geometry-node" />) explains how.
        Unfortunately, it's out of date, having been written for Blender 3.1. We are now on Blender 5.2, and many things have changed.
        This article will discuss the necessary steps to add a new node in Blender 5.2.
      </p>
      <div className='d-flex justify-content-center'>
        <img src={PizzaNodeImgUrl} alt="Rendering of the Pizza with Selection and Pizza Set" />
      </div>
      <h4>Overview of Steps</h4>
      <p>
        There are 5 places where you need to add or change code to add a new Node.
      </p>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <td>File</td>
            <td>What must be added</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>source/blender/nodes/geometry/nodes/node_geo_(name).cc</code></td>
            <td>The node itself: <code>node_declare</code>, <code>node_init</code>, <code>node_layout</code>, <code>node_geo_exec</code>, and <code>node_register</code>. The <code>NOD_REGISTER_NODE(node_register)</code> macro at the bottom automatically registers it.</td>
          </tr>
          <tr>
            <td><code>source/blender/nodes/geometry/CMakeLists.txt</code></td>
            <td>Add the new <code>.cc</code> alphabetically. CMake explicitly lists every source file. Thus, any new code files that are added must be present in this file. If not, it doesn't compile.</td>
          </tr>
          <tr>
            <td><code>source/blender/makesdna/DNA_node_types.h</code></td>
            <td>Define a storage struct (<code>NodeGeometry(Name)</code>) <b>only if</b> the node has stored properties (things that aren't pluggable inputs). Use <code>DNA_DEFINE_CXX_METHODS</code>.</td>
          </tr>
          <tr>
            <td><code>source/blender/makesrna/intern/rna_nodetree.cc</code></td>
            <td>Add a one-line <code>define("GeometryNode", "GeometryNode(Name)");</code> call inside <code>rna_def_nodes</code>. If you have a storage struct, also write a <code>def_geo_(name)</code> function that registers each property and pass it as the third argument.</td>
          </tr>
          <tr>
            <td><code>scripts/startup/bl_ui/node_add_menu_geometry.py</code></td>
            <td>Add <code>self.node_operator(layout, "GeometryNode(Name)")</code> to the appropriate submenu so it shows up in the Add menu.</td>
          </tr>
        </tbody>
      </table>
      <p>
        <b>Not needed anymore:</b>
      </p>
      <ul>
        <li>No need to edit <code>source/blender/blenkernel/intern/node.cc</code> or <code>source/blender/nodes/NOD_geometry.h</code> to register the geometry node. It will be registered automatically if you add the <code>NOD_REGISTER_NODE(node_register)</code> macro in the node geometry file.</li>
        <li>No need to edit <code>source/blender/blenkernel/BKE_node.h</code> (which turned into <code>/source/blender/blenkernel/BKE_node_legacy_types.hh</code>) to define a node ID. Node ids are legacy and not needed for new geometry nodes.</li>
      </ul>
      <h4>In Depth</h4>
      <h4><code>source/blender/nodes/geometry/CMakeLists.txt</code></h4>
      <p>
        Register the new <code>.cc</code> source file with the build so it gets compiled into Blender.
      </p>
      <CodeBlock lang="diff" url={DiffCMakeUrl} />

      <h4><code>source/blender/makesdna/DNA_node_types.h</code></h4>
      <p>
        Declare the storage struct that holds the node's persistent properties (here, the olive count) on disk and in memory.
      </p>
      <CodeBlock lang="diff" url={DiffDnaUrl} />

      <h4><code>source/blender/makesrna/intern/rna_nodetree.cc</code></h4>
      <p>
        Define a <code>def_geo_pizza</code> function that exposes the storage struct's fields to RNA, so they're accessible from Python and bindable to UI controls.
      </p>
      <CodeBlock lang="diff" url={DiffRnaDefUrl} />

      <p>
        Register the node type itself inside <code>rna_def_nodes</code>, passing <code>def_geo_pizza</code> so the property definitions get attached.
      </p>
      <CodeBlock lang="diff" url={DiffRnaRegisterUrl} />

      <h4><code>scripts/startup/bl_ui/node_add_menu_geometry.py</code></h4>
      <p>
        Add the node to the geometry-nodes Add menu so users can actually find and insert it.
      </p>
      <CodeBlock lang="diff" url={DiffMenuUrl} />

      <h4><code>source/blender/nodes/geometry/nodes/node_geo_pizza.cc</code></h4>
      <p>
        The actual node implementation: socket declaration, UI layout, and the mesh-generation code that runs when the node executes. Collapsed by default since it's long.
      </p>
      <details className="mx-5 mb-3">
        <summary>Show diff</summary>
        <CodeBlock lang="diff" url={DiffPizzaUrl} />
      </details>

      <h4>Results</h4>
      <div className='d-flex justify-content-center'>
        <img src={ResultImgUrl} alt="Rendering of the Pizza with Selection and Pizza Set" />
      </div>


      <h4>Full Git Diff</h4>
      <p>
        Download the patch and apply it to a Blender source checkout with <code>git apply</code>:
      </p>
      <p>
        <a className="btn btn-primary" href={GitDiffUrl} download="blender_pizza_node.patch">Download Patch</a>
      </p>
      <SyntaxHighligher className="mx-5 mb-5" language="bash" style={a11yDark}>
        {"git apply blender_pizza_node.patch"}
      </SyntaxHighligher>
      <p>
        The full patch is shown below for convenience:
      </p>
      <CodeBlock lang="diff" url={GitDiffUrl} />
    </Section>
  </>
}</ArticleLayout>

import { createRoot } from 'react-dom/client';

// Bootstrap CSS & JS
import '../styles/style.scss';
import 'bootstrap/dist/js/bootstrap';
import { CodeBlock } from '../components/CodeBlock';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <BlenderNativeGeometryNodePage />
  </React.StrictMode>,
);

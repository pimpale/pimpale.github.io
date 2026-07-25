import GithubSlugger from 'github-slugger';
import { toString } from 'mdast-util-to-string';

/**
 * Wraps each `##` heading and the content that follows it (up to the next `##`)
 * in a `<Section id="..." name="...">` element, so markdown articles get the
 * same anchored-section styling as the hand-written TSX ones.
 *
 * The heading node itself is dropped: `Section` renders the `<h2>` from `name`.
 * Ids are slugs of the heading text, deduplicated in document order.
 *
 * @param {{depth?: number, componentName?: string}} [options]
 */
export default function remarkSectionize(options = {}) {
  const depth = options.depth ?? 2;
  const componentName = options.componentName ?? 'Section';

  return tree => {
    const slugger = new GithubSlugger();
    const out = [];
    let current = null;

    for (const node of tree.children) {
      if (node.type === 'heading' && node.depth === depth) {
        if (current !== null) {
          out.push(current);
        }
        const name = toString(node).trim();
        current = {
          type: 'mdxJsxFlowElement',
          name: componentName,
          attributes: [
            { type: 'mdxJsxAttribute', name: 'id', value: slugger.slug(name) },
            { type: 'mdxJsxAttribute', name: 'name', value: name },
          ],
          children: [],
        };
      } else if (current !== null) {
        current.children.push(node);
      } else {
        // content before the first heading stays at the top level
        out.push(node);
      }
    }

    if (current !== null) {
      out.push(current);
    }

    tree.children = out;
  };
}

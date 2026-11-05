/* =============================================================================
   remark-highlight.mjs — turns ==text== in Markdown into a highlight.
   =============================================================================
   Same syntax as the carousel templates (dbinsights-brand/templates): wrap
   the one thing to remember in double equals signs, e.g.

     Most of the country lives within ==30 km of the coast==.

   and it renders as <mark>30 km of the coast</mark>, which global.css colours
   in the post's Sub-brand Accent (teal for DBSpatial, and so on).

   WHAT IS A REMARK PLUGIN? Astro turns Markdown into HTML in two steps:
   remark reads the Markdown into a tree of nodes (paragraphs, text, links…),
   then rehype turns that tree into HTML. A remark plugin is a function that
   edits the tree in between. This one finds ==…== inside text nodes and
   swaps them for raw <mark> HTML nodes. It's registered in astro.config.mjs.
============================================================================= */

import { findAndReplace } from "mdast-util-find-and-replace";

// ==anything except equals signs==  (non-greedy, stays within one text node)
const HIGHLIGHT = /==([^=]+?)==/g;

export default function remarkHighlight() {
  return (tree) => {
    findAndReplace(tree, [
      [HIGHLIGHT, (_match, text) => ({ type: "html", value: `<mark>${escapeHtml(text)}</mark>` })],
    ]);
  };
}

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

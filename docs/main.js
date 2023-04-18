
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * True if the custom elements polyfill is in use.
 */
const isCEPolyfill = typeof window !== 'undefined' &&
    window.customElements != null &&
    window.customElements.polyfillWrapFlushCallback !==
        undefined;
/**
 * Reparents nodes, starting from `start` (inclusive) to `end` (exclusive),
 * into another container (could be the same container), before `before`. If
 * `before` is null, it appends the nodes to the container.
 */
const reparentNodes = (container, start, end = null, before = null) => {
    while (start !== end) {
        const n = start.nextSibling;
        container.insertBefore(start, before);
        start = n;
    }
};
/**
 * Removes nodes, starting from `start` (inclusive) to `end` (exclusive), from
 * `container`.
 */
const removeNodes = (container, start, end = null) => {
    while (start !== end) {
        const n = start.nextSibling;
        container.removeChild(start);
        start = n;
    }
};
//# sourceMappingURL=dom.js.map

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * An expression marker with embedded unique key to avoid collision with
 * possible text in templates.
 */
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
/**
 * An expression marker used text-positions, multi-binding attributes, and
 * attributes with markup-like text values.
 */
const nodeMarker = `<!--${marker}-->`;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
/**
 * Suffix appended to all bound attribute names.
 */
const boundAttributeSuffix = '$lit$';
/**
 * An updatable Template that tracks the location of dynamic parts.
 */
class Template {
    constructor(result, element) {
        this.parts = [];
        this.element = element;
        const nodesToRemove = [];
        const stack = [];
        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
        const walker = document.createTreeWalker(element.content, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
        // Keeps track of the last index associated with a part. We try to delete
        // unnecessary nodes, but we never want to associate two different parts
        // to the same index. They must have a constant node between.
        let lastPartIndex = 0;
        let index = -1;
        let partIndex = 0;
        const { strings, values: { length } } = result;
        while (partIndex < length) {
            const node = walker.nextNode();
            if (node === null) {
                // We've exhausted the content inside a nested template element.
                // Because we still have parts (the outer for-loop), we know:
                // - There is a template in the stack
                // - The walker will find a nextNode outside the template
                walker.currentNode = stack.pop();
                continue;
            }
            index++;
            if (node.nodeType === 1 /* Node.ELEMENT_NODE */) {
                if (node.hasAttributes()) {
                    const attributes = node.attributes;
                    const { length } = attributes;
                    // Per
                    // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
                    // attributes are not guaranteed to be returned in document order.
                    // In particular, Edge/IE can return them out of order, so we cannot
                    // assume a correspondence between part index and attribute index.
                    let count = 0;
                    for (let i = 0; i < length; i++) {
                        if (endsWith(attributes[i].name, boundAttributeSuffix)) {
                            count++;
                        }
                    }
                    while (count-- > 0) {
                        // Get the template literal section leading up to the first
                        // expression in this attribute
                        const stringForPart = strings[partIndex];
                        // Find the attribute name
                        const name = lastAttributeNameRegex.exec(stringForPart)[2];
                        // Find the corresponding attribute
                        // All bound attributes have had a suffix added in
                        // TemplateResult#getHTML to opt out of special attribute
                        // handling. To look up the attribute value we also need to add
                        // the suffix.
                        const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
                        const attributeValue = node.getAttribute(attributeLookupName);
                        node.removeAttribute(attributeLookupName);
                        const statics = attributeValue.split(markerRegex);
                        this.parts.push({ type: 'attribute', index, name, strings: statics });
                        partIndex += statics.length - 1;
                    }
                }
                if (node.tagName === 'TEMPLATE') {
                    stack.push(node);
                    walker.currentNode = node.content;
                }
            }
            else if (node.nodeType === 3 /* Node.TEXT_NODE */) {
                const data = node.data;
                if (data.indexOf(marker) >= 0) {
                    const parent = node.parentNode;
                    const strings = data.split(markerRegex);
                    const lastIndex = strings.length - 1;
                    // Generate a new text node for each literal section
                    // These nodes are also used as the markers for node parts
                    for (let i = 0; i < lastIndex; i++) {
                        let insert;
                        let s = strings[i];
                        if (s === '') {
                            insert = createMarker();
                        }
                        else {
                            const match = lastAttributeNameRegex.exec(s);
                            if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                                s = s.slice(0, match.index) + match[1] +
                                    match[2].slice(0, -boundAttributeSuffix.length) + match[3];
                            }
                            insert = document.createTextNode(s);
                        }
                        parent.insertBefore(insert, node);
                        this.parts.push({ type: 'node', index: ++index });
                    }
                    // If there's no text, we must insert a comment to mark our place.
                    // Else, we can trust it will stick around after cloning.
                    if (strings[lastIndex] === '') {
                        parent.insertBefore(createMarker(), node);
                        nodesToRemove.push(node);
                    }
                    else {
                        node.data = strings[lastIndex];
                    }
                    // We have a part for each match found
                    partIndex += lastIndex;
                }
            }
            else if (node.nodeType === 8 /* Node.COMMENT_NODE */) {
                if (node.data === marker) {
                    const parent = node.parentNode;
                    // Add a new marker node to be the startNode of the Part if any of
                    // the following are true:
                    //  * We don't have a previousSibling
                    //  * The previousSibling is already the start of a previous part
                    if (node.previousSibling === null || index === lastPartIndex) {
                        index++;
                        parent.insertBefore(createMarker(), node);
                    }
                    lastPartIndex = index;
                    this.parts.push({ type: 'node', index });
                    // If we don't have a nextSibling, keep this node so we have an end.
                    // Else, we can remove it to save future costs.
                    if (node.nextSibling === null) {
                        node.data = '';
                    }
                    else {
                        nodesToRemove.push(node);
                        index--;
                    }
                    partIndex++;
                }
                else {
                    let i = -1;
                    while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
                        // Comment node has a binding marker inside, make an inactive part
                        // The binding won't work, but subsequent bindings will
                        // TODO (justinfagnani): consider whether it's even worth it to
                        // make bindings in comments work
                        this.parts.push({ type: 'node', index: -1 });
                        partIndex++;
                    }
                }
            }
        }
        // Remove text binding nodes after the walk to not disturb the TreeWalker
        for (const n of nodesToRemove) {
            n.parentNode.removeChild(n);
        }
    }
}
const endsWith = (str, suffix) => {
    const index = str.length - suffix.length;
    return index >= 0 && str.slice(index) === suffix;
};
const isTemplatePartActive = (part) => part.index !== -1;
// Allows `document.createComment('')` to be renamed for a
// small manual size-savings.
const createMarker = () => document.createComment('');
/**
 * This regex extracts the attribute name preceding an attribute-position
 * expression. It does this by matching the syntax allowed for attributes
 * against the string literal directly preceding the expression, assuming that
 * the expression is in an attribute-value position.
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#elements-attributes
 *
 * " \x09\x0a\x0c\x0d" are HTML space characters:
 * https://www.w3.org/TR/html5/infrastructure.html#space-characters
 *
 * "\0-\x1F\x7F-\x9F" are Unicode control characters, which includes every
 * space character except " ".
 *
 * So an attribute is:
 *  * The name: any character except a control character, space character, ('),
 *    ("), ">", "=", or "/"
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */
const lastAttributeNameRegex = 
// eslint-disable-next-line no-control-regex
/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
//# sourceMappingURL=template.js.map

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const walkerNodeFilter = 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */;
/**
 * Removes the list of nodes from a Template safely. In addition to removing
 * nodes from the Template, the Template part indices are updated to match
 * the mutated Template DOM.
 *
 * As the template is walked the removal state is tracked and
 * part indices are adjusted as needed.
 *
 * div
 *   div#1 (remove) <-- start removing (removing node is div#1)
 *     div
 *       div#2 (remove)  <-- continue removing (removing node is still div#1)
 *         div
 * div <-- stop removing since previous sibling is the removing node (div#1,
 * removed 4 nodes)
 */
function removeNodesFromTemplate(template, nodesToRemove) {
    const { element: { content }, parts } = template;
    const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
    let partIndex = nextActiveIndexInTemplateParts(parts);
    let part = parts[partIndex];
    let nodeIndex = -1;
    let removeCount = 0;
    const nodesToRemoveInTemplate = [];
    let currentRemovingNode = null;
    while (walker.nextNode()) {
        nodeIndex++;
        const node = walker.currentNode;
        // End removal if stepped past the removing node
        if (node.previousSibling === currentRemovingNode) {
            currentRemovingNode = null;
        }
        // A node to remove was found in the template
        if (nodesToRemove.has(node)) {
            nodesToRemoveInTemplate.push(node);
            // Track node we're removing
            if (currentRemovingNode === null) {
                currentRemovingNode = node;
            }
        }
        // When removing, increment count by which to adjust subsequent part indices
        if (currentRemovingNode !== null) {
            removeCount++;
        }
        while (part !== undefined && part.index === nodeIndex) {
            // If part is in a removed node deactivate it by setting index to -1 or
            // adjust the index as needed.
            part.index = currentRemovingNode !== null ? -1 : part.index - removeCount;
            // go to the next active part.
            partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
            part = parts[partIndex];
        }
    }
    nodesToRemoveInTemplate.forEach((n) => n.parentNode.removeChild(n));
}
const countNodes = (node) => {
    let count = (node.nodeType === 11 /* Node.DOCUMENT_FRAGMENT_NODE */) ? 0 : 1;
    const walker = document.createTreeWalker(node, walkerNodeFilter, null, false);
    while (walker.nextNode()) {
        count++;
    }
    return count;
};
const nextActiveIndexInTemplateParts = (parts, startIndex = -1) => {
    for (let i = startIndex + 1; i < parts.length; i++) {
        const part = parts[i];
        if (isTemplatePartActive(part)) {
            return i;
        }
    }
    return -1;
};
/**
 * Inserts the given node into the Template, optionally before the given
 * refNode. In addition to inserting the node into the Template, the Template
 * part indices are updated to match the mutated Template DOM.
 */
function insertNodeIntoTemplate(template, node, refNode = null) {
    const { element: { content }, parts } = template;
    // If there's no refNode, then put node at end of template.
    // No part indices need to be shifted in this case.
    if (refNode === null || refNode === undefined) {
        content.appendChild(node);
        return;
    }
    const walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
    let partIndex = nextActiveIndexInTemplateParts(parts);
    let insertCount = 0;
    let walkerIndex = -1;
    while (walker.nextNode()) {
        walkerIndex++;
        const walkerNode = walker.currentNode;
        if (walkerNode === refNode) {
            insertCount = countNodes(node);
            refNode.parentNode.insertBefore(node, refNode);
        }
        while (partIndex !== -1 && parts[partIndex].index === walkerIndex) {
            // If we've inserted the node, simply adjust all subsequent parts
            if (insertCount > 0) {
                while (partIndex !== -1) {
                    parts[partIndex].index += insertCount;
                    partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
                }
                return;
            }
            partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
        }
    }
}
//# sourceMappingURL=modify-template.js.map

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const directives = new WeakMap();
const isDirective = (o) => {
    return typeof o === 'function' && directives.has(o);
};
//# sourceMappingURL=directive.js.map

/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
const noChange = {};
/**
 * A sentinel value that signals a NodePart to fully clear its content.
 */
const nothing = {};
//# sourceMappingURL=part.js.map

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * An instance of a `Template` that can be attached to the DOM and updated
 * with new values.
 */
class TemplateInstance {
    constructor(template, processor, options) {
        this.__parts = [];
        this.template = template;
        this.processor = processor;
        this.options = options;
    }
    update(values) {
        let i = 0;
        for (const part of this.__parts) {
            if (part !== undefined) {
                part.setValue(values[i]);
            }
            i++;
        }
        for (const part of this.__parts) {
            if (part !== undefined) {
                part.commit();
            }
        }
    }
    _clone() {
        // There are a number of steps in the lifecycle of a template instance's
        // DOM fragment:
        //  1. Clone - create the instance fragment
        //  2. Adopt - adopt into the main document
        //  3. Process - find part markers and create parts
        //  4. Upgrade - upgrade custom elements
        //  5. Update - set node, attribute, property, etc., values
        //  6. Connect - connect to the document. Optional and outside of this
        //     method.
        //
        // We have a few constraints on the ordering of these steps:
        //  * We need to upgrade before updating, so that property values will pass
        //    through any property setters.
        //  * We would like to process before upgrading so that we're sure that the
        //    cloned fragment is inert and not disturbed by self-modifying DOM.
        //  * We want custom elements to upgrade even in disconnected fragments.
        //
        // Given these constraints, with full custom elements support we would
        // prefer the order: Clone, Process, Adopt, Upgrade, Update, Connect
        //
        // But Safari does not implement CustomElementRegistry#upgrade, so we
        // can not implement that order and still have upgrade-before-update and
        // upgrade disconnected fragments. So we instead sacrifice the
        // process-before-upgrade constraint, since in Custom Elements v1 elements
        // must not modify their light DOM in the constructor. We still have issues
        // when co-existing with CEv0 elements like Polymer 1, and with polyfills
        // that don't strictly adhere to the no-modification rule because shadow
        // DOM, which may be created in the constructor, is emulated by being placed
        // in the light DOM.
        //
        // The resulting order is on native is: Clone, Adopt, Upgrade, Process,
        // Update, Connect. document.importNode() performs Clone, Adopt, and Upgrade
        // in one step.
        //
        // The Custom Elements v1 polyfill supports upgrade(), so the order when
        // polyfilled is the more ideal: Clone, Process, Adopt, Upgrade, Update,
        // Connect.
        const fragment = isCEPolyfill ?
            this.template.element.content.cloneNode(true) :
            document.importNode(this.template.element.content, true);
        const stack = [];
        const parts = this.template.parts;
        // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be null
        const walker = document.createTreeWalker(fragment, 133 /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */, null, false);
        let partIndex = 0;
        let nodeIndex = 0;
        let part;
        let node = walker.nextNode();
        // Loop through all the nodes and parts of a template
        while (partIndex < parts.length) {
            part = parts[partIndex];
            if (!isTemplatePartActive(part)) {
                this.__parts.push(undefined);
                partIndex++;
                continue;
            }
            // Progress the tree walker until we find our next part's node.
            // Note that multiple parts may share the same node (attribute parts
            // on a single element), so this loop may not run at all.
            while (nodeIndex < part.index) {
                nodeIndex++;
                if (node.nodeName === 'TEMPLATE') {
                    stack.push(node);
                    walker.currentNode = node.content;
                }
                if ((node = walker.nextNode()) === null) {
                    // We've exhausted the content inside a nested template element.
                    // Because we still have parts (the outer for-loop), we know:
                    // - There is a template in the stack
                    // - The walker will find a nextNode outside the template
                    walker.currentNode = stack.pop();
                    node = walker.nextNode();
                }
            }
            // We've arrived at our part's node.
            if (part.type === 'node') {
                const part = this.processor.handleTextExpression(this.options);
                part.insertAfterNode(node.previousSibling);
                this.__parts.push(part);
            }
            else {
                this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
            }
            partIndex++;
        }
        if (isCEPolyfill) {
            document.adoptNode(fragment);
            customElements.upgrade(fragment);
        }
        return fragment;
    }
}
//# sourceMappingURL=template-instance.js.map

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Our TrustedTypePolicy for HTML which is declared using the html template
 * tag function.
 *
 * That HTML is a developer-authored constant, and is parsed with innerHTML
 * before any untrusted expressions have been mixed in. Therefor it is
 * considered safe by construction.
 */
const policy = window.trustedTypes &&
    trustedTypes.createPolicy('lit-html', { createHTML: (s) => s });
const commentMarker = ` ${marker} `;
/**
 * The return type of `html`, which holds a Template and the values from
 * interpolated expressions.
 */
class TemplateResult {
    constructor(strings, values, type, processor) {
        this.strings = strings;
        this.values = values;
        this.type = type;
        this.processor = processor;
    }
    /**
     * Returns a string of HTML used to create a `<template>` element.
     */
    getHTML() {
        const l = this.strings.length - 1;
        let html = '';
        let isCommentBinding = false;
        for (let i = 0; i < l; i++) {
            const s = this.strings[i];
            // For each binding we want to determine the kind of marker to insert
            // into the template source before it's parsed by the browser's HTML
            // parser. The marker type is based on whether the expression is in an
            // attribute, text, or comment position.
            //   * For node-position bindings we insert a comment with the marker
            //     sentinel as its text content, like <!--{{lit-guid}}-->.
            //   * For attribute bindings we insert just the marker sentinel for the
            //     first binding, so that we support unquoted attribute bindings.
            //     Subsequent bindings can use a comment marker because multi-binding
            //     attributes must be quoted.
            //   * For comment bindings we insert just the marker sentinel so we don't
            //     close the comment.
            //
            // The following code scans the template source, but is *not* an HTML
            // parser. We don't need to track the tree structure of the HTML, only
            // whether a binding is inside a comment, and if not, if it appears to be
            // the first binding in an attribute.
            const commentOpen = s.lastIndexOf('<!--');
            // We're in comment position if we have a comment open with no following
            // comment close. Because <-- can appear in an attribute value there can
            // be false positives.
            isCommentBinding = (commentOpen > -1 || isCommentBinding) &&
                s.indexOf('-->', commentOpen + 1) === -1;
            // Check to see if we have an attribute-like sequence preceding the
            // expression. This can match "name=value" like structures in text,
            // comments, and attribute values, so there can be false-positives.
            const attributeMatch = lastAttributeNameRegex.exec(s);
            if (attributeMatch === null) {
                // We're only in this branch if we don't have a attribute-like
                // preceding sequence. For comments, this guards against unusual
                // attribute values like <div foo="<!--${'bar'}">. Cases like
                // <!-- foo=${'bar'}--> are handled correctly in the attribute branch
                // below.
                html += s + (isCommentBinding ? commentMarker : nodeMarker);
            }
            else {
                // For attributes we use just a marker sentinel, and also append a
                // $lit$ suffix to the name to opt-out of attribute-specific parsing
                // that IE and Edge do for style and certain SVG attributes.
                html += s.substr(0, attributeMatch.index) + attributeMatch[1] +
                    attributeMatch[2] + boundAttributeSuffix + attributeMatch[3] +
                    marker;
            }
        }
        html += this.strings[l];
        return html;
    }
    getTemplateElement() {
        const template = document.createElement('template');
        let value = this.getHTML();
        if (policy !== undefined) {
            // this is secure because `this.strings` is a TemplateStringsArray.
            // TODO: validate this when
            // https://github.com/tc39/proposal-array-is-template-object is
            // implemented.
            value = policy.createHTML(value);
        }
        template.innerHTML = value;
        return template;
    }
}
/**
 * A TemplateResult for SVG fragments.
 *
 * This class wraps HTML in an `<svg>` tag in order to parse its contents in the
 * SVG namespace, then modifies the template to remove the `<svg>` tag so that
 * clones only container the original fragment.
 */
class SVGTemplateResult extends TemplateResult {
    getHTML() {
        return `<svg>${super.getHTML()}</svg>`;
    }
    getTemplateElement() {
        const template = super.getTemplateElement();
        const content = template.content;
        const svgElement = content.firstChild;
        content.removeChild(svgElement);
        reparentNodes(content, svgElement.firstChild);
        return template;
    }
}
//# sourceMappingURL=template-result.js.map

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const isPrimitive = (value) => {
    return (value === null ||
        !(typeof value === 'object' || typeof value === 'function'));
};
const isIterable = (value) => {
    return Array.isArray(value) ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        !!(value && value[Symbol.iterator]);
};
/**
 * Writes attribute values to the DOM for a group of AttributeParts bound to a
 * single attribute. The value is only set once even if there are multiple parts
 * for an attribute.
 */
class AttributeCommitter {
    constructor(element, name, strings) {
        this.dirty = true;
        this.element = element;
        this.name = name;
        this.strings = strings;
        this.parts = [];
        for (let i = 0; i < strings.length - 1; i++) {
            this.parts[i] = this._createPart();
        }
    }
    /**
     * Creates a single part. Override this to create a differnt type of part.
     */
    _createPart() {
        return new AttributePart(this);
    }
    _getValue() {
        const strings = this.strings;
        const l = strings.length - 1;
        const parts = this.parts;
        // If we're assigning an attribute via syntax like:
        //    attr="${foo}"  or  attr=${foo}
        // but not
        //    attr="${foo} ${bar}" or attr="${foo} baz"
        // then we don't want to coerce the attribute value into one long
        // string. Instead we want to just return the value itself directly,
        // so that sanitizeDOMValue can get the actual value rather than
        // String(value)
        // The exception is if v is an array, in which case we do want to smash
        // it together into a string without calling String() on the array.
        //
        // This also allows trusted values (when using TrustedTypes) being
        // assigned to DOM sinks without being stringified in the process.
        if (l === 1 && strings[0] === '' && strings[1] === '') {
            const v = parts[0].value;
            if (typeof v === 'symbol') {
                return String(v);
            }
            if (typeof v === 'string' || !isIterable(v)) {
                return v;
            }
        }
        let text = '';
        for (let i = 0; i < l; i++) {
            text += strings[i];
            const part = parts[i];
            if (part !== undefined) {
                const v = part.value;
                if (isPrimitive(v) || !isIterable(v)) {
                    text += typeof v === 'string' ? v : String(v);
                }
                else {
                    for (const t of v) {
                        text += typeof t === 'string' ? t : String(t);
                    }
                }
            }
        }
        text += strings[l];
        return text;
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            this.element.setAttribute(this.name, this._getValue());
        }
    }
}
/**
 * A Part that controls all or part of an attribute value.
 */
class AttributePart {
    constructor(committer) {
        this.value = undefined;
        this.committer = committer;
    }
    setValue(value) {
        if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
            this.value = value;
            // If the value is a not a directive, dirty the committer so that it'll
            // call setAttribute. If the value is a directive, it'll dirty the
            // committer if it calls setValue().
            if (!isDirective(value)) {
                this.committer.dirty = true;
            }
        }
    }
    commit() {
        while (isDirective(this.value)) {
            const directive = this.value;
            this.value = noChange;
            directive(this);
        }
        if (this.value === noChange) {
            return;
        }
        this.committer.commit();
    }
}
/**
 * A Part that controls a location within a Node tree. Like a Range, NodePart
 * has start and end locations and can set and update the Nodes between those
 * locations.
 *
 * NodeParts support several value types: primitives, Nodes, TemplateResults,
 * as well as arrays and iterables of those types.
 */
class NodePart {
    constructor(options) {
        this.value = undefined;
        this.__pendingValue = undefined;
        this.options = options;
    }
    /**
     * Appends this part into a container.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendInto(container) {
        this.startNode = container.appendChild(createMarker());
        this.endNode = container.appendChild(createMarker());
    }
    /**
     * Inserts this part after the `ref` node (between `ref` and `ref`'s next
     * sibling). Both `ref` and its next sibling must be static, unchanging nodes
     * such as those that appear in a literal section of a template.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterNode(ref) {
        this.startNode = ref;
        this.endNode = ref.nextSibling;
    }
    /**
     * Appends this part into a parent part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    appendIntoPart(part) {
        part.__insert(this.startNode = createMarker());
        part.__insert(this.endNode = createMarker());
    }
    /**
     * Inserts this part after the `ref` part.
     *
     * This part must be empty, as its contents are not automatically moved.
     */
    insertAfterPart(ref) {
        ref.__insert(this.startNode = createMarker());
        this.endNode = ref.endNode;
        ref.endNode = this.startNode;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        if (this.startNode.parentNode === null) {
            return;
        }
        while (isDirective(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        const value = this.__pendingValue;
        if (value === noChange) {
            return;
        }
        if (isPrimitive(value)) {
            if (value !== this.value) {
                this.__commitText(value);
            }
        }
        else if (value instanceof TemplateResult) {
            this.__commitTemplateResult(value);
        }
        else if (value instanceof Node) {
            this.__commitNode(value);
        }
        else if (isIterable(value)) {
            this.__commitIterable(value);
        }
        else if (value === nothing) {
            this.value = nothing;
            this.clear();
        }
        else {
            // Fallback, will render the string representation
            this.__commitText(value);
        }
    }
    __insert(node) {
        this.endNode.parentNode.insertBefore(node, this.endNode);
    }
    __commitNode(value) {
        if (this.value === value) {
            return;
        }
        this.clear();
        this.__insert(value);
        this.value = value;
    }
    __commitText(value) {
        const node = this.startNode.nextSibling;
        value = value == null ? '' : value;
        // If `value` isn't already a string, we explicitly convert it here in case
        // it can't be implicitly converted - i.e. it's a symbol.
        const valueAsString = typeof value === 'string' ? value : String(value);
        if (node === this.endNode.previousSibling &&
            node.nodeType === 3 /* Node.TEXT_NODE */) {
            // If we only have a single text node between the markers, we can just
            // set its value, rather than replacing it.
            // TODO(justinfagnani): Can we just check if this.value is primitive?
            node.data = valueAsString;
        }
        else {
            this.__commitNode(document.createTextNode(valueAsString));
        }
        this.value = value;
    }
    __commitTemplateResult(value) {
        const template = this.options.templateFactory(value);
        if (this.value instanceof TemplateInstance &&
            this.value.template === template) {
            this.value.update(value.values);
        }
        else {
            // Make sure we propagate the template processor from the TemplateResult
            // so that we use its syntax extension, etc. The template factory comes
            // from the render function options so that it can control template
            // caching and preprocessing.
            const instance = new TemplateInstance(template, value.processor, this.options);
            const fragment = instance._clone();
            instance.update(value.values);
            this.__commitNode(fragment);
            this.value = instance;
        }
    }
    __commitIterable(value) {
        // For an Iterable, we create a new InstancePart per item, then set its
        // value to the item. This is a little bit of overhead for every item in
        // an Iterable, but it lets us recurse easily and efficiently update Arrays
        // of TemplateResults that will be commonly returned from expressions like:
        // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
        // If _value is an array, then the previous render was of an
        // iterable and _value will contain the NodeParts from the previous
        // render. If _value is not an array, clear this part and make a new
        // array for NodeParts.
        if (!Array.isArray(this.value)) {
            this.value = [];
            this.clear();
        }
        // Lets us keep track of how many items we stamped so we can clear leftover
        // items from a previous render
        const itemParts = this.value;
        let partIndex = 0;
        let itemPart;
        for (const item of value) {
            // Try to reuse an existing part
            itemPart = itemParts[partIndex];
            // If no existing part, create a new one
            if (itemPart === undefined) {
                itemPart = new NodePart(this.options);
                itemParts.push(itemPart);
                if (partIndex === 0) {
                    itemPart.appendIntoPart(this);
                }
                else {
                    itemPart.insertAfterPart(itemParts[partIndex - 1]);
                }
            }
            itemPart.setValue(item);
            itemPart.commit();
            partIndex++;
        }
        if (partIndex < itemParts.length) {
            // Truncate the parts array so _value reflects the current state
            itemParts.length = partIndex;
            this.clear(itemPart && itemPart.endNode);
        }
    }
    clear(startNode = this.startNode) {
        removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
    }
}
/**
 * Implements a boolean attribute, roughly as defined in the HTML
 * specification.
 *
 * If the value is truthy, then the attribute is present with a value of
 * ''. If the value is falsey, the attribute is removed.
 */
class BooleanAttributePart {
    constructor(element, name, strings) {
        this.value = undefined;
        this.__pendingValue = undefined;
        if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
            throw new Error('Boolean attributes can only contain a single expression');
        }
        this.element = element;
        this.name = name;
        this.strings = strings;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while (isDirective(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        if (this.__pendingValue === noChange) {
            return;
        }
        const value = !!this.__pendingValue;
        if (this.value !== value) {
            if (value) {
                this.element.setAttribute(this.name, '');
            }
            else {
                this.element.removeAttribute(this.name);
            }
            this.value = value;
        }
        this.__pendingValue = noChange;
    }
}
/**
 * Sets attribute values for PropertyParts, so that the value is only set once
 * even if there are multiple parts for a property.
 *
 * If an expression controls the whole property value, then the value is simply
 * assigned to the property under control. If there are string literals or
 * multiple expressions, then the strings are expressions are interpolated into
 * a string first.
 */
class PropertyCommitter extends AttributeCommitter {
    constructor(element, name, strings) {
        super(element, name, strings);
        this.single =
            (strings.length === 2 && strings[0] === '' && strings[1] === '');
    }
    _createPart() {
        return new PropertyPart(this);
    }
    _getValue() {
        if (this.single) {
            return this.parts[0].value;
        }
        return super._getValue();
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.element[this.name] = this._getValue();
        }
    }
}
class PropertyPart extends AttributePart {
}
// Detect event listener options support. If the `capture` property is read
// from the options object, then options are supported. If not, then the third
// argument to add/removeEventListener is interpreted as the boolean capture
// value so we should only pass the `capture` property.
let eventOptionsSupported = false;
// Wrap into an IIFE because MS Edge <= v41 does not support having try/catch
// blocks right into the body of a module
(() => {
    try {
        const options = {
            get capture() {
                eventOptionsSupported = true;
                return false;
            }
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.addEventListener('test', options, options);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.removeEventListener('test', options, options);
    }
    catch (_e) {
        // event options not supported
    }
})();
class EventPart {
    constructor(element, eventName, eventContext) {
        this.value = undefined;
        this.__pendingValue = undefined;
        this.element = element;
        this.eventName = eventName;
        this.eventContext = eventContext;
        this.__boundHandleEvent = (e) => this.handleEvent(e);
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while (isDirective(this.__pendingValue)) {
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        if (this.__pendingValue === noChange) {
            return;
        }
        const newListener = this.__pendingValue;
        const oldListener = this.value;
        const shouldRemoveListener = newListener == null ||
            oldListener != null &&
                (newListener.capture !== oldListener.capture ||
                    newListener.once !== oldListener.once ||
                    newListener.passive !== oldListener.passive);
        const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
        if (shouldRemoveListener) {
            this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
        }
        if (shouldAddListener) {
            this.__options = getOptions(newListener);
            this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
        }
        this.value = newListener;
        this.__pendingValue = noChange;
    }
    handleEvent(event) {
        if (typeof this.value === 'function') {
            this.value.call(this.eventContext || this.element, event);
        }
        else {
            this.value.handleEvent(event);
        }
    }
}
// We copy options because of the inconsistent behavior of browsers when reading
// the third argument of add/removeEventListener. IE11 doesn't support options
// at all. Chrome 41 only reads `capture` if the argument is an object.
const getOptions = (o) => o &&
    (eventOptionsSupported ?
        { capture: o.capture, passive: o.passive, once: o.once } :
        o.capture);
//# sourceMappingURL=parts.js.map

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * The default TemplateFactory which caches Templates keyed on
 * result.type and result.strings.
 */
function templateFactory(result) {
    let templateCache = templateCaches.get(result.type);
    if (templateCache === undefined) {
        templateCache = {
            stringsArray: new WeakMap(),
            keyString: new Map()
        };
        templateCaches.set(result.type, templateCache);
    }
    let template = templateCache.stringsArray.get(result.strings);
    if (template !== undefined) {
        return template;
    }
    // If the TemplateStringsArray is new, generate a key from the strings
    // This key is shared between all templates with identical content
    const key = result.strings.join(marker);
    // Check if we already have a Template for this key
    template = templateCache.keyString.get(key);
    if (template === undefined) {
        // If we have not seen this key before, create a new Template
        template = new Template(result, result.getTemplateElement());
        // Cache the Template for this key
        templateCache.keyString.set(key, template);
    }
    // Cache all future queries for this TemplateStringsArray
    templateCache.stringsArray.set(result.strings, template);
    return template;
}
const templateCaches = new Map();
//# sourceMappingURL=template-factory.js.map

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const parts = new WeakMap();
/**
 * Renders a template result or other value to a container.
 *
 * To update a container with new values, reevaluate the template literal and
 * call `render` with the new result.
 *
 * @param result Any value renderable by NodePart - typically a TemplateResult
 *     created by evaluating a template tag like `html` or `svg`.
 * @param container A DOM parent to render to. The entire contents are either
 *     replaced, or efficiently updated if the same result type was previous
 *     rendered there.
 * @param options RenderOptions for the entire render tree rendered to this
 *     container. Render options must *not* change between renders to the same
 *     container, as those changes will not effect previously rendered DOM.
 */
const render = (result, container, options) => {
    let part = parts.get(container);
    if (part === undefined) {
        removeNodes(container, container.firstChild);
        parts.set(container, part = new NodePart(Object.assign({ templateFactory }, options)));
        part.appendInto(container);
    }
    part.setValue(result);
    part.commit();
};
//# sourceMappingURL=render.js.map

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Creates Parts when a template is instantiated.
 */
class DefaultTemplateProcessor {
    /**
     * Create parts for an attribute-position binding, given the event, attribute
     * name, and string literals.
     *
     * @param element The element containing the binding
     * @param name  The attribute name
     * @param strings The string literals. There are always at least two strings,
     *   event for fully-controlled bindings with a single expression.
     */
    handleAttributeExpressions(element, name, strings, options) {
        const prefix = name[0];
        if (prefix === '.') {
            const committer = new PropertyCommitter(element, name.slice(1), strings);
            return committer.parts;
        }
        if (prefix === '@') {
            return [new EventPart(element, name.slice(1), options.eventContext)];
        }
        if (prefix === '?') {
            return [new BooleanAttributePart(element, name.slice(1), strings)];
        }
        const committer = new AttributeCommitter(element, name, strings);
        return committer.parts;
    }
    /**
     * Create parts for a text-position binding.
     * @param templateFactory
     */
    handleTextExpression(options) {
        return new NodePart(options);
    }
}
const defaultTemplateProcessor = new DefaultTemplateProcessor();
//# sourceMappingURL=default-template-processor.js.map

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for lit-html usage.
// TODO(justinfagnani): inject version number at build time
if (typeof window !== 'undefined') {
    (window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.3.0');
}
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */
const html = (strings, ...values) => new TemplateResult(strings, values, 'html', defaultTemplateProcessor);
/**
 * Interprets a template literal as an SVG template that can efficiently
 * render to and update a container.
 */
const svg = (strings, ...values) => new SVGTemplateResult(strings, values, 'svg', defaultTemplateProcessor);
//# sourceMappingURL=lit-html.js.map

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// Get a key to lookup in `templateCaches`.
const getTemplateCacheKey = (type, scopeName) => `${type}--${scopeName}`;
let compatibleShadyCSSVersion = true;
if (typeof window.ShadyCSS === 'undefined') {
    compatibleShadyCSSVersion = false;
}
else if (typeof window.ShadyCSS.prepareTemplateDom === 'undefined') {
    console.warn(`Incompatible ShadyCSS version detected. ` +
        `Please update to at least @webcomponents/webcomponentsjs@2.0.2 and ` +
        `@webcomponents/shadycss@1.3.1.`);
    compatibleShadyCSSVersion = false;
}
/**
 * Template factory which scopes template DOM using ShadyCSS.
 * @param scopeName {string}
 */
const shadyTemplateFactory = (scopeName) => (result) => {
    const cacheKey = getTemplateCacheKey(result.type, scopeName);
    let templateCache = templateCaches.get(cacheKey);
    if (templateCache === undefined) {
        templateCache = {
            stringsArray: new WeakMap(),
            keyString: new Map()
        };
        templateCaches.set(cacheKey, templateCache);
    }
    let template = templateCache.stringsArray.get(result.strings);
    if (template !== undefined) {
        return template;
    }
    const key = result.strings.join(marker);
    template = templateCache.keyString.get(key);
    if (template === undefined) {
        const element = result.getTemplateElement();
        if (compatibleShadyCSSVersion) {
            window.ShadyCSS.prepareTemplateDom(element, scopeName);
        }
        template = new Template(result, element);
        templateCache.keyString.set(key, template);
    }
    templateCache.stringsArray.set(result.strings, template);
    return template;
};
const TEMPLATE_TYPES = ['html', 'svg'];
/**
 * Removes all style elements from Templates for the given scopeName.
 */
const removeStylesFromLitTemplates = (scopeName) => {
    TEMPLATE_TYPES.forEach((type) => {
        const templates = templateCaches.get(getTemplateCacheKey(type, scopeName));
        if (templates !== undefined) {
            templates.keyString.forEach((template) => {
                const { element: { content } } = template;
                // IE 11 doesn't support the iterable param Set constructor
                const styles = new Set();
                Array.from(content.querySelectorAll('style')).forEach((s) => {
                    styles.add(s);
                });
                removeNodesFromTemplate(template, styles);
            });
        }
    });
};
const shadyRenderSet = new Set();
/**
 * For the given scope name, ensures that ShadyCSS style scoping is performed.
 * This is done just once per scope name so the fragment and template cannot
 * be modified.
 * (1) extracts styles from the rendered fragment and hands them to ShadyCSS
 * to be scoped and appended to the document
 * (2) removes style elements from all lit-html Templates for this scope name.
 *
 * Note, <style> elements can only be placed into templates for the
 * initial rendering of the scope. If <style> elements are included in templates
 * dynamically rendered to the scope (after the first scope render), they will
 * not be scoped and the <style> will be left in the template and rendered
 * output.
 */
const prepareTemplateStyles = (scopeName, renderedDOM, template) => {
    shadyRenderSet.add(scopeName);
    // If `renderedDOM` is stamped from a Template, then we need to edit that
    // Template's underlying template element. Otherwise, we create one here
    // to give to ShadyCSS, which still requires one while scoping.
    const templateElement = !!template ? template.element : document.createElement('template');
    // Move styles out of rendered DOM and store.
    const styles = renderedDOM.querySelectorAll('style');
    const { length } = styles;
    // If there are no styles, skip unnecessary work
    if (length === 0) {
        // Ensure prepareTemplateStyles is called to support adding
        // styles via `prepareAdoptedCssText` since that requires that
        // `prepareTemplateStyles` is called.
        //
        // ShadyCSS will only update styles containing @apply in the template
        // given to `prepareTemplateStyles`. If no lit Template was given,
        // ShadyCSS will not be able to update uses of @apply in any relevant
        // template. However, this is not a problem because we only create the
        // template for the purpose of supporting `prepareAdoptedCssText`,
        // which doesn't support @apply at all.
        window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
        return;
    }
    const condensedStyle = document.createElement('style');
    // Collect styles into a single style. This helps us make sure ShadyCSS
    // manipulations will not prevent us from being able to fix up template
    // part indices.
    // NOTE: collecting styles is inefficient for browsers but ShadyCSS
    // currently does this anyway. When it does not, this should be changed.
    for (let i = 0; i < length; i++) {
        const style = styles[i];
        style.parentNode.removeChild(style);
        condensedStyle.textContent += style.textContent;
    }
    // Remove styles from nested templates in this scope.
    removeStylesFromLitTemplates(scopeName);
    // And then put the condensed style into the "root" template passed in as
    // `template`.
    const content = templateElement.content;
    if (!!template) {
        insertNodeIntoTemplate(template, condensedStyle, content.firstChild);
    }
    else {
        content.insertBefore(condensedStyle, content.firstChild);
    }
    // Note, it's important that ShadyCSS gets the template that `lit-html`
    // will actually render so that it can update the style inside when
    // needed (e.g. @apply native Shadow DOM case).
    window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
    const style = content.querySelector('style');
    if (window.ShadyCSS.nativeShadow && style !== null) {
        // When in native Shadow DOM, ensure the style created by ShadyCSS is
        // included in initially rendered output (`renderedDOM`).
        renderedDOM.insertBefore(style.cloneNode(true), renderedDOM.firstChild);
    }
    else if (!!template) {
        // When no style is left in the template, parts will be broken as a
        // result. To fix this, we put back the style node ShadyCSS removed
        // and then tell lit to remove that node from the template.
        // There can be no style in the template in 2 cases (1) when Shady DOM
        // is in use, ShadyCSS removes all styles, (2) when native Shadow DOM
        // is in use ShadyCSS removes the style if it contains no content.
        // NOTE, ShadyCSS creates its own style so we can safely add/remove
        // `condensedStyle` here.
        content.insertBefore(condensedStyle, content.firstChild);
        const removes = new Set();
        removes.add(condensedStyle);
        removeNodesFromTemplate(template, removes);
    }
};
/**
 * Extension to the standard `render` method which supports rendering
 * to ShadowRoots when the ShadyDOM (https://github.com/webcomponents/shadydom)
 * and ShadyCSS (https://github.com/webcomponents/shadycss) polyfills are used
 * or when the webcomponentsjs
 * (https://github.com/webcomponents/webcomponentsjs) polyfill is used.
 *
 * Adds a `scopeName` option which is used to scope element DOM and stylesheets
 * when native ShadowDOM is unavailable. The `scopeName` will be added to
 * the class attribute of all rendered DOM. In addition, any style elements will
 * be automatically re-written with this `scopeName` selector and moved out
 * of the rendered DOM and into the document `<head>`.
 *
 * It is common to use this render method in conjunction with a custom element
 * which renders a shadowRoot. When this is done, typically the element's
 * `localName` should be used as the `scopeName`.
 *
 * In addition to DOM scoping, ShadyCSS also supports a basic shim for css
 * custom properties (needed only on older browsers like IE11) and a shim for
 * a deprecated feature called `@apply` that supports applying a set of css
 * custom properties to a given location.
 *
 * Usage considerations:
 *
 * * Part values in `<style>` elements are only applied the first time a given
 * `scopeName` renders. Subsequent changes to parts in style elements will have
 * no effect. Because of this, parts in style elements should only be used for
 * values that will never change, for example parts that set scope-wide theme
 * values or parts which render shared style elements.
 *
 * * Note, due to a limitation of the ShadyDOM polyfill, rendering in a
 * custom element's `constructor` is not supported. Instead rendering should
 * either done asynchronously, for example at microtask timing (for example
 * `Promise.resolve()`), or be deferred until the first time the element's
 * `connectedCallback` runs.
 *
 * Usage considerations when using shimmed custom properties or `@apply`:
 *
 * * Whenever any dynamic changes are made which affect
 * css custom properties, `ShadyCSS.styleElement(element)` must be called
 * to update the element. There are two cases when this is needed:
 * (1) the element is connected to a new parent, (2) a class is added to the
 * element that causes it to match different custom properties.
 * To address the first case when rendering a custom element, `styleElement`
 * should be called in the element's `connectedCallback`.
 *
 * * Shimmed custom properties may only be defined either for an entire
 * shadowRoot (for example, in a `:host` rule) or via a rule that directly
 * matches an element with a shadowRoot. In other words, instead of flowing from
 * parent to child as do native css custom properties, shimmed custom properties
 * flow only from shadowRoots to nested shadowRoots.
 *
 * * When using `@apply` mixing css shorthand property names with
 * non-shorthand names (for example `border` and `border-width`) is not
 * supported.
 */
const render$1 = (result, container, options) => {
    if (!options || typeof options !== 'object' || !options.scopeName) {
        throw new Error('The `scopeName` option is required.');
    }
    const scopeName = options.scopeName;
    const hasRendered = parts.has(container);
    const needsScoping = compatibleShadyCSSVersion &&
        container.nodeType === 11 /* Node.DOCUMENT_FRAGMENT_NODE */ &&
        !!container.host;
    // Handle first render to a scope specially...
    const firstScopeRender = needsScoping && !shadyRenderSet.has(scopeName);
    // On first scope render, render into a fragment; this cannot be a single
    // fragment that is reused since nested renders can occur synchronously.
    const renderContainer = firstScopeRender ? document.createDocumentFragment() : container;
    render(result, renderContainer, Object.assign({ templateFactory: shadyTemplateFactory(scopeName) }, options));
    // When performing first scope render,
    // (1) We've rendered into a fragment so that there's a chance to
    // `prepareTemplateStyles` before sub-elements hit the DOM
    // (which might cause them to render based on a common pattern of
    // rendering in a custom element's `connectedCallback`);
    // (2) Scope the template with ShadyCSS one time only for this scope.
    // (3) Render the fragment into the container and make sure the
    // container knows its `part` is the one we just rendered. This ensures
    // DOM will be re-used on subsequent renders.
    if (firstScopeRender) {
        const part = parts.get(renderContainer);
        parts.delete(renderContainer);
        // ShadyCSS might have style sheets (e.g. from `prepareAdoptedCssText`)
        // that should apply to `renderContainer` even if the rendered value is
        // not a TemplateInstance. However, it will only insert scoped styles
        // into the document if `prepareTemplateStyles` has already been called
        // for the given scope name.
        const template = part.value instanceof TemplateInstance ?
            part.value.template :
            undefined;
        prepareTemplateStyles(scopeName, renderContainer, template);
        removeNodes(container, container.firstChild);
        container.appendChild(renderContainer);
        parts.set(container, part);
    }
    // After elements have hit the DOM, update styling if this is the
    // initial render to this container.
    // This is needed whenever dynamic changes are made so it would be
    // safest to do every render; however, this would regress performance
    // so we leave it up to the user to call `ShadyCSS.styleElement`
    // for dynamic changes.
    if (!hasRendered && needsScoping) {
        window.ShadyCSS.styleElement(container.host);
    }
};
//# sourceMappingURL=shady-render.js.map

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var _a;
/**
 * Use this module if you want to create your own base class extending
 * [[UpdatingElement]].
 * @packageDocumentation
 */
/*
 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
 * replaced at compile time by the munged name for object[property]. We cannot
 * alias this function, so we have to use a small shim that has the same
 * behavior when not compiling.
 */
window.JSCompiler_renameProperty =
    (prop, _obj) => prop;
const defaultConverter = {
    toAttribute(value, type) {
        switch (type) {
            case Boolean:
                return value ? '' : null;
            case Object:
            case Array:
                // if the value is `null` or `undefined` pass this through
                // to allow removing/no change behavior.
                return value == null ? value : JSON.stringify(value);
        }
        return value;
    },
    fromAttribute(value, type) {
        switch (type) {
            case Boolean:
                return value !== null;
            case Number:
                return value === null ? null : Number(value);
            case Object:
            case Array:
                return JSON.parse(value);
        }
        return value;
    }
};
/**
 * Change function that returns true if `value` is different from `oldValue`.
 * This method is used as the default for a property's `hasChanged` function.
 */
const notEqual = (value, old) => {
    // This ensures (old==NaN, value==NaN) always returns false
    return old !== value && (old === old || value === value);
};
const defaultPropertyDeclaration = {
    attribute: true,
    type: String,
    converter: defaultConverter,
    reflect: false,
    hasChanged: notEqual
};
const STATE_HAS_UPDATED = 1;
const STATE_UPDATE_REQUESTED = 1 << 2;
const STATE_IS_REFLECTING_TO_ATTRIBUTE = 1 << 3;
const STATE_IS_REFLECTING_TO_PROPERTY = 1 << 4;
/**
 * The Closure JS Compiler doesn't currently have good support for static
 * property semantics where "this" is dynamic (e.g.
 * https://github.com/google/closure-compiler/issues/3177 and others) so we use
 * this hack to bypass any rewriting by the compiler.
 */
const finalized = 'finalized';
/**
 * Base element class which manages element properties and attributes. When
 * properties change, the `update` method is asynchronously called. This method
 * should be supplied by subclassers to render updates as desired.
 * @noInheritDoc
 */
class UpdatingElement extends HTMLElement {
    constructor() {
        super();
        this.initialize();
    }
    /**
     * Returns a list of attributes corresponding to the registered properties.
     * @nocollapse
     */
    static get observedAttributes() {
        // note: piggy backing on this to ensure we're finalized.
        this.finalize();
        const attributes = [];
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        this._classProperties.forEach((v, p) => {
            const attr = this._attributeNameForProperty(p, v);
            if (attr !== undefined) {
                this._attributeToPropertyMap.set(attr, p);
                attributes.push(attr);
            }
        });
        return attributes;
    }
    /**
     * Ensures the private `_classProperties` property metadata is created.
     * In addition to `finalize` this is also called in `createProperty` to
     * ensure the `@property` decorator can add property metadata.
     */
    /** @nocollapse */
    static _ensureClassProperties() {
        // ensure private storage for property declarations.
        if (!this.hasOwnProperty(JSCompiler_renameProperty('_classProperties', this))) {
            this._classProperties = new Map();
            // NOTE: Workaround IE11 not supporting Map constructor argument.
            const superProperties = Object.getPrototypeOf(this)._classProperties;
            if (superProperties !== undefined) {
                superProperties.forEach((v, k) => this._classProperties.set(k, v));
            }
        }
    }
    /**
     * Creates a property accessor on the element prototype if one does not exist
     * and stores a PropertyDeclaration for the property with the given options.
     * The property setter calls the property's `hasChanged` property option
     * or uses a strict identity check to determine whether or not to request
     * an update.
     *
     * This method may be overridden to customize properties; however,
     * when doing so, it's important to call `super.createProperty` to ensure
     * the property is setup correctly. This method calls
     * `getPropertyDescriptor` internally to get a descriptor to install.
     * To customize what properties do when they are get or set, override
     * `getPropertyDescriptor`. To customize the options for a property,
     * implement `createProperty` like this:
     *
     * static createProperty(name, options) {
     *   options = Object.assign(options, {myOption: true});
     *   super.createProperty(name, options);
     * }
     *
     * @nocollapse
     */
    static createProperty(name, options = defaultPropertyDeclaration) {
        // Note, since this can be called by the `@property` decorator which
        // is called before `finalize`, we ensure storage exists for property
        // metadata.
        this._ensureClassProperties();
        this._classProperties.set(name, options);
        // Do not generate an accessor if the prototype already has one, since
        // it would be lost otherwise and that would never be the user's intention;
        // Instead, we expect users to call `requestUpdate` themselves from
        // user-defined accessors. Note that if the super has an accessor we will
        // still overwrite it
        if (options.noAccessor || this.prototype.hasOwnProperty(name)) {
            return;
        }
        const key = typeof name === 'symbol' ? Symbol() : `__${name}`;
        const descriptor = this.getPropertyDescriptor(name, key, options);
        if (descriptor !== undefined) {
            Object.defineProperty(this.prototype, name, descriptor);
        }
    }
    /**
     * Returns a property descriptor to be defined on the given named property.
     * If no descriptor is returned, the property will not become an accessor.
     * For example,
     *
     *   class MyElement extends LitElement {
     *     static getPropertyDescriptor(name, key, options) {
     *       const defaultDescriptor =
     *           super.getPropertyDescriptor(name, key, options);
     *       const setter = defaultDescriptor.set;
     *       return {
     *         get: defaultDescriptor.get,
     *         set(value) {
     *           setter.call(this, value);
     *           // custom action.
     *         },
     *         configurable: true,
     *         enumerable: true
     *       }
     *     }
     *   }
     *
     * @nocollapse
     */
    static getPropertyDescriptor(name, key, options) {
        return {
            // tslint:disable-next-line:no-any no symbol in index
            get() {
                return this[key];
            },
            set(value) {
                const oldValue = this[name];
                this[key] = value;
                this
                    .requestUpdateInternal(name, oldValue, options);
            },
            configurable: true,
            enumerable: true
        };
    }
    /**
     * Returns the property options associated with the given property.
     * These options are defined with a PropertyDeclaration via the `properties`
     * object or the `@property` decorator and are registered in
     * `createProperty(...)`.
     *
     * Note, this method should be considered "final" and not overridden. To
     * customize the options for a given property, override `createProperty`.
     *
     * @nocollapse
     * @final
     */
    static getPropertyOptions(name) {
        return this._classProperties && this._classProperties.get(name) ||
            defaultPropertyDeclaration;
    }
    /**
     * Creates property accessors for registered properties and ensures
     * any superclasses are also finalized.
     * @nocollapse
     */
    static finalize() {
        // finalize any superclasses
        const superCtor = Object.getPrototypeOf(this);
        if (!superCtor.hasOwnProperty(finalized)) {
            superCtor.finalize();
        }
        this[finalized] = true;
        this._ensureClassProperties();
        // initialize Map populated in observedAttributes
        this._attributeToPropertyMap = new Map();
        // make any properties
        // Note, only process "own" properties since this element will inherit
        // any properties defined on the superClass, and finalization ensures
        // the entire prototype chain is finalized.
        if (this.hasOwnProperty(JSCompiler_renameProperty('properties', this))) {
            const props = this.properties;
            // support symbols in properties (IE11 does not support this)
            const propKeys = [
                ...Object.getOwnPropertyNames(props),
                ...(typeof Object.getOwnPropertySymbols === 'function') ?
                    Object.getOwnPropertySymbols(props) :
                    []
            ];
            // This for/of is ok because propKeys is an array
            for (const p of propKeys) {
                // note, use of `any` is due to TypeSript lack of support for symbol in
                // index types
                // tslint:disable-next-line:no-any no symbol in index
                this.createProperty(p, props[p]);
            }
        }
    }
    /**
     * Returns the property name for the given attribute `name`.
     * @nocollapse
     */
    static _attributeNameForProperty(name, options) {
        const attribute = options.attribute;
        return attribute === false ?
            undefined :
            (typeof attribute === 'string' ?
                attribute :
                (typeof name === 'string' ? name.toLowerCase() : undefined));
    }
    /**
     * Returns true if a property should request an update.
     * Called when a property value is set and uses the `hasChanged`
     * option for the property if present or a strict identity check.
     * @nocollapse
     */
    static _valueHasChanged(value, old, hasChanged = notEqual) {
        return hasChanged(value, old);
    }
    /**
     * Returns the property value for the given attribute value.
     * Called via the `attributeChangedCallback` and uses the property's
     * `converter` or `converter.fromAttribute` property option.
     * @nocollapse
     */
    static _propertyValueFromAttribute(value, options) {
        const type = options.type;
        const converter = options.converter || defaultConverter;
        const fromAttribute = (typeof converter === 'function' ? converter : converter.fromAttribute);
        return fromAttribute ? fromAttribute(value, type) : value;
    }
    /**
     * Returns the attribute value for the given property value. If this
     * returns undefined, the property will *not* be reflected to an attribute.
     * If this returns null, the attribute will be removed, otherwise the
     * attribute will be set to the value.
     * This uses the property's `reflect` and `type.toAttribute` property options.
     * @nocollapse
     */
    static _propertyValueToAttribute(value, options) {
        if (options.reflect === undefined) {
            return;
        }
        const type = options.type;
        const converter = options.converter;
        const toAttribute = converter && converter.toAttribute ||
            defaultConverter.toAttribute;
        return toAttribute(value, type);
    }
    /**
     * Performs element initialization. By default captures any pre-set values for
     * registered properties.
     */
    initialize() {
        this._updateState = 0;
        this._updatePromise =
            new Promise((res) => this._enableUpdatingResolver = res);
        this._changedProperties = new Map();
        this._saveInstanceProperties();
        // ensures first update will be caught by an early access of
        // `updateComplete`
        this.requestUpdateInternal();
    }
    /**
     * Fixes any properties set on the instance before upgrade time.
     * Otherwise these would shadow the accessor and break these properties.
     * The properties are stored in a Map which is played back after the
     * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
     * (<=41), properties created for native platform properties like (`id` or
     * `name`) may not have default values set in the element constructor. On
     * these browsers native properties appear on instances and therefore their
     * default value will overwrite any element default (e.g. if the element sets
     * this.id = 'id' in the constructor, the 'id' will become '' since this is
     * the native platform default).
     */
    _saveInstanceProperties() {
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        this.constructor
            ._classProperties.forEach((_v, p) => {
            if (this.hasOwnProperty(p)) {
                const value = this[p];
                delete this[p];
                if (!this._instanceProperties) {
                    this._instanceProperties = new Map();
                }
                this._instanceProperties.set(p, value);
            }
        });
    }
    /**
     * Applies previously saved instance properties.
     */
    _applyInstanceProperties() {
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        // tslint:disable-next-line:no-any
        this._instanceProperties.forEach((v, p) => this[p] = v);
        this._instanceProperties = undefined;
    }
    connectedCallback() {
        // Ensure first connection completes an update. Updates cannot complete
        // before connection.
        this.enableUpdating();
    }
    enableUpdating() {
        if (this._enableUpdatingResolver !== undefined) {
            this._enableUpdatingResolver();
            this._enableUpdatingResolver = undefined;
        }
    }
    /**
     * Allows for `super.disconnectedCallback()` in extensions while
     * reserving the possibility of making non-breaking feature additions
     * when disconnecting at some point in the future.
     */
    disconnectedCallback() {
    }
    /**
     * Synchronizes property values when attributes change.
     */
    attributeChangedCallback(name, old, value) {
        if (old !== value) {
            this._attributeToProperty(name, value);
        }
    }
    _propertyToAttribute(name, value, options = defaultPropertyDeclaration) {
        const ctor = this.constructor;
        const attr = ctor._attributeNameForProperty(name, options);
        if (attr !== undefined) {
            const attrValue = ctor._propertyValueToAttribute(value, options);
            // an undefined value does not change the attribute.
            if (attrValue === undefined) {
                return;
            }
            // Track if the property is being reflected to avoid
            // setting the property again via `attributeChangedCallback`. Note:
            // 1. this takes advantage of the fact that the callback is synchronous.
            // 2. will behave incorrectly if multiple attributes are in the reaction
            // stack at time of calling. However, since we process attributes
            // in `update` this should not be possible (or an extreme corner case
            // that we'd like to discover).
            // mark state reflecting
            this._updateState = this._updateState | STATE_IS_REFLECTING_TO_ATTRIBUTE;
            if (attrValue == null) {
                this.removeAttribute(attr);
            }
            else {
                this.setAttribute(attr, attrValue);
            }
            // mark state not reflecting
            this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE;
        }
    }
    _attributeToProperty(name, value) {
        // Use tracking info to avoid deserializing attribute value if it was
        // just set from a property setter.
        if (this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE) {
            return;
        }
        const ctor = this.constructor;
        // Note, hint this as an `AttributeMap` so closure clearly understands
        // the type; it has issues with tracking types through statics
        // tslint:disable-next-line:no-unnecessary-type-assertion
        const propName = ctor._attributeToPropertyMap.get(name);
        if (propName !== undefined) {
            const options = ctor.getPropertyOptions(propName);
            // mark state reflecting
            this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY;
            this[propName] =
                // tslint:disable-next-line:no-any
                ctor._propertyValueFromAttribute(value, options);
            // mark state not reflecting
            this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY;
        }
    }
    /**
     * This protected version of `requestUpdate` does not access or return the
     * `updateComplete` promise. This promise can be overridden and is therefore
     * not free to access.
     */
    requestUpdateInternal(name, oldValue, options) {
        let shouldRequestUpdate = true;
        // If we have a property key, perform property update steps.
        if (name !== undefined) {
            const ctor = this.constructor;
            options = options || ctor.getPropertyOptions(name);
            if (ctor._valueHasChanged(this[name], oldValue, options.hasChanged)) {
                if (!this._changedProperties.has(name)) {
                    this._changedProperties.set(name, oldValue);
                }
                // Add to reflecting properties set.
                // Note, it's important that every change has a chance to add the
                // property to `_reflectingProperties`. This ensures setting
                // attribute + property reflects correctly.
                if (options.reflect === true &&
                    !(this._updateState & STATE_IS_REFLECTING_TO_PROPERTY)) {
                    if (this._reflectingProperties === undefined) {
                        this._reflectingProperties = new Map();
                    }
                    this._reflectingProperties.set(name, options);
                }
            }
            else {
                // Abort the request if the property should not be considered changed.
                shouldRequestUpdate = false;
            }
        }
        if (!this._hasRequestedUpdate && shouldRequestUpdate) {
            this._updatePromise = this._enqueueUpdate();
        }
    }
    /**
     * Requests an update which is processed asynchronously. This should
     * be called when an element should update based on some state not triggered
     * by setting a property. In this case, pass no arguments. It should also be
     * called when manually implementing a property setter. In this case, pass the
     * property `name` and `oldValue` to ensure that any configured property
     * options are honored. Returns the `updateComplete` Promise which is resolved
     * when the update completes.
     *
     * @param name {PropertyKey} (optional) name of requesting property
     * @param oldValue {any} (optional) old value of requesting property
     * @returns {Promise} A Promise that is resolved when the update completes.
     */
    requestUpdate(name, oldValue) {
        this.requestUpdateInternal(name, oldValue);
        return this.updateComplete;
    }
    /**
     * Sets up the element to asynchronously update.
     */
    async _enqueueUpdate() {
        this._updateState = this._updateState | STATE_UPDATE_REQUESTED;
        try {
            // Ensure any previous update has resolved before updating.
            // This `await` also ensures that property changes are batched.
            await this._updatePromise;
        }
        catch (e) {
            // Ignore any previous errors. We only care that the previous cycle is
            // done. Any error should have been handled in the previous update.
        }
        const result = this.performUpdate();
        // If `performUpdate` returns a Promise, we await it. This is done to
        // enable coordinating updates with a scheduler. Note, the result is
        // checked to avoid delaying an additional microtask unless we need to.
        if (result != null) {
            await result;
        }
        return !this._hasRequestedUpdate;
    }
    get _hasRequestedUpdate() {
        return (this._updateState & STATE_UPDATE_REQUESTED);
    }
    get hasUpdated() {
        return (this._updateState & STATE_HAS_UPDATED);
    }
    /**
     * Performs an element update. Note, if an exception is thrown during the
     * update, `firstUpdated` and `updated` will not be called.
     *
     * You can override this method to change the timing of updates. If this
     * method is overridden, `super.performUpdate()` must be called.
     *
     * For instance, to schedule updates to occur just before the next frame:
     *
     * ```
     * protected async performUpdate(): Promise<unknown> {
     *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
     *   super.performUpdate();
     * }
     * ```
     */
    performUpdate() {
        // Abort any update if one is not pending when this is called.
        // This can happen if `performUpdate` is called early to "flush"
        // the update.
        if (!this._hasRequestedUpdate) {
            return;
        }
        // Mixin instance properties once, if they exist.
        if (this._instanceProperties) {
            this._applyInstanceProperties();
        }
        let shouldUpdate = false;
        const changedProperties = this._changedProperties;
        try {
            shouldUpdate = this.shouldUpdate(changedProperties);
            if (shouldUpdate) {
                this.update(changedProperties);
            }
            else {
                this._markUpdated();
            }
        }
        catch (e) {
            // Prevent `firstUpdated` and `updated` from running when there's an
            // update exception.
            shouldUpdate = false;
            // Ensure element can accept additional updates after an exception.
            this._markUpdated();
            throw e;
        }
        if (shouldUpdate) {
            if (!(this._updateState & STATE_HAS_UPDATED)) {
                this._updateState = this._updateState | STATE_HAS_UPDATED;
                this.firstUpdated(changedProperties);
            }
            this.updated(changedProperties);
        }
    }
    _markUpdated() {
        this._changedProperties = new Map();
        this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;
    }
    /**
     * Returns a Promise that resolves when the element has completed updating.
     * The Promise value is a boolean that is `true` if the element completed the
     * update without triggering another update. The Promise result is `false` if
     * a property was set inside `updated()`. If the Promise is rejected, an
     * exception was thrown during the update.
     *
     * To await additional asynchronous work, override the `_getUpdateComplete`
     * method. For example, it is sometimes useful to await a rendered element
     * before fulfilling this Promise. To do this, first await
     * `super._getUpdateComplete()`, then any subsequent state.
     *
     * @returns {Promise} The Promise returns a boolean that indicates if the
     * update resolved without triggering another update.
     */
    get updateComplete() {
        return this._getUpdateComplete();
    }
    /**
     * Override point for the `updateComplete` promise.
     *
     * It is not safe to override the `updateComplete` getter directly due to a
     * limitation in TypeScript which means it is not possible to call a
     * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
     * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
     * This method should be overridden instead. For example:
     *
     *   class MyElement extends LitElement {
     *     async _getUpdateComplete() {
     *       await super._getUpdateComplete();
     *       await this._myChild.updateComplete;
     *     }
     *   }
     */
    _getUpdateComplete() {
        return this._updatePromise;
    }
    /**
     * Controls whether or not `update` should be called when the element requests
     * an update. By default, this method always returns `true`, but this can be
     * customized to control when to update.
     *
     * @param _changedProperties Map of changed properties with old values
     */
    shouldUpdate(_changedProperties) {
        return true;
    }
    /**
     * Updates the element. This method reflects property values to attributes.
     * It can be overridden to render and keep updated element DOM.
     * Setting properties inside this method will *not* trigger
     * another update.
     *
     * @param _changedProperties Map of changed properties with old values
     */
    update(_changedProperties) {
        if (this._reflectingProperties !== undefined &&
            this._reflectingProperties.size > 0) {
            // Use forEach so this works even if for/of loops are compiled to for
            // loops expecting arrays
            this._reflectingProperties.forEach((v, k) => this._propertyToAttribute(k, this[k], v));
            this._reflectingProperties = undefined;
        }
        this._markUpdated();
    }
    /**
     * Invoked whenever the element is updated. Implement to perform
     * post-updating tasks via DOM APIs, for example, focusing an element.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param _changedProperties Map of changed properties with old values
     */
    updated(_changedProperties) {
    }
    /**
     * Invoked when the element is first updated. Implement to perform one time
     * work on the element after update.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param _changedProperties Map of changed properties with old values
     */
    firstUpdated(_changedProperties) {
    }
}
_a = finalized;
/**
 * Marks class as having finished creating properties.
 */
UpdatingElement[_a] = true;
//# sourceMappingURL=updating-element.js.map

/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
/**
 * Whether the current browser supports `adoptedStyleSheets`.
 */
const supportsAdoptingStyleSheets = (window.ShadowRoot) &&
    (window.ShadyCSS === undefined || window.ShadyCSS.nativeShadow) &&
    ('adoptedStyleSheets' in Document.prototype) &&
    ('replace' in CSSStyleSheet.prototype);
const constructionToken = Symbol();
class CSSResult {
    constructor(cssText, safeToken) {
        if (safeToken !== constructionToken) {
            throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
        }
        this.cssText = cssText;
    }
    // Note, this is a getter so that it's lazy. In practice, this means
    // stylesheets are not created until the first element instance is made.
    get styleSheet() {
        if (this._styleSheet === undefined) {
            // Note, if `supportsAdoptingStyleSheets` is true then we assume
            // CSSStyleSheet is constructable.
            if (supportsAdoptingStyleSheets) {
                this._styleSheet = new CSSStyleSheet();
                this._styleSheet.replaceSync(this.cssText);
            }
            else {
                this._styleSheet = null;
            }
        }
        return this._styleSheet;
    }
    toString() {
        return this.cssText;
    }
}
/**
 * Wrap a value for interpolation in a [[`css`]] tagged template literal.
 *
 * This is unsafe because untrusted CSS text can be used to phone home
 * or exfiltrate data to an attacker controlled site. Take care to only use
 * this with trusted input.
 */
const unsafeCSS = (value) => {
    return new CSSResult(String(value), constructionToken);
};
const textFromCSSResult = (value) => {
    if (value instanceof CSSResult) {
        return value.cssText;
    }
    else if (typeof value === 'number') {
        return value;
    }
    else {
        throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`);
    }
};
/**
 * Template tag which which can be used with LitElement's [[LitElement.styles |
 * `styles`]] property to set element styles. For security reasons, only literal
 * string values may be used. To incorporate non-literal values [[`unsafeCSS`]]
 * may be used inside a template string part.
 */
const css = (strings, ...values) => {
    const cssText = values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1], strings[0]);
    return new CSSResult(cssText, constructionToken);
};
//# sourceMappingURL=css-tag.js.map

/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for LitElement usage.
// TODO(justinfagnani): inject version number at build time
(window['litElementVersions'] || (window['litElementVersions'] = []))
    .push('2.4.0');
/**
 * Sentinal value used to avoid calling lit-html's render function when
 * subclasses do not implement `render`
 */
const renderNotImplemented = {};
/**
 * Base element class that manages element properties and attributes, and
 * renders a lit-html template.
 *
 * To define a component, subclass `LitElement` and implement a
 * `render` method to provide the component's template. Define properties
 * using the [[`properties`]] property or the [[`property`]] decorator.
 */
class LitElement extends UpdatingElement {
    /**
     * Return the array of styles to apply to the element.
     * Override this method to integrate into a style management system.
     *
     * @nocollapse
     */
    static getStyles() {
        return this.styles;
    }
    /** @nocollapse */
    static _getUniqueStyles() {
        // Only gather styles once per class
        if (this.hasOwnProperty(JSCompiler_renameProperty('_styles', this))) {
            return;
        }
        // Take care not to call `this.getStyles()` multiple times since this
        // generates new CSSResults each time.
        // TODO(sorvell): Since we do not cache CSSResults by input, any
        // shared styles will generate new stylesheet objects, which is wasteful.
        // This should be addressed when a browser ships constructable
        // stylesheets.
        const userStyles = this.getStyles();
        if (Array.isArray(userStyles)) {
            // De-duplicate styles preserving the _last_ instance in the set.
            // This is a performance optimization to avoid duplicated styles that can
            // occur especially when composing via subclassing.
            // The last item is kept to try to preserve the cascade order with the
            // assumption that it's most important that last added styles override
            // previous styles.
            const addStyles = (styles, set) => styles.reduceRight((set, s) => 
            // Note: On IE set.add() does not return the set
            Array.isArray(s) ? addStyles(s, set) : (set.add(s), set), set);
            // Array.from does not work on Set in IE, otherwise return
            // Array.from(addStyles(userStyles, new Set<CSSResult>())).reverse()
            const set = addStyles(userStyles, new Set());
            const styles = [];
            set.forEach((v) => styles.unshift(v));
            this._styles = styles;
        }
        else {
            this._styles = userStyles === undefined ? [] : [userStyles];
        }
        // Ensure that there are no invalid CSSStyleSheet instances here. They are
        // invalid in two conditions.
        // (1) the sheet is non-constructible (`sheet` of a HTMLStyleElement), but
        //     this is impossible to check except via .replaceSync or use
        // (2) the ShadyCSS polyfill is enabled (:. supportsAdoptingStyleSheets is
        //     false)
        this._styles = this._styles.map((s) => {
            if (s instanceof CSSStyleSheet && !supportsAdoptingStyleSheets) {
                // Flatten the cssText from the passed constructible stylesheet (or
                // undetectable non-constructible stylesheet). The user might have
                // expected to update their stylesheets over time, but the alternative
                // is a crash.
                const cssText = Array.prototype.slice.call(s.cssRules)
                    .reduce((css, rule) => css + rule.cssText, '');
                return unsafeCSS(cssText);
            }
            return s;
        });
    }
    /**
     * Performs element initialization. By default this calls
     * [[`createRenderRoot`]] to create the element [[`renderRoot`]] node and
     * captures any pre-set values for registered properties.
     */
    initialize() {
        super.initialize();
        this.constructor._getUniqueStyles();
        this.renderRoot = this.createRenderRoot();
        // Note, if renderRoot is not a shadowRoot, styles would/could apply to the
        // element's getRootNode(). While this could be done, we're choosing not to
        // support this now since it would require different logic around de-duping.
        if (window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot) {
            this.adoptStyles();
        }
    }
    /**
     * Returns the node into which the element should render and by default
     * creates and returns an open shadowRoot. Implement to customize where the
     * element's DOM is rendered. For example, to render into the element's
     * childNodes, return `this`.
     * @returns {Element|DocumentFragment} Returns a node into which to render.
     */
    createRenderRoot() {
        return this.attachShadow({ mode: 'open' });
    }
    /**
     * Applies styling to the element shadowRoot using the [[`styles`]]
     * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where
     * available and will fallback otherwise. When Shadow DOM is polyfilled,
     * ShadyCSS scopes styles and adds them to the document. When Shadow DOM
     * is available but `adoptedStyleSheets` is not, styles are appended to the
     * end of the `shadowRoot` to [mimic spec
     * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
     */
    adoptStyles() {
        const styles = this.constructor._styles;
        if (styles.length === 0) {
            return;
        }
        // There are three separate cases here based on Shadow DOM support.
        // (1) shadowRoot polyfilled: use ShadyCSS
        // (2) shadowRoot.adoptedStyleSheets available: use it
        // (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after
        // rendering
        if (window.ShadyCSS !== undefined && !window.ShadyCSS.nativeShadow) {
            window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map((s) => s.cssText), this.localName);
        }
        else if (supportsAdoptingStyleSheets) {
            this.renderRoot.adoptedStyleSheets =
                styles.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
        }
        else {
            // This must be done after rendering so the actual style insertion is done
            // in `update`.
            this._needsShimAdoptedStyleSheets = true;
        }
    }
    connectedCallback() {
        super.connectedCallback();
        // Note, first update/render handles styleElement so we only call this if
        // connected after first update.
        if (this.hasUpdated && window.ShadyCSS !== undefined) {
            window.ShadyCSS.styleElement(this);
        }
    }
    /**
     * Updates the element. This method reflects property values to attributes
     * and calls `render` to render DOM via lit-html. Setting properties inside
     * this method will *not* trigger another update.
     * @param _changedProperties Map of changed properties with old values
     */
    update(changedProperties) {
        // Setting properties in `render` should not trigger an update. Since
        // updates are allowed after super.update, it's important to call `render`
        // before that.
        const templateResult = this.render();
        super.update(changedProperties);
        // If render is not implemented by the component, don't call lit-html render
        if (templateResult !== renderNotImplemented) {
            this.constructor
                .render(templateResult, this.renderRoot, { scopeName: this.localName, eventContext: this });
        }
        // When native Shadow DOM is used but adoptedStyles are not supported,
        // insert styling after rendering to ensure adoptedStyles have highest
        // priority.
        if (this._needsShimAdoptedStyleSheets) {
            this._needsShimAdoptedStyleSheets = false;
            this.constructor._styles.forEach((s) => {
                const style = document.createElement('style');
                style.textContent = s.cssText;
                this.renderRoot.appendChild(style);
            });
        }
    }
    /**
     * Invoked on each update to perform rendering tasks. This method may return
     * any value renderable by lit-html's `NodePart` - typically a
     * `TemplateResult`. Setting properties inside this method will *not* trigger
     * the element to update.
     */
    render() {
        return renderNotImplemented;
    }
}
/**
 * Ensure this class is marked as `finalized` as an optimization ensuring
 * it will not needlessly try to `finalize`.
 *
 * Note this property name is a string to prevent breaking Closure JS Compiler
 * optimizations. See updating-element.ts for more information.
 */
LitElement['finalized'] = true;
/**
 * Reference to the underlying library method used to render the element's
 * DOM. By default, points to the `render` method from lit-html's shady-render
 * module.
 *
 * **Most users will never need to touch this property.**
 *
 * This  property should not be confused with the `render` instance method,
 * which should be overridden to define a template for the element.
 *
 * Advanced users creating a new base class based on LitElement can override
 * this property to point to a custom render method with a signature that
 * matches [shady-render's `render`
 * method](https://lit-html.polymer-project.org/api/modules/shady_render.html#render).
 *
 * @nocollapse
 */
LitElement.render = render$1;
//# sourceMappingURL=lit-element.js.map

function toArray(objectOrArray) {
  objectOrArray = objectOrArray || [];
  return Array.isArray(objectOrArray) ? objectOrArray : [objectOrArray];
}

function log(msg) {
  return `[Vaadin.Router] ${msg}`;
}

function logValue(value) {
  if (typeof value !== 'object') {
    return String(value);
  }

  const stringType = Object.prototype.toString.call(value).match(/ (.*)\]$/)[1];
  if (stringType === 'Object' || stringType === 'Array') {
    return `${stringType} ${JSON.stringify(value)}`;
  } else {
    return stringType;
  }
}

const MODULE = 'module';
const NOMODULE = 'nomodule';
const bundleKeys = [MODULE, NOMODULE];

function ensureBundle(src) {
  if (!src.match(/.+\.[m]?js$/)) {
    throw new Error(
      log(`Unsupported type for bundle "${src}": .js or .mjs expected.`)
    );
  }
}

function ensureRoute(route) {
  if (!route || !isString(route.path)) {
    throw new Error(
      log(`Expected route config to be an object with a "path" string property, or an array of such objects`)
    );
  }

  const bundle = route.bundle;

  const stringKeys = ['component', 'redirect', 'bundle'];
  if (
    !isFunction(route.action) &&
    !Array.isArray(route.children) &&
    !isFunction(route.children) &&
    !isObject(bundle) &&
    !stringKeys.some(key => isString(route[key]))
  ) {
    throw new Error(
      log(
        `Expected route config "${route.path}" to include either "${stringKeys.join('", "')}" ` +
        `or "action" function but none found.`
      )
    );
  }

  if (bundle) {
    if (isString(bundle)) {
      ensureBundle(bundle);
    } else if (!bundleKeys.some(key => key in bundle)) {
      throw new Error(
        log('Expected route bundle to include either "' + NOMODULE + '" or "' + MODULE + '" keys, or both')
      );
    } else {
      bundleKeys.forEach(key => key in bundle && ensureBundle(bundle[key]));
    }
  }

  if (route.redirect) {
    ['bundle', 'component'].forEach(overriddenProp => {
      if (overriddenProp in route) {
        console.warn(
          log(
            `Route config "${route.path}" has both "redirect" and "${overriddenProp}" properties, ` +
            `and "redirect" will always override the latter. Did you mean to only use "${overriddenProp}"?`
          )
        );
      }
    });
  }
}

function ensureRoutes(routes) {
  toArray(routes).forEach(route => ensureRoute(route));
}

function loadScript(src, key) {
  let script = document.head.querySelector('script[src="' + src + '"][async]');
  if (!script) {
    script = document.createElement('script');
    script.setAttribute('src', src);
    if (key === MODULE) {
      script.setAttribute('type', MODULE);
    } else if (key === NOMODULE) {
      script.setAttribute(NOMODULE, '');
    }
    script.async = true;
  }
  return new Promise((resolve, reject) => {
    script.onreadystatechange = script.onload = e => {
      script.__dynamicImportLoaded = true;
      resolve(e);
    };
    script.onerror = e => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      reject(e);
    };
    if (script.parentNode === null) {
      document.head.appendChild(script);
    } else if (script.__dynamicImportLoaded) {
      resolve();
    }
  });
}

function loadBundle(bundle) {
  if (isString(bundle)) {
    return loadScript(bundle);
  } else {
    return Promise.race(
      bundleKeys
        .filter(key => key in bundle)
        .map(key => loadScript(bundle[key], key))
    );
  }
}

function fireRouterEvent(type, detail) {
  return !window.dispatchEvent(new CustomEvent(
    `vaadin-router-${type}`,
    {cancelable: type === 'go', detail}
  ));
}

function isObject(o) {
  // guard against null passing the typeof check
  return typeof o === 'object' && !!o;
}

function isFunction(f) {
  return typeof f === 'function';
}

function isString(s) {
  return typeof s === 'string';
}

function getNotFoundError(context) {
  const error = new Error(log(`Page not found (${context.pathname})`));
  error.context = context;
  error.code = 404;
  return error;
}

const notFoundResult = new (class NotFoundResult {})();

/* istanbul ignore next: coverage is calculated in Chrome, this code is for IE */
function getAnchorOrigin(anchor) {
  // IE11: on HTTP and HTTPS the default port is not included into
  // window.location.origin, so won't include it here either.
  const port = anchor.port;
  const protocol = anchor.protocol;
  const defaultHttp = protocol === 'http:' && port === '80';
  const defaultHttps = protocol === 'https:' && port === '443';
  const host = (defaultHttp || defaultHttps)
    ? anchor.hostname // does not include the port number (e.g. www.example.org)
    : anchor.host; // does include the port number (e.g. www.example.org:80)
  return `${protocol}//${host}`;
}

// The list of checks is not complete:
//  - SVG support is missing
//  - the 'rel' attribute is not considered
function vaadinRouterGlobalClickHandler(event) {
  // ignore the click if the default action is prevented
  if (event.defaultPrevented) {
    return;
  }

  // ignore the click if not with the primary mouse button
  if (event.button !== 0) {
    return;
  }

  // ignore the click if a modifier key is pressed
  if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) {
    return;
  }

  // find the <a> element that the click is at (or within)
  let anchor = event.target;
  const path = event.composedPath
    ? event.composedPath()
    : (event.path || []);

  // FIXME(web-padawan): `Symbol.iterator` used by webcomponentsjs is broken for arrays
  // example to check: `for...of` loop here throws the "Not yet implemented" error
  for (let i = 0; i < path.length; i++) {
    const target = path[i];
    if (target.nodeName && target.nodeName.toLowerCase() === 'a') {
      anchor = target;
      break;
    }
  }

  while (anchor && anchor.nodeName.toLowerCase() !== 'a') {
    anchor = anchor.parentNode;
  }

  // ignore the click if not at an <a> element
  if (!anchor || anchor.nodeName.toLowerCase() !== 'a') {
    return;
  }

  // ignore the click if the <a> element has a non-default target
  if (anchor.target && anchor.target.toLowerCase() !== '_self') {
    return;
  }

  // ignore the click if the <a> element has the 'download' attribute
  if (anchor.hasAttribute('download')) {
    return;
  }

  // ignore the click if the <a> element has the 'router-ignore' attribute
  if (anchor.hasAttribute('router-ignore')) {
    return;
  }

  // ignore the click if the target URL is a fragment on the current page
  if (anchor.pathname === window.location.pathname && anchor.hash !== '') {
    return;
  }

  // ignore the click if the target is external to the app
  // In IE11 HTMLAnchorElement does not have the `origin` property
  const origin = anchor.origin || getAnchorOrigin(anchor);
  if (origin !== window.location.origin) {
    return;
  }

  // if none of the above, convert the click into a navigation event
  const {pathname, search, hash} = anchor;
  if (fireRouterEvent('go', {pathname, search, hash})) {
    event.preventDefault();
  }
}

/**
 * A navigation trigger for Vaadin Router that translated clicks on `<a>` links
 * into Vaadin Router navigation events.
 *
 * Only regular clicks on in-app links are translated (primary mouse button, no
 * modifier keys, the target href is within the app's URL space).
 *
 * @memberOf Router.NavigationTrigger
 * @type {NavigationTrigger}
 */
const CLICK = {
  activate() {
    window.document.addEventListener('click', vaadinRouterGlobalClickHandler);
  },

  inactivate() {
    window.document.removeEventListener('click', vaadinRouterGlobalClickHandler);
  }
};

// PopStateEvent constructor shim
const isIE = /Trident/.test(navigator.userAgent);

/* istanbul ignore next: coverage is calculated in Chrome, this code is for IE */
if (isIE && !isFunction(window.PopStateEvent)) {
  window.PopStateEvent = function(inType, params) {
    params = params || {};
    var e = document.createEvent('Event');
    e.initEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable));
    e.state = params.state || null;
    return e;
  };
  window.PopStateEvent.prototype = window.Event.prototype;
}

function vaadinRouterGlobalPopstateHandler(event) {
  if (event.state === 'vaadin-router-ignore') {
    return;
  }
  const {pathname, search, hash} = window.location;
  fireRouterEvent('go', {pathname, search, hash});
}

/**
 * A navigation trigger for Vaadin Router that translates popstate events into
 * Vaadin Router navigation events.
 *
 * @memberOf Router.NavigationTrigger
 * @type {NavigationTrigger}
 */
const POPSTATE = {
  activate() {
    window.addEventListener('popstate', vaadinRouterGlobalPopstateHandler);
  },

  inactivate() {
    window.removeEventListener('popstate', vaadinRouterGlobalPopstateHandler);
  }
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * Default configs.
 */
var DEFAULT_DELIMITER = '/';
var DEFAULT_DELIMITERS = './';

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // ":test(\\d+)?" => ["test", "\d+", undefined, "?"]
  // "(\\d+)"  => [undefined, undefined, "\d+", undefined]
  '(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = (options && options.delimiter) || DEFAULT_DELIMITER;
  var delimiters = (options && options.delimiters) || DEFAULT_DELIMITERS;
  var pathEscaped = false;
  var res;

  while ((res = PATH_REGEXP.exec(str)) !== null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      pathEscaped = true;
      continue
    }

    var prev = '';
    var next = str[index];
    var name = res[2];
    var capture = res[3];
    var group = res[4];
    var modifier = res[5];

    if (!pathEscaped && path.length) {
      var k = path.length - 1;

      if (delimiters.indexOf(path[k]) > -1) {
        prev = path[k];
        path = path.slice(0, k);
      }
    }

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
      pathEscaped = false;
    }

    var partial = prev !== '' && next !== undefined && next !== prev;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = prev || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prev,
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      pattern: pattern ? escapeGroup(pattern) : '[^' + escapeString(delimiter) + ']+?'
    });
  }

  // Push any remaining characters.
  if (path || index < str.length) {
    tokens.push(path + str.substr(index));
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (data, options) {
    var path = '';
    var encode = (options && options.encode) || encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;
        continue
      }

      var value = data ? data[token.name] : undefined;
      var segment;

      if (Array.isArray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but got array')
        }

        if (value.length === 0) {
          if (token.optional) continue

          throw new TypeError('Expected "' + token.name + '" to not be empty')
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j], token);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '"')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        segment = encode(String(value), token);

        if (!matches[i].test(segment)) {
          throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"')
        }

        path += token.prefix + segment;
        continue
      }

      if (token.optional) {
        // Prepend partial segment prefixes.
        if (token.partial) path += token.prefix;

        continue
      }

      throw new TypeError('Expected "' + token.name + '" to be ' + (token.repeat ? 'an array' : 'a string'))
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$/()])/g, '\\$1')
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options && options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {Array=}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  if (!keys) return path

  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        pattern: null
      });
    }
  }

  return path
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  return new RegExp('(?:' + parts.join('|') + ')', flags(options))
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}  tokens
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  options = options || {};

  var strict = options.strict;
  var start = options.start !== false;
  var end = options.end !== false;
  var delimiter = escapeString(options.delimiter || DEFAULT_DELIMITER);
  var delimiters = options.delimiters || DEFAULT_DELIMITERS;
  var endsWith = [].concat(options.endsWith || []).map(escapeString).concat('$').join('|');
  var route = start ? '^' : '';
  var isEndDelimited = tokens.length === 0;

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
      isEndDelimited = i === tokens.length - 1 && delimiters.indexOf(token[token.length - 1]) > -1;
    } else {
      var capture = token.repeat
        ? '(?:' + token.pattern + ')(?:' + escapeString(token.delimiter) + '(?:' + token.pattern + '))*'
        : token.pattern;

      if (keys) keys.push(token);

      if (token.optional) {
        if (token.partial) {
          route += escapeString(token.prefix) + '(' + capture + ')?';
        } else {
          route += '(?:' + escapeString(token.prefix) + '(' + capture + '))?';
        }
      } else {
        route += escapeString(token.prefix) + '(' + capture + ')';
      }
    }
  }

  if (end) {
    if (!strict) route += '(?:' + delimiter + ')?';

    route += endsWith === '$' ? '$' : '(?=' + endsWith + ')';
  } else {
    if (!strict) route += '(?:' + delimiter + '(?=' + endsWith + '))?';
    if (!isEndDelimited) route += '(?=' + delimiter + '|' + endsWith + ')';
  }

  return new RegExp(route, flags(options))
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {Array=}                keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys)
  }

  if (Array.isArray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), keys, options)
  }

  return stringToRegexp(/** @type {string} */ (path), keys, options)
}
pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/**
 * Universal Router (https://www.kriasoft.com/universal-router/)
 *
 * Copyright (c) 2015-present Kriasoft.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const {hasOwnProperty} = Object.prototype;
const cache = new Map();
// see https://github.com/pillarjs/path-to-regexp/issues/148
cache.set('|false', {
  keys: [],
  pattern: /(?:)/
});

function decodeParam(val) {
  try {
    return decodeURIComponent(val);
  } catch (err) {
    return val;
  }
}

function matchPath(routepath, path, exact, parentKeys, parentParams) {
  exact = !!exact;
  const cacheKey = `${routepath}|${exact}`;
  let regexp = cache.get(cacheKey);

  if (!regexp) {
    const keys = [];
    regexp = {
      keys,
      pattern: pathToRegexp_1(routepath, keys, {
        end: exact,
        strict: routepath === ''
      }),
    };
    cache.set(cacheKey, regexp);
  }

  const m = regexp.pattern.exec(path);
  if (!m) {
    return null;
  }

  const params = Object.assign({}, parentParams);

  for (let i = 1; i < m.length; i++) {
    const key = regexp.keys[i - 1];
    const prop = key.name;
    const value = m[i];
    if (value !== undefined || !hasOwnProperty.call(params, prop)) {
      if (key.repeat) {
        params[prop] = value ? value.split(key.delimiter).map(decodeParam) : [];
      } else {
        params[prop] = value ? decodeParam(value) : value;
      }
    }
  }

  return {
    path: m[0],
    keys: (parentKeys || []).concat(regexp.keys),
    params,
  };
}

/**
 * Universal Router (https://www.kriasoft.com/universal-router/)
 *
 * Copyright (c) 2015-present Kriasoft.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Traverses the routes tree and matches its nodes to the given pathname from
 * the root down to the leaves. Each match consumes a part of the pathname and
 * the matching process continues for as long as there is a matching child
 * route for the remaining part of the pathname.
 *
 * The returned value is a lazily evaluated iterator.
 *
 * The leading "/" in a route path matters only for the root of the routes
 * tree (or if all parent routes are ""). In all other cases a leading "/" in
 * a child route path has no significance.
 *
 * The trailing "/" in a _route path_ matters only for the leaves of the
 * routes tree. A leaf route with a trailing "/" matches only a pathname that
 * also has a trailing "/".
 *
 * The trailing "/" in a route path does not affect matching of child routes
 * in any way.
 *
 * The trailing "/" in a _pathname_ generally does not matter (except for
 * the case of leaf nodes described above).
 *
 * The "" and "/" routes have special treatment:
 *  1. as a single route
 *     the "" and "/" routes match only the "" and "/" pathnames respectively
 *  2. as a parent in the routes tree
 *     the "" route matches any pathname without consuming any part of it
 *     the "/" route matches any absolute pathname consuming its leading "/"
 *  3. as a leaf in the routes tree
 *     the "" and "/" routes match only if the entire pathname is consumed by
 *         the parent routes chain. In this case "" and "/" are equivalent.
 *  4. several directly nested "" or "/" routes
 *     - directly nested "" or "/" routes are 'squashed' (i.e. nesting two
 *       "/" routes does not require a double "/" in the pathname to match)
 *     - if there are only "" in the parent routes chain, no part of the
 *       pathname is consumed, and the leading "/" in the child routes' paths
 *       remains significant
 *
 * Side effect:
 *   - the routes tree { path: '' } matches only the '' pathname
 *   - the routes tree { path: '', children: [ { path: '' } ] } matches any
 *     pathname (for the tree root)
 *
 * Prefix matching can be enabled also by `children: true`.
 */
function matchRoute(route, pathname, ignoreLeadingSlash, parentKeys, parentParams) {
  let match;
  let childMatches;
  let childIndex = 0;
  let routepath = route.path || '';
  if (routepath.charAt(0) === '/') {
    if (ignoreLeadingSlash) {
      routepath = routepath.substr(1);
    }
    ignoreLeadingSlash = true;
  }

  return {
    next(routeToSkip) {
      if (route === routeToSkip) {
        return {done: true};
      }

      const children = route.__children = route.__children || route.children;

      if (!match) {
        match = matchPath(routepath, pathname, !children, parentKeys, parentParams);

        if (match) {
          return {
            done: false,
            value: {
              route,
              keys: match.keys,
              params: match.params,
              path: match.path
            },
          };
        }
      }

      if (match && children) {
        while (childIndex < children.length) {
          if (!childMatches) {
            const childRoute = children[childIndex];
            childRoute.parent = route;

            let matchedLength = match.path.length;
            if (matchedLength > 0 && pathname.charAt(matchedLength) === '/') {
              matchedLength += 1;
            }

            childMatches = matchRoute(
              childRoute,
              pathname.substr(matchedLength),
              ignoreLeadingSlash,
              match.keys,
              match.params
            );
          }

          const childMatch = childMatches.next(routeToSkip);
          if (!childMatch.done) {
            return {
              done: false,
              value: childMatch.value,
            };
          }

          childMatches = null;
          childIndex++;
        }
      }

      return {done: true};
    },
  };
}

/**
 * Universal Router (https://www.kriasoft.com/universal-router/)
 *
 * Copyright (c) 2015-present Kriasoft.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

function resolveRoute(context) {
  if (isFunction(context.route.action)) {
    return context.route.action(context);
  }
  return undefined;
}

/**
 * Universal Router (https://www.kriasoft.com/universal-router/)
 *
 * Copyright (c) 2015-present Kriasoft.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

function isChildRoute(parentRoute, childRoute) {
  let route = childRoute;
  while (route) {
    route = route.parent;
    if (route === parentRoute) {
      return true;
    }
  }
  return false;
}

function generateErrorMessage(currentContext) {
  let errorMessage = `Path '${currentContext.pathname}' is not properly resolved due to an error.`;
  const routePath = (currentContext.route || {}).path;
  if (routePath) {
    errorMessage += ` Resolution had failed on route: '${routePath}'`;
  }
  return errorMessage;
}

function updateChainForRoute(context, match) {
  const {route, path} = match;

  if (route && !route.__synthetic) {
    const item = {path, route};
    if (!context.chain) {
      context.chain = [];
    } else {
      // Discard old items
      if (route.parent) {
        let i = context.chain.length;
        while (i-- && context.chain[i].route && context.chain[i].route !== route.parent) {
          context.chain.pop();
        }
      }
    }
    context.chain.push(item);
  }
}

/**
 */
class Resolver {
  constructor(routes, options = {}) {
    if (Object(routes) !== routes) {
      throw new TypeError('Invalid routes');
    }

    this.baseUrl = options.baseUrl || '';
    this.errorHandler = options.errorHandler;
    this.resolveRoute = options.resolveRoute || resolveRoute;
    this.context = Object.assign({resolver: this}, options.context);
    this.root = Array.isArray(routes) ? {path: '', __children: routes, parent: null, __synthetic: true} : routes;
    this.root.parent = null;
  }

  /**
   * Returns the current list of routes (as a shallow copy). Adding / removing
   * routes to / from the returned array does not affect the routing config,
   * but modifying the route objects does.
   *
   * @return {!Array<!Router.Route>}
   */
  getRoutes() {
    return [...this.root.__children];
  }

  /**
   * Sets the routing config (replacing the existing one).
   *
   * @param {!Array<!Router.Route>|!Router.Route} routes a single route or an array of those
   *    (the array is shallow copied)
   */
  setRoutes(routes) {
    ensureRoutes(routes);
    const newRoutes = [...toArray(routes)];
    this.root.__children = newRoutes;
  }

  /**
   * Appends one or several routes to the routing config and returns the
   * effective routing config after the operation.
   *
   * @param {!Array<!Router.Route>|!Router.Route} routes a single route or an array of those
   *    (the array is shallow copied)
   * @return {!Array<!Router.Route>}
   * @protected
   */
  addRoutes(routes) {
    ensureRoutes(routes);
    this.root.__children.push(...toArray(routes));
    return this.getRoutes();
  }

  /**
   * Removes all existing routes from the routing config.
   */
  removeRoutes() {
    this.setRoutes([]);
  }

  /**
   * Asynchronously resolves the given pathname, i.e. finds all routes matching
   * the pathname and tries resolving them one after another in the order they
   * are listed in the routes config until the first non-null result.
   *
   * Returns a promise that is fulfilled with the return value of an object that consists of the first
   * route handler result that returns something other than `null` or `undefined` and context used to get this result.
   *
   * If no route handlers return a non-null result, or if no route matches the
   * given pathname the returned promise is rejected with a 'page not found'
   * `Error`.
   *
   * @param {!string|!{pathname: !string}} pathnameOrContext the pathname to
   *    resolve or a context object with a `pathname` property and other
   *    properties to pass to the route resolver functions.
   * @return {!Promise<any>}
   */
  resolve(pathnameOrContext) {
    const context = Object.assign(
      {},
      this.context,
      isString(pathnameOrContext) ? {pathname: pathnameOrContext} : pathnameOrContext
    );
    const match = matchRoute(
      this.root,
      this.__normalizePathname(context.pathname),
      this.baseUrl
    );
    const resolve = this.resolveRoute;
    let matches = null;
    let nextMatches = null;
    let currentContext = context;

    function next(resume, parent = matches.value.route, prevResult) {
      const routeToSkip = prevResult === null && matches.value.route;
      matches = nextMatches || match.next(routeToSkip);
      nextMatches = null;

      if (!resume) {
        if (matches.done || !isChildRoute(parent, matches.value.route)) {
          nextMatches = matches;
          return Promise.resolve(notFoundResult);
        }
      }

      if (matches.done) {
        return Promise.reject(getNotFoundError(context));
      }

      currentContext = Object.assign(
        currentContext
          ? {chain: (currentContext.chain ? currentContext.chain.slice(0) : [])}
          : {},
        context,
        matches.value
      );
      updateChainForRoute(currentContext, matches.value);

      return Promise.resolve(resolve(currentContext)).then(resolution => {
        if (resolution !== null && resolution !== undefined && resolution !== notFoundResult) {
          currentContext.result = resolution.result || resolution;
          return currentContext;
        }
        return next(resume, parent, resolution);
      });
    }

    context.next = next;

    return Promise.resolve()
      .then(() => next(true, this.root))
      .catch((error) => {
        const errorMessage = generateErrorMessage(currentContext);
        if (!error) {
          error = new Error(errorMessage);
        } else {
          console.warn(errorMessage);
        }
        error.context = error.context || currentContext;
        // DOMException has its own code which is read-only
        if (!(error instanceof DOMException)) {
          error.code = error.code || 500;
        }
        if (this.errorHandler) {
          currentContext.result = this.errorHandler(error);
          return currentContext;
        }
        throw error;
      });
  }

  /**
   * URL constructor polyfill hook. Creates and returns an URL instance.
   */
  static __createUrl(url, base) {
    return new URL(url, base);
  }

  /**
   * If the baseUrl property is set, transforms the baseUrl and returns the full
   * actual `base` string for using in the `new URL(path, base);` and for
   * prepernding the paths with. The returned base ends with a trailing slash.
   *
   * Otherwise, returns empty string.
   */
  get __effectiveBaseUrl() {
    return this.baseUrl
      ? this.constructor.__createUrl(
        this.baseUrl,
        document.baseURI || document.URL
      ).href.replace(/[^\/]*$/, '')
      : '';
  }

  /**
   * If the baseUrl is set, matches the pathname with the router’s baseUrl,
   * and returns the local pathname with the baseUrl stripped out.
   *
   * If the pathname does not match the baseUrl, returns undefined.
   *
   * If the `baseUrl` is not set, returns the unmodified pathname argument.
   */
  __normalizePathname(pathname) {
    if (!this.baseUrl) {
      // No base URL, no need to transform the pathname.
      return pathname;
    }

    const base = this.__effectiveBaseUrl;
    const normalizedUrl = this.constructor.__createUrl(pathname, base).href;
    if (normalizedUrl.slice(0, base.length) === base) {
      return normalizedUrl.slice(base.length);
    }
  }
}

Resolver.pathToRegexp = pathToRegexp_1;

/**
 * Universal Router (https://www.kriasoft.com/universal-router/)
 *
 * Copyright (c) 2015-present Kriasoft.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const {pathToRegexp: pathToRegexp$1} = Resolver;
const cache$1 = new Map();

function cacheRoutes(routesByName, route, routes) {
  const name = route.name || route.component;
  if (name) {
    if (routesByName.has(name)) {
      routesByName.get(name).push(route);
    } else {
      routesByName.set(name, [route]);
    }
  }

  if (Array.isArray(routes)) {
    for (let i = 0; i < routes.length; i++) {
      const childRoute = routes[i];
      childRoute.parent = route;
      cacheRoutes(routesByName, childRoute, childRoute.__children || childRoute.children);
    }
  }
}

function getRouteByName(routesByName, routeName) {
  const routes = routesByName.get(routeName);
  if (routes && routes.length > 1) {
    throw new Error(
      `Duplicate route with name "${routeName}".`
      + ` Try seting unique 'name' route properties.`
    );
  }
  return routes && routes[0];
}

function getRoutePath(route) {
  let path = route.path;
  path = Array.isArray(path) ? path[0] : path;
  return path !== undefined ? path : '';
}

function generateUrls(router, options = {}) {
  if (!(router instanceof Resolver)) {
    throw new TypeError('An instance of Resolver is expected');
  }

  const routesByName = new Map();

  return (routeName, params) => {
    let route = getRouteByName(routesByName, routeName);
    if (!route) {
      routesByName.clear(); // clear cache
      cacheRoutes(routesByName, router.root, router.root.__children);

      route = getRouteByName(routesByName, routeName);
      if (!route) {
        throw new Error(`Route "${routeName}" not found`);
      }
    }

    let regexp = cache$1.get(route.fullPath);
    if (!regexp) {
      let fullPath = getRoutePath(route);
      let rt = route.parent;
      while (rt) {
        const path = getRoutePath(rt);
        if (path) {
          fullPath = path.replace(/\/$/, '') + '/' + fullPath.replace(/^\//, '');
        }
        rt = rt.parent;
      }
      const tokens = pathToRegexp$1.parse(fullPath);
      const toPath = pathToRegexp$1.tokensToFunction(tokens);
      const keys = Object.create(null);
      for (let i = 0; i < tokens.length; i++) {
        if (!isString(tokens[i])) {
          keys[tokens[i].name] = true;
        }
      }
      regexp = {toPath, keys};
      cache$1.set(fullPath, regexp);
      route.fullPath = fullPath;
    }

    let url = regexp.toPath(params, options) || '/';

    if (options.stringifyQueryParams && params) {
      const queryParams = {};
      const keys = Object.keys(params);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (!regexp.keys[key]) {
          queryParams[key] = params[key];
        }
      }
      const query = options.stringifyQueryParams(queryParams);
      if (query) {
        url += query.charAt(0) === '?' ? query : `?${query}`;
      }
    }

    return url;
  };
}

/**
 * @typedef NavigationTrigger
 * @type {object}
 * @property {function()} activate
 * @property {function()} inactivate
 */

/** @type {Array<NavigationTrigger>} */
let triggers = [];

function setNavigationTriggers(newTriggers) {
  triggers.forEach(trigger => trigger.inactivate());

  newTriggers.forEach(trigger => trigger.activate());

  triggers = newTriggers;
}

const willAnimate = elem => {
  const name = getComputedStyle(elem).getPropertyValue('animation-name');
  return name && name !== 'none';
};

const waitForAnimation = (elem, cb) => {
  const listener = () => {
    elem.removeEventListener('animationend', listener);
    cb();
  };
  elem.addEventListener('animationend', listener);
};

function animate(elem, className) {
  elem.classList.add(className);

  return new Promise(resolve => {
    if (willAnimate(elem)) {
      const rect = elem.getBoundingClientRect();
      const size = `height: ${rect.bottom - rect.top}px; width: ${rect.right - rect.left}px`;
      elem.setAttribute('style', `position: absolute; ${size}`);
      waitForAnimation(elem, () => {
        elem.classList.remove(className);
        elem.removeAttribute('style');
        resolve();
      });
    } else {
      elem.classList.remove(className);
      resolve();
    }
  });
}

const MAX_REDIRECT_COUNT = 256;

function isResultNotEmpty(result) {
  return result !== null && result !== undefined;
}

function copyContextWithoutNext(context) {
  const copy = Object.assign({}, context);
  delete copy.next;
  return copy;
}

function createLocation({pathname = '', search = '', hash = '', chain = [], params = {}, redirectFrom, resolver}, route) {
  const routes = chain.map(item => item.route);
  return {
    baseUrl: resolver && resolver.baseUrl || '',
    pathname,
    search,
    hash,
    routes,
    route: route || routes.length && routes[routes.length - 1] || null,
    params,
    redirectFrom,
    getUrl: (userParams = {}) => getPathnameForRouter(
      Router.pathToRegexp.compile(
        getMatchedPath(routes)
      )(Object.assign({}, params, userParams)),
      resolver
    )
  };
}

function createRedirect(context, pathname) {
  const params = Object.assign({}, context.params);
  return {
    redirect: {
      pathname,
      from: context.pathname,
      params
    }
  };
}

function renderElement(context, element) {
  element.location = createLocation(context);
  const index = context.chain.map(item => item.route).indexOf(context.route);
  context.chain[index].element = element;
  return element;
}

function runCallbackIfPossible(callback, args, thisArg) {
  if (isFunction(callback)) {
    return callback.apply(thisArg, args);
  }
}

function amend(amendmentFunction, args, element) {
  return amendmentResult => {
    if (amendmentResult && (amendmentResult.cancel || amendmentResult.redirect)) {
      return amendmentResult;
    }

    if (element) {
      return runCallbackIfPossible(element[amendmentFunction], args, element);
    }
  };
}

function processNewChildren(newChildren, route) {
  if (!Array.isArray(newChildren) && !isObject(newChildren)) {
    throw new Error(
      log(
        `Incorrect "children" value for the route ${route.path}: expected array or object, but got ${newChildren}`
      )
    );
  }

  route.__children = [];
  const childRoutes = toArray(newChildren);
  for (let i = 0; i < childRoutes.length; i++) {
    ensureRoute(childRoutes[i]);
    route.__children.push(childRoutes[i]);
  }
}

function removeDomNodes(nodes) {
  if (nodes && nodes.length) {
    const parent = nodes[0].parentNode;
    for (let i = 0; i < nodes.length; i++) {
      parent.removeChild(nodes[i]);
    }
  }
}

function getPathnameForRouter(pathname, router) {
  const base = router.__effectiveBaseUrl;
  return base
    ? router.constructor.__createUrl(pathname.replace(/^\//, ''), base).pathname
    : pathname;
}

function getMatchedPath(chain) {
  return chain.map(item => item.path).reduce((a, b) => {
    if (b.length) {
      return a.replace(/\/$/, '') + '/' + b.replace(/^\//, '');
    }
    return a;
  }, '');
}

/**
 * A simple client-side router for single-page applications. It uses
 * express-style middleware and has a first-class support for Web Components and
 * lazy-loading. Works great in Polymer and non-Polymer apps.
 *
 * Use `new Router(outlet, options)` to create a new Router instance.
 *
 * * The `outlet` parameter is a reference to the DOM node to render
 *   the content into.
 *
 * * The `options` parameter is an optional object with options. The following
 *   keys are supported:
 *   * `baseUrl` — the initial value for [
 *     the `baseUrl` property
 *   ](#/classes/Router#property-baseUrl)
 *
 * The Router instance is automatically subscribed to navigation events
 * on `window`.
 *
 * See [Live Examples](#/classes/Router/demos/demo/index.html) for the detailed usage demo and code snippets.
 *
 * See also detailed API docs for the following methods, for the advanced usage:
 *
 * * [setOutlet](#/classes/Router#method-setOutlet) – should be used to configure the outlet.
 * * [setTriggers](#/classes/Router#method-setTriggers) – should be used to configure the navigation events.
 * * [setRoutes](#/classes/Router#method-setRoutes) – should be used to configure the routes.
 *
 * Only `setRoutes` has to be called manually, others are automatically invoked when creating a new instance.
 *
 * @extends Resolver
 * @demo demo/index.html
 * @summary JavaScript class that renders different DOM content depending on
 *    a given path. It can re-render when triggered or automatically on
 *    'popstate' and / or 'click' events.
 */
class Router extends Resolver {

  /**
   * Creates a new Router instance with a given outlet, and
   * automatically subscribes it to navigation events on the `window`.
   * Using a constructor argument or a setter for outlet is equivalent:
   *
   * ```
   * const router = new Router();
   * router.setOutlet(outlet);
   * ```
   * @param {?Node=} outlet
   * @param {?RouterOptions=} options
   */
  constructor(outlet, options) {
    const baseElement = document.head.querySelector('base');
    const baseHref = baseElement && baseElement.getAttribute('href');
    super([], Object.assign({
      // Default options
      baseUrl: baseHref && Resolver.__createUrl(baseHref, document.URL).pathname.replace(/[^\/]*$/, '')
    }, options));

    this.resolveRoute = context => this.__resolveRoute(context);

    const triggers = Router.NavigationTrigger;
    Router.setTriggers.apply(Router, Object.keys(triggers).map(key => triggers[key]));

    /**
     * The base URL for all routes in the router instance. By default,
     * if the base element exists in the `<head>`, vaadin-router
     * takes the `<base href>` attribute value, resolves against current `document.URL`
     * and gets the `pathname` from the result.
     *
     * @public
     * @type {string}
     */
    this.baseUrl;

    /**
     * A promise that is settled after the current render cycle completes. If
     * there is no render cycle in progress the promise is immediately settled
     * with the last render cycle result.
     *
     * @public
     * @type {!Promise<!RouterLocation>}
     */
    this.ready;
    this.ready = Promise.resolve(outlet);

    /**
     * Contains read-only information about the current router location:
     * pathname, active routes, parameters. See the
     * [Location type declaration](#/classes/RouterLocation)
     * for more details.
     *
     * @public
     * @type {!RouterLocation}
     */
    this.location;
    this.location = createLocation({resolver: this});

    this.__lastStartedRenderId = 0;
    this.__navigationEventHandler = this.__onNavigationEvent.bind(this);
    this.setOutlet(outlet);
    this.subscribe();
    // Using WeakMap instead of WeakSet because WeakSet is not supported by IE11
    this.__createdByRouter = new WeakMap();
    this.__addedByRouter = new WeakMap();
  }

  __resolveRoute(context) {
    const route = context.route;

    let callbacks = Promise.resolve();

    if (isFunction(route.children)) {
      callbacks = callbacks
        .then(() => route.children(copyContextWithoutNext(context)))
        .then(children => {
          // The route.children() callback might have re-written the
          // route.children property instead of returning a value
          if (!isResultNotEmpty(children) && !isFunction(route.children)) {
            children = route.children;
          }
          processNewChildren(children, route);
        });
    }

    const commands = {
      redirect: path => createRedirect(context, path),
      component: (component) => {
        const element = document.createElement(component);
        this.__createdByRouter.set(element, true);
        return element;
      }
    };

    return callbacks
      .then(() => {
        if (this.__isLatestRender(context)) {
          return runCallbackIfPossible(route.action, [context, commands], route);
        }
      })
      .then(result => {
        if (isResultNotEmpty(result)) {
          // Actions like `() => import('my-view.js')` are not expected to
          // end the resolution, despite the result is not empty. Checking
          // the result with a whitelist of values that end the resolution.
          if (result instanceof HTMLElement ||
              result.redirect ||
              result === notFoundResult) {
            return result;
          }
        }

        if (isString(route.redirect)) {
          return commands.redirect(route.redirect);
        }

        if (route.bundle) {
          return loadBundle(route.bundle)
            .then(() => {}, () => {
              throw new Error(log(`Bundle not found: ${route.bundle}. Check if the file name is correct`));
            });
        }
      })
      .then(result => {
        if (isResultNotEmpty(result)) {
          return result;
        }
        if (isString(route.component)) {
          return commands.component(route.component);
        }
      });
  }

  /**
   * Sets the router outlet (the DOM node where the content for the current
   * route is inserted). Any content pre-existing in the router outlet is
   * removed at the end of each render pass.
   *
   * NOTE: this method is automatically invoked first time when creating a new Router instance.
   *
   * @param {?Node} outlet the DOM node where the content for the current route
   *     is inserted.
   */
  setOutlet(outlet) {
    if (outlet) {
      this.__ensureOutlet(outlet);
    }
    this.__outlet = outlet;
  }

  /**
   * Returns the current router outlet. The initial value is `undefined`.
   *
   * @return {?Node} the current router outlet (or `undefined`)
   */
  getOutlet() {
    return this.__outlet;
  }

  /**
   * Sets the routing config (replacing the existing one) and triggers a
   * navigation event so that the router outlet is refreshed according to the
   * current `window.location` and the new routing config.
   *
   * Each route object may have the following properties, listed here in the processing order:
   * * `path` – the route path (relative to the parent route if any) in the
   * [express.js syntax](https://expressjs.com/en/guide/routing.html#route-paths").
   *
   * * `children` – an array of nested routes or a function that provides this
   * array at the render time. The function can be synchronous or asynchronous:
   * in the latter case the render is delayed until the returned promise is
   * resolved. The `children` function is executed every time when this route is
   * being rendered. This allows for dynamic route structures (e.g. backend-defined),
   * but it might have a performance impact as well. In order to avoid calling
   * the function on subsequent renders, you can override the `children` property
   * of the route object and save the calculated array there
   * (via `context.route.children = [ route1, route2, ...];`).
   * Parent routes are fully resolved before resolving the children. Children
   * 'path' values are relative to the parent ones.
   *
   * * `action` – the action that is executed before the route is resolved.
   * The value for this property should be a function, accepting `context`
   * and `commands` parameters described below. If present, this function is
   * always invoked first, disregarding of the other properties' presence.
   * The action can return a result directly or within a `Promise`, which
   * resolves to the result. If the action result is an `HTMLElement` instance,
   * a `commands.component(name)` result, a `commands.redirect(path)` result,
   * or a `context.next()` result, the current route resolution is finished,
   * and other route config properties are ignored.
   * See also **Route Actions** section in [Live Examples](#/classes/Router/demos/demo/index.html).
   *
   * * `redirect` – other route's path to redirect to. Passes all route parameters to the redirect target.
   * The target route should also be defined.
   * See also **Redirects** section in [Live Examples](#/classes/Router/demos/demo/index.html).
   *
   * * `bundle` – string containing the path to `.js` or `.mjs` bundle to load before resolving the route,
   * or the object with "module" and "nomodule" keys referring to different bundles.
   * Each bundle is only loaded once. If "module" and "nomodule" are set, only one bundle is loaded,
   * depending on whether the browser supports ES modules or not.
   * The property is ignored when either an `action` returns the result or `redirect` property is present.
   * Any error, e.g. 404 while loading bundle will cause route resolution to throw.
   * See also **Code Splitting** section in [Live Examples](#/classes/Router/demos/demo/index.html).
   *
   * * `component` – the tag name of the Web Component to resolve the route to.
   * The property is ignored when either an `action` returns the result or `redirect` property is present.
   * If route contains the `component` property (or an action that return a component)
   * and its child route also contains the `component` property, child route's component
   * will be rendered as a light dom child of a parent component.
   *
   * * `name` – the string name of the route to use in the
   * [`router.urlForName(name, params)`](#/classes/Router#method-urlForName)
   * navigation helper method.
   *
   * For any route function (`action`, `children`) defined, the corresponding `route` object is available inside the callback
   * through the `this` reference. If you need to access it, make sure you define the callback as a non-arrow function
   * because arrow functions do not have their own `this` reference.
   *
   * `context` object that is passed to `action` function holds the following properties:
   * * `context.pathname` – string with the pathname being resolved
   *
   * * `context.search` – search query string
   *
   * * `context.hash` – hash string
   *
   * * `context.params` – object with route parameters
   *
   * * `context.route` – object that holds the route that is currently being rendered.
   *
   * * `context.next()` – function for asynchronously getting the next route
   * contents from the resolution chain (if any)
   *
   * `commands` object that is passed to `action` function has
   * the following methods:
   *
   * * `commands.redirect(path)` – function that creates a redirect data
   * for the path specified.
   *
   * * `commands.component(component)` – function that creates a new HTMLElement
   * with current context. Note: the component created by this function is reused if visiting the same path twice in row.
   *
   *
   * @param {!Array<!Route>|!Route} routes a single route or an array of those
   * @param {?boolean} skipRender configure the router but skip rendering the
   *     route corresponding to the current `window.location` values
   *
   * @return {!Promise<!Node>}
   */
  setRoutes(routes, skipRender = false) {
    this.__previousContext = undefined;
    this.__urlForName = undefined;
    super.setRoutes(routes);
    if (!skipRender) {
      this.__onNavigationEvent();
    }
    return this.ready;
  }

  /**
   * Asynchronously resolves the given pathname and renders the resolved route
   * component into the router outlet. If no router outlet is set at the time of
   * calling this method, or at the time when the route resolution is completed,
   * a `TypeError` is thrown.
   *
   * Returns a promise that is fulfilled with the router outlet DOM Node after
   * the route component is created and inserted into the router outlet, or
   * rejected if no route matches the given path.
   *
   * If another render pass is started before the previous one is completed, the
   * result of the previous render pass is ignored.
   *
   * @param {!string|!{pathname: !string, search: ?string, hash: ?string}} pathnameOrContext
   *    the pathname to render or a context object with a `pathname` property,
   *    optional `search` and `hash` properties, and other properties
   *    to pass to the resolver.
   * @param {boolean=} shouldUpdateHistory
   *    update browser history with the rendered location
   * @return {!Promise<!Node>}
   */
  render(pathnameOrContext, shouldUpdateHistory) {
    const renderId = ++this.__lastStartedRenderId;
    const context = Object.assign(
      {
        search: '',
        hash: ''
      },
      isString(pathnameOrContext)
        ? {pathname: pathnameOrContext}
        : pathnameOrContext,
      {
        __renderId: renderId
      }
    );

    // Find the first route that resolves to a non-empty result
    this.ready = this.resolve(context)

      // Process the result of this.resolve() and handle all special commands:
      // (redirect / prevent / component). If the result is a 'component',
      // then go deeper and build the entire chain of nested components matching
      // the pathname. Also call all 'on before' callbacks along the way.
      .then(context => this.__fullyResolveChain(context))

      .then(context => {
        if (this.__isLatestRender(context)) {
          const previousContext = this.__previousContext;

          // Check if the render was prevented and make an early return in that case
          if (context === previousContext) {
            // Replace the history with the previous context
            // to make sure the URL stays the same.
            this.__updateBrowserHistory(previousContext, true);
            return this.location;
          }

          this.location = createLocation(context);

          if (shouldUpdateHistory) {
            // Replace only if first render redirects, so that we don’t leave
            // the redirecting record in the history
            this.__updateBrowserHistory(context, renderId === 1);
          }

          fireRouterEvent('location-changed', {router: this, location: this.location});

          // Skip detaching/re-attaching there are no render changes
          if (context.__skipAttach) {
            this.__copyUnchangedElements(context, previousContext);
            this.__previousContext = context;
            return this.location;
          }

          this.__addAppearingContent(context, previousContext);
          const animationDone = this.__animateIfNeeded(context);

          this.__runOnAfterEnterCallbacks(context);
          this.__runOnAfterLeaveCallbacks(context, previousContext);

          return animationDone.then(() => {
            if (this.__isLatestRender(context)) {
              // If there is another render pass started after this one,
              // the 'disappearing content' would be removed when the other
              // render pass calls `this.__addAppearingContent()`
              this.__removeDisappearingContent();

              this.__previousContext = context;
              return this.location;
            }
          });
        }
      })
      .catch(error => {
        if (renderId === this.__lastStartedRenderId) {
          if (shouldUpdateHistory) {
            this.__updateBrowserHistory(context);
          }
          removeDomNodes(this.__outlet && this.__outlet.children);
          this.location = createLocation(Object.assign(context, {resolver: this}));
          fireRouterEvent('error', Object.assign({router: this, error}, context));
          throw error;
        }
      });
    return this.ready;
  }

  // `topOfTheChainContextBeforeRedirects` is a context coming from Resolver.resolve().
  // It would contain a 'redirect' route or the first 'component' route that
  // matched the pathname. There might be more child 'component' routes to be
  // resolved and added into the chain. This method would find and add them.
  // `contextBeforeRedirects` is the context containing such a child component
  // route. It's only necessary when this method is called recursively (otherwise
  // it's the same as the 'top of the chain' context).
  //
  // Apart from building the chain of child components, this method would also
  // handle 'redirect' routes, call 'onBefore' callbacks and handle 'prevent'
  // and 'redirect' callback results.
  __fullyResolveChain(topOfTheChainContextBeforeRedirects,
    contextBeforeRedirects = topOfTheChainContextBeforeRedirects) {
    return this.__findComponentContextAfterAllRedirects(contextBeforeRedirects)
      // `contextAfterRedirects` is always a context with an `HTMLElement` result
      // In other cases the promise gets rejected and .then() is not called
      .then(contextAfterRedirects => {
        const redirectsHappened = contextAfterRedirects !== contextBeforeRedirects;
        const topOfTheChainContextAfterRedirects =
          redirectsHappened ? contextAfterRedirects : topOfTheChainContextBeforeRedirects;

        const matchedPath = getPathnameForRouter(
          getMatchedPath(contextAfterRedirects.chain),
          contextAfterRedirects.resolver
        );
        const isFound = (matchedPath === contextAfterRedirects.pathname);

        // Recursive method to try matching more child and sibling routes
        const findNextContextIfAny = (context, parent = context.route, prevResult) => {
          return context.next(undefined, parent, prevResult).then(nextContext => {
            if (nextContext === null || nextContext === notFoundResult) {
              // Next context is not found in children, ...
              if (isFound) {
                // ...but original context is already fully matching - use it
                return context;
              } else if (parent.parent !== null) {
                // ...and there is no full match yet - step up to check siblings
                return findNextContextIfAny(context, parent.parent, nextContext);
              } else {
                return nextContext;
              }
            }

            return nextContext;
          });
        };

        return findNextContextIfAny(contextAfterRedirects).then(nextContext => {
          if (nextContext === null || nextContext === notFoundResult) {
            throw getNotFoundError(topOfTheChainContextAfterRedirects);
          }

          return nextContext
          && nextContext !== notFoundResult
          && nextContext !== contextAfterRedirects
            ? this.__fullyResolveChain(topOfTheChainContextAfterRedirects, nextContext)
            : this.__amendWithOnBeforeCallbacks(contextAfterRedirects);
        });
      });
  }

  __findComponentContextAfterAllRedirects(context) {
    const result = context.result;
    if (result instanceof HTMLElement) {
      renderElement(context, result);
      return Promise.resolve(context);
    } else if (result.redirect) {
      return this.__redirect(result.redirect, context.__redirectCount, context.__renderId)
        .then(context => this.__findComponentContextAfterAllRedirects(context));
    } else if (result instanceof Error) {
      return Promise.reject(result);
    } else {
      return Promise.reject(
        new Error(
          log(
            `Invalid route resolution result for path "${context.pathname}". ` +
            `Expected redirect object or HTML element, but got: "${logValue(result)}". ` +
            `Double check the action return value for the route.`
          )
        ));
    }
  }

  __amendWithOnBeforeCallbacks(contextWithFullChain) {
    return this.__runOnBeforeCallbacks(contextWithFullChain).then(amendedContext => {
      if (amendedContext === this.__previousContext || amendedContext === contextWithFullChain) {
        return amendedContext;
      }
      return this.__fullyResolveChain(amendedContext);
    });
  }

  __runOnBeforeCallbacks(newContext) {
    const previousContext = this.__previousContext || {};
    const previousChain = previousContext.chain || [];
    const newChain = newContext.chain;

    let callbacks = Promise.resolve();
    const prevent = () => ({cancel: true});
    const redirect = (pathname) => createRedirect(newContext, pathname);

    newContext.__divergedChainIndex = 0;
    newContext.__skipAttach = false;
    if (previousChain.length) {
      for (let i = 0; i < Math.min(previousChain.length, newChain.length); i = ++newContext.__divergedChainIndex) {
        if (previousChain[i].route !== newChain[i].route
          || previousChain[i].path !== newChain[i].path && previousChain[i].element !== newChain[i].element
          || !this.__isReusableElement(previousChain[i].element, newChain[i].element)) {
          break;
        }
      }

      // Skip re-attaching and notifications if element and chain do not change
      newContext.__skipAttach =
        // Same route chain
        newChain.length === previousChain.length && newContext.__divergedChainIndex == newChain.length &&
        // Same element
        this.__isReusableElement(newContext.result, previousContext.result);

      if (newContext.__skipAttach) {
        // execute onBeforeLeave for changed segment element when skipping attach
        for (let i = newChain.length - 1; i >= 0; i--) {
          callbacks = this.__runOnBeforeLeaveCallbacks(callbacks, newContext, {prevent}, previousChain[i]);
        }
        // execute onBeforeEnter for changed segment element when skipping attach
        for (let i = 0; i < newChain.length; i++) {
          callbacks = this.__runOnBeforeEnterCallbacks(callbacks, newContext, {prevent, redirect}, newChain[i]);
          previousChain[i].element.location = createLocation(newContext, previousChain[i].route);
        }

      } else {
        // execute onBeforeLeave when NOT skipping attach
        for (let i = previousChain.length - 1; i >= newContext.__divergedChainIndex; i--) {
          callbacks = this.__runOnBeforeLeaveCallbacks(callbacks, newContext, {prevent}, previousChain[i]);
        }
      }
    }
    // execute onBeforeEnter when NOT skipping attach
    if (!newContext.__skipAttach) {
      for (let i = 0; i < newChain.length; i++) {
        if (i < newContext.__divergedChainIndex) {
          if (i < previousChain.length && previousChain[i].element) {
            previousChain[i].element.location = createLocation(newContext, previousChain[i].route);
          }
        } else {
          callbacks = this.__runOnBeforeEnterCallbacks(callbacks, newContext, {prevent, redirect}, newChain[i]);
          if (newChain[i].element) {
            newChain[i].element.location = createLocation(newContext, newChain[i].route);
          }
        }
      }
    }
    return callbacks.then(amendmentResult => {
      if (amendmentResult) {
        if (amendmentResult.cancel) {
          this.__previousContext.__renderId = newContext.__renderId;
          return this.__previousContext;
        }
        if (amendmentResult.redirect) {
          return this.__redirect(amendmentResult.redirect, newContext.__redirectCount, newContext.__renderId);
        }
      }
      return newContext;
    });
  }

  __runOnBeforeLeaveCallbacks(callbacks, newContext, commands, chainElement) {
    const location = createLocation(newContext);
    return callbacks.then(result => {
      if (this.__isLatestRender(newContext)) {
        const afterLeaveFunction = amend('onBeforeLeave', [location, commands, this], chainElement.element);
        return afterLeaveFunction(result);
      }
    }).then(result => {
      if (!(result || {}).redirect) {
        return result;
      }
    });
  }

  __runOnBeforeEnterCallbacks(callbacks, newContext, commands, chainElement) {
    const location = createLocation(newContext, chainElement.route);
    return callbacks.then(result => {
      if (this.__isLatestRender(newContext)) {
        const beforeEnterFunction = amend('onBeforeEnter', [location, commands, this], chainElement.element);
        return beforeEnterFunction(result);
      }
    });
  }

  __isReusableElement(element, otherElement) {
    if (element && otherElement) {
      return this.__createdByRouter.get(element) && this.__createdByRouter.get(otherElement)
        ? element.localName === otherElement.localName
        : element === otherElement;
    }
    return false;
  }

  __isLatestRender(context) {
    return context.__renderId === this.__lastStartedRenderId;
  }

  __redirect(redirectData, counter, renderId) {
    if (counter > MAX_REDIRECT_COUNT) {
      throw new Error(log(`Too many redirects when rendering ${redirectData.from}`));
    }

    return this.resolve({
      pathname: this.urlForPath(
        redirectData.pathname,
        redirectData.params
      ),
      redirectFrom: redirectData.from,
      __redirectCount: (counter || 0) + 1,
      __renderId: renderId
    });
  }

  __ensureOutlet(outlet = this.__outlet) {
    if (!(outlet instanceof Node)) {
      throw new TypeError(log(`Expected router outlet to be a valid DOM Node (but got ${outlet})`));
    }
  }

  __updateBrowserHistory({pathname, search = '', hash = ''}, replace) {
    if (window.location.pathname !== pathname
        || window.location.search !== search
        || window.location.hash !== hash
    ) {
      const changeState = replace ? 'replaceState' : 'pushState';
      window.history[changeState](null, document.title, pathname + search + hash);
      window.dispatchEvent(new PopStateEvent('popstate', {state: 'vaadin-router-ignore'}));
    }
  }

  __copyUnchangedElements(context, previousContext) {
    // Find the deepest common parent between the last and the new component
    // chains. Update references for the unchanged elements in the new chain
    let deepestCommonParent = this.__outlet;
    for (let i = 0; i < context.__divergedChainIndex; i++) {
      const unchangedElement = previousContext && previousContext.chain[i].element;
      if (unchangedElement) {
        if (unchangedElement.parentNode === deepestCommonParent) {
          context.chain[i].element = unchangedElement;
          deepestCommonParent = unchangedElement;
        } else {
          break;
        }
      }
    }
    return deepestCommonParent;
  }

  __addAppearingContent(context, previousContext) {
    this.__ensureOutlet();

    // If the previous 'entering' animation has not completed yet,
    // stop it and remove that content from the DOM before adding new one.
    this.__removeAppearingContent();

    // Copy reusable elements from the previousContext to current
    const deepestCommonParent = this.__copyUnchangedElements(context, previousContext);

    // Keep two lists of DOM elements:
    //  - those that should be removed once the transition animation is over
    //  - and those that should remain
    this.__appearingContent = [];
    this.__disappearingContent = Array
      .from(deepestCommonParent.children)
      .filter(
        // Only remove layout content that was added by router
        e => this.__addedByRouter.get(e) &&
        // Do not remove the result element to avoid flickering
        e !== context.result);

    // Add new elements (starting after the deepest common parent) to the DOM.
    // That way only the components that are actually different between the two
    // locations are added to the DOM (and those that are common remain in the
    // DOM without first removing and then adding them again).
    let parentElement = deepestCommonParent;
    for (let i = context.__divergedChainIndex; i < context.chain.length; i++) {
      const elementToAdd = context.chain[i].element;
      if (elementToAdd) {
        parentElement.appendChild(elementToAdd);
        this.__addedByRouter.set(elementToAdd, true);
        if (parentElement === deepestCommonParent) {
          this.__appearingContent.push(elementToAdd);
        }
        parentElement = elementToAdd;
      }
    }
  }

  __removeDisappearingContent() {
    if (this.__disappearingContent) {
      removeDomNodes(this.__disappearingContent);
    }
    this.__disappearingContent = null;
    this.__appearingContent = null;
  }

  __removeAppearingContent() {
    if (this.__disappearingContent && this.__appearingContent) {
      removeDomNodes(this.__appearingContent);
      this.__disappearingContent = null;
      this.__appearingContent = null;
    }
  }

  __runOnAfterLeaveCallbacks(currentContext, targetContext) {
    if (!targetContext) {
      return;
    }

    // REVERSE iteration: from Z to A
    for (let i = targetContext.chain.length - 1; i >= currentContext.__divergedChainIndex; i--) {
      if (!this.__isLatestRender(currentContext)) {
        break;
      }
      const currentComponent = targetContext.chain[i].element;
      if (!currentComponent) {
        continue;
      }
      try {
        const location = createLocation(currentContext);
        runCallbackIfPossible(
          currentComponent.onAfterLeave,
          [location, {}, targetContext.resolver],
          currentComponent);
      } finally {
        if (this.__disappearingContent.indexOf(currentComponent) > -1) {
          removeDomNodes(currentComponent.children);
        }
      }
    }
  }

  __runOnAfterEnterCallbacks(currentContext) {
    // forward iteration: from A to Z
    for (let i = currentContext.__divergedChainIndex; i < currentContext.chain.length; i++) {
      if (!this.__isLatestRender(currentContext)) {
        break;
      }
      const currentComponent = currentContext.chain[i].element || {};
      const location = createLocation(currentContext, currentContext.chain[i].route);
      runCallbackIfPossible(
        currentComponent.onAfterEnter,
        [location, {}, currentContext.resolver],
        currentComponent);
    }
  }

  __animateIfNeeded(context) {
    const from = (this.__disappearingContent || [])[0];
    const to = (this.__appearingContent || [])[0];
    const promises = [];

    const chain = context.chain;
    let config;
    for (let i = chain.length; i > 0; i--) {
      if (chain[i - 1].route.animate) {
        config = chain[i - 1].route.animate;
        break;
      }
    }

    if (from && to && config) {
      const leave = isObject(config) && config.leave || 'leaving';
      const enter = isObject(config) && config.enter || 'entering';
      promises.push(animate(from, leave));
      promises.push(animate(to, enter));
    }

    return Promise.all(promises).then(() => context);
  }

  /**
   * Subscribes this instance to navigation events on the `window`.
   *
   * NOTE: beware of resource leaks. For as long as a router instance is
   * subscribed to navigation events, it won't be garbage collected.
   */
  subscribe() {
    window.addEventListener('vaadin-router-go', this.__navigationEventHandler);
  }

  /**
   * Removes the subscription to navigation events created in the `subscribe()`
   * method.
   */
  unsubscribe() {
    window.removeEventListener('vaadin-router-go', this.__navigationEventHandler);
  }

  __onNavigationEvent(event) {
    const {pathname, search, hash} = event ? event.detail : window.location;
    if (isString(this.__normalizePathname(pathname))) {
      if (event && event.preventDefault) {
        event.preventDefault();
      }
      this.render({pathname, search, hash}, true);
    }
  }

  /**
   * Configures what triggers Router navigation events:
   *  - `POPSTATE`: popstate events on the current `window`
   *  - `CLICK`: click events on `<a>` links leading to the current page
   *
   * This method is invoked with the pre-configured values when creating a new Router instance.
   * By default, both `POPSTATE` and `CLICK` are enabled. This setup is expected to cover most of the use cases.
   *
   * See the `router-config.js` for the default navigation triggers config. Based on it, you can
   * create the own one and only import the triggers you need, instead of pulling in all the code,
   * e.g. if you want to handle `click` differently.
   *
   * See also **Navigation Triggers** section in [Live Examples](#/classes/Router/demos/demo/index.html).
   *
   * @param {...NavigationTrigger} triggers
   */
  static setTriggers(...triggers) {
    setNavigationTriggers(triggers);
  }

  /**
   * Generates a URL for the route with the given name, optionally performing
   * substitution of parameters.
   *
   * The route is searched in all the Router instances subscribed to
   * navigation events.
   *
   * **Note:** For child route names, only array children are considered.
   * It is not possible to generate URLs using a name for routes set with
   * a children function.
   *
   * @function urlForName
   * @param {!string} name the route name or the route’s `component` name.
   * @param {Params=} params Optional object with route path parameters.
   * Named parameters are passed by name (`params[name] = value`), unnamed
   * parameters are passed by index (`params[index] = value`).
   *
   * @return {string}
   */
  urlForName(name, params) {
    if (!this.__urlForName) {
      this.__urlForName = generateUrls(this);
    }
    return getPathnameForRouter(
      this.__urlForName(name, params),
      this
    );
  }

  /**
   * Generates a URL for the given route path, optionally performing
   * substitution of parameters.
   *
   * @param {!string} path string route path declared in [express.js syntax](https://expressjs.com/en/guide/routing.html#route-paths").
   * @param {Params=} params Optional object with route path parameters.
   * Named parameters are passed by name (`params[name] = value`), unnamed
   * parameters are passed by index (`params[index] = value`).
   *
   * @return {string}
   */
  urlForPath(path, params) {
    return getPathnameForRouter(
      Router.pathToRegexp.compile(path)(params),
      this
    );
  }

  /**
   * Triggers navigation to a new path. Returns a boolean without waiting until
   * the navigation is complete. Returns `true` if at least one `Router`
   * has handled the navigation (was subscribed and had `baseUrl` matching
   * the `path` argument), otherwise returns `false`.
   *
   * @param {!string|!{pathname: !string, search: (string|undefined), hash: (string|undefined)}} path
   *   a new in-app path string, or an URL-like object with `pathname`
   *   string property, and optional `search` and `hash` string properties.
   * @return {boolean}
   */
  static go(path) {
    const {pathname, search, hash} = isString(path)
      ? this.__createUrl(path, 'http://a') // some base to omit origin
      : path;
    return fireRouterEvent('go', {pathname, search, hash});
  }
}

const DEV_MODE_CODE_REGEXP =
  /\/\*\*\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i;

const FlowClients = window.Vaadin && window.Vaadin.Flow && window.Vaadin.Flow.clients;

function isMinified() {
  function test() {
    /** vaadin-dev-mode:start
    return false;
    vaadin-dev-mode:end **/
    return true;
  }
  return uncommentAndRun(test);
}

function isDevelopmentMode() {
  try {
    if (isForcedDevelopmentMode()) {
      return true;
    }

    if (!isLocalhost()) {
      return false;
    }

    if (FlowClients) {
      return !isFlowProductionMode();
    }

    return !isMinified();
  } catch (e) {
    // Some error in this code, assume production so no further actions will be taken
    return false;
  }
}

function isForcedDevelopmentMode() {
  return localStorage.getItem("vaadin.developmentmode.force");
}

function isLocalhost() {
  return (["localhost","127.0.0.1"].indexOf(window.location.hostname) >= 0);
}

function isFlowProductionMode() {
  if (FlowClients) {
    const productionModeApps = Object.keys(FlowClients)
      .map(key => FlowClients[key])
      .filter(client => client.productionMode);
    if (productionModeApps.length > 0) {
      return true;
    }
  }
  return false;
}

function uncommentAndRun(callback, args) {
  if (typeof callback !== 'function') {
    return;
  }

  const match = DEV_MODE_CODE_REGEXP.exec(callback.toString());
  if (match) {
    try {
      // requires CSP: script-src 'unsafe-eval'
      callback = new Function(match[1]);
    } catch (e) {
      // eat the exception
      console.log('vaadin-development-mode-detector: uncommentAndRun() failed', e);
    }
  }

  return callback(args);
}

// A guard against polymer-modulizer removing the window.Vaadin
// initialization above.
window['Vaadin'] = window['Vaadin'] || {};

/**
 * Inspects the source code of the given `callback` function for
 * specially-marked _commented_ code. If such commented code is found in the
 * callback source, uncomments and runs that code instead of the callback
 * itself. Otherwise runs the callback as is.
 *
 * The optional arguments are passed into the callback / uncommented code,
 * the result is returned.
 *
 * See the `isMinified()` function source code in this file for an example.
 *
 */
const runIfDevelopmentMode = function(callback, args) {
  if (window.Vaadin.developmentMode) {
    return uncommentAndRun(callback, args);
  }
};

if (window.Vaadin.developmentMode === undefined) {
  window.Vaadin.developmentMode = isDevelopmentMode();
}

/* This file is autogenerated from src/vaadin-usage-statistics.tpl.html */

function maybeGatherAndSendStats() {
  /** vaadin-dev-mode:start
  (function () {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var getPolymerVersion = function getPolymerVersion() {
  return window.Polymer && window.Polymer.version;
};

var StatisticsGatherer = function () {
  function StatisticsGatherer(logger) {
    classCallCheck(this, StatisticsGatherer);

    this.now = new Date().getTime();
    this.logger = logger;
  }

  createClass(StatisticsGatherer, [{
    key: 'frameworkVersionDetectors',
    value: function frameworkVersionDetectors() {
      return {
        'Flow': function Flow() {
          if (window.Vaadin && window.Vaadin.Flow && window.Vaadin.Flow.clients) {
            var flowVersions = Object.keys(window.Vaadin.Flow.clients).map(function (key) {
              return window.Vaadin.Flow.clients[key];
            }).filter(function (client) {
              return client.getVersionInfo;
            }).map(function (client) {
              return client.getVersionInfo().flow;
            });
            if (flowVersions.length > 0) {
              return flowVersions[0];
            }
          }
        },
        'Vaadin Framework': function VaadinFramework() {
          if (window.vaadin && window.vaadin.clients) {
            var frameworkVersions = Object.values(window.vaadin.clients).filter(function (client) {
              return client.getVersionInfo;
            }).map(function (client) {
              return client.getVersionInfo().vaadinVersion;
            });
            if (frameworkVersions.length > 0) {
              return frameworkVersions[0];
            }
          }
        },
        'AngularJs': function AngularJs() {
          if (window.angular && window.angular.version && window.angular.version) {
            return window.angular.version.full;
          }
        },
        'Angular': function Angular() {
          if (window.ng) {
            var tags = document.querySelectorAll("[ng-version]");
            if (tags.length > 0) {
              return tags[0].getAttribute("ng-version");
            }
            return "Unknown";
          }
        },
        'Backbone.js': function BackboneJs() {
          if (window.Backbone) {
            return window.Backbone.VERSION;
          }
        },
        'React': function React() {
          var reactSelector = '[data-reactroot], [data-reactid]';
          if (!!document.querySelector(reactSelector)) {
            // React does not publish the version by default
            return "unknown";
          }
        },
        'Ember': function Ember() {
          if (window.Em && window.Em.VERSION) {
            return window.Em.VERSION;
          } else if (window.Ember && window.Ember.VERSION) {
            return window.Ember.VERSION;
          }
        },
        'jQuery': function (_jQuery) {
          function jQuery() {
            return _jQuery.apply(this, arguments);
          }

          jQuery.toString = function () {
            return _jQuery.toString();
          };

          return jQuery;
        }(function () {
          if (typeof jQuery === 'function' && jQuery.prototype.jquery !== undefined) {
            return jQuery.prototype.jquery;
          }
        }),
        'Polymer': function Polymer() {
          var version = getPolymerVersion();
          if (version) {
            return version;
          }
        },
        'LitElement': function LitElement() {
          var version = window.litElementVersions && window.litElementVersions[0];
          if (version) {
            return version;
          }
        },
        'LitHtml': function LitHtml() {
          var version = window.litHtmlVersions && window.litHtmlVersions[0];
          if (version) {
            return version;
          }
        },
        'Vue.js': function VueJs() {
          if (window.Vue) {
            return window.Vue.version;
          }
        }
      };
    }
  }, {
    key: 'getUsedVaadinElements',
    value: function getUsedVaadinElements(elements) {
      var version = getPolymerVersion();
      var elementClasses = void 0;
      // NOTE: In case you edit the code here, YOU MUST UPDATE any statistics reporting code in Flow.
      // Check all locations calling the method getEntries() in
      // https://github.com/vaadin/flow/blob/master/flow-server/src/main/java/com/vaadin/flow/internal/UsageStatistics.java#L106
      // Currently it is only used by BootstrapHandler.
      if (version && version.indexOf('2') === 0) {
        // Polymer 2: components classes are stored in window.Vaadin
        elementClasses = Object.keys(window.Vaadin).map(function (c) {
          return window.Vaadin[c];
        }).filter(function (c) {
          return c.is;
        });
      } else {
        // Polymer 3: components classes are stored in window.Vaadin.registrations
        elementClasses = window.Vaadin.registrations || [];
      }
      elementClasses.forEach(function (klass) {
        var version = klass.version ? klass.version : "0.0.0";
        elements[klass.is] = { version: version };
      });
    }
  }, {
    key: 'getUsedVaadinThemes',
    value: function getUsedVaadinThemes(themes) {
      ['Lumo', 'Material'].forEach(function (themeName) {
        var theme;
        var version = getPolymerVersion();
        if (version && version.indexOf('2') === 0) {
          // Polymer 2: themes are stored in window.Vaadin
          theme = window.Vaadin[themeName];
        } else {
          // Polymer 3: themes are stored in custom element registry
          theme = customElements.get('vaadin-' + themeName.toLowerCase() + '-styles');
        }
        if (theme && theme.version) {
          themes[themeName] = { version: theme.version };
        }
      });
    }
  }, {
    key: 'getFrameworks',
    value: function getFrameworks(frameworks) {
      var detectors = this.frameworkVersionDetectors();
      Object.keys(detectors).forEach(function (framework) {
        var detector = detectors[framework];
        try {
          var version = detector();
          if (version) {
            frameworks[framework] = { version: version };
          }
        } catch (e) {}
      });
    }
  }, {
    key: 'gather',
    value: function gather(storage) {
      var storedStats = storage.read();
      var gatheredStats = {};
      var types = ["elements", "frameworks", "themes"];

      types.forEach(function (type) {
        gatheredStats[type] = {};
        if (!storedStats[type]) {
          storedStats[type] = {};
        }
      });

      var previousStats = JSON.stringify(storedStats);

      this.getUsedVaadinElements(gatheredStats.elements);
      this.getFrameworks(gatheredStats.frameworks);
      this.getUsedVaadinThemes(gatheredStats.themes);

      var now = this.now;
      types.forEach(function (type) {
        var keys = Object.keys(gatheredStats[type]);
        keys.forEach(function (key) {
          if (!storedStats[type][key] || _typeof(storedStats[type][key]) != _typeof({})) {
            storedStats[type][key] = { firstUsed: now };
          }
          // Discards any previously logged version number
          storedStats[type][key].version = gatheredStats[type][key].version;
          storedStats[type][key].lastUsed = now;
        });
      });

      var newStats = JSON.stringify(storedStats);
      storage.write(newStats);
      if (newStats != previousStats && Object.keys(storedStats).length > 0) {
        this.logger.debug("New stats: " + newStats);
      }
    }
  }]);
  return StatisticsGatherer;
}();

var StatisticsStorage = function () {
  function StatisticsStorage(key) {
    classCallCheck(this, StatisticsStorage);

    this.key = key;
  }

  createClass(StatisticsStorage, [{
    key: 'read',
    value: function read() {
      var localStorageStatsString = localStorage.getItem(this.key);
      try {
        return JSON.parse(localStorageStatsString ? localStorageStatsString : '{}');
      } catch (e) {
        return {};
      }
    }
  }, {
    key: 'write',
    value: function write(data) {
      localStorage.setItem(this.key, data);
    }
  }, {
    key: 'clear',
    value: function clear() {
      localStorage.removeItem(this.key);
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      var storedStats = this.read();
      var empty = true;
      Object.keys(storedStats).forEach(function (key) {
        if (Object.keys(storedStats[key]).length > 0) {
          empty = false;
        }
      });

      return empty;
    }
  }]);
  return StatisticsStorage;
}();

var StatisticsSender = function () {
  function StatisticsSender(url, logger) {
    classCallCheck(this, StatisticsSender);

    this.url = url;
    this.logger = logger;
  }

  createClass(StatisticsSender, [{
    key: 'send',
    value: function send(data, errorHandler) {
      var logger = this.logger;

      if (navigator.onLine === false) {
        logger.debug("Offline, can't send");
        errorHandler();
        return;
      }
      logger.debug("Sending data to " + this.url);

      var req = new XMLHttpRequest();
      req.withCredentials = true;
      req.addEventListener("load", function () {
        // Stats sent, nothing more to do
        logger.debug("Response: " + req.responseText);
      });
      req.addEventListener("error", function () {
        logger.debug("Send failed");
        errorHandler();
      });
      req.addEventListener("abort", function () {
        logger.debug("Send aborted");
        errorHandler();
      });
      req.open("POST", this.url);
      req.setRequestHeader("Content-Type", "application/json");
      req.send(data);
    }
  }]);
  return StatisticsSender;
}();

var StatisticsLogger = function () {
  function StatisticsLogger(id) {
    classCallCheck(this, StatisticsLogger);

    this.id = id;
  }

  createClass(StatisticsLogger, [{
    key: '_isDebug',
    value: function _isDebug() {
      return localStorage.getItem("vaadin." + this.id + ".debug");
    }
  }, {
    key: 'debug',
    value: function debug(msg) {
      if (this._isDebug()) {
        console.info(this.id + ": " + msg);
      }
    }
  }]);
  return StatisticsLogger;
}();

var UsageStatistics = function () {
  function UsageStatistics() {
    classCallCheck(this, UsageStatistics);

    this.now = new Date();
    this.timeNow = this.now.getTime();
    this.gatherDelay = 10; // Delay between loading this file and gathering stats
    this.initialDelay = 24 * 60 * 60;

    this.logger = new StatisticsLogger("statistics");
    this.storage = new StatisticsStorage("vaadin.statistics.basket");
    this.gatherer = new StatisticsGatherer(this.logger);
    this.sender = new StatisticsSender("https://tools.vaadin.com/usage-stats/submit", this.logger);
  }

  createClass(UsageStatistics, [{
    key: 'maybeGatherAndSend',
    value: function maybeGatherAndSend() {
      var _this = this;

      if (localStorage.getItem(UsageStatistics.optOutKey)) {
        return;
      }
      this.gatherer.gather(this.storage);
      setTimeout(function () {
        _this.maybeSend();
      }, this.gatherDelay * 1000);
    }
  }, {
    key: 'lottery',
    value: function lottery() {
      return true;
    }
  }, {
    key: 'currentMonth',
    value: function currentMonth() {
      return this.now.getYear() * 12 + this.now.getMonth();
    }
  }, {
    key: 'maybeSend',
    value: function maybeSend() {
      var firstUse = Number(localStorage.getItem(UsageStatistics.firstUseKey));
      var monthProcessed = Number(localStorage.getItem(UsageStatistics.monthProcessedKey));

      if (!firstUse) {
        // Use a grace period to avoid interfering with tests, incognito mode etc
        firstUse = this.timeNow;
        localStorage.setItem(UsageStatistics.firstUseKey, firstUse);
      }

      if (this.timeNow < firstUse + this.initialDelay * 1000) {
        this.logger.debug("No statistics will be sent until the initial delay of " + this.initialDelay + "s has passed");
        return;
      }
      if (this.currentMonth() <= monthProcessed) {
        this.logger.debug("This month has already been processed");
        return;
      }
      localStorage.setItem(UsageStatistics.monthProcessedKey, this.currentMonth());
      // Use random sampling
      if (this.lottery()) {
        this.logger.debug("Congratulations, we have a winner!");
      } else {
        this.logger.debug("Sorry, no stats from you this time");
        return;
      }

      this.send();
    }
  }, {
    key: 'send',
    value: function send() {
      // Ensure we have the latest data
      this.gatherer.gather(this.storage);

      // Read, send and clean up
      var data = this.storage.read();
      data["firstUse"] = Number(localStorage.getItem(UsageStatistics.firstUseKey));
      data["usageStatisticsVersion"] = UsageStatistics.version;
      var info = 'This request contains usage statistics gathered from the application running in development mode. \n\nStatistics gathering is automatically disabled and excluded from production builds.\n\nFor details and to opt-out, see https://github.com/vaadin/vaadin-usage-statistics.\n\n\n\n';
      var self = this;
      this.sender.send(info + JSON.stringify(data), function () {
        // Revert the 'month processed' flag
        localStorage.setItem(UsageStatistics.monthProcessedKey, self.currentMonth() - 1);
      });
    }
  }], [{
    key: 'version',
    get: function get$1() {
      return '2.1.0';
    }
  }, {
    key: 'firstUseKey',
    get: function get$1() {
      return 'vaadin.statistics.firstuse';
    }
  }, {
    key: 'monthProcessedKey',
    get: function get$1() {
      return 'vaadin.statistics.monthProcessed';
    }
  }, {
    key: 'optOutKey',
    get: function get$1() {
      return 'vaadin.statistics.optout';
    }
  }]);
  return UsageStatistics;
}();

try {
  window.Vaadin = window.Vaadin || {};
  window.Vaadin.usageStatsChecker = window.Vaadin.usageStatsChecker || new UsageStatistics();
  window.Vaadin.usageStatsChecker.maybeGatherAndSend();
} catch (e) {
  // Intentionally ignored as this is not a problem in the app being developed
}

}());

  vaadin-dev-mode:end **/
}

const usageStatistics = function() {
  if (typeof runIfDevelopmentMode === 'function') {
    return runIfDevelopmentMode(maybeGatherAndSendStats);
  }
};

window.Vaadin = window.Vaadin || {};
window.Vaadin.registrations = window.Vaadin.registrations || [];

window.Vaadin.registrations.push({
  is: '@vaadin/router',
  version: '1.7.2',
});

usageStatistics();

Router.NavigationTrigger = {POPSTATE, CLICK};
//# sourceMappingURL=vaadin-router.js.map

var list = [
	"profile-one"
];

const material = css`
  /* fallback */
  @font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2) format('woff2');
  }
  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    vertical-align: sub;
    -webkit-font-smoothing: antialiased;
    background-color: unset !important;
  }
`;

const areaSectionStyles = css`
  .areas {
    display: grid;
    grid-template-columns: 1fr;

    row-gap: 2px;
    column-gap: 10px;

    padding: 0 40px;
  }

  .area-card {
    min-height: 100px;
    padding: 20px 0;
  }

  .area-card.center {
    border-top: 1px solid var(--border-grey);
    border-bottom: 1px solid var(--border-grey);
  }

  .area-title {
    margin-top: 0;
    color: #2196f3;
    letter-spacing: 4px;
    font-weight: 600;
    font-family: 'Raleway';
  }

  @media (min-width: 540px) {
    .area-card {
      padding: 20px 0;
    }
  }

  @media (min-width: 768px) {
    .areas {
      padding: 0px 65px;
      margin: 0;
    }
  }

  @media (min-width: 1136px) {
    .areas {
      grid-template-columns: repeat(3, 1fr);
      padding: 0;
    }

    .area-card {
      padding: 20px 40px;
    }

    .area-card > p {
      font-size: 18px;
    }

    .area-card.center {
      border: none;
      border-left: 1px solid var(--border-grey);
      border-right: 1px solid var(--border-grey);
    }
  }
`;

const technologiesSectionStyles = css`
  .technologies {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2px;
    row-gap: 2px;
    padding: 0 15px 0 15px;
  }

  .tech-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px;
    height: auto;
    background-color: var(--nav-background);
  }

  .card-text {
    text-align: center;
    font-size: 15px;
    letter-spacing: 0.5px;
    line-height: 21px;
  }

  .tech-card > svg {
    width: 130px;
  }

  @media (min-width: 414px) {
    .card-text {
      font-size: 16px;
      line-height: 28px;
    }
  }

  @media (min-width: 540px) {
    .card-text {
      font-size: 18px;
    }

    .technologies {
      margin: 0 20px 0 20px;
    }
  }

  @media (min-width: 768px) {
    .tech-card {
      min-height: 200px;
    }

    .technologies {
      margin: 0 60px 0 60px;
    }

    .card-text {
      padding: 0 80px 0 80px;
    }
  }

  @media (min-width: 1136px) {
    .technologies {
      grid-template-columns: repeat(3, 1fr);
      margin: 0 90px 0 90px;
      padding: 0;
    }

    .card-text {
      line-height: 28px;
      padding: unset;
    }
  }
`;

const footerStyles = css`
  footer {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 30px 40px;
    background-color: var(--header-background);
  }

  .footer-list {
    color: #fff;
    list-style: none;
    margin: 0;
    padding: 0;
    margin: 0 20px;
  }

  .footer-list > li {
    margin: 5px 0;
  }

  .footer-link {
    color: #fff;
    text-decoration: none;
    letter-spacing: 1.3px;
  }

  .footer-link.title {
    color: rgb(179 179 179);
    margin: 15px 0;
    font-weight: 400;
    font-size: 15px;
  }

  .footer-link:hover {
    text-decoration: underline;
  }

  .footer-line {
    width: 100%;
    text-align: center;
    padding-top: 40px;
  }

  .footer-line > a {
    display: inline-block;
    margin: 10px 20px;
  }

  @media (min-width: 540px) {
    footer {
      justify-content: space-around;
    }
  }

  @media (min-width: 768px) {
    footer {
      padding: 30px 100px;
    }
  }

  @media (min-width: 1136px) {
    footer {
      padding: 30px 200px;
    }
  }
`;

const informationSectionStyles = css`
  .information {
    display: flex;
    flex-direction: column;
    padding: 50px 40px 20px 40px;
  }

  .info-text {
    color: #232323;
    font-size: 16px;
    line-height: 1.5;
  }

  .info-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .github_link {
    width: fit-content;
    align-self: center;
    margin: 50px 0;
  }

  .github_link > svg {
    width: 130px;
  }

  .info-icons > button {
    padding: 0;
    margin: 0 5px;
    background-color: transparent;
    border: none;
  }

  .info-icons > button > i {
    font-size: 30px;
  }

  .favourite-red {
    color: #ca6b33;
  }

  .share-purple {
    color: #5e5ea5;
  }

  @media (min-width: 414px) {
    .info-text {
      font-size: 20px;
      line-height: 1.6;
    }
  }

  @media (min-width: 768px) {
    .information {
      padding: 50px 20%;
    }
  }
`;

const mainStyles = css`
  .hall {
    display: flex;
    justify-content: center;
    height: var(--main-height);
  }

  .main-title {
    color: #595859;
    font-size: 40px;
    font-weight: 700;
    font-family: 'Raleway', sans-serif;
    margin-top: 60px;
    margin-bottom: 0;
  }

  .main-icon {
    color: white;
    font-size: 50px;
  }

  .separator-main {
    border-bottom-left-radius: 0;
    margin-bottom: 15px;
    margin-top: 15px;
  }

  cube-component {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .main-container {
    width: 100%;
    padding: 0 30px;
    max-width: 600px;
  }

  @media (min-width: 900px) {
    .main-title {
      margin-top: 130px;
      font-size: 50px;
    }
  }

  @media (min-width: 1240px) {
    .separator-main {
      margin: 30px 0;
    }

    .main-container {
      width: 100%;
      margin: 0 20%;
      padding: 0 120px;
    }

    .main-icon {
      font-size: 70px;
    }
  }
`;

const styles = css`
  :host {
    --header-height: 120px;
    --nav-height: 50px;
    --header-nav-height: calc(var(--header-height) + var(--nav-height));
    --header-scroll-height: 70px;
    --main-height: calc(100vh - var(--header-nav-height));

    --nav-background: rgba(0, 0, 0, 0.05);
    --header-background: rgb(50, 50, 50);
    --border-grey: #c7c4c4;

    display: grid;
    grid-template-rows: var(--header-height) var(--nav-height) auto;
    font-family: 'Open Sans', sans-serif, Arial;
    letter-spacing: 0.4px;
    font-weight: 300;

    position: relative;
    width: 100%;
    height: 100%;
  }

  .section-title {
    font-family: 'Raleway', sans-serif;
    letter-spacing: 6px;
    line-height: 35px;
  }

  .btn-container {
    margin-bottom: 40px;
  }

  .section-title.centered {
    text-align: center;
    margin: 70px 0;
    padding: 0 30px;
  }

  .section-title-decorator {
    color: #339c91;
  }

  .card-decorator {
    color: #066e8e;
  }

  .separator {
    margin: 0;
    border: 0;
    border-bottom: 1px solid #b9b7b7;
    border-bottom-left-radius: 100%;
    border-top-right-radius: 100%;
  }

  .separator.c-sm {
    width: 80px;
    border-bottom-width: 1.4px;
  }

  .separator.c-red {
    border-bottom-color: #dc6260;
  }

  .separator.c-blue {
    border-bottom-color: #60c8dc;
  }

  .separator.c-green {
    border-bottom-color: #c0dc60;
  }

  .separator.centered {
    width: 300px;
    align-self: center;
    margin: 30px 0px;
    border-bottom-width: 2px;
  }

  @media (min-width: 540px) {
    .section-title {
      line-height: unset;
    }
  }
  ${mainStyles}
  ${technologiesSectionStyles}
  ${informationSectionStyles}
  ${areaSectionStyles}
  ${footerStyles}
`;

const html5Svg = svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M108.4 0h23v22.8h21.2V0h23v69h-23V46h-21v23h-23.2M206 23h-20.3V0h63.7v23H229v46h-23M259.5 0h24.1l14.8 24.3L313.2 0h24.1v69h-23V34.8l-16.1 24.8l-16.1-24.8v34.2h-22.6M348.7 0h23v46.2h32.6V69h-55.6"/><path fill="#e44d26" d="M107.6 471l-33-370.4h362.8l-33 370.2L255.7 512"/><path fill="#f16529" d="M256 480.5V131H404.3L376 447"/><path fill="#ebebeb" d="M142 176.3h114v45.4h-64.2l4.2 46.5h60v45.3H154.4M156.4 336.3H202l3.2 36.3 50.8 13.6v47.4l-93.2-26"/><path fill="#fff" d="M369.6 176.3H255.8v45.4h109.6M361.3 268.2H255.8v45.4h56l-5.3 59-50.7 13.6v47.2l93-25.8"/></svg>`;
const css3Svg = svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 0h512v512H0V0z" fill="none"/><path d="M405.5 467.454L269.29 504.13l-136.212-36.676-31.432-340.525h335.29L405.5 467.454z" fill="#2062af"/><path d="M269.289 154.511v320.367l.308.084 110.229-29.682 25.443-290.769h-135.98z" fill="#3c9cd7"/><path d="M191.985 76.899V56.631h29.571V34.453h-51.749v62.684h51.749V76.899h-29.571zm82.766-20.268h20.674V34.453h-51.754v22.178c6.924 6.924 10.535 10.238 20.549 20.252-5.854 0-20.549.021-20.549.02v20.234h51.754V76.899l-20.674-20.268zm73.352 0h20.673V34.453H317.02v22.178c6.924 6.924 10.537 10.238 20.551 20.252-5.852 0-20.551.021-20.551.02v20.234h51.757V76.899l-20.674-20.268z"/><path d="M269.168 239.656l-97.49 40.602 3.233 40.199 94.257-40.301 100.265-42.868 4.157-41.122-104.422 43.49z" fill="#fff"/><linearGradient id="a" gradientUnits="userSpaceOnUse" x1="-825.508" y1="1338.301" x2="-825.508" y2="1419.102" gradientTransform="matrix(1 0 0 -1 1045.93 1658.759)"><stop offset=".387" stop-color="#d1d3d4" stop-opacity="0"/><stop offset="1" stop-color="#d1d3d4"/></linearGradient><path d="M171.677 280.258l3.233 40.199 94.257-40.301v-40.5l-97.49 40.602z" fill="url(#a)"/><linearGradient id="b" gradientUnits="userSpaceOnUse" x1="-724.552" y1="1378.602" x2="-724.552" y2="1462.591" gradientTransform="matrix(1 0 0 -1 1045.93 1658.759)"><stop offset=".387" stop-color="#d1d3d4" stop-opacity="0"/><stop offset="1" stop-color="#d1d3d4"/></linearGradient><path d="M373.59 196.167l-104.422 43.489v40.5l100.265-42.868 4.157-41.121z" fill="url(#b)"/><linearGradient id="c" gradientUnits="userSpaceOnUse" x1="-874.103" y1="1302.263" x2="-680.039" y2="1302.263" gradientTransform="matrix(1 0 0 -1 1045.93 1658.759)"><stop offset="0" stop-color="#e8e7e5"/><stop offset="1" stop-color="#fff"/></linearGradient><path d="M171.827 280.258l3.234 40.199 144.625.461-3.235 53.598-47.59 13.398-45.748-11.551-2.772-33.268h-42.508l5.545 64.225 85.945 25.412 85.479-24.951 11.09-127.523H171.827z" fill="url(#c)"/><path d="M269.168 280.258h-97.49l3.233 40.199 94.257.301v-40.5zm0 107.528l-.462.129-45.742-11.551-2.772-33.268h-42.507l5.544 64.225 85.939 25.412v-44.947z" opacity=".05"/><linearGradient id="d" gradientUnits="userSpaceOnUse" x1="-883.032" y1="1442.031" x2="-672.341" y2="1442.031" gradientTransform="matrix(1 0 0 -1 1045.93 1658.759)"><stop offset="0" stop-color="#e8e7e5"/><stop offset="1" stop-color="#fff"/></linearGradient><path d="M162.898 196.167H373.59l-4.157 41.122H167.98l-5.082-41.122z" fill="url(#d)"/><path d="M269.168 196.167h-106.27l5.082 41.122h101.188v-41.122z" opacity=".05"/></svg>`;
const jsSvg = svg`<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet"><path d="M0 0h512v512H0V0z" fill="#F7DF1E"/><path d="M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.967-36.087-21.996M152.381 211.354l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257 0-18.044 13.747-31.792 35.228-31.792 15.294 0 26.292 5.328 34.196 19.247L210.29 147.43c-4.125-7.389-8.591-10.31-15.465-10.31-7.046 0-11.514 4.468-11.514 10.31 0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.819-24.574"/></svg>`;
const githubSvg = svg`<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg width="512px" height="100%" viewBox="0 0 512 139" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid"><g><path d="M98.6961598,59.3124474 L55.6354962,59.3124474 C54.5247282,59.3124474 53.623096,60.2151464 53.623096,61.3259144 L53.623096,82.3792882 C53.623096,83.4900562 54.5247282,84.3938224 55.6354962,84.3938224 L72.4335936,84.3938224 L72.4335936,110.550753 C72.4335936,110.550753 68.6616775,111.836513 58.2336902,111.836513 C45.930948,111.836513 28.744455,107.341157 28.744455,69.5494382 C28.744455,31.7491835 46.6405165,26.7758029 63.4418154,26.7758029 C77.9852995,26.7758029 84.2508415,29.336651 88.2372288,30.5701264 C89.4899103,30.9542537 90.648694,29.706907 90.648694,28.5950722 L95.4524188,8.25340062 C95.4524188,7.73376182 95.2763603,7.10742103 94.6830971,6.68167999 C93.0644278,5.52716422 83.1870225,-1.42108547e-14 58.2336902,-1.42108547e-14 C29.487101,-1.42108547e-14 0,12.2301846 0,71.022993 C0,129.817935 33.7605165,138.579238 62.2094068,138.579238 C85.7649432,138.579238 100.054476,128.51297 100.054476,128.51297 C100.643471,128.187529 100.707493,127.364856 100.707493,126.987131 L100.707493,61.3259144 C100.707493,60.2151464 99.8069278,59.3124474 98.6961598,59.3124474 Z M320.495497,7.35923776 C320.495497,6.23886664 319.607737,5.33510059 318.496969,5.33510059 L294.251072,5.33510059 C293.143503,5.33510059 292.24294,6.23886664 292.24294,7.35923776 C292.24294,7.36457288 292.24934,54.215292 292.24934,54.215292 L254.456556,54.215292 L254.456556,7.35923776 C254.456556,6.23886664 253.564526,5.33510059 252.455893,5.33510059 L228.211061,5.33510059 C227.107764,5.33510059 226.208265,6.23886664 226.208265,7.35923776 L226.208265,134.231131 C226.208265,135.350435 227.107764,136.26167 228.211061,136.26167 L252.455893,136.26167 C253.564526,136.26167 254.456556,135.350435 254.456556,134.231131 L254.456556,79.9635547 L292.24934,79.9635547 C292.24934,79.9635547 292.183187,134.226863 292.183187,134.231131 C292.183187,135.350435 293.082684,136.26167 294.191317,136.26167 L318.494835,136.26167 C319.605604,136.26167 320.493364,135.350435 320.495497,134.231131 L320.495497,7.35923776 Z M144.371023,24.3216565 C144.371023,15.591298 137.371371,8.53616094 128.735977,8.53616094 C120.10912,8.53616094 113.104133,15.591298 113.104133,24.3216565 C113.104133,33.042412 120.10912,40.1167554 128.735977,40.1167554 C137.371371,40.1167554 144.371023,33.042412 144.371023,24.3216565 Z M142.447186,107.534288 L142.447186,48.9698214 C142.447186,47.8579864 141.549822,46.9488852 140.441188,46.9488852 L116.272115,46.9488852 C115.163481,46.9488852 114.171153,48.0927309 114.171153,49.2045657 L114.171153,133.109693 C114.171153,135.575576 115.707662,136.308619 117.696587,136.308619 L139.472334,136.308619 C141.861392,136.308619 142.447186,135.135964 142.447186,133.070213 L142.447186,107.534288 Z M413.161929,46.9488852 L389.10169,46.9488852 C387.998389,46.9488852 387.099963,47.8579864 387.099963,48.9772906 L387.099963,111.186697 C387.099963,111.186697 380.988068,115.658579 372.312128,115.658579 C363.637256,115.658579 361.334627,111.722341 361.334627,103.227794 L361.334627,48.9772906 C361.334627,47.8579864 360.43833,46.9488852 359.333962,46.9488852 L334.915206,46.9488852 C333.812978,46.9488852 332.910277,47.8579864 332.910277,48.9772906 L332.910277,107.335822 C332.910277,132.566579 346.972537,138.739291 366.317608,138.739291 C382.1874,138.739291 394.983106,129.971587 394.983106,129.971587 C394.983106,129.971587 395.592374,134.591784 395.867664,135.140232 C396.144024,135.686546 396.862125,136.238196 397.63785,136.238196 L413.172597,136.169906 C414.274829,136.169906 415.177528,135.258671 415.177528,134.144702 L415.170059,48.9772906 C415.170059,47.8579864 414.27056,46.9488852 413.161929,46.9488852 Z M468.596822,115.706595 C460.251661,115.452644 454.591116,111.665789 454.591116,111.665789 L454.591116,71.4882139 C454.591116,71.4882139 460.175898,68.0652134 467.027235,67.4527437 C475.691441,66.6770202 484.039804,69.2944203 484.039804,89.9626002 C484.039804,111.757553 480.272156,116.058711 468.596822,115.706595 Z M478.086899,44.2237159 C464.421573,44.2237159 455.12676,50.3206689 455.12676,50.3206689 L455.12676,7.35923776 C455.12676,6.23886664 454.231532,5.33510059 453.126097,5.33510059 L428.811913,5.33510059 C427.706479,5.33510059 426.808048,6.23886664 426.808048,7.35923776 L426.808048,134.231131 C426.808048,135.350435 427.706479,136.26167 428.815112,136.26167 L445.684702,136.26167 C446.444417,136.26167 447.019542,135.870074 447.444215,135.18398 C447.863555,134.502154 448.468557,129.334575 448.468557,129.334575 C448.468557,129.334575 458.41105,138.756363 477.232216,138.756363 C499.328069,138.756363 512,127.548384 512,88.4410293 C512,49.3336752 491.761829,44.2237159 478.086899,44.2237159 Z M212.229235,46.731213 L194.041876,46.731213 C194.041876,46.731213 194.014134,22.7093892 194.014134,22.704054 C194.014134,21.7949529 193.545712,21.3404024 192.494697,21.3404024 L167.709954,21.3404024 C166.746435,21.3404024 166.22893,21.7640094 166.22893,22.6901829 L166.22893,47.5197408 C166.22893,47.5197408 153.808816,50.5180675 152.969071,50.760281 C152.132527,51.0024947 151.516857,51.77395 151.516857,52.6937215 L151.516857,68.2967567 C151.516857,69.4192619 152.413154,70.3240948 153.521788,70.3240948 L166.22893,70.3240948 L166.22893,107.859729 C166.22893,135.739897 185.785275,138.478938 198.98218,138.478938 C205.011911,138.478938 212.224966,136.542296 213.41576,136.102684 C214.135999,135.838063 214.554271,135.092216 214.554271,134.283415 L214.574544,117.119329 C214.574544,116.000025 213.629165,115.094125 212.564279,115.094125 C211.504728,115.094125 208.79343,115.525201 206.002106,115.525201 C197.069013,115.525201 194.041876,111.371292 194.041876,105.994577 C194.041876,100.622131 194.04081,70.3240948 194.04081,70.3240948 L212.229235,70.3240948 C213.337868,70.3240948 214.235233,69.4192619 214.235233,68.2967567 L214.235233,48.7532162 C214.235233,47.633912 213.337868,46.731213 212.229235,46.731213 Z" fill="#11110F"></path></g></svg>`;
const logo = svg`
    <svg class="logo" width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.7 1.1732C11.8856 1.06603 12.1144 1.06603 12.3 1.17321L21.2263 6.3268C21.4119 6.43397 21.5263 6.63205 21.5263 6.84641V17.1536C21.5263 17.3679 21.4119 17.566 21.2263 17.6732L12.3 22.8268C12.1144 22.934 11.8856 22.934 11.7 22.8268L2.77372 17.6732C2.58808 17.566 2.47372 17.3679 2.47372 17.1536V6.84641C2.47372 6.63205 2.58808 6.43397 2.77372 6.32679L11.7 1.1732Z" stroke="#07f5cc" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
`;

const github = svg`<svg xmlns="http://www.w3.org/2000/svg" class="github-icon" width="24" height="100%" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 6c-3.313 0-6 2.686-6 6 0 2.651 1.719 4.9 4.104 5.693.3.056.396-.13.396-.289v-1.117c-1.669.363-2.017-.707-2.017-.707-.272-.693-.666-.878-.666-.878-.544-.373.041-.365.041-.365.603.042.92.619.92.619.535.917 1.403.652 1.746.499.054-.388.209-.652.381-.802-1.333-.152-2.733-.667-2.733-2.965 0-.655.234-1.19.618-1.61-.062-.153-.268-.764.058-1.59 0 0 .504-.161 1.65.615.479-.133.992-.199 1.502-.202.51.002 1.023.069 1.503.202 1.146-.776 1.648-.615 1.648-.615.327.826.121 1.437.06 1.588.385.42.617.955.617 1.61 0 2.305-1.404 2.812-2.74 2.96.216.186.412.551.412 1.111v1.646c0 .16.096.347.4.288 2.383-.793 4.1-3.041 4.1-5.691 0-3.314-2.687-6-6-6z"/></svg>`;
const info = svg`<svg xmlns="http://www.w3.org/2000/svg" fill="#588f88" viewBox="0 0 24 24" width="24" height="100%"><path d="M0 0h24v24H0z" fill="none"/><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>`;
const spinner = svg`
<svg width="38" height="100%" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="grey">
    <g fill="none" fill-rule="evenodd">
        <g transform="translate(1 1)" stroke-width="2">
            <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
            <path d="M36 18c0-9.94-8.06-18-18-18">
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 18 18"
                    to="360 18 18"
                    dur="1s"
                    repeatCount="indefinite"/>
            </path>
        </g>
    </g>
</svg>
`;

const storybook = svg`
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="300px" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 103"><defs><path d="M3.176 94.358L.004 9.835a5.148 5.148 0 0 1 4.823-5.331L76.72.01a5.148 5.148 0 0 1 5.47 5.139v92.103a5.148 5.148 0 0 1-5.38 5.143L8.09 99.308a5.148 5.148 0 0 1-4.914-4.95z" id="IconifyId-175ec012d06-e886a9-6"/></defs><path d="M136.397 81.057c-4.37 0-8.574-.587-12.616-1.761c-4.041-1.174-7.4-2.799-10.076-4.874l4.096-9.093c5.57 3.877 11.824 5.816 18.76 5.816c3.604 0 6.376-.587 8.315-1.761c1.938-1.175 2.908-2.8 2.908-4.875c0-1.856-.888-3.304-2.663-4.341c-1.775-1.038-4.929-2.048-9.461-3.031c-5.08-1.038-9.135-2.294-12.166-3.769c-3.03-1.474-5.242-3.29-6.635-5.447c-1.393-2.158-2.09-4.82-2.09-7.988c0-3.495.97-6.608 2.91-9.338c1.938-2.731 4.655-4.875 8.15-6.431c3.495-1.557 7.537-2.335 12.124-2.335c4.096 0 8.042.6 11.838 1.802c3.795 1.202 6.813 2.813 9.052 4.834l-4.096 9.093c-5.298-3.878-10.868-5.817-16.712-5.817c-3.331 0-5.953.642-7.864 1.926c-1.912 1.283-2.867 3.044-2.867 5.283c0 1.311.368 2.39 1.106 3.236c.737.847 1.966 1.598 3.686 2.253s4.164 1.338 7.332 2.048c7.427 1.638 12.766 3.741 16.015 6.308c3.25 2.567 4.874 6.117 4.874 10.65c0 5.46-2.102 9.762-6.307 12.902c-4.206 3.14-10.077 4.71-17.613 4.71zm53.575-9.175a33.03 33.03 0 0 0 3.933-.246l-.656 9.012a34.734 34.734 0 0 1-4.751.327c-6.117 0-10.581-1.338-13.394-4.014c-2.813-2.676-4.219-6.744-4.219-12.206v-15.4h-7.618v-9.258h7.618V28.301h12.37v11.796h10.076v9.257h-10.076v15.32c0 4.805 2.24 7.208 6.717 7.208zm28.754 9.093c-4.26 0-8-.86-11.223-2.58c-3.222-1.72-5.707-4.15-7.454-7.291c-1.748-3.14-2.622-6.84-2.622-11.1s.874-7.96 2.622-11.1c1.747-3.14 4.232-5.557 7.454-7.25c3.223-1.693 6.964-2.54 11.223-2.54c4.26 0 8.001.847 11.223 2.54c3.223 1.693 5.708 4.11 7.455 7.25c1.748 3.14 2.622 6.84 2.622 11.1s-.874 7.96-2.622 11.1c-1.747 3.14-4.232 5.57-7.455 7.29c-3.222 1.721-6.963 2.581-11.223 2.581zm0-9.42c6.008 0 9.012-3.85 9.012-11.551c0-3.878-.779-6.772-2.335-8.684c-1.557-1.911-3.782-2.867-6.677-2.867c-6.007 0-9.01 3.85-9.01 11.55c0 7.701 3.003 11.552 9.01 11.552zm55.542-22.283l-6.963.738c-3.44.327-5.871 1.297-7.29 2.908c-1.42 1.61-2.13 3.754-2.13 6.43V80.32h-12.37V40.097h11.878v6.8c2.02-4.643 6.198-7.182 12.533-7.619l3.605-.246l.737 10.24zm35.943-9.093h12.124l-24.249 54.887h-12.533l7.7-16.958l-16.548-37.929h12.862l10.158 25.56l10.486-25.56zm40.796-1.065c3.495 0 6.58.847 9.257 2.54c2.676 1.693 4.765 4.11 6.267 7.25c1.501 3.14 2.252 6.785 2.252 10.936c0 4.15-.75 7.823-2.252 11.018c-1.502 3.195-3.605 5.68-6.308 7.455c-2.704 1.775-5.776 2.662-9.216 2.662c-2.786 0-5.298-.587-7.537-1.76c-2.24-1.175-3.96-2.8-5.16-4.875v5.98h-12.207V22.566h12.37v22.938c1.201-2.02 2.908-3.59 5.12-4.71s4.683-1.68 7.414-1.68zm-3.605 32.44c2.895 0 5.134-1.023 6.718-3.071c1.583-2.048 2.375-4.93 2.375-8.643c0-3.66-.792-6.458-2.375-8.397c-1.584-1.939-3.823-2.908-6.718-2.908c-2.894 0-5.133.997-6.717 2.99c-1.584 1.994-2.376 4.82-2.376 8.479c0 3.714.792 6.567 2.376 8.56c1.584 1.994 3.823 2.99 6.717 2.99zm48.251 9.421c-4.26 0-8-.86-11.223-2.58c-3.222-1.72-5.707-4.15-7.455-7.291c-1.747-3.14-2.621-6.84-2.621-11.1s.874-7.96 2.621-11.1c1.748-3.14 4.233-5.557 7.455-7.25c3.222-1.693 6.963-2.54 11.223-2.54c4.26 0 8.001.847 11.223 2.54c3.222 1.693 5.707 4.11 7.455 7.25c1.748 3.14 2.621 6.84 2.621 11.1s-.873 7.96-2.621 11.1c-1.748 3.14-4.233 5.57-7.455 7.29c-3.222 1.721-6.963 2.581-11.223 2.581zm0-9.42c6.008 0 9.011-3.85 9.011-11.551c0-3.878-.778-6.772-2.334-8.684c-1.557-1.911-3.782-2.867-6.677-2.867c-6.007 0-9.011 3.85-9.011 11.55c0 7.701 3.004 11.552 9.011 11.552zm46.121 9.42c-4.26 0-8-.86-11.223-2.58c-3.222-1.72-5.707-4.15-7.455-7.291c-1.747-3.14-2.621-6.84-2.621-11.1s.874-7.96 2.621-11.1c1.748-3.14 4.233-5.557 7.455-7.25c3.222-1.693 6.963-2.54 11.223-2.54c4.26 0 8 .847 11.223 2.54c3.222 1.693 5.707 4.11 7.455 7.25c1.747 3.14 2.621 6.84 2.621 11.1s-.874 7.96-2.621 11.1c-1.748 3.14-4.233 5.57-7.455 7.29c-3.222 1.721-6.963 2.581-11.223 2.581zm0-9.42c6.008 0 9.011-3.85 9.011-11.551c0-3.878-.778-6.772-2.334-8.684c-1.557-1.911-3.782-2.867-6.677-2.867c-6.007 0-9.011 3.85-9.011 11.55c0 7.701 3.004 11.552 9.011 11.552zM512 80.32h-15.155l-15.401-17.94v17.94h-12.37V22.566h12.37V57.3l14.827-17.12h14.746l-16.876 19.168L512 80.32z" fill="#333"/><mask id="IconifyId-175ec012d06-e886a9-7" fill="#fff"><use xlink:href="#IconifyId-175ec012d06-e886a9-6"/></mask><use fill="#FF4785" xlink:href="#IconifyId-175ec012d06-e886a9-6"/><path d="M60.691 12.587L61.182.776L71.055 0l.425 12.18a.768.768 0 0 1-1.242.63l-3.808-3l-4.508 3.42a.768.768 0 0 1-1.231-.643zM48.064 38.596c0 2.003 13.492 1.043 15.304-.364c0-13.64-7.32-20.808-20.722-20.808c-13.402 0-20.911 7.28-20.911 18.198c0 19.017 25.664 19.381 25.664 29.754c0 2.912-1.426 4.64-4.563 4.64c-4.087 0-5.703-2.087-5.513-9.184c0-1.54-15.588-2.02-16.063 0c-1.21 17.199 9.505 22.16 21.767 22.16c11.881 0 21.196-6.333 21.196-17.798c0-20.382-26.044-19.836-26.044-29.936c0-4.094 3.042-4.64 4.848-4.64c1.9 0 5.322.335 5.037 7.978z" fill="#FFF" mask="url(#IconifyId-175ec012d06-e886a9-7)"/></svg>
`;

const googleFont = css`
    /* cyrillic-ext */
@font-face {
  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Ubuntu Regular'), local('Ubuntu-Regular'), url(https://fonts.gstatic.com/s/ubuntu/v14/4iCs6KVjbNBYlgoKcg72nU6AF7xm.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Ubuntu Regular'), local('Ubuntu-Regular'), url(https://fonts.gstatic.com/s/ubuntu/v14/4iCs6KVjbNBYlgoKew72nU6AF7xm.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Ubuntu Regular'), local('Ubuntu-Regular'), url(https://fonts.gstatic.com/s/ubuntu/v14/4iCs6KVjbNBYlgoKcw72nU6AF7xm.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Ubuntu Regular'), local('Ubuntu-Regular'), url(https://fonts.gstatic.com/s/ubuntu/v14/4iCs6KVjbNBYlgoKfA72nU6AF7xm.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* latin-ext */
@font-face {
  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Ubuntu Regular'), local('Ubuntu-Regular'), url(https://fonts.gstatic.com/s/ubuntu/v14/4iCs6KVjbNBYlgoKcQ72nU6AF7xm.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Ubuntu Regular'), local('Ubuntu-Regular'), url(https://fonts.gstatic.com/s/ubuntu/v14/4iCs6KVjbNBYlgoKfw72nU6AFw.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

`;

const materialIcons = css`
    /* fallback */
    @font-face {
      font-family: 'Material Icons';
      font-style: normal;
      font-weight: 400;
      src: url(https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2) format('woff2');
    }

    .material-icons {
      font-family: 'Material Icons';
      font-weight: normal;
      font-style: normal;
      font-size: 24px;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;
      vertical-align: sub;
      -webkit-font-smoothing: antialiased;
      background-color: unset !important;
    }

`;

const seedColors = css`
  :host, html {
    --seed-color-white: white;
    --seed-color-white-focus: rgba(255, 255, 255, .2);
    --seed-color-white-hover: #dedede;

    --seed-color-red: #de3d4c;
    --seed-color-red-focus: #ff00184d;
    --seed-color-red-hover: #bb3440;

    --seed-color-green: #22ac41;
    --seed-color-green-focus: #7fc72a45;
    --seed-color-green-hover: #199936;

    --seed-color-blue: #2dabb4;
    --seed-color-blue-focus: #2dabb445;
    --seed-color-blue-hover: #239aa3;

    --seed-color-yellow: #e6af0e;
    --seed-color-yellow-focus: #c89a0c3d;
    --seed-color-yellow-hover: #d5a927;

    --seed-color-purple: #903e8d;
    --seed-color-purple-focus: #903e8d5e;
    --seed-color-purple-hover: #663564;

    --seed-color-black: #2f2d2d;
    --seed-color-black-focus: #43434387;
    --seed-color-black-hover: #434343;

    --seed-color-orange: #d58309;
    --seed-color-orange-focus: #e09e2057;
    --seed-color-orange-hover: #b46e06;

    --seed-color-green-mate: #1C8281;
    --seed-color-green-mate-focus: #2dabb445;
    --seed-color-green-mate-hover: rgb(51, 121, 120);

    --seed-color-red-mate: #bf4545;
    --seed-color-red-mate-focus: #ff00184d;
    --seed-color-red-mate-hover: rgb(176, 63, 63);

    --seed-color-blue-mate: #3f76b6;
    --seed-color-blue-mate-focus: #2dabb445;
    --seed-color-blue-mate-hover: rgb(53, 98, 149);
  }
`;

const dropDown = css`
  .dropdown-links > a {
    color: #483f3f;
    text-decoration: none;
    
    display: flex;
    align-items: center;
    padding: 8px;
    padding-left: 20px;
    padding-right: 50px;
  }

  .dropdown-links > a:hover {
    background-color: #f9f9f9;
  }

  .dropdown-links > a > i{
    margin-right: 15px;
  }
`;

const seedInput = css`
  .sd-input-submit, .sd-input-icon, .sd-input-label {
    width: fit-content;
    display: flex;
    justify-content: flex-start;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .sd-input-submit > input[type=text], .sd-input-submit > input[type=password], 
  .sd-input-icon > input[type=text], .sd-input-icon > input[type=password],
  .sd-input-label > input[type=text], .sd-input-label > input[type=password] {
    border-radius: 0px;
    padding: 0 10px;
    margin: 0;
  }

  .sd-input-submit > input,
  .sd-input-submit > button,
  .sd-input-icon > button,
  .sd-input-icon > div {
    border: none;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    margin: 0;
  }

  .sd-input-icon > div, .sd-input-label > div {
    -webkit-cursor: auto;
    cursor: auto;
  }

  .sd-input-icon.left > div.sd-icon {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;

    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  .sd-input-label > div.sd-btn {
    border-radius: 0px;
  }

  .sd-input-label > div:first-child {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  .sd-input-label > div:last-child {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .sd-input-icon > input,
  .sd-input-label > input,
  .sd-input-icon.left > input {
    border: none; 
  }

  .sd-input-icon:hover > div.sd-icon,
  .sd-input-label:hover > div.sd-btn {
    outline: 0px solid transparent;
  }

  .sd-input-icon:hover > div.sd-icon.red,
  .sd-input-label:hover > div.sd-btn.red { background-color: var(--seed-color-red); }
  .sd-input-icon:hover > div.sd-icon.green,
  .sd-input-label:hover > div.sd-btn.green { background-color: var(--seed-color-green); }
  .sd-input-icon:hover > div.sd-icon.blue,
  .sd-input-label:hover > div.sd-btn.blue { background-color: var(--seed-color-blue); }
  .sd-input-icon:hover > div.sd-icon.yellow,
  .sd-input-label:hover > div.sd-btn.yellow { background-color: var(--seed-color-yellow); }
  .sd-input-icon:hover > div.sd-icon.black,
  .sd-input-label:hover > div.sd-btn.black { background-color: var(--seed-color-black); }
  .sd-input-icon:hover > div.sd-icon.purple,
  .sd-input-label:hover > div.sd-btn.purple { background-color: var(--seed-color-purple); }
  .sd-input-icon:hover > div.sd-icon.orange,
  .sd-input-label:hover > div.sd-btn.orange { background-color: var(--seed-color-orange); }
  .sd-input-icon:hover > div.sd-icon.green-mate,
  .sd-input-label:hover > div.sd-btn.green-mate { background-color: var(--seed-color-green-mate); }
  .sd-input-icon:hover > div.sd-icon.blue-mate,
  .sd-input-label:hover > div.sd-btn.blue-mate { background-color: var(--seed-color-blue-mate); }
  .sd-input-icon:hover > div.sd-icon.red-mate,
  .sd-input-label:hover > div.sd-btn.red-mate { background-color: var(--seed-color-red-mate); }
`;

const seedStyle = css`
  ${googleFont}
  ${materialIcons}
  ${dropDown}
  ${seedColors}
  ${seedInput}
  
  .sd-btn, .sd-icon, .sd-btn-mix, .sd-btn-mixr {
    font-family: 'Ubuntu', sans-serif;
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    width: min-content; /*fit-content*/
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    background-color: var(--seed-color-white);
    transition: background-color .1s;
    text-decoration: none;
    cursor: pointer;
  }

  /* Button Group Class */
  .sd-btn-group {
    display: flex;
    width: fit-content;
  }

  .sd-btn-group > .sd-btn,
  .sd-btn-group > .sd-btn-mix,
  .sd-btn-group > .sd-btn-mixr,
  .sd-btn-group > .sd-icon {
    margin: 0;
    border-radius: 0;
  }

  .sd-btn-group > .sd-btn:first-child,
  .sd-btn-group > .sd-btn-mix:first-child,
  .sd-btn-group > .sd-btn-mixr:first-child,
  .sd-btn-group > .sd-icon:first-child {
    border-top-left-radius: .25rem;
    border-bottom-left-radius: .25rem;
  }

  .sd-btn-group > .sd-btn:last-child,
  .sd-btn-group > .sd-btn-mix:last-child,
  .sd-btn-group > .sd-btn-mixr:last-child,
  .sd-btn-group > .sd-icon:last-child {
    border-top-right-radius: .25rem;
    border-bottom-right-radius: .25rem;
  }
  
  /* sd-btn [class="sd-btn"] */
  .sd-btn-mix, .sd-btn-mixr {
    padding: .2rem .75rem;
    vertical-align: baseline;
  }

  /*** ICON ***/
  .sd-icon {
    display: inline-block;
    font-size: 1rem;
    padding: .4rem .6rem;
    line-height: 1;
  }

  button:focus, button:active { outline: 4px solid var(--seed-color-white-focus);}
  button:hover, button:hover:enabled { background-color: var(--seed-color-white-hover); }

  .sd-btn:disabled, .sd-btn-mix:disabled, .sd-btn-mixr:disabled, .sd-icon:disabled { opacity: .8; }

  .clear:hover, .clear.red:active, .clear:hover:enabled {
    background-color: unset;
  }

  button:disabled > i {
    pointer-events: none;
  }

  /*** WHITE ***/
  .white { color: white; }

  /*** RED ***/
  .red { background-color: var(--seed-color-red); color: var(--seed-color-white); }
  .red:focus, .red:active, .clear:focus > .red, .clear:active > .red { outline: 4px solid var(--seed-color-red-focus); }
  .red:hover, .red:hover:enabled { background-color: var(--seed-color-red-hover); }
  .red:hover:disabled { background-color: var(--seed-color-red); }

  /*** GREEN ***/
  .green { background-color: var(--seed-color-green); color: var(--seed-color-white); }
  .green:focus, .green:active, .clear:focus .green, .clear:active .green { outline: 4px solid var(--seed-color-green-focus); }
  .green:hover, .green:hover:enabled { background-color: var(--seed-color-green-hover); }
  .green:hover:disabled { background-color: var(--seed-color-green); }

  /*** BLUE ***/
  .blue { background-color: var(--seed-color-blue); color: var(--seed-color-white); }
  .blue:focus, .blue:active, .clear:focus .blue, .clear:active .blue { outline: 4px solid var(--seed-color-blue-focus); }
  .blue:hover, .blue:hover:enabled { background-color: var(--seed-color-blue-hover); }
  .blue:hover:disabled { background-color: var(--seed-color-blue); }

  /*** YELLOW ***/
  .yellow { background-color: var(--seed-color-yellow); color: var(--seed-color-black-hover);}
  .yellow:focus, .yellow:active, .clear:focus .yellow, .clear:active .yellow { outline: 4px solid var(--seed-color-yellow-focus); }
  .yellow:hover, .yellow:hover:enabled { background-color: var(--seed-color-yellow-hover); }
  .yellow:hover:disabled { background-color: var(--seed-color-yellow); }

  /*** PURPLE ***/
  .purple { background-color: var(--seed-color-purple); color: var(--seed-color-white); }
  .purple:focus, .purple:active, .clear:focus .purple, .clear:active .purple { outline: 4px solid var(--seed-color-purple-focus); }
  .purple:hover, .purple:hover:enabled { background-color: var(--seed-color-purple-hover); }
  .purple:hover:disabled { background-color: var(--seed-color-purple); }

  /*** BLACK ***/
  .black { background-color: var(--seed-color-black); color: var(--seed-color-white); }
  .black:focus, .black:active, .clear:focus .black, .clear:active .black { outline: 4px solid var(--seed-color-black-focus); }
  .black:hover, .black:hover:enabled { background-color: var(--seed-color-black-hover); }
  .black:hover:disabled { background-color: var(--seed-color-black); }

  /*** ORANGE ***/
  .orange { background-color: var(--seed-color-orange); color: var(--seed-color-white); }
  .orange:focus, .orange:active, .clear:focus .orange, .clear:active .orange { outline: 4px solid var(--seed-color-orange-focus); }
  .orange:hover, .orange:hover:enabled { background-color: var(--seed-color-orange-hover); }
  .orange:hover:disabled { background-color: var(--seed-color-orange); }

  /*** GREEN MATE ***/
  .green-mate { background-color: var(--seed-color-green-mate); color: var(--seed-color-white); }
  .green-mate:focus, .green-mate:active, .clear:focus .green-mate, .clear:active .green-mate { outline: 4px solid var(--seed-color-green-mate-focus); }
  .green-mate:hover, .green-mate:hover:enabled { background-color: var(--seed-color-green-mate-hover); }
  .green-mate:hover:disabled { background-color: var(--seed-color-green-mate); }

  /*** RED MATE ***/
  .red-mate { background-color: var(--seed-color-red-mate); color: var(--seed-color-white); }
  .red-mate:focus, .red-mate:active, .clear:focus .red-mate, .clear:active .red-mate { outline: 4px solid var(--seed-color-red-mate-focus); }
  .red-mate:hover, .red-mate:hover:enabled { background-color: var(--seed-color-red-mate-hover); }
  .red-mate:hover:disabled { background-color: var(--seed-color-red-mate); }

  /*** BLUE MATE ***/
  .blue-mate { background-color: var(--seed-color-blue-mate); color: var(--seed-color-white); }
  .blue-mate:focus, .blue-mate:active, .clear:focus .blue-mate, .clear:active .blue-mate { outline: 4px solid var(--seed-color-blue-mate-focus); }
  .blue-mate:hover, .blue-mate:hover:enabled { background-color: var(--seed-color-blue-mate-hover); }
  .blue-mate:hover:disabled { background-color: var(--seed-color-blue-mate); }


  /*** SIZES ***/
  .sm { font-size: .8rem; padding: .180rem .30rem; }
  .lg { font-size: 1.2rem; padding: .400rem .90rem; }


  /*** ICON ***/
  .sm > i { font-size: .9rem; font-weight: bold; }
  .lg > i { font-size: 23px; }

  .sd-icon.lg {
    padding: .1rem .4rem;
  }

  .sd-icon.lg > i{
    font-size: 35px;
    padding: 0;
  }

  /*** CIRCLE ***/
  .circle {
    width: 2.1rem;
    height: 2.1rem;
    border-radius: 100%;
    padding: 0;
  }

  .circle.sm {
    width: 1.5rem;
    height: 1.5rem;
  }

  .circle.lg {
    width: 3rem;
    height: 3rem;
  }

  .circle.lg > .material-icons{
    font-size: 1.8rem;
  }

  .circle.sm > i {
    font-size: 13px;
  }

  /*** MIX ***/
  .sd-btn-mix > i, .sd-btn-mixr > i {
    font-size: 20px;
  }

  .sd-btn-mix.sm > i, .sd-btn-mixr.sm > i {
    font-size: 15px;
  }

  .sd-btn-mix > * { margin-right: 5px; }
  .sd-btn-mixr > * { margin-left: 5px; }

  /*** ICONS COLORS ***/
  i.red { color: var(--seed-color-red); }
  i.green { color: var(--seed-color-green); }
  i.blue { color: var(--seed-color-blue); }
  i.yellow { color: var(--seed-color-yellow); }
  i.purple { color: var(--seed-color-purple); }
  i.black { color: var(--seed-color-black); }
  i.orange { color: var(--seed-color-orange); }
  i.green-mate { color: var(--seed-color-green-mate); }
  i.red-mate { color: var(--seed-color-red-mate); }
  i.blue-mate { color: var(--seed-color-blue-mate); }
  
  i.lg { font-size: 2.5rem; padding: 0; }
  i.sm { font-size: 1rem; padding: 0; }

  button > .material-icons:active { outline: none; }

  .yellow > i { color: var(--seed-color-black-hover); }

  .material-icons:focus, .material-icons:active { outline: 0px; }

  input[type=submit] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  /* sd-btn clear color */
  .sd-icon.clear {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    outline: none;
    cursor: pointer;
  }

  .sd-btn.clear, .sd-btn.clear:hover,
  .sd-btn-mix.clear, .sd-btn-mix.clear:hover,
  .sd-btn-mixr.clear, .sd-btn-mixr.clear:hover {
    background-color: transparent;
  }

  .sd-btn.clear.red, .sd-btn-mix.clear.red, .sd-btn-mixr.clear.red { color: var(--seed-color-red); border: 2px solid var(--seed-color-red); }
  .sd-btn.clear.blue, .sd-btn-mix.clear.blue, .sd-btn-mixr.clear.blue { color: var(--seed-color-blue); border: 2px solid var(--seed-color-blue); }
  .sd-btn.clear.green, .sd-btn-mix.clear.green, .sd-btn-mixr.clear.green { color: var(--seed-color-green); border: 2px solid var(--seed-color-green); }
  .sd-btn.clear.yellow, .sd-btn-mix.clear.yellow, .sd-btn-mixr.clear.yellow { color: var(--seed-color-yellow); border: 2px solid var(--seed-color-yellow); }
  .sd-btn.clear.purple, .sd-btn-mix.clear.purple, .sd-btn-mixr.clear.purple { color: var(--seed-color-purple); border: 2px solid var(--seed-color-purple); }
  .sd-btn.clear.orange, .sd-btn-mix.clear.orange, .sd-btn-mixr.clear.orange { color: var(--seed-color-orange); border: 2px solid var(--seed-color-orange); }
  .sd-btn.clear.black, .sd-btn-mix.clear.black, .sd-btn-mixr.clear.black { color: var(--seed-color-black); border: 2px solid var(--seed-color-black); }
  .sd-btn.clear.red-mate, .sd-btn-mix.clear.red-mate, .sd-btn-mixr.clear.red-mate { color: var(--seed-color-red-mate); border: 2px solid var(--seed-color-red-mate); }
  .sd-btn.clear.green-mate, .sd-btn-mix.clear.green-mate, .sd-btn-mixr.clear.green-mate { color: var(--seed-color-green-mate); border: 2px solid var(--seed-color-green-mate); }
  .sd-btn.clear.blue-mate, .sd-btn-mix.clear.blue-mate, .sd-btn-mixr.clear.blue-mate { color: var(--seed-color-blue-mate); border: 2px solid var(--seed-color-blue-mate); }

  .sd-btn.clear.yellow > i, .sd-btn-mix.clear.yellow > i, .sd-btn-mixr.clear.yellow > i { color: var(--seed-color-yellow); }
`;

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const navList = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Profiles',
    path: '/profiles',
  },
  {
    name: 'Data Binding',
    path: '/data-binding',
  },
  {
    name: 'Searcher',
    path: '/searcher',
  },
  {
    name: 'Validation',
    path: '/validation',
  },
  {
    name: 'Catalog',
    path: 'https://vicdata4.github.io/seed-catalog/',
  },
];

/**
 * FORMATTERS
 */
const dateFormatter = (date_) => {
  const date = new Date(date_);

  const monthDay = date.getDate();
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();
  const weekDayName = days[date.getDay()];
  const hour = date.getHours();
  const minute = date.getMinutes();

  return {
    default: monthName + ' ' + monthDay + ', ' + year,
    short: monthName.slice(0, 3) + ' ' + monthDay,
    day: weekDayName,
    hour: (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute),
    input: `${date.getFullYear()}-${date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${
      date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    }`,
  };
};

const emailValidator = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const scrollMode = (type, pixel) => {
  document.body.style.position = type;
  document.body.style.top = pixel;
};

const mediaQuery = 850;
const transition = 1000;

const navigationStyles = css`
  nav {
    background-color: var(--nav-background);
    letter-spacing: 1.6px;
    font-size: 16px;
    height: 100%;
  }

  .nav-link:hover {
    border-bottom: 1px solid #59868c;
  }

  .menu-btn {
    width: 100%;
    height: 100%;
    border: none;
    background: transparent;
    overflow: hidden;
    outline: none;
    cursor: pointer;
  }

  .menu-icon,
  .scroll-menu-icon {
    font-size: 40px !important;
    color: #716a6f;
    transition: transform ${unsafeCSS(`${transition}ms`)};
  }

  .menu-icon.no-transition,
  .scroll-menu-icon.no-transition {
    transition: none;
  }

  .menu-icon.rotate,
  .scroll-menu-icon.rotate {
    transform: rotate(180deg);
  }

  .menu-icon.rotate.rclose,
  .scroll-menu-icon.rotate.rclose {
    transform: rotate(360deg);
  }

  .nav-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: var(--header-nav-height);

    width: 100%;
    height: 0;

    margin: 0;
    padding: 0;

    background-color: rgba(255, 255, 255, 0.98);
    overflow: hidden;
    list-style: none;
    z-index: 1;
  }

  .opened {
    height: calc(100% - var(--header-nav-height));
  }

  .opened-fixed {
    position: fixed;
    top: var(--header-scroll-height);
    height: calc(100% - var(--header-scroll-height));
  }

  .closed {
    height: 0;
  }
  .nav-list.opened,
  .nav-list.opened-fixed,
  .nav-list.closed {
    transition: height ${unsafeCSS(`${transition}ms`)};
  }

  .nav-list > li {
    margin: 20px 0;
  }

  .nav-link {
    text-decoration: none;
    color: black;
    cursor: pointer;
  }

  .logo {
    height: 30px;
    margin-left: 20px;
  }

  .scroll-menu {
    position: fixed;
    top: -70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: var(--header-scroll-height);
    width: 100%;
    background-color: var(--header-background);
    opacity: 0.98;
    transition: top 0.5s;
    z-index: 2;
  }

  .scroll-menu > .nav-list {
    margin-right: 30px;
  }

  .scroll-menu > img {
    width: 100px;
    margin-left: 20px;
  }

  .nav-link.fixed {
    color: #fff;
  }

  .scroll-menu-btn {
    margin-right: 20px;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .scroll-menu-btn > i {
    color: white;
  }

  .scrolltop-arrow {
    position: fixed;
    bottom: 0;
    right: 0;

    width: 50px;
    height: 50px;
    margin: 20px;
    border: none;
    border-radius: 100%;
    color: white;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.8);
    transition: opacity 0.6s;
    cursor: pointer;
  }

  @media (min-width: ${unsafeCSS(`${mediaQuery}px`)}) {
    .nav-list {
      all: unset;
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      align-items: center;
      height: 100%;
      list-style: none;
    }

    .nav-list > li {
      margin: 0 15px 0 15px;
    }

    .nav-list.opened,
    .nav-list.opened-fixed {
      transition: unset;
    }

    .nav-link {
      color: #424242;
    }

    .menu-btn,
    .scroll-menu-btn {
      display: none;
    }
  }
`;

class NavigationWc extends LitElement {
  static get styles() {
    return [navigationStyles, material];
  }

  static get properties() {
    return {
      scroll: { type: Number },
    };
  }

  constructor() {
    super();
    this.scroll = 0;

    window.addEventListener('scroll', () => {
      const arrowBtn = this.shadowRoot.querySelector('.scrolltop-arrow');
      const scrollMenu = this.shadowRoot.querySelector('.scroll-menu');
      const opened = scrollMenu.style.top === '0px' && this.shadowRoot.querySelector('.opened-fixed');

      arrowBtn.style.opacity = window.scrollY > window.innerHeight ? '1' : '0';
      scrollMenu.style.top = window.scrollY > 170 || opened ? '0' : '-70px';
    });
  }

  disableEnableScrolling(isClosed, scroll, isFixed) {
    if (isClosed) {
      if (!scroll) {
        scrollMode('fixed', '0px');
      } else {
        this.scroll = window.scrollY;
        scrollMode('fixed', `-${window.scrollY}px`);
      }
    } else {
      scrollMode('unset', 'unset');
      if (isFixed) window.scrollTo(0, this.scroll);
    }
  }

  mobileMenuSwitch(scroll_ = null) {
    const type = scroll_ ? { scroll: 'scroll-', fixed: '-fixed' } : { scroll: '', fixed: '' };
    const icon = this.shadowRoot.querySelector(`.${type.scroll}menu-icon`).classList;
    const menu = this.shadowRoot.querySelector('.nav-list').classList;
    const menuButton = this.shadowRoot.querySelector(`.${type.scroll}menu-btn`);
    const isClosed = !menu.contains(`opened${type.fixed}`);

    menuButton.disabled = true;

    this.disableEnableScrolling(isClosed, scroll_, type.fixed);

    if (isClosed) {
      menu.add(`opened${type.fixed}`);
      icon.remove('no-transition');
      icon.add('rotate');
    } else {
      if (!type.fixed) menu.remove('opened');
      menu.add('closed');
      icon.add('rclose');
    }

    setTimeout(() => {
      menuButton.disabled = false;

      if (!isClosed) {
        icon.add('no-transition');
        icon.remove('rotate');
        icon.remove('rclose');
        menu.remove('closed');

        if (type.fixed) menu.remove('opened-fixed');
      }
    }, transition);
  }

  resetScroll() {
    scrollMode('unset', '0px');
    window.scrollTo(0, 0);
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  render() {
    return html`
      <nav>
        <ul class="nav-list">
          ${navList.map(
            (info) =>
              html`<li>
                <a
                  href="${info.path}"
                  @click="${() => this.resetScroll(info.path)}"
                  class="nav-link"
                  tabindex="0"
                  >${info.name}</a
                >
              </li>`,
          )}
        </ul>
        <div class="scroll-menu">
          ${logo}
          <ul class="nav-list">
            ${navList.map(
              (info) =>
                html`<li>
                  <a
                    href="${info.path}"
                    @click="${() => this.resetScroll(info.path)}"
                    class="nav-link fixed"
                    tabindex="-1"
                    >${info.name}</a
                  >
                </li>`,
            )}
          </ul>
          <button type="button" class="scroll-menu-btn" @click="${() => this.mobileMenuSwitch(true)}">
            <i class="material-icons scroll-menu-icon">expand_more</i>
          </button>
        </div>
        <button type="button" class="menu-btn" @click="${() => this.mobileMenuSwitch()}">
          <i class="material-icons menu-icon">expand_more</i>
        </button>
      </nav>
      <button aria-label="Scroll to top" class="scrolltop-arrow" @click="${this.scrollToTop}">
        <i class="material-icons">arrow_upward</i>
      </button>
    `;
  }
}

window.customElements.define('navigation-wc', NavigationWc);

class CommonHeader extends LitElement {
  static get styles() {
    return css`
      :host {
        --dark-color: #3c3b3b;
        --header-background: rgb(50, 50, 50);
        --header-height: 120px;
      }

      header {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--header-background);
        height: var(--header-height);
      }

      .title {
        margin: 0;
        text-align: center;
      }
    `;
  }

  render() {
    return html`
      <header>
        <a href="/">${logo}</a>
      </header>
    `;
  }
}

window.customElements.define('common-header', CommonHeader);

class HomeView extends LitElement {
  static get styles() {
    return [material, styles, seedStyle];
  }

  renderMainSection() {
    return html`
      <section aria-label="Web design best practices" tabindex="0">
        <div class="hall">
          <div class="main-container">
            <h1 class="main-title">Frontend <br />Development</h1>
            <hr class="separator separator-main" />
            <div class="btn-container">
              <button class="sd-btn-mix black"><i class="material-icons">check</i> Testing</button>
              <button class="sd-btn-mix blue-mate"><i class="material-icons">view_quilt</i> WC</button>
              <button class="sd-btn-mix green-mate"><i class="material-icons">style</i> Catalog</button>
              <button class="sd-btn-mix"><i class="material-icons">check</i> Design</button>
            </div>
            <p>
              Learn about Web Components, testing, routing, formatting standards, coding conventions and best tools
              about frontend development.
            </p>
            <p>
              Clone the project from
              <a href="https://github.com/vicdata4/lit-course" class="github_link" target="_blank">Github</a>
            </p>
          </div>
        </div>
      </section>
    `;
  }

  renderTechnologies() {
    return html`
      <section aria-label="Web development technologies" tabindex="0">
        <h2 class="section-title centered">NATIVE <span class="section-title-decorator">TECHNOLOGIES</span></h2>
        <div class="technologies">
          <div class="tech-card" aria-label="HTML5" tabindex="0">
            ${html5Svg}
            <p class="card-text" tabindex="0">
              HTML5 is a software solution stack that defines the properties and behaviors of
              <b class="card-decorator">web page content</b> by implementing a markup-based pattern to it
            </p>
            <hr class="separator c-sm c-red" />
          </div>
          <div class="tech-card" aria-label="CSS3" tabindex="0">
            ${css3Svg}
            <p class="card-text" tabindex="0">
              Cascading Style Sheets (CSS) is a style sheet language used for describing the
              <b class="card-decorator">presentation</b>
              of a document written in a markup language like HTML
            </p>
            <hr class="separator c-sm c-blue" />
          </div>
          <div class="tech-card" aria-label="Javascript" tabindex="0">
            ${jsSvg}
            <p class="card-text" tabindex="0">
              JavaScript is a programming language that conforms to the
              <b class="card-decorator">ECMAScript specification</b>. JavaScript is high-level, often just-in-time
              compiled, and multi-paradigm
            </p>
            <hr class="separator c-sm c-green" />
          </div>
        </div>
      </section>
    `;
  }

  renderDesign() {
    return html`
      <section aria-label="About dsign project" tabindex="0">
        <div class="information">
          <div class="info-header">
            <h2 class="section-title">DSIGN</h2>
            <div class="info-icons">
              <button type="button"><i class="material-icons favourite-red">favorite_border</i></button>
              <button type="button"><i class="material-icons share-purple">share</i></button>
            </div>
          </div>
          <hr class="separator c-sm green" />
          <p class="info-text" tabindex="0">
            This project includes a <b>responsive web layout</b> following best practices about presentation, layout and
            accessibility using HTML5 and CSS3. <br /><br />
            A basic example about how a simple web layout can be developed from the skeleton to the style, respecting
            the most important aspects about user experience and accesibility such as
            <b>tab navigation, color contrast ratio, text readability, content distribution</b> and also non-visual
            aspects like <b>semantic elements, attributes, clean code</b> in order to build a more diverse and powerful
            Web site or application.
          </p>
          <hr class="separator centered" />
          <a href="https://github.com/vicdata4/lit-course" class="github_link" target="_blank">${githubSvg}</a>
        </div>
      </section>
    `;
  }

  renderStorybook() {
    return html`
      <section aria-label="Storybook" tabindex="0">
        <div class="information">
          <a href="#" class="github_link">${storybook}</a>
        </div>
      </section>
    `;
  }

  renderDisciplines() {
    return html`
      <section aria-label="Web design disciplines" tabindex="0">
        <div class="areas">
          <article class="area-card">
            <h2 class="area-title" tabindex="0">User experience</h2>
            <p class="info-text" tabindex="0">
              User experience (UX) is a <b>person's emotions and attitudes about using a particular product</b>, system
              or service. It includes the practical, experiential, affective, meaningful and valuable aspects of
              human–computer interaction and product ownership. <br /><br />Additionally, it includes a person's
              perceptions of system aspects such as utility, ease of use and efficiency.
            </p>
          </article>
          <article class="area-card center">
            <h2 class="area-title" tabindex="0">Accesibility</h2>
            <p class="info-text" tabindex="0">
              Web accessibility is the inclusive practice of <b>ensuring there are no barriers</b> that prevent
              interaction with, or access to, websites on the World Wide Web
              <b
                >by people with physical disabilities, situational disabilities, and socio-economic restrictions on
                bandwidth and speed.</b
              >
              <br /><br />When sites are correctly designed, developed and edited, generally all users have equal access
              to information and functionality.
            </p>
          </article>
          <article class="area-card">
            <h2 class="area-title" tabindex="0">User interface</h2>
            <p class="info-text" tabindex="0">
              The user interface (UI), in the industrial design field of human-computer interaction, is the
              <b>space where interactions between humans and machines occur.</b> <br /><br />The goal of this
              interaction is to allow effective operation and control of the machine from the human end, whilst the
              machine simultaneously feeds back information that aids the operators' decision-making process.
            </p>
          </article>
        </div>
      </section>
    `;
  }

  renderFooter() {
    return html`
      <footer aria-label="Footer section" tabindex="0">
        <ul class="footer-list">
          <li class="footer-link title" aria-label="Menu links" tabindex="0">CONTINENTS</li>
          <li><a href="#" class="footer-link">Africa</a></li>
          <li><a href="#" class="footer-link">Europe</a></li>
          <li><a href="#" class="footer-link">Asia</a></li>
          <li><a href="#" class="footer-link">America</a></li>
          <li><a href="#" class="footer-link">Antarctica</a></li>
          <li><a href="#" class="footer-link">Oceania</a></li>
        </ul>
        <ul class="footer-list">
          <li class="footer-link title" aria-label="Technologies links" tabindex="0">TECHNOLOGIES</li>
          <li><a href="#" class="footer-link">HTML5</a></li>
          <li><a href="#" class="footer-link">CSS3</a></li>
          <li><a href="#" class="footer-link">Javascript</a></li>
        </ul>
        <ul class="footer-list">
          <li class="footer-link title" aria-label="Dependencies links" tabindex="0">DEPENDENCIES</li>
          <li><a href="#" class="footer-link">LitElement</a></li>
          <li><a href="#" class="footer-link">Vaadin</a></li>
        </ul>
        <ul class="footer-list">
          <li class="footer-link title" aria-label="Recomendations links" tabindex="0">RELATED</li>
          <li><a href="#" class="footer-link">Git</a></li>
          <li><a href="#" class="footer-link">Flex-box</a></li>
          <li><a href="#" class="footer-link">Grid Layout</a></li>
          <li><a href="#" class="footer-link">ES6</a></li>
          <li><a href="#" class="footer-link">Web Components</a></li>
          <li><a href="#" class="footer-link">Npm</a></li>
        </ul>
        <div class="footer-line" aria-label="Website links" tabindex="0">
          <a href="#" class="footer-link">lit-course</a>
        </div>
      </footer>
    `;
  }

  render() {
    return html`
      <common-header></common-header>
      <navigation-wc></navigation-wc>
      <main>
        ${this.renderMainSection()} ${this.renderTechnologies()} ${this.renderDesign()} ${this.renderDisciplines()}
        ${this.renderStorybook()} ${this.renderFooter()}
      </main>
    `;
  }
}

window.customElements.define('home-view', HomeView);

const navigatorStyles = css`
  :host {
    --background-color: #eae8e8;
    --dark-color: #3c3b3b;
  }

  .menu-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .menu-list li {
    color: black;
    background-color: var(--background-color);
    margin-bottom: 2px;
    font-size: 20px;
    cursor: pointer;
  }

  .menu-list li a {
    display: block;
    text-decoration: none;
    color: black;
    padding: 20px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
  }

  @media (min-width: 768px) {
    .menu-list {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
    }

    .menu-list li {
      margin: 20px;
      line-height: 150px;
      border-radius: 3px;
    }

    .menu-list li a {
      height: 150px;
      width: 150px;
    }

    .menu-list li a:hover {
      background-color: #3e5c7b;
      color: white;
    }
  }
`;

const commonStyles = css`
  .container {
    padding: 20px;
  }

  .common-list {
    margin: 40px 0px;
  }

  .common-btn {
    background-color: transparent;
    border: 1px solid grey;
    padding: 10px;
    margin: 5px;
    outline: none;
    cursor: pointer;
  }

  .common-btn:hover {
    background-color: #f1f1f1;
  }

  .common-btn:focus {
    background-color: grey;
    color: white;
  }
`;

/* eslint-disable no-alert */

class FormValidation extends LitElement {
  static get styles() {
    return [
      seedStyle,
      css`
        :host {
          width: fit-content;
        }

        .form-field {
          padding: 10px;
          border-radius: 0;
          border: 1px solid grey;
          margin: 3px;
        }

        .alert-succesfull {
          display: inline-block;
          color: white;
          padding: 0;
          background-color: transparent;
          margin-left: 10px;
        }

        .alert-msg {
          color: black;
          padding: 10px;
        }

        @media (min-width: 768px) {
          form {
            flex-flow: row wrap;
            justify-content: center;
          }
        }
      `,
    ];
  }

  static get properties() {
    return {
      validated: { type: Boolean, attribute: false },
      message: { type: String, attribute: false },
    };
  }

  constructor() {
    super();
    this.validated = false;
    this.message = '';
  }

  passwordValidator(pw) {
    return pw !== '' && pw.length === 8;
  }

  onSubmit(e) {
    const email = this.shadowRoot.querySelector('#email');
    const password = this.shadowRoot.querySelector('#password');

    if (!emailValidator(email.value)) {
      this.message = 'Enter a valid email';
      return false;
    }

    if (!this.passwordValidator(password.value)) {
      this.message = 'Your password must contain 8 characters';
      return false;
    }

    this.validated = true;
    this.message = '';
  }

  render() {
    return html`
      <form onsubmit="return false">
        <input id="email" type="text" class="form-field" placeholder="email" />
        <input id="password" type="password" class="form-field" placeholder="password" />
        <input type="submit" @click="${this.onSubmit}" class="sd-btn black" value="Check" />
        ${this.validated && this.message === '' ? html`<div class="alert-succesfull">&#128077;</div>` : nothing}
      </form>
      ${this.message !== '' ? html`<div class="alert-msg">${this.message}</div>` : nothing}
    `;
  }
}

window.customElements.define('form-validation', FormValidation);

class FormValidationView extends LitElement {
  static get styles() {
    return [styles, commonStyles];
  }

  render() {
    return html`
      <common-header></common-header>
      <navigation-wc></navigation-wc>
      <section class="container">
        <form-validation></form-validation>
      </section>
    `;
  }
}

window.customElements.define('form-validation-view', FormValidationView);

class NotFoundView extends LitElement {
  static get styles() {
    return [];
  }

  render() {
    return html`
      <section>
        <h1>Not found view</h1>
      </section>
    `;
  }
}

window.customElements.define('not-found-view', NotFoundView);

function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
}

/* global window */

var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = symbolObservablePonyfill(root);

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */

function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function.');
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  /**
   * This makes a shallow copy of currentListeners so we can use
   * nextListeners as a temporary list while dispatching.
   *
   * This prevents any bugs around consumers calling
   * subscribe/unsubscribe in the middle of a dispatch.
   */

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    if (isDispatching) {
      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }

    if (isDispatching) {
      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribelistener for more details.');
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribelistener for more details.');
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
    // Any reducers that existed in both the new and old rootReducer
    // will receive the previous state. This effectively populates
    // the new state tree with any relevant data from the old one.

    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[result] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[result] = observable, _ref2;
}

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty

}

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionDescription = actionType && "action \"" + String(actionType) + "\"" || 'an action';
  return "Given " + actionDescription + ", reducer \"" + key + "\" returned undefined. " + "To ignore an action, you must explicitly return the previous state. " + "If you want this reducer to hold no value, you can return null instead of undefined.";
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!isPlainObject(inputState)) {
    return "The " + argumentName + " has unexpected type of \"" + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE) return;

  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });

    if (typeof initialState === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
    }

    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined when probed with a random type. " + ("Don't try to handle " + ActionTypes.INIT + " or other actions in \"redux/*\" ") + "namespace. They are considered private. Instead, you must return the " + "current state for any unknown actions, unless it is undefined, " + "in which case you must return the initial state, regardless of the " + "action type. The initial state may not be undefined, but can be null.");
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */


function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        warning("No reducer provided for key \"" + key + "\"");
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same
  // keys multiple times.

  var unexpectedKeyCache;

  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError;

  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);

      if (warningMessage) {
        warning(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    keys.push.apply(keys, Object.getOwnPropertySymbols(object));
  }

  if (enumerableOnly) keys = keys.filter(function (sym) {
    return Object.getOwnPropertyDescriptor(object, sym).enumerable;
  });
  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */

function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      var _dispatch = function dispatch() {
        throw new Error('Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return _objectSpread2({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */

function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning('You are currently using minified code outside of NODE_ENV === "production". ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' + 'to ensure you have the correct code for your production build.');
}

const notes = (state = { list: [] }, action) => {
  switch (action.type) {
    case 'ADD_NOTE': {
      return { list: [...state.list, action.payload] };
    }
    case 'GET_ALL': {
      return { list: action.payload };
    }
    case 'DELETE_NOTE': {
      const deleteNote = state.list.filter((x, i) => i !== action.payload);
      return { list: deleteNote };
    }
    case 'CATCH_ERROR': {
      const string = `error: ${action.payload.error} errorCode: ${action.payload.errorCode}`;
      // eslint-disable-next-line no-console
      console.log('****CATCHED:', string);
      break;
    }
    default:
      return state;
  }
};

function createThunkMiddleware(extraArgument) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }

        return next(action);
      };
    };
  };
}

var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

const store = createStore(
  combineReducers({
    // auth,
    notes,
  }),
  applyMiddleware(thunk),
);

/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/**
  This is a JavaScript mixin that you can use to connect a Custom Element base
  class to a Redux store. The `stateChanged(state)` method will be called when
  the state is updated.

  Example:

      import { connect } from 'pwa-helpers/connect-mixin.js';

      class MyElement extends connect(store)(HTMLElement) {
        stateChanged(state) {
          this.textContent = state.data.count.toString();
        }
      }
*/
const connect = (store) => (baseElement) => class extends baseElement {
    connectedCallback() {
        if (super.connectedCallback) {
            super.connectedCallback();
        }
        this._storeUnsubscribe = store.subscribe(() => this.stateChanged(store.getState()));
        this.stateChanged(store.getState());
    }
    disconnectedCallback() {
        this._storeUnsubscribe();
        if (super.disconnectedCallback) {
            super.disconnectedCallback();
        }
    }
    /**
     * The `stateChanged(state)` method will be called when the state is updated.
     */
    stateChanged(_state) { }
};
//# sourceMappingURL=connect-mixin.js.map

/* eslint-disable no-alert */

class InputFrom extends LitElement {
  static get styles() {
    return [
      css`
        .input-text {
          padding: 10px;
          border: 1px solid #b6c3c4;
        }

        .btn-submit {
          height: 37px;
          background-color: transparent;
          border: 1px solid grey;
          padding: 10px;
          outline: none;
          cursor: pointer;
        }

        .btn-submit:hover {
          background-color: #f1f1f1;
        }
      `,
    ];
  }

  sendData(e) {
    const input = this.shadowRoot.querySelector('#message');

    if (input.value) {
      const event = new CustomEvent('my-event', {
        detail: {
          message: input.value,
          date: new Date(),
        },
      });

      this.dispatchEvent(event);
      input.value = '';
    } else {
      alert('Empty field');
    }

    e.preventDefault();
  }

  render() {
    return html`
      <form @submit="${this.sendData}">
        <input id="message" type="text" class="input-text" placeholder="write here.." />
        <button type="submit" @click="${this.sendData}" class="btn-submit"><slot></slot></button>
      </form>
    `;
  }
}

window.customElements.define('input-form', InputFrom);

class ListComponent extends LitElement {
  static get properties() {
    return {
      list: { type: Array },
    };
  }

  constructor() {
    super();
    this.list = [];
  }

  deleteItem(i) {
    const event = new CustomEvent('delete-event', {
      detail: {
        index: i,
      },
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <ul>
        ${this.list.map(
          (item, i) =>
            html`
              <li>
                ${dateFormatter(item.date).hour} ${item.message}
                <button @click="${() => this.deleteItem(i)}">&times;</button>
              </li>
            `,
        )}
      </ul>
    `;
  }
}

window.customElements.define('list-component', ListComponent);

class DataBinding extends connect(store)(LitElement) {
  static get styles() {
    return [styles, commonStyles];
  }

  static get properties() {
    return {
      messageList: { type: Array },
    };
  }

  addMessage(e) {
    this.messageList = [...this.messageList, e.detail];
    // store.dispatch(addNote(e.detail));
  }

  deleteMessage(e) {
    this.messageList = this.messageList.filter((x, i) => i !== e.detail.index);
    // store.dispatch(deleteNote(e.detail.index));
  }

  stateChanged(state) {
    this.messageList = state.notes.list;
  }

  render() {
    return html`
      <common-header></common-header>
      <navigation-wc></navigation-wc>
      <section class="container">
        <h1>Data binding</h1>
        <input-form @my-event="${this.addMessage}">Guardar</input-form>
        <list-component .list="${this.messageList}" @delete-event="${this.deleteMessage}"></list-component>
      </section>
    `;
  }
}

window.customElements.define('data-binding', DataBinding);

class ProfilesView extends LitElement {
  static get styles() {
    return [
      styles,
      navigatorStyles,
      css`
        .github-icon {
          display: none;
        }
        @media (min-width: 768px) {
          .github-icon {
            display: block;
            position: absolute;
            margin: 10px;
            fill: #a29b83;
          }
          li:hover > .github-icon {
            fill: white;
          }
        }
      `,
    ];
  }

  render() {
    return html`
      <common-header></common-header>
      <navigation-wc></navigation-wc>
      <nav>
        <ul class="menu-list">
          ${list.map(
            (user) => html` <li><a href="/profiles/${user.toLowerCase()}" class="user-link">${user}</a></li> `,
          )}
        </ul>
      </nav>
    `;
  }
}

window.customElements.define('profiles-view', ProfilesView);

const newListStyles = css`
  .container {
    width: 100%;
    font-family: 'Open Sans', sans-serif, Arial;
    letter-spacing: 0.4px;
  }

  .row > * {
    text-align: left;
    padding-right: 10px;

    height: 30px;
    line-height: 30px;
  }

  .row > *,
  .info-container {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .row.header {
    margin-bottom: 20px;
  }

  .row.header > * {
    letter-spacing: 1.2px;
    color: #959595;
  }

  .row {
    display: flex;
    flex-flow: row nowrap;
    border-bottom: 1px solid #ebebeb;
    padding: 10px 0px;
  }

  .row:first-child {
    border: none;
  }

  .clear-btn {
    padding: 0;
    border: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;
  }

  .index {
    display: none;
    padding-left: 20px;
    color: #999999;
  }

  .title {
    width: 70%;
    color: #285659;
  }

  .date {
    display: none;
    width: 20%;
  }

  .author {
    display: none;
    width: 15%;
  }

  .light-grey {
    color: #747474;
  }

  .blue {
    color: #0589aa;
    text-decoration: none;
  }

  .yellow {
    color: #878943;
  }

  .points {
    width: 20%;
  }

  .info {
    width: 10%;
  }

  .info-container {
    display: block;
  }

  .row.data {
    margin-bottom: 40px;
  }

  .show-more-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 50px 0px;
  }

  .show-more {
    background-color: transparent;
    border: 1px solid grey;
    padding: 10px;
    outline: none;
    cursor: pointer;
  }

  .show-more:hover {
    background-color: #f1f1f1;
  }

  @media (min-width: 768px) {
    .title {
      width: 40%;
    }

    .points {
      width: 15%;
    }

    .index {
      display: block;
      width: auto;
      min-width: 30px;
    }

    .date {
      display: block;
    }

    .author {
      display: block;
    }

    .info-container {
      display: none;
    }

    .row {
      padding: 20px 0px;
    }

    .row.header {
      margin-bottom: 0px;
    }

    .row.data {
      margin-bottom: 0px;
    }

    .row.data:hover {
      background-color: #f5f6f7;
    }
  }
`;

const domain = 'https://news.ycombinator.com/';
const urlUserProfile = `${domain}user?id=`;
const urlPost = `${domain}item?id=`;

class SearcherList extends LitElement {
  static get styles() {
    return [newListStyles];
  }

  static get properties() {
    return {
      list: { type: Array },
      showMore: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.list = [];
    this.showMore = true;
  }

  showMoreNews() {
    this.dispatchEvent(new CustomEvent('show-more'));
  }

  render() {
    return this.list.length > 0
      ? html`
          <div class="container">
            <div class="row header">
              <div class="index"></div>
              <div class="title">Title</div>
              <div class="date">Date</div>
              <div class="points">Points</div>
              <div class="author">Author</div>
              <div class="info"></div>
            </div>
            ${this.list.map(
              (item, i) => html`
                <div class="info-container">
                  <span class="blue">@${item.author}</span> -
                  <span class="light-grey">${dateFormatter(new Date(item.created_at)).default}</span>
                </div>
                <div class="row data">
                  <div class="index">${i + 1}</div>
                  <div class="title">${item.title}</div>
                  <div class="date light-grey">${dateFormatter(new Date(item.created_at)).default}</div>
                  <div class="points yellow">${item.points}</div>
                  <div class="author blue">
                    <a target="_blank" class="blue" href="${urlUserProfile}${item.author}">@${item.author}</a>
                  </div>
                  <div class="info">
                    <a target="_blank" href="${urlPost}${item.objectID}">${info}</a>
                  </div>
                </div>
              `,
            )}
          </div>
          ${this.showMore
            ? html` <div class="show-more-container">
                <button @click="${this.showMoreNews}" class="show-more">Show more</button>
              </div>`
            : nothing}
        `
      : nothing;
  }
}

window.customElements.define('searcher-list', SearcherList);

const url = 'https://hn.algolia.com/api/v1/search?query=';

const errorHandler = (response) => {
  if (!response.ok) {
    return { error: response.statusText, errorCode: response.status };
  }
  return response.json();
};

class NewsSearcher extends LitElement {
  static get styles() {
    return css`
      .centered {
        display: flex;
        justify-content: center;
      }

      .spinner {
        margin: 50px 0px;
      }

      .search-info {
        text-align: center;
        margin-bottom: 20px;
        color: rgb(40, 86, 89);
        font-size: 14px;
      }

      .search-light {
        color: #0489aa;
      }

      input-form {
        display: block;
        margin-bottom: 20px;
      }
    `;
  }

  static get properties() {
    return {
      list: { type: Array },
      page: { type: Number },
      search: { type: String },
      showSpinner: { type: Boolean },
      nbHits: { type: Number },
      hitsPerPage: { type: Number },
    };
  }

  constructor() {
    super();
    this.list = [];
    this.page = 0;
    this.search = '';
    this.showSpinner = false;
    this.nbHits = 0;
    this.hitsPerPage = 20;
  }

  async firstUpdated() {
    this.searchNews({ detail: { message: 'polymer' } });
  }

  async getDataFromApi() {
    return fetch(`${url}${this.search}&page=${this.page}&hitsPerPage=${this.hitsPerPage}`, { method: 'GET' })
      .then(errorHandler)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return { error };
      });
  }

  async searchNews(e) {
    if (e.detail) {
      this.search = e.detail.message;
      this.page = 0;
      this.setLoader(true, 'reset');
    } else {
      this.page = this.page + 1;
      this.setLoader(true);
    }

    const data = await this.getDataFromApi();
    this.nbHits = data.nbHits;

    if (!data.error) {
      this.list = !e.detail ? [...this.list, ...data.hits] : [...data.hits];
    }

    this.setLoader(false);
  }

  setLoader(state, reset = null) {
    const listComponent = this.shadowRoot.querySelector('searcher-list');
    listComponent.style.display = reset ? 'none' : 'block';

    this.showSpinner = state;
    listComponent.showMore = !state;
  }

  render() {
    return html`
      <div class="centered">
        <input-form @my-event="${this.searchNews}">Search posts</input-form>
      </div>
      ${!this.showSpinner
        ? html` <div class="search-info">
            <span class="result-msg">${this.nbHits} results about</span>
            <span class="search-light">${this.search}</span>
          </div>`
        : nothing}

      <searcher-list .list="${this.list}" @show-more="${this.searchNews}"></searcher-list>
      ${this.showSpinner ? html`<div class="centered spinner">${spinner}</div>` : nothing}
    `;
  }
}

window.customElements.define('news-searcher', NewsSearcher);

class SearcherView extends LitElement {
  static get styles() {
    return [styles, commonStyles];
  }

  render() {
    return html`
      <common-header></common-header>
      <navigation-wc></navigation-wc>
      <section class="container">
        <news-searcher></news-searcher>
      </section>
    `;
  }
}

window.customElements.define('searcher-view', SearcherView);

class StorybookView extends LitElement {
  static get styles() {
    return [
      styles,
      css`
        iframe {
          border: none;
        }
      `,
    ];
  }

  render() {
    return html`
      <common-header></common-header>
      <navigation-wc></navigation-wc>
      <iframe
        src="../../storybook-build/index.html"
        height="100%"
        width="100%"
        name="storybook"
        title="LitCourse Storybook"
      ></iframe>
    `;
  }
}

window.customElements.define('storybook-view', StorybookView);

class WorkHeader extends LitElement {
  static get styles() {
    return css`
      .container {
        border-bottom: 1px solid#d6d6d6;
      }

      h1 {
        color: #0c7da0;
      }

      .github-icon {
        fill: #9c927d;
        margin-right: 10px;
      }
    `;
  }

  render() {
    return html`
      <div class="container">
        <h1>${github}<slot></slot></h1>
      </div>
    `;
  }
}

window.customElements.define('work-header', WorkHeader);

/* eslint-disable no-alert */

const components = {
  inputComponent: () =>
    html`<input-form
      @my-event="${(e) =>
        alert(`Dispatched custom event called "my-event" with the following message: ${e.detail.message}`)}"
      >Submit</input-form
    >`,
  listComponent: () =>
    html`<list-component
      .list="${[
        { message: 'Message 1', date: new Date() },
        { message: 'Message 2', date: new Date() },
      ]}"
      @delete-event="${(e) =>
        alert(`Dispatched custom event called "delete-event" with the following index: ${e.detail.index}`)}"
    ></list-component>`,
};

class ProfileOnePage extends LitElement {
  static get styles() {
    return [commonStyles];
  }

  static get properties() {
    return {
      current: { type: String, attribute: false },
    };
  }

  constructor() {
    super();
    this.current = 'inputComponent';
  }

  setComponent(component) {
    this.current = component;
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <work-header>profile-one page <img src="assets/user/test_img.png" /></work-header>
        <div class="common-list">
          ${Object.keys(components).map(
            (item) => html` <button class="common-btn" @click="${() => this.setComponent(item)}">${item}</button> `,
          )}
        </div>
        ${components[this.current]()}
      </section>
    `;
  }
}

window.customElements.define('profile-one-page', ProfileOnePage);

const routing = (outlet) => {
  const router = new Router(outlet);

  var routes = [
    { path: '/', component: 'home-view' },
    { path: '/validation', component: 'form-validation-view' },
    { path: '/data-binding', component: 'data-binding' },
    { path: '/profiles', component: 'profiles-view' },
    { path: '/searcher', component: 'searcher-view' },
    { path: '/storybook', component: 'storybook-view' },
    { path: '(.*)', component: 'not-found-view' },
  ];

  list.forEach((user) => {
    routes.unshift({ path: `/profiles/${user.toLowerCase()}`, component: `${user.toLowerCase()}-page` });
  });

  router.setRoutes(routes);
};

class AppShell extends LitElement {
  static get styles() {
    return [
      css`
        #root {
          width: 100%;
          height: 100%;
        }
      `,
    ];
  }

  firstUpdated() {
    routing(this.shadowRoot.getElementById('root'));
  }

  render() {
    return html` <div id="root"></div> `;
  }
}

window.customElements.define('app-shell', AppShell);
//# sourceMappingURL=main.js.map

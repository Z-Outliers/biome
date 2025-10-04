import React from "react";

const allowedTags = new Set([
  "div",
  "p",
  "span",
  "strong",
  "em",
  "u",
  "s",
  "br",
  "hr",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ul",
  "ol",
  "li",
  "a",
  "img",
  "blockquote",
  "pre",
  "code",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
]);

const urlSafe = (url: string) => {
  try {
    const u = new URL(url, window.location.origin);
    return ["http:", "https:", "mailto:", "tel:"].includes(u.protocol);
  } catch {
    return false;
  }
};

type ElementProps = {
  [key: string]: unknown;
};

function sanitizeAttributes(tag: string, el: Element): ElementProps {
  const props: ElementProps = {};
  for (const attr of Array.from(el.attributes)) {
    const name = attr.name.toLowerCase();
    const value = attr.value;
    // Drop styles, dataset, and event handlers
    if (name === "style" || name.startsWith("data-") || /^on/.test(name))
      continue;

    if (tag === "a") {
      if (name === "href") {
        if (urlSafe(value)) {
          props.href = value;
          if (/^https?:/i.test(value)) {
            props.target = "_blank";
            props.rel = "noreferrer noopener";
          }
        }
        continue;
      }
      if (name === "title") props.title = value;
      continue;
    }

    if (tag === "img") {
      if (name === "src") {
        if (urlSafe(value) || value.startsWith("data:image/"))
          props.src = value;
        continue;
      }
      if (name === "alt") props.alt = value;
      props.loading = "lazy";
      (props as ElementProps).referrerPolicy = "no-referrer";
      continue;
    }

    // Pass through safe generic attributes
    if (["colspan", "rowspan", "scope", "abbr", "title"].includes(name)) {
      props[name] = value;
    }

    // Allow safe id attribute for anchor targets
    if (name === "id") {
      if (/^[A-Za-z][A-Za-z0-9_\-:.]*$/.test(value)) {
        props.id = value;
      }
    }
  }
  return props;
}

function renderNode(node: Node, key: React.Key = 0): React.ReactNode {
  if (node.nodeType === Node.TEXT_NODE) {
    return (node.textContent ?? "").replace(/\s+/g, (m) =>
      m.length > 1 ? " " : m,
    );
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return null;

  const el = node as Element;
  const tag = el.tagName.toLowerCase();

  if (tag === "script" || tag === "style") return null;

  const children = Array.from(el.childNodes).map((child, i) =>
    renderNode(child, i),
  );

  if (!allowedTags.has(tag)) {
    // If tag isn't allowed, render its children (stripping the tag itself)
    return <React.Fragment key={key}>{children}</React.Fragment>;
  }

  const base: ElementProps = { key };
  const attrs = sanitizeAttributes(tag, el);
  const props = Object.assign(base, attrs);

  switch (tag) {
    case "br":
      return <br key={key} />;
    case "hr":
      return <hr key={key} />;
    case "a":
      return React.createElement("a", props, children);
    case "img":
      return React.createElement("img", props);
    default:
      return React.createElement(tag, props, children);
  }
}

export function renderSafeHtml(html: string): React.ReactNode {
  if (!html) return null;
  const doc = new DOMParser().parseFromString(html, "text/html");
  const nodes = Array.from(doc.body.childNodes);
  return nodes.map((n, i) => renderNode(n, i));
}

export default renderSafeHtml;

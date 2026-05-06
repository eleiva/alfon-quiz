"use client";

import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import sql from "react-syntax-highlighter/dist/esm/languages/hljs/sql";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

SyntaxHighlighter.registerLanguage("sql", sql);

// Custom theme based on atomOneDark, adapted to the app's dark green palette
const sqlTheme = {
  ...atomOneDark,
  hljs: {
    ...atomOneDark.hljs,
    background: "rgba(0,0,0,0.35)",
    borderRadius: "10px",
    padding: "14px 16px",
    fontSize: "12px",
    lineHeight: "1.7",
    fontFamily: "'Space Mono', 'Courier New', monospace",
    border: "1px solid rgba(82,183,136,0.15)",
    overflowX: "auto" as const,
    display: "block",
  },
  // Keywords: azul-claro
  "hljs-keyword": { color: "#60a5fa", fontWeight: "bold" },
  "hljs-built_in": { color: "#60a5fa" },
  // Strings: dorado
  "hljs-string": { color: "#f4c542" },
  // Numbers
  "hljs-number": { color: "#f97316" },
  // Comments: gris
  "hljs-comment": { color: "#8fa89a", fontStyle: "italic" },
  // Functions / titles: verde-claro
  "hljs-title": { color: "#52b788" },
  "hljs-function": { color: "#52b788" },
  // Operators, punctuation
  "hljs-operator": { color: "#a78bfa" },
  "hljs-punctuation": { color: "#e8f5e9" },
  // Params / variables
  "hljs-params": { color: "#e8f5e9" },
  "hljs-variable": { color: "#b7e4c7" },
};

type Props = {
  code: string;
  /** Extra wrapper style overrides */
  style?: React.CSSProperties;
};

export default function SqlBlock({ code, style }: Props) {
  return (
    <div style={{ margin: "10px 0", ...style }}>
      <SyntaxHighlighter
        language="sql"
        style={sqlTheme}
        wrapLongLines
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
}

/**
 * Splits a question string into segments: plain text and SQL code blocks.
 * A "code block" is a run of lines that look like SQL/PL-pgSQL.
 *
 * Rules:
 *  - A line is considered "code" if it matches SQL keywords, starts with
 *    whitespace (indented), contains $$ or --, or is part of a run already
 *    identified as code.
 *  - Consecutive code lines are merged into one block.
 *  - Blank lines between two code lines stay in the code block.
 */
const CODE_LINE_RE =
  /^\s*(SELECT|FROM|WHERE|JOIN|WITH|GROUP|HAVING|ORDER BY|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|BEGIN|COMMIT|ROLLBACK|SAVEPOINT|IF|END|THEN|ELSE|RAISE|RETURN|RETURNS|TRIGGER|FUNCTION|PROCEDURE|LANGUAGE|EXECUTE|FOR EACH|BEFORE|AFTER|ON |INTO|SET |VALUES|AND |OR |INNER|LEFT|RIGHT|UNION|COUNT|MAX|MIN|SUM|AVG|OVER|PARTITION|CASE|WHEN|NEW\.|OLD\.|IN |EXISTS|DECLARE|LOOP|DO |\$\$|--)/i;

export type Segment =
  | { type: "text"; content: string }
  | { type: "code"; content: string };

export function parseQuestionSegments(question: string): Segment[] {
  const lines = question.split("\n");
  const segments: Segment[] = [];
  let currentText: string[] = [];
  let currentCode: string[] = [];

  const flushText = () => {
    const t = currentText.join("\n").trim();
    if (t) segments.push({ type: "text", content: t });
    currentText = [];
  };
  const flushCode = () => {
    const c = currentCode.join("\n").trim();
    if (c) segments.push({ type: "code", content: c });
    currentCode = [];
  };

  for (const line of lines) {
    const isCode = CODE_LINE_RE.test(line) || (currentCode.length > 0 && line.trim() === "");
    if (isCode) {
      if (currentText.length > 0) flushText();
      currentCode.push(line);
    } else {
      if (currentCode.length > 0) {
        // Don't flush on a single blank line — might be mid-block
        // Only flush when we hit a real non-code non-blank line
        if (line.trim() !== "") flushCode();
        else currentCode.push(line);
      }
      if (currentCode.length === 0) currentText.push(line);
    }
  }

  flushText();
  flushCode();

  return segments;
}

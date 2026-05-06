"use client";

/**
 * Renders one or more database table schemas in the app's dark-green style.
 *
 * Schema definition format (plain text, parsed from the `schema` prop):
 *
 *   TABLE_NAME
 *   type  column_name  [PK] [FK] [NOT NULL]
 *   ...
 *
 *   NEXT_TABLE
 *   type  column_name  [PK] [FK]
 *   ...
 *
 * Tables are separated by blank lines.
 * An optional arrow between tables can be shown via the `relations` prop:
 *   [{ from: "EMPLEADOS.departamento_id", to: "DEPARTAMENTOS.departamento_id", label: "FK" }]
 */

export type TableDef = {
  name: string;
  columns: {
    type: string;
    name: string;
    constraints: string[]; // e.g. ["PK"], ["FK"], ["NOT NULL"]
  }[];
};

export type Relation = {
  from: string; // "TABLE.column"
  to: string;
  label?: string;
};

type Props = {
  tables: TableDef[];
  relations?: Relation[];
  caption?: string;
};

const CONSTRAINT_COLORS: Record<string, { bg: string; color: string }> = {
  PK: { bg: "rgba(244,197,66,0.18)", color: "var(--dorado)" },
  FK: { bg: "rgba(96,165,250,0.15)", color: "var(--azul-claro)" },
  "NOT NULL": { bg: "rgba(82,183,136,0.12)", color: "var(--verde-claro)" },
};

function ConstraintBadge({ label }: { label: string }) {
  const style = CONSTRAINT_COLORS[label] ?? {
    bg: "rgba(143,168,154,0.15)",
    color: "var(--gris)",
  };
  return (
    <span
      style={{
        display: "inline-block",
        background: style.bg,
        color: style.color,
        borderRadius: 5,
        padding: "1px 6px",
        fontSize: 9,
        fontWeight: 700,
        fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
        letterSpacing: 0.5,
        marginLeft: 4,
        verticalAlign: "middle",
      }}
    >
      {label}
    </span>
  );
}

function Table({ def }: { def: TableDef }) {
  return (
    <div
      style={{
        background: "var(--superficie)",
        border: "1.5px solid rgba(82,183,136,0.3)",
        borderRadius: 10,
        overflow: "hidden",
        minWidth: 180,
        flex: "1 1 auto",
        maxWidth: 320,
      }}
    >
      {/* Table name header */}
      <div
        style={{
          background: "rgba(82,183,136,0.15)",
          borderBottom: "1.5px solid rgba(82,183,136,0.3)",
          padding: "6px 12px",
          fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
          fontSize: 11,
          fontWeight: 700,
          color: "var(--verde-claro)",
          textAlign: "center",
          letterSpacing: 0.5,
        }}
      >
        {def.name}
      </div>

      {/* Columns */}
      {def.columns.map((col, i) => {
        const isPK = col.constraints.includes("PK");
        const isFK = col.constraints.includes("FK");
        return (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "52px 1fr auto",
              alignItems: "center",
              gap: "0 8px",
              padding: "5px 10px",
              borderBottom:
                i < def.columns.length - 1
                  ? "1px solid rgba(82,183,136,0.08)"
                  : "none",
              background:
                isPK
                  ? "rgba(244,197,66,0.04)"
                  : isFK
                    ? "rgba(96,165,250,0.04)"
                    : "transparent",
            }}
          >
            {/* Type */}
            <span
              style={{
                fontSize: 10,
                color: "var(--gris)",
                fontFamily: "'Space Mono', monospace",
                opacity: 0.8,
              }}
            >
              {col.type}
            </span>

            {/* Column name */}
            <span
              style={{
                fontSize: 12,
                color: isPK
                  ? "var(--dorado)"
                  : isFK
                    ? "var(--azul-claro)"
                    : "var(--texto)",
                fontFamily: "'Space Mono', 'Courier New', monospace",
                fontWeight: isPK || isFK ? 600 : 400,
              }}
            >
              {col.name}
            </span>

            {/* Constraints */}
            <div style={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              {col.constraints.map((c) => (
                <ConstraintBadge key={c} label={c} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function SchemaTable({ tables, relations, caption }: Props) {
  const hasRelation = relations && relations.length > 0;

  return (
    <div style={{ margin: "10px 0 14px" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        {tables.map((t, i) => (
          <div key={t.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Table def={t} />
            {/* Arrow between tables */}
            {hasRelation && i < tables.length - 1 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                  color: "var(--azul-claro)",
                  fontSize: 10,
                  fontFamily: "var(--font-unbounded), Unbounded, sans-serif",
                  opacity: 0.8,
                }}
              >
                <span style={{ fontSize: 14 }}>→</span>
                {relations[i]?.label && (
                  <span style={{ fontSize: 9 }}>{relations[i].label}</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {caption && (
        <p
          style={{
            textAlign: "center",
            fontSize: 10,
            color: "var(--gris)",
            marginTop: 8,
            fontStyle: "italic",
          }}
        >
          {caption}
        </p>
      )}
    </div>
  );
}

/** Parse a compact text schema into TableDef[] */
export function parseSchema(text: string): TableDef[] {
  const tables: TableDef[] = [];
  let current: TableDef | null = null;

  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line) {
      if (current) tables.push(current);
      current = null;
      continue;
    }
    if (!current) {
      current = { name: line, columns: [] };
      continue;
    }
    const parts = line.split(/\s+/);
    const type = parts[0];
    const name = parts[1];
    const constraints = parts
      .slice(2)
      .map((p) => p.toUpperCase())
      .filter((p) => ["PK", "FK", "NOT NULL", "NOTNULL"].includes(p))
      .map((p) => (p === "NOTNULL" ? "NOT NULL" : p));
    current.columns.push({ type, name, constraints });
  }
  if (current) tables.push(current);
  return tables;
}

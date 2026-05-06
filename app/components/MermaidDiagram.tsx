"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  chart: string;
  caption?: string;
};

export default function MermaidDiagram({ chart, caption }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import("mermaid")).default;

        mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          themeVariables: {
            // Dark green palette matching the app
            primaryColor: "#1a3526",
            primaryTextColor: "#e8f5e9",
            primaryBorderColor: "#52b788",
            lineColor: "#52b788",
            secondaryColor: "#152b1e",
            tertiaryColor: "#0d1f16",
            background: "#0d1f16",
            mainBkg: "#1a3526",
            nodeBorder: "#52b788",
            clusterBkg: "#152b1e",
            titleColor: "#52b788",
            edgeLabelBackground: "#152b1e",
            // ER specific
            attributeBackgroundColorOdd: "#152b1e",
            attributeBackgroundColorEven: "#1a3526",
            fillType0: "#1a3526",
            fillType1: "#152b1e",
          },
          er: {
            diagramPadding: 20,
            layoutDirection: "TB",
            minEntityWidth: 100,
            minEntityHeight: 75,
            entityPadding: 15,
            useMaxWidth: true,
          },
          fontFamily: "var(--font-dm-sans), DM Sans, sans-serif",
          fontSize: 13,
        });

        const id = `mermaid-${Math.random().toString(36).slice(2)}`;
        const { svg } = await mermaid.render(id, chart);

        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
          // Make SVG responsive
          const svgEl = ref.current.querySelector("svg");
          if (svgEl) {
            svgEl.style.maxWidth = "100%";
            svgEl.style.height = "auto";
            svgEl.removeAttribute("width");
          }
        }
      } catch (e) {
        console.error("Mermaid render error:", e);
        if (!cancelled) setError(true);
      }
    }

    render();
    return () => { cancelled = true; };
  }, [chart]);

  if (error) return null;

  return (
    <div
      style={{
        margin: "10px 0",
        background: "rgba(0,0,0,0.25)",
        border: "1px solid rgba(82,183,136,0.2)",
        borderRadius: 12,
        padding: "12px 8px 8px",
        overflow: "hidden",
      }}
    >
      <div ref={ref} style={{ textAlign: "center" }} />
      {caption && (
        <p
          style={{
            textAlign: "center",
            fontSize: 11,
            color: "var(--gris)",
            marginTop: 6,
            fontStyle: "italic",
          }}
        >
          {caption}
        </p>
      )}
    </div>
  );
}

import { ImageResponse } from "next/og";

export const alt = "Flash Diagnostics Hub — Flashovanie, diagnostika a bezpečné zdieľanie";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #09090b 0%, #18181b 45%, #0f1f17 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#10b981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 700,
              color: "#09090b",
            }}
          >
            FD
          </div>
          <div style={{ fontSize: 28, color: "#a1a1aa", fontWeight: 500 }}>
            Open Source • Zadarmo • Profesionálne
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#fafafa",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Flash Diagnostics Hub
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#a1a1aa",
              lineHeight: 1.4,
              maxWidth: 900,
            }}
          >
            Flashovanie mobilných zariadení, diagnostika firmvéru a bezpečné zdieľanie súborov
          </div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {["Fastboot / ADB", "Odin", "SP Flash", "Diagnostika", "Bezpečné zdieľanie"].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  padding: "12px 24px",
                  borderRadius: 999,
                  border: "1px solid #3f3f46",
                  background: "rgba(24, 24, 27, 0.8)",
                  color: "#34d399",
                  fontSize: 22,
                  fontWeight: 500,
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
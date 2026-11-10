import { ImageResponse } from "next/og";

// `output: "export"` needs generated images marked static explicitly.
export const dynamic = "force-static";

export const alt =
  "Rome, Reimagined. In a Classic Fiat 500 — private chauffeured tours with Alpha Tours Rome";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Typographic share card — no photography required, so social previews look
 * intentional from day one.
 */
export default function OpengraphImage() {
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
          backgroundColor: "#FDFBF7",
          backgroundImage:
            "radial-gradient(70% 60% at 92% 6%, rgba(197,160,89,0.30) 0%, rgba(253,251,247,0) 70%)",
          color: "#2C2C2C",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(197,160,89,0.6)",
            paddingBottom: "22px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 58,
                height: 58,
                borderRadius: 999,
                backgroundColor: "#C83232",
                color: "#FDFBF7",
                fontSize: 24,
                letterSpacing: -1,
                fontFamily: "serif",
              }}
            >
              500
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 16,
                letterSpacing: 6,
                textTransform: "uppercase",
                color: "#2C2C2C",
              }}
            >
              <span>Fiat 500 Tour Rome</span>
              <span style={{ color: "#A07F3E", marginTop: 9, fontSize: 13 }}>
                Alpha Tours Rome
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 15,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#A07F3E",
            }}
          >
            Private / Chauffeur-driven
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 86, lineHeight: 1.02 }}>
            Rome, Reimagined.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 86,
              lineHeight: 1.08,
              fontStyle: "italic",
              color: "#C83232",
              fontFamily: "serif",
            }}
          >
            In a Classic Fiat 500.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 26,
              fontSize: 17,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "rgba(44,44,44,0.62)",
            }}
          >
            <span>From €130</span>
            <span style={{ color: "#C5A059" }}>/</span>
            <span>2-4 guests</span>
            <span style={{ color: "#C5A059" }}>/</span>
            <span>4.94 out of 5</span>
          </div>
          <div
            style={{
              display: "flex",
              padding: "13px 24px",
              borderRadius: 999,
              backgroundColor: "#1E1B18",
              color: "#FDFBF7",
              fontSize: 14,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            alphatoursrome.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}

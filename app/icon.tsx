import { ImageResponse } from "next/og";

// `output: "export"` needs generated images marked static explicitly.
export const dynamic = "force-static";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Branded favicon generated at build time — no binary asset required.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#C83232",
          color: "#FDFBF7",
          fontSize: 88,
          letterSpacing: -5,
          fontFamily: "serif",
          border: "4px solid #C5A059",
        }}
      >
        500
      </div>
    ),
    { width: size.width, height: size.height },
  );
}

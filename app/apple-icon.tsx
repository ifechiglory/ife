import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Larger version of the same mark as icon.tsx (browser tab favicon), for
// iOS home-screen bookmarks — see that file for the shared font-loading
// approach and why colors are hardcoded rather than read from CSS tokens.
async function loadFrauncesBold(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Fraunces:wght@600&display=swap"
    ).then((res) => res.text());

    const fontUrlMatch = css.match(/src: url\(([^)]+)\) format\('(?:woff2|truetype)'\)/);
    if (!fontUrlMatch) return null;

    return await fetch(fontUrlMatch[1]).then((res) => res.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function AppleIcon() {
  const fontData = await loadFrauncesBold();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "#2f7a52",
            marginRight: 14,
            marginBottom: 8,
          }}
        />
        <div
          style={{
            display: "flex",
            fontFamily: fontData ? "Fraunces" : "serif",
            fontSize: 92,
            fontWeight: 600,
            color: "#14201a",
            letterSpacing: "-0.01em",
          }}
        >
          Ife
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontData ? [{ name: "Fraunces", data: fontData, style: "normal", weight: 600 }] : [],
    }
  );
}

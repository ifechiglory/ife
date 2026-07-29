import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Matches the real nav logo (see components/Nav.tsx #nav-logo): a small
// pine-green dot next to "Ife" in the display serif. Colors are hardcoded
// to match the --color-bg / --color-pine / --color-paper values in
// app/globals.css — next/og's renderer can't read CSS custom properties
// or use next/font instances directly (those only expose a CSS class/
// family name, not the raw font bytes ImageResponse needs), so the font
// file is fetched here via Google Fonts' CSS API — the standard pattern
// for loading a real font into an ImageResponse. Falls back to a generic
// serif if the fetch fails for any reason (offline build, rate limit),
// so the favicon still renders something reasonable either way.
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

export default async function Icon() {
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
          borderRadius: "7px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#2f7a52",
            marginRight: 3,
            marginBottom: 2,
          }}
        />
        <div
          style={{
            display: "flex",
            fontFamily: fontData ? "Fraunces" : "serif",
            fontSize: 20,
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

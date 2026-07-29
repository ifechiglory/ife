import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";


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

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE_TITLE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = SITE_TITLE;

// Portrait lives at /public/og-portrait.jpg — a studio shot, watermark
// already removed before upload. The try/catch guards against the file
// going missing later (e.g. accidentally deleted), falling back to the
// plain tinted panel below rather than a broken OG image.
async function loadPortrait(): Promise<Buffer | null> {
  try {
    return await readFile(join(process.cwd(), "public", "og-portrait.jpg"));
  } catch {
    return null;
  }
}

async function loadFrauncesBold(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Fraunces:wght@500&display=swap"
    ).then((res) => res.text());
    const match = css.match(/src: url\(([^)]+)\) format\('(?:woff2|truetype)'\)/);
    if (!match) return null;
    return await fetch(match[1]).then((res) => res.arrayBuffer());
  } catch {
    return null;
  }
}

async function loadJetBrainsMono(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400&display=swap"
    ).then((res) => res.text());
    const match = css.match(/src: url\(([^)]+)\) format\('(?:woff2|truetype)'\)/);
    if (!match) return null;
    return await fetch(match[1]).then((res) => res.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const [portrait, frauncesData, monoData] = await Promise.all([
    loadPortrait(),
    loadFrauncesBold(),
    loadJetBrainsMono(),
  ]);

  const portraitSrc = portrait
    ? `data:image/jpeg;base64,${portrait.toString("base64")}`
    : null;

  const fonts = [
    ...(frauncesData
      ? [{ name: "Fraunces", data: frauncesData, style: "normal" as const, weight: 500 as const }]
      : []),
    ...(monoData
      ? [{ name: "JetBrains Mono", data: monoData, style: "normal" as const, weight: 400 as const }]
      : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#ffffff",
        }}
      >
        {/* left: portrait, fills roughly 45% of the width */}
        <div
          style={{
            width: "45%",
            height: "100%",
            display: "flex",
            position: "relative",
            background: "#f6f7f6",
          }}
        >
          {portraitSrc ? (
            // eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders via satori, not the DOM; next/image doesn't apply here
            <img
              src={portraitSrc}
              alt=""
              width={540}
              height={630}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          ) : (
            // fallback if the portrait file hasn't been added yet — a
            // plain pine-tinted panel rather than a broken image
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(135deg, #e8efe9 0%, #f6f7f6 60%, #ffffff 100%)",
              }}
            />
          )}
        </div>

        {/* right: name, title, eyebrow — matches the hero's own type system */}
        <div
          style={{
            width: "55%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "64px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontFamily: monoData ? "JetBrains Mono" : "monospace",
              fontSize: 20,
              color: "#2f7a52",
              marginBottom: 28,
            }}
          >
            <div
              style={{
                display: "flex",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#2f7a52",
                marginRight: 14,
              }}
            />
            FRONTEND DEVELOPER &amp; TUTOR
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: frauncesData ? "Fraunces" : "serif",
              fontWeight: 500,
              fontSize: 60,
              lineHeight: 1.1,
              color: "#14201a",
              marginBottom: 20,
            }}
          >
            <span>Ifechukwu</span>
            <span>Max-Oti</span>
          </div>

          <div
            style={{
              display: "flex",
              fontFamily: monoData ? "JetBrains Mono" : "monospace",
              fontSize: 20,
              color: "#5c6360",
              maxWidth: 480,
              lineHeight: 1.5,
            }}
          >
            I build interfaces for the browser, and teach others to do the
            same.
          </div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}

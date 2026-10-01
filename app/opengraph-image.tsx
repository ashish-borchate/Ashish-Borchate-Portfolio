import { profile } from "@/data/profile";
import { heroContent } from "@/data/hero";
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const dynamic = "force-static";
export const alt = "Ashish Borchate — Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const photoPath = join(process.cwd(), "public", "assets", "profile.jpg");
  const photoData = await readFile(photoPath);
  const photoSrc = `data:image/jpeg;base64,${photoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#0a0b0d",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 640,
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 600,
              color: "#f3f4f6",
              letterSpacing: "-0.02em",
            }}
          >
            {heroContent.name}
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 26,
              lineHeight: 1.45,
              color: "#d1d5db",
            }}
          >
            {heroContent.descriptor}
          </div>
          <div
            style={{
              marginTop: 28,
              width: 120,
              height: 4,
              background: "#6b8cff",
              borderRadius: 2,
            }}
          />
          <div
            style={{
              marginTop: 24,
              fontSize: 20,
              color: "#8b919e",
            }}
          >
            {profile.seo.title.split("—")[1]?.trim() ?? "Portfolio"}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 280,
            height: 280,
            borderRadius: "50%",
            border: "4px solid rgba(212, 175, 55, 0.85)",
            padding: 8,
            boxShadow: "0 0 0 6px rgba(212, 175, 55, 0.12)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoSrc}
            alt=""
            width={248}
            height={248}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              objectPosition: "center 18%",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}

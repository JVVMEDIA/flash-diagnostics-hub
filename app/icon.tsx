import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

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
          background: "#09090b",
          borderRadius: 8,
          position: "relative",
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 7,
            background: "linear-gradient(135deg, #6ee7b7 0%, #34d399 50%, #059669 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
            <path
              d="M8.2 1.5L2 10.2h4.1L3.8 16.5l8.2-10.4H7.7l.5-4.6z"
              fill="#ecfdf5"
            />
          </svg>
        </div>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          style={{ position: "absolute", bottom: 6, left: 0 }}
        >
          <path
            d="M6 24 Q10 22 14 24 T22 24"
            stroke="#6ee7b7"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
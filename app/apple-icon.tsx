import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          borderRadius: 40,
        }}
      >
        <div
          style={{
            width: 130,
            height: 130,
            borderRadius: 36,
            background: "linear-gradient(135deg, #6ee7b7 0%, #34d399 45%, #059669 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 48px rgba(52, 211, 153, 0.45)",
          }}
        >
          <svg width="72" height="90" viewBox="0 0 14 18" fill="none">
            <path
              d="M8.2 1.5L2 10.2h4.1L3.8 16.5l8.2-10.4H7.7l.5-4.6z"
              fill="#ecfdf5"
            />
          </svg>
        </div>
      </div>
    ),
    { ...size }
  );
}
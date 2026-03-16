import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shine Painting Service | Preston, Victoria",
  description:
    "Residential & Commercial painting specialists in Melbourne. Over 20 years of experience. Interior, exterior, weatherboard, woodwork & staining. 5-star rated. Free quotes.",
  keywords:
    "painter Preston, painter Melbourne, residential painting, commercial painting, exterior painting, interior painting, weatherboard, Victoria",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

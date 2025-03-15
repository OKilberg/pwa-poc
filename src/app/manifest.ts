import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Worklog Mobile Web App",
    short_name: "Worklog",
    description: "A Progressive Web App built with Next.js",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#000000",
    orientation: "portrait",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

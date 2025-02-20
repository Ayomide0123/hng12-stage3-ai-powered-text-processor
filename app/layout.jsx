import "./globals.css";

export const metadata = {
  title: "Master Chief AI",
  description: "Chat with the Master Chief, an AI-powered assistant to summarize text, detect languages, and translate content effortlessly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Language Detector API */}
      <meta
        httpEquiv={process.env.NEXT_PUBLIC_HTTP_HEADER}
        content={process.env.NEXT_PUBLIC_LANGUAGE_DETECTOR_TOKEN}
      />

      {/* Translator API */}
      <meta
        httpEquiv={process.env.NEXT_PUBLIC_HTTP_HEADER}
        content={process.env.NEXT_PUBLIC_TRANSLATOR_TOKEN}
      />

      {/* Summarizer API */}
      <meta
        httpEquiv={process.env.NEXT_PUBLIC_HTTP_HEADER}
        content={process.env.NEXT_PUBLIC_SUMMARIZATION_TOKEN}
      />
      <body>
        {children}
      </body>
    </html>
  );
}

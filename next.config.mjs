/** @type {import('next').NextConfig} */
import 'dotenv/config';

const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_LANGUAGE_DETECTOR_TOKEN: process.env.NEXT_PUBLIC_LANGUAGE_DETECTOR_TOKEN,
    NEXT_PUBLIC_TRANSLATOR_TOKEN: process.env.NEXT_PUBLIC_TRANSLATOR_TOKEN,
    NEXT_PUBLIC_SUMMARIZATION_TOKEN: process.env.NEXT_PUBLIC_SUMMARIZATION_TOKEN,
    NEXT_PUBLIC_HTTP_HEADER: process.env.NEXT_PUBLIC_HTTP_HEADER,
    NEXT_PUBLIC_LOCAL_STORAGE_KEY: process.env.NEXT_PUBLIC_LOCAL_STORAGE_KEY,
  },
};

export default nextConfig;

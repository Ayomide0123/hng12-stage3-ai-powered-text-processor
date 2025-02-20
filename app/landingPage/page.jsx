"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import masterChiefDp from "../assets/masterChiefDp.jpg";
import Image from "next/image";

export default function LandingPage() {
  const router = useRouter();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-md text-center fade-in">
        {/* Master Chief Display Picture */}
        <div className="relative">
          <Image
            src={masterChiefDp}
            alt="masterChiefDp"
            className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg"
          />
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-blue-500 opacity-50 blur-md rounded-full"></div>
        </div>

        <h1 className="text-2xl font-bold mb-2">
          Welcome to The AI Text Processor
        </h1>
        <p className="text-gray-400 mb-6 transition-opacity duration-700">
          Detect languages, translate text, and generate summaries all in one
          place.
        </p>

        <button
          onClick={() => router.push("/chatBox")}
          className={`bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-semibold py-2 px-6 rounded-lg transition-opacity duration-300 shadow-md hover:shadow-lg ${
            showButton ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

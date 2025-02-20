"use client";

import { useState, useEffect, useRef } from "react";
import {
  handleLanguageDetection,
  handleSummarization,
  handleTranslation,
} from "../utils/aiHandlers";
import Image from "next/image";
import masterChiefDp from "../assets/masterChiefDp.jpg";
import { CiMenuFries } from "react-icons/ci";
import { FiSend } from "react-icons/fi";
import { useRouter } from "next/navigation";
import AboutMasterChief from "../components/aboutMasterChief";

// List of available languages
const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "pt", name: "Portuguese" },
  { code: "es", name: "Spanish" },
  { code: "ru", name: "Russian" },
  { code: "tr", name: "Turkish" },
  { code: "fr", name: "French" },
];

// for storing messages in localstorage
const LOCAL_STORAGE_KEY = process.env.NEXT_PUBLIC_LOCAL_STORAGE_KEY;

export default function ChatBox() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const chatBoxRef = useRef(null);
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  // Load messages from local storage when the component mounts
  useEffect(() => {
    const savedMessages = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save messages to local storage whenever the message state changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  // Scroll to the bottom of the chatBox when a new message is added
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // Close the menu when you click outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handles sending a new user message
  const handleSendMessage = async () => {
    if (!inputText.trim()) {
      setError("Text Field is Empty!");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      // Detect the language of the input text
      const detectedLanguageCode = await handleLanguageDetection(inputText);
      const detectedLanguage =
        LANGUAGES.find((lang) => lang.code === detectedLanguageCode)?.name ||
        detectedLanguageCode;

      // Add the user's message and the detected language to the chatBox
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: inputText,
          sender: "user",
          detectedLanguage: `Language: ${detectedLanguage}`,
          targetLanguage: "en", // Default target language for translation
        },
      ]);

      // Clear the input field
      setInputText("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handles summarizing a user's message
  const handleSummarizeText = async (messageId, text) => {
    setIsProcessing(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const summary = await handleSummarization(text);

      // Add the summary as a system message to the chatBox
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: text,
          sender: "system",
          systemsResponse: `Summary: ${summary}`,
          originalMessageId: messageId, // Link to the user message the system is replying to
        },
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handles translating a user's message
  const handleTranslateText = async (messageId, text, targetLanguage) => {
    setIsProcessing(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const detectedLanguageCode = await handleLanguageDetection(text);
      const translation = await handleTranslation(
        text,
        detectedLanguageCode,
        targetLanguage
      );

      // Add the translation as a system message to the chatBox
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: text,
          sender: "system",
          translatedLanguage: LANGUAGES.find(
            (lang) => lang.code === targetLanguage
          )?.name,
          systemsResponse: `Translation: ${translation}`,
          originalMessageId: messageId, // Link to the original user message that the system is replying to
        },
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Clear the chat history from local storage
  const handleClearChat = () => {
    setMessages([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return (
    // The Chat UI
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-3xl p-4 bg-gray-800 rounded-lg shadow-lg flex flex-col h-[90vh]">
        <div className="flex items-center justify-between border-b border-gray-700 pb-2 mb-4">
          {/* Master Chief Display Picture and Status */}
          <div className="mx-auto flex flex-col items-center">
            <Image
              src={masterChiefDp}
              alt="AI Assistant"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex items-center space-x-2 mt-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <h1 className="text-lg font-semibold">Master Chief</h1>
            </div>
            <p className="text-sm text-gray-400">
              {isProcessing ? "Typing..." : "Online"}
            </p>
          </div>

          {/* Menu: Clear and Back Buttons */}
          <div className="flex items-center space-x-4 relative" ref={menuRef}>
            <button
              className="text-gray-400 hover:text-white"
              onClick={() => {
                setShowMenu((prev) => !prev);
              }}
            >
              <CiMenuFries className="w-6 h-6" />
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute top-10 right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10 border border-white">
                <button
                  className="w-full text-left p-2 text-white hover:bg-red-500"
                  onClick={handleClearChat}
                >
                  Clear Chat
                </button>
                <button
                  className="w-full text-left p-2 text-white hover:bg-blue-500"
                  onClick={() => router.push("/")}
                >
                  Back
                </button>
                <button
                  className="w-full text-left p-2 text-white hover:bg-green-500"
                  onClick={() => setIsAboutModalOpen(true)}
                >
                  About Master Chief
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ChatBox */}
        <div
          ref={chatBoxRef}
          className="flex-1 overflow-y-auto space-y-3 p-2 chatBox"
        >
          {messages.length === 0 && (
            <p className="text-center text-gray-400">
              Start a conversation with Master Chief!
            </p>
          )}

          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {/* User's Message */}
              {message.sender === "user" && (
                <div className="flex flex-col w-full md:max-w-sm px-4 py-4 rounded-lg bg-blue-950 text-white">
                  <span>{message.text}</span>
                  <span className="text-xs text-right font-semibold text-gray-200 mt-1 mb-3">
                    {message.detectedLanguage}
                  </span>

                  {/* Action Buttons: Summarize and Translate */}
                  <div className="flex gap-2 mt-2 flex-col-reverse items-end">
                    {message.text.length > 150 &&
                      message.detectedLanguage === "Language: English" && (
                        <button
                          className="min-w-[120px] px-4 py-2 bg-blue-500 text-white text-sm hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
                          onClick={() =>
                            handleSummarizeText(message.id, message.text)
                          }
                          disabled={isProcessing}
                        >
                          Summarize
                        </button>
                      )}
                    <span className="flex gap-2 flex-col md:flex-row">
                      <select
                        className="min-w-[120px] px-4 py-2 border text-sm bg-gray-700 text-white"
                        value={message.targetLanguage}
                        onChange={(e) => {
                          const newTargetLanguage = e.target.value;
                          setMessages((prev) =>
                            prev.map((msg) =>
                              msg.id === message.id
                                ? { ...msg, targetLanguage: newTargetLanguage }
                                : msg
                            )
                          );
                        }}
                      >
                        {LANGUAGES.map((lang) => (
                          <option key={lang.code} value={lang.code}>
                            {lang.name}
                          </option>
                        ))}
                      </select>
                      <button
                        className="min-w-[120px] px-4 py-2 bg-purple-500 text-white text-sm hover:bg-purple-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        onClick={() =>
                          handleTranslateText(
                            message.id,
                            message.text,
                            message.targetLanguage
                          )
                        }
                        disabled={isProcessing}
                      >
                        Translate
                      </button>
                    </span>
                  </div>
                  <span className="mt-2 text-xs text-right">
                    {new Date(message.id).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              )}

              {/* System's Message: Summary or Translation */}
              {message.sender === "system" && (
                <div className="flex items-end gap-2 w-full">
                  <Image
                    src={masterChiefDp}
                    alt="AI Assistant"
                    className="w-7 h-7 rounded-full"
                  />
                  <div className="flex items-end gap-1 w-full md:max-w-sm px-4 py-4 rounded-lg bg-gray-700 text-gray-300">
                    <div className="flex flex-col w-full">
                      <>
                        <span className="w-full px-2 py-2 rounded-md bg-blue-400 text-white mb-3 text-sm">
                          {message.text.split(" ").length > 10
                            ? `${message.text
                                .split(" ")
                                .slice(0, 20)
                                .join(" ")}...`
                            : message.text}
                        </span>
                        <span>
                          {message.systemsResponse.includes("Summary") && (
                            <p className="text-sm font-bold">Summary:</p>
                          )}
                          {message.systemsResponse.includes("Translation") && (
                            <p className="text-sm font-bold">
                              Translation ({message.translatedLanguage}):
                            </p>
                          )}
                          <p>
                            {message.systemsResponse
                              .split(":")
                              .slice(1)
                              .join(":")}
                          </p>
                        </span>
                        <span className="mt-2 text-xs text-right">
                          {new Date(message.id).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Text Field for the user */}
        <div className="flex items-center p-2 border-t border-gray-700">
          <textarea
            className="w-full p-2 bg-gray-700 text-white rounded-lg resize-none outline-none"
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            disabled={isProcessing}
          />
          <button
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
            onClick={handleSendMessage}
            disabled={isProcessing}
          >
            <FiSend />
          </button>
        </div>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </div>

      {/* AboutMasterChief modal */}
      {isAboutModalOpen && (
        <AboutMasterChief onClose={() => setIsAboutModalOpen(false)} />
      )}
    </div>
  );
}

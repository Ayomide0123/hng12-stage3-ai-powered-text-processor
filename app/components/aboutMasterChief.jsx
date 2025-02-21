import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

export default function AboutMasterChief({ onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-20"
    >
      <div
        ref={modalRef}
        className="bg-gray-900 text-white rounded-lg shadow-lg w-full max-w-3xl max-h-[80vh] sm:max-h-[70vh] overflow-y-auto p-6 textArea"
      >
        <div className="flex justify-end">
          <button
            className="text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <IoClose size={40} />
          </button>
        </div>
        <h1
          className="text-3xl font-bold mb-4 text-center"
        >
          Master Chief
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">About The Master Chief</h2>
          <p className="text-gray-300">
            AI Text Processor (Master Chief) helps you detect languages,
            translate text, and summarize messages.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Features</h2>
          <ul className="text-gray-300 space-y-2">
            <li>
              <strong>Language Detection:</strong> Automatically detects the
              language of your message.
            </li>
            <li>
              <strong>Translation:</strong> Convert messages into English,
              Portuguese, Spanish, Russian, Turkish, or French.
            </li>
            <li>
              <strong>Summarization:</strong> Summarize long messages (150+
              words) with one click.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">How It Works</h2>
          <ul className="text-gray-300 space-y-2">
            <li>
              <strong>Send a Message:</strong> Type and send your text.
            </li>
            <li>
              <strong>Use Action Buttons:</strong> Translate or summarize
              messages easily.
            </li>
            <li>
              <strong>Clear Chat:</strong> Reset the chat anytime from the menu.
            </li>
          </ul>
        </section>

        {/* Supported Languages */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Supported Languages</h2>
          <div className="overflow-x-auto">
            <table
              className="w-full bg-gray-800 text-white rounded-lg"
            >
              <thead>
                <tr>
                  <th className="border px-4 py-2">Code</th>
                  <th className="border px-4 py-2">Language</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { code: "en", name: "English" },
                  { code: "pt", name: "Portuguese" },
                  { code: "es", name: "Spanish" },
                  { code: "ru", name: "Russian" },
                  { code: "tr", name: "Turkish" },
                  { code: "fr", name: "French" },
                ].map(({ code, name }) => (
                  <tr key={code}>
                    <td className="border px-4 py-2">{code}</td>
                    <td className="border px-4 py-2">{name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Important Note */}
        <p className="mt-6 text-sm text-center text-gray-400 opacity-80">
          <strong>**IMPORTANT**:</strong> If the features are not working, it
          could be due to a slow network or not meeting the{" "}
          <a
            href="https://developer.chrome.com/docs/ai/get-started"
            className="text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            requirements listed in the documentation.
          </a>
        </p>
      </div>
    </div>
  );
}

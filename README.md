# Master Chief AI

## Overview

Master Chief AI, an AI-Powered Text Processor, is a web application built with [Next.js](https://nextjs.org) that allows users to interact with an AI assistant. This application provides functionalities for language detection, text translation, and summarization, all in one seamless interface. Users can type messages, and the AI will respond with translations or summaries based on the input.

## Features

- **Language Detection**: Automatically detects the language of the input text.
- **Text Translation**: Translates text from one language to another.
- **Text Summarization**: Generates concise summaries of longer texts.
- **User-Friendly Interface**: A clean and intuitive UI for easy interaction with the AI assistant.

## Images

Here are some screenshots of the application:

![Landing Page]("./screenshots/landingPage.png")
*Landing Page: The initial interface where users can start interacting with the AI.*

![Chat Interface]("./screenshots/chatInterface.png")
*Chat Interface: The area where users can type messages and receive responses from the AI.*


## Getting Started

To get started with the AI-Powered Text Processor, follow these steps:

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/hng12-stage3-ai-powered-text-processor.git
   cd hng12-stage3-ai-powered-text-processor
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env.local` file in the root of the project and add the following variables:

   ```plaintext
   NEXT_PUBLIC_LANGUAGE_DETECTOR_TOKEN=your_language_detector_token
   NEXT_PUBLIC_TRANSLATOR_TOKEN=your_translator_token
   NEXT_PUBLIC_SUMMARIZATION_TOKEN=your_summarization_token
   NEXT_PUBLIC_HTTP_HEADER=origin-trial
   NEXT_PUBLIC_LOCAL_STORAGE_KEY=chatMessages
   ```

   Replace `your_language_detector_token`, `your_translator_token`, and `your_summarization_token` with the appropriate tokens for the respective APIs.

### Running the Application

To run the development server, use the following command:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the application in action.

### Usage

1. Start a conversation with Master Chief by typing a message in the input field.
2. The AI will detect the language of your message and respond accordingly.
3. You can request translations or summaries by clicking the respective buttons.

## Learn More

To learn more about Next.js and its features, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

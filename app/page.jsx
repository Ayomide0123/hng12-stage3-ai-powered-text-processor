import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="container mx-auto text-center">
      <h1 className="text-3xl font-bold text-center my-4">AI Text Processor</h1>
      <Link href="/chatBox">Chat</Link>
    </div>
    </div>
  );
}

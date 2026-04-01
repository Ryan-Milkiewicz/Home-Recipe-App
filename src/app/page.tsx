import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to My Next.js App
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        This is a simple landing page built with Next.js and Tailwind CSS.
      </p>
    </div>
  );
}

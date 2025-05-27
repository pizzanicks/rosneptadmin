'use client';

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-50">
      <div className="text-center p-6 bg-white shadow-lg rounded-xl">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Tailwind CSS is Working!</h1>
        <p className="text-xl text-gray-700">
          This is a test page to verify that Tailwind CSS is set up correctly in your Next.js project.
        </p>
        <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
          Test Button
        </button>
      </div>
    </div>
  )
}

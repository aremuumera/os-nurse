export default function NotFoundPage() {

    
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 p-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-6xl font-bold text-gray-800">404</h1>
          <p className="text-lg text-gray-600 mt-2">Oops! The page you're looking for doesn't exist.</p>
          <img 
            src="https://source.unsplash.com/400x300/?lost" 
            alt="Lost in space" 
            className="w-full max-w-xs mx-auto my-6 rounded-lg shadow-lg"
          />
          <a href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
            Go Home
          </a>
        </div>
      </div>
    );
  }
  
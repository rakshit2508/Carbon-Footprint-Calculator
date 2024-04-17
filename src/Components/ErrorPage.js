import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = ({ error }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">{error ? `Error ${error.code}` : '404 Error'}</h1>
      <p className="text-lg mb-8">{error ? error.message : 'Page not found.'}</p>
      <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">Go to Home Page</Link>
    </div>
  );
}

export default ErrorPage;

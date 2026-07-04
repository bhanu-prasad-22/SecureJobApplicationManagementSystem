import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center p-6 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-blue-600">JobTracker Pro</h1>
        <div className="space-x-4">
          <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium">Login</Link>
          <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
          Manage Your Career Growth <br />
          <span className="text-blue-600">With Precision.</span>
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mb-8">
          An enterprise-grade platform to track applications, manage interviews,
          and organize your job search journey. Built with Spring Boot 3.x and React.
        </p>

        <div className="flex space-x-4">
          <Link
            to="/register"
            className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-semibold shadow-lg hover:bg-blue-700 transition"
          >
            Create Account
          </Link>
          <Link
            to="/login"
            className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-50 transition"
          >
            Sign In
          </Link>
        </div>
      </main>

      {/* Features Simple Grid */}
      <footer className="bg-white py-10 border-t">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 text-center">
          <div>
            <h3 className="font-bold text-gray-800">Secure JWT Auth</h3>
            <p className="text-sm text-gray-500">Stateless REST API security for your data.</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Optimized Performance</h3>
            <p className="text-sm text-gray-500">JPA Lazy Loading ensures lightning-fast queries.</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Status Tracking</h3>
            <p className="text-sm text-gray-500">Atomic updates with Spring Transactional integrity.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
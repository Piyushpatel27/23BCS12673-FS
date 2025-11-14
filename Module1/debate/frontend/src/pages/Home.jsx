import React from "react";
import { FaGraduationCap, FaComments, FaGlobe } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export default function Home() {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-8 text-center bg-gradient-to-br from-blue-600/5 to-blue-600/10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-gray-800">
          Welcome to <span className="text-blue-600">ArguMate</span> 🎤
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Join intelligent debates powered by AI — pick your stance, challenge
          our AI opponent, and sharpen your critical thinking skills.
        </p>

      <button
        onClick={() =>
          isSignedIn ? navigate("/chatroom") : navigate("/sign-in")
        }
        className="!bg-blue-600 !text-white text-xl px-10 py-4 rounded-md font-semibold shadow-md hover:!bg-blue-700 transform transition-all duration-300 hover:scale-110 hover:shadow-lg"
      >
        Get Started
      </button>

      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-14 text-gray-800">
          Why Choose ArguMate?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <FaGraduationCap className="text-4xl text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Structured Learning
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Follow a guided approach to learn argumentation and reasoning
              through structured AI-led debates.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <FaComments className="text-4xl text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Real-time Practice
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Debate in real-time with the AI, get instant counterarguments,
              and enhance your persuasive communication.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <FaGlobe className="text-4xl text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Global Community
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Connect with thinkers worldwide, share ideas, and gain new
              perspectives from different backgrounds.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Begin Your Debate Journey?
        </h2>
        <p className="text-lg mb-8 max-w-xl mx-auto opacity-90">
          Join thousands of users improving their debate and communication
          skills with ArguMate.
        </p>
        <button
          onClick={() =>
            isSignedIn ? navigate("/chatroom") : navigate("/sign-in")
          }
          className="px-8 py-3 bg-white text-blue-600 rounded-md font-medium hover:bg-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          Start Now
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-white py-6 shadow-inner mt-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-blue-600 font-semibold text-lg">
            Contact: piyushpatel@gmail.com
          </div>
          <div className="text-blue-500 text-sm mt-1 opacity-80">
            © 2025 ArguMate — All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

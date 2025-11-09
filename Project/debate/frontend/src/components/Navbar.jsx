import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { MessageSquare } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white shadow-md sticky top-0 z-50">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <MessageSquare size={28} className="text-blue-400" />
        <h1
          className="text-2xl font-bold text-white tracking-wide"
          style={{
            fontFamily: "'Stack Sans Notch', sans-serif",
            letterSpacing: "-0.5px",
          }}
        >
          ArguMate
        </h1>
      </div>

      {/* Navigation Links */}
      <div className="space-x-6 flex items-center">
        <Link to="/" className="hover:text-blue-400 transition">
          Home
        </Link>
        <Link to="/dashboard" className="hover:text-blue-400 transition">
          Dashboard
        </Link>
        <Link to="/chatroom" className="hover:text-blue-400 transition">
          ChatRoom
        </Link>

        <SignedOut>
          <Link
            to="/sign-in"
            className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition shadow-md"
          >
            Login
          </Link>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
}

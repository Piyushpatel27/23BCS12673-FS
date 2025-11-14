import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";


export default function App() {
  return (
    <Router>
      <div className="bg-gray-900 min-h-screen text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chatroom" element={<ChatRoom />} />
          <Route path="/sign-in/*" element={<SignInPage />} /> {/* 👈 Add wildcard */}
          <Route path="/sign-up/*" element={<SignUpPage />} /> {/* 👈 Add wildcard */}
        </Routes>
      </div>
    </Router>
  );
}



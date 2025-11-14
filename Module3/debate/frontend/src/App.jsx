import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ChatRoom from "./pages/ChatRoom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

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



// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Dashboard from "./pages/Dashboard";
// import Chatroom from "./pages/ChatRoom";

// export default function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-950 text-white">
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/chatroom" element={<Chatroom />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

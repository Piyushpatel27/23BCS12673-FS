import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const steps = [
    { n:"01", t:"Create your account", d:"Sign in or sign up using Clerk. Zero setup friction." },
    { n:"02", t:"Visit Dashboard", d:"See your debates, stats, topics & progress." },
    { n:"03", t:"Enter Debate Arena", d:"Type topic → choose stance → start arguing." },
    { n:"04", t:"Get AI Analysis", d:"ArguMate evaluates your points & counters." },
  ];

  return (
    <div className="flex flex-col items-center min-h-[100vh] text-center space-y-12 px-6 py-10">

      {/* hero */}
      <h1 className="text-5xl font-bold text-blue-400 mt-10">
        Welcome to ArguMate 🎤
      </h1>

      <p className="text-gray-300 max-w-lg">
        Join intelligent debates powered by AI. Sign in, pick your stance, and
        challenge the AI with your best arguments!
      </p>
      
      <button
        onClick={() => navigate("/chatroom")}
        className="px-10 py-16 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold rounded-lg shadow-md
                  hover:shadow-xl hover:from-blue-500 hover:to-indigo-400 transition-all duration-300 hover:-translate-y-1
                  hover:scale-105"
      >
        Get Started
      </button>



      {/* spiral steps */}
      <div className="mt-20 flex flex-col gap-12 max-w-3xl w-full">

        {steps.map((s,i) => {
          
          const left = i % 2 === 0; // 0,2 on left — 1,3 on right

          return (
            <div key={i} className="relative w-full flex">
              
              {/* card */}
              <div className={`${left ? "ml-0 mr-auto" : "mr-0 ml-auto"} 
                              w-[260px] bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5
                              transition-transform hover:-translate-y-1 duration-300`}>
                <div className="text-blue-300 font-semibold text-lg mb-1">
                  {s.n} — {s.t}
                </div>
                <div className="text-gray-300 text-sm leading-relaxed">{s.d}</div>
              </div>

              {/* arrow connector */}
              {i < steps.length-1 && (
                <div
                  className={`absolute top-1/2 -translate-y-1/2 text-3xl text-blue-400 font-bold
                              ${left ? "right-[290px]" : "left-[290px]"}`}
                >
                  {left ? "←" : "→"}

                </div>
              )}

            </div>
          );
        })}

      </div>


      {/* footer */}
      <footer className="w-full bg-white py-6 mt-24 shadow-inner">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-blue-600 font-semibold text-lg">
            contact: piyushpatel@gmail.com
          </div>
          <div className="text-blue-500 text-sm mt-1 opacity-80">
            © 2025 ArguMate — All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}

import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const debates = [
    { id: 1, topic: "Should AI have human-like rights?", status: "Active" },
    { id: 2, topic: "Is remote work the future?", status: "Completed" },
    { id: 3, topic: "Can social media be truly regulated?", status: "Pending" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 px-6 py-12">
      <h1 className="text-4xl font-bold text-blue-400 mb-8 text-center">
        Your Dashboard
      </h1>

      <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700">
        <h2 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-2">
          Recent Debates
        </h2>

        <div className="space-y-4">
          {debates.map((debate) => (
            <div
              key={debate.id}
              className="flex justify-between items-center p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-300"
            >
              <span className="font-medium">{debate.topic}</span>
              <span
                className={`px-3 py-1 rounded-md text-sm font-semibold ${
                  debate.status === "Active"
                    ? "bg-green-600 text-white"
                    : debate.status === "Completed"
                    ? "bg-gray-500 text-white"
                    : "bg-yellow-500 text-black"
                }`}
              >
                {debate.status}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate("/chatroom")}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-blue-500 hover:to-indigo-400 transition-all duration-300"
          >
            Start New Debate
          </button>
        </div>
      </div>
    </div>
  );
}

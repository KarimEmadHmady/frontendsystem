import axios from "axios";
import { useState } from "react";
import BASE_URL from "../../redux/constants";

const ClearSessionsButton = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleClearSessions = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.delete(`${BASE_URL}/api/sessions/clear`);
      setMessage(response.data.message);
    } catch (error) {
      console.error("🔴 Error clearing sessions:", error);
      setMessage("❌ Failed to clear sessions.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={handleClearSessions}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Clearing..." : "Clear All Sessions"}
      </button>
      {message && <p className="mt-2 text-gray-700">{message}</p>}
    </div>
  );
};

export default ClearSessionsButton;

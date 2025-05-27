import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import logo from "../../assets/logo.png";
import { supabase } from "../../supabaseClient";
import { Link, useNavigate } from "react-router-dom";

export default function AlumniWaveLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

    setLoading(false);
    if (signInError) {
      setError(signInError.message || "Invalid login credentials.");
    } else if (signInData.session) {
      navigate("/dashboard");
    } else {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login submitted:", { email, password });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="AlumniWave Logo" className="  object-contain" />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-500 mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <input
                type="email"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                type="password"
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Password"
                v
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Link to="/dashboard">
            <button
              type="submit"
              onClick={handleLogin}
              className="w-full mt-6 py-3 px-4 bg-[#269EB2] hover:bg-[#269EB2] text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </Link>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-medium text-[#269EB2] hover:text-cyan-500"
            >
              Sign up now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

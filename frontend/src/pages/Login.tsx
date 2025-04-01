import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import worknest from "../assets/worknest.svg";

interface ApiErrorResponse {
  message: string;
  code?: string;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      setIsLoading(false);

      if (error.response?.status === 423 || error.response?.data?.code === "ACCOUNT_LOCKED") {
        setError("Account locked. Enter OTP sent to your email.");
        setShowOtpInput(true);
      } else {
        setError(error.response?.data?.message || "Invalid credentials.");
        setShowOtpInput(false);
      }
    }
  };

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!otp) {
      setError("Please enter the OTP.");
      setIsLoading(false);
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/unlock`, { email, otp });
      setIsLoading(false);
      setShowOtpInput(false);
      setOtp("");
      setPassword("");
      setError("Account unlocked successfully! Please log in.");
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      setIsLoading(false);
      setError(error.response?.data?.message || "Invalid OTP. Try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-blue-500 text-white p-10">
        <h1 className="text-4xl font-bold">WorkNest</h1>
        <p className="mt-4 text-lg text-center">Your personalized job portal to find opportunities that match your skills.</p>
        <img src={worknest} alt="WorkNest illustration" className="mt-6 w-1/4" />
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-4">{showOtpInput ? "Unlock Account" : "Login to WorkNest"}</h2>

          {error && <p className={`text-center mb-3 ${error.includes("success") ? "text-green-600" : "text-red-500"}`}>{error}</p>}

          <form onSubmit={showOtpInput ? handleUnlock : handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition-all duration-200 disabled:bg-gray-200"
              required
              disabled={isLoading || showOtpInput}
            />

            {!showOtpInput && (
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                required
                disabled={isLoading}
              />
            )}

            {showOtpInput && (
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                required
                disabled={isLoading}
                inputMode="numeric"
                autoComplete="one-time-code"
              />
            )}

            <button
              type="submit"
              className="cursor-pointer w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200 disabled:bg-blue-300"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : showOtpInput ? "Unlock Account" : "Login"}
            </button>
          </form>

          {!showOtpInput && (
            <p className="text-center mt-4 text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="cursor-pointer text-blue-500 hover:underline transition-all duration-200"
                disabled={isLoading}
              >
                Sign up
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

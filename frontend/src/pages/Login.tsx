import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

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
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        { email, password }
      );
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      setIsLoading(false);

      if (error.response) {
        if (
          error.response.status === 423 ||
          error.response.data?.code === "ACCOUNT_LOCKED"
        ) {
          setError(
            error.response.data.message ||
              "Account locked due to failed attempts. Enter OTP sent to your email."
          );
          setShowOtpInput(true); // Show OTP field
        } else {
          // Handle other errors like invalid credentials (e.g., 401 Unauthorized)
          setError(error.response.data.message || "Invalid email or password.");
          setShowOtpInput(false); // Ensure OTP field is hidden
        }
      } else {
        setError("Login failed. Please check your connection and try again.");
        setShowOtpInput(false);
      }
    }
  };

  // --- OTP Unlock Handler ---
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
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/unlock`,
        { email, otp } // Send email and OTP
      );

      setIsLoading(false);
      setShowOtpInput(false);
      setOtp("");
      setPassword("");
      setError(
        "Account unlocked successfully! Please enter your password to log in."
      );
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      setIsLoading(false);

      if (error.response) {
        setError(
          error.response.data.message ||
            "Invalid or expired OTP. Please try again."
        );
      } else {
        setError("Failed to unlock account. Please try again later.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {showOtpInput ? "Unlock Account" : "Login"}
        </h2>

        {/* Display general errors or success messages post-unlock */}
        {error && (
          <p
            className={`text-center mb-3 ${
              error.includes("success") ? "text-green-600" : "text-red-500"
            }`}
          >
            {error}
          </p>
        )}

        <form
          onSubmit={showOtpInput ? handleUnlock : handleLogin}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            required
            disabled={isLoading || showOtpInput} // Optionally disable email when showing OTP
          />

          {!showOtpInput && (
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
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
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              required
              disabled={isLoading}
              inputMode="numeric"
              autoComplete="one-time-code"
            />
          )}

          <button
            type="submit"
            className="w-full cursor-pointer p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
            disabled={isLoading}
          >
            {isLoading
              ? "Processing..."
              : showOtpInput
              ? "Unlock Account"
              : "Login"}
          </button>
        </form>

        {!showOtpInput && ( // Only show signup link in initial login state
          <p className="text-center mt-4 text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-blue-500 cursor-pointer hover:underline disabled:text-gray-400"
              disabled={isLoading}
            >
              Sign up
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;

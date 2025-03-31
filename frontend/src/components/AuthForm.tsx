import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { authAtom } from "../atoms/authAtom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AuthForm = ({ type }: { type: "login" | "signup" }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [, setAuth] = useAtom(authAtom);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint =
        type === "login" ? "/api/auth/login" : "/api/auth/signup";
      const { data } = await axios.post(`${BACKEND_URL}${endpoint}`, formData);
      setAuth({ user: data.user, token: data.token });
      navigate("/dashboard");
    } catch (error) {
      console.error("Authentication failed", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-xl font-semibold mb-4">
          {type === "login" ? "Login" : "Sign Up"}
        </h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {type === "login" ? "Login" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;

import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock } from "react-icons/fa";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAuth = async () => {
    try {
      if (isSignup) {
        const res = await API.post("/auth/register", formData);

        alert(res.data?.message || "Signup Successful 🚀");
        setIsSignup(false);
      } else {
        const res = await API.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        // 🔥 SAFE TOKEN HANDLING
        if (res.data?.token) {
          localStorage.setItem("token", res.data.token);

          alert("Login Successful 🚀");

          navigate("/dashboard");
        } else {
          alert("Login failed: Token not received");
        }
      }
    } catch (err) {
      console.log("Auth Error:", err.response?.data || err.message);

      alert(
        err.response?.data?.message ||
          "Authentication Failed (check email/password)"
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center overflow-hidden relative text-white">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

      {/* Glow Effects */}
      <div className="absolute w-[700px] h-[700px] bg-cyan-500/20 rounded-full blur-3xl top-[-200px] left-[-200px]" />
      <div className="absolute w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl bottom-[-150px] right-[-150px]" />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-[430px] bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[32px] p-10"
      >
        <h1 className="text-4xl font-bold text-center mb-2">
          CRM<span className="text-cyan-400">Pro</span>
        </h1>

        <p className="text-center text-gray-300 mb-6">
          AI Powered Enterprise Dashboard
        </p>

        {/* Name (Signup only) */}
        {isSignup && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-black/30 border border-white/10 mb-4 outline-none"
          />
        )}

        {/* Email */}
        <div className="flex items-center bg-black/30 border border-white/10 rounded-2xl px-4 mb-4">
          <FaEnvelope className="text-cyan-400" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-4 bg-transparent outline-none"
          />
        </div>

        {/* Password */}
        <div className="flex items-center bg-black/30 border border-white/10 rounded-2xl px-4 mb-6">
          <FaLock className="text-purple-400" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-4 bg-transparent outline-none"
          />
        </div>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAuth}
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 p-4 rounded-2xl font-bold"
        >
          {isSignup ? "Create Account" : "Login"}
        </motion.button>

        {/* Toggle */}
        <p className="text-center text-gray-300 mt-6">
          {isSignup ? "Already have an account?" : "Don't have an account?"}

          <span
            onClick={() => setIsSignup(!isSignup)}
            className="text-cyan-400 ml-2 cursor-pointer"
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
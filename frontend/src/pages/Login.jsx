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
        await API.post("/auth/register", formData);

        alert("Signup Successful 🚀");
        setIsSignup(false);
      } else {
        const res = await API.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem("token", res.data.token);

        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      alert("Authentication Failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center overflow-hidden relative text-white">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

      {/* Neon Glow */}
      <div className="absolute w-[700px] h-[700px] bg-cyan-500/20 rounded-full blur-3xl top-[-200px] left-[-200px] animate-pulse" />

      <div className="absolute w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl bottom-[-150px] right-[-150px] animate-pulse" />

      <div className="absolute w-[300px] h-[300px] bg-pink-500/20 rounded-full blur-3xl top-[40%] left-[40%]" />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating Particles */}
      <div className="absolute top-20 left-20 w-3 h-3 bg-cyan-400 rounded-full animate-bounce" />
      <div className="absolute bottom-32 right-32 w-4 h-4 bg-purple-400 rounded-full animate-ping" />
      <div className="absolute top-1/2 left-10 w-2 h-2 bg-pink-400 rounded-full animate-pulse" />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-[430px] bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[32px] p-10 shadow-[0_0_60px_rgba(0,255,255,0.15)]"
      >

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.05 }}
            className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-4xl font-bold shadow-2xl"
          >
            C
          </motion.div>
        </div>

        <h1 className="text-5xl font-black text-center">
          CRM<span className="text-cyan-400">Pro</span>
        </h1>

        <p className="text-center text-gray-300 mt-3 mb-8">
          AI Powered Enterprise Dashboard
        </p>

        {/* Signup Name */}
        {isSignup && (
          <motion.input
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-black/30 border border-white/10 outline-none mb-4"
          />
        )}

        {/* Email */}
        <div className="flex items-center bg-black/30 border border-white/10 rounded-2xl px-4 mb-4 hover:border-cyan-400 transition">
          <FaEnvelope className="text-cyan-400" />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full p-4 bg-transparent outline-none"
          />
        </div>

        {/* Password */}
        <div className="flex items-center bg-black/30 border border-white/10 rounded-2xl px-4 mb-6 hover:border-purple-400 transition">
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
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 p-4 rounded-2xl font-bold text-lg shadow-2xl"
        >
          {isSignup ? "Create Account" : "Login"}
        </motion.button>

        {/* Toggle */}
        <p className="text-center text-gray-300 mt-6">
          {isSignup
            ? "Already have an account?"
            : "Don't have an account?"}

          <span
            onClick={() => setIsSignup(!isSignup)}
            className="text-cyan-400 ml-2 cursor-pointer hover:text-cyan-300"
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
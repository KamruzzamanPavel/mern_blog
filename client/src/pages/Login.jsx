import React, { useState } from "react";
import axios from "axios";
import { saveToken, decodeToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { motion } from "framer-motion";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        "http://localhost:5555/api/auth/login",
        form,
        { withCredentials: true }
      );
      saveToken(data.accessToken);
      setUser(decodeToken());
      navigate("/");
    } catch (error) {
      console.error("Login Failed", error);
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Illustration Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 bg-indigo-50 p-8 flex items-center justify-center"
        >
          <div className="relative w-full max-w-md">
            <svg
              viewBox="0 0 800 600"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
            >
              {/* Animated background elements */}
              <motion.path
                d="M0,500 Q200,450 400,500 T800,500 L800,600 L0,600 Z"
                fill="#f0f4ff"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
              />

              {/* Decorative plants with animation */}
              <motion.g
                id="left-plant"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <path
                  d="M100,400 C120,350 80,300 60,370 C40,420 90,450 100,400"
                  fill="#8adb92"
                />
                <path
                  d="M70,420 C90,370 50,320 30,390 C10,440 60,470 70,420"
                  fill="#a5e6af"
                />
              </motion.g>

              <motion.g
                id="right-plant"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <path
                  d="M700,400 C720,350 690,310 670,350 C650,400 680,430 700,400"
                  fill="#d1dbf0"
                />
                <path
                  d="M720,420 C740,370 710,330 690,370 C670,420 700,450 720,420"
                  fill="#bfcdea"
                />
                <ellipse
                  cx="710"
                  cy="370"
                  rx="10"
                  ry="20"
                  fill="#d1dbf0"
                  transform="rotate(-30 710 370)"
                />
                <ellipse
                  cx="730"
                  cy="390"
                  rx="10"
                  ry="20"
                  fill="#bfcdea"
                  transform="rotate(-20 730 390)"
                />
              </motion.g>

              {/* Phone with animation */}
              <motion.g
                id="phone"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <rect
                  x="280"
                  y="100"
                  width="240"
                  height="440"
                  rx="30"
                  fill="#3b5998"
                />
                <rect
                  x="295"
                  y="130"
                  width="210"
                  height="380"
                  rx="5"
                  fill="#f5f7fa"
                />
                <rect
                  x="340"
                  y="115"
                  width="120"
                  height="8"
                  rx="4"
                  fill="#2a4278"
                />
              </motion.g>

              {/* Animated message bubbles */}
              <motion.g
                id="phone-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, staggerChildren: 0.1 }}
              >
                <motion.g initial={{ y: 20 }} animate={{ y: 0 }}>
                  <rect
                    x="315"
                    y="180"
                    width="170"
                    height="60"
                    rx="10"
                    fill="#ebedf0"
                  />
                  <circle cx="330" cy="195" r="15" fill="#d0d6e0" />
                  <rect
                    x="355"
                    y="185"
                    width="120"
                    height="8"
                    rx="4"
                    fill="#d0d6e0"
                  />
                  <rect
                    x="355"
                    y="200"
                    width="100"
                    height="8"
                    rx="4"
                    fill="#d0d6e0"
                  />
                  <rect
                    x="355"
                    y="215"
                    width="80"
                    height="8"
                    rx="4"
                    fill="#d0d6e0"
                  />
                </motion.g>

                <motion.g initial={{ y: 20 }} animate={{ y: 0 }}>
                  <rect
                    x="315"
                    y="260"
                    width="170"
                    height="60"
                    rx="10"
                    fill="#ffcc4d"
                  />
                  <circle cx="330" cy="275" r="15" fill="#f8a100" />
                  <rect
                    x="355"
                    y="265"
                    width="120"
                    height="8"
                    rx="4"
                    fill="#f39c12"
                  />
                  <rect
                    x="355"
                    y="280"
                    width="100"
                    height="8"
                    rx="4"
                    fill="#f39c12"
                  />
                  <rect
                    x="355"
                    y="295"
                    width="80"
                    height="8"
                    rx="4"
                    fill="#f39c12"
                  />
                </motion.g>

                <motion.g initial={{ y: 20 }} animate={{ y: 0 }}>
                  <rect
                    x="315"
                    y="340"
                    width="170"
                    height="60"
                    rx="10"
                    fill="#ebedf0"
                  />
                  <circle cx="330" cy="355" r="15" fill="#d0d6e0" />
                  <rect
                    x="355"
                    y="345"
                    width="120"
                    height="8"
                    rx="4"
                    fill="#d0d6e0"
                  />
                  <rect
                    x="355"
                    y="360"
                    width="100"
                    height="8"
                    rx="4"
                    fill="#d0d6e0"
                  />
                  <rect
                    x="355"
                    y="375"
                    width="80"
                    height="8"
                    rx="4"
                    fill="#d0d6e0"
                  />
                </motion.g>

                <motion.g initial={{ y: 20 }} animate={{ y: 0 }}>
                  <rect
                    x="315"
                    y="420"
                    width="170"
                    height="60"
                    rx="10"
                    fill="#ebedf0"
                  />
                  <circle cx="330" cy="435" r="15" fill="#d0d6e0" />
                  <rect
                    x="355"
                    y="425"
                    width="120"
                    height="8"
                    rx="4"
                    fill="#d0d6e0"
                  />
                  <rect
                    x="355"
                    y="440"
                    width="100"
                    height="8"
                    rx="4"
                    fill="#d0d6e0"
                  />
                  <rect
                    x="355"
                    y="455"
                    width="80"
                    height="8"
                    rx="4"
                    fill="#d0d6e0"
                  />
                </motion.g>
              </motion.g>

              {/* Person with animation */}
              <motion.g
                id="person"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <rect
                  x="200"
                  y="350"
                  width="70"
                  height="120"
                  rx="20"
                  fill="#e4eaf6"
                />
                <circle cx="230" cy="330" r="30" fill="#2c62c8" />
                <path
                  d="M210,325 Q230,345 250,325"
                  fill="none"
                  stroke="#193775"
                  strokeWidth="2"
                />
                <rect
                  x="270"
                  y="370"
                  width="80"
                  height="20"
                  rx="10"
                  fill="#4a7afc"
                  transform="rotate(20 270 370)"
                />
                <circle cx="350" cy="390" r="10" fill="#2c62c8" />
                <rect
                  x="160"
                  y="380"
                  width="60"
                  height="20"
                  rx="10"
                  fill="#4a7afc"
                  transform="rotate(-20 160 380)"
                />
                <rect
                  x="210"
                  y="470"
                  width="20"
                  height="80"
                  rx="10"
                  fill="#2c385e"
                />
                <rect
                  x="240"
                  y="470"
                  width="20"
                  height="80"
                  rx="10"
                  fill="#2c385e"
                />
                <ellipse cx="210" cy="550" rx="20" ry="10" fill="#1e2945" />
                <ellipse cx="250" cy="550" rx="20" ry="10" fill="#1e2945" />
                <circle cx="350" cy="285" r="8" fill="#2c62c8" />
              </motion.g>

              {/* Papers with animation */}
              <motion.g
                id="papers"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <rect
                  x="580"
                  y="500"
                  width="140"
                  height="80"
                  rx="5"
                  fill="#ffffff"
                  transform="rotate(-5 580 500)"
                />
                <rect
                  x="590"
                  y="510"
                  width="100"
                  height="8"
                  rx="4"
                  fill="#d0d6e0"
                  transform="rotate(-5 590 510)"
                />
                <rect
                  x="590"
                  y="525"
                  width="120"
                  height="8"
                  rx="4"
                  fill="#d0d6e0"
                  transform="rotate(-5 590 525)"
                />
                <rect
                  x="590"
                  y="540"
                  width="80"
                  height="8"
                  rx="4"
                  fill="#d0d6e0"
                  transform="rotate(-5 590 540)"
                />

                <rect
                  x="570"
                  y="510"
                  width="140"
                  height="80"
                  rx="5"
                  fill="#f0f2f5"
                  transform="rotate(-2 570 510)"
                />
                <rect
                  x="580"
                  y="520"
                  width="100"
                  height="8"
                  rx="4"
                  fill="#d0d6e0"
                  transform="rotate(-2 580 520)"
                />
                <rect
                  x="580"
                  y="535"
                  width="120"
                  height="8"
                  rx="4"
                  fill="#d0d6e0"
                  transform="rotate(-2 580 535)"
                />
                <rect
                  x="580"
                  y="550"
                  width="80"
                  height="8"
                  rx="4"
                  fill="#d0d6e0"
                  transform="rotate(-2 580 550)"
                />

                <rect
                  x="565"
                  y="520"
                  width="140"
                  height="80"
                  rx="5"
                  fill="#ffffff"
                />
                <rect
                  x="575"
                  y="530"
                  width="100"
                  height="8"
                  rx="4"
                  fill="#d0d6e0"
                />
                <rect
                  x="575"
                  y="545"
                  width="120"
                  height="8"
                  rx="4"
                  fill="#d0d6e0"
                />
                <rect
                  x="575"
                  y="560"
                  width="80"
                  height="8"
                  rx="4"
                  fill="#d0d6e0"
                />
              </motion.g>
            </svg>
          </div>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex justify-end mt-1">
                <a
                  href="/forgot-password"
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>

            <motion.button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </motion.button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <motion.button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                whileHover={{ y: -2 }}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 4.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.button>

              <motion.button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                whileHover={{ y: -2 }}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </motion.button>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;

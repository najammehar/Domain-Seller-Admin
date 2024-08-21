import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { Input } from "../components";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldError, setFieldError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    setFieldError(false);

    if (!email || !password) {
      setFieldError(true);
      return;
    }

    try {
      await dispatch(login({ email, password })).unwrap();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error in login", error);
    }
  };

  return (
    <section className="flex px-6 justify-center items-center h-screen">
      <div className="max-w-md w-full space-y-6">
        <div className="space-y-2">
          <h1 className="text-orange-500 text-center text-2xl font-bold">
            DOMAINIA
          </h1>
          <p className="text-gray-100 text-center text-xl sm:text-xl font-semibold">
            Login to Admin Panel
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-2">
        {error && <p className="text-red-500 text-center ">{error}</p>}
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            value={email}
            error={fieldError && !email ? "Email is required" : ""}
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            value={password}
            error={fieldError && !password ? "Password is required" : ""}
          />
          <button
            disabled={loading}
            className="bg-orange-500 px-3 py-2 rounded-md block w-full text-gray-100 font-semibold hover:bg-orange-600 active:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <p className="text-gray-500 text-sm text-center">
          Developed by Najam Ul Hassan
        </p>
      </div>
    </section>
  );
}

export default Login;
//Packages ⬇️
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
//Redux actions ⬇️
import { loginUser } from "../../redux/slices/authSlice"; // Import login action
import useWSNotifications from "../../hooks/useWSNotifications";
//Styles ⬇️
import './styles.css';
import { ArrowUTurnLeftIcon, EyeOffIcon, EyeIcon } from "../../assets/icons";

const Login = () => {
  useWSNotifications();
  const [email, setEmail] = useState(""); // Store user email
  const [password, setPassword] = useState(""); // Store user password
  const [showPassword, setShowPassword] = useState(false); // Store password visibility state

  const dispatch = useDispatch(); // Hook to send actions to redux
  const navigate = useNavigate(); //Hook to navigate between hooks

  const { loading, error } = useSelector((state) => state.auth); // Get loading and error states from Redux store

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      await dispatch(loginUser({ email, password })).unwrap(); // Dispatch login action and wait for it to complete
      navigate("/dashboard"); // Redirect to dashboard on successful login
    } catch (err) {
      console.error("Login failed:", err); // Log error if login fails
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <Link to="/" className="login-arrow-container">
          <ArrowUTurnLeftIcon className="arrow-icon" />
        </Link>
        <h2 className="login-title">Iniciar Sesión</h2>
        <p className="login-text">Completa  todos los campos para acceder a tu cuenta.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-input-container">
            <input
              className="login-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="off"
            />
          </div> 
          <div className="login-input-container"> 
            <input
              className="login-input"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="off"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeIcon className="eye-icon" /> : <EyeOffIcon className="eye-off-icon"/>} {/* Toggle password visibility */}
            </button>
          </div>
          <button type="submit" disabled={loading} className="login-button">
            {loading ? "Ingresando..." : "Ingresar"} {/* Button text changes based on loading state */}
          </button>
        </form>
        {error && <p>{error.message}</p>} 
      </div>
    </div>
  );
};

export default Login;
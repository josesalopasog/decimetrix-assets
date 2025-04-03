//Packages ⬇️
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//Redux actions ⬇️
import { loginUser } from "../../redux/slices/authSlice"; // Import login action


const Login = () => {
  const [email, setEmail] = useState(""); // Store user email
  const [password, setPassword] = useState(""); // Store user password
  
  const dispatch = useDispatch(); // Hook to send actions to redux
  const navigate = useNavigate(); //Hook to navigate between hooks
  
  const { loading, error } = useSelector((state) => state.auth); // Get loading and error states from Redux store

  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission behavior
    const result = await dispatch(loginUser({ email, password })); // Dispatch login action

    if (loginUser.fulfilled.match(result)) {
      navigate("/dashboard"); // Redirect to dashboard after successful login
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {error && <p>{error.message}</p>} {/* Display errors if login fails */}
    </div>
  );
};

export default Login;
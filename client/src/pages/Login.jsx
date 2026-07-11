import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/home");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <>
      <style>
        {`
          *{
            box-sizing:border-box;
          }

          .login-page{
            min-height:100vh;
            display:flex;
            justify-content:center;
            align-items:center;
            padding:20px;

            background:linear-gradient(
              135deg,
              #1877f2,
              #4f46e5
            );
          }

          .login-card{
            width:100%;
            max-width:420px;

            background:white;
            padding:35px;

            border-radius:20px;

            box-shadow:
            0 10px 30px rgba(0,0,0,.15);
          }

          .login-logo{
            text-align:center;
            margin-bottom:25px;
          }

          .login-logo h1{
            color:#1877f2;
            margin-bottom:8px;
          }

          .login-logo p{
            color:#666;
          }

          .login-form{
            display:flex;
            flex-direction:column;
            gap:15px;
          }

          .login-input{
            padding:14px;
            border:1px solid #ddd;
            border-radius:10px;
            font-size:15px;
            outline:none;
          }

          .login-input:focus{
            border-color:#1877f2;
          }

          .login-btn{
            background:#1877f2;
            color:white;
            border:none;

            padding:14px;

            border-radius:10px;

            cursor:pointer;

            font-size:16px;
            font-weight:600;

            transition:.3s;
          }

          .login-btn:hover{
            background:#0d65d9;
          }

          .register-link{
            text-align:center;
            margin-top:20px;
          }

          .register-link a{
            color:#1877f2;
            text-decoration:none;
            font-weight:600;
          }

          @media(max-width:480px){

            .login-card{
              padding:25px;
            }

            .login-logo h1{
              font-size:28px;
            }
          }
        `}
      </style>

      <div className="login-page">

        <div className="login-card">

          <div className="login-logo">
            <h1>SocialApp</h1>
            <p>Welcome Back 👋</p>
          </div>

          <form
            className="login-form"
            onSubmit={handleSubmit}
          >

            <input
              className="login-input"
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              required
            />

            <input
              className="login-input"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />

            <button
              className="login-btn"
              type="submit"
            >
              Login
            </button>

          </form>

          <div className="register-link">
            Don't have an account?{" "}
            <Link to="/register">
              Register Here
            </Link>
          </div>

        </div>

      </div>
    </>
  );
}

export default Login;
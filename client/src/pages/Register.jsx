import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
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
      await API.post("/auth/register", form);

      alert("Registration Successful");

      navigate("/");
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

          .register-page{
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

          .register-card{
            width:100%;
            max-width:450px;

            background:white;
            padding:35px;

            border-radius:20px;

            box-shadow:
            0 10px 30px rgba(0,0,0,.15);
          }

          .register-logo{
            text-align:center;
            margin-bottom:25px;
          }

          .register-logo h1{
            color:#1877f2;
            margin-bottom:8px;
          }

          .register-logo p{
            color:#666;
          }

          .register-form{
            display:flex;
            flex-direction:column;
            gap:15px;
          }

          .register-input{
            padding:14px;
            border:1px solid #ddd;
            border-radius:10px;
            font-size:15px;
            outline:none;
          }

          .register-input:focus{
            border-color:#1877f2;
          }

          .register-btn{
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

          .register-btn:hover{
            background:#0d65d9;
          }

          .login-link{
            text-align:center;
            margin-top:20px;
          }

          .login-link a{
            color:#1877f2;
            text-decoration:none;
            font-weight:600;
          }

          @media(max-width:480px){

            .register-card{
              padding:25px;
            }

            .register-logo h1{
              font-size:28px;
            }
          }
        `}
      </style>

      <div className="register-page">

        <div className="register-card">

          <div className="register-logo">
            <h1>SocialApp</h1>
            <p>Create Your Account 🚀</p>
          </div>

          <form
            className="register-form"
            onSubmit={handleSubmit}
          >

            <input
              className="register-input"
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />

            <input
              className="register-input"
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              className="register-input"
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button
              className="register-btn"
              type="submit"
            >
              Create Account
            </button>

          </form>

          <div className="login-link">
            Already have an account?{" "}
            <Link to="/">
              Login Here
            </Link>
          </div>

        </div>

      </div>
    </>
  );
}

export default Register;
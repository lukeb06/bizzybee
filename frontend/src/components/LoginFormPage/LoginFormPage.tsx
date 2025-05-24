import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { useAppSelector } from "../../redux/store";



function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useAppSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});

  if (sessionUser) return <Navigate to="/" replace={true} />;
    const demoLogin = () => {
      setEmail('demo@aa.io');
      setPassword('password');
    }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email: email,
        password: password,
      })
    );
  

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="login-container">
      {errors.length > 0 &&
        errors.map((message: string) => <p key={message}>{message}</p>)}
      <form onSubmit={(e) => handleSubmit(e)} className="login-form">
        <h1 className="login-title">Log In To Yelp</h1>
        <p className="login-text">By continuing, you agree to Yelp’s Terms of Service and acknowledge Yelp’s Privacy Policy.</p>


        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          className="login-input"
          required
        />

        {errors.email && <p>{errors.email}</p>}

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="password"
          className="login-input"
        />

        {errors.password && <p>{errors.password}</p>}
        <button type="submit" className="login-button">Log In</button>
        <button id="demo-login-button" type="button" onClick={()=>{demoLogin()}}>
          Demo Login
        </button>
      </form>
      <div className="yelp-image-container"><img src="https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png" className="yelp-login-image" /></div>
    </div>
  );
}

export default LoginFormPage;

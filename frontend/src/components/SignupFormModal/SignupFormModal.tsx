import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import { FaUserCircle } from 'react-icons/fa';
import "./SignupForm.css";



interface ISignUpErrors {
  server?: any;
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}


function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<ISignUpErrors>({
    server: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });
  const { closeModal } = useModal();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="sign-up-modal-div">
      <FaUserCircle style={{ color: '#7d7a85' }} className="profile-pic"/>
      <h1>Sign Up For Yelp</h1>
      <h2>Connect with great local businesses</h2>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit} className="sign-up-form">
     
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        {errors.email && <p>{errors.email}</p>}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
      
        {errors.username && <p>{errors.username}</p>}
       
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
       
        {errors.password && <p>{errors.password}</p>}
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;

import { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from "../components/ErrorMessage";
import AppContext from "../context/AppContext";
import { createUser } from "../services/apiRequests";

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setUserData, setIsLogged } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { message, user, token } = await createUser({ name, email, password });

    if (message) {
      setErrorMessage(message);
    } else {
      const userData = { ...user, token };
      
      localStorage.setItem('user', JSON.stringify(userData));
      setUserData(userData);
      
      setIsLogged(true);
      setErrorMessage('');
      setName('');
      setEmail('');
      setPassword('');
      navigate('/');
    }
  }


  return (
    <div>
      <form onSubmit={ (e) => handleSubmit(e) }>
        <label htmlFor="input-name-register">
          Name:
          <input
            type="text"
            id="input-name-register"
            name="input-name-register"
            onChange={ (e) => setName(e.target.value) }
            value={ name }
          />
        </label>

        <label htmlFor="input-email-register">
          Email:
          <input
            type="email"
            id="input-email-register"
            name="input-email-register"
            onChange={ (e) => setEmail(e.target.value) }
            value={ email }
          />
        </label>

        <label htmlFor="input-password-register">
          Password:
          <input
            type="password"
            id="input-password-register"
            name="input-password-register"
            onChange={ (e) => setPassword(e.target.value) }
            value={ password }
          />
        </label>

        <button
          type="submit"
        >
          Send
        </button>
      </form>

      <ErrorMessage message={ errorMessage } />

      <p>Already have an account? <Link to="/login">Log In</Link></p>
    </div>
  );
}

export default Register;
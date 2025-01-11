import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../../API/axios';
import MicrosoftLogo from '../../assets/logo.png';
import '../Style.css';
//-------------------------------------------------------
import { PublicClientApplication } from '@azure/msal-browser';
import { config } from '../../Config';


const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
//-------------------------------------------------------
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [errorM, setErrorM] = useState(null);
  const publicClientApplication = new PublicClientApplication({
    auth: {
        clientId: config.appId,
        authority: config.authority,
        redirectUri: config.redirectUri
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true
    }
  });
  useEffect(() => {
      const checkAccount = async () => {
          const accounts = publicClientApplication.getAllAccounts();
          if (accounts.length > 0) {
              setIsAuthenticated(true);
              setUser(accounts[0]);
          }
      };
      checkAccount();
  });

  const login = async () => {
      try {
          await publicClientApplication.loginPopup({
              scopes: config.scopes,
              prompt: 'select_account'
          });
          setIsAuthenticated(true);
      } catch (err) {
          setIsAuthenticated(false);
          setUser({});
          setErrorM(err.message);
      }
  };

  const logout = () => {
      publicClientApplication.logout();
      setIsAuthenticated(false);
      setUser({});
  };
//-------------------------------------------------------

  const onSubmit = async () => {
    try {
      if (!email || !password) {
        setError('Please fill in all fields.');
        return;
      }
      const response = await axiosClient.post('/api/login', { email, password });
      if (response.status === 201) {
        navigate('/choose-client');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('The password that you\'ve entered is incorrect.');
    }
  };
  const Forgot = async ()=>{
    const response = await axiosClient.post('/api/forgot-password', { email });
    if (response.status === 200) {
    }
  }

  return (
    <div className="form-container">
      <h2 className="text-center">Login</h2>
      <form>
        <label>Email</label>
        <input type="email" value={email} placeholder="Email address" onChange={(e) => setEmail(e.target.value)} required />
        <span>
          <label>Password</label>
          <span className="forgot-password" onClick={Forgot}>Forgot password</span>
        </span>
        <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="error-message text-danger">{error}</p>}
        <input type="button" className="button" value="Log in" onClick={onSubmit} />
        <p>By logging, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</p>
      </form>
      <button className="login-microsoft" onClick={login}>
          <img src={MicrosoftLogo} alt="logo" width={'auto'} height={28} />
      </button>
      {errorM && <p className="error-message text-danger">{errorM}</p>}
      <hr />
      <span className="button-container">
        <p>Don't have an account?</p>
        <input type="button" className="sign-up-button" value="Sign up" onClick={() => navigate('/')} />
      </span>
    </div>
  );
};

export default Auth;

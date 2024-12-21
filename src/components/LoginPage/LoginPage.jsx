import React, { useState } from "react";
import useAuthStore from "../../stores/authStore";
import "./styles/LoginPage.css";
import loadIcon from "@img/loading-icon.gif";

const LoginPage = ({ style }) => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerIsDisplayed, setRegisterIsDisplayed] = useState(false);
  const [loginIsDisplayed, setLoginIsDisplayed] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState("");

  const { signUp, signIn } = useAuthStore();

  const register = async () => {
    if (registerPassword !== registerPasswordConfirm) {
      return setError("Passwords do not match.");
    }
    setIsLoggingIn(true);
    try {
      const user = await signUp(registerEmail, registerPassword);
      if (user) {
        setError("");
        setRegisterIsDisplayed(false);
        setLoginIsDisplayed(true);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const login = async () => {
    setIsLoggingIn(true);
    try {
      const user = await signIn(loginEmail, loginPassword);
      if (user) {
        setError("");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const showLoginForm = () => {
    setLoginIsDisplayed(true);
    setRegisterIsDisplayed(false);
    setError("");
  };

  const showRegisterForm = () => {
    setRegisterIsDisplayed(true);
    setLoginIsDisplayed(false);
    setError("");
  };

  return (
    <div className="loginPage" style={style}>
      <h1 className="loginPage__logo">
        Foot<strong>base</strong>
      </h1>
      <div className="loginPage__formContainer">
        <div className="loginPage__formDisplayButtons">
          <button
            onClick={showLoginForm}
            className={`loginPage__loginFormDisplay ${
              loginIsDisplayed && "formSelected"
            }`}
          >
            Login
          </button>
          <button
            onClick={showRegisterForm}
            className={`loginPage__registerFormDisplay ${
              registerIsDisplayed && "formSelected"
            }`}
          >
            Register
          </button>
        </div>

        {registerIsDisplayed && (
          <div className="loginPage__registerForm">
            <input
              placeholder="Email.."
              onChange={(event) => setRegisterEmail(event.target.value)}
            />
            <input
              placeholder="Password.."
              onChange={(event) => setRegisterPassword(event.target.value)}
              type="password"
            />
            <input
              placeholder="Confirm password.."
              onChange={(event) =>
                setRegisterPasswordConfirm(event.target.value)
              }
              type="password"
            />
            <div>
              <p>{error}</p>
            </div>

            <button onClick={register}>
              {!isLoggingIn ? (
                "Register"
              ) : (
                <img src={loadIcon} alt="loading" width={"35px"} />
              )}
            </button>
          </div>
        )}

        {loginIsDisplayed && (
          <div className="loginPage__loginForm">
            <input
              placeholder="Email.."
              onChange={(event) => setLoginEmail(event.target.value)}
            />
            <input
              placeholder="Password.."
              onChange={(event) => setLoginPassword(event.target.value)}
              type="password"
            />
            <div>
              <p>{error}</p>
            </div>

            <button onClick={login}>
              {!isLoggingIn ? (
                "Login"
              ) : (
                <img src={loadIcon} alt="loading" width={"35px"} />
              )}
            </button>
            <button
              className="loginPage__loginform__demoUser"
              onClick={() => {
                setLoginEmail("demo@demo.com");
                setLoginPassword("123456");
                login();
              }}
            >
              {!isLoggingIn ? (
                "Login as demo user"
              ) : (
                <img src={loadIcon} alt="loading" width={"35px"} />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;

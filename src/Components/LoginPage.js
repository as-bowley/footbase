import { type } from "@testing-library/user-event/dist/type";
import { useState } from "react";
import "./styles/LoginPage.css";
import loadIcon from "./img/loading-icon.gif";

const LoginPage = ({ register, login, error, isLoggingIn }) => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerIsDisplayed, setRegisterIsDisplayed] = useState(false);
  const [loginIsDisplayed, setLoginIsDisplayed] = useState(true);

  const showLoginForm = () => {
    setLoginIsDisplayed(true);
    setRegisterIsDisplayed(false);
  };

  const showRegisterForm = () => {
    setRegisterIsDisplayed(true);
    setLoginIsDisplayed(false);
  };

  return (
    <div className="loginPage">
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
              onChange={(event) => {
                setRegisterEmail(event.target.value);
              }}
            />
            <input
              placeholder="Password.."
              onChange={(event) => {
                setRegisterPassword(event.target.value);
              }}
            />
            <div>
              <p>{error}</p>
            </div>

            <button onClick={() => register(registerEmail, registerPassword)}>
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
              onChange={(event) => {
                setLoginEmail(event.target.value);
              }}
            />
            <input
              placeholder="Password.."
              onChange={(event) => {
                setLoginPassword(event.target.value);
              }}
              type="password"
            />
            <div>
              <p>{error}</p>
            </div>

            <button
              onClick={() => {
                login(loginEmail, loginPassword);
              }}
            >
              {!isLoggingIn ? (
                "Login"
              ) : (
                <img src={loadIcon} alt="loading" width={"35px"} />
              )}
            </button>
            <button
              className="loginPage__loginform__demoUser"
              onClick={() => {
                login("demo@demo.com", "123456");
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

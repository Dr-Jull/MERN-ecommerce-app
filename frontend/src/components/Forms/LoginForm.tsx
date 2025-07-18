import axios from "axios";
import React, { useState } from "react";
import { useCommerceStore } from "../../store";
import {
  blackButtonStyle,
  formInputRowStyle,
  API_URL,
} from "../../shared/constants";
import { Link } from "react-router-dom";

function Login() {
  const { setToken, userEmail, setUserEmail, userPassword, setUserPassword } =
    useCommerceStore();

  const handleSubmit = (e: any) => {
    const userData = {
      email: userEmail,
      password: userPassword,
    };
    // localhost:5000/api/v1/users/register
    axios
      .post(API_URL + "/users/login", userData)
      .then(async function (response) {
        // const result = await response.json()
        await setToken(response.data.token);
        setToken(response.data.token)
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <form className="flex flex-col gap-4 px-6">
        <h1 className="text-start text-xl">
          <b>Login</b>
        </h1>
        <span className={formInputRowStyle}>
          <label htmlFor="login-user-email">Email</label>
          <input
            type="text"
            name="login-user-email"
            id="login-user-email"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
          />
        </span>

        <span className={formInputRowStyle}>
          <label htmlFor="login-user-pass">Password</label>
          <input
            type="password"
            name="login-user-pass"
            id="login-user-pass"
            value={userPassword}
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
          />
        </span>

        <div className="flex justify-end">
          <button
            className={blackButtonStyle}
            onClick={handleSubmit}
            type="button"
          >
            Login
          </button>
        </div>
      </form>
      <p>
        If you don't have an account yet,
        <Link className="text-[var(--accent-color)]" to="/auth/register">
          {" "}
          Click Here
        </Link>
      </p>
    </>
  );
}

export default Login;

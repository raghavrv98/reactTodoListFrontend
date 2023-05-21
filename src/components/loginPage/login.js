import "./login.css";
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [formState, updateFormState] = useState("login");
  const [payload, updatePayload] = useState({ name: "", email: "", password: "" });
  const [isPasswordShown, updateIsPasswordShown] = useState(false);
  const navigate = useNavigate();


  const signupSubmitHandler = (event) => {
    event.preventDefault();

    const url = `${window.API_URL}/user`;
    axios.post(url, payload)
      .then((res) => {
        if (res?.status === 200) {
          alert(res?.data?.msg)
          updateFormState('login');
        }
        else {
          alert(res?.data?.msg)
        }
      })
      .catch((err) => {
        alert(err?.response?.data?.msg)
      });
  }

  const passwordShownHandler = (event) => {
    let checked = event?.target?.checked;
    updateIsPasswordShown(checked);
  }

  const onClickHandler = (value) => {
    updateFormState(value);
    updatePayload({ name: "", email: "", password: "" })
  };

  const onChangeHandler = (event) => {
    let id = event?.target?.id;
    let value = event?.target?.value;
    let updatedPayload = { ...payload };

    updatedPayload[id] = value;
    updatePayload(updatedPayload)
  }

  const loginSubmitHandler = (event) => {
    event.preventDefault();

    const url = `${window.API_URL}/login`;
    axios.post(url, payload)
      .then((res) => {
        if (res?.status === 200) {
          alert(res?.data?.msg);
          sessionStorage.setItem("name", res?.data?.data?.name);
          sessionStorage.setItem("email", res?.data?.data?.email);
          navigate(`/user/${res?.data?.data?._id}`)
        }
        else if (res.status === 401) {
          alert(res?.data?.msg);
        }
        else {
          alert(res?.data?.msg);
        }
      })
      .catch((err) => {
        alert(err?.response?.data?.msg)
      });
  };

  return (
    <>
      <h1 className="welcome-msg">Hi! This is the Demo of a Todolist</h1>
      <div className="login-box">
        {formState === "login" ? (
          <form onSubmit={loginSubmitHandler}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                autoComplete="off"
                type="email"
                className="form-control"
                id="email"
                onChange={onChangeHandler}
                value={payload?.email}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                autoComplete="off"
                type={isPasswordShown ? "text" : "password"}
                className="form-control"
                id="password"
                onChange={onChangeHandler}
                value={payload?.password}
              />
              <input
                autoComplete="off" type="checkbox" checked={isPasswordShown} onChange={passwordShownHandler} /> Show Password
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <p onClick={() => onClickHandler('signup')}>
              <u>Signup</u>
            </p>
            <p onClick={() => onClickHandler('reset')}>
              <u>Reset Password</u>
            </p>
          </form>
        ) : formState === "signup" ? (
          <form onSubmit={signupSubmitHandler}>
            <div className="mb-3">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  className="form-control"
                  id="name"
                  onChange={onChangeHandler}
                  value={payload?.name}
                />
              </div>
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                autoComplete="off"
                type="email"
                className="form-control"
                id="email"
                onChange={onChangeHandler}
                value={payload?.email}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                autoComplete="off"
                type={isPasswordShown ? "text" : "password"}
                className="form-control"
                id="password"
                onChange={onChangeHandler}
                value={payload?.password}
              />
              <input
                autoComplete="off" type="checkbox" checked={isPasswordShown} onChange={passwordShownHandler} /> Show Password
            </div>
            <button type="submit" className="btn btn-primary">
              Signup
            </button>
            <p onClick={() => onClickHandler('login')}>
              <u>Login</u>
            </p>
            <p onClick={() => onClickHandler('reset')}>
              <u>Reset Password</u>
            </p>
          </form>
        ) : (
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                autoComplete="off"
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Reset
            </button>
            <p onClick={() => onClickHandler('login')}>
              <u>Login</u>
            </p>
            <p onClick={() => onClickHandler('signup')}>
              <u>Signup</u>
            </p>
          </form>
        )}
      </div>
    </>
  );
};

export default Login;

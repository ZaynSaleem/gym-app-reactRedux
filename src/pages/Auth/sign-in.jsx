import React, { useState } from "react";
import "./style.css";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import firebase, { db } from "../../config/firebase/firebase";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/actions/AuthAction";

const SignIn = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [bool, setBool] = useState(false);

  const Data = useSelector((state) => state?.auths.data);
  console.log(Data);

  const signIn = () => {
    setBool(true);
    console.log(" Pass => ", password, "Email => ", email);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
        dispatch(login(user.uid, user.email));
        setBool(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logged in successfully",
          showConfirmButton: false,
          timer: 1000,
        });
        history.push("/");
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error.message);
        setBool(false);

        Swal.fire({
          position: "center",
          icon: "error",
          title: errorMessage,
          showConfirmButton: false,
          timer: 1000,
        });
      });
  };

  return (
    <div className="flex-signin-container">
      {bool === false ? (
        <div className="row-flex-signin">
          <div className="top-head-signin">
            <h1>LOGIN</h1>
          </div>

          <div className="input-sign-in">
            <span>
              <FaEnvelope />
            </span>
            <input
              type="email"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="input-sign-in">
            <span>
              <FaLock />
            </span>
            <input
              type="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="sign-in-button">
            <span>
              Not a user? <a href="/sign-up">click here</a>
            </span>
            <div className="btn-login">

            <button onClick={signIn}>LOGIN</button>
            </div>
          </div>
        </div>
      ) : (
        <div class="overlay">
          <div class="overlay__inner">
            <div class="overlay__content">
              <span class="spinner"></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;

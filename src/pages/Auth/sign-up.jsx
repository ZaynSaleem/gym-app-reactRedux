import React, { useState } from "react";
import "./style.css";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import firebase, { db } from "../../config/firebase/firebase";
import Swal from "sweetalert2";
import { useHistory } from "react-router";

const SignUp = () => {
  let history = useHistory();
  const [username, setUserName] = useState("");
  const [pass, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [bool, setBool] = useState(false);

  const signUp = async () => {
    setBool(true);
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then((userCredential) => {
        // console.log(userCredential.user.uid);
        db.collection("users")
          .add({
            userid: userCredential.user.uid,
            name: username,
            email: email,
          })
          .then((docRef) => {
            setBool(false);

            Swal.fire({
              position: "center",
              icon: "success",
              title: "User successfully registered",
              showConfirmButton: false,
              timer: 1000,
            });
            history.push("/");
          })
          .catch((error) => {
            setBool(false);

            console.error("Error adding document: ", error);
          });
      })
      .catch((error) => {
        console.log(error.message);
        setBool(false);
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });

        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
  };

  return (
    <div className="flex-signup-container">
      {bool === false ? (
        <div className="row-flex">
          <div className="top-head">
            <h1>SIGN-UP</h1>
          </div>
          <div className="input-sign-up">
            <span>
              <FaUser />
            </span>
            <input
              type="text"
              placeholder="Username"
              onChange={(event) => setUserName(event.target.value)}
            />
          </div>
          <div className="input-sign-up">
            <span>
              <FaEnvelope />
            </span>
            <input
              type="email"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="input-sign-up">
            <span>
              <FaLock />
            </span>
            <input
              type="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="signup-button">
            <span>
              Already a user? <a href="/sign-in">click here</a>
            </span>
            <div className="btn-signup">
              <button onClick={signUp}>SignUp</button>
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

export default SignUp;

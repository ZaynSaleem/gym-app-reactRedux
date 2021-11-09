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

  const signUp = async () => {
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
            Swal.fire({
              position: "center",
              icon: "success",
              title: "User successfully registered",
              showConfirmButton: false,
              timer: 1000,
            });
            history.push("/home");
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
      })
      .catch((error) => {
        console.log(error.message);
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
            Already a user? <a href="#">click here</a>
          </span>
          <button onClick={signUp}>SignUp</button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

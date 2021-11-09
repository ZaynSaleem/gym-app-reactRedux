import React from "react";
import "./style.css";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import firebase, { db } from "../../config/firebase/firebase";
import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
import { logout } from "../../store/actions/AuthAction";
import { useHistory } from "react-router";

const Home = () => {
  
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutUser = () => {
    firebase
    .auth()
    .signOut()
    .then(() => {
        dispatch(logout());
        // Sign-out successful.
        console.log("logout");
        history.push("/sign-in");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="home-container">
      {/* <div className="home-head"> GYM APP </div> */}

      <div className="home-row">
        <div className="home-head">GYM APP</div>
        <div className="home-right">
          <button onClick={logoutUser}>Logout</button>
        </div>
      </div>

      <div className="home-row">
        <div className="home-input-text">
          <input type="text" placeholder="Exercise Name" />
        </div>
        <div className="home-start-time">
          {" "}
          <input type="number" placeholder="Start Time" />{" "}
        </div>
        <div className="home-rest-time">
          {" "}
          <input type="number" placeholder="Rest Time" />{" "}
        </div>
        <div className="button-add-exercise">
          <button className="button-add">Add Exercise</button>
        </div>
        <div className="button-start-exercise">
          <button className="button">Start Exercise</button>
        </div>
      </div>

      <div className="home-row">
        <div className="home-table">
          <table>
            <thead>
              <tr>
                <th>Select</th>
                <th>Exercise Name</th>
                <th>Start time</th>
                <th>Rest Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                </td>
                <td>Lorem Ipsum</td>
                <td>50s</td>
                <td>10s</td>
                <td>
                  {" "}
                  <button className="button-edit mr-20">
                    <FaRegEdit size={25} />
                  </button>
                  <button className="button-dlt mr-20">
                    <FaRegTrashAlt size={25} />
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>Lorem Ipsum</td>
                <td>50s</td>
                <td>10s</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;

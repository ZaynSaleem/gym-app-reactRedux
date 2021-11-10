import React, { useState } from "react";
import "./style.css";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import firebase, { db } from "../../config/firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
// import { useSelector } from "react-redux";
import { logout } from "../../store/actions/AuthAction";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import { addTodo, dltTodo, updateTodo } from "../../store/actions";
import { countDown } from "../../store/actions/timerAction";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [exercise, setExercise] = useState("");
  const [startTime, setStartTime] = useState("");
  const [restTime, setRestTime] = useState("");
  const [uptId, setuptId] = useState("");
  const [bool, setBool] = useState(false);
  const [arr, setArr] = useState([]);

  const Data = useSelector((state) => state?.todo.todo);
  const userLogin = useSelector((state) => state?.auths.data);
  // console.log(userLogin[0].id);

  // console.log(Data);
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

  const addExercise = () => {
    if (exercise !== "" || startTime !== "" || restTime !== "") {
      // console.log(exercise, startTime, restTime);
      let id = Math.ceil(Math.random() * 1000);
      let userid = userLogin[0].id;
      let key = false;
      dispatch(addTodo(id, exercise, startTime, restTime, userid, key));
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Input must not be empty",
        showConfirmButton: false,
        timer: 1000,
      });
      return false;
    }
  };

  const edit = (id) => {
    setBool(true);
    // console.log(id);
    let data = Data.filter((x) => x.id === id);
    data.map((item) => {
      setuptId(item.id);
      setExercise(item.exercise);
      setRestTime(item.restTime);
      setStartTime(item.startTime);
    });
    // console.log(data);
  };

  const updateExercise = () => {
    if (exercise === "" || startTime === "" || restTime === "") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Input must not be empty",
        showConfirmButton: false,
        timer: 1000,
      });
      return false;
    } else {
      dispatch(updateTodo(uptId, exercise, startTime, restTime));
      setBool(false);
      setExercise("");
      setRestTime("");
      setStartTime("");
    }
  };

  const deleteExercise = (id) => {
    dispatch(dltTodo(id));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Exercise Deleted",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const handleChange = (event) => {
    let valueCheck = event.target.value;
    let chcked = event.target.checked;

    // console.log(valueCheck);
    // console.log(chcked);
    let dupData = [...Data];
    let dup = [...arr];

    if (chcked) {
      dup.push(+valueCheck);
      setArr(dup);
      let u = dupData.findIndex((x) => x.id == valueCheck);
      dupData[u].key = true;
      console.log(dup);
    } else {
      let updated = dup.filter((item) => !valueCheck.includes(item));
      setArr(updated);
      let u = dupData.findIndex((x) => x.id == valueCheck);
      dupData[u].key = false;
      console.log(updated);
    }
  };
  const startExercise = () => {
    let countdown = 5;
    let rest = 5;
    let timeCountdown = setInterval(() => {
      countdown--;
      // console.log(countdown);
      let type = "Started"
      dispatch(countDown(countdown, type, "Pushups"))
      if (countdown === 0) {
        console.log("Ended");
        clearInterval(timeCountdown);
        console.log("Rest");
        let restCountDown = setInterval(() => {
          rest--;
          let type = "rest";
          // console.log(rest);
          dispatch(countDown(rest, type, "pushups"))
          if (rest === 0) {
            console.log("Ended");
            dispatch(countDown(0, "", ""))
          
            clearInterval(restCountDown);
          }
        }, 1000);
      }
    }, 1000);
    history.push('/exercise')
  }

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
          <input
            type="text"
            placeholder="Exercise Name"
            value={exercise}
            onChange={(event) => setExercise(event.target.value)}
          />
        </div>
        <div className="home-start-time">
          {" "}
          <input
            type="number"
            placeholder="Start Time"
            onChange={(event) => setStartTime(event.target.value)}
            value={startTime}
          />{" "}
        </div>
        <div className="home-rest-time">
          {" "}
          <input
            type="number"
            placeholder="Rest Time"
            value={restTime}
            onChange={(event) => setRestTime(event.target.value)}
          />{" "}
        </div>
        <div className="button-add-exercise">
          {bool === false ? (
            <button className="button-add" onClick={addExercise}>
              Add Exercise
            </button>
          ) : (
            <button className="button-add" onClick={updateExercise}>
              Update Exercise
            </button>
          )}
        </div>
        <div className="button-start-exercise">
          <button className="button" onClick={startExercise}>Start Exercise</button>
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
              {Data && Data.length ? (
                Data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <input
                          type="checkbox"
                          value={item.id}
                          onChange={handleChange}
                          type="checkbox"
                          checked={item.key}
                        />
                        <span className="checkmark"></span>
                      </td>
                      <td>{item.exercise}</td>
                      <td>{item.startTime}</td>
                      <td>{item.restTime}</td>
                      <td>
                        {" "}
                        <button
                          className="button-edit mr-20"
                          onClick={() => edit(item.id)}
                        >
                          <FaRegEdit size={25} />
                        </button>
                        <button
                          className="button-dlt mr-20"
                          onClick={() => deleteExercise(item.id)}
                        >
                          <FaRegTrashAlt size={25} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>NO DATA</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
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
  const [selectedData, setSelectedData] = useState([]);
  const [showData, setShowData] = useState([]);

  const Data = useSelector((state) => state?.todo.todo);
  const userLogin = useSelector((state) => state?.auths.data);
  useEffect(() => {
    let matchedData = Data.filter((x) => x.userid === userLogin[0].id);
    console.log(matchedData);
    setShowData(matchedData);
  }, []);
  console.log(userLogin[0].id);

  console.log(Data);
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
      let obj = {
        id: Math.ceil(Math.random() * 1000),
        userid: userLogin[0].id,
        key: false,
        exercise: exercise,
        startTime: startTime,
        restTime: restTime,
      };
      let dup = [...showData];
      let updated = dup.map((item) => (item.key = false));
      setShowData(updated);
      dispatch(addTodo(obj));
      setShowData([...showData, obj]);
      setStartTime("");
      setRestTime("");
      setExercise("");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "New Exercise Added",
        showConfirmButton: false,
        timer: 1000,
      });
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
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Exercise Updated",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  const deleteExercise = (id) => {
    dispatch(dltTodo(id));
    let dup = [...showData];
    let update = dup.filter((x) => x.id !== id);

    setShowData(update);
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
    let arrData = [...selectedData];
    let dupData = [...Data];
    let dup = [...arr];
    // console.log(dupData);
    if (chcked) {
      dup.push(+valueCheck);
      setArr(dup);
      let u = dupData.findIndex((x) => x.id == valueCheck);
      // console.log(dupData[u]);
      arrData.push(dupData[u]);
      setSelectedData(arrData);
      console.log(arrData, "Select Data");
      dupData[u].key = true;
      // console.log(dup);
    } else {
      let updated = dup.filter((item) => !valueCheck.includes(item));
      setArr(updated);
      console.log(updated);
      let u = dupData.findIndex((x) => x.id == valueCheck);
      let s = arrData.findIndex((x) => x.id == valueCheck);
      console.log(s);
      let fil = arrData.filter((x, index) => index !== s);
      setSelectedData(fil);
      dupData[u].key = false;
    }
  };

  let num = 0;
  let exerciseNameArr = [];

  const startExercise = () => {
    dispatch(countDown(0, "", ""));
    let arrData = [...selectedData];
    let data = [...Data];

    let startTimeArr = [];
    let restTimeArr = [];
    if (selectedData && selectedData.length) {
      selectedData.map((item, index) => {
        startTimeArr.push(+item.startTime);
        restTimeArr.push(+item.restTime);
        exerciseNameArr.push(item.exercise);
      });
      // console.log(startTimeArr[num]);

      let timeCountdown = setInterval(() => {
        startTimeArr[num]--;

        let type = "STARTED";
        dispatch(countDown(startTimeArr[num], type, exerciseNameArr[num]));
        if (startTimeArr[num] === 0) {
          console.log("Ended");
          clearInterval(timeCountdown);
          console.log("Rest");
          let restCountDown = setInterval(() => {
            restTimeArr[num]--;
            let type = "REST";
            // console.log(rest);
            dispatch(countDown(restTimeArr[num], type, exerciseNameArr[num]));
            if (restTimeArr[num] === 0) {
              let f = data.findIndex((x) => x.id === arrData[num].id);
              data[f].key = false;
              setShowData(data);
              console.log(f);
              // console.log("Ended");
              clearInterval(restCountDown);
              num++;
              if (num !== restTimeArr.length) {
                setTimeout(startExercise(), 2000);
              } else {
                setTimeout(
                  (Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "All Done for today",
                    showConfirmButton: false,
                    timer: 2000,
                  }),
                  history.push("/")),
                  2000
                );
              }
            }
          }, 1000);
        }
      }, 1000);
      history.push("/exercise");
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Excercise Must be Selected",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  return (
    <div className="home-container">
      {/* <div className="home-head"> GYM APP </div> */}

      <div className="home-row">
        <div className="home-head">FITNESS ZONE</div>
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
          <button className="button" onClick={startExercise}>
            Start Exercise
          </button>
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
              {showData && showData.length ? (
                showData.map((item, index) => {
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

import React, { useEffect } from "react";
import "./style.css";
import exercise from "../../assets/images/exercise.gif";
import rest from "../../assets/images/rest.jpg";
import { useSelector, useDispatch } from "react-redux";
import { countDown } from "../../store/actions/timerAction";

const Timer = () => {
  useEffect(() => {}, []);

  // const state = useSelector(state => state.state)
  const Data = useSelector((state) => state?.timers.data);
  // console.log(Data);
  // const dispatch = useDispatch();

  return Data && Data.length ? (
    Data.map((item, index) => {
      return (
        <div>
          <div className="timer-countdown">
            <div className="timer">{item.countdown}</div>
          </div>

          <div className="exercise-head">
            <div className="">
              <h1>EXERCISE : {item.type}</h1>
              <h1>NAME : {item.exerciseName}</h1>
            </div>
          </div>

          <div className="d-flex justify-content-center exercise">
            {item.type === "Started" ? (
              <div className="">
                <img src={exercise} height={450} width={300} />
              </div>
            ) : (
              <div className="">
                <img src={rest} height={450} width={600} />
              </div>
            )}
          </div>

          {/* // <div className="d-flex p-2">// // </div> */}
        </div>
      );
    })
  ) : (
    <div>
      <div className="timer-countdown">
        <div className="timer">0</div>
      </div>

      <div className="d-flex justify-content-center exercise-head">
        <div className="">
          <h1>EXERCISE STARTED</h1>
          <h1>EXERCISE STARTED</h1>
        </div>
      </div>

      {/* <div className="d-flex justify-content-center exercise">
        <div className="">
          <img src={exercise} height={450} width={300} />
        </div>
      </div> */}

      {/* // <div className="d-flex p-2">// // </div> */}
    </div>
  );
};

export default Timer;

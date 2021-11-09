import React, { useEffect } from "react";
import "./style.css";
import exercise from "../../assets/images/exercise.gif";
import { useSelector, useDispatch } from "react-redux";
import { countDown } from "../../store/actions/timerAction";

const Timer = () => {
  useEffect(() => {
    dispatch(countDown(6,4));
  }, []);

  // const state = useSelector(state => state.state)
  const Data = useSelector((state) => state?.timers.data);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="d-flex justify-content-center">
        <div className="p-5 col-example timer">15</div>
      </div>

      <div className="d-flex justify-content-center">
        <div className="p-3 col-example">
          <h1>EXERCISE STARTED</h1>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <div className="col-example">
          <img src={exercise} height={450} width={300} />
        </div>
      </div>

      {/* // <div className="d-flex p-2">// // </div> */}
    </div>
  );
};

export default Timer;

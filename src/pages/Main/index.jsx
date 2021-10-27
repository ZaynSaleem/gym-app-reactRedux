import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, dltTodo, updateTodo } from "../../store/actions";
import { useSelector } from "react-redux";

const Index = () => {
  const Data = useSelector((state) => state?.todo.data);
  // console.log(Data);
  // console.log(Data.lengt);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [num, setNum] = useState("");
  const [uptId, setUptId] = useState("");
  const [bool, setBool] = useState(false);

  const dispatch = useDispatch();
  const add = () => {
    if (name === "" || email === "" || num === "") {
      alert("You must Write something");
      return false;
    } else {
      let id = Math.ceil(Math.random() * 100);
      dispatch(addTodo(id, name, email, num));
      setName("");
      setEmail("");
      setNum("");
    }
  };
  const del = (id) => {
    dispatch(dltTodo(id));
    // console.log(id);
  };

  const edit = (id) => {
    setBool(true);
    let data = Data.filter((x) => x.id === id);
    data.map((item) => {
      setUptId(item.id);
      setName(item.name);
      setEmail(item.email);
      setNum(item.num);
    });
    // console.log(data.email);
    console.log(id);
  };

  const update = () => {
    if (name === "" || email === "" || num === "") {
      alert("You must Write something");
      return false;
    } else {
      dispatch(updateTodo(uptId, name, email, num));
      setName("");
      setEmail("");
      setNum("");
      setBool(false);
    }
  };

  return (
    <div>
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              Username
            </span>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              Email
            </span>
            <input
              type="Email"
              className="form-control"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </div>
      </div>{" "}
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              Number
            </span>
            <input
              type="number"
              className="form-control"
              value={num}
              onChange={(event) => setNum(event.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          {bool === false ? (
            <div className="btn btn-primary" onClick={add}>
              Add
            </div>
          ) : (
            <div className="btn btn-primary" onClick={update}>
              Update
            </div>
          )}
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Contact</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {Data.length ? (
            Data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.num}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => del(item.id)}
                    >
                      delete
                    </button>

                    <button
                      className="btn btn-primary ms-2"
                      onClick={() => edit(item.id)}
                    >
                      EDIT
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>No Data</tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Index;

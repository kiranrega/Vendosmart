import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import CreateTask from "../modals/CreateTask";
import Card from "./Card";

const TodoList = () => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [activeTodolist, setActive] = useState(null);

  useEffect(() => {
    let arr = localStorage.getItem("taskList");

    if (arr) {
      let obj = JSON.parse(arr);
      setTaskList(obj);
      setActive(obj);
    }
  }, []);

  const deleteTask = (index) => {
    let tempList = taskList;
    tempList.splice(index, 1);
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
    setActive(tempList);
    window.location.reload();
    swal("Task Deleted Successfully");
  };

  const updateListArray = (obj, index) => {
    let tempList = taskList;
    tempList[index] = obj;
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
    setActive(tempList);
    window.location.reload();
    swal("Task Updated Successfully");
  };

  const toggle = () => {
    setModal(!modal);
  };

  const saveTask = (taskObj) => {
    let tempList = taskList;
    console.log(taskObj);
    tempList.push(taskObj);
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(taskList);
    setActive(taskList);
    swal("Task Created Successfully");
    setModal(false);
  };

  const showTasksBasedOnStatus = (status) => {
    console.log(status);
    const inProgresList =
      activeTodolist &&
      activeTodolist.length > 0 &&
      activeTodolist.filter((e) => e.Status === status);
    if (status === "all") {
      setTaskList(activeTodolist);
    } else {
      setTaskList(inProgresList);
    }
  };
  return (
    <>
      <div className="header text-center">
        <h3>Todo List</h3>
        <button className="btn btn-primary mt-2" onClick={() => setModal(true)}>
          Create Task
        </button>
      </div>
      <div className="d-flex justify-content-around p-2">
        <button
          className="btn btn-primary"
          onClick={() => showTasksBasedOnStatus("all")}
        >
          All
        </button>
        <button
          className="btn btn-primary"
          onClick={() => showTasksBasedOnStatus("progress")}
        >
          In Progress
        </button>
        <button
          className="btn btn-success"
          onClick={() => showTasksBasedOnStatus("completed")}
        >
          Completed
        </button>
        <button
          className="btn btn-danger"
          onClick={() => showTasksBasedOnStatus("uncompleted")}
        >
          Uncompleted
        </button>
      </div>
      <div className="task-container">
        {taskList &&
          taskList.map((obj, index) => (
            <Card
              key={index}
              taskObj={obj}
              index={index}
              deleteTask={deleteTask}
              updateListArray={updateListArray}
            />
          ))}
      </div>
      <CreateTask toggle={toggle} modal={modal} save={saveTask} />
    </>
  );
};

export default TodoList;

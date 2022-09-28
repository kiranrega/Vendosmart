import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Progress,
} from "reactstrap";

const EditTaskPopup = ({ modal, toggle, updateTask, taskObj }) => {
  const [taskName, setTaskName] = useState("");
  const [email, setEmail] = useState("");
  const [projectname, setProjectName] = useState("");
  const [mobilenumber, setMobilenummber] = useState("");
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [projectStatus, setProjectStatus] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "taskName") {
      setTaskName(value);
    } else if (name === "projectname") {
      setProjectName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "projectstatus") {
      setProjectStatus(value);
    } else if (name === "mobilenumber") {
      setMobilenummber(value);
    } else if (name === "startdate") {
      setStartDate(value);
    } else if (name === "enddate") {
      setEndDate(value);
    }
  };

  const handleFormValidation = () => {
    let formErrors = {};
    let formIsValid = true;

    if (!taskName) {
      formIsValid = false;
      formErrors["taskNameErr"] = "Name is required.";
    } else if (!/^[A-Za-z]+$/.test(taskName)) {
      formIsValid = false;
      formErrors["taskNameErr"] = "Name doesn't contain numbers.";
    }
    if (!mobilenumber) {
      formIsValid = false;
      formErrors["mobilenumberErr"] = "Enter Mobile Number";
    } else if (!/^[1-9][0-9]*$/.test(mobilenumber)) {
      formIsValid = false;
      formErrors["mobilenumberErr"] = "Enter dont start with zero";
    } else if (!/\b\d{10}\b/g.test(mobilenumber)) {
      formIsValid = false;
      formErrors["mobilenumberErr"] = "Mobile number should be 10 digits";
    }
    if (!email) {
      formIsValid = false;
      formErrors["emailIdErr"] = "Email id is required.";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      formIsValid = false;
      formErrors["emailIdErr"] = "Invalid email id.";
    }
    if (!description) {
      formIsValid = false;
      formErrors["DescrptionErr"] = "Description is required.";
    }
    if (!projectname) {
      formIsValid = false;
      formErrors["ProjectNameErr"] = "Project Name is required.";
    }
    if (!projectStatus) {
      formIsValid = false;
      formErrors["projectStatusErr"] = "Project Status is required.";
    }
    if (!startdate) {
      formIsValid = false;
      formErrors["startDateErr"] = "Enter Start Date";
    }

    if (!enddate) {
      formIsValid = false;
      formErrors["endDateErr"] = "Enter End Date";
    }

    setFormErrors(formErrors);
    return formIsValid;
  };

  useEffect(() => {
    setTaskName(taskObj.Name);
    setEmail(taskObj.Email);
    setProjectName(taskObj.Projectname);
    setDescription(taskObj.Description);
    setProjectStatus(taskObj.Status);
    setMobilenummber(taskObj.mobilenumber);
    setStartDate(taskObj.startdate);
    setEndDate(taskObj.enddate);
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (handleFormValidation()) {
      let tempObj = {};
      tempObj["Name"] = taskName;
      tempObj["Email"] = email;
      tempObj["Projectname"] = projectname;
      tempObj["Description"] = description;
      tempObj["Status"] = projectStatus;
      tempObj["mobilenumber"] = mobilenumber;
      tempObj["startdate"] = startdate;
      tempObj["enddate"] = enddate;
      updateTask(tempObj);
    }
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Update Task</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Task Name</label>
          <input
            type="text"
            className="form-control"
            value={taskName}
            onChange={handleChange}
            name="taskName"
          />
          <p className="text-danger">{formErrors.taskNameErr}</p>
        </div>
        <div className="form-group">
          <label>MObile No</label>
          <input
            type="text"
            className="form-control"
            value={mobilenumber}
            onChange={handleChange}
            name="mobilenumber"
          />
          <p className="text-danger">{formErrors.mobilenumberErr}</p>
        </div>
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            className="form-control"
            value={startdate}
            onChange={handleChange}
            name="startdate"
          />
          <p className="text-danger">{formErrors.startDateErr}</p>
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            className="form-control"
            value={enddate}
            onChange={handleChange}
            name="enddate"
          />
          <p className="text-danger">{formErrors.endDateErr}</p>
        </div>
        <div className="form-group">
          <label>Project Name</label>
          <input
            type="text"
            className="form-control"
            value={projectname}
            onChange={handleChange}
            name="projectname"
          />
          <p className="text-danger">{formErrors.ProjectNameErr}</p>
        </div>
        {console.log(taskObj.Status)}
        <div className="form-group">
          <label>E-Mail</label>
          <input
            type="text"
            className="form-control"
            value={email}
            onChange={handleChange}
            name="email"
          />
          <p className="text-danger">{formErrors.emailIdErr}</p>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            rows="5"
            className="form-control"
            value={description}
            onChange={handleChange}
            name="description"
          ></textarea>
          <p className="text-danger">{formErrors.DescrptionErr}</p>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="projectstatus"
            id="progress"
            value="progress"
            onChange={handleChange}
            checked={taskObj.Status === "progress" ? "checked" : null}
          />
          <label className="form-check-label" htmlFor="progress">
            In Progress
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="projectstatus"
            id="completed"
            value="completed"
            onChange={handleChange}
            checked={taskObj.Status === "completed" ? "checked" : null}
          />
          <label className="form-check-label" htmlFor="completed">
            Completed
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="projectstatus"
            id="uncompleted"
            value="uncompleted"
            onChange={handleChange}
            checked={taskObj.Status === "uncompleted" ? "checked" : null}
          />
          <label className="form-check-label" htmlFor="uncompleted">
            Uncompleted
          </label>
        </div>
        <p className="text-danger">{formErrors.projectStatusErr}</p>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleUpdate}>
          Update
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditTaskPopup;

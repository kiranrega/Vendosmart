import React, {useState} from 'react';
import EditTask from '../modals/EditTask'

const Card = ({taskObj, index, deleteTask, updateListArray}) => {
    const [modal, setModal] = useState(false);

    const colors = [
        {
            primaryColor : "#5D93E1",
            secondaryColor : "#ECF3FC"
        },
        {
            primaryColor : "#F9D288",
            secondaryColor : "#FEFAF1"
        },
        {
            primaryColor : "#5DC250",
            secondaryColor : "#F2FAF1"
        },
        {
            primaryColor : "#F48687",
            secondaryColor : "#FDF1F1"
        },
        {
            primaryColor : "#B964F7",
            secondaryColor : "#F3F0FD"
        }
    ]

    const toggle = () => {
        setModal(!modal);
    }

    const updateTask = (obj) => {
        updateListArray(obj, index)
    }

    const handleDelete = () => {
        deleteTask(index)
    }

    return (
        <div className = "card-wrapper">
            <div className = "card-top" style={{"backgroundColor": colors[index%5].primaryColor}}></div>
            <div className = "task-holder">
                <span className = "card-header text-wrap" style={{"backgroundColor": colors[index%5].secondaryColor, "borderRadius": "10px"}}>Task Name :{taskObj.Projectname}</span>
                <p className = "pl-2 text-success mt-2">Name: {taskObj.Name}</p>
                <p className = "pl-2 text-success ">Mobile Number: {taskObj.mobilenumber}</p>
                <p className = "pl-2 text-primary ">E-Mail:{taskObj.Email}</p>
                <p className = "pl-2 text-success ">Start Date: {taskObj.startdate}</p>
                <p className = "pl-2 text-success">End Date: {taskObj.enddate}</p>
                <p className = "pl-2 text-danger">Description:{taskObj.Description}</p>
                <p className = "pl-2 text-secondary">Project Status : {taskObj.Status}</p>
                <div style={{"position": "absolute", "right" : "30px", "bottom" : "30px"}}>
                    <i className = "far fa-edit " style={{"color" : colors[index%5].primaryColor, "cursor" : "pointer", "margin-right":"20px"}} onClick = {() => setModal(true)}></i>
                    <i className="fas fa-trash-alt" style = {{"color" : colors[index%5].primaryColor, "cursor" : "pointer"}} onClick = {handleDelete}></i>
                </div>
        </div>
        <EditTask modal = {modal} toggle = {toggle} updateTask = {updateTask} taskObj = {taskObj}/>
        </div>
    );
};

export default Card;
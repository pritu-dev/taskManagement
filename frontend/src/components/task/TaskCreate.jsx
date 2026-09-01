import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContextProvider";
import { toast } from "react-toastify";

const TaskCreate = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const { backendURL, token } = useContext(AppContext);

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    status: "TODO",
    due_date: ""
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try{
      const { data } = await axios.post(`${backendURL}/api/task/addTask`, 
      {
        project_id: id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        due_date: task.due_date,
      },
      { headers: { token } }
    );

    if(data.success){
      toast.success(data.message);
      navigate(`/projectdetails/${id}`)
    }

    else{
      toast.error(data.message);
    }
    }

    catch(err){
      toast.error(err.message);
    }
  }




  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >

      <form
        onSubmit={handleOnSubmit}
        className="border rounded shadow p-5"
        style={{ width: "500px" }}
      >

        <h2 className="text-center mb-4">
          Add Task
        </h2>

        {/* Task Title */}

        <div className="mb-3">

          <label className="form-label">
            Task Title
          </label>

          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter task title"
            required
          />

        </div>


        {/* Description */}

        <div className="mb-3">

          <label className="form-label">
            Description
          </label>

          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter task description"
            rows="3" required
          />

        </div>


        {/* Priority */}

        <div className="mb-3">

          <label className="form-label">
            Priority
          </label>

          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="form-select"
          >

            <option value="LOW">
              LOW
            </option>

            <option value="MEDIUM">
              MEDIUM
            </option>

            <option value="HIGH">
              HIGH
            </option>

          </select>

        </div>


        {/* Status */}

        <div className="mb-3">

          <label className="form-label">
            Status
          </label>

          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            className="form-select"
          >

            <option value="TODO">
              TODO
            </option>

            <option value="IN-PROGRESS">
              IN-PROGRESS
            </option>

            <option value="COMPLETED">
              COMPLETED
            </option>

          </select>

        </div>


        {/* Due Date */}

        <div className="mb-3">

          <label className="form-label">
            Due Date
          </label>

          <input
            type="date"
            name="due_date"
            value={task.due_date}
            onChange={handleChange}
            className="form-control"
            required
          />

        </div>

        {/* Buttons */}

        <div className="d-flex gap-2">

          <button
            type="submit"
            className="btn btn-primary w-100"
   
          >
            Add Task
          </button>

          <button
            type="button"
            className="btn btn-secondary w-100"
            onClick={() =>
              navigate(`/projectdetails/${id}`)
            }
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  );
};

export default TaskCreate;
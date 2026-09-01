import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContextProvider";

const EditTask = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const {
        backendURL,
        token,
        allTasks,
        getAllTasks
    } = useContext(AppContext);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("MEDIUM");
    const [status, setStatus] = useState("TODO");
    const [dueDate, setDueDate] = useState("");

    useEffect(() => {
        getAllTasks();
    }, [id]);

    const selectedTask = allTasks.find(
        (task) => task.id == id
    );

    useEffect(() => {

        if (selectedTask) {
            setTitle(selectedTask.title || "");
            setDescription(selectedTask.description || "");
            setPriority(selectedTask.priority || "MEDIUM");
            setStatus(selectedTask.status || "TODO");
            setDueDate(
                selectedTask.due_date
                    ? selectedTask.due_date.slice(0, 10)
                    : ""
            );
        }

    }, [selectedTask]);


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const { data } = await axios.post(
                `${backendURL}/api/task/edit/${id}`,
                {
                    title,
                    description,
                    priority,
                    status,
                    due_date: dueDate
                },
                {
                    headers: { token }
                }
            );

            if (data.success) {

                toast.success(data.message);

                await getAllTasks();

                navigate(-1);

            } else {

                toast.error(data.message);

            }

        } catch (err) {

            toast.error(
                err.response?.data?.message || err.message
            );

        }
    };


    if (!selectedTask) {
        return <div>Loading...</div>;
    }


    return (
        <div className="container p-5">

            <div className="card mx-auto shadow"
                style={{ maxWidth: "600px" }}>

                <div className="card-body">

                    <h3 className="mb-4">
                        Edit Task
                    </h3>

                    <form onSubmit={handleSubmit}>

                        {/* Title */}

                        <div className="mb-3">

                            <label className="form-label">
                                Task Title
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={title}
                                onChange={(e) =>
                                    setTitle(e.target.value)
                                }
                                required
                            />

                        </div>


                        {/* Description */}

                        <div className="mb-3">

                            <label className="form-label">
                                Description
                            </label>

                            <textarea
                                className="form-control"
                                rows="4"
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                                required
                            />

                        </div>


                        {/* Priority */}

                        <div className="mb-3">

                            <label className="form-label">
                                Priority
                            </label>

                            <select
                                className="form-select"
                                value={priority}
                                onChange={(e) =>
                                    setPriority(e.target.value)
                                }
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
                                className="form-select"
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value)
                                }
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
                                className="form-control"
                                value={dueDate}
                                onChange={(e) =>
                                    setDueDate(e.target.value)
                                }
                            />

                        </div>


                        {/* Buttons */}

                        <div className="d-flex gap-2">

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Save Changes
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default EditTask;
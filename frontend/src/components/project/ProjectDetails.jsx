
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContextProvider";
import axios from "axios";
import { toast } from "react-toastify";

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        backendURL,
        token,
        projectData,
        getProjectData,
        getTasks,
        tasks,
        getAllTasks
    } = useContext(AppContext);

    const [search, setSearch] = useState("");

    // Delete modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        getProjectData();
        getTasks(id);
        getAllTasks();
    }, [id]);

    // Selected project
    const selectedProject = projectData.find(
        (pro) => pro.id == id
    );

    // Search task
    const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase())
    );

    // Delete task
    const handleDelete = async () => {

        try {

            const { data } = await axios.post(
                `${backendURL}/api/task/delete/${deleteId}`,
                {},
                {
                    headers: { token }
                }
            );

            if (data.success) {

                toast.success(data.message);

                setShowDeleteModal(false);
                setDeleteId(null);

                // Refresh tasks
                getTasks(id);
                getAllTasks();

            } else {

                toast.error(data.message);

            }

        } catch (err) {

            toast.error(err.message);

        }
    };


    // Change task status
    const handleStatusChange = async (taskId, status) => {

        try {

            const { data } = await axios.post(
                `${backendURL}/api/task/status/${taskId}`,
                { status },
                {
                    headers: { token }
                }
            );

            if (data.success) {

                toast.success(data.message);

                getTasks(id);
                getAllTasks();

            } else {

                toast.error(data.message);

            }

        } catch (err) {

            toast.error(err.message);

        }
    };


    return (
        <div className="container py-5">

            {/* Back Button */}
            <button
                className="btn btn-outline-secondary mb-4"
                onClick={() => navigate("/dashboard")}
            >
                 Dashboard
            </button>


            {/* Project Header */}
            {!selectedProject ? (

                <div className="text-center">
                    <h3>Loading...</h3>
                </div>

            ) : (

                <div className="card shadow-sm border-0 mb-4">

                    <div className="card-body p-4">

                        <div className="d-flex justify-content-between align-items-start">

                            <div>

                                <h2 className="fw-bold mb-2">
                                    {selectedProject.name}
                                </h2>

                                <p className="text-muted mb-0">
                                    {selectedProject.description}
                                </p>

                            </div>

                            <button
                                className="btn btn-primary"
                                onClick={() =>
                                    navigate(`/taskcreate/${id}`)
                                }
                            >
                                + Add Task
                            </button>

                        </div>

                    </div>

                </div>

            )}


            {/* Search + Task Count */}
            <div className="card border-0 shadow-sm mb-3">

                <div className="card-body">

                    <div className="row align-items-center">

                        <div className="col-md-8">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search task..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                        </div>

                        <div className="col-md-4 text-md-end mt-2 mt-md-0">

                            <span className="badge bg-primary fs-6">
                                {filteredTasks.length} Tasks
                            </span>

                        </div>

                    </div>

                </div>

            </div>


            {/* Task List */}

            {filteredTasks.length === 0 ? (

                <div className="card border-0 shadow-sm">

                    <div className="card-body text-center p-5">

                        <h5 className="text-muted">
                            No tasks found
                        </h5>

                        <p className="text-muted">
                            Try another search or create a new task.
                        </p>

                        <button
                            className="btn btn-primary"
                            onClick={() =>
                                navigate(`/taskcreate/${id}`)
                            }
                        >
                            + Create Task
                        </button>

                    </div>

                </div>

            ) : (

                <div className="card border-0 shadow-sm">

                    {/* Header */}

                    <div className="card-header bg-light">

                        <div className="row fw-bold">

                            <div className="col-md-3">
                                Task
                            </div>

                            <div className="col-md-2">
                                Priority
                            </div>

                            <div className="col-md-2">
                                Status
                            </div>

                            <div className="col-md-2">
                                Due Date
                            </div>

                            <div className="col-md-3 text-center">
                                Action
                            </div>

                        </div>

                    </div>


                    {/* Tasks */}

                    <div className="card-body p-0">

                        {filteredTasks.map((task) => (

                            <div
                                className="row align-items-center border-bottom p-3"
                                key={task.id}
                            >

                                {/* Task */}

                                <div className="col-md-3">

                                    <div className="fw-semibold">
                                        {task.title}
                                    </div>

                                    {task.description && (
                                        <small className="text-muted">
                                            {task.description}
                                        </small>
                                    )}

                                </div>


                                {/* Priority */}

                                <div className="col-md-2">

                                    <span className="badge bg-secondary">
                                        {task.priority}
                                    </span>

                                </div>


                                {/* Status */}

                                <div className="col-md-2">

                                    <select
                                        className="form-select form-select-sm"
                                        value={task.status}
                                        onChange={(e) =>
                                            handleStatusChange(
                                                task.id,
                                                e.target.value
                                            )
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

                                <div className="col-md-2">

                                    {task.due_date ? (
                                        new Date(
                                            task.due_date
                                        ).toLocaleDateString("en-GB")
                                    ) : (
                                        <span className="text-muted">
                                            No date
                                        </span>
                                    )}

                                </div>


                                {/* Actions */}

                                <div className="col-md-3 text-center">

                                    <button
                                        className="btn btn-sm btn-warning me-2"
                                        onClick={() =>
                                            navigate(
                                                `/editTask/${task.id}`
                                            )
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => {
                                            setDeleteId(task.id);
                                            setShowDeleteModal(true);
                                        }}
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            )}


            {/* Delete Confirmation Modal */}

            {showDeleteModal && (

                <>
                    {/* Backdrop */}

                    <div className="modal-backdrop fade show"></div>


                    {/* Modal */}

                    <div
                        className="position-fixed top-50 start-50 translate-middle"
                        style={{
                            zIndex: 1055,
                            width: "400px"
                        }}
                    >

                        <div className="card shadow-lg border-0">

                            <div className="card-body text-center p-4">

                                <div
                                    className="rounded-circle bg-danger bg-opacity-10 d-inline-flex align-items-center justify-content-center mb-3"
                                    style={{
                                        width: "60px",
                                        height: "60px"
                                    }}
                                >

                                    <span className="text-danger fs-3">
                                        !
                                    </span>

                                </div>


                                <h4 className="fw-bold">
                                    Delete Task?
                                </h4>

                                <p className="text-muted">
                                    Are you sure you want to delete this
                                    task?
                                    <br />
                                    This action cannot be undone.
                                </p>


                                <div className="d-flex justify-content-center gap-2 mt-4">

                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => {
                                            setShowDeleteModal(false);
                                            setDeleteId(null);
                                        }}
                                    >
                                        Cancel
                                    </button>


                                    <button
                                        className="btn btn-danger"
                                        onClick={handleDelete}
                                    >
                                        Yes, Delete
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </>

            )}

        </div>
    );
};

export default ProjectDetails;

